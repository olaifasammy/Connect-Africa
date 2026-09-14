import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Info,
  type LucideIcon,
} from 'lucide-react';

export type AttentionSeverity =
  | 'critical'
  | 'warning'
  | 'info'
  | 'success';

export interface AttentionItem {
  id: string;
  title: string;
  description?: string;
  severity: AttentionSeverity;
  timestamp?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export interface AttentionPanelProps {
  title?: string;
  eyebrow?: string;
  items: AttentionItem[];
  emptyMessage?: string;
  className?: string;
}

const severityConfig: Record<
  AttentionSeverity,
  {
    icon: LucideIcon;
    iconClass: string;
    dotClass: string;
  }
> = {
  critical: {
    icon: AlertCircle,
    iconClass: 'text-red-300',
    dotClass: 'bg-red-400',
  },
  warning: {
    icon: AlertTriangle,
    iconClass: 'text-amber-300',
    dotClass: 'bg-amber-400',
  },
  info: {
    icon: Info,
    iconClass: 'text-sky-300',
    dotClass: 'bg-sky-400',
  },
  success: {
    icon: CheckCircle2,
    iconClass: 'text-emerald',
    dotClass: 'bg-emerald',
  },
};

export function AttentionPanel({
  title = 'Requires attention',
  eyebrow = 'Attention',
  items,
  emptyMessage = 'No outstanding items require attention.',
  className = '',
}: AttentionPanelProps) {
  return (
    <section
      className={[
        'ca-surface rounded-2xl overflow-hidden',
        className,
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-4 border-b border-white/[0.05] px-5 py-4">
        <div>
          <span className="ca-eyebrow">{eyebrow}</span>

          <h2 className="mt-1.5 text-base font-semibold text-cloud">
            {title}
          </h2>
        </div>

        {items.length > 0 && (
          <span className="rounded-full border border-white/[0.06] bg-white/[0.025] px-2 py-1 text-[10px] font-semibold text-cloud/40">
            {items.length}
          </span>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex min-h-32 items-center justify-center px-5 py-8 text-center">
          <div>
            <CheckCircle2
              size={22}
              className="mx-auto text-emerald/70"
              strokeWidth={1.5}
            />

            <p className="mt-3 text-sm text-cloud/45">
              {emptyMessage}
            </p>
          </div>
        </div>
      ) : (
        <div className="divide-y divide-white/[0.045]">
          {items.map((item) => {
            const config = severityConfig[item.severity];
            const Icon = config.icon;

            return (
              <div
                key={item.id}
                className="group px-5 py-4 transition hover:bg-white/[0.015]"
              >
                <div className="flex gap-3">
                  <div className="mt-0.5 shrink-0">
                    <Icon
                      size={17}
                      strokeWidth={1.7}
                      className={config.iconClass}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="text-sm font-medium text-cloud/80">
                        {item.title}
                      </h3>

                      {item.timestamp && (
                        <span className="text-[10px] text-cloud/25">
                          {item.timestamp}
                        </span>
                      )}
                    </div>

                    {item.description && (
                      <p className="mt-1 text-xs leading-5 text-cloud/40">
                        {item.description}
                      </p>
                    )}

                    {item.actionLabel && item.onAction && (
                      <button
                        type="button"
                        onClick={item.onAction}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-sage transition hover:text-cloud"
                      >
                        {item.actionLabel}
                        <ArrowRight
                          size={12}
                          className="transition-transform group-hover:translate-x-0.5"
                        />
                      </button>
                    )}
                  </div>

                  <span
                    className={[
                      'mt-1 h-1.5 w-1.5 shrink-0 rounded-full',
                      config.dotClass,
                    ].join(' ')}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default AttentionPanel;
