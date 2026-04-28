import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';
import type { ApiTrendPoint } from '../types';

interface APIHealthChartProps {
  data: ApiTrendPoint[];
}

export function APIHealthChart({ data }: APIHealthChartProps) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#0F172A]">API Health Trend</h2>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1 bg-red-50 rounded-full">
            <div className="relative"><div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div><div className="absolute inset-0 w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></div></div>
            <span className="text-[10px] sm:text-xs font-medium text-red-700">LIVE</span>
          </div>
          <span className="text-[10px] sm:text-xs text-gray-500 hidden sm:inline">Updates from realtime</span>
        </div>
      </div>
      {data.length === 0 ? (
        <div className="h-[200px] sm:h-[240px] md:h-[280px] flex items-center justify-center rounded-lg bg-gray-50 text-sm text-gray-500">No API metrics in the last hour.</div>
      ) : (
        <div className="h-[200px] sm:h-[240px] md:h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="time" stroke="#94A3B8" style={{ fontSize: '12px' }} />
              <YAxis domain={[0, 'auto']} stroke="#94A3B8" style={{ fontSize: '12px' }} label={{ value: 'Latency (ms)', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }} />
              <ReferenceLine y={300} stroke="#F59E0B" strokeDasharray="5 5" label={{ value: 'SLO', position: 'right', fill: '#F59E0B', fontSize: 12 }} />
              <Line type="monotone" dataKey="p50" stroke="#3B82F6" strokeWidth={2} dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="p95" stroke="#F59E0B" strokeWidth={2} dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="p99" stroke="#EF4444" strokeWidth={2} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
      <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 mt-3 sm:mt-4">
        {['p50', 'p95', 'p99'].map((label, idx) => <div key={label} className="flex items-center gap-1.5 sm:gap-2"><div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${idx===0?'bg-[#3B82F6]':idx===1?'bg-[#F59E0B]':'bg-[#EF4444]'}`}></div><span className="text-xs sm:text-sm text-gray-600">{label}</span></div>)}
      </div>
    </div>
  );
}
