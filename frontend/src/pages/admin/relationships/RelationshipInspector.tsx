import { ArrowLeft, GitBranch, Calendar, FileText } from 'lucide-react';

interface RelationshipInspectorProps {
  relationshipId: string;
  onClose: () => void;
}

export function RelationshipInspector({ relationshipId, onClose }: RelationshipInspectorProps) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-forest/35 p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sage hover:text-cloud transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Close Inspector
        </button>
        <span className="text-[10px] font-mono text-gold bg-gold/10 border border-gold/20 px-2 py-0.5 rounded-full uppercase">
          ID: {relationshipId}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <span className="ca-eyebrow">Relationship details</span>
          <h2 className="text-xl font-bold text-cloud mt-1 flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-gold" />
            Active Graph Edge
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/[0.06] bg-black/25 p-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-mist/60">Source Node</span>
            <p className="font-semibold text-cloud mt-1">Yoruba Civilization</p>
            <span className="text-[10px] font-mono text-mist/40 block mt-1">ID: entity-yoruba-01</span>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-black/25 p-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-mist/60">Target Node</span>
            <p className="font-semibold text-cloud mt-1">Ile-Ife Kingdom</p>
            <span className="text-[10px] font-mono text-mist/40 block mt-1">ID: entity-ife-02</span>
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-black/25 p-4 space-y-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-mist/60">Edge Type</span>
            <p className="font-semibold text-gold font-mono text-sm mt-1">FOUNDED_IN_CENTER_OF</p>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-mist/60">Citations & Verification</span>
            <p className="text-sm text-cloud/80 mt-1 leading-relaxed">
              Authoritative archeological and verbal histories connect the foundation of Yoruba sovereign centers back to the sacred city-state of Ile-Ife.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-mono text-mist/60 pt-2 border-t border-white/[0.04]">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-sage" />
              Verified: 2026-09-14
            </span>
            <span className="flex items-center gap-1">
              <FileText className="h-3.5 w-3.5 text-sage" />
              Citations: 5 active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RelationshipInspector;
