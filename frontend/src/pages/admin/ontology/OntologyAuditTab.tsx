import { History, Search } from 'lucide-react';
import { useState } from 'react';

export function OntologyAuditTab({ onOpenAction }: { onOpenAction: (action: string) => void }) {
  const [searchQuery, setSearchQuery] = useState('');

  const audits = [
    { id: '1', action: 'Added Entity Type', target: 'Cultural Heritage Site', actor: 'Amara K.', timestamp: 'May 18, 2025, 14:32', ip: '10.0.0.12' },
    { id: '2', action: 'Added Relationship Type', target: 'influenced', actor: 'Kwame D.', timestamp: 'May 18, 2025, 09:15', ip: '10.0.0.19' },
    { id: '3', action: 'Updated Validation Rule', target: 'Person Birth Date Integrity', actor: 'Zainab A.', timestamp: 'May 17, 2025, 16:45', ip: '10.0.0.22' },
    { id: '4', action: 'Updated Metadata Definition', target: 'confidence_score', actor: 'Fatou S.', timestamp: 'May 16, 2025, 11:20', ip: '10.0.0.15' },
    { id: '5', action: 'Published Schema Version', target: 'v2.4.1', actor: 'Samuel O.', timestamp: 'May 15, 2025, 08:00', ip: '10.0.0.1' },
  ];

  const filtered = audits.filter((a) =>
    a.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.actor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-serif text-xl font-bold text-text-main">Ontology Audit Logs</h2>
          <p className="text-xs text-text-muted mt-0.5">Immutable governance trail of all ontology schema modifications and admin actions.</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search audit trail by action, target, or administrator..."
            className="w-full rounded-xl border border-stone/20 bg-surface pl-10 pr-4 py-2 text-xs text-text-main font-sans focus:border-gold focus:outline-none shadow-scholar"
          />
        </div>
      </div>

      <div className="ca-card bg-surface shadow-scholar p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs">
            <thead>
              <tr className="border-b border-stone/20 font-mono text-text-muted uppercase tracking-wider text-[11px]">
                <th className="pb-3 font-semibold">Action</th>
                <th className="pb-3 font-semibold">Target</th>
                <th className="pb-3 font-semibold">Administrator</th>
                <th className="pb-3 font-semibold">Timestamp</th>
                <th className="pb-3 font-semibold text-right">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone/10">
              {filtered.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onOpenAction(`Audit Log Details: ${row.action} (${row.target})`)}
                  className="hover:bg-stone/5 transition cursor-pointer"
                >
                  <td className="py-3.5 font-serif font-bold text-text-main flex items-center gap-2">
                    <History className="h-3.5 w-3.5 text-gold" />
                    {row.action}
                  </td>
                  <td className="py-3.5 font-mono text-text-main">{row.target}</td>
                  <td className="py-3.5 text-text-muted">{row.actor}</td>
                  <td className="py-3.5 font-mono text-text-muted">{row.timestamp}</td>
                  <td className="py-3.5 text-right font-mono text-text-muted">{row.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OntologyAuditTab;
