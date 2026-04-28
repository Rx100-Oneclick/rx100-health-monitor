import { ShieldCheck } from 'lucide-react';
import type { PolicyBreakdownData } from '../types';

interface PolicyBreakdownProps {
  data: PolicyBreakdownData;
}

export function PolicyBreakdown({ data }: PolicyBreakdownProps) {
  const metrics = [
    { label: 'TOTAL\nPOLICIES', value: data.totalPolicies.toLocaleString(), color: 'text-slate-700', bg: 'bg-slate-50' },
    { label: 'COMPLIANT', value: `${data.compliant.toLocaleString()} ✓`, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'NON-COMPLIANT', value: `${data.nonCompliant.toLocaleString()} ✗`, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'EXEMPTED', value: data.exempted.toLocaleString(), color: 'text-gray-600', bg: 'bg-gray-50' },
    { label: 'LAST AUDIT', value: data.lastAudit, color: 'text-slate-700', bg: 'bg-slate-50' },
    { label: 'DRIFT EVENTS', value: `+${data.driftEventsToday} today`, color: 'text-amber-600', bg: 'bg-amber-50' }
  ];

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#0F172A]">Policy Compliance Breakdown</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {metrics.map((metric, idx) => (
          <div key={idx} className={`${metric.bg} rounded-lg sm:rounded-xl p-3 sm:p-4 hover:shadow-sm transition-all cursor-pointer`}>
            <div className="text-[10px] sm:text-[11px] uppercase tracking-wide text-gray-500 mb-1.5 sm:mb-2 whitespace-pre-line">{metric.label}</div>
            <div className={`text-xl sm:text-2xl font-bold ${metric.color} tabular-nums`}>{metric.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
