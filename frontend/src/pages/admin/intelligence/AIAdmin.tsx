import { BrainCircuit, Cpu, Zap } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { ResourceTable } from '../components/ResourceTable';
import { AttentionPanel } from '../components/AttentionPanel';

interface GatewayRow {
  id: string;
  model: string;
  provider: string;
  requests: number;
  avgTokens: number;
}

export function AIAdmin() {
  const modelStats: GatewayRow[] = [
    { id: 'gate-model-01', model: 'gemini-1.5-pro', provider: 'Google', requests: 481, avgTokens: 1248 },
    { id: 'gate-model-02', model: 'gemini-1.5-flash', provider: 'Google', requests: 1240, avgTokens: 850 },
    { id: 'gate-model-03', model: 'gpt-4o', provider: 'OpenAI', requests: 124, avgTokens: 2012 },
  ];

  const columns = [
    {
      key: 'model',
      label: 'Model Identifier',
      render: (row: GatewayRow) => (
        <span className="font-semibold text-cloud font-mono text-sm">{row.model}</span>
      ),
    },
    {
      key: 'provider',
      label: 'Provider',
      render: (row: GatewayRow) => (
        <span className="text-cloud/50">{row.provider}</span>
      ),
    },
    {
      key: 'requests',
      label: 'Request Count',
      render: (row: GatewayRow) => (
        <span className="text-gold font-mono font-semibold">{row.requests}</span>
      ),
    },
    {
      key: 'avgTokens',
      label: 'Avg Tokens / Req',
      render: (row: GatewayRow) => (
        <span className="text-mist font-mono text-xs">{row.avgTokens}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="ca-eyebrow">Intelligence & AI</span>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-cloud sm:text-3xl">
          AI Gateway Dashboard
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-cloud/45">
          Review LLM execution rates, monitor gateway parameters, track total token spend, and optimize routing pathways.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <MetricCard
          label="Total LLM Requests"
          value="1,845"
          description="Requests routed through gateway today"
          icon={<BrainCircuit className="h-4 w-4" />}
          status="healthy"
        />
        <MetricCard
          label="Gateway Latency"
          value="142ms"
          description="Average response overhead on routes"
          icon={<Zap className="h-4 w-4" />}
        />
        <MetricCard
          label="Tokens Swapped"
          value="1.4M"
          description="Total token context routed today"
          icon={<Cpu className="h-4 w-4" />}
        />
      </div>

      <h3 className="text-base font-semibold text-cloud">Model Routing Statistics</h3>
      <ResourceTable
        columns={columns}
        rows={modelStats}
        loading={false}
      />

      <AttentionPanel
        title="Gateway Settings"
        items={[
          {
            id: 'router-rules',
            severity: 'info',
            title: 'Failover Routing Policies',
            description: 'The AI Gateway automatically shifts loads from OpenAI to Google Gemini if rate limits are hit or connection errors spike.',
          }
        ]}
      />
    </div>
  );
}

export default AIAdmin;
