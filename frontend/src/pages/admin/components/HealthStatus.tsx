import {
  AlertTriangle,
  CheckCircle2,
  Circle,
  XCircle,
} from 'lucide-react';

export type HealthState =
  | 'healthy'
  | 'operational'
  | 'degraded'
  | 'warning'
  | 'critical'
  | 'offline'
  | 'unknown';

export interface HealthStatusProps {
  status: HealthState;
  label?: string;
  detail?: string;
  size?: 'sm' | 'md';
  className?: string;
}

const statusConfig: Record<
  HealthState,
  {
    label: string;
    icon: typeof CheckCircle2;
    dot: string;
    text: string;
  }
> = {
  healthy: {
    label: 'Healthy',
    icon: CheckCircle2,
    dot: 'bg-emerald',
    text: 'text-emerald',
  },
  operational: {
    label: 'Operational',
    icon: CheckCircle2,
    dot: 'bg-emerald',
    text: 'text-emerald',
  },
  degraded: {
    label: 'Degraded',
    icon: AlertTriangle,
    dot: 'bg-amber-400',
    text: 'text-amber-300',
  },
  warning: {
    label: 'Warning',
    icon: AlertTriangle,
    dot: 'bg-amber-400',
    text: 'text-amber-300',
  },
  critical: {
    label: 'Critical',
    icon: XCircle,
    dot: 'bg-red-400',
    text: 'text-red-300',
  },
  offline: {
    label: 'Offline',
    icon: XCircle,
    dot: 'bg-red-400',
    text: 'text-red-300',
  },
  unknown: {
    label: 'Unknown',
    icon: Circle,
    dot: 'bg-cloud/30',
    text: 'text-cloud/45',
  },
};

export function HealthStatus({
  status,
  label,
  detail,
  size = 'md',
  className = '',
}: HealthStatusProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  const iconSize = size === 'sm' ? 13 : 15;

  return (
    <div
      className={[
        'inline-flex items-center gap-2',
        className,
      ].join(' ')}
    >
      <span
        className={[
          'shrink-0 rounded-full',
          size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2',
          config.dot,
        ].join(' ')}
      />

      <Icon
        size={iconSize}
        strokeWidth={1.8}
        className={config.text}
      />

      <span
        className={[
          'font-medium',
          size === 'sm' ? 'text-[11px]' : 'text-xs',
          config.text,
        ].join(' ')}
      >
        {label ?? config.label}
      </span>

      {detail && (
        <span
          className={[
            'text-cloud/35',
            size === 'sm' ? 'text-[11px]' : 'text-xs',
          ].join(' ')}
        >
          {detail}
        </span>
      )}
    </div>
  );
}

export default HealthStatus;
