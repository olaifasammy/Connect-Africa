import React from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  HelpCircle,
  Menu,
  Moon,
  Search,
  Sun,
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';
import { AdminBreadcrumbs } from './AdminBreadcrumbs';

interface AdminHeaderProps {
  onMenuToggle: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuToggle }) => {
  const { user } = useAuth();
  const { resolvedTheme, toggleTheme } = useTheme();

  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
    user?.email?.split('@')[0] ||
    'Administrator';

  const primaryRole = user?.roles?.[0] || 'ADMINISTRATOR';

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-stone/20 bg-surface/90 px-4 backdrop-blur-xl sm:px-8 font-sans transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuToggle}
          aria-label="Open administration navigation"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone/20 bg-canvas text-stone transition hover:border-gold hover:text-text-main lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="hidden flex-col sm:flex">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-gold">
            Connect Africa Studio
          </span>
          <div className="mt-0.5">
            <AdminBreadcrumbs />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Global Search Bar */}
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-stone/20 bg-canvas px-3 py-1.5 text-xs text-text-muted transition hover:border-gold">
          <Search className="h-3.5 w-3.5 text-stone" />
          <input
            type="text"
            placeholder="Search entities, articles, users..."
            className="w-48 bg-transparent text-text-main placeholder:text-stone/50 focus:outline-none xl:w-64 font-sans text-xs"
          />
          <kbd className="rounded border border-stone/30 bg-surface px-1 py-0.5 font-mono text-[9px] text-text-muted">
            ⌘K
          </kbd>
        </div>

        {/* Theme Switcher Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone/20 bg-canvas text-stone transition hover:border-gold hover:text-text-main"
          title={`Switch to ${resolvedTheme === 'light' ? 'Dark' : 'Parchment Light'} mode`}
        >
          {resolvedTheme === 'light' ? (
            <Moon className="h-4 w-4 text-emerald-900" />
          ) : (
            <Sun className="h-4 w-4 text-gold" />
          )}
        </button>

        {/* Help */}
        <button
          type="button"
          aria-label="Help & Documentation"
          className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg border border-stone/20 bg-canvas text-stone transition hover:border-gold hover:text-text-main"
        >
          <HelpCircle className="h-4 w-4" />
        </button>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-stone/20 bg-canvas text-stone transition hover:border-gold hover:text-text-main"
        >
          <Bell className="h-4 w-4 text-gold" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-clay" />
        </button>

        {/* User Profile Badge */}
        <Link
          to="/profile"
          className="flex items-center gap-2.5 rounded-lg border border-stone/20 bg-canvas p-1.5 transition hover:border-gold"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded bg-gold/10 font-serif text-xs font-bold text-gold">
            {displayName[0]?.toUpperCase() || 'A'}
          </div>
          <div className="hidden lg:block text-left">
            <p className="font-serif text-xs font-bold text-text-main truncate max-w-[120px]">
              {displayName}
            </p>
            <p className="font-mono text-[9px] text-gold uppercase tracking-wider">
              {primaryRole.replace(/_/g, ' ')}
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default AdminHeader;
