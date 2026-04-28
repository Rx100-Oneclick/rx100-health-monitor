Plan to update the Health Monitor dashboard

1. Policy Compliance Breakdown
- Remove the “Download Report” button from the card header.
- Keep the card layout and metric tiles unchanged.

2. AI Root Cause Analysis
- Remove the current per-event “View Details / View Trace” action button.
- Show only the first 2 root-cause cards by default.
- Add a “Read more” control when more than 2 events exist.
- When clicked, reveal the remaining root-cause cards and optionally allow collapsing back to the first 2.

3. Monitoring table data sources
- Change the Policies tab to fetch rows from `policy_health_metrics` instead of `health_monitor_snapshots`.
- Change the Workflows tab to fetch rows from `workflow_health_metrics` instead of `health_monitor_snapshots`.
- Keep API Endpoints fetching from `api_health_metrics`.
- All queries will continue filtering by the authenticated iframe `tenant_id`.
- Update realtime subscriptions to listen to:
  - `policy_health_metrics`
  - `workflow_health_metrics`
  - `api_health_metrics`
  - `health_monitor_events`

4. Remove Tenant ID columns
- Remove the `Tenant ID` column from all Monitoring table tabs: Policies, Workflows, and API Endpoints.
- Keep tenant filtering in the query logic; only hide it from the UI.
- Update table search so it searches names/categories/endpoints/methods, not tenant ID.

5. Keep summary cards and charts working
- Summary cards and Policy Compliance Breakdown will be recalculated from the new metric tables where possible:
  - policy compliance from `policy_health_metrics.compliant` / `violation_count`
  - workflow counts and success rate from `workflow_health_metrics.status`
  - API health score, latency, error rate, and trend from `api_health_metrics`
- `health_monitor_events` will continue powering AI Root Cause Analysis and the policy violation heatmap.

Purpose of the existing tables

`health_monitor_snapshots`
- Purpose: a compact, pre-aggregated “latest state” table for each monitored entity.
- It stores one current summary row per policy/workflow/API-like entity, such as status, compliance score, warning/critical count, p95 latency, and success rate.
- Useful for fast top-level cards and dashboards because the UI does not need to aggregate raw metric rows each time.

`health_monitor_events`
- Purpose: an incident/event log.
- It stores notable events such as policy drift, policy violations, latency spikes, workflow failures, quota warnings, and unresolved issues.
- Useful for AI Root Cause Analysis, violation heatmaps, alerts, and incident history.

Technical details

Files to update:
- `src/app/hooks/useHealthMonitorData.ts`
  - add queries for `policy_health_metrics` and `workflow_health_metrics`
  - aggregate row-level metric data into dashboard summary, policy rows, workflow rows, and API endpoint rows
  - update realtime subscriptions
- `src/app/components/PolicyBreakdown.tsx`
  - remove Download Report UI
- `src/app/components/AIInsights.tsx`
  - remove event action button
  - add 2-card default display and Read more behavior
- `src/app/components/TenantMonitoring.tsx`
  - remove Tenant ID table columns
  - update search fields and table widths
- `src/app/types.ts`
  - adjust row types only if needed after mapping from the new tables

No database migration is required because the target tables already exist in the connected Supabase project.