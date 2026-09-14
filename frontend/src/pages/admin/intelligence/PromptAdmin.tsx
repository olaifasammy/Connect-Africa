import { Code, Settings } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { ResourceTable } from '../components/ResourceTable';

interface PromptRow {
  id: string;
  name: string;
  version: number;
  tokensCount: number;
  description: string;
}

export function PromptAdmin() {
  const prompts: PromptRow[] = [
    { id: 'prompt-cfg-01', name: 'entity-research-v1', version: 3, tokensCount: 1400, description: 'Prepares detailed semantic entity research prompts for Google Gemini.' },
    { id: 'prompt-cfg-02', name: 'relationship-verify-v1', version: 2, tokensCount: 850, description: 'Prepares verification checks for proposed knowledge graph relationships.' },
    { id: 'prompt-cfg-03', name: 'article-continuation-v2', version: 5, tokensCount: 2100, description: 'Prepares 200-word continuations for article expansion.' },
  ];

  const columns = [
    {
      key: 'name',
      label: 'Prompt Template',
      render: (row: PromptRow) => (
        <span className="font-semibold text-cloud font-mono text-sm">{row.name}</span>
      ),
    },
    {
      key: 'version',
      label: 'Active Version',
      render: (row: PromptRow) => (
        <span className="text-gold font-mono font-bold">v{row.version}</span>
      ),
    },
    {
      key: 'tokens',
      label: 'Avg Token Length',
      render: (row: PromptRow) => (
        <span className="text-mist font-mono text-xs">{row.tokensCount} tokens</span>
      ),
    },
    {
      key: 'description',
      label: 'Description',
      render: (row: PromptRow) => (
        <span className="text-cloud/80 text-sm">{row.description}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="ca-eyebrow">Intelligence & AI</span>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-cloud sm:text-3xl">
          Prompt Management
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-cloud/45">
          Review, version-control, and inspect prompt templates dispatched to active LLMs.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <MetricCard
          label="Total Templates"
          value={prompts.length}
          description="Active prompt configurations"
          icon={<Code className="h-4 w-4" />}
          status="healthy"
        />
        <MetricCard
          label="Version Control"
          value="Git-Backed"
          description="State tracking methodology"
          icon={<Settings className="h-4 w-4" />}
        />
      </div>

      <ResourceTable
        columns={columns}
        rows={prompts}
        loading={false}
      />
    </div>
  );
}

export default PromptAdmin;
