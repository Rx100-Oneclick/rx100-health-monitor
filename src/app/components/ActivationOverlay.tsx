import { useEffect, useMemo, useRef, useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const ACTIVATION_APP_ID = '44110e0f-3d40-4319-b046-4473370b73db';

interface ActivationOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenantId: string | null;
  userId: string | null;
  email: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  onApplied: () => void;
}

type IframeMessage = {
  type?: string;
};

export function ActivationOverlay({ open, onOpenChange, tenantId, userId, email, accessToken, refreshToken, onApplied }: ActivationOverlayProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [targetUrl, setTargetUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !supabase) return;

    let cancelled = false;
    setLoading(true);
    setError(null);
    setTargetUrl(null);

    supabase
      .from('app_registry')
      .select('target_url')
      .eq('app_id', ACTIVATION_APP_ID)
      .maybeSingle()
      .then(({ data, error: registryError }) => {
        if (cancelled) return;
        if (registryError) {
          setError(registryError.message);
          setLoading(false);
          return;
        }
        if (!data?.target_url) {
          setError('Activation application URL is not configured.');
          setLoading(false);
          return;
        }
        setTargetUrl(data.target_url);
      });

    return () => {
      cancelled = true;
    };
  }, [open]);

  const iframeUrl = useMemo(() => {
    if (!targetUrl) return null;
    const url = new URL(targetUrl);
    if (accessToken) url.searchParams.set('access_token', accessToken);
    if (refreshToken) url.searchParams.set('refresh_token', refreshToken);
    if (userId) url.searchParams.set('user_id', userId);
    if (email) url.searchParams.set('email', email);
    if (tenantId) url.searchParams.set('tenant_id', tenantId);
    url.searchParams.set('app_id', ACTIVATION_APP_ID);
    return url.toString();
  }, [accessToken, email, refreshToken, targetUrl, tenantId, userId]);

  const postAuthSession = () => {
    setLoading(false);
    iframeRef.current?.contentWindow?.postMessage({
      type: 'AUTH_SESSION',
      payload: {
        access_token: accessToken ?? undefined,
        refresh_token: refreshToken ?? undefined,
      },
    }, '*');
  };

  const handleBackToMonitoring = () => {
    iframeRef.current?.contentWindow?.postMessage({ type: 'NAVIGATE_BACK' }, '*');
  };

  useEffect(() => {
    if (!open) return;

    const onMessage = (event: MessageEvent<IframeMessage>) => {
      if (event.data?.type === 'NAVIGATE_BACK') {
        onOpenChange(false);
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [onOpenChange, open]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-50 flex h-full w-full flex-col bg-background p-0 shadow-2xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0"
        >
          <DialogPrimitive.Title className="sr-only">Embedded activation application</DialogPrimitive.Title>
          {(loading || !iframeUrl) && !error && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/90 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card px-8 py-7 shadow-xl">
                <div className="relative flex h-16 w-16 items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 opacity-20 blur-md animate-pulse" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-primary-foreground shadow-lg">
                    <Loader2 className="h-7 w-7 animate-spin" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-foreground">Loading activation workspace</p>
                  <p className="mt-1 text-xs text-muted-foreground">Preparing secure session handoff...</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex h-full items-center justify-center bg-background p-6">
              <div className="max-w-md rounded-2xl border border-destructive/20 bg-card p-6 text-center shadow-lg">
                <h2 className="text-lg font-semibold text-destructive">Unable to open application</h2>
                <p className="mt-2 text-sm text-muted-foreground">{error}</p>
                <button onClick={handleBackToMonitoring} className="mt-5 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:from-indigo-600 hover:to-violet-700">
                  Back to monitoring
                </button>
              </div>
            </div>
          )}

          {iframeUrl && !error && (
            <iframe
              ref={iframeRef}
              title="Activation application"
              src={iframeUrl}
              onLoad={postAuthSession}
              className="h-full w-full border-0"
              allow="clipboard-read; clipboard-write"
            />
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
