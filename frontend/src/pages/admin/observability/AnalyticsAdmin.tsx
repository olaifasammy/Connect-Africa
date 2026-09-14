import { TrendingUp, Server } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { ResourceTable } from '../components/ResourceTable';

interface AnalyticsRow {
  id: string;
  metric: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  status: 'healthy' | 'default' | 'warning' | 'critical';
}

export function AnalyticsAdmin() {
  const metrics: AnalyticsRow[] = [
    { id: 'metric-01', metric: 'Monthly Active Users', value: '1,480', trend: 'up', status: 'healthy' },
    { id: 'metric-02', metric: 'Knowledge Graph Growth', value: '+14% / mo', trend: 'up', status: 'healthy' },
    { id: 'metric-03', metric: 'API Request Load', value: '14,284 reqs / h', trend: 'up', status: 'default' },
    { id: 'metric-04', metric: 'Worker Queue Queueing', value: '0 pending', trend: 'neutral', status: 'healthy' },
  ];

  const columns = [
    {
      key: 'metric',
      label: 'Performance Metric',
      render: (row: AnalyticsRow) => (
        <span className="font-semibold text-cloud">{row.metric}</span>
      ),
    },
    {
      key: 'value',
      label: 'Current Value',
      render: (row: AnalyticsRow) => (
        <span className="font-mono text-gold font-bold text-sm">{row.value}</span>
      ),
    },
    {
      key: 'status',
      label: 'System Status',
      render: (row: AnalyticsRow) => (
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${
          row.status === 'healthy' 
            ? 'bg-emerald/10 text-emerald border-emerald/20' 
            : 'bg-white/[0.04] text-mist border-white/[0.08]'
        }`}>
          {row.status === 'healthy' ? 'OPTIMAL' : 'STABLE'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="ca-eyebrow">Observability & Logs</span>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-cloud sm:text-3xl">
          System Analytics
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-cloud/45">
          Track transaction latency metrics, trace query counts, and analyze real-time usage metrics.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <MetricCard
          label="Server load factor"
          value="12%"
          description="Average CPU utilization rate"
          icon={<Server className="h-4 w-4" />}
          status="healthy"
        />
        <MetricCard
          label="Knowledge Growth Rate"
          value="Fast"
          description="Aggregated ontology scale trend"
          icon={<TrendingUp className="h-4 w-4" />}
        />
      </div>

      <ResourceTable
        columns={columns}
        rows={metrics}
        loading={false}
      />
    </div>
  );
}

export default AnalyticsAdmin;
