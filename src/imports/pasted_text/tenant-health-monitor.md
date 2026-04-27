Design a modern, enterprise-grade real-time observability micro-app called 
"Tenant Health Monitor" for a multi-tenant SaaS platform. The dashboard provides 
LIVE monitoring of policy compliance, workflow execution, and API endpoint health 
with per-second data updates. Focus on clarity, modern aesthetics, and intuitive UX.

═══════════════════════════════════════════════════════
GLOBAL LAYOUT (1440px desktop, fully responsive)
═══════════════════════════════════════════════════════
- Background: #F8FAFC (slate-50)
- Container max-width: 1400px, 32px horizontal padding
- Section gap: 24px vertical

═══════════════════════════════════════════════════════
TOP HEADER BAR (sticky)
═══════════════════════════════════════════════════════
LEFT:
- Title: "Tenant Health Monitor" (24px, bold, #0F172A)
- Subtitle: "Real-time policy, workflow & API observability" (13px, gray-500)

RIGHT:
- Live status pill: green pulsing dot + "LIVE" + "Last sync: 2s ago" 
  (auto-updates every second)
- "View Audit Log" button (white, ghost style, with clock icon)
- "Configure Policies" button (purple #7C3AED primary, with gear icon)

═══════════════════════════════════════════════════════
ROW 1 — KPI CARDS (4 cards, full-width grid, equal columns)
═══════════════════════════════════════════════════════
NO FILTER PANEL. Just 4 large, beautiful KPI cards spanning full width.

Each card structure:
┌─────────────────────────────────────┐
│  [ICON]  LABEL              [trend] │
│                                     │
│  BIG NUMBER                         │
│  Subtitle text                      │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ Live mini sparkline graph   │    │
│  │ (updates every 1 second)    │    │
│  └─────────────────────────────┘    │
│                                     │
│  🟢 Live • Updated 1s ago           │
└─────────────────────────────────────┘

CARD 1 — POLICY COMPLIANCE:
- Icon: Shield-check icon in green circle background (#10B981 / 10% opacity bg)
- Label: "POLICY COMPLIANCE" (uppercase, 11px, gray-500)
- Number: "94.2%" (36px bold, emerald-500)
- Subtitle: "↑ 1.8% vs yesterday" (green with up arrow)
- Mini sparkline: green line trending up, last 60 seconds
- Live indicator dot (pulsing green)

CARD 2 — ACTIVE WORKFLOWS:
- Icon: Workflow/branch icon in blue circle (#3B82F6 / 10% opacity bg)
- Label: "ACTIVE WORKFLOWS"
- Number: "247" (36px bold, blue-500)
- Subtitle: "12 running • 3 failed" (with colored dots)
- Mini sparkline: blue line with subtle fluctuation
- Live indicator dot

CARD 3 — API HEALTH SCORE:
- Icon: Heart-pulse / activity icon in green circle
- Label: "API HEALTH SCORE"
- Number: "98/100" (36px bold, emerald-500)
- Subtitle: "p95 latency: 142ms"
- Mini sparkline: stable green line
- Live indicator dot

CARD 4 — POLICY VIOLATIONS:
- Icon: Alert-triangle icon in amber circle (#F59E0B / 10% opacity bg)
- Label: "POLICY VIOLATIONS"
- Number: "7" (36px bold, amber-500)
- Subtitle: "2 critical • 5 warnings" (with severity dots)
- Mini sparkline: amber line showing recent spikes
- Live indicator dot

CARD STYLING:
- White background, 16px radius
- Subtle shadow: 0 1px 3px rgba(0,0,0,0.06)
- Padding: 24px
- Hover: lift effect with shadow 0 4px 12px rgba(0,0,0,0.08)
- Smooth number count-up animation on data change
- Sparkline area should be ~60px tall

═══════════════════════════════════════════════════════
ROW 2 — TWO-PANEL DETAIL SECTION (REMOVED Workflow Step Health)
═══════════════════════════════════════════════════════

LEFT PANEL (60%) — "Policy Compliance Breakdown":
- Header with shield icon + title + "Download Report" link (right)
- 6 metric tiles in 3-column x 2-row grid:
  ┌──────────────┬──────────────┬──────────────┐
  │ TOTAL        │ COMPLIANT    │ NON-COMPLIANT│
  │ POLICIES     │              │              │
  │ 142          │ 134 ✓        │ 7 ✗          │
  │ (slate)      │ (green)      │ (red)        │
  ├──────────────┼──────────────┼──────────────┤
  │ EXEMPTED     │ LAST AUDIT   │ DRIFT EVENTS │
  │ 1            │ 2h ago       │ +3 today     │
  │ (gray)       │ (slate)      │ (amber)      │
  └──────────────┴──────────────┴──────────────┘
- Each tile: light gray bg (#F1F5F9), 12px radius, hover state

RIGHT PANEL (40%) — "AI Root Cause Analysis":
- Header with sparkle/AI icon + title + "AI Powered" purple badge
- 3 stacked insight cards:

Card 1 (Critical - red left border 3px):
  🔴 API Latency Spike Detected
  POST /policy/evaluate showing 2.1s p99 (4x baseline)
  [View Trace →] link in purple

Card 2 (Warning - amber left border):
  🟡 Tenant Quota Warning
  tenant_002 at 95% rate limit
  [Adjust Quota →]

Card 3 (Info - blue left border):
  🔵 Policy Drift Detected
  IAM policy modified outside CI/CD
  [Review Change →]

═══════════════════════════════════════════════════════
ROW 3 — DUAL CHART SECTION (50/50)
═══════════════════════════════════════════════════════

LEFT — "API Health Trend" (real-time line chart):
- "🔴 LIVE" pulsing badge
- "Updates every 1s" text
- Y-axis: 0-500ms with gridlines
- X-axis: rolling 60-second window
- Three smooth lines:
  • p50 (blue #3B82F6) with gradient fill below
  • p95 (amber #F59E0B)
  • p99 (red #EF4444)
- Dashed SLO threshold at 300ms
- Animated line drawing as data streams in
- Legend at bottom with colored dots

RIGHT — "Policy Violation Heatmap" (stacked bar):
- "MONITORING" purple badge
- Time-bucketed stacked bars (last hour, 5-min intervals)
- Stack colors: Critical (red), High (orange), Medium (amber), Low (yellow)
- Hover tooltip showing exact counts
- "Acceptable threshold" dashed line
- Legend with severity dots

═══════════════════════════════════════════════════════
ROW 4 — TENANT MONITORING WITH TABBED VIEW
═══════════════════════════════════════════════════════

HEADER:
- Title: "Tenant Monitoring" (20px semibold)
- Status summary pills:
  🔴 5 Critical    🟡 12 Warning    🟢 230 Healthy
- Search bar (right): "Search tenants..." with search icon

TAB BAR (3 tabs, segmented control style):
┌─────────────┬─────────────┬─────────────┐
│ 📋 POLICIES │ ⚙️ WORKFLOWS│ 🌐 API      │
│             │             │  ENDPOINTS  │
└─────────────┴─────────────┴─────────────┘
Active tab: purple underline + bold text + light purple bg
Inactive: gray text, hover effect

═══════════════════════════════════════════════════════
TAB 1 — POLICIES
═══════════════════════════════════════════════════════
Columns: STATUS | TENANT ID | POLICY NAME | CATEGORY | COMPLIANCE | LAST CHECK | ACTIONS

Sample rows:
🟢 Healthy   | tenant_001 | data-encryption-at-rest    | Security    | ✓ 100%  | 2s ago  | View
🟡 Warning   | tenant_002 | iam-least-privilege        | Access      | ⚠ 87%   | 5s ago  | View
🔴 Critical  | tenant_003 | network-isolation          | Network     | ✗ 42%   | 1s ago  | View
🟢 Healthy   | tenant_004 | data-residency-eu          | Compliance  | ✓ 100%  | 3s ago  | View

═══════════════════════════════════════════════════════
TAB 2 — WORKFLOWS
═══════════════════════════════════════════════════════
Columns: STATUS | TENANT ID | WORKFLOW NAME | VERSION | RUNS (24H) | SUCCESS RATE | AVG DURATION | ACTIONS

Sample rows:
🟢 Healthy   | tenant_001 | order_processing    | v2.3.1 | 1,247  | 99.8% | 1.2s   | View
🟡 Warning   | tenant_002 | payment_flow        | v3.1.0 | 892    | 94.2% | 2.8s   | View
🔴 Critical  | tenant_003 | inventory_sync      | v1.8.2 | 523    | 76.5% | 5.4s   | View
🟢 Healthy   | tenant_004 | user_auth           | v4.0.1 | 3,421  | 99.9% | 0.3s   | View

═══════════════════════════════════════════════════════
TAB 3 — API ENDPOINTS
═══════════════════════════════════════════════════════
Columns: STATUS | TENANT ID | ENDPOINT | METHOD | LATENCY (p95) | ERROR RATE | RPS | LAST CHECK | ACTIONS

Sample rows:
🟢 Healthy   | tenant_001 | /api/v2/orders     | POST | 142ms  | 0.02% | 45/s  | 1s ago  | View
🟡 Warning   | tenant_002 | /api/v2/payments   | POST | 380ms  | 1.4%  | 23/s  | 2s ago  | View
🔴 Critical  | tenant_003 | /api/v1/inventory  | GET  | 1.2s   | 8.7%  | 12/s  | 1s ago  | View
🟢 Healthy   | tenant_004 | /api/v3/auth       | POST | 89ms   | 0.01% | 156/s | 1s ago  | View

═══════════════════════════════════════════════════════
TABLE STYLING (applies to all 3 tabs)
═══════════════════════════════════════════════════════
- Status column: pill-shaped badge with colored dot + text
  • Healthy: green bg #DCFCE7, green text #16A34A, green dot
  • Warning: amber bg #FEF3C7, amber text #D97706, amber dot
  • Critical: red bg #FEE2E2, red text #DC2626, red dot (pulsing)
- Tenant ID: monospace font, blue link color, hoverable
- Numeric columns: right-aligned, tabular-nums
- Latency/Error rate: color-coded by threshold
- Hover: row background #F8FAFC + cursor pointer
- "View" action: purple text link with arrow icon
- Sortable columns: arrow indicator on hover

═══════════════════════════════════════════════════════
PAGINATION (functional, at bottom of table)
═══════════════════════════════════════════════════════
Left side: 
  "Showing 1-10 of 247 entries" 
  + dropdown "10 per page" (options: 10/25/50/100)

Right side: pagination controls
  [« Prev] [1] [2] [3] ... [25] [Next »]
  - Active page: purple bg, white text
  - Hover: light purple bg
  - Disabled state for prev/next at boundaries
  - Ellipsis when many pages

═══════════════════════════════════════════════════════
DESIGN SYSTEM
═══════════════════════════════════════════════════════

COLORS:
- Background: #F8FAFC
- Cards: #FFFFFF
- Primary: #7C3AED (violet-600)
- Primary hover: #6D28D9
- Success: #10B981 / bg #DCFCE7
- Warning: #F59E0B / bg #FEF3C7
- Danger: #EF4444 / bg #FEE2E2
- Info: #3B82F6 / bg #DBEAFE
- Text primary: #0F172A
- Text secondary: #64748B
- Borders: #E2E8F0
- Hover bg: #F1F5F9

TYPOGRAPHY (Inter font):
- Page title: 24px bold
- Section heading: 20px semibold
- Card label: 11px uppercase, 0.5px letter-spacing, gray-500
- KPI number: 36px bold, tabular-nums
- Body: 14px regular
- Small/meta: 12px regular
- Monospace for tenant IDs: JetBrains Mono or SF Mono

SPACING:
- Card padding: 24px
- Card gap: 16px
- Section gap: 24px
- Border radius: 16px (cards), 10px (buttons), 8px (inputs), 999px (pills)

INTERACTIONS & ANIMATIONS:
- Number count-up animation when KPI updates
- Pulsing dot for live indicators
- Smooth line drawing for real-time charts
- Hover lift on cards (translate-y -2px + shadow)
- Tab switching with smooth underline slide
- Table row hover with background transition
- Skeleton loading states for initial load
- Toast notifications for new critical alerts (top-right)

REAL-TIME UX CUES:
- Pulsing green "LIVE" indicators throughout
- "Last updated Xs ago" timestamps that auto-increment
- Subtle flash animation when a value changes
- Smooth transitions, never jarring updates

OVERALL VIBE:
Modern, clean, breathable. Inspired by Linear, Vercel Analytics, 
Datadog, and Grafana Cloud. Data-dense but never cluttered. 
Every element should feel intentional. Generous whitespace, 
clear visual hierarchy, accessible color contrast (WCAG AA).
The user should immediately understand: "What's healthy? What needs my attention right now?"