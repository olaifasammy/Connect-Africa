import { useState, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Cpu,
} from 'lucide-react';
import { aiAdminApi } from '../../../services/api';

interface ProviderItem {
  id: string;
  name: string;
  model: string;
  status: 'ACTIVE' | 'INACTIVE';
  latency?: number;
}

export function AIAdmin() {
  const [providers, setProviders] = useState<ProviderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const fetchProviders = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await aiAdminApi.listProviders();
        if (!active) return;
        const mapped: ProviderItem[] = (data || []).map((p: any, index: number) => ({
          id: p.id || p._id || String(index),
          name: p.name || p.providerName || 'AI Provider',
          model: p.model || p.defaultModel || 'gpt-4o',
          status: p.status === 'ACTIVE' || p.active ? 'ACTIVE' : 'INACTIVE',
          latency: p.latencyMs || 45,
        }));
        setProviders(mapped);
      } catch (err: any) {
        if (!active) return;
        setError(err.message || 'Failed to fetch AI provider health from database.');
      } finally {
        if (active) setLoading(false);
      }
    };
    void fetchProviders();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-cloud sm:text-3xl">
              AI Intelligence & Providers
            </h1>
            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400">
              LLM Telemetry
            </span>
          </div>
          <p className="mt-1 text-sm text-cloud/55">
            Monitor AI provider connectivity, model status, and generation health across Connect-Africa.
          </p>
        </div>
      </div>

      {error && (
        <div role="alert" className="ca-msg-error p-4 text-xs">
          {error}
        </div>
      )}

      {/* Providers Table */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#10201A]/60 p-6 backdrop-blur-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 gap-3 text-xs text-mist">
            <Loader2 className="h-5 w-5 animate-spin text-gold" />
            Loading AI providers from database...
          </div>
        ) : providers.length === 0 ? (
          <div className="py-16 text-center text-xs text-mist">
            No AI providers registered in the database.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-cloud">
              <thead>
                <tr className="border-b border-white/[0.07] text-[10px] font-semibold uppercase tracking-[0.15em] text-mist/60">
                  <th className="pb-3.5 font-medium">Provider Name</th>
                  <th className="pb-3.5 font-medium">Model</th>
                  <th className="pb-3.5 font-medium">Status</th>
                  <th className="pb-3.5 font-medium text-right">Latency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {providers.map((prov) => (
                  <tr key={prov.id} className="group transition hover:bg-white/[0.02]">
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                          <Cpu className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-cloud group-hover:text-gold transition">
                            {prov.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4 font-mono text-mist text-[11px]">{prov.model}</td>
                    <td className="py-3.5 pr-4">
                      <span
                        className={[
                          'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-medium',
                          prov.status === 'ACTIVE'
                            ? 'bg-emerald/10 text-emerald border border-emerald/20'
                            : 'bg-terra/10 text-terra border border-terra/20',
                        ].join(' ')}
                      >
                        {prov.status === 'ACTIVE' ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                        {prov.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right font-mono text-mist/70 text-[11px]">
                      {prov.latency}ms
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AIAdmin;
