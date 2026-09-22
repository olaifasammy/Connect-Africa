import { useState } from 'react';
import {
  Layers3,
  Network,
  ShieldCheck,
  Lock,
  GitBranch,
  Plus,
  Play,
  CheckCircle2,
  MoreVertical,
  ArrowRight,
} from 'lucide-react';
import { MetricCard } from '../components/MetricCard';

interface OntologyOverviewProps {
  onNavigateTab: (tab: string) => void;
  onOpenAction: (actionName: string) => void;
}

export function OntologyOverview({ onNavigateTab, onOpenAction }: OntologyOverviewProps) {
  const [runningValidation, setRunningValidation] = useState(false);
  const [validationSuccess, setValidationSuccess] = useState(false);

  const handleRunValidation = () => {
    setRunningValidation(true);
    setValidationSuccess(false);
    setTimeout(() => {
      setRunningValidation(false);
      setValidationSuccess(true);
    }, 1200);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Metric Cards Row (5 Cards matching Dashboard) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <MetricCard
          label="Entity Types"
          value="189"
          trend="up"
          trendValue="+5 this month"
          icon={<Layers3 className="h-5 w-5" />}
          status="default"
        />
        <MetricCard
          label="Relationship Types"
          value="362"
          trend="up"
          trendValue="+12 this month"
          icon={<Network className="h-5 w-5" />}
          status="default"
        />
        <MetricCard
          label="Validation Rules"
          value="578"
          trend="up"
          trendValue="+18 this month"
          icon={<ShieldCheck className="h-5 w-5" />}
          status="default"
        />
        <MetricCard
          label="Constraints"
          value="214"
          trend="up"
          trendValue="+7 this month"
          icon={<Lock className="h-5 w-5" />}
          status="default"
        />
        <MetricCard
          label="Ontology Version"
          value="v2.4.1"
          trend="neutral"
          trendValue="Published"
          icon={<GitBranch className="h-5 w-5" />}
          status="healthy"
        />
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
        {/* Left Column: Tables & Timeline */}
        <div className="space-y-6">
          {/* Entity Types (Top 6) */}
          <div className="ca-card bg-surface shadow-scholar p-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone/20">
              <div className="flex items-center gap-2">
                <Layers3 className="h-5 w-5 text-gold" />
                <h3 className="font-serif text-lg font-bold text-text-main">Entity Types (Top 6)</h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('Entity Types')}
                className="font-mono text-xs font-semibold text-gold hover:underline flex items-center gap-1"
              >
                View all <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left font-sans text-xs">
                <thead>
                  <tr className="border-b border-stone/20 font-mono text-text-muted uppercase tracking-wider text-[11px]">
                    <th className="pb-3 font-semibold">Entity Type</th>
                    <th className="pb-3 font-semibold">Description</th>
                    <th className="pb-3 font-semibold text-right">Instances</th>
                    <th className="pb-3 font-semibold text-right">Updated</th>
                    <th className="pb-3 font-semibold text-center w-12">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone/10">
                  {[
                    { name: 'Person', desc: 'A human being or individual.', instances: '1,245,782', updated: 'May 18, 2025' },
                    { name: 'Organization', desc: 'An organization or institution.', instances: '245,631', updated: 'May 17, 2025' },
                    { name: 'Place', desc: 'A location or geographical place.', instances: '688,120', updated: 'May 16, 2025' },
                    { name: 'Event', desc: 'An event or occurrence.', instances: '342,998', updated: 'May 15, 2025' },
                    { name: 'Work', desc: 'A creative or intellectual work.', instances: '156,442', updated: 'May 14, 2025' },
                    { name: 'Concept', desc: 'An abstract idea or concept.', instances: '87,221', updated: 'May 13, 2025' },
                  ].map((row) => (
                    <tr key={row.name} className="hover:bg-stone/5 transition">
                      <td className="py-3.5 font-serif font-bold text-text-main flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded bg-gold/10 text-gold font-mono text-[10px]">
                          {row.name.substring(0, 2).toUpperCase()}
                        </span>
                        {row.name}
                      </td>
                      <td className="py-3.5 text-text-muted truncate max-w-[220px]">{row.desc}</td>
                      <td className="py-3.5 text-right font-mono text-text-main font-semibold">{row.instances}</td>
                      <td className="py-3.5 text-right font-mono text-text-muted">{row.updated}</td>
                      <td className="py-3.5 text-center">
                        <button
                          type="button"
                          onClick={() => onOpenAction(`Edit Entity Type: ${row.name}`)}
                          className="p-1 text-text-muted hover:text-gold transition rounded"
                          aria-label={`Actions for ${row.name}`}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Relationship Types (Top 6) */}
          <div className="ca-card bg-surface shadow-scholar p-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone/20">
              <div className="flex items-center gap-2">
                <Network className="h-5 w-5 text-gold" />
                <h3 className="font-serif text-lg font-bold text-text-main">Relationship Types (Top 6)</h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('Relationship Types')}
                className="font-mono text-xs font-semibold text-gold hover:underline flex items-center gap-1"
              >
                View all <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left font-sans text-xs">
                <thead>
                  <tr className="border-b border-stone/20 font-mono text-text-muted uppercase tracking-wider text-[11px]">
                    <th className="pb-3 font-semibold">Relationship</th>
                    <th className="pb-3 font-semibold">Domain → Range</th>
                    <th className="pb-3 font-semibold text-right">Instances</th>
                    <th className="pb-3 font-semibold text-right">Updated</th>
                    <th className="pb-3 font-semibold text-center w-12">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone/10">
                  {[
                    { rel: 'was born in', domainRange: 'Person → Place', instances: '512,894', updated: 'May 18, 2025' },
                    { rel: 'died in', domainRange: 'Person → Place', instances: '210,432', updated: 'May 17, 2025' },
                    { rel: 'member of', domainRange: 'Person → Organization', instances: '732,115', updated: 'May 16, 2025' },
                    { rel: 'founded', domainRange: 'Person → Organization', instances: '95,231', updated: 'May 15, 2025' },
                    { rel: 'took place in', domainRange: 'Event → Place', instances: '421,887', updated: 'May 14, 2025' },
                    { rel: 'awarded', domainRange: 'Organization → Work', instances: '118,332', updated: 'May 13, 2025' },
                  ].map((row) => (
                    <tr key={row.rel} className="hover:bg-stone/5 transition">
                      <td className="py-3.5 font-serif font-bold text-text-main">{row.rel}</td>
                      <td className="py-3.5 font-mono text-text-muted">{row.domainRange}</td>
                      <td className="py-3.5 text-right font-mono text-text-main font-semibold">{row.instances}</td>
                      <td className="py-3.5 text-right font-mono text-text-muted">{row.updated}</td>
                      <td className="py-3.5 text-center">
                        <button
                          type="button"
                          onClick={() => onOpenAction(`Edit Relationship: ${row.rel}`)}
                          className="p-1 text-text-muted hover:text-gold transition rounded"
                          aria-label={`Actions for ${row.rel}`}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Constraints Overview */}
          <div className="ca-card bg-surface shadow-scholar p-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone/20">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-gold" />
                <h3 className="font-serif text-lg font-bold text-text-main">Constraints Overview</h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('Constraints')}
                className="font-mono text-xs font-semibold text-gold hover:underline flex items-center gap-1"
              >
                View all constraints <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left font-sans text-xs">
                <thead>
                  <tr className="border-b border-stone/20 font-mono text-text-muted uppercase tracking-wider text-[11px]">
                    <th className="pb-3 font-semibold">Constraint</th>
                    <th className="pb-3 font-semibold">Applies To</th>
                    <th className="pb-3 font-semibold">Type</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Violations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone/10">
                  {[
                    { constraint: 'Person must have a birth date or birth event', applies: 'Person', type: 'Required', status: 'Active', violations: 23 },
                    { constraint: 'Event must occur in some place', applies: 'Event', type: 'Required', status: 'Active', violations: 12 },
                    { constraint: 'Each relationship must have a valid source and target', applies: 'All', type: 'Structural', status: 'Active', violations: 0 },
                    { constraint: 'Organization must have at least one member', applies: 'Organization', type: 'Business Rule', status: 'Active', violations: 7 },
                    { constraint: 'Place must have geographic coordinates', applies: 'Place', type: 'Recommended', status: 'Active', violations: 15 },
                  ].map((row) => (
                    <tr key={row.constraint} className="hover:bg-stone/5 transition">
                      <td className="py-3.5 font-serif font-medium text-text-main">{row.constraint}</td>
                      <td className="py-3.5 font-mono text-text-muted">{row.applies}</td>
                      <td className="py-3.5 font-mono text-text-muted">{row.type}</td>
                      <td className="py-3.5">
                        <span className="ca-badge-emerald font-mono text-[10px]">{row.status}</span>
                      </td>
                      <td className="py-3.5 text-right font-mono font-bold">
                        <span className={row.violations > 0 ? 'text-clay font-bold' : 'text-emerald-900 dark:text-gold'}>
                          {row.violations}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Ontology Versions */}
          <div className="ca-card bg-surface shadow-scholar p-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone/20">
              <div className="flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-gold" />
                <h3 className="font-serif text-lg font-bold text-text-main">Ontology Versions</h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('Versions')}
                className="font-mono text-xs font-semibold text-gold hover:underline flex items-center gap-1"
              >
                View all versions <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {[
                { version: 'v2.4.1', date: 'May 18, 2025', author: 'by Amara K.', changes: 24, status: 'Current', published: true },
                { version: 'v2.4.0', date: 'Apr 28, 2025', author: 'by Kwame D.', changes: 18, status: 'Previous', published: false },
                { version: 'v2.3.0', date: 'Mar 15, 2025', author: 'by Zainab A.', changes: 31, status: 'Previous', published: false },
                { version: 'v2.2.0', date: 'Feb 10, 2025', author: 'by Fatou S.', changes: 16, status: 'Previous', published: false },
                { version: 'v2.1.0', date: 'Jan 05, 2025', author: 'by Samuel O.', changes: 22, status: 'Previous', published: false },
              ].map((v, idx) => (
                <div key={v.version} className="flex items-start justify-between p-3.5 rounded-xl border border-stone/15 bg-canvas/40 hover:border-gold/40 transition">
                  <div className="flex items-center gap-3">
                    <div className="relative flex flex-col items-center">
                      <span className={`h-3 w-3 rounded-full ${idx === 0 ? 'bg-gold ring-4 ring-gold/20' : 'bg-stone/40'}`} />
                      {idx < 4 && <span className="absolute top-3 w-0.5 h-10 bg-stone/20" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif font-bold text-text-main text-sm">{v.version}</h4>
                        {v.published && <span className="ca-badge-emerald font-mono text-[9px]">Published</span>}
                        {v.status === 'Current' && <span className="ca-badge-clay font-mono text-[9px]">Current</span>}
                      </div>
                      <p className="font-mono text-[11px] text-text-muted mt-0.5">{v.date} — {v.author}</p>
                    </div>
                  </div>
                  <div className="font-mono text-xs text-text-muted text-right">
                    <span className="font-semibold text-text-main">Changes</span> {v.changes}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Companion Sidebar */}
        <div className="space-y-6">
          {/* Ontology Health Panel */}
          <div className="ca-card bg-surface shadow-scholar p-6">
            <h3 className="font-serif text-base font-bold text-text-main pb-3 border-b border-stone/20">
              Ontology Health
            </h3>

            <div className="mt-6 flex flex-col items-center justify-center text-center">
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-8 border-emerald-900/20 bg-emerald-900/5 text-emerald-900 dark:text-gold">
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-serif text-3xl font-bold tracking-tight">94%</span>
                  <span className="font-mono text-[10px] uppercase font-semibold text-emerald-900 dark:text-gold mt-0.5">Excellent</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3 font-mono text-xs">
              {[
                { label: 'Completeness', value: '96%' },
                { label: 'Consistency', value: '93%' },
                { label: 'Validity', value: '95%' },
                { label: 'Integrity', value: '92%' },
                { label: 'Coverage', value: '93%' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-stone/10">
                  <span className="text-text-muted">{item.label}</span>
                  <span className="font-bold text-text-main">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-2">
              <button
                type="button"
                onClick={() => onOpenAction('View Full Health Report')}
                className="w-full ca-btn-outline py-2 text-xs font-mono justify-center"
              >
                <span>View full health report</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Recent Changes Feed */}
          <div className="ca-card bg-surface shadow-scholar p-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone/20">
              <h3 className="font-serif text-base font-bold text-text-main">Recent Changes</h3>
              <button
                type="button"
                onClick={() => onNavigateTab('Audit')}
                className="font-mono text-[11px] text-gold hover:underline"
              >
                View all
              </button>
            </div>

            <div className="mt-4 space-y-4 font-sans text-xs">
              {[
                { title: 'Added Entity Type', desc: 'Cultural Heritage Site', time: '2h ago', author: 'by Amara K.', icon: Plus, bg: 'bg-emerald-900/10 text-emerald-900 dark:text-gold' },
                { title: 'Added Relationship Type', desc: 'influenced', time: '5h ago', author: 'by Kwame D.', icon: Network, bg: 'bg-gold/15 text-gold' },
                { title: 'Updated Validation Rule', desc: 'Person must have at least one birth or creation...', time: '1d ago', author: 'by Zainab A.', icon: ShieldCheck, bg: 'bg-gold/15 text-gold' },
                { title: 'Updated Metadata Definition', desc: 'confidence_score', time: '1d ago', author: 'by Fatou S.', icon: Layers3, bg: 'bg-stone/15 text-text-muted' },
              ].map((ch, idx) => {
                const IconComp = ch.icon;
                return (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${ch.bg}`}>
                      <IconComp className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-text-main">{ch.title}</span>
                        <span className="font-mono text-[10px] text-text-muted">{ch.time}</span>
                      </div>
                      <p className="truncate text-text-muted mt-0.5">{ch.desc}</p>
                      <p className="font-mono text-[10px] text-text-muted mt-0.5">{ch.author}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Validation Status Panel */}
          <div className="ca-card bg-surface shadow-scholar p-6">
            <h3 className="font-serif text-base font-bold text-text-main pb-3 border-b border-stone/20">
              Validation Status
            </h3>

            <div className="mt-4 space-y-3 font-mono text-xs">
              {[
                { check: 'Schema Validation', passed: true },
                { check: 'Rule Consistency', passed: true },
                { check: 'Constraint Check', passed: true },
                { check: 'Inverse Check', passed: true },
                { check: 'Required Field Check', passed: true },
              ].map((v) => (
                <div key={v.check} className="flex items-center justify-between py-1.5 border-b border-stone/10">
                  <span className="text-text-muted">{v.check}</span>
                  <span className="flex items-center gap-1 text-emerald-900 dark:text-gold font-bold">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Passed
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-2">
              <p className="font-mono text-[10px] text-text-muted mb-3">
                Last validated: May 20, 2025, 10:30 AM
              </p>
              <button
                type="button"
                onClick={handleRunValidation}
                disabled={runningValidation}
                className="w-full ca-btn-primary py-2.5 text-xs font-mono justify-center"
              >
                {runningValidation ? (
                  <>Running validation checks...</>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5" />
                    <span>Run Validation</span>
                  </>
                )}
              </button>
              {validationSuccess && (
                <div role="alert" className="mt-3 ca-msg-success font-mono text-[11px] text-center">
                  Validation checks completed successfully! All constraints satisfied.
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="ca-card bg-surface shadow-scholar p-6">
            <h3 className="font-serif text-base font-bold text-text-main pb-3 border-b border-stone/20">
              Quick Actions
            </h3>

            <div className="mt-4 grid grid-cols-2 gap-3 font-mono text-xs">
              {[
                { label: 'Create Entity Type', icon: Layers3 },
                { label: 'Create Relationship Type', icon: Network },
                { label: 'Add Validation Rule', icon: ShieldCheck },
                { label: 'Add Constraint', icon: Lock },
                { label: 'Add Metadata Field', icon: Plus },
                { label: 'Import Ontology', icon: Play },
              ].map((act) => {
                const ActIcon = act.icon;
                return (
                  <button
                    key={act.label}
                    type="button"
                    onClick={() => onOpenAction(act.label)}
                    className="flex flex-col items-center justify-center p-3 rounded-xl border border-stone/20 bg-canvas/40 hover:border-gold hover:bg-gold/5 transition text-center group"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10 text-gold mb-2 group-hover:scale-110 transition">
                      <ActIcon className="h-4 w-4" />
                    </div>
                    <span className="font-semibold text-text-main text-[11px] leading-tight">{act.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OntologyOverview;
