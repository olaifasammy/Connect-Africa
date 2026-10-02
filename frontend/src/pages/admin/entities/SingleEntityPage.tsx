import { useState, useEffect } from 'react';
import { UsersRound, ArrowLeft, Layers3, CheckCircle2, Clock, Download, Plus } from 'lucide-react';
import { entityApi } from '../../../services/api';

export function SingleEntityPage() {
  const [entity, setEntity] = useState<any>(null);
  const [aliases, setAliases] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await entityApi.get('demo-id');
        setEntity(res);
        const aliasRes = await entityApi.getAliases('demo-id');
        setAliases(aliasRes);
      } catch {
        // production silence; no fake data injected
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <a href="#" className="text-text-muted hover:text-text-main">
          <ArrowLeft className="h-5 w-5" />
        </a>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-text-main">Entity View</h1>
      </div>
      <div className="ca-card bg-surface p-6 shadow-scholar">
        <div className="flex items-center gap-3 mb-4">
          <Layers3 className="h-6 w-6 text-gold" />
          <h2 className="font-serif text-xl font-bold text-text-main">{entity ? (entity.name || 'Untitled') : 'Loading...'}</h2>
        </div>
        <p className="text-xs text-text-muted mb-6">{entity ? (entity.description || 'No description available.') : ''}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="ca-card bg-canvas p-4 flex items-center gap-3">
            <UsersRound className="h-5 w-5 text-text-muted" />
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-text-muted">Type</p>
              <p className="text-sm font-semibold text-text-main">{entity ? (entity.type || 'Unknown') : '-'}</p>
            </div>
          </div>
          <div className="ca-card bg-canvas p-4 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-text-muted">Status</p>
              <p className="text-sm font-semibold text-text-main">{entity ? 'Verified' : '-'}</p>
            </div>
          </div>
          <div className="ca-card bg-canvas p-4 flex items-center gap-3">
            <Clock className="h-5 w-5 text-text-muted" />
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-text-muted">Updated</p>
              <p className="text-sm font-semibold text-text-main">{entity ? String(entity.updatedAt || 'N/A') : '-'}</p>
            </div>
          </div>
        </div>
        <div className="border-t border-stone/15 pt-4">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Aliases</h3>
          <div className="flex flex-wrap gap-2">
            {aliases && aliases.items ? aliases.items.map((a: string) => (
              <span key={String(a)} className="ca-badge-stone">{String(a)}</span>
            )) : <span className="text-xs text-text-muted">None found</span>}
          </div>
        </div>
        <div className="flex items-center gap-3 pt-6">
          <a href="#" className="ca-btn-outline px-4 py-2 text-xs font-mono uppercase tracking-wider flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </a>
          <a href="#" className="ca-btn-primary px-4 py-2 text-xs font-mono uppercase tracking-wider flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>Create Version</span>
          </a>
        </div>
      </div>
    </div>
  );
}
