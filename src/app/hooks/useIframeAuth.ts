import { useEffect, useMemo, useState } from 'react';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

interface AuthState {
  tenantId: string | null;
  userId: string | null;
  email: string | null;
  isReady: boolean;
  error: string | null;
}

type AuthMessage = {
  type?: string;
  payload?: {
    access_token?: string;
    refresh_token?: string;
    tenant_id?: string;
    user_id?: string;
    email?: string;
  };
};

export function useIframeAuth(): AuthState {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const [tenantId, setTenantId] = useState(params.get('tenant_id'));
  const [userId, setUserId] = useState(params.get('user_id'));
  const [email, setEmail] = useState(params.get('email'));
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const applySession = async (accessToken?: string | null, refreshToken?: string | null) => {
      if (!isSupabaseConfigured || !supabase) {
        if (!cancelled) {
          setError('Supabase environment variables are missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
          setIsReady(true);
        }
        return;
      }

      if (!tenantId) {
        window.parent?.postMessage({ type: 'IFRAME_READY' }, '*');
        if (!cancelled) setError('Waiting for tenant_id from the parent application.');
        return;
      }

      if (accessToken && refreshToken) {
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (sessionError) {
          if (!cancelled) {
            setError(sessionError.message);
            setIsReady(true);
          }
          return;
        }
      }

      if (!cancelled) {
        setError(null);
        setIsReady(true);
      }
    };

    void applySession(params.get('access_token'), params.get('refresh_token'));
    window.parent?.postMessage({ type: 'IFRAME_READY' }, '*');

    const onMessage = (event: MessageEvent<AuthMessage>) => {
      if (event.data?.type !== 'AUTH_SESSION') return;
      const payload = event.data.payload ?? {};
      if (payload.tenant_id) setTenantId(payload.tenant_id);
      if (payload.user_id) setUserId(payload.user_id);
      if (payload.email) setEmail(payload.email);
      void applySession(payload.access_token, payload.refresh_token);
    };

    window.addEventListener('message', onMessage);
    return () => {
      cancelled = true;
      window.removeEventListener('message', onMessage);
    };
  }, [params, tenantId]);

  return { tenantId, userId, email, isReady, error };
}
