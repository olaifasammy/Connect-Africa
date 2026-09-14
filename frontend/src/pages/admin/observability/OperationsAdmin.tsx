import { Settings, Cpu } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { ResourceTable } from '../components/ResourceTable';
import { AttentionPanel } from '../components/AttentionPanel';

interface OperationRow {
  id: string;
  task: string;
  schedule: string;
  lastRun: string;
  status: 'SUCCESS' | 'RUNNING' | 'FAILED';
}

export function OperationsAdmin() {
  const operations: OperationRow[] = [
    { id: 'op-01', task: 'Incremental search index build', schedule: 'Continuous', lastRun: 'Just now', status: 'SUCCESS' },
    { id: 'op-02', task: 'System metrics aggregation', schedule: 'Every 5m', lastRun: '3m ago', status: 'SUCCESS' },
    { id: 'op-03', task: 'Failed crawler job garbage collection', schedule: 'Every 24h', lastRun: '12h ago', status: 'SUCCESS' },
  ];

  const columns = [
    {
      key: 'task',
      label: 'Operation / Background Worker',
      render: (row: OperationRow) => (
        <span className="font-semibold text-cloud">{row.task}</span>
      ),
    },
    {
      key: 'schedule',
      label: 'Frequency',
      render: (row: OperationRow) => (
        <span className="text-cloud/50 font-mono text-xs">{row.schedule}</span>
      ),
    },
    {
      key: 'lastRun',
      label: 'Last Executed',
      render: (row: OperationRow) => (
        <span className="text-mist text-xs">{row.lastRun}</span>
      ),
    },
    {
      key: 'status',
      label: 'Last Execution Status',
      render: (row: OperationRow) => (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald/20 bg-emerald/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="ca-eyebrow">Observability & Logs</span>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-cloud sm:text-3xl">
          Background Operations
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-cloud/45">
          Review automated background tasks, monitor task runners, and manage persistent queue workers.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <MetricCard
          label="Active queue workers"
          value="4 active"
          description="BullMQ event processing workers"
          icon={<Cpu className="h-4 w-4" />}
          status="healthy"
        />
        <MetricCard
          label="System Task Status"
          value="OPTIMAL"
          description="All processes running within thresholds"
          icon={<Settings className="h-4 w-4" />}
        />
      </div>

      <ResourceTable
        columns={columns}
        rows={operations}
        loading={false}
      />

      <AttentionPanel
        title="Operations Notice"
        items={[
          {
            id: 'ops-lock',
            severity: 'info',
            title: 'Queue Worker Health',
            description: 'Automatic email and system notifications are triggered if a BullMQ worker crashes or remains degraded for more than 5 minutes.',
          }
        ]}
      />
    </div>
  );
}

export default OperationsAdmin;
