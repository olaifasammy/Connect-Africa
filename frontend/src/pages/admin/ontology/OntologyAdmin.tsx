import {
  ArrowRight,
  Braces,
  GitBranch,
  Layers3,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { AttentionPanel } from '../components/AttentionPanel';
import { MetricCard } from '../components/MetricCard';
import { OntologyInspector } from './OntologyInspector';

interface OntologyRow {
  id: string;
  name: string;
  status: string;
  version: string;
  entityTypes: string;
  relationshipTypes: string;
}

const ontologyRows: OntologyRow[] = [];

export function OntologyAdmin() {
  const [selectedOntologyId, setSelectedOntologyId] = useState<string | null>(
    null,
  );

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-forest/70 p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="ca-eyebrow">Ontology control plane</p>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-cloud sm:text-3xl">
              Ontology administration
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-cloud/45">
              Govern the semantic model that defines Connect-Africa
              entities, relationship types, and version evolution.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-sage/20 bg-sage/[0.07] px-3 py-1.5 text-xs text-sage">
            <ShieldCheck size={14} />
            Control plane ready
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Ontologies"
          value="—"
          icon={<Braces size={17} />}
          hint="Awaiting live data"
        />
        <MetricCard
          label="Entity types"
          value="—"
          icon={<Layers3 size={17} />}
          hint="Ontology-defined"
        />
        <MetricCard
          label="Relationship types"
          value="—"
          icon={<GitBranch size={17} />}
          hint="Graph semantics"
        />
        <MetricCard
          label="Versions"
          value="—"
          icon={<Workflow size={17} />}
          hint="Version registry"
        />
      </section>

      <AttentionPanel
        title="Ontology data connection pending"
        items={[
          {
            id: 'ontology-data-connection',
            severity: 'info',
            title: 'Live ontology records are not connected',
            description:
              'The administration surface is ready, but production ontology data should come from the frontend service layer rather than static UI records.',
          },
        ]}
      />

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.8fr)]">
        <div>
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="ca-eyebrow">Registry</p>
              <h2 className="mt-1 text-lg font-semibold text-cloud">
                Ontology registry
              </h2>
            </div>
            <p className="text-xs text-cloud/30">
              Semantic governance resources
            </p>
          </div>

          <div className="ca-surface overflow-hidden rounded-2xl">
            {ontologyRows.length === 0 ? (
              <div className="flex min-h-56 flex-col items-center justify-center px-6 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025]">
                  <Braces
                    size={18}
                    className="text-cloud/30"
                    strokeWidth={1.6}
                  />
                </div>
                <p className="mt-4 text-sm font-medium text-cloud/60">
                  Ontology registry is awaiting live data
                </p>
                <p className="mt-1 max-w-md text-xs leading-5 text-cloud/30">
                  No fabricated ontology records are shown. Connect the
                  ontology API before this registry becomes operational.
                </p>
              </div>
            ) : (
              ontologyRows.map((row) => (
                <button
                  key={row.id}
                  type="button"
                  onClick={() => setSelectedOntologyId(row.id)}
                  className="flex w-full items-center justify-between border-b border-white/[0.05] px-5 py-4 text-left transition last:border-b-0 hover:bg-white/[0.018]"
                >
                  <span>
                    <span className="block text-sm font-medium text-cloud/70">
                      {row.name}
                    </span>
                    <span className="mt-1 block text-xs text-cloud/30">
                      {row.version} · {row.status}
                    </span>
                  </span>
                  <ArrowRight size={15} className="text-cloud/25" />
                </button>
              ))
            )}
          </div>
        </div>

        <OntologyInspector ontologyId={selectedOntologyId} />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <AdminLink
          to="/admin/ontology/entity-types"
          icon={<Layers3 size={17} />}
          title="Entity types"
          description="Define the semantic classes available to the knowledge graph."
        />
        <AdminLink
          to="/admin/ontology/relationship-types"
          icon={<GitBranch size={17} />}
          title="Relationship types"
          description="Define the typed edges connecting first-class entities."
        />
        <AdminLink
          to="/admin/ontology/versions"
          icon={<Workflow size={17} />}
          title="Ontology versions"
          description="Review ontology evolution and controlled version state."
        />
      </section>
    </div>
  );
}

function AdminLink({
  to,
  icon,
  title,
  description,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      to={to}
      className="group ca-surface ca-surface-hover rounded-2xl p-5"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025] text-sage">
        {icon}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-cloud/70 group-hover:text-cloud">
            {title}
          </h3>
          <p className="mt-1 text-xs leading-5 text-cloud/30">
            {description}
          </p>
        </div>
        <ArrowRight
          size={15}
          className="mt-0.5 shrink-0 text-cloud/20 transition group-hover:translate-x-0.5 group-hover:text-sage"
        />
      </div>
    </Link>
  );
}

export default OntologyAdmin;
