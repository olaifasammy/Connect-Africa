import {
  Boxes,
  CircleHelp,
  ExternalLink,
} from 'lucide-react';

export interface EntityInspectorProps {
  entityId?: string | null;
}

export function EntityInspector({ entityId }: EntityInspectorProps) {
  if (!entityId) {
    return (
      <section className="ca-surface rounded-2xl p-5 sm:p-6">
        <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.025] text-cloud/30">
            <Boxes className="h-5 w-5" />
          </div>

          <h2 className="mt-4 text-sm font-semibold text-cloud/65">
            No entity selected
          </h2>

          <p className="mt-2 max-w-sm text-xs leading-5 text-cloud/35">
            Select an entity from the resource table to inspect its identity,
            ontology type, metadata, and relationships.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 text-[11px] text-cloud/25">
            <CircleHelp className="h-3.5 w-3.5" />
            Live entity data is not connected yet.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="ca-surface rounded-2xl p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="ca-eyebrow">Inspector</span>
          <h2 className="mt-2 text-lg font-semibold text-cloud">
            Entity
          </h2>
        </div>

        <ExternalLink className="h-4 w-4 text-cloud/25" />
      </div>

      <div className="mt-6 rounded-xl border border-white/[0.06] bg-black/10 p-4">
        <p className="text-xs uppercase tracking-[0.12em] text-cloud/30">
          Identifier
        </p>
        <p className="mt-2 break-all font-mono text-xs text-cloud/55">
          {entityId}
        </p>
      </div>
    </section>
  );
}

export default EntityInspector;
