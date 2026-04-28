export type HealthStatus = 'healthy' | 'warning' | 'critical';

export interface SummaryData {
  policyCompliance: number;
  activeWorkflows: number;
  runningWorkflows: number;
  failedWorkflows: number;
  apiHealthScore: number;
  apiLatencyP95: number;
  policyViolations: number;
  criticalViolations: number;
  warningViolations: number;
}

export interface PolicyBreakdownData {
  totalPolicies: number;
  compliant: number;
  nonCompliant: number;
  exempted: number;
  lastAudit: string;
  driftEventsToday: number;
}

export interface PolicyRow {
  status: HealthStatus;
  tenantId: string;
  policyName: string;
  category: string;
  compliance: number;
  lastCheck: string;
}

export interface WorkflowRow {
  status: HealthStatus;
  tenantId: string;
  workflowName: string;
  version: string;
  runs24h: number;
  successRate: number;
  avgDuration: string;
  lastCheck: string;
}

export interface ApiEndpointRow {
  status: HealthStatus;
  tenantId: string;
  endpoint: string;
  method: string;
  latencyP95: number;
  errorRate: number;
  rps: number;
  lastCheck: string;
}

export interface RootCauseEvent {
  severity: string;
  title: string;
  description: string;
  traceId?: string;
  actionLabel: string;
}

export interface ApiTrendPoint {
  id: string;
  time: string;
  p50: number;
  p95: number;
  p99: number;
}

export interface ViolationHeatmapPoint {
  id: string;
  time: string;
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export interface DashboardData {
  summary: SummaryData;
  policyBreakdown: PolicyBreakdownData;
  policies: PolicyRow[];
  workflows: WorkflowRow[];
  apiEndpoints: ApiEndpointRow[];
  rootCauseEvents: RootCauseEvent[];
  apiTrend: ApiTrendPoint[];
  violationHeatmap: ViolationHeatmapPoint[];
}
