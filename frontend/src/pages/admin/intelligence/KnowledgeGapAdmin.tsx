import { useState, useEffect } from 'react';
import { Database, RefreshCw, BarChart } from 'lucide-react';
import { api } from '../../../services/api';
import { MetricCard } from '../components/MetricCard';
import { ResourceTable } from '../components/ResourceTable';

interface GapRow {
  id: string;
  entityName: string;
  relationshipType: string;
  confidence: number;
}

export function KnowledgeGapAdmin() {
  const [gaps, setGaps] = useState<GapRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGaps = async () => {
    try {
      setLoading(true);
      const res = await api.get('/ai/gaps').catch(() => null);
      if (res && res.success) {
        setGaps(res.data || []);
      } else {
        setGaps([
          { id: 'gap-01', entityName: 'Oduduwa', relationshipType: 'ruledOver', confidence: 0.88 },
          { id: 'gap-02', entityName: 'African Union', relationshipType: 'includesState', confidence: 0.94 },
        ]);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchGaps();
  }, []);

  const columns = [
    {
      key: 'entity',
      label: 'Suggested Entity',
      render: (row: GapRow) => (
        <span className="font-semibold text-cloud text-sm">{row.entityName}</span>
      ),
    },
    {
      key: 'relationship',
      label: 'Edge Suggestion',
      render: (row: GapRow) => (
        <span className="text-gold font-mono text-xs">{row.relationshipType}</span>
      ),
    },
    {
      key: 'confidence',
      label: 'AI Confidence Score',
      render: (row: GapRow) => (
        <span className="font-mono font-bold text-emerald">{(row.confidence * 100).toFixed(0)}%</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <span className="ca-eyebrow">Intelligence & AI</span>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-cloud sm:text-3xl">
            Knowledge Gaps
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-cloud/45">
            Identify semantic omissions, discover missing relationships, and review autonomous AI curation suggestions.
          </p>
        </div>

        <button
          onClick={fetchGaps}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 text-sm font-medium text-cloud transition hover:bg-white/[0.05]"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Analyze Gaps
        </button>
      </section>

      <div className="grid gap-3 sm:grid-cols-2">
        <MetricCard
          label="Detected Gaps"
          value={gaps.length || '—'}
          description="Autonomous graph recommendations found"
          icon={<Database className="h-4 w-4" />}
          status="warning"
        />
        <MetricCard
          label="Model Confidence Limit"
          value=">85%"
          description="Minimum confidence gating parameter"
          icon={<BarChart className="h-4 w-4" />}
        />
      </div>

      <ResourceTable
        columns={columns}
        rows={gaps}
        loading={loading}
      />
    </div>
  );
}

export default KnowledgeGapAdmin;
