import { useState, useEffect } from 'react';
import { ShieldCheck, Activity, HeartPulse, AlertTriangle } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface KPICardsProps {
  lastSync: number;
}

export function KPICards({ lastSync }: KPICardsProps) {
  const [sparklineData, setSparklineData] = useState({
    compliance: Array.from({ length: 60 }, (_, i) => ({ id: `c-${i}`, value: 92 + Math.random() * 3 })),
    workflows: Array.from({ length: 60 }, (_, i) => ({ id: `w-${i}`, value: 240 + Math.random() * 10 })),
    apiHealth: Array.from({ length: 60 }, (_, i) => ({ id: `a-${i}`, value: 96 + Math.random() * 2 })),
    violations: Array.from({ length: 60 }, (_, i) => ({ id: `v-${i}`, value: 5 + Math.random() * 3 }))
  });

  useEffect(() => {
    let counter = 60;
    const interval = setInterval(() => {
      counter++;
      setSparklineData(prev => ({
        compliance: [...prev.compliance.slice(1), { id: `c-${counter}`, value: 92 + Math.random() * 3 }],
        workflows: [...prev.workflows.slice(1), { id: `w-${counter}`, value: 240 + Math.random() * 10 }],
        apiHealth: [...prev.apiHealth.slice(1), { id: `a-${counter}`, value: 96 + Math.random() * 2 }],
        violations: [...prev.violations.slice(1), { id: `v-${counter}`, value: 5 + Math.random() * 3 }]
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      icon: ShieldCheck,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-500',
      label: 'POLICY COMPLIANCE',
      value: '94.2%',
      valueColor: 'text-emerald-500',
      subtitle: '↑ 1.8% vs yesterday',
      subtitleColor: 'text-emerald-600',
      sparkline: sparklineData.compliance,
      lineColor: '#10B981'
    },
    {
      icon: Activity,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-500',
      label: 'ACTIVE WORKFLOWS',
      value: '247',
      valueColor: 'text-blue-500',
      subtitle: (
        <span className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            <span>12 running</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            <span>3 failed</span>
          </span>
        </span>
      ),
      subtitleColor: 'text-gray-600',
      sparkline: sparklineData.workflows,
      lineColor: '#3B82F6'
    },
    {
      icon: HeartPulse,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-500',
      label: 'API HEALTH SCORE',
      value: '98/100',
      valueColor: 'text-emerald-500',
      subtitle: 'p95 latency: 142ms',
      subtitleColor: 'text-gray-600',
      sparkline: sparklineData.apiHealth,
      lineColor: '#10B981'
    },
    {
      icon: AlertTriangle,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-500',
      label: 'POLICY VIOLATIONS',
      value: '7',
      valueColor: 'text-amber-500',
      subtitle: (
        <span className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            <span>2 critical</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
            <span>5 warnings</span>
          </span>
        </span>
      ),
      subtitleColor: 'text-gray-600',
      sparkline: sparklineData.violations,
      lineColor: '#F59E0B'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`${card.iconBg} p-2 sm:p-2.5 rounded-lg sm:rounded-xl`}>
                <card.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${card.iconColor}`} />
              </div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wide text-gray-500">{card.label}</span>
            </div>
          </div>

          <div className={`text-2xl sm:text-3xl md:text-4xl font-bold ${card.valueColor} mb-1 tabular-nums`}>
            {card.value}
          </div>

          <div className={`text-xs sm:text-sm ${card.subtitleColor} mb-3 sm:mb-4`}>
            {card.subtitle}
          </div>

          <div className="h-[50px] sm:h-[60px] -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={card.sparkline}>
                <Line
                  key={`sparkline-${idx}`}
                  type="monotone"
                  dataKey="value"
                  stroke={card.lineColor}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center gap-1.5 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100">
            <div className="relative">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
              <div className="absolute inset-0 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>
            </div>
            <span className="text-[10px] sm:text-[11px] text-gray-500">Live • Updated {lastSync}s ago</span>
          </div>
        </div>
      ))}
    </div>
  );
}
