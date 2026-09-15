import { Download, FilePlus2, Plus, UploadCloud } from 'lucide-react';
import { Link } from 'react-router-dom';

const actions = [
  {
    id: 'create-entity',
    label: 'Create Entity',
    href: '/admin/entities',
    icon: Plus,
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10 border-cyan-500/20',
  },
  {
    id: 'add-article',
    label: 'Add Article',
    href: '/admin/ontology',
    icon: FilePlus2,
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-500/10 border-purple-500/20',
  },
  {
    id: 'upload-media',
    label: 'Upload Media',
    href: '/admin/observability/operations',
    icon: UploadCloud,
    iconColor: 'text-emerald',
    iconBg: 'bg-emerald/10 border-emerald/20',
  },
  {
    id: 'import-data',
    label: 'Import Data',
    href: '/admin/search',
    icon: Download,
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10 border-amber-500/20',
  },
];

export function QuickActionsPanel() {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#10201A]/60 p-5 backdrop-blur-sm">
      <h2 className="text-base font-semibold text-cloud">Quick Actions</h2>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <Link
              key={act.id}
              to={act.href}
              className="group flex flex-col items-center justify-center rounded-xl border border-white/[0.07] bg-ink/70 p-4 text-center transition duration-200 hover:border-emerald/30 hover:bg-forest/80 active:scale-[0.98]"
            >
              <div
                className={[
                  'flex h-10 w-10 items-center justify-center rounded-xl border transition duration-200 group-hover:scale-110',
                  act.iconBg,
                  act.iconColor,
                ].join(' ')}
              >
                <Icon className="h-5 w-5" />
              </div>

              <span className="mt-2.5 text-xs font-medium text-cloud/80 transition group-hover:text-cloud">
                {act.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActionsPanel;
