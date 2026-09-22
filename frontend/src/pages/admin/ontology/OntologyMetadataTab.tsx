import { Plus } from 'lucide-react';

export function OntologyMetadataTab({ onOpenAction }: { onOpenAction: (action: string) => void }) {
  const metadataFields = [
    { key: 'confidence_score', type: 'Float [0.0 - 1.0]', target: 'All Entities & Relationships', description: 'Algorithmic confidence rating of extracted knowledge fact.' },
    { key: 'provenance_source', type: 'URI / String', target: 'All Graph Nodes', description: 'Originating archival document or API endpoint.' },
    { key: 'verification_status', type: 'Enum [Verified, Pending, Flagged]', target: 'All Records', description: 'Editorial review status.' },
    { key: 'historical_era', type: 'String', target: 'Person, Event, Place', description: 'African historical period classification.' },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-serif text-xl font-bold text-text-main">Ontology Metadata Definitions</h2>
          <p className="text-xs text-text-muted mt-0.5">Global annotation attributes attached across the knowledge graph model.</p>
        </div>
        <button
          type="button"
          onClick={() => onOpenAction('Add Metadata Field')}
          className="ca-btn-primary px-4 py-2 text-xs font-mono"
        >
          <Plus className="h-4 w-4" />
          <span>New Metadata Field</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {metadataFields.map((m) => (
          <div key={m.key} className="ca-card bg-surface shadow-scholar p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-sm font-bold text-text-main">{m.key}</h3>
                <span className="ca-badge-gold font-mono text-[10px]">{m.type}</span>
              </div>
              <p className="mt-2 text-xs text-text-muted">{m.description}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone/15 flex items-center justify-between font-mono text-xs text-text-muted">
              <span>Target: <strong className="text-text-main">{m.target}</strong></span>
              <button
                type="button"
                onClick={() => onOpenAction(`Configure Metadata: ${m.key}`)}
                className="text-gold hover:underline font-semibold"
              >
                Configure →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OntologyMetadataTab;
