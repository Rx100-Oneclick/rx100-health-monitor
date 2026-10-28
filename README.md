# Workflow Health Monitor

XOOS Native ESM hub/dashboard Microapp for real-time policy, workflow, and API health monitoring.

## XOOS Microapp identity

```text
schemaVersion: 1
microappKey: workflow-health-monitor
version: 1.0.0
elementName: xoos-workflow-health-monitor
deliveryType: native_esm
contractVersion: 1
minimumRuntimeVersion: 1.0.0
dataProjectKey: xoos-core
```

The production entry is mounted by `@xoos/microapp-adapter@0.3.0` using `defineXOOSMicroapp()` with Shadow DOM enabled.

## Hub navigation

The existing **View More** control is a child Microapp launch.

```text
workflow-health-monitor
  View More
    → workflow-orchestra-review
```

Runtime navigation passes:

```ts
{
  parentMicroappKey: "workflow-health-monitor"
}
```

The child Microapp is responsible for enforcing its own effective permissions for any protected actions.

## Runtime datasource

The approved datasource is `xoos-core`, acquired through `@xoos/data-client` and the Runtime data bridge.

Existing business reads are preserved:

- `policy_health_metrics`
- `workflow_health_metrics`
- `api_health_metrics`
- `health_monitor_events`

The existing tenant filters, time windows, ordering, limits, KPI calculations, grouping, trend/heatmap transforms, and realtime subscriptions remain unchanged.

## Security migration

The following legacy host behavior was removed:

- URL-based access/refresh token transport
- browser-provided tenant/user identity as the runtime authority
- `AUTH_SESSION` / `IFRAME_READY` postMessage authentication
- Microapp-owned `supabase.auth.setSession()`
- persisted browser Supabase sessions
- iframe loading of the Review application
- `app_registry.target_url` lookup used to discover a child deployment URL
- wildcard child postMessage navigation
- direct browser Supabase client configuration
- committed local environment configuration

Runtime identity now comes from the XOOS bridge and the child is opened by its registered Microapp key.

## Permission boundary

**View More** is classified as `CHILD_MICROAPP_NAVIGATION`, not a local CREATE or UPDATE operation. No Services action string is guessed in this repository. If Services later defines the parent launch itself as restricted, wire that exact dynamic action through the Runtime permission API.

## Build

```sh
npm install
npm run build
npm run build:microapp
```

Microapp output:

```text
dist-microapp/
  xoos-microapp.js
  xoos-manifest.json
```

The post-build step computes SHA-256 over the final `xoos-microapp.js` bytes and writes the lowercase hex digest to the manifest.

## Release boundary

This migration configures the Microapp only. It does not upload artifacts, publish a release, update Storage, or modify control-plane deployment records.
