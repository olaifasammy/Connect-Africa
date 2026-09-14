import {
  Braces,
  CheckCircle2,
  Clock3,
  GitBranch,
  Layers3,
} from 'lucide-react';

interface OntologyInspectorProps {
  ontologyId?: string | null;
}

export function OntologyInspector({
  ontologyId,
}: OntologyInspectorProps) {
  if (!ontologyId) {
    return (
      <section className="ca-surface rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025]">
            <Braces
              size={18}
              className="text-cloud/30"
              strokeWidth={1.6}
            />
          </div>

          <div>
            <p className="text-sm font-medium text-cloud/65">
              Ontology inspector
            </p>
            <p className="mt-1 text-xs leading-5 text-cloud/30">
              Select an ontology resource to inspect its definition,
              version lineage, and governance state.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="ca-surface rounded-2xl p-6">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="ca-eyebrow">Selected resource</p>
            <h2 className="mt-2 text-lg font-semibold tracking-tight text-cloud">
              Ontology resource
            </h2>
            <p className="mt-1 text-xs text-cloud/35">
              {ontologyId}
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-sage/20 bg-sage/[0.07] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-sage">
            <CheckCircle2 size={12} />
            Ready
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <InspectorStat
            icon={<Layers3 size={14} />}
            label="Entity types"
            value="—"
          />
          <InspectorStat
            icon={<GitBranch size={14} />}
            label="Relationships"
            value="—"
          />
          <InspectorStat
            icon={<Clock3 size={14} />}
            label="Version"
            value="—"
          />
        </div>
      </div>
    </section>
  );
}

function InspectorStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.018] p-3">
      <div className="flex items-center gap-2 text-cloud/30">
        {icon}
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em]">
          {label}
        </span>
      </div>
      <p className="mt-2 text-sm font-semibold text-cloud/60">
        {value}
      </p>
    </div>
  );
}

export default OntologyInspector;
