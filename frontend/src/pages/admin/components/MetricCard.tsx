import type { ReactNode } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Minus,
} from 'lucide-react';

export type MetricStatus = 'default' | 'healthy' | 'warning' | 'critical';

export interface MetricCardProps {
  label: string;
  value: string | number;
  description?: string;
  hint?: string;
  icon?: ReactNode;
  iconBgColor?: string;
  iconColor?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  status?: MetricStatus;
  className?: string;
}

const statusStyles: Record<MetricStatus, string> = {
  default: 'ca-card bg-surface shadow-scholar hover:border-gold',
  healthy: 'ca-card border-emerald-900/30 dark:border-emerald-400/30 bg-surface shadow-scholar hover:border-emerald-900',
  warning: 'ca-card border-gold/40 bg-surface shadow-scholar hover:border-gold',
  critical: 'ca-card border-clay/40 bg-surface shadow-scholar hover:border-clay',
};

const trendIcons = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  neutral: Minus,
};

export function MetricCard({
  label,
  value,
  description,
  hint,
  icon,
  iconBgColor,
  iconColor,
  trend,
  trendValue,
  status = 'default',
  className = '',
}: MetricCardProps) {
  const TrendIcon = trend ? trendIcons[trend] : null;
  const finalDescription = description || hint;

  return (
    <article
      className={[
        'group relative overflow-hidden rounded-xl border p-5 transition-all duration-200 font-sans',
        statusStyles[status],
        className,
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="truncate font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
            {label}
          </p>

          <p className="mt-1 font-serif text-2xl font-bold tracking-tight text-text-main sm:text-3xl">
            {value}
          </p>
        </div>

        {icon ? (
          <div
            className={[
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-stone/20 transition-transform duration-200 group-hover:scale-105',
              iconBgColor || 'bg-canvas',
              iconColor || 'text-gold',
            ].join(' ')}
          >
            {icon}
          </div>
        ) : null}
      </div>

      {(finalDescription || trendValue) && (
        <div className="mt-3 flex items-center gap-2 font-mono text-xs">
          {trend && trendValue ? (
            <span
              className={[
                'inline-flex shrink-0 items-center gap-0.5 font-bold',
                trend === 'up'
                  ? 'text-emerald-900 dark:text-gold'
                  : trend === 'down'
                    ? 'text-clay'
                    : 'text-text-muted',
              ].join(' ')}
            >
              {TrendIcon ? <TrendIcon className="h-3.5 w-3.5" /> : null}
              {trendValue}
            </span>
          ) : null}

          {finalDescription ? (
            <p className="truncate text-text-muted">
              {finalDescription}
            </p>
          ) : null}
        </div>
      )}
    </article>
  );
}

export default MetricCard;
