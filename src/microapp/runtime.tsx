import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { XOOSMicroappBridge } from "@xoos/contracts";
import { createXOOSSupabaseClient } from "@xoos/data-client";
import { microappConfig } from "../../microapp.config";

interface RuntimeValue {
  bridge: XOOSMicroappBridge;
  props: Record<string, unknown>;
}

const RuntimeContext = createContext<RuntimeValue | null>(null);

export function BridgeProvider({
  bridge,
  props = {},
  children,
}: {
  bridge: XOOSMicroappBridge;
  props?: Record<string, unknown>;
  children: ReactNode;
}) {
  return (
    <RuntimeContext.Provider value={{ bridge, props }}>
      {children}
    </RuntimeContext.Provider>
  );
}

export function useBridgeRuntime(): RuntimeValue {
  const runtime = useContext(RuntimeContext);
  if (!runtime) {
    throw new Error(
      "XOOS runtime bridge is not available. The microapp must be mounted by XOOS Runtime.",
    );
  }
  return runtime;
}

export function useXoRuntime() {
  const { bridge, props } = useBridgeRuntime();

  return useMemo(
    () => ({
      bridge,
      props,
      userId: bridge.context.user.id,
      tenantId: bridge.context.tenant.id,
      clientId: bridge.context.client.id,
      scopes: bridge.context.scopes,
    }),
    [bridge, props],
  );
}

export async function openChildMicroapp(
  bridge: XOOSMicroappBridge,
  microappKey: string,
  props: Record<string, unknown> = {},
): Promise<void> {
  await bridge.navigation.navigate(
    microappKey,
    Object.keys(props).length > 0 ? { props } : undefined,
  );
}

const clientCache = new WeakMap<
  XOOSMicroappBridge,
  Map<string, Promise<SupabaseClient>>
>();

export function getWorkflowHealthMonitorClient(
  bridge: XOOSMicroappBridge,
): Promise<SupabaseClient> {
  const datasourceKey = microappConfig.dataProjectKey;

  let clients = clientCache.get(bridge);
  if (!clients) {
    clients = new Map();
    clientCache.set(bridge, clients);
  }

  let cached = clients.get(datasourceKey);
  if (!cached) {
    cached = createXOOSSupabaseClient({
      projectKey: datasourceKey,
      bridge: bridge.data,
    });
    clients.set(datasourceKey, cached);
  }

  return cached;
}

export function useWorkflowHealthMonitorClient() {
  const { bridge } = useBridgeRuntime();
  const [client, setClient] = useState<SupabaseClient | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    setClient(null);
    setError(null);

    getWorkflowHealthMonitorClient(bridge)
      .then((resolved) => {
        if (!cancelled) setClient(resolved);
      })
      .catch((reason) => {
        if (!cancelled) {
          setError(
            reason instanceof Error ? reason : new Error(String(reason)),
          );
        }
      });

    return () => {
      cancelled = true;
    };
  }, [bridge]);

  return { client, error, isReady: !!client };
}
