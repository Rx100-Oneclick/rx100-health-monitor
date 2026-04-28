## Plan

I will update the Monitoring card so each tab shows only the most recently inserted 5 rows, remove the Actions column, and add a top-right View More button that opens the registered external application in a full-page iframe overlay.

## What will change

1. Monitoring table display
   - Policies, Workflows, and API Endpoints will each display only the latest 5 records from their metric table.
   - The Actions column and row-level “View →” buttons will be removed from all three sections.
   - Pagination/per-page controls will be removed or simplified because only 5 recent rows are shown.
   - The API Endpoints section will continue fetching from `api_health_metrics`.

2. Data fetching
   - Update `useHealthMonitorData.ts` so dashboard table arrays are built from the newest inserted/captured rows:
     - `policy_health_metrics`: latest 5 ordered by `evaluated_at desc`
     - `workflow_health_metrics`: latest 5 ordered by `captured_at desc`
     - `api_health_metrics`: latest 5 ordered by `captured_at desc`
   - Keep broader data where needed for summary cards/charts, so the rest of the dashboard still works.
   - Realtime subscriptions will remain for these metric tables.

3. View More button
   - Add a gradient Indigo to Violet “View More” button beside/under the search bar on the right side.
   - Hover state will use a slightly darker gradient.
   - Button will use `app_id = "44110e0f-3d40-4319-b046-4473370b73db"` to query `app_registry.target_url`.
   - Confirmed current registry value is:
     - `https://rx100-workflow-orchestra-dlq-review.lovable.app`

4. Full-page iframe overlay
   - Add a new full-page Radix Dialog overlay component for the external app.
   - It will cover the viewport with backdrop blur and a modern loading spinner while the iframe loads.
   - No close icon will be displayed.
   - The iframe will fill the available overlay area.

5. Auth and URL parameters for external app
   - Build the iframe URL using the fetched `target_url` plus query params:
     - `access_token`
     - `refresh_token`
     - `user_id`
     - `email`
     - `tenant_id`
     - `app_id`
   - After iframe load, send backup auth via postMessage:
     ```ts
     iframe.contentWindow?.postMessage({
       type: 'AUTH_SESSION',
       payload: {
         access_token: session.access_token,
         refresh_token: session.refresh_token,
       },
     }, '*');
     ```

6. Lifecycle postMessage handling
   - Listen for messages from the embedded app:
     - `LIFECYCLE_CANCEL`: close the full-page overlay.
     - `LIFECYCLE_APPLIED`: close the overlay and refresh dashboard data so the monitoring tables update.
   - Support payload shape:
     ```ts
     { ledger_id, new_status, lifecycle_id }
     ```

## Technical notes

- I will avoid editing generated Supabase types.
- No database schema change is required because `app_registry`, `api_health_metrics`, `policy_health_metrics`, and `workflow_health_metrics` already exist and are readable for authenticated users.
- I will likely pass the authenticated user/session values from `useIframeAuth` into the Monitoring component so the iframe can receive the same auth context as this app.