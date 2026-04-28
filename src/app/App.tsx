import { useEffect, useMemo, useState } from 'react';
import { KPICards } from './components/KPICards';
import { PolicyBreakdown } from './components/PolicyBreakdown';
import { AIInsights } from './components/AIInsights';
import { APIHealthChart } from './components/APIHealthChart';
import { ViolationHeatmap } from './components/ViolationHeatmap';
import { TenantMonitoring } from './components/TenantMonitoring';
import { useIframeAuth } from './hooks/useIframeAuth';
import { useHealthMonitorData } from './hooks/useHealthMonitorData';

export default function App() {
  const auth = useIframeAuth();
  const { data, loading, error, lastUpdatedAt } = useHealthMonitorData(auth.tenantId, auth.isReady && !auth.error);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const lastSync = useMemo(() => {
    if (!lastUpdatedAt) return 0;
    return Math.max(0, Math.floor((now - lastUpdatedAt.getTime()) / 1000));
  }, [lastUpdatedAt, now]);

  if (!auth.isReady) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 shadow-sm max-w-md text-center">
          <div className="mx-auto mb-4 h-10 w-10 rounded-full border-4 border-purple-100 border-t-[#7C3AED] animate-spin" />
          <h1 className="text-xl font-bold text-[#0F172A]">Waiting for authentication</h1>
          <p className="mt-2 text-sm text-gray-500">The dashboard is waiting for the parent application to provide session tokens and tenant_id.</p>
        </div>
      </div>
    );
  }

  if (auth.error) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 shadow-sm max-w-lg">
          <h1 className="text-xl font-bold text-red-600">Authentication setup required</h1>
          <p className="mt-2 text-sm text-gray-600">{auth.error}</p>
          <p className="mt-4 text-xs text-gray-500">Expected URL params: access_token, refresh_token, user_id, email, tenant_id. Backup auth is supported through AUTH_SESSION postMessage.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="py-3 px-3 sm:py-4 sm:px-4 md:py-6 md:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0F172A]">Health Monitor</h1>
              <p className="text-xs sm:text-[13px] text-gray-500 mt-0.5">Real-time policy, workflow & API observability{auth.tenantId ? ` • ${auth.tenantId}` : ''}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full">
                <div className="relative"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div><div className="absolute inset-0 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div></div>
                <span className="text-[11px] sm:text-[13px] font-medium text-emerald-700">LIVE</span>
                <span className="text-[10px] sm:text-[12px] text-emerald-600">Last sync: {lastSync}s ago</span>
              </div>
            </div>
          </div>

          {(loading || error) && (
            <div className={`${error ? 'bg-red-50 text-red-700 border-red-100' : 'bg-blue-50 text-blue-700 border-blue-100'} border rounded-xl px-4 py-3 text-sm`}>
              {error ? `Unable to load tenant data: ${error}` : 'Loading tenant health data...'}
            </div>
          )}

          <KPICards lastSync={lastSync} summary={data.summary} apiTrend={data.apiTrend} violationHeatmap={data.violationHeatmap} />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
            <div className="lg:col-span-3"><PolicyBreakdown data={data.policyBreakdown} /></div>
            <div className="lg:col-span-2"><AIInsights insights={data.rootCauseEvents} /></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            <APIHealthChart data={data.apiTrend} />
            <ViolationHeatmap data={data.violationHeatmap} />
          </div>

          <TenantMonitoring policies={data.policies} workflows={data.workflows} endpoints={data.apiEndpoints} summary={data.summary} />
        </div>
      </div>
    </div>
  );
}
