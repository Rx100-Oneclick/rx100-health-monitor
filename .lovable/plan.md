## Plan

I will update the embedded activation overlay so the parent Health Monitor app listens for `NAVIGATE_BACK` from the iframe and removes the existing lifecycle message handling.

## What will change

1. Remove lifecycle postMessage handling
   - Remove the parent listener branches for:
     - `LIFECYCLE_CANCEL`
     - `LIFECYCLE_APPLIED`
   - Stop forwarding those lifecycle messages to `window.parent` from this overlay.
   - Stop calling `onApplied()` from the lifecycle postMessage listener.

2. Add `NAVIGATE_BACK` handling
   - Update the message listener in `ActivationOverlay.tsx` to listen for:
     ```ts
     { type: 'NAVIGATE_BACK' }
     ```
   - When received from the iframe app, close the activation overlay with:
     ```ts
     onOpenChange(false)
     ```

3. Adjust message type naming
   - Replace the current `LifecycleMessage` type with a simpler message type that supports `NAVIGATE_BACK`.
   - Keep the existing auth postMessage behavior unchanged:
     ```ts
     AUTH_SESSION
     ```

4. Avoid closing too early from parent-side click
   - The current `handleBackToMonitoring` sends `NAVIGATE_BACK` into the iframe and immediately closes the overlay.
   - I will update this so the reliable flow is:
     ```text
     iframe back icon click
       -> iframe posts { type: 'NAVIGATE_BACK' } to parent
       -> parent receives NAVIGATE_BACK
       -> parent closes overlay
     ```

## Technical notes

- File to update: `src/app/components/ActivationOverlay.tsx`
- No database changes are required.
- No UI redesign is required for this change.
- The iframe application must send this message when its back icon is clicked:
  ```ts
  window.parent.postMessage({ type: 'NAVIGATE_BACK' }, '*');
  ```