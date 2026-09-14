import type { ReactNode } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Minus,
} from 'lucide-react';

type MetricStatus = 'default' | 'healthy' | 'warning' | 'critical';

export interface MetricCardProps {
  label: string;
  value: string | number;
  description?: string;
  hint?: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  status?: MetricStatus;
  className?: string;
}

const statusStyles: Record<MetricStatus, string> = {
  default: 'border-white/[0.07] bg-white/[0.02]',
  healthy: 'border-emerald/20 bg-emerald/[0.04]',
  warning: 'border-gold/20 bg-gold/[0.04]',
  critical: 'border-red-400/20 bg-red-400/[0.04]',
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
        'rounded-2xl border p-5 transition-colors duration-200',
        statusStyles[status],
        className,
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-cloud/40">
            {label}
          </p>

          <p className="mt-3 text-2xl font-semibold tracking-tight text-cloud">
            {value}
          </p>
        </div>

        {icon ? (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.025] text-sage">
            {icon}
          </div>
        ) : null}
      </div>

      {(finalDescription || trendValue) && (
        <div className="mt-3 flex items-center justify-between gap-3">
          {finalDescription ? (
            <p className="text-xs leading-5 text-cloud/40">
              {finalDescription}
            </p>
          ) : (
            <span />
          )}

          {trend && trendValue ? (
            <span
              className={[
                'inline-flex shrink-0 items-center gap-1 text-xs font-medium',
                trend === 'up'
                  ? 'text-sage'
                  : trend === 'down'
                    ? 'text-red-300'
                    : 'text-cloud/45',
              ].join(' ')}
            >
              {TrendIcon ? <TrendIcon className="h-3.5 w-3.5" /> : null}
              {trendValue}
            </span>
          ) : null}
        </div>
      )}
    </article>
  );
}

export default MetricCard;
