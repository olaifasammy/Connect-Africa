import { Layers3, Plus } from 'lucide-react';

export function OntologyRequiredFieldsTab({ onOpenAction }: { onOpenAction: (action: string) => void }) {
  const fields = [
    { entity: 'Person', field: 'full_name', type: 'String', constraint: 'Mandatory', scope: 'Core' },
    { entity: 'Person', field: 'birth_date', type: 'Date / Event', constraint: 'Mandatory', scope: 'Core' },
    { entity: 'Organization', field: 'legal_name', type: 'String', constraint: 'Mandatory', scope: 'Core' },
    { entity: 'Place', field: 'country_code', type: 'ISO 3166-1', constraint: 'Mandatory', scope: 'Spatial' },
    { entity: 'Event', field: 'start_date', type: 'Timestamp', constraint: 'Mandatory', scope: 'Temporal' },
    { entity: 'Work', field: 'title', type: 'String', constraint: 'Mandatory', scope: 'Intellectual' },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-serif text-xl font-bold text-text-main">Required Fields Schema</h2>
          <p className="text-xs text-text-muted mt-0.5">Mandatory property requirements across entity schemas.</p>
        </div>
        <button
          type="button"
          onClick={() => onOpenAction('Add Required Field')}
          className="ca-btn-primary px-4 py-2 text-xs font-mono"
        >
          <Plus className="h-4 w-4" />
          <span>New Required Field</span>
        </button>
      </div>

      <div className="ca-card bg-surface shadow-scholar p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs">
            <thead>
              <tr className="border-b border-stone/20 font-mono text-text-muted uppercase tracking-wider text-[11px]">
                <th className="pb-3 font-semibold">Entity Type</th>
                <th className="pb-3 font-semibold">Field Name</th>
                <th className="pb-3 font-semibold">Data Type</th>
                <th className="pb-3 font-semibold">Constraint</th>
                <th className="pb-3 font-semibold">Scope</th>
                <th className="pb-3 font-semibold text-center w-16">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone/10">
              {fields.map((row, idx) => (
                <tr key={idx} className="hover:bg-stone/5 transition">
                  <td className="py-3.5 font-serif font-bold text-text-main flex items-center gap-2">
                    <Layers3 className="h-3.5 w-3.5 text-gold" />
                    {row.entity}
                  </td>
                  <td className="py-3.5 font-mono text-text-main font-semibold">{row.field}</td>
                  <td className="py-3.5 font-mono text-text-muted">{row.type}</td>
                  <td className="py-3.5"><span className="ca-badge-gold font-mono text-[10px]">{row.constraint}</span></td>
                  <td className="py-3.5 font-mono text-text-muted">{row.scope}</td>
                  <td className="py-3.5 text-center">
                    <button
                      type="button"
                      onClick={() => onOpenAction(`Configure Field: ${row.entity}.${row.field}`)}
                      className="font-mono text-[11px] text-gold hover:underline"
                    >
                      Edit
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

export default OntologyRequiredFieldsTab;
