import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Tooltip } from 'recharts';

export function ViolationHeatmap() {
  const data = [
    { id: 'slot-0', time: '15:00', critical: 2, high: 3, medium: 5, low: 2 },
    { id: 'slot-1', time: '15:05', critical: 1, high: 4, medium: 3, low: 4 },
    { id: 'slot-2', time: '15:10', critical: 3, high: 2, medium: 6, low: 3 },
    { id: 'slot-3', time: '15:15', critical: 1, high: 3, medium: 4, low: 5 },
    { id: 'slot-4', time: '15:20', critical: 4, high: 5, medium: 2, low: 2 },
    { id: 'slot-5', time: '15:25', critical: 2, high: 3, medium: 4, low: 3 },
    { id: 'slot-6', time: '15:30', critical: 1, high: 2, medium: 5, low: 4 },
    { id: 'slot-7', time: '15:35', critical: 3, high: 4, medium: 3, low: 2 },
    { id: 'slot-8', time: '15:40', critical: 2, high: 2, medium: 6, low: 5 },
    { id: 'slot-9', time: '15:45', critical: 1, high: 3, medium: 4, low: 3 },
    { id: 'slot-10', time: '15:50', critical: 2, high: 4, medium: 3, low: 4 },
    { id: 'slot-11', time: '15:55', critical: 1, high: 2, medium: 5, low: 2 }
  ];

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#0F172A]">Policy Violation Heatmap</h2>
        <span className="px-2.5 py-1 bg-purple-50 text-[#7C3AED] text-[10px] sm:text-xs font-medium rounded-full self-start sm:self-auto">
          MONITORING
        </span>
      </div>

      <div className="h-[200px] sm:h-[240px] md:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              key="xaxis"
              dataKey="time"
              stroke="#94A3B8"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              key="yaxis"
              stroke="#94A3B8"
              style={{ fontSize: '12px' }}
              label={{ value: 'Violations', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <ReferenceLine key="threshold-line" y={15} stroke="#64748B" strokeDasharray="5 5" label={{ value: 'Threshold', position: 'right', fill: '#64748B', fontSize: 12 }} />
            <Bar key="critical-bar" dataKey="critical" stackId="a" fill="#EF4444" />
            <Bar key="high-bar" dataKey="high" stackId="a" fill="#F97316" />
            <Bar key="medium-bar" dataKey="medium" stackId="a" fill="#F59E0B" />
            <Bar key="low-bar" dataKey="low" stackId="a" fill="#FCD34D" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 mt-3 sm:mt-4">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#EF4444]"></div>
          <span className="text-xs sm:text-sm text-gray-600">Critical</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#F97316]"></div>
          <span className="text-xs sm:text-sm text-gray-600">High</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#F59E0B]"></div>
          <span className="text-xs sm:text-sm text-gray-600">Medium</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FCD34D]"></div>
          <span className="text-xs sm:text-sm text-gray-600">Low</span>
        </div>
      </div>
    </div>
  );
}
