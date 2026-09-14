import {
  Activity,
  BrainCircuit,
  Database,
  GitBranch,
  LayoutDashboard,
  Search,
  Settings2,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

interface NavigationItem {
  label: string;
  to: string;
  icon: typeof LayoutDashboard;
  end?: boolean;
}

interface NavigationGroup {
  label: string;
  items: NavigationItem[];
}

const navigationGroups: NavigationGroup[] = [
  {
    label: 'Overview',
    items: [
      {
        label: 'Dashboard',
        to: '/admin',
        icon: LayoutDashboard,
        end: true,
      },
      {
        label: 'Knowledge health',
        to: '/admin/overview/knowledge',
        icon: Activity,
      },
      {
        label: 'System health',
        to: '/admin/overview/system',
        icon: ShieldCheck,
      },
      {
        label: 'Operations feed',
        to: '/admin/overview/operations',
        icon: Activity,
      },
    ],
  },
  {
    label: 'Knowledge',
    items: [
      {
        label: 'Entities',
        to: '/admin/entities',
        icon: Database,
      },
      {
        label: 'Relationships',
        to: '/admin/relationships',
        icon: GitBranch,
      },
      {
        label: 'Ontology',
        to: '/admin/ontology',
        icon: GitBranch,
      },
    ],
  },
  {
    label: 'Identity',
    items: [
      {
        label: 'Users',
        to: '/admin/identity/users',
        icon: Users,
      },
      {
        label: 'Roles',
        to: '/admin/identity/roles',
        icon: ShieldCheck,
      },
      {
        label: 'Permissions',
        to: '/admin/identity/permissions',
        icon: ShieldCheck,
      },
      {
        label: 'Sessions',
        to: '/admin/identity/sessions',
        icon: Users,
      },
      {
        label: 'API keys',
        to: '/admin/identity/api-keys',
        icon: Settings2,
      },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      {
        label: 'AI',
        to: '/admin/intelligence/ai',
        icon: BrainCircuit,
      },
      {
        label: 'Providers',
        to: '/admin/intelligence/providers',
        icon: BrainCircuit,
      },
      {
        label: 'Crawling',
        to: '/admin/intelligence/crawl',
        icon: Activity,
      },
      {
        label: 'Knowledge gaps',
        to: '/admin/intelligence/knowledge-gaps',
        icon: Database,
      },
      {
        label: 'Prompts',
        to: '/admin/intelligence/prompts',
        icon: BrainCircuit,
      },
    ],
  },
  {
    label: 'Observability',
    items: [
      {
        label: 'Analytics',
        to: '/admin/observability/analytics',
        icon: Activity,
      },
      {
        label: 'Audit',
        to: '/admin/observability/audit',
        icon: ShieldCheck,
      },
      {
        label: 'Operations',
        to: '/admin/observability/operations',
        icon: Settings2,
      },
    ],
  },
  {
    label: 'Search',
    items: [
      {
        label: 'Search',
        to: '/admin/search',
        icon: Search,
      },
      {
        label: 'Diagnostics',
        to: '/admin/search/diagnostics',
        icon: Activity,
      },
      {
        label: 'Index health',
        to: '/admin/search/index-health',
        icon: Database,
      },
    ],
  },
];

function SidebarContent({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b border-white/[0.06] px-5">
        <div>
          <p className="text-sm font-semibold tracking-tight text-cloud">
            Connect-Africa
          </p>
          <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-sage/70">
            Admin control plane
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        {navigationGroups.map((group) => (
          <div key={group.label} className="mb-6">
            <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-cloud/30">
              {group.label}
            </p>

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={onClose}
                    className={({ isActive }) =>
                      [
                        'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200',
                        isActive
                          ? 'border border-emerald/15 bg-emerald/[0.10] text-cloud'
                          : 'border border-transparent text-cloud/50 hover:bg-white/[0.035] hover:text-cloud/80',
                      ].join(' ')
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          size={16}
                          strokeWidth={isActive ? 2 : 1.7}
                          className={
                            isActive
                              ? 'text-sage'
                              : 'text-cloud/35 transition-colors group-hover:text-cloud/55'
                          }
                        />

                        <span className="min-w-0 flex-1 truncate">
                          {item.label}
                        </span>

                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/[0.06] p-3">
        <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald" />
            <span className="text-xs font-medium text-cloud/65">
              Control plane online
            </span>
          </div>

          <p className="mt-1 pl-4 text-[11px] text-cloud/30">
            Connect-Africa administration
          </p>
        </div>
      </div>
    </div>
  );
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-white/[0.06] bg-[#0a100f] lg:block">
        <div className="sticky top-0 h-[calc(100vh-64px)]">
          <SidebarContent />
        </div>
      </aside>

      {open && (
        <button
          type="button"
          aria-label="Close admin navigation"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={[
          'fixed inset-y-0 left-0 z-50 w-72 border-r border-white/[0.07] bg-[#0a100f] shadow-2xl transition-transform duration-300 lg:hidden',
          open ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-end px-4 pt-4">
            <button
              type="button"
              aria-label="Close admin navigation"
              onClick={onClose}
              className="rounded-lg p-2 text-cloud/45 transition hover:bg-white/[0.05] hover:text-cloud"
            >
              <X size={18} />
            </button>
          </div>

          <div className="-mt-4 flex-1">
            <SidebarContent onClose={onClose} />
          </div>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
