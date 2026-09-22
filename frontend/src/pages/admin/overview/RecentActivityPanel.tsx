import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, FileText, Globe, Layers3 } from 'lucide-react';

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'entity' | 'article' | 'source' | 'governance';
}

const recentActivities: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Entity Verified',
    description: 'Nelson Mandela verified against authoritative state record.',
    time: '2m ago',
    type: 'entity',
  },
  {
    id: 'act-2',
    title: 'Article Published',
    description: 'Continental Free Trade Area (AfCFTA) impact analysis published.',
    time: '14m ago',
    type: 'article',
  },
  {
    id: 'act-3',
    title: 'Source Ingested',
    description: 'ECOWAS regional stability report successfully crawled.',
    time: '45m ago',
    type: 'source',
  },
  {
    id: 'act-4',
    title: 'Role Assigned',
    description: 'Editor role provisioned for regional research lead.',
    time: '2h ago',
    type: 'governance',
  },
];

const typeIcons = {
  entity: <Layers3 className="h-4 w-4 text-gold" />,
  article: <FileText className="h-4 w-4 text-emerald-900 dark:text-gold" />,
  source: <Globe className="h-4 w-4 text-clay" />,
  governance: <CheckCircle2 className="h-4 w-4 text-gold" />,
};

export const RecentActivityPanel: React.FC = () => {
  return (
    <div className="ca-card bg-surface shadow-scholar p-6 font-sans">
      <div>
        <div className="flex items-center justify-between border-b border-stone/15 pb-3">
          <h3 className="font-serif text-base font-bold text-text-main">Recent Activity</h3>
          <Link
            to="/admin/observability/audit"
            className="font-mono text-xs font-semibold text-emerald-900 dark:text-gold transition hover:underline flex items-center gap-1"
          >
            Audit Log
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="mt-4 space-y-4">
          {recentActivities.map((act) => (
            <div key={act.id} className="flex items-start gap-3 group">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-stone/20 bg-canvas transition group-hover:scale-105">
                {typeIcons[act.type]}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-serif text-xs font-bold text-text-main truncate">
                    {act.title}
                  </p>
                  <span className="font-mono text-[10px] text-text-muted shrink-0">
                    {act.time}
                  </span>
                </div>
                <p className="mt-0.5 font-sans text-xs text-text-muted leading-relaxed line-clamp-2">
                  {act.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivityPanel;
