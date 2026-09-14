import {
  ArrowLeft,
  Boxes,
  Plus,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { AttentionPanel } from '../components/AttentionPanel';
import { MetricCard } from '../components/MetricCard';
import { ResourceTable } from '../components/ResourceTable';

interface EntityTypeRow {
  id: string;
  name: string;
  slug: string;
  status: string;
  ontology: string;
}

const rows: EntityTypeRow[] = [];

const columns = [
  {
    key: 'name',
    label: 'Entity type',
    render: (row: EntityTypeRow) => (
      <div>
        <p className="font-medium text-cloud/70">{row.name}</p>
        <p className="mt-0.5 text-[11px] text-cloud/25">{row.slug}</p>
      </div>
    ),
  },
  {
    key: 'ontology',
    label: 'Ontology',
    render: (row: EntityTypeRow) => row.ontology || '—',
  },
  {
    key: 'status',
    label: 'Status',
    render: (row: EntityTypeRow) => row.status || '—',
  },
];

export function EntityTypesAdmin() {
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
          <p className="ca-eyebrow mt-5">Ontology / Entity types</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-cloud">
            Entity types
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-cloud/40">
            Govern the semantic classes that may be assigned to first-class
            Connect-Africa entities.
          </p>
        </div>

        <button
          type="button"
          disabled
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-2.5 text-xs font-semibold text-cloud/30"
        >
          <Plus size={14} />
          Create entity type
        </button>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <MetricCard
          label="Types"
          value="—"
          icon={<Boxes size={17} />}
          hint="Awaiting live data"
        />
        <MetricCard
          label="Published"
          value="—"
          icon={<ShieldCheck size={17} />}
          hint="Governance state"
        />
        <MetricCard
          label="Ontology"
          value="—"
          icon={<Boxes size={17} />}
          hint="Defined by ontology"
        />
      </section>

      <AttentionPanel
        title="Entity type registry is not connected"
        items={[
          {
            id: 'ontology-data-connection',
            severity: 'info',
            title: 'No semantic classes are fabricated in the UI',
            description:
              'Connect the ontology service to populate this registry with authoritative entity-type definitions.',
          },
        ]}
      />

      <ResourceTable
        columns={columns}
        rows={rows}
        emptyTitle="No entity types available"
        emptyDescription="Live ontology data is required before entity types can be administered."
      />
    </div>
  );
}

export default EntityTypesAdmin;
