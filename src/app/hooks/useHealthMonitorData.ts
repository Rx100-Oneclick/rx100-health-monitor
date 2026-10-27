import { useCallback, useEffect, useMemo, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  ApiEndpointRow,
  ApiTrendPoint,
  DashboardData,
  HealthStatus,
  PolicyRow,
  RootCauseEvent,
  ViolationHeatmapPoint,
  WorkflowRow,
} from '../types';

type JsonObject = Record<string, unknown>;
type EventRow = Record<string, unknown> & { metadata?: JsonObject | null };
type MetricRow = Record<string, unknown> & { metadata?: JsonObject | null };

const emptyDashboard: DashboardData = {
  summary: {
    policyCompliance: 0,
    activeWorkflows: 0,
    runningWorkflows: 0,
    failedWorkflows: 0,
    apiHealthScore: 0,
    apiLatencyP95: 0,
    policyViolations: 0,
    criticalViolations: 0,
    warningViolations: 0,
  },
  policyBreakdown: {
    totalPolicies: 0,
    compliant: 0,
    nonCompliant: 0,
    exempted: 0,
    lastAudit: '—',
    driftEventsToday: 0,
  },
  policies: [],
  workflows: [],
  apiEndpoints: [],
  rootCauseEvents: [],
  apiTrend: [],
  violationHeatmap: [],
};

const normalizeStatus = (status?: string): HealthStatus => {
  const value = String(status ?? '').toUpperCase();
  if (value === 'CRITICAL' || value === 'FAILED') return 'critical';
  if (value === 'WARNING' || value === 'DEGRADED') return 'warning';
  return 'healthy';
};

const numberValue = (value: unknown, fallback = 0) => {
  const parsed = Number(value ?? fallback);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const stringValue = (value: unknown, fallback = '—') => {
  if (value === null || value === undefined || value === '') return fallback;
  return String(value);
};

const formatRelative = (value?: string | null) => {
  if (!value) return '—';
  const diff = Math.max(0, Date.now() - new Date(value).getTime());
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

const formatDuration = (ms?: unknown) => {
  const value = numberValue(ms);
  if (!value) return '—';
  if (value < 1000) return `${Math.round(value)}ms`;
  return `${(value / 1000).toFixed(1)}s`;
};

const percentile = (values: number[], p: number) => {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.ceil((p / 100) * sorted.length) - 1;
  return Math.round(sorted[Math.max(0, Math.min(sorted.length - 1, index))]);
};

const bucketTime = (value: string, minutes = 5) => {
  const date = new Date(value);
  date.setSeconds(0, 0);
  date.setMinutes(Math.floor(date.getMinutes() / minutes) * minutes);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
};

const latestBy = <T extends Record<string, unknown>>(rows: T[], keyGetter: (row: T) => string, dateField: string) => {
  const latest = new Map<string, T>();
  rows.forEach((row) => {
    const key = keyGetter(row);
    const current = latest.get(key);
    if (!current || new Date(String(row[dateField])).getTime() > new Date(String(current[dateField])).getTime()) latest.set(key, row);
  });
  return Array.from(latest.values());
};

const mapPolicy = (row: MetricRow): PolicyRow => ({
  status: row.compliant ? 'healthy' : numberValue(row.violation_count) > 1 ? 'critical' : 'warning',
  tenantId: stringValue(row.tenant_id, ''),
  policyName: stringValue(row.policy_name ?? row.policy_id, 'Unnamed policy'),
  category: stringValue(row.metadata?.category),
  compliance: row.compliant ? 100 : Math.max(0, 100 - numberValue(row.violation_count, 1) * 10),
  lastCheck: formatRelative(stringValue(row.evaluated_at, '')),
});

const mapWorkflow = (row: MetricRow): WorkflowRow => ({
  status: normalizeStatus(stringValue(row.status, '')),
  tenantId: stringValue(row.tenant_id, ''),
  workflowName: stringValue(row.workflow_name ?? row.workflow_id, 'Unnamed workflow'),
  version: stringValue(row.workflow_version),
  runs24h: numberValue(row.total_runs_24h, 1),
  successRate: row.success_rate == null ? (['SUCCESS', 'COMPLETED', 'HEALTHY'].includes(String(row.status ?? '').toUpperCase()) ? 100 : 0) : numberValue(row.success_rate),
  avgDuration: formatDuration(row.avg_duration_ms ?? row.duration_ms),
  lastCheck: formatRelative(stringValue(row.captured_at, '')),
});

const deriveApiStatus = (row: MetricRow): HealthStatus => {
  const statusCode = numberValue(row.status_code);
  const errorRate = numberValue(row.error_rate);
  if (String(row.status ?? '').length) return normalizeStatus(stringValue(row.status, ''));
  if (statusCode >= 500 || errorRate >= 5 || row.is_success === false) return 'critical';
  if (statusCode >= 400 || errorRate >= 1) return 'warning';
  return 'healthy';
};

const mapApiEndpoint = (row: MetricRow): ApiEndpointRow => ({
  status: deriveApiStatus(row),
  tenantId: stringValue(row.tenant_id, ''),
  endpoint: stringValue(row.endpoint),
  method: stringValue(row.method, 'GET'),
  latencyP95: numberValue(row.latency_p95_ms ?? row.latency_ms),
  errorRate: numberValue(row.error_rate),
  rps: numberValue(row.rps),
  lastCheck: formatRelative(stringValue(row.captured_at, '')),
});

const buildApiTrend = (rows: MetricRow[]): ApiTrendPoint[] => {
  const buckets = new Map<string, number[]>();
  rows.forEach((row) => {
    const key = bucketTime(stringValue(row.captured_at, ''), 5);
    const bucket = buckets.get(key) ?? [];
    bucket.push(numberValue(row.latency_ms));
    buckets.set(key, bucket);
  });

  return Array.from(buckets.entries()).map(([time, values]) => ({
    id: time,
    time,
    p50: percentile(values, 50),
    p95: percentile(values, 95),
    p99: percentile(values, 99),
  }));
};

const buildViolationHeatmap = (rows: EventRow[]): ViolationHeatmapPoint[] => {
  const buckets = new Map<string, ViolationHeatmapPoint>();
  rows.forEach((row) => {
    const time = bucketTime(stringValue(row.detected_at, ''), 60);
    const point = buckets.get(time) ?? { id: time, time, critical: 0, high: 0, medium: 0, low: 0 };
    const severity = String(row.severity ?? 'low').toLowerCase();
    if (severity === 'critical') point.critical += 1;
    else if (severity === 'high') point.high += 1;
    else if (severity === 'medium' || severity === 'warning') point.medium += 1;
    else point.low += 1;
    buckets.set(time, point);
  });
  return Array.from(buckets.values());
};

export function useHealthMonitorData(client: SupabaseClient | null, tenantId: string | null, enabled: boolean) {
  const [data, setData] = useState<DashboardData>(emptyDashboard);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null);

  const fetchDashboardData = useCallback(async () => {
    if (!client || !tenantId || !enabled) return;
    setLoading(true);
    setError(null);

    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const [policiesResult, recentPoliciesResult, workflowsResult, recentWorkflowsResult, metricsResult, recentMetricsResult, eventsResult, violationResult] = await Promise.all([
      client.from('policy_health_metrics').select('*').eq('tenant_id', tenantId).order('evaluated_at', { ascending: false }),
      client.from('policy_health_metrics').select('*').eq('tenant_id', tenantId).order('evaluated_at', { ascending: false }).limit(5),
      client.from('workflow_health_metrics').select('*').eq('tenant_id', tenantId).gte('captured_at', oneDayAgo).order('captured_at', { ascending: false }),
      client.from('workflow_health_metrics').select('*').eq('tenant_id', tenantId).order('captured_at', { ascending: false }).limit(5),
      client.from('api_health_metrics').select('*').eq('tenant_id', tenantId).order('captured_at', { ascending: false }).limit(1000),
      client.from('api_health_metrics').select('*').eq('tenant_id', tenantId).order('captured_at', { ascending: false }).limit(5),
      client.from('health_monitor_events').select('*').eq('tenant_id', tenantId).eq('is_resolved', false).order('detected_at', { ascending: false }).limit(5),
      client.from('health_monitor_events').select('detected_at, severity').eq('tenant_id', tenantId).eq('entity_type', 'POLICY').eq('event_type', 'POLICY_VIOLATION').gte('detected_at', oneDayAgo),
    ]);

    const firstError = policiesResult.error ?? recentPoliciesResult.error ?? workflowsResult.error ?? recentWorkflowsResult.error ?? metricsResult.error ?? recentMetricsResult.error ?? eventsResult.error ?? violationResult.error;
    if (firstError) {
      setError(firstError.message);
      setLoading(false);
      return;
    }

    const policyMetrics = (policiesResult.data ?? []) as MetricRow[];
    const recentPolicyMetrics = (recentPoliciesResult.data ?? []) as MetricRow[];
    const workflowMetrics = (workflowsResult.data ?? []) as MetricRow[];
    const recentWorkflowMetrics = (recentWorkflowsResult.data ?? []) as MetricRow[];
    const apiMetrics = (metricsResult.data ?? []) as MetricRow[];
    const recentApiMetrics = (recentMetricsResult.data ?? []) as MetricRow[];
    const policies = latestBy(policyMetrics, (x) => stringValue(x.policy_id ?? x.policy_name, 'policy'), 'evaluated_at');
    const workflowGroups = new Map<string, MetricRow[]>();
    workflowMetrics.forEach((row) => {
      const key = stringValue(row.workflow_id ?? row.workflow_name, 'workflow');
      workflowGroups.set(key, [...(workflowGroups.get(key) ?? []), row]);
    });
    const workflows: MetricRow[] = Array.from(workflowGroups.values()).map((rows) => {
      const latest = latestBy(rows, () => 'workflow', 'captured_at')[0] ?? rows[0];
      const successful = rows.filter((x) => ['SUCCESS', 'COMPLETED', 'HEALTHY'].includes(String(x.status ?? '').toUpperCase())).length;
      return { ...latest, total_runs_24h: rows.length, success_rate: rows.length ? (successful / rows.length) * 100 : 0, avg_duration_ms: rows.reduce((a, x) => a + numberValue(x.duration_ms), 0) / Math.max(1, rows.length) };
    });
    const apiGroups = new Map<string, MetricRow[]>();
    apiMetrics.forEach((row) => {
      const key = `${row.method ?? 'GET'} ${row.endpoint}`;
      apiGroups.set(key, [...(apiGroups.get(key) ?? []), row]);
    });
    const apis: MetricRow[] = Array.from(apiGroups.values()).map((rows) => {
      const latest = latestBy(rows, () => 'api', 'captured_at')[0] ?? rows[0];
      const errorRates = rows.map((x) => numberValue(x.error_rate)).filter((value) => Number.isFinite(value));
      const errorRate = errorRates.length ? errorRates.reduce((sum, value) => sum + value, 0) / errorRates.length : 0;
      const statusCode = numberValue(latest.status_code);
      const status = statusCode >= 500 || errorRate >= 5 || latest.is_success === false ? 'CRITICAL' : errorRate >= 1 || statusCode >= 400 ? 'WARNING' : 'HEALTHY';
      return { ...latest, status, latency_p95_ms: percentile(rows.map((x) => numberValue(x.latency_ms)), 95), error_rate: errorRate, rps: numberValue(latest.rps) };
    });
    const unresolvedEvents = (eventsResult.data ?? []) as EventRow[];
    const violations = (violationResult.data ?? []) as EventRow[];

    const criticalViolations = policies.filter((x) => !x.compliant && numberValue(x.violation_count) > 1).length;
    const warningViolations = policies.filter((x) => !x.compliant && numberValue(x.violation_count) <= 1).length;
    const auditDates = policies.map((x) => x.evaluated_at).filter(Boolean).sort();
    const latestAudit = auditDates.length ? auditDates[auditDates.length - 1] : null;
    const today = new Date().toISOString().slice(0, 10);

    setData({
      summary: {
        policyCompliance: policies.length ? (policies.filter((x) => x.compliant).length / policies.length) * 100 : 0,
        activeWorkflows: workflows.length,
        runningWorkflows: workflows.filter((x) => ['RUNNING', 'HEALTHY', 'ACTIVE'].includes(String(x.status ?? '').toUpperCase())).length,
        failedWorkflows: workflows.filter((x) => ['FAILED', 'CRITICAL'].includes(String(x.status ?? '').toUpperCase())).length,
        apiHealthScore: apis.length ? apis.reduce((a, x) => a + (100 - numberValue(x.error_rate)), 0) / apis.length : 0,
        apiLatencyP95: apis.length ? apis.reduce((a, x) => a + numberValue(x.latency_p95_ms), 0) / apis.length : 0,
        policyViolations: criticalViolations + warningViolations,
        criticalViolations,
        warningViolations,
      },
      policyBreakdown: {
        totalPolicies: policies.length,
        compliant: policies.filter((x) => x.compliant).length,
        nonCompliant: policies.filter((x) => !x.compliant).length,
        exempted: policies.filter((x) => String(x.decision ?? '').toUpperCase() === 'EXEMPTED').length,
        lastAudit: formatRelative(stringValue(latestAudit, '')),
        driftEventsToday: unresolvedEvents.filter((x) => x.event_type === 'POLICY_DRIFT' && String(x.detected_at ?? '').startsWith(today)).length,
      },
      policies: recentPolicyMetrics.map(mapPolicy),
      workflows: recentWorkflowMetrics.map(mapWorkflow),
      apiEndpoints: recentApiMetrics.map(mapApiEndpoint),
      rootCauseEvents: unresolvedEvents.map((event) => ({
        severity: stringValue(event.severity, 'info'),
        title: stringValue(event.title, 'Health event detected'),
        description: stringValue(event.description, 'Review this event for more details.'),
        traceId: event.trace_id ? stringValue(event.trace_id, '') : undefined,
        actionLabel: 'Read more',
      } satisfies RootCauseEvent)),
      apiTrend: buildApiTrend([...(metricsResult.data ?? [])].reverse() as MetricRow[]),
      violationHeatmap: buildViolationHeatmap(violations),
    });
    setLastUpdatedAt(new Date());
    setLoading(false);
  }, [client, enabled, tenantId]);

  useEffect(() => {
    void fetchDashboardData();
  }, [fetchDashboardData]);

  useEffect(() => {
    if (!client || !tenantId || !enabled) return;
    const channel = client
      .channel(`health-monitor-live-${tenantId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'policy_health_metrics', filter: `tenant_id=eq.${tenantId}` }, () => void fetchDashboardData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'workflow_health_metrics', filter: `tenant_id=eq.${tenantId}` }, () => void fetchDashboardData())
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'health_monitor_events', filter: `tenant_id=eq.${tenantId}` }, () => void fetchDashboardData())
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'api_health_metrics', filter: `tenant_id=eq.${tenantId}` }, () => void fetchDashboardData())
      .subscribe();

    return () => {
      void client.removeChannel(channel);
    };
  }, [client, enabled, fetchDashboardData, tenantId]);

  return useMemo(() => ({ data, loading, error, lastUpdatedAt, refetch: fetchDashboardData }), [data, error, fetchDashboardData, lastUpdatedAt, loading]);
}
