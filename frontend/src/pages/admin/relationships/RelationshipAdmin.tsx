import {
  ArrowLeftRight,
  GitBranch,
  Layers3,
  Network,
} from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { ResourceTable } from '../components/ResourceTable';

type RelationshipRow = {
  id: string;
  source: string;
  relationship: string;
  target: string;
  status: string;
};

const columns = [
  {
    key: 'source',
    label: 'Source',
    render: (row: RelationshipRow) => (
      <span className="font-medium text-cloud">{row.source}</span>
    ),
  },
  {
    key: 'relationship',
    label: 'Relationship',
    render: (row: RelationshipRow) => (
      <span className="text-sage">{row.relationship}</span>
    ),
  },
  {
    key: 'target',
    label: 'Target',
    render: (row: RelationshipRow) => (
      <span className="text-cloud/55">{row.target}</span>
    ),
  },
  {
    key: 'status',
    label: 'Status',
    render: (row: RelationshipRow) => (
      <span className="rounded-full border border-white/[0.06] px-2 py-1 text-[10px] text-cloud/35">
        {row.status}
      </span>
    ),
  },
];

const rows: RelationshipRow[] = [];

export function RelationshipAdmin() {
  return (
    <div className="space-y-6">
      <section>
        <span className="ca-eyebrow">Knowledge graph</span>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-cloud sm:text-3xl">
          Relationships
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-cloud/45">
          Govern the semantic edges connecting Connect-Africa entities and
          establish the relationship graph used throughout the platform.
        </p>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Relationships"
          value="—"
          description="Total graph edges"
          icon={<GitBranch className="h-4 w-4" />}
        />
        <MetricCard
          label="Types"
          value="—"
          description="Defined relationship types"
          icon={<Layers3 className="h-4 w-4" />}
        />
        <MetricCard
          label="Connected entities"
          value="—"
          description="Entities participating in graph edges"
          icon={<Network className="h-4 w-4" />}
        />
        <MetricCard
          label="Pending"
          value="—"
          description="Relationships awaiting governance"
          icon={<ArrowLeftRight className="h-4 w-4" />}
        />
      </div>

      <ResourceTable
        columns={columns}
        rows={rows}
        getRowKey={(row: RelationshipRow) => row.id}
        emptyTitle="No relationships available"
        emptyDescription="Connect the Relationship service to populate this resource table."
      />
    </div>
  );
}

export default RelationshipAdmin;
