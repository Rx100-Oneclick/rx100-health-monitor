import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
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

type EventRow = Record<string, any>;
type MetricRow = Record<string, any>;

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

const latestBy = <T extends Record<string, any>>(rows: T[], keyGetter: (row: T) => string, dateField: string) => {
  const latest = new Map<string, T>();
  rows.forEach((row) => {
    const key = keyGetter(row);
    const current = latest.get(key);
    if (!current || new Date(row[dateField]).getTime() > new Date(current[dateField]).getTime()) latest.set(key, row);
  });
  return Array.from(latest.values());
};

const mapPolicy = (row: MetricRow): PolicyRow => ({
  status: row.compliant ? 'healthy' : numberValue(row.violation_count) > 1 ? 'critical' : 'warning',
  tenantId: row.tenant_id,
  policyName: row.policy_name ?? row.policy_id ?? 'Unnamed policy',
  category: row.metadata?.category ?? '—',
  compliance: row.compliant ? 100 : Math.max(0, 100 - numberValue(row.violation_count, 1) * 10),
  lastCheck: formatRelative(row.evaluated_at),
});

const mapWorkflow = (row: MetricRow): WorkflowRow => ({
  status: normalizeStatus(row.status),
  tenantId: row.tenant_id,
  workflowName: row.workflow_name ?? row.workflow_id ?? 'Unnamed workflow',
  version: row.workflow_version ?? '—',
  runs24h: numberValue(row.total_runs_24h),
  successRate: numberValue(row.success_rate),
  avgDuration: formatDuration(row.avg_duration_ms),
  lastCheck: formatRelative(row.captured_at),
});

const mapApiEndpoint = (row: MetricRow): ApiEndpointRow => ({
  status: normalizeStatus(row.status),
  tenantId: row.tenant_id,
  endpoint: row.endpoint ?? '—',
  method: row.method ?? 'GET',
  latencyP95: numberValue(row.latency_p95_ms),
  errorRate: numberValue(row.error_rate),
  rps: numberValue(row.rps),
  lastCheck: formatRelative(row.captured_at),
});

const buildApiTrend = (rows: MetricRow[]): ApiTrendPoint[] => {
  const buckets = new Map<string, number[]>();
  rows.forEach((row) => {
    const key = bucketTime(row.captured_at, 5);
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
    const time = bucketTime(row.detected_at, 60);
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

export function useHealthMonitorData(tenantId: string | null, enabled: boolean) {
  const [data, setData] = useState<DashboardData>(emptyDashboard);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null);

  const fetchDashboardData = useCallback(async () => {
    if (!tenantId || !enabled || !supabase) return;
    setLoading(true);
    setError(null);

    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const [policiesResult, workflowsResult, metricsResult, eventsResult, violationResult] = await Promise.all([
      supabase.from('policy_health_metrics').select('*').eq('tenant_id', tenantId).order('evaluated_at', { ascending: false }),
      supabase.from('workflow_health_metrics').select('*').eq('tenant_id', tenantId).gte('captured_at', oneDayAgo).order('captured_at', { ascending: false }),
      supabase.from('api_health_metrics').select('*').eq('tenant_id', tenantId).order('captured_at', { ascending: false }).limit(1000),
      supabase.from('health_monitor_events').select('*').eq('tenant_id', tenantId).eq('is_resolved', false).order('detected_at', { ascending: false }).limit(5),
      supabase.from('health_monitor_events').select('detected_at, severity').eq('tenant_id', tenantId).eq('entity_type', 'POLICY').eq('event_type', 'POLICY_VIOLATION').gte('detected_at', oneDayAgo),
    ]);

    const firstError = policiesResult.error ?? workflowsResult.error ?? metricsResult.error ?? eventsResult.error ?? violationResult.error;
    if (firstError) {
      setError(firstError.message);
      setLoading(false);
      return;
    }

    const policyMetrics = (policiesResult.data ?? []) as MetricRow[];
    const workflowMetrics = (workflowsResult.data ?? []) as MetricRow[];
    const apiMetrics = (metricsResult.data ?? []) as MetricRow[];
    const policies = latestBy(policyMetrics, (x) => x.policy_id ?? x.policy_name, 'evaluated_at');
    const workflowGroups = new Map<string, MetricRow[]>();
    workflowMetrics.forEach((row) => {
      const key = row.workflow_id ?? row.workflow_name;
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
        lastAudit: formatRelative(latestAudit),
        driftEventsToday: unresolvedEvents.filter((x) => x.event_type === 'POLICY_DRIFT' && String(x.detected_at ?? '').startsWith(today)).length,
      },
      policies: policies.map(mapPolicy),
      workflows: workflows.map(mapWorkflow),
      apiEndpoints: apis.map(mapApiEndpoint),
      rootCauseEvents: unresolvedEvents.map((event) => ({
        severity: event.severity ?? 'info',
        title: event.title ?? 'Health event detected',
        description: event.description ?? 'Review this event for more details.',
        traceId: event.trace_id,
        actionLabel: 'Read more',
      } satisfies RootCauseEvent)),
      apiTrend: buildApiTrend([...(metricsResult.data ?? [])].reverse() as MetricRow[]),
      violationHeatmap: buildViolationHeatmap(violations),
    });
    setLastUpdatedAt(new Date());
    setLoading(false);
  }, [enabled, tenantId]);

  useEffect(() => {
    void fetchDashboardData();
  }, [fetchDashboardData]);

  useEffect(() => {
    if (!tenantId || !enabled || !supabase) return;
    const channel = supabase
      .channel(`health-monitor-live-${tenantId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'policy_health_metrics', filter: `tenant_id=eq.${tenantId}` }, () => void fetchDashboardData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'workflow_health_metrics', filter: `tenant_id=eq.${tenantId}` }, () => void fetchDashboardData())
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'health_monitor_events', filter: `tenant_id=eq.${tenantId}` }, () => void fetchDashboardData())
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'api_health_metrics', filter: `tenant_id=eq.${tenantId}` }, () => void fetchDashboardData())
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [enabled, fetchDashboardData, tenantId]);

  return useMemo(() => ({ data, loading, error, lastUpdatedAt, refetch: fetchDashboardData }), [data, error, fetchDashboardData, lastUpdatedAt, loading]);
}
