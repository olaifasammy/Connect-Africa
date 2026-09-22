import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home, Shield } from 'lucide-react';

export const AdminBreadcrumbs: React.FC = () => {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);
  const adminIndex = segments.indexOf('admin');
  const adminSegments = adminIndex >= 0 ? segments.slice(adminIndex + 1) : [];

  return (
    <nav aria-label="Admin breadcrumb" className="flex items-center gap-2 text-xs text-mist">
      <Link
        to="/"
        className="flex items-center gap-1 text-cloud/70 transition hover:text-gold"
      >
        <Home className="h-3.5 w-3.5" />
        <span>Explore</span>
      </Link>

      <ChevronRight className="h-3 w-3 text-mist/40" />

      <Link
        to="/admin"
        className="flex items-center gap-1.5 font-medium text-gold transition hover:text-white"
      >
        <Shield className="h-3.5 w-3.5" />
        <span>Studio</span>
      </Link>

      {adminSegments.map((segment, index) => {
        const path = '/admin/' + adminSegments.slice(0, index + 1).join('/');
        const isLast = index === adminSegments.length - 1;
        const formattedName = segment
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());

        return (
          <React.Fragment key={path}>
            <ChevronRight className="h-3 w-3 text-mist/40" />
            {isLast ? (
              <span className="font-semibold text-cloud">{formattedName}</span>
            ) : (
              <Link to={path} className="text-cloud/70 transition hover:text-cloud">
                {formattedName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default AdminBreadcrumbs;
