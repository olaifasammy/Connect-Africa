import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Activity,
  BarChart3,
  BookOpen,
  Database,
  FileText,
  FolderGit2,
  Globe,
  Layers3,
  Network,
  RotateCcw,
  Search,
  Shield,
  Users,
  X,
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
  roles?: string[];
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: 'Knowledge & Graph',
    items: [
      { label: 'Overview', to: '/admin', icon: <Layers3 className="h-4 w-4" /> },
      { label: 'Entities', to: '/admin/entities', icon: <Database className="h-4 w-4" /> },
      { label: 'Relationships', to: '/admin/relationships', icon: <Network className="h-4 w-4" /> },
      { label: 'Ontology', to: '/admin/ontology', icon: <FolderGit2 className="h-4 w-4" />, roles: ['ADMINISTRATOR', 'SUPER_ADMINISTRATOR'] },
    ],
  },
  {
    title: 'Content & Sources',
    items: [
      { label: 'Articles', to: '/admin/article', icon: <FileText className="h-4 w-4" /> },
      { label: 'Sources', to: '/admin/sources', icon: <Globe className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Governance & Identity',
    items: [
      { label: 'Users', to: '/admin/identity/users', icon: <Users className="h-4 w-4" />, roles: ['ADMINISTRATOR', 'SUPER_ADMINISTRATOR'] },
      { label: 'Roles & Permissions', to: '/admin/identity/roles', icon: <Shield className="h-4 w-4" />, roles: ['ADMINISTRATOR', 'SUPER_ADMINISTRATOR'] },
    ],
  },
  {
    title: 'Analytics & Observability',
    items: [
      { label: 'Analytics', to: '/admin/observability/analytics', icon: <BarChart3 className="h-4 w-4" /> },
      { label: 'Audit Logs', to: '/admin/observability/audit', icon: <Activity className="h-4 w-4" /> },
      { label: 'Search Diagnostics', to: '/admin/search', icon: <Search className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Operations & Intelligence',
    items: [
      { label: 'Operations', to: '/admin/observability/operations', icon: <RotateCcw className="h-4 w-4" /> },
      { label: 'AI Intelligence', to: '/admin/intelligence/ai', icon: <BookOpen className="h-4 w-4" /> },
    ],
  },
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ open, onClose }) => {
  const { user } = useAuth();
  const userRoles = user?.roles || ['USER'];

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Close navigation overlay"
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden cursor-default"
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onClose();
            }
          }}
        />
      )}

      <aside
        className={[
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-stone/20 bg-surface backdrop-blur-2xl transition-transform duration-300 lg:static lg:translate-x-0 font-sans',
          open ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b border-stone/20 px-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/10 border border-gold/30 text-gold transition group-hover:scale-105">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <span className="font-serif font-bold text-sm tracking-wider text-text-main group-hover:text-gold uppercase">
                Connect Africa
              </span>
              <p className="font-mono text-[9px] text-gold uppercase tracking-widest font-semibold">
                Studio Control Center
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-stone hover:bg-stone/10 hover:text-text-main lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6 admin-scrollbar">
          {navSections.map((section) => {
            const filteredItems = section.items.filter((item) => {
              if (!item.roles) return true;
              return item.roles.some((role) => userRoles.includes(role));
            });

            if (filteredItems.length === 0) return null;

            return (
              <div key={section.title} className="space-y-1.5">
                <p className="px-3 font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                  {section.title}
                </p>

                <div className="space-y-1">
                  {filteredItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === '/admin'}
                      onClick={onClose}
                      className={({ isActive }) =>
                        [
                          'flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200',
                          isActive
                            ? 'bg-emerald-900 text-white dark:bg-emerald-500 dark:text-ink font-bold shadow-sm'
                            : 'text-text-muted hover:bg-stone/10 hover:text-text-main',
                        ].join(' ')
                      }
                    >
                      <span className="shrink-0">{item.icon}</span>
                      <span className="truncate">{item.label}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-stone/20 p-4 text-center">
          <p className="font-mono text-[10px] text-text-muted">
            Connect Africa Studio v1.0 • Enterprise
          </p>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
