import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, FileText, Settings, Globe } from 'lucide-react';

type TabType = 'policies' | 'workflows' | 'endpoints';

export function TenantMonitoring() {
  const [activeTab, setActiveTab] = useState<TabType>('policies');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  const policiesData = [
    { status: 'healthy', tenantId: 'tenant_001', name: 'data-encryption-at-rest', category: 'Security', compliance: '100%', lastCheck: '2s', complianceNum: 100 },
    { status: 'warning', tenantId: 'tenant_002', name: 'iam-least-privilege', category: 'Access', compliance: '87%', lastCheck: '5s', complianceNum: 87 },
    { status: 'critical', tenantId: 'tenant_003', name: 'network-isolation', category: 'Network', compliance: '42%', lastCheck: '1s', complianceNum: 42 },
    { status: 'healthy', tenantId: 'tenant_004', name: 'data-residency-eu', category: 'Compliance', compliance: '100%', lastCheck: '3s', complianceNum: 100 },
    { status: 'healthy', tenantId: 'tenant_005', name: 'backup-retention', category: 'Security', compliance: '100%', lastCheck: '4s', complianceNum: 100 },
    { status: 'warning', tenantId: 'tenant_006', name: 'mfa-enforcement', category: 'Access', compliance: '78%', lastCheck: '2s', complianceNum: 78 },
    { status: 'healthy', tenantId: 'tenant_007', name: 'audit-logging', category: 'Compliance', compliance: '100%', lastCheck: '1s', complianceNum: 100 },
    { status: 'critical', tenantId: 'tenant_008', name: 'vulnerability-scanning', category: 'Security', compliance: '35%', lastCheck: '6s', complianceNum: 35 },
    { status: 'healthy', tenantId: 'tenant_009', name: 'encryption-in-transit', category: 'Security', compliance: '100%', lastCheck: '2s', complianceNum: 100 },
    { status: 'warning', tenantId: 'tenant_010', name: 'password-complexity', category: 'Access', compliance: '91%', lastCheck: '3s', complianceNum: 91 }
  ];

  const workflowsData = [
    { status: 'healthy', tenantId: 'tenant_001', name: 'order_processing', version: 'v2.3.1', runs: '1,247', successRate: '99.8%', avgDuration: '1.2s' },
    { status: 'warning', tenantId: 'tenant_002', name: 'payment_flow', version: 'v3.1.0', runs: '892', successRate: '94.2%', avgDuration: '2.8s' },
    { status: 'critical', tenantId: 'tenant_003', name: 'inventory_sync', version: 'v1.8.2', runs: '523', successRate: '76.5%', avgDuration: '5.4s' },
    { status: 'healthy', tenantId: 'tenant_004', name: 'user_auth', version: 'v4.0.1', runs: '3,421', successRate: '99.9%', avgDuration: '0.3s' },
    { status: 'healthy', tenantId: 'tenant_005', name: 'notification_dispatch', version: 'v2.0.5', runs: '2,156', successRate: '99.5%', avgDuration: '0.8s' },
    { status: 'warning', tenantId: 'tenant_006', name: 'data_export', version: 'v1.5.3', runs: '234', successRate: '89.1%', avgDuration: '4.2s' },
    { status: 'healthy', tenantId: 'tenant_007', name: 'customer_onboarding', version: 'v3.2.0', runs: '567', successRate: '98.7%', avgDuration: '2.1s' },
    { status: 'critical', tenantId: 'tenant_008', name: 'billing_cycle', version: 'v2.1.4', runs: '145', successRate: '72.3%', avgDuration: '6.7s' },
    { status: 'healthy', tenantId: 'tenant_009', name: 'report_generation', version: 'v1.9.0', runs: '789', successRate: '99.2%', avgDuration: '1.5s' },
    { status: 'warning', tenantId: 'tenant_010', name: 'cache_invalidation', version: 'v2.4.1', runs: '4,321', successRate: '92.4%', avgDuration: '0.5s' }
  ];

  const endpointsData = [
    { status: 'healthy', tenantId: 'tenant_001', endpoint: '/api/v2/orders', method: 'POST', latency: '142ms', errorRate: '0.02%', rps: '45/s', lastCheck: '1s' },
    { status: 'warning', tenantId: 'tenant_002', endpoint: '/api/v2/payments', method: 'POST', latency: '380ms', errorRate: '1.4%', rps: '23/s', lastCheck: '2s' },
    { status: 'critical', tenantId: 'tenant_003', endpoint: '/api/v1/inventory', method: 'GET', latency: '1.2s', errorRate: '8.7%', rps: '12/s', lastCheck: '1s' },
    { status: 'healthy', tenantId: 'tenant_004', endpoint: '/api/v3/auth', method: 'POST', latency: '89ms', errorRate: '0.01%', rps: '156/s', lastCheck: '1s' },
    { status: 'healthy', tenantId: 'tenant_005', endpoint: '/api/v2/users', method: 'GET', latency: '125ms', errorRate: '0.05%', rps: '67/s', lastCheck: '2s' },
    { status: 'warning', tenantId: 'tenant_006', endpoint: '/api/v1/analytics', method: 'GET', latency: '420ms', errorRate: '2.1%', rps: '18/s', lastCheck: '3s' },
    { status: 'healthy', tenantId: 'tenant_007', endpoint: '/api/v2/products', method: 'GET', latency: '98ms', errorRate: '0.03%', rps: '89/s', lastCheck: '1s' },
    { status: 'critical', tenantId: 'tenant_008', endpoint: '/api/v1/reports', method: 'POST', latency: '2.1s', errorRate: '12.3%', rps: '8/s', lastCheck: '2s' },
    { status: 'healthy', tenantId: 'tenant_009', endpoint: '/api/v3/search', method: 'GET', latency: '167ms', errorRate: '0.08%', rps: '52/s', lastCheck: '1s' },
    { status: 'warning', tenantId: 'tenant_010', endpoint: '/api/v2/webhooks', method: 'POST', latency: '345ms', errorRate: '1.8%', rps: '31/s', lastCheck: '2s' }
  ];

  const getStatusBadge = (status: string) => {
    const configs = {
      healthy: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Healthy' },
      warning: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500', label: 'Warning' },
      critical: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500', label: 'Critical' }
    };
    const config = configs[status as keyof typeof configs];
    return (
      <span className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 ${config.bg} ${config.text} rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap`}>
        <span className={`w-1.5 h-1.5 ${config.dot} rounded-full ${status === 'critical' ? 'animate-pulse' : ''}`}></span>
        <span className="hidden sm:inline">{config.label}</span>
      </span>
    );
  };

  const totalEntries = activeTab === 'policies' ? policiesData.length : activeTab === 'workflows' ? workflowsData.length : endpointsData.length;
  const totalPages = Math.ceil(totalEntries / perPage);

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#0F172A]">Monitoring</h2>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 bg-red-50 text-red-700 rounded-full text-[10px] sm:text-xs font-medium">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              5 Critical
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] sm:text-xs font-medium">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
              12 Warning
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] sm:text-xs font-medium">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              230 Healthy
            </span>
          </div>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tenants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 sm:pl-10 pr-4 py-1.5 sm:py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0.5 sm:gap-1 mb-4 sm:mb-6 border-b border-gray-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('policies')}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all relative whitespace-nowrap ${
            activeTab === 'policies'
              ? 'text-[#7C3AED] bg-purple-50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">POLICIES</span>
          <span className="sm:hidden">POLICY</span>
          {activeTab === 'policies' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7C3AED]"></div>}
        </button>
        <button
          onClick={() => setActiveTab('workflows')}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all relative whitespace-nowrap ${
            activeTab === 'workflows'
              ? 'text-[#7C3AED] bg-purple-50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          WORKFLOWS
          {activeTab === 'workflows' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7C3AED]"></div>}
        </button>
        <button
          onClick={() => setActiveTab('endpoints')}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all relative whitespace-nowrap ${
            activeTab === 'endpoints'
              ? 'text-[#7C3AED] bg-purple-50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">API ENDPOINTS</span>
          <span className="sm:hidden">API</span>
          {activeTab === 'endpoints' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7C3AED]"></div>}
        </button>
      </div>

      {/* Tables */}
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        {activeTab === 'policies' && (
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 sm:py-3 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-2 sm:py-3 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Tenant ID</th>
                <th className="text-left py-2 sm:py-3 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Policy Name</th>
                <th className="text-left py-2 sm:py-3 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="text-right py-2 sm:py-3 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Compliance</th>
                <th className="text-right py-2 sm:py-3 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Check</th>
                <th className="text-right py-2 sm:py-3 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {policiesData.slice((currentPage - 1) * perPage, currentPage * perPage).map((row, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-[#F8FAFC] transition-colors cursor-pointer">
                  <td className="py-2 sm:py-3 px-3 sm:px-4">{getStatusBadge(row.status)}</td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4">
                    <span className="font-mono text-xs sm:text-sm text-blue-600 hover:text-blue-700">{row.tenantId}</span>
                  </td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-900">{row.name}</td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-600">{row.category}</td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-right tabular-nums">
                    <span className={row.complianceNum === 100 ? 'text-emerald-600' : row.complianceNum >= 80 ? 'text-amber-600' : 'text-red-600'}>
                      {row.complianceNum === 100 ? '✓' : row.complianceNum >= 80 ? '⚠' : '✗'} {row.compliance}
                    </span>
                  </td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-right text-gray-600 tabular-nums">{row.lastCheck} ago</td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4 text-right">
                    <button className="text-xs sm:text-sm text-[#7C3AED] hover:text-[#6D28D9]">View →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'workflows' && (
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 sm:py-3 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-2 sm:py-3 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Tenant ID</th>
                <th className="text-left py-2 sm:py-3 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Workflow Name</th>
                <th className="text-left py-2 sm:py-3 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Version</th>
                <th className="text-right py-2 sm:py-3 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Runs (24h)</th>
                <th className="text-right py-2 sm:py-3 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Success Rate</th>
                <th className="text-right py-2 sm:py-3 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Avg Duration</th>
                <th className="text-right py-2 sm:py-3 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workflowsData.slice((currentPage - 1) * perPage, currentPage * perPage).map((row, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-[#F8FAFC] transition-colors cursor-pointer">
                  <td className="py-2 sm:py-3 px-3 sm:px-4">{getStatusBadge(row.status)}</td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4">
                    <span className="font-mono text-xs sm:text-sm text-blue-600 hover:text-blue-700">{row.tenantId}</span>
                  </td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-900">{row.name}</td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-600 font-mono">{row.version}</td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-right text-gray-900 tabular-nums">{row.runs}</td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-right tabular-nums">
                    <span className={parseFloat(row.successRate) >= 99 ? 'text-emerald-600' : parseFloat(row.successRate) >= 90 ? 'text-amber-600' : 'text-red-600'}>
                      {row.successRate}
                    </span>
                  </td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-right text-gray-600 tabular-nums">{row.avgDuration}</td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4 text-right">
                    <button className="text-xs sm:text-sm text-[#7C3AED] hover:text-[#6D28D9]">View →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'endpoints' && (
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 sm:py-3 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-2 sm:py-3 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Tenant ID</th>
                <th className="text-left py-2 sm:py-3 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Endpoint</th>
                <th className="text-left py-2 sm:py-3 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Method</th>
                <th className="text-right py-2 sm:py-3 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Latency (p95)</th>
                <th className="text-right py-2 sm:py-3 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Error Rate</th>
                <th className="text-right py-2 sm:py-3 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">RPS</th>
                <th className="text-right py-2 sm:py-3 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Check</th>
                <th className="text-right py-2 sm:py-3 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {endpointsData.slice((currentPage - 1) * perPage, currentPage * perPage).map((row, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-[#F8FAFC] transition-colors cursor-pointer">
                  <td className="py-2 sm:py-3 px-3 sm:px-4">{getStatusBadge(row.status)}</td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4">
                    <span className="font-mono text-xs sm:text-sm text-blue-600 hover:text-blue-700">{row.tenantId}</span>
                  </td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-900 font-mono">{row.endpoint}</td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4">
                    <span className="px-1.5 sm:px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] sm:text-xs font-medium">{row.method}</span>
                  </td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-right tabular-nums">
                    <span className={parseFloat(row.latency) < 200 ? 'text-emerald-600' : parseFloat(row.latency) < 500 ? 'text-amber-600' : 'text-red-600'}>
                      {row.latency}
                    </span>
                  </td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-right tabular-nums">
                    <span className={parseFloat(row.errorRate) < 1 ? 'text-emerald-600' : parseFloat(row.errorRate) < 5 ? 'text-amber-600' : 'text-red-600'}>
                      {row.errorRate}
                    </span>
                  </td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-right text-gray-600 tabular-nums">{row.rps}</td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm text-right text-gray-600 tabular-nums">{row.lastCheck} ago</td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4 text-right">
                    <button className="text-xs sm:text-sm text-[#7C3AED] hover:text-[#6D28D9]">View →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
          <span className="text-xs sm:text-sm text-gray-600">
            Showing {(currentPage - 1) * perPage + 1}-{Math.min(currentPage * perPage, totalEntries)} of {totalEntries} entries
          </span>
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
          >
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
          </select>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          <div className="hidden sm:flex items-center gap-1 sm:gap-2">
            {[...Array(Math.min(5, totalPages))].map((_, idx) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = idx + 1;
              } else if (currentPage <= 3) {
                pageNum = idx + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + idx;
              } else {
                pageNum = currentPage - 2 + idx;
              }

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-lg transition-colors ${
                    currentPage === pageNum
                      ? 'bg-[#7C3AED] text-white'
                      : 'text-gray-700 bg-white border border-gray-200 hover:bg-purple-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <span className="px-2 text-gray-500 text-xs sm:text-sm">...</span>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          <span className="sm:hidden text-xs text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
