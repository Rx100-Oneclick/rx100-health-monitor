import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Tooltip } from 'recharts';
import type { ViolationHeatmapPoint } from '../types';

interface ViolationHeatmapProps {
  data: ViolationHeatmapPoint[];
}

export function ViolationHeatmap({ data }: ViolationHeatmapProps) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#0F172A]">Policy Violation Heatmap</h2>
        <span className="px-2.5 py-1 bg-purple-50 text-[#7C3AED] text-[10px] sm:text-xs font-medium rounded-full self-start sm:self-auto">MONITORING</span>
      </div>
      {data.length === 0 ? (
        <div className="h-[200px] sm:h-[240px] md:h-[280px] flex items-center justify-center rounded-lg bg-gray-50 text-sm text-gray-500">No policy violations in the last 24 hours.</div>
      ) : (
        <div className="h-[200px] sm:h-[240px] md:h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="time" stroke="#94A3B8" style={{ fontSize: '12px' }} />
              <YAxis stroke="#94A3B8" style={{ fontSize: '12px' }} label={{ value: 'Violations', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }} />
              <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '12px' }} />
              <ReferenceLine y={15} stroke="#64748B" strokeDasharray="5 5" label={{ value: 'Threshold', position: 'right', fill: '#64748B', fontSize: 12 }} />
              <Bar dataKey="critical" stackId="a" fill="#EF4444" />
              <Bar dataKey="high" stackId="a" fill="#F97316" />
              <Bar dataKey="medium" stackId="a" fill="#F59E0B" />
              <Bar dataKey="low" stackId="a" fill="#FCD34D" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 mt-3 sm:mt-4">
        {[['Critical','#EF4444'],['High','#F97316'],['Medium','#F59E0B'],['Low','#FCD34D']].map(([label,color]) => <div key={label} className="flex items-center gap-1.5 sm:gap-2"><div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: color }}></div><span className="text-xs sm:text-sm text-gray-600">{label}</span></div>)}
      </div>
    </div>
  );
}
