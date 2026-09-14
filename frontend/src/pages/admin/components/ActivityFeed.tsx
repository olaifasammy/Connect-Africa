import type { ReactNode } from 'react';

export type ActivitySeverity =
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';

export interface ActivityItem {
  id: string;
  title: string;
  description?: string;
  actor?: string;
  timestamp: string;
  severity?: ActivitySeverity;
  icon?: ReactNode;
}

export interface ActivityFeedProps {
  items: ActivityItem[];
  emptyTitle?: string;
  emptyDescription?: string;
}

const severityStyles: Record<ActivitySeverity, string> = {
  success: 'border-emerald/20 bg-emerald/[0.06] text-sage',
  warning: 'border-gold/20 bg-gold/[0.06] text-gold',
  error: 'border-red-400/20 bg-red-400/[0.06] text-red-300',
  info: 'border-sky-400/20 bg-sky-400/[0.06] text-sky-300',
  neutral: 'border-white/[0.07] bg-white/[0.025] text-cloud/45',
};

export function ActivityFeed({
  items,
  emptyTitle = 'No recent activity',
  emptyDescription = 'There are no administrative events to display.',
}: ActivityFeedProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-white/[0.08] px-5 py-8 text-center">
        <p className="text-sm font-medium text-cloud/65">{emptyTitle}</p>
        <p className="mt-1 text-xs text-cloud/35">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-white/[0.05]">
      {items.map((item) => {
        const severity = item.severity ?? 'neutral';

        return (
          <article
            key={item.id}
            className="flex gap-4 py-4 first:pt-0 last:pb-0"
          >
            <div
              className={[
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border',
                severityStyles[severity],
              ].join(' ')}
            >
              {item.icon ?? <span className="h-1.5 w-1.5 rounded-full bg-current" />}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-start">
                <p className="text-sm font-medium text-cloud">
                  {item.title}
                </p>

                <time className="shrink-0 text-[11px] text-cloud/30">
                  {item.timestamp}
                </time>
              </div>

              {item.description ? (
                <p className="mt-1 text-xs leading-5 text-cloud/40">
                  {item.description}
                </p>
              ) : null}

              {item.actor ? (
                <p className="mt-2 text-[11px] font-medium text-cloud/30">
                  {item.actor}
                </p>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default ActivityFeed;
