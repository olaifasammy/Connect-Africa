import {
  ArrowLeft,
  GitCommitHorizontal,
  History,
  Plus,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { AttentionPanel } from '../components/AttentionPanel';
import { MetricCard } from '../components/MetricCard';
import { ResourceTable } from '../components/ResourceTable';

interface OntologyVersionRow {
  id: string;
  version: string;
  status: string;
  publishedAt: string;
  changes: string;
}

const rows: OntologyVersionRow[] = [];

const columns = [
  {
    key: 'version',
    label: 'Version',
    render: (row: OntologyVersionRow) => (
      <span className="font-semibold text-cloud/70">
        {row.version}
      </span>
    ),
  },
  {
    key: 'status',
    label: 'Status',
    render: (row: OntologyVersionRow) => row.status || '—',
  },
  {
    key: 'changes',
    label: 'Changes',
    render: (row: OntologyVersionRow) => row.changes || '—',
  },
  {
    key: 'publishedAt',
    label: 'Published',
    render: (row: OntologyVersionRow) => row.publishedAt || '—',
  },
];

export function OntologyVersionsAdmin() {
  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link
            to="/admin/ontology"
            className="inline-flex items-center gap-1.5 text-xs text-cloud/35 transition hover:text-cloud/70"
          >
            <ArrowLeft size={13} />
            Ontology control plane
          </Link>
          <p className="ca-eyebrow mt-5">Ontology / Versions</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-cloud">
            Ontology versions
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-cloud/40">
            Track controlled ontology evolution without coupling the
            administration surface to fabricated version state.
          </p>
        </div>

        <button
          type="button"
          disabled
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-2.5 text-xs font-semibold text-cloud/30"
        >
          <Plus size={14} />
          Create version
        </button>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <MetricCard
          label="Versions"
          value="—"
          icon={<History size={17} />}
          hint="Awaiting live data"
        />
        <MetricCard
          label="Published"
          value="—"
          icon={<ShieldCheck size={17} />}
          hint="Governance state"
        />
        <MetricCard
          label="Latest"
          value="—"
          icon={<GitCommitHorizontal size={17} />}
          hint="Version lineage"
        />
      </section>

      <AttentionPanel
        title="Version registry is not connected"
        items={[
          {
            id: 'ontology-data-connection',
            severity: 'info',
            title: 'Ontology history will remain authoritative',
            description:
              'Once connected, this surface should reflect persisted ontology versions and their publication lifecycle directly from the backend.',
          },
        ]}
      />

      <ResourceTable
        columns={columns}
        rows={rows}
        emptyTitle="No ontology versions available"
        emptyDescription="Live ontology version data is required before version administration becomes operational."
      />
    </div>
  );
}

export default OntologyVersionsAdmin;
