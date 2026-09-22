import { ShieldCheck, Plus } from 'lucide-react';

export function OntologyValidationRulesTab({ onOpenAction }: { onOpenAction: (action: string) => void }) {
  const rules = [
    { id: '1', name: 'Person Birth Date Integrity', target: 'Person', severity: 'High', status: 'Active', description: 'Person entities must have a verified birth date or birth event link.' },
    { id: '2', name: 'Geographic Coordinates Enforcement', target: 'Place', severity: 'Medium', status: 'Active', description: 'Place entities require latitude and longitude spatial properties.' },
    { id: '3', name: 'Organization Membership Cardinality', target: 'Organization', severity: 'High', status: 'Active', description: 'Organizations must maintain at least one active member relation.' },
    { id: '4', name: 'Event Temporal Sequence', target: 'Event', severity: 'Medium', status: 'Active', description: 'Event start date must precede or equal event end date.' },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-serif text-xl font-bold text-text-main">Validation Rules Engine</h2>
          <p className="text-xs text-text-muted mt-0.5">Automated knowledge validation rules executed against graph ingestions.</p>
        </div>
        <button
          type="button"
          onClick={() => onOpenAction('Add Validation Rule')}
          className="ca-btn-primary px-4 py-2 text-xs font-mono"
        >
          <Plus className="h-4 w-4" />
          <span>New Validation Rule</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {rules.map((rule) => (
          <div key={rule.id} className="ca-card bg-surface shadow-scholar p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10 text-gold">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-text-main">{rule.name}</h3>
                    <span className="font-mono text-[10px] text-text-muted">Target: {rule.target}</span>
                  </div>
                </div>
                <span className="ca-badge-emerald font-mono text-[10px]">{rule.status}</span>
              </div>
              <p className="mt-3 text-xs text-text-muted leading-relaxed">{rule.description}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone/15 flex items-center justify-between font-mono text-xs">
              <span className="text-text-muted">Severity: <strong className="text-gold">{rule.severity}</strong></span>
              <button
                type="button"
                onClick={() => onOpenAction(`Configure Validation Rule: ${rule.name}`)}
                className="text-gold hover:underline font-semibold"
              >
                Configure Rule →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OntologyValidationRulesTab;
