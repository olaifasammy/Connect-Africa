import {
  Archive,
  GitMerge,
  Plus,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';

const operations = [
  {
    label: 'Create entity',
    description: 'Add a new first-class knowledge entity.',
    icon: Plus,
  },
  {
    label: 'Merge entities',
    description: 'Consolidate duplicate or overlapping entities.',
    icon: GitMerge,
  },
  {
    label: 'Review archived',
    description: 'Inspect entities removed from active knowledge.',
    icon: Archive,
  },
  {
    label: 'Restore entity',
    description: 'Return an archived entity to active governance.',
    icon: RotateCcw,
  },
  {
    label: 'Governance review',
    description: 'Review entity changes and administrative state.',
    icon: ShieldCheck,
  },
];

export function EntityOperations() {
  return (
    <section className="ca-surface rounded-2xl p-5 sm:p-6">
      <div>
        <span className="ca-eyebrow">Operations</span>
        <h2 className="mt-2 text-lg font-semibold text-cloud">
          Entity governance
        </h2>
        <p className="mt-1 text-sm text-cloud/45">
          Administrative actions for the entity lifecycle.
        </p>
      </div>

      <div className="mt-5 space-y-2">
        {operations.map((operation) => {
          const Icon = operation.icon;

          return (
            <button
              key={operation.label}
              type="button"
              disabled
              className="group flex w-full items-center gap-3 rounded-xl border border-white/[0.06] bg-black/10 p-3 text-left opacity-70"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.025] text-sage">
                <Icon className="h-4 w-4" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-cloud">
                  {operation.label}
                </span>
                <span className="mt-0.5 block text-xs text-cloud/35">
                  {operation.description}
                </span>
              </span>

              <span className="rounded-full border border-white/[0.06] px-2 py-1 text-[9px] font-medium uppercase tracking-[0.12em] text-cloud/25">
                Pending
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default EntityOperations;
