import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function formatSegment(segment: string) {
  return segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function AdminBreadcrumbs() {
  const location = useLocation();

  const segments = location.pathname
    .split('/')
    .filter(Boolean);

  const adminIndex = segments.indexOf('admin');

  const adminSegments =
    adminIndex >= 0 ? segments.slice(adminIndex + 1) : [];

  return (
    <nav
      aria-label="Admin breadcrumb"
      className="flex min-h-11 items-center overflow-x-auto"
    >
      <ol className="flex min-w-max items-center gap-1.5 text-xs">
        <li>
          <Link
            to="/admin"
            className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-cloud/35 transition hover:bg-white/[0.03] hover:text-cloud/65"
          >
            <Home size={12} />
            <span>Admin</span>
          </Link>
        </li>

        {adminSegments.map((segment, index) => {
          const path =
            '/admin/' + adminSegments.slice(0, index + 1).join('/');

          const isLast = index === adminSegments.length - 1;

          return (
            <li key={`${segment}-${index}`} className="flex items-center gap-1.5">
              <ChevronRight size={12} className="text-cloud/20" />

              {isLast ? (
                <span className="rounded-md px-1.5 py-1 font-medium text-cloud/65">
                  {formatSegment(segment)}
                </span>
              ) : (
                <Link
                  to={path}
                  className="rounded-md px-1.5 py-1 text-cloud/35 transition hover:bg-white/[0.03] hover:text-cloud/65"
                >
                  {formatSegment(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default AdminBreadcrumbs;
