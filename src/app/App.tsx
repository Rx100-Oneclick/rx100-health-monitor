import { useState, useEffect } from 'react';
import { KPICards } from './components/KPICards';
import { PolicyBreakdown } from './components/PolicyBreakdown';
import { AIInsights } from './components/AIInsights';
import { APIHealthChart } from './components/APIHealthChart';
import { ViolationHeatmap } from './components/ViolationHeatmap';
import { TenantMonitoring } from './components/TenantMonitoring';

export default function App() {
  const [lastSync, setLastSync] = useState(2);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastSync(prev => (prev < 10 ? prev + 1 : 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Main Content */}
      <div className="py-3 px-3 sm:py-4 sm:px-4 md:py-6 md:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
          {/* Page Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0F172A]">Health Monitor</h1>
              <p className="text-xs sm:text-[13px] text-gray-500 mt-0.5">Real-time policy, workflow & API observability</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full">
                <div className="relative">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <div className="absolute inset-0 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                </div>
                <span className="text-[11px] sm:text-[13px] font-medium text-emerald-700">LIVE</span>
                <span className="text-[10px] sm:text-[12px] text-emerald-600">Last sync: {lastSync}s ago</span>
              </div>
              
            </div>
          </div>
          {/* Row 1 - KPI Cards */}
          <KPICards lastSync={lastSync} />

          {/* Row 2 - Policy Breakdown and AI Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
            <div className="lg:col-span-3">
              <PolicyBreakdown />
            </div>
            <div className="lg:col-span-2">
              <AIInsights />
            </div>
          </div>

          {/* Row 3 - Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            <APIHealthChart />
            <ViolationHeatmap />
          </div>

          {/* Row 4 - Tenant Monitoring */}
          <TenantMonitoring />
        </div>
      </div>
    </div>
  );
}
