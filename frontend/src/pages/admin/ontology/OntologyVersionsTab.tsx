import { Plus } from 'lucide-react';

export function OntologyVersionsTab({ onOpenAction }: { onOpenAction: (action: string) => void }) {
  const versions = [
    { version: 'v2.4.1', date: 'May 18, 2025', author: 'Amara K.', changes: 24, status: 'Current', published: true, description: 'Added Cultural Heritage Site entity type and updated constraint validations.' },
    { version: 'v2.4.0', date: 'Apr 28, 2025', author: 'Kwame D.', changes: 18, status: 'Previous', published: false, description: 'Expanded spatial coordinate requirements for geographic entities.' },
    { version: 'v2.3.0', date: 'Mar 15, 2025', author: 'Zainab A.', changes: 31, status: 'Previous', published: false, description: 'Major structural update for historical relationships and dynasties.' },
    { version: 'v2.2.0', date: 'Feb 10, 2025', author: 'Fatou S.', changes: 16, status: 'Previous', published: false, description: 'Optimized validation rules and metadata annotation schemas.' },
    { version: 'v2.1.0', date: 'Jan 05, 2025', author: 'Samuel O.', changes: 22, status: 'Previous', published: false, description: 'Initial enterprise schema release for Afriseek Studio.' },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-serif text-xl font-bold text-text-main">Ontology Schema Versions</h2>
          <p className="text-xs text-text-muted mt-0.5">Historical changelog and version control for the knowledge graph schema.</p>
        </div>
        <button
          type="button"
          onClick={() => onOpenAction('Create New Schema Version')}
          className="ca-btn-primary px-4 py-2 text-xs font-mono"
        >
          <Plus className="h-4 w-4" />
          <span>New Schema Version</span>
        </button>
      </div>

      <div className="ca-card bg-surface shadow-scholar p-6 space-y-6">
        {versions.map((v, idx) => (
          <div key={v.version} className="flex items-start gap-4 p-4 rounded-xl border border-stone/15 bg-canvas/40 hover:border-gold/40 transition">
            <div className="relative flex flex-col items-center pt-1">
              <span className={`h-4 w-4 rounded-full ${idx === 0 ? 'bg-gold ring-4 ring-gold/20' : 'bg-stone/40'}`} />
              {idx < versions.length - 1 && <span className="absolute top-5 w-0.5 h-16 bg-stone/20" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-bold text-text-main text-base">{v.version}</h3>
                  {v.published && <span className="ca-badge-emerald font-mono text-[10px]">Published</span>}
                  {v.status === 'Current' && <span className="ca-badge-clay font-mono text-[10px]">Current Active</span>}
                </div>
                <span className="font-mono text-xs text-text-muted">Changes: <strong className="text-text-main">{v.changes}</strong></span>
              </div>
              <p className="font-mono text-xs text-text-muted mt-1">Released {v.date} by {v.author}</p>
              <p className="mt-2 text-xs text-text-main leading-relaxed">{v.description}</p>
            </div>
            <div className="shrink-0">
              <button
                type="button"
                onClick={() => onOpenAction(`Inspect Version ${v.version}`)}
                className="ca-btn-outline px-3 py-1.5 text-xs font-mono"
              >
                Inspect
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OntologyVersionsTab;
