import {
  Activity,
  Database,
  Search,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { HealthStatus } from '../components/HealthStatus';

type HealthItem = {
  id: string;
  label: string;
  description: string;
  status: 'healthy' | 'operational' | 'degraded' | 'warning' | 'critical' | 'offline' | 'unknown';
  icon: LucideIcon;
};

const healthItems: HealthItem[] = [
  {
    id: 'api',
    label: 'API',
    description: 'Application services',
    status: 'operational',
    icon: Activity,
  },
  {
    id: 'database',
    label: 'Database',
    description: 'Persistence layer',
    status: 'operational',
    icon: Database,
  },
  {
    id: 'search',
    label: 'Search',
    description: 'Index and retrieval',
    status: 'unknown',
    icon: Search,
  },
  {
    id: 'intelligence',
    label: 'Intelligence',
    description: 'AI and automation',
    status: 'unknown',
    icon: Sparkles,
  },
];

export function SystemHealth() {
  return (
    <section className="ca-surface rounded-2xl p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="ca-eyebrow">System</span>
          <h2 className="mt-2 text-lg font-semibold text-cloud">
            Platform health
          </h2>
          <p className="mt-1 text-sm text-cloud/45">
            Current control-plane service state.
          </p>
        </div>

        <span className="rounded-full border border-white/[0.07] bg-black/10 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-cloud/45">
          Live state
        </span>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {healthItems.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-white/[0.06] bg-black/10 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.025] text-sage">
                  <item.icon className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium text-cloud">
                    {item.label}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-cloud/40">
                    {item.description}
                  </p>
                </div>
              </div>

              <HealthStatus status={item.status} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SystemHealth;
