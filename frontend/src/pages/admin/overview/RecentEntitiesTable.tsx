import { MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface RecentEntityItem {
  id: string;
  name: string;
  subtitle: string;
  avatarText?: string;
  type: string;
  status: 'Verified' | 'Pending Review' | 'Draft';
  quality: number; // e.g. 96, 94, 82, 91
  updatedBy: string;
  updatedAt: string;
}

const recentEntities: RecentEntityItem[] = [
  {
    id: 'ent-1',
    name: 'Nelson Mandela',
    subtitle: 'Political Leader',
    type: 'Person',
    status: 'Verified',
    quality: 96,
    updatedBy: 'Amara K.',
    updatedAt: '2m ago',
  },
  {
    id: 'ent-2',
    name: 'Mali Empire',
    subtitle: 'Empire',
    type: 'Organization',
    status: 'Verified',
    quality: 94,
    updatedBy: 'Kwame D.',
    updatedAt: '15m ago',
  },
  {
    id: 'ent-3',
    name: 'Great Mosque of Djenné',
    subtitle: 'Historical Site',
    type: 'Place',
    status: 'Pending Review',
    quality: 82,
    updatedBy: 'Zainab A.',
    updatedAt: '1h ago',
  },
  {
    id: 'ent-4',
    name: 'Yoruba People',
    subtitle: 'Ethnic Group',
    type: 'Culture',
    status: 'Verified',
    quality: 91,
    updatedBy: 'Fatou S.',
    updatedAt: '3h ago',
  },
];

export function RecentEntitiesTable({ entities = [] }: { entities?: any[] }) {
  const items = entities.length > 0 ? entities.slice(0, 5).map((e, i) => ({
    id: e.id || String(i),
    name: e.name || e.title || 'Entity',
    subtitle: e.type || 'Knowledge Object',
    type: e.type || 'Entity',
    status: 'Verified' as const,
    quality: 95,
    updatedBy: 'System',
    updatedAt: 'Recently',
  })) : recentEntities;

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#10201A]/60 p-5 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-cloud">Recent Entities</h2>
          <p className="mt-0.5 text-xs text-cloud/45">
            Latest additions and updates across the knowledge base
          </p>
        </div>

        <Link
          to="/admin/entities"
          className="text-xs font-medium text-sage hover:text-cloud transition"
        >
          View all
        </Link>
      </div>

      {/* Responsive Table Container */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-xs text-cloud/70">
          <thead>
            <tr className="border-b border-white/[0.06] text-[10px] font-semibold uppercase tracking-[0.14em] text-cloud/40">
              <th scope="col" className="pb-3 pr-4 font-medium">ENTITY</th>
              <th scope="col" className="pb-3 px-4 font-medium">TYPE</th>
              <th scope="col" className="pb-3 px-4 font-medium">STATUS</th>
              <th scope="col" className="pb-3 px-4 font-medium">QUALITY</th>
              <th scope="col" className="pb-3 px-4 font-medium">UPDATED BY</th>
              <th scope="col" className="pb-3 px-4 font-medium">UPDATED AT</th>
              <th scope="col" className="pb-3 pl-4 text-right font-medium">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {items.map((item) => (
              <tr key={item.id} className="group transition hover:bg-white/[0.02]">
                {/* ENTITY (Avatar + Name + Subtitle) */}
                <td className="py-3.5 pr-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-forest text-xs font-bold text-sage ring-1 ring-white/5">
                      {item.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-cloud transition group-hover:text-sage">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-cloud/40">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </td>

                {/* TYPE */}
                <td className="py-3.5 px-4 text-cloud/60 font-medium">
                  {item.type}
                </td>

                {/* STATUS */}
                <td className="py-3.5 px-4">
                  <span
                    className={[
                      'inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium',
                      item.status === 'Verified'
                        ? 'border border-emerald/25 bg-emerald/10 text-sage'
                        : 'border border-amber-500/25 bg-amber-500/10 text-amber-300',
                    ].join(' ')}
                  >
                    {item.status}
                  </span>
                </td>

                {/* QUALITY (Percentage + Progress bar) */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 font-mono text-xs font-medium text-cloud">
                      {item.quality}%
                    </span>
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/[0.08]">
                      <div
                        className="h-full rounded-full bg-emerald transition-all duration-500"
                        style={{ width: `${item.quality}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* UPDATED BY */}
                <td className="py-3.5 px-4 text-cloud/65">
                  {item.updatedBy}
                </td>

                {/* UPDATED AT */}
                <td className="py-3.5 px-4 text-cloud/45">
                  {item.updatedAt}
                </td>

                {/* ACTION MENU */}
                <td className="py-3.5 pl-4 text-right">
                  <button
                    type="button"
                    aria-label={`Options for ${item.name}`}
                    className="rounded-lg p-1 text-cloud/35 transition hover:bg-white/[0.05] hover:text-cloud"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentEntitiesTable;
