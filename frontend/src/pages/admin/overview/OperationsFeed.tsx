import {
  Activity,
  Database,
  GitBranch,
  Layers3,
  ShieldCheck,
} from 'lucide-react';
import { ActivityFeed } from '../components/ActivityFeed';

const activity = [
  {
    id: 'ontology',
    title: 'Ontology control plane initialized',
    description:
      'Administrative ontology surfaces are ready for integration.',
    actor: 'System',
    timestamp: 'Current session',
    severity: 'info' as const,
    icon: <Layers3 className="h-4 w-4" />,
  },
  {
    id: 'knowledge',
    title: 'Knowledge graph workspace initialized',
    description:
      'Entity and relationship administration surfaces are available.',
    actor: 'System',
    timestamp: 'Current session',
    severity: 'success' as const,
    icon: <GitBranch className="h-4 w-4" />,
  },
  {
    id: 'operations',
    title: 'Operations monitoring initialized',
    description:
      'Audit and operational monitoring surfaces are ready.',
    actor: 'System',
    timestamp: 'Current session',
    severity: 'info' as const,
    icon: <Activity className="h-4 w-4" />,
  },
  {
    id: 'database',
    title: 'Persistence layer available',
    description:
      'The administrative UI is ready to consume backend health data.',
    actor: 'System',
    timestamp: 'Current session',
    severity: 'success' as const,
    icon: <Database className="h-4 w-4" />,
  },
  {
    id: 'security',
    title: 'Administrative access surface active',
    description:
      'Identity and permission management remain restricted to administrators.',
    actor: 'System',
    timestamp: 'Current session',
    severity: 'info' as const,
    icon: <ShieldCheck className="h-4 w-4" />,
  },
];

export function OperationsFeed() {
  return (
    <section className="ca-surface rounded-2xl p-5 sm:p-6">
      <div>
        <span className="ca-eyebrow">Operations</span>

        <h2 className="mt-2 text-lg font-semibold text-cloud">
          Administrative activity
        </h2>

        <p className="mt-1 text-sm text-cloud/45">
          Control-plane events currently known to the frontend.
        </p>
      </div>

      <div className="mt-6">
        <ActivityFeed items={activity} />
      </div>
    </section>
  );
}

export default OperationsFeed;
