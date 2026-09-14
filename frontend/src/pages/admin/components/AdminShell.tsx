import { useState, type ReactNode } from 'react';
import { AdminBreadcrumbs } from './AdminBreadcrumbs';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';

interface AdminShellProps {
  children: ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-ink">
      <div className="flex min-h-[calc(100vh-64px)]">
        <AdminSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="min-w-0 flex-1">
          <AdminHeader
            onMenuToggle={() => setSidebarOpen((current) => !current)}
          />

          <div className="border-b border-white/[0.05]">
            <div className="ca-container">
              <AdminBreadcrumbs />
            </div>
          </div>

          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}

export default AdminShell;
