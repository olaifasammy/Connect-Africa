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
  default: 'border-white/[0.07] bg-[#10201A]/60 hover:border-white/[0.12]',
  healthy: 'border-emerald/20 bg-emerald/[0.03] hover:border-emerald/30',
  warning: 'border-gold/20 bg-gold/[0.03] hover:border-gold/30',
  critical: 'border-terra/20 bg-terra/[0.03] hover:border-terra/30',
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
        'group relative overflow-hidden rounded-2xl border p-5 transition-all duration-200 backdrop-blur-sm',
        statusStyles[status],
        className,
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-cloud/55">
            {label}
          </p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-cloud sm:text-3xl">
            {value}
          </p>
        </div>

        {icon ? (
          <div
            className={[
              'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] transition-transform duration-200 group-hover:scale-105',
              iconBgColor || 'bg-white/[0.04]',
              iconColor || 'text-sage',
            ].join(' ')}
          >
            {icon}
          </div>
        ) : null}
      </div>

      {(finalDescription || trendValue) && (
        <div className="mt-3 flex items-center gap-2">
          {trend && trendValue ? (
            <span
              className={[
                'inline-flex shrink-0 items-center gap-0.5 text-xs font-semibold',
                trend === 'up'
                  ? 'text-sage'
                  : trend === 'down'
                    ? 'text-terra'
                    : 'text-cloud/45',
              ].join(' ')}
            >
              {TrendIcon ? <TrendIcon className="h-3.5 w-3.5" /> : null}
              {trendValue}
            </span>
          ) : null}

          {finalDescription ? (
            <p className="truncate text-xs text-cloud/40">
              {finalDescription}
            </p>
          ) : null}
        </div>
      )}
    </article>
  );
}

export default MetricCard;
