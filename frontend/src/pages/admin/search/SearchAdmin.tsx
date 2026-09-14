import { Search, Database, RefreshCw, BarChart } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { ResourceTable } from '../components/ResourceTable';
import { AttentionPanel } from '../components/AttentionPanel';

interface SearchRow {
  id: string;
  query: string;
  count: number;
  avgLatency: string;
  p95Latency: string;
}

export function SearchAdmin() {
  const popularQueries: SearchRow[] = [
    { id: 'query-01', query: 'Yoruba', count: 412, avgLatency: '18ms', p95Latency: '32ms' },
    { id: 'query-02', query: 'Ile-Ife', count: 284, avgLatency: '14ms', p95Latency: '24ms' },
    { id: 'query-03', query: 'AfCFTA routes', count: 189, avgLatency: '22ms', p95Latency: '41ms' },
    { id: 'query-04', query: 'Bantu ontology', count: 124, avgLatency: '19ms', p95Latency: '31ms' },
  ];

  const columns = [
    {
      key: 'query',
      label: 'Search Query',
      render: (row: SearchRow) => (
        <span className="font-semibold text-cloud">{row.query}</span>
      ),
    },
    {
      key: 'count',
      label: 'Request Volume',
      render: (row: SearchRow) => (
        <span className="font-mono text-gold font-semibold">{row.count}</span>
      ),
    },
    {
      key: 'avgLatency',
      label: 'Average Latency',
      render: (row: SearchRow) => (
        <span className="text-cloud/80 font-mono text-xs">{row.avgLatency}</span>
      ),
    },
    {
      key: 'p95Latency',
      label: 'P95 Latency',
      render: (row: SearchRow) => (
        <span className="text-mist font-mono text-xs">{row.p95Latency}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <span className="ca-eyebrow">Search Intelligence</span>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-cloud sm:text-3xl">
            Search Administration
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-cloud/45">
            Govern indexing pipelines, optimize latency profiles, and review popular search query volumes.
          </p>
        </div>

        <button className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gold px-4 text-sm font-semibold text-ink transition hover:bg-sage">
          <RefreshCw className="h-4 w-4" />
          Rebuild Search Index
        </button>
      </section>

      <div className="grid gap-3 sm:grid-cols-3">
        <MetricCard
          label="Total Searches"
          value="1,248"
          description="Searches recorded in last 24h"
          icon={<Search className="h-4 w-4" />}
        />
        <MetricCard
          label="Index Coverage"
          value="100%"
          description="Entity synchronization state"
          icon={<Database className="h-4 w-4" />}
          status="healthy"
        />
        <MetricCard
          label="P95 Latency"
          value="24ms"
          description="Overall latency profile metric"
          icon={<BarChart className="h-4 w-4" />}
        />
      </div>

      <h3 className="text-base font-semibold text-cloud">Top Search Queries</h3>
      <ResourceTable
        columns={columns}
        rows={popularQueries}
        loading={false}
      />

      <AttentionPanel
        title="Search Optimizations"
        items={[
          {
            id: 'index-elastic',
            severity: 'info',
            title: 'Search Index Auto-Sync',
            description: 'Indices are updated incrementally in real time as entities and relationships are added or modified.',
          }
        ]}
      />
    </div>
  );
}

export default SearchAdmin;
