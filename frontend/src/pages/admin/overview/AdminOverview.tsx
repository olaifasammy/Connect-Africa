import {
  ArrowRight,
  Bot,
  Database,
  GitBranch,
  Layers3,
  Search,
  Shield,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AttentionPanel } from '../components/AttentionPanel';
import { MetricCard } from '../components/MetricCard';
import { KnowledgeHealth } from './KnowledgeHealth';
import { OperationsFeed } from './OperationsFeed';
import { SystemHealth } from './SystemHealth';

const attentionItems = [
  {
    id: 'backend-data',
    title: 'Live administrative data is not connected yet',
    description:
      'The overview is structurally ready; backend health and knowledge metrics will be connected through the existing service layer.',
    severity: 'info' as const,
  },
];

const modules = [
  {
    label: 'Entities',
    description: 'Govern the knowledge graph entities.',
    href: '/admin/entities',
    icon: GitBranch,
  },
  {
    label: 'Ontology',
    description: 'Manage types, definitions, and versions.',
    href: '/admin/ontology',
    icon: Layers3,
  },
  {
    label: 'Identity',
    description: 'Manage users, roles, and access.',
    href: '/admin/identity/users',
    icon: Users,
  },
  {
    label: 'Search',
    description: 'Inspect retrieval and index health.',
    href: '/admin/search',
    icon: Search,
  },
  {
    label: 'Intelligence',
    description: 'Manage AI and automation systems.',
    href: '/admin/intelligence/ai',
    icon: Bot,
  },
  {
    label: 'Operations',
    description: 'Review audit and platform operations.',
    href: '/admin/observability/operations',
    icon: Database,
  },
];

export function AdminOverview() {
  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-forest via-forest/80 to-black/20 p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald/10 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <span className="ca-eyebrow">Command center</span>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-cloud sm:text-4xl">
              Administration
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-cloud/55 sm:text-base">
              Govern Connect-Africa's ontology, knowledge graph, identity,
              intelligence, search, and operational infrastructure from one
              control plane.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-emerald/20 bg-emerald/10 px-3.5 py-2 text-xs font-medium text-sage">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
              Control plane online
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Knowledge graph"
          value="Ready"
          description="Entity and relationship administration"
          icon={<GitBranch className="h-4 w-4" />}
          status="healthy"
        />
        <MetricCard
          label="Ontology"
          value="Ready"
          description="Types and version management"
          icon={<Layers3 className="h-4 w-4" />}
          status="healthy"
        />
        <MetricCard
          label="Identity"
          value="Ready"
          description="Users and access governance"
          icon={<Shield className="h-4 w-4" />}
          status="healthy"
        />
        <MetricCard
          label="Infrastructure"
          value="Standby"
          description="Live service metrics pending integration"
          icon={<Database className="h-4 w-4" />}
          status="default"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <SystemHealth />
        <AttentionPanel
          title="Attention"
          items={attentionItems}
        />
      </div>

      <KnowledgeHealth />

      <section className="ca-surface rounded-2xl p-5 sm:p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="ca-eyebrow">Platform domains</span>
            <h2 className="mt-2 text-lg font-semibold text-cloud">
              Administrative modules
            </h2>
            <p className="mt-1 text-sm text-cloud/45">
              Navigate directly into a bounded administrative capability.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon;

            return (
              <Link
                key={module.href}
                to={module.href}
                className="group rounded-xl border border-white/[0.06] bg-black/10 p-4 transition duration-200 hover:border-emerald/25 hover:bg-forest"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.025] text-sage">
                    <Icon className="h-4 w-4" />
                  </div>

                  <ArrowRight className="h-4 w-4 text-cloud/25 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-sage" />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-cloud">
                  {module.label}
                </h3>

                <p className="mt-1 text-xs leading-5 text-cloud/40">
                  {module.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <OperationsFeed />
    </div>
  );
}

export default AdminOverview;
