import {
  Boxes,
  GitBranch,
  Layers3,
  Plus,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AttentionPanel } from '../components/AttentionPanel';
import { MetricCard } from '../components/MetricCard';
import { ResourceTable } from '../components/ResourceTable';
import { EntityInspector } from './EntityInspector';
import { EntityOperations } from './EntityOperations';

type EntityRow = {
  id: string;
  name: string;
  type: string;
  status: string;
  relationships: string;
};

const columns = [
  {
    key: 'name',
    label: 'Entity',
    render: (row: EntityRow) => (
      <span className="font-medium text-cloud">{row.name}</span>
    ),
  },
  {
    key: 'type',
    label: 'Type',
    render: (row: EntityRow) => (
      <span className="text-cloud/50">{row.type}</span>
    ),
  },
  {
    key: 'status',
    label: 'Status',
    render: (row: EntityRow) => (
      <span className="rounded-full border border-white/[0.06] px-2 py-1 text-[10px] text-cloud/35">
        {row.status}
      </span>
    ),
  },
  {
    key: 'relationships',
    label: 'Relationships',
    render: (row: EntityRow) => (
      <span className="text-cloud/40">{row.relationships}</span>
    ),
  },
];

const rows: EntityRow[] = [];

export function EntityAdmin() {
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(
    null,
  );

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <span className="ca-eyebrow">Knowledge graph</span>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-cloud sm:text-3xl">
            Entities
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-cloud/45">
            Govern Connect-Africa entities as first-class knowledge objects,
            including identity, ontology type, metadata, and graph state.
          </p>
        </div>

        <button
          type="button"
          disabled
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-emerald/20 bg-emerald/10 px-4 text-sm font-medium text-sage opacity-70"
        >
          <Plus className="h-4 w-4" />
          Create entity
        </button>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Entities"
          value="—"
          description="Total graph entities"
          icon={<Boxes className="h-4 w-4" />}
        />
        <MetricCard
          label="Published"
          value="—"
          description="Active published entities"
          icon={<Layers3 className="h-4 w-4" />}
        />
        <MetricCard
          label="Relationships"
          value="—"
          description="Connected graph edges"
          icon={<GitBranch className="h-4 w-4" />}
        />
        <MetricCard
          label="Pending"
          value="—"
          description="Awaiting governance action"
          icon={<Boxes className="h-4 w-4" />}
        />
      </div>

      <AttentionPanel
        title="Entity data source"
        items={[
          {
            id: 'unconnected',
            title: 'Backend entity data is not connected',
            description:
              'The administration surface is ready, but no entity API contract has been introduced into the frontend yet.',
            severity: 'info',
          },
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.55fr]">
        <ResourceTable
          columns={columns}
          rows={rows}
          getRowKey={(row: EntityRow) => row.id}
          emptyTitle="No entities available"
          emptyDescription="Connect the Entity service to populate this resource table."
          onRowClick={(row: EntityRow) => setSelectedEntityId(row.id)}
        />

        <EntityOperations />
      </div>

      <EntityInspector entityId={selectedEntityId} />

      <div className="flex flex-wrap gap-2">
        <Link
          to="/admin/relationships"
          className="text-xs text-sage transition hover:text-cloud"
        >
          Open relationship administration →
        </Link>
      </div>
    </div>
  );
}

export default EntityAdmin;
