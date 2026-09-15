import { CheckCircle2, FileText, GitBranch, Layers, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ActivityItem {
  id: string;
  type: 'verification' | 'relationship' | 'article' | 'ontology' | 'user';
  title: string;
  subtitle?: string;
  author: string;
  timeAgo: string;
  icon: typeof CheckCircle2;
  iconBg: string;
  iconColor: string;
}

const recentActivities: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'verification',
    title: 'Entity "Nelson Mandela" verified',
    author: 'Amara K.',
    timeAgo: '2m ago',
    icon: CheckCircle2,
    iconBg: 'bg-emerald/15',
    iconColor: 'text-emerald',
  },
  {
    id: 'act-2',
    type: 'relationship',
    title: 'Relationship added',
    subtitle: 'Mansa Musa → Mali Empire',
    author: 'Kwame D.',
    timeAgo: '15m ago',
    icon: GitBranch,
    iconBg: 'bg-purple-500/15',
    iconColor: 'text-purple-400',
  },
  {
    id: 'act-3',
    type: 'article',
    title: 'Article published',
    subtitle: 'The Rise of Benin Empire',
    author: 'Zainab A.',
    timeAgo: '1h ago',
    icon: FileText,
    iconBg: 'bg-blue-500/15',
    iconColor: 'text-blue-400',
  },
  {
    id: 'act-4',
    type: 'ontology',
    title: 'Ontology updated',
    subtitle: 'Added new rule to Person',
    author: 'Samuel O.',
    timeAgo: '2h ago',
    icon: Layers,
    iconBg: 'bg-amber-500/15',
    iconColor: 'text-amber-400',
  },
  {
    id: 'act-5',
    type: 'user',
    title: 'User registered',
    subtitle: 'New contributor joined',
    author: 'Fatou S.',
    timeAgo: '3h ago',
    icon: UserPlus,
    iconBg: 'bg-cyan-500/15',
    iconColor: 'text-cyan-400',
  },
];

export function RecentActivityPanel({ auditLogs = [] }: { auditLogs?: any[] }) {
  const items = auditLogs.length > 0 ? auditLogs.slice(0, 5).map((log, i) => ({
    id: log.id || String(i),
    type: 'verification' as const,
    title: log.action || log.title || 'Platform operation recorded',
    subtitle: log.details || log.target || '',
    author: log.userId || log.actor || 'System',
    timeAgo: 'Recently',
    icon: CheckCircle2,
    iconBg: 'bg-emerald/15',
    iconColor: 'text-emerald',
  })) : recentActivities;

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-white/[0.07] bg-[#10201A]/60 p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-cloud">Recent Activity</h2>
        <Link
          to="/admin/observability/audit"
          className="text-xs font-medium text-sage hover:text-cloud transition"
        >
          View all
        </Link>
      </div>

      <div className="mt-4 space-y-4">
        {items.map((act) => {
          const Icon = act.icon;
          return (
            <div key={act.id} className="flex items-start gap-3">
              <div
                className={[
                  'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/[0.06]',
                  act.iconBg,
                  act.iconColor,
                ].join(' ')}
              >
                <Icon className="h-4 w-4" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="truncate text-xs font-semibold text-cloud">
                    {act.title}
                  </p>
                  <span className="shrink-0 text-[10px] text-cloud/40">
                    {act.timeAgo}
                  </span>
                </div>

                {act.subtitle && (
                  <p className="mt-0.5 truncate text-xs text-cloud/55">
                    {act.subtitle}
                  </p>
                )}

                <p className="mt-0.5 text-[11px] text-cloud/40">
                  by <span className="text-cloud/65">{act.author}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentActivityPanel;
