import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';

export function APIHealthChart() {
  const [data, setData] = useState(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: `point-${i}`,
      time: i,
      p50: 80 + Math.random() * 40,
      p95: 120 + Math.random() * 60,
      p99: 180 + Math.random() * 80
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newTime = prev[prev.length - 1].time + 1;
        return [
          ...prev.slice(1),
          {
            id: `point-${newTime}`,
            time: newTime,
            p50: 80 + Math.random() * 40,
            p95: 120 + Math.random() * 60,
            p99: 180 + Math.random() * 80
          }
        ];
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#0F172A]">API Health Trend</h2>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1 bg-red-50 rounded-full">
            <div className="relative">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
              <div className="absolute inset-0 w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></div>
            </div>
            <span className="text-[10px] sm:text-xs font-medium text-red-700">LIVE</span>
          </div>
          <span className="text-[10px] sm:text-xs text-gray-500 hidden sm:inline">Updates every 1s</span>
        </div>
      </div>

      <div className="h-[200px] sm:h-[240px] md:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              key="xaxis"
              dataKey="time"
              tickFormatter={(value) => `${value % 60}s`}
              stroke="#94A3B8"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              key="yaxis"
              domain={[0, 500]}
              stroke="#94A3B8"
              style={{ fontSize: '12px' }}
              label={{ value: 'Latency (ms)', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
            />
            <ReferenceLine key="slo-line" y={300} stroke="#F59E0B" strokeDasharray="5 5" label={{ value: 'SLO', position: 'right', fill: '#F59E0B', fontSize: 12 }} />
            <Line key="p50-line" type="monotone" dataKey="p50" stroke="#3B82F6" strokeWidth={2} dot={false} isAnimationActive={false} />
            <Line key="p95-line" type="monotone" dataKey="p95" stroke="#F59E0B" strokeWidth={2} dot={false} isAnimationActive={false} />
            <Line key="p99-line" type="monotone" dataKey="p99" stroke="#EF4444" strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 mt-3 sm:mt-4">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#3B82F6]"></div>
          <span className="text-xs sm:text-sm text-gray-600">p50</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#F59E0B]"></div>
          <span className="text-xs sm:text-sm text-gray-600">p95</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#EF4444]"></div>
          <span className="text-xs sm:text-sm text-gray-600">p99</span>
        </div>
      </div>
    </div>
  );
}
