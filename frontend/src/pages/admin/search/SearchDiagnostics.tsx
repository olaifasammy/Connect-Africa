import { Cpu, CheckCircle } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { ResourceTable } from '../components/ResourceTable';

interface DiagnosticsRow {
  id: string;
  test: string;
  module: string;
  status: 'PASS' | 'WARN' | 'FAIL';
  value: string;
}

export function SearchDiagnostics() {
  const tests: DiagnosticsRow[] = [
    { id: 'diag-01', test: 'Elastic/Database sync offset', module: 'SYNC', status: 'PASS', value: '0 documents' },
    { id: 'diag-02', test: 'Query parser warm-up latency', module: 'PARSER', status: 'PASS', value: '1.2ms' },
    { id: 'diag-03', test: 'Connection pool allocation', module: 'POOL', status: 'PASS', value: '2 active / 20 max' },
    { id: 'diag-04', test: 'Cache hit-rate percentage', module: 'CACHE', status: 'WARN', value: '68% (Target > 80%)' },
  ];

  const columns = [
    {
      key: 'test',
      label: 'Diagnostic Test',
      render: (row: DiagnosticsRow) => (
        <span className="font-semibold text-cloud">{row.test}</span>
      ),
    },
    {
      key: 'module',
      label: 'Subsystem',
      render: (row: DiagnosticsRow) => (
        <span className="text-[10px] font-mono bg-white/[0.03] border border-white/[0.06] rounded px-1.5 py-0.5 font-bold text-mist">
          {row.module}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row: DiagnosticsRow) => (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
          row.status === 'PASS' 
            ? 'bg-emerald/10 text-emerald border-emerald/20' 
            : 'bg-gold/10 text-gold border-gold/20'
        }`}>
          {row.status}
        </span>
      ),
    },
    {
      key: 'value',
      label: 'Diagnostic Value',
      render: (row: DiagnosticsRow) => (
        <span className="text-cloud/70 font-mono text-xs">{row.value}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="ca-eyebrow">Search Intelligence</span>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-cloud sm:text-3xl">
          Search Diagnostics
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-cloud/45">
          Execute connection checks, trace query execution paths, and debug cache allocations.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <MetricCard
          label="Diagnostics Status"
          value="HEALTHY"
          description="All indexers fully synchronized"
          icon={<CheckCircle className="h-4 w-4" />}
          status="healthy"
        />
        <MetricCard
          label="Heap Memory"
          value="48 MB"
          description="Heap occupied by search indexers"
          icon={<Cpu className="h-4 w-4" />}
        />
      </div>

      <ResourceTable
        columns={columns}
        rows={tests}
        loading={false}
      />
    </div>
  );
}

export default SearchDiagnostics;
