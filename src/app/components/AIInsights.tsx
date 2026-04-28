import { Sparkles, ArrowRight } from 'lucide-react';
import type { RootCauseEvent } from '../types';

interface AIInsightsProps {
  insights: RootCauseEvent[];
}

const severityConfig = (severity: string) => {
  const value = severity.toLowerCase();
  if (value === 'critical') return { icon: '🔴', borderColor: 'border-l-red-500' };
  if (value === 'high' || value === 'warning') return { icon: '🟡', borderColor: 'border-l-amber-500' };
  return { icon: '🔵', borderColor: 'border-l-blue-500' };
};

export function AIInsights({ insights }: AIInsightsProps) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#7C3AED]" />
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#0F172A]">AI Root Cause Analysis</h2>
        </div>
        <span className="px-2.5 py-1 bg-purple-50 text-[#7C3AED] text-[10px] sm:text-xs font-medium rounded-full self-start sm:self-auto">AI Powered</span>
      </div>
      <div className="flex flex-col gap-2 sm:gap-3">
        {insights.length === 0 && <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-500">No unresolved root cause events for this tenant.</div>}
        {insights.map((insight, idx) => {
          const config = severityConfig(insight.severity);
          return (
            <div key={`${insight.title}-${idx}`} className={`border-l-4 ${config.borderColor} bg-gray-50 rounded-r-lg p-3 sm:p-4 hover:bg-gray-100 transition-colors`}>
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-base sm:text-lg">{config.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#0F172A] text-xs sm:text-sm mb-1">{insight.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-1.5 sm:mb-2">{insight.description}</p>
                  <button className="flex items-center gap-1 text-xs sm:text-sm text-[#7C3AED] hover:text-[#6D28D9] transition-colors">
                    {insight.actionLabel}<ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
