Plan to make the Health Monitor dynamic and tenant-scoped

1. Add Supabase client support
- Install/add `@supabase/supabase-js` if it is not already present.
- Create a reusable Supabase client using `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- Keep all database access on the frontend, since this project is a Vite React client app.

2. Implement iframe authentication and tenant context
- Add a small auth/session hook that:
  - Reads `access_token`, `refresh_token`, `user_id`, `email`, and `tenant_id` from URL parameters.
  - Calls `supabase.auth.setSession({ access_token, refresh_token })` when tokens are available.
  - Sends `{ type: 'IFRAME_READY' }` to the parent app when URL tokens are not immediately available or as a readiness signal.
  - Listens for `{ type: 'AUTH_SESSION', payload: { access_token, refresh_token } }` from the parent as backup auth.
  - Stores `tenant_id` in React state and blocks dashboard queries until tenant/auth is ready.
- Show a clear loading/auth-waiting state while waiting for tokens/tenant ID, and an error state if required values are missing.

3. Centralize health monitor data fetching
- Create a dashboard data hook/service that fetches data by `tenant_id` only.
- Query these tables:
  - `health_monitor_snapshots`
  - `health_monitor_events`
  - `api_health_metrics`
- Convert Supabase rows into UI-ready models for:
  - Summary cards
  - Policy compliance breakdown
  - AI Root Cause Analysis
  - API Health Trend chart
  - Policy Violation Heatmap
  - Monitoring tables for policies, workflows, and API endpoints

4. Replace mocked component data with props
- Update `App.tsx` to own the loaded dashboard state and pass real data into child components.
- Refactor these components to render props instead of hardcoded/mock arrays:
  - `KPICards`
  - `PolicyBreakdown`
  - `AIInsights`
  - `APIHealthChart`
  - `ViolationHeatmap`
  - `TenantMonitoring`
- Preserve the current visual layout shown in the uploaded reference images.
- Add empty states for each section when a tenant has no rows.

5. Implement requested data mappings
- Summary cards:
  - Average policy compliance from `POLICY` snapshots.
  - Active workflow count from `WORKFLOW` snapshots.
  - Failed workflow count from `FAILED` or `CRITICAL` workflows.
  - API health score from API endpoint error rates.
  - Policy violation count from policy critical counts.
- Policy table from `entity_type = 'POLICY'`.
- Workflow table from `entity_type = 'WORKFLOW'`.
- API endpoint table from `entity_type = 'API_ENDPOINT'`.
- AI Root Cause panel from unresolved `health_monitor_events`, limited to 5.
- API trend from the last 1 hour of `api_health_metrics`, bucketed by time and converted to p50/p95/p99.
- Violation heatmap from the last 24 hours of policy violation events, grouped by time and severity.

6. Add realtime refresh
- Subscribe to `postgres_changes` for:
  - `health_monitor_snapshots` filtered by `tenant_id`.
  - `health_monitor_events` filtered by `tenant_id`.
  - Optionally `api_health_metrics` filtered by `tenant_id` so charts update live too.
- On events, refresh only the affected dashboard data.
- Clean up the channel on unmount or when the tenant changes.

7. Validation and build check
- Verify TypeScript types for nullable Supabase fields and JSON metadata access.
- Run the project build after implementation.
- If Supabase env vars are not present, surface a readable message in the app rather than leaving a blank screen.

Technical notes
- This will remove random timers/mock data from the UI and replace them with live tenant-specific values.
- URL token auth will be primary; `postMessage` auth from the parent iframe will be backup.
- The implementation assumes the Supabase tables and RLS policies already allow the authenticated user to read rows for the passed `tenant_id`.
- If the tables do not exist or RLS blocks access, the UI will show a data loading error and we can adjust the database/RLS next.