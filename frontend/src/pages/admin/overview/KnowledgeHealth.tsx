import {
  Boxes,
  GitBranch,
  Layers3,
  Network,
} from 'lucide-react';
import { MetricCard } from '../components/MetricCard';

type KnowledgeMetric = {
  label: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  status: 'default' | 'healthy' | 'warning' | 'critical';
};

const metrics: KnowledgeMetric[] = [
  {
    label: 'Entities',
    value: '—',
    description: 'Awaiting live graph data',
    icon: <Boxes className="h-4 w-4" />,
    status: 'default',
  },
  {
    label: 'Relationships',
    value: '—',
    description: 'Awaiting graph statistics',
    icon: <GitBranch className="h-4 w-4" />,
    status: 'default',
  },
  {
    label: 'Ontology',
    value: '—',
    description: 'Active definition set',
    icon: <Layers3 className="h-4 w-4" />,
    status: 'default',
  },
  {
    label: 'Graph health',
    value: '—',
    description: 'Awaiting diagnostics',
    icon: <Network className="h-4 w-4" />,
    status: 'default',
  },
];

export function KnowledgeHealth() {
  return (
    <section className="ca-surface rounded-2xl p-5 sm:p-6">
      <div>
        <span className="ca-eyebrow">Knowledge graph</span>

        <h2 className="mt-2 text-lg font-semibold text-cloud">
          Knowledge health
        </h2>

        <p className="mt-1 text-sm text-cloud/45">
          Core graph and ontology indicators.
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            description={metric.description}
            icon={metric.icon}
            status={metric.status}
          />
        ))}
      </div>
    </section>
  );
}

export default KnowledgeHealth;
