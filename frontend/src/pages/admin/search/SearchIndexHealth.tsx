import { Server, Layers } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { ResourceTable } from '../components/ResourceTable';

interface HealthRow {
  id: string;
  index: string;
  docsCount: number;
  storeSize: string;
  health: 'GREEN' | 'YELLOW' | 'RED';
}

export function SearchIndexHealth() {
  const indices: HealthRow[] = [
    { id: 'idx-hlth-01', index: 'connect_africa_entities', docsCount: 2840, storeSize: '4.8 MB', health: 'GREEN' },
    { id: 'idx-hlth-02', index: 'connect_africa_relationships', docsCount: 5122, storeSize: '9.2 MB', health: 'GREEN' },
    { id: 'idx-hlth-03', index: 'connect_africa_articles', docsCount: 421, storeSize: '12.4 MB', health: 'GREEN' },
  ];

  const columns = [
    {
      key: 'index',
      label: 'Index Name',
      render: (row: HealthRow) => (
        <span className="font-semibold text-cloud font-mono text-sm">{row.index}</span>
      ),
    },
    {
      key: 'count',
      label: 'Documents Count',
      render: (row: HealthRow) => (
        <span className="text-cloud/85 font-mono">{row.docsCount}</span>
      ),
    },
    {
      key: 'size',
      label: 'Store Size',
      render: (row: HealthRow) => (
        <span className="text-mist font-mono text-xs">{row.storeSize}</span>
      ),
    },
    {
      key: 'health',
      label: 'Index Health',
      render: (row: HealthRow) => (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald/20 bg-emerald/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
          {row.health}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="ca-eyebrow">Search Intelligence</span>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-cloud sm:text-3xl">
          Index Health
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-cloud/45">
          Review index segment allocation, track storage occupancy, and monitor total document metrics.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <MetricCard
          label="Total Database Size"
          value="26.4 MB"
          description="Total physical index storage on disk"
          icon={<Server className="h-4 w-4" />}
          status="healthy"
        />
        <MetricCard
          label="Active Indexes"
          value={indices.length}
          description="Primary structured search indices"
          icon={<Layers className="h-4 w-4" />}
        />
      </div>

      <ResourceTable
        columns={columns}
        rows={indices}
        loading={false}
      />
    </div>
  );
}

export default SearchIndexHealth;
