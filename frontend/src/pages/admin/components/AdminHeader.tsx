import {
  Bell,
  Command,
  Menu,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdminHeaderProps {
  onMenuToggle: () => void;
}

export function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-ink/90 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          aria-label="Open admin navigation"
          onClick={onMenuToggle}
          className="rounded-xl border border-white/[0.06] p-2 text-cloud/50 transition hover:border-white/[0.1] hover:bg-white/[0.04] hover:text-cloud lg:hidden"
        >
          <Menu size={18} />
        </button>

        <div className="flex min-w-0 items-center gap-3">
          <div className="hidden h-8 w-8 items-center justify-center rounded-lg border border-emerald/15 bg-emerald/[0.08] sm:flex">
            <ShieldCheck size={16} className="text-sage" />
          </div>

          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-sm font-medium text-cloud/75">
              Administration
            </p>
            <p className="truncate text-[10px] uppercase tracking-[0.15em] text-cloud/30">
              Connect-Africa control plane
            </p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            className="hidden h-9 items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 text-xs text-cloud/35 transition hover:border-white/[0.1] hover:bg-white/[0.04] hover:text-cloud/60 md:flex"
          >
            <Search size={14} />
            <span>Command search</span>
            <span className="ml-2 flex items-center gap-0.5 rounded-md border border-white/[0.07] px-1.5 py-0.5 font-mono text-[9px]">
              <Command size={9} />
              K
            </span>
          </button>

          <button
            type="button"
            aria-label="Search administration"
            className="rounded-xl border border-white/[0.06] p-2 text-cloud/40 transition hover:bg-white/[0.04] hover:text-cloud md:hidden"
          >
            <Search size={17} />
          </button>

          <button
            type="button"
            aria-label="Notifications"
            className="relative rounded-xl border border-white/[0.06] p-2 text-cloud/40 transition hover:bg-white/[0.04] hover:text-cloud"
          >
            <Bell size={17} />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-emerald" />
          </button>

          <Link
            to="/"
            className="hidden rounded-xl border border-white/[0.06] px-3 py-2 text-xs font-medium text-cloud/45 transition hover:bg-white/[0.04] hover:text-cloud sm:block"
          >
            View platform
          </Link>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
