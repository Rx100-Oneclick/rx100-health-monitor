import { ShieldCheck, Activity, HeartPulse, AlertTriangle } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import type { SummaryData, ApiTrendPoint, ViolationHeatmapPoint } from '../types';

interface KPICardsProps {
  lastSync: number;
  summary: SummaryData;
  apiTrend: ApiTrendPoint[];
  violationHeatmap: ViolationHeatmapPoint[];
}

const flatSparkline = (value: number) => Array.from({ length: 12 }, (_, i) => ({ id: `flat-${i}`, value }));
const trendLine = (data: ApiTrendPoint[], key: 'p50' | 'p95' | 'p99', fallback: number) =>
  data.length ? data.map((x) => ({ id: x.id, value: x[key] })) : flatSparkline(fallback);
const violationLine = (data: ViolationHeatmapPoint[], fallback: number) =>
  data.length ? data.map((x) => ({ id: x.id, value: x.critical + x.high + x.medium + x.low })) : flatSparkline(fallback);

export function KPICards({ lastSync, summary, apiTrend, violationHeatmap }: KPICardsProps) {
  const cards = [
    {
      icon: ShieldCheck,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-500',
      label: 'POLICY COMPLIANCE',
      value: `${summary.policyCompliance.toFixed(1)}%`,
      valueColor: 'text-emerald-500',
      subtitle: `${summary.policyCompliance >= 90 ? '↑' : '↓'} Live tenant average`,
      subtitleColor: 'text-emerald-600',
      sparkline: flatSparkline(summary.policyCompliance),
      lineColor: '#10B981'
    },
    {
      icon: Activity,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-500',
      label: 'ACTIVE WORKFLOWS',
      value: summary.activeWorkflows.toLocaleString(),
      valueColor: 'text-blue-500',
      subtitle: (
        <span className="flex items-center gap-2">
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span><span>{summary.runningWorkflows} running</span></span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span><span>{summary.failedWorkflows} failed</span></span>
        </span>
      ),
      subtitleColor: 'text-gray-600',
      sparkline: flatSparkline(summary.activeWorkflows),
      lineColor: '#3B82F6'
    },
    {
      icon: HeartPulse,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-500',
      label: 'API HEALTH SCORE',
      value: `${Math.round(summary.apiHealthScore)}/100`,
      valueColor: 'text-emerald-500',
      subtitle: `p95 latency: ${Math.round(summary.apiLatencyP95)}ms`,
      subtitleColor: 'text-gray-600',
      sparkline: trendLine(apiTrend, 'p95', summary.apiLatencyP95),
      lineColor: '#10B981'
    },
    {
      icon: AlertTriangle,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-500',
      label: 'POLICY VIOLATIONS',
      value: summary.policyViolations.toLocaleString(),
      valueColor: 'text-amber-500',
      subtitle: (
        <span className="flex items-center gap-2">
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span><span>{summary.criticalViolations} critical</span></span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span><span>{summary.warningViolations} warnings</span></span>
        </span>
      ),
      subtitleColor: 'text-gray-600',
      sparkline: violationLine(violationHeatmap, summary.policyViolations),
      lineColor: '#F59E0B'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`${card.iconBg} p-2 sm:p-2.5 rounded-lg sm:rounded-xl`}><card.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${card.iconColor}`} /></div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wide text-gray-500">{card.label}</span>
            </div>
          </div>
          <div className={`text-2xl sm:text-3xl md:text-4xl font-bold ${card.valueColor} mb-1 tabular-nums`}>{card.value}</div>
          <div className={`text-xs sm:text-sm ${card.subtitleColor} mb-3 sm:mb-4`}>{card.subtitle}</div>
          <div className="h-[50px] sm:h-[60px] -mx-2">
            <ResponsiveContainer width="100%" height="100%"><LineChart data={card.sparkline}><Line type="monotone" dataKey="value" stroke={card.lineColor} strokeWidth={2} dot={false} isAnimationActive={false} /></LineChart></ResponsiveContainer>
          </div>
          <div className="flex items-center gap-1.5 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100">
            <div className="relative"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div><div className="absolute inset-0 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div></div>
            <span className="text-[10px] sm:text-[11px] text-gray-500">Live • Updated {lastSync}s ago</span>
          </div>
        </div>
      ))}
    </div>
  );
}
