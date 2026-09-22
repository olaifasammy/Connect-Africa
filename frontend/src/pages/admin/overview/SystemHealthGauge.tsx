import React from 'react';
import { Activity, CheckCircle2 } from 'lucide-react';

interface SystemHealthGaugeProps {
  healthPercentage?: number;
  statusText?: string;
}

export const SystemHealthGauge: React.FC<SystemHealthGaugeProps> = ({
  healthPercentage = 98,
  statusText = 'All systems operational',
}) => {
  return (
    <div className="ca-card bg-surface shadow-scholar p-6 font-sans">
      <div className="flex items-center justify-between border-b border-stone/15 pb-3">
        <h3 className="font-serif text-base font-bold text-text-main">System Telemetry</h3>
        <span className="ca-badge-emerald">
          <Activity className="h-3 w-3 mr-1" />
          Live
        </span>
      </div>

      <div className="mt-6 flex flex-col items-center justify-center text-center">
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-gold/30 bg-gold/5">
          <div className="absolute inset-0 rounded-full border-4 border-gold border-t-transparent animate-spin duration-1000" style={{ animationDuration: '8s' }} />
          <div className="flex flex-col items-center">
            <span className="font-serif text-3xl font-bold tracking-tight text-text-main">
              {healthPercentage}%
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-gold font-bold">
              Optimal
            </span>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-1.5 font-mono text-xs font-semibold text-emerald-900 dark:text-gold">
          <CheckCircle2 className="h-4 w-4 text-emerald-900 dark:text-gold" />
          <span>{statusText}</span>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthGauge;
