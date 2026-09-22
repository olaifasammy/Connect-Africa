import { Lock, Plus, Search } from 'lucide-react';
import { useState } from 'react';

export function OntologyConstraintsTab({ onOpenAction }: { onOpenAction: (action: string) => void }) {
  const [searchQuery, setSearchQuery] = useState('');

  const constraints = [
    { id: '1', constraint: 'Person must have a birth date or birth event', applies: 'Person', type: 'Required', status: 'Active', violations: 23 },
    { id: '2', constraint: 'Event must occur in some place', applies: 'Event', type: 'Required', status: 'Active', violations: 12 },
    { id: '3', constraint: 'Each relationship must have a valid source and target', applies: 'All', type: 'Structural', status: 'Active', violations: 0 },
    { id: '4', constraint: 'Organization must have at least one member', applies: 'Organization', type: 'Business Rule', status: 'Active', violations: 7 },
    { id: '5', constraint: 'Place must have geographic coordinates', applies: 'Place', type: 'Recommended', status: 'Active', violations: 15 },
    { id: '6', constraint: 'Work must have an author or creator entity', applies: 'Work', type: 'Required', status: 'Active', violations: 4 },
  ];

  const filtered = constraints.filter((c) =>
    c.constraint.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.applies.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-serif text-xl font-bold text-text-main">Ontology Constraints & Invariants</h2>
          <p className="text-xs text-text-muted mt-0.5">Enforce strict graph integrity rules, cardinality constraints, and validation checks.</p>
        </div>
        <button
          type="button"
          onClick={() => onOpenAction('Add Constraint')}
          className="ca-btn-primary px-4 py-2 text-xs font-mono"
        >
          <Plus className="h-4 w-4" />
          <span>New Constraint</span>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search constraints by rule or target entity..."
            className="w-full rounded-xl border border-stone/20 bg-surface pl-10 pr-4 py-2 text-xs text-text-main font-sans focus:border-gold focus:outline-none shadow-scholar"
          />
        </div>
      </div>

      <div className="ca-card bg-surface shadow-scholar p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs">
            <thead>
              <tr className="border-b border-stone/20 font-mono text-text-muted uppercase tracking-wider text-[11px]">
                <th className="pb-3 font-semibold">Constraint</th>
                <th className="pb-3 font-semibold">Applies To</th>
                <th className="pb-3 font-semibold">Type</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Violations</th>
                <th className="pb-3 font-semibold text-center w-16">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone/10">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-stone/5 transition">
                  <td className="py-3.5 font-serif font-medium text-text-main flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded bg-gold/10 text-gold font-mono text-[10px]">
                      <Lock className="h-3.5 w-3.5" />
                    </span>
                    {row.constraint}
                  </td>
                  <td className="py-3.5 font-mono text-text-muted">{row.applies}</td>
                  <td className="py-3.5 font-mono text-text-muted">{row.type}</td>
                  <td className="py-3.5">
                    <span className="ca-badge-emerald font-mono text-[10px]">{row.status}</span>
                  </td>
                  <td className="py-3.5 text-right font-mono font-bold">
                    <span className={row.violations > 0 ? 'text-clay' : 'text-emerald-900 dark:text-gold'}>
                      {row.violations}
                    </span>
                  </td>
                  <td className="py-3.5 text-center">
                    <button
                      type="button"
                      onClick={() => onOpenAction(`Inspect Constraint Violations: ${row.constraint}`)}
                      className="font-mono text-[11px] text-gold hover:underline"
                    >
                      Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OntologyConstraintsTab;
