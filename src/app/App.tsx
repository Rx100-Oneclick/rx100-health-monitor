import { useEffect, useMemo, useState } from 'react';
import { KPICards } from './components/KPICards';
import { PolicyBreakdown } from './components/PolicyBreakdown';
import { AIInsights } from './components/AIInsights';
import { APIHealthChart } from './components/APIHealthChart';
import { ViolationHeatmap } from './components/ViolationHeatmap';
import { TenantMonitoring } from './components/TenantMonitoring';
import { useHealthMonitorData } from './hooks/useHealthMonitorData';
import { openChildMicroapp, useWorkflowHealthMonitorClient, useXoRuntime } from '@/microapp/runtime';
import { microappConfig } from '../../microapp.config';

const REVIEW_MICROAPP_KEY = 'workflow-orchestra-review';

export default function App() {
  const { bridge, tenantId } = useXoRuntime();
  const { client, error: clientError, isReady: clientReady } = useWorkflowHealthMonitorClient();
  const { data, loading, error, lastUpdatedAt } = useHealthMonitorData(client, tenantId, clientReady && !clientError);
  const [now, setNow] = useState(Date.now());
  const [navigationError, setNavigationError] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const lastSync = useMemo(() => {
    if (!lastUpdatedAt) return 0;
    return Math.max(0, Math.floor((now - lastUpdatedAt.getTime()) / 1000));
  }, [lastUpdatedAt, now]);

  const handleViewMore = () => {
    setNavigationError(null);
    void openChildMicroapp(bridge, REVIEW_MICROAPP_KEY, {
      parentMicroappKey: microappConfig.microappKey,
    }).catch(() => {
      setNavigationError('Unable to open Workflow Orchestra Review.');
    });
  };

  if (clientError) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 shadow-sm max-w-lg">
          <h1 className="text-xl font-bold text-red-600">Datasource unavailable</h1>
          <p className="mt-2 text-sm text-gray-600">Unable to connect to the authorized XOOS datasource.</p>
        </div>
      </div>
    );
  }

  if (!clientReady) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 shadow-sm max-w-md text-center">
          <div className="mx-auto mb-4 h-10 w-10 rounded-full border-4 border-purple-100 border-t-[#7C3AED] animate-spin" />
          <h1 className="text-xl font-bold text-[#0F172A]">Connecting to XOOS</h1>
          <p className="mt-2 text-sm text-gray-500">Loading the authorized health-monitor datasource.</p>
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
              <p className="text-xs sm:text-[13px] text-gray-500 mt-0.5">
                Real-time policy, workflow & API observability{tenantId ? ` • ${tenantId}` : ''}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full">
                <div className="relative"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div><div className="absolute inset-0 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div></div>
                <span className="text-[11px] sm:text-[13px] font-medium text-emerald-700">LIVE</span>
                <span className="text-[10px] sm:text-[12px] text-emerald-600">Last sync: {lastSync}s ago</span>
              </div>
            </div>
          </div>

          {(loading || error || navigationError) && (
            <div className={`${error || navigationError ? 'bg-red-50 text-red-700 border-red-100' : 'bg-blue-50 text-blue-700 border-blue-100'} border rounded-xl px-4 py-3 text-sm`}>
              {navigationError ? navigationError : error ? `Unable to load tenant data: ${error}` : 'Loading tenant health data...'}
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

          <TenantMonitoring
            policies={data.policies}
            workflows={data.workflows}
            endpoints={data.apiEndpoints}
            onViewMore={handleViewMore}
          />
        </div>
      </div>
    </div>
  );
}
