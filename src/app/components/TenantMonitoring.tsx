import { useMemo, useState } from 'react';
import { Search, ChevronLeft, ChevronRight, FileText, Settings, Globe } from 'lucide-react';
import type { ApiEndpointRow, HealthStatus, PolicyRow, SummaryData, WorkflowRow } from '../types';

type TabType = 'policies' | 'workflows' | 'endpoints';

interface TenantMonitoringProps {
  policies: PolicyRow[];
  workflows: WorkflowRow[];
  endpoints: ApiEndpointRow[];
  summary: SummaryData;
}

const getStatusBadge = (status: HealthStatus) => {
  const configs = {
    healthy: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Healthy' },
    warning: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500', label: 'Warning' },
    critical: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500', label: 'Critical' }
  };
  const config = configs[status];
  return <span className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 ${config.bg} ${config.text} rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap`}><span className={`w-1.5 h-1.5 ${config.dot} rounded-full ${status === 'critical' ? 'animate-pulse' : ''}`}></span><span className="hidden sm:inline">{config.label}</span></span>;
};

const fmtPercent = (value: number) => `${Number(value).toFixed(value % 1 ? 1 : 0)}%`;
const fmtLatency = (value: number) => value >= 1000 ? `${(value / 1000).toFixed(1)}s` : `${Math.round(value)}ms`;

export function TenantMonitoring({ policies, workflows, endpoints, summary }: TenantMonitoringProps) {
  const [activeTab, setActiveTab] = useState<TabType>('policies');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  const visiblePolicies = useMemo(() => policies.filter((row) => `${row.policyName} ${row.category}`.toLowerCase().includes(searchQuery.toLowerCase())), [policies, searchQuery]);
  const visibleWorkflows = useMemo(() => workflows.filter((row) => `${row.workflowName} ${row.version}`.toLowerCase().includes(searchQuery.toLowerCase())), [workflows, searchQuery]);
  const visibleEndpoints = useMemo(() => endpoints.filter((row) => `${row.endpoint} ${row.method}`.toLowerCase().includes(searchQuery.toLowerCase())), [endpoints, searchQuery]);

  const activeRows = activeTab === 'policies' ? visiblePolicies : activeTab === 'workflows' ? visibleWorkflows : visibleEndpoints;
  const totalEntries = activeRows.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / perPage));
  const start = (currentPage - 1) * perPage;

  const criticalCount = policies.filter(x => x.status === 'critical').length + workflows.filter(x => x.status === 'critical').length + endpoints.filter(x => x.status === 'critical').length;
  const warningCount = policies.filter(x => x.status === 'warning').length + workflows.filter(x => x.status === 'warning').length + endpoints.filter(x => x.status === 'warning').length;
  const healthyCount = policies.filter(x => x.status === 'healthy').length + workflows.filter(x => x.status === 'healthy').length + endpoints.filter(x => x.status === 'healthy').length;

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#0F172A]">Monitoring</h2>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 bg-red-50 text-red-700 rounded-full text-[10px] sm:text-xs font-medium"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>{criticalCount} Critical</span>
            <span className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] sm:text-xs font-medium"><span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>{warningCount} Warning</span>
            <span className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] sm:text-xs font-medium"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>{healthyCount} Healthy</span>
          </div>
        </div>
        <div className="relative w-full sm:w-64"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" /><input type="text" placeholder="Search monitoring..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="w-full pl-9 sm:pl-10 pr-4 py-1.5 sm:py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent" /></div>
      </div>

      <div className="flex gap-0.5 sm:gap-1 mb-4 sm:mb-6 border-b border-gray-200 overflow-x-auto">
        {[['policies', FileText, 'POLICIES'], ['workflows', Settings, 'WORKFLOWS'], ['endpoints', Globe, 'API ENDPOINTS']].map(([tab, Icon, label]) => (
          <button key={tab as string} onClick={() => { setActiveTab(tab as TabType); setCurrentPage(1); }} className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all relative whitespace-nowrap ${activeTab === tab ? 'text-[#7C3AED] bg-purple-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{label as string}{activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7C3AED]"></div>}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto -mx-4 sm:mx-0">
        {activeTab === 'policies' && <table className="w-full min-w-[560px]"><thead><tr className="border-b border-gray-200">{['Status','Policy Name','Category','Compliance','Last Check','Actions'].map(h => <th key={h} className={`py-2 sm:py-3 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider ${['Compliance','Last Check','Actions'].includes(h)?'text-right':'text-left'}`}>{h}</th>)}</tr></thead><tbody>{visiblePolicies.slice(start, start + perPage).map((row, idx) => <tr key={`${row.policyName}-${idx}`} className="border-b border-gray-100 hover:bg-[#F8FAFC] transition-colors cursor-pointer"><td className="py-2 sm:py-3 px-3 sm:px-4">{getStatusBadge(row.status)}</td><td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-900">{row.policyName}</td><td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-600">{row.category}</td><td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-right tabular-nums"><span className={row.compliance === 100 ? 'text-emerald-600' : row.compliance >= 80 ? 'text-amber-600' : 'text-red-600'}>{row.compliance === 100 ? '✓' : row.compliance >= 80 ? '⚠' : '✗'} {fmtPercent(row.compliance)}</span></td><td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-right text-gray-600 tabular-nums">{row.lastCheck}</td><td className="py-2 sm:py-3 px-3 sm:px-4 text-right"><button className="text-xs sm:text-sm text-[#7C3AED]">View →</button></td></tr>)}</tbody></table>}
        {activeTab === 'workflows' && <table className="w-full min-w-[720px]"><thead><tr className="border-b border-gray-200">{['Status','Workflow Name','Version','Runs (24h)','Success Rate','Avg Duration','Actions'].map(h => <th key={h} className={`py-2 sm:py-3 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider ${['Runs (24h)','Success Rate','Avg Duration','Actions'].includes(h)?'text-right':'text-left'}`}>{h}</th>)}</tr></thead><tbody>{visibleWorkflows.slice(start, start + perPage).map((row, idx) => <tr key={`${row.workflowName}-${idx}`} className="border-b border-gray-100 hover:bg-[#F8FAFC] transition-colors cursor-pointer"><td className="py-2 sm:py-3 px-3 sm:px-4">{getStatusBadge(row.status)}</td><td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-900">{row.workflowName}</td><td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-600 font-mono">{row.version}</td><td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-right text-gray-900 tabular-nums">{row.runs24h.toLocaleString()}</td><td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-right tabular-nums"><span className={row.successRate >= 99 ? 'text-emerald-600' : row.successRate >= 90 ? 'text-amber-600' : 'text-red-600'}>{fmtPercent(row.successRate)}</span></td><td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-right text-gray-600 tabular-nums">{row.avgDuration}</td><td className="py-2 sm:py-3 px-3 sm:px-4 text-right"><button className="text-xs sm:text-sm text-[#7C3AED]">View →</button></td></tr>)}</tbody></table>}
        {activeTab === 'endpoints' && <table className="w-full min-w-[900px]"><thead><tr className="border-b border-gray-200">{['Status','Tenant ID','Endpoint','Method','Latency (p95)','Error Rate','RPS','Last Check','Actions'].map(h => <th key={h} className={`py-2 sm:py-3 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider ${['Latency (p95)','Error Rate','RPS','Last Check','Actions'].includes(h)?'text-right':'text-left'}`}>{h}</th>)}</tr></thead><tbody>{visibleEndpoints.slice(start, start + perPage).map((row, idx) => <tr key={`${row.endpoint}-${idx}`} className="border-b border-gray-100 hover:bg-[#F8FAFC] transition-colors cursor-pointer"><td className="py-2 sm:py-3 px-3 sm:px-4">{getStatusBadge(row.status)}</td><td className="py-2 sm:py-3 px-3 sm:px-4"><span className="font-mono text-xs sm:text-sm text-blue-600">{row.tenantId}</span></td><td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-900 font-mono">{row.endpoint}</td><td className="py-2 sm:py-3 px-3 sm:px-4"><span className="px-1.5 sm:px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] sm:text-xs font-medium">{row.method}</span></td><td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-right tabular-nums"><span className={row.latencyP95 < 200 ? 'text-emerald-600' : row.latencyP95 < 500 ? 'text-amber-600' : 'text-red-600'}>{fmtLatency(row.latencyP95)}</span></td><td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-right tabular-nums"><span className={row.errorRate < 1 ? 'text-emerald-600' : row.errorRate < 5 ? 'text-amber-600' : 'text-red-600'}>{fmtPercent(row.errorRate)}</span></td><td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-right text-gray-600 tabular-nums">{row.rps}/s</td><td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-right text-gray-600 tabular-nums">{row.lastCheck}</td><td className="py-2 sm:py-3 px-3 sm:px-4 text-right"><button className="text-xs sm:text-sm text-[#7C3AED]">View →</button></td></tr>)}</tbody></table>}
        {totalEntries === 0 && <div className="py-12 text-center text-sm text-gray-500">No {activeTab === 'endpoints' ? 'API endpoint' : activeTab} rows found for this tenant.</div>}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3"><span className="text-xs sm:text-sm text-gray-600">Showing {totalEntries ? start + 1 : 0}-{Math.min(start + perPage, totalEntries)} of {totalEntries} entries</span><select value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setCurrentPage(1); }} className="px-2.5 sm:px-3 py-1 sm:py-1.5 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"><option value={10}>10 per page</option><option value={25}>25 per page</option><option value={50}>50 per page</option><option value={100}>100 per page</option></select></div>
        <div className="flex items-center gap-1 sm:gap-2"><button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" /><span className="hidden sm:inline">Prev</span></button><span className="text-xs text-gray-600 px-2">Page {currentPage} of {totalPages}</span><button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><span className="hidden sm:inline">Next</span><ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></button></div>
      </div>
    </div>
  );
}
