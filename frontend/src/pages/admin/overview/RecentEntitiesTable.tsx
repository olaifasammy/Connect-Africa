import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { entityApi } from '../../../services/api';

interface EntityRow {
  id: string;
  name: string;
  type: string;
  category: string;
  status: 'Verified' | 'Pending Review';
  quality: number;
  updatedBy: string;
  updatedAt: string;
}

export const RecentEntitiesTable: React.FC = () => {
  const [entities, setEntities] = useState<EntityRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchEntities = async () => {
      setLoading(true);
      try {
        const data = await entityApi.list(10);
        if (!active) return;
        const mapped: EntityRow[] = (data || []).map((e: any, index: number) => ({
          id: e.id || String(index),
          name: e.name || 'Untitled Entity',
          type: e.type || 'Entity',
          category: e.category || 'Knowledge',
          status: e.status === 'PUBLISHED' || e.status === 'Verified' ? 'Verified' : 'Pending Review',
          quality: e.quality || 95,
          updatedBy: e.updatedBy || 'System Admin',
          updatedAt: e.updatedAt ? new Date(e.updatedAt).toLocaleDateString() : 'Recent',
        }));
        setEntities(mapped);
      } catch (err) {
        console.error('Failed to fetch recent entities:', err);
      } finally {
        if (active) setLoading(false);
      }
    };
    void fetchEntities();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="ca-card bg-surface shadow-scholar p-6 font-sans">
      <div className="flex items-center justify-between border-b border-stone/15 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-base font-bold text-text-main">Recent Entities</h3>
            {loading && <Loader2 className="h-3.5 w-3.5 animate-spin text-gold" />}
          </div>
          <p className="font-sans text-xs text-text-muted mt-0.5">
            Latest verified knowledge graph nodes from database
          </p>
        </div>

        <Link
          to="/admin/entities"
          className="ca-btn-outline px-3.5 py-1.5 text-xs font-mono"
        >
          View All
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-4 overflow-x-auto">
        {loading && entities.length === 0 ? (
          <div className="py-12 text-center font-mono text-xs text-text-muted">
            Loading recent entities from database...
          </div>
        ) : entities.length === 0 ? (
          <div className="py-12 text-center font-mono text-xs text-text-muted">
            No entities found in the database.
          </div>
        ) : (
          <table className="w-full text-left text-xs text-text-main">
            <thead>
              <tr className="border-b border-stone/20 font-mono text-[10px] font-bold uppercase tracking-wider text-text-muted">
                <th className="pb-3">Entity</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Quality</th>
                <th className="pb-3">Updated By</th>
                <th className="pb-3 text-right">Updated At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone/15">
              {entities.map((ent) => (
                <tr key={ent.id} className="group transition hover:bg-stone/5">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/10 border border-gold/30 text-gold font-serif font-bold">
                        {ent.name[0]}
                      </div>
                      <div>
                        <p className="font-serif font-bold text-sm text-text-main group-hover:text-emerald-900 dark:group-hover:text-gold transition">
                          {ent.name}
                        </p>
                        <p className="font-mono text-[10px] text-text-muted">{ent.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4 font-mono text-text-muted">{ent.type}</td>
                  <td className="py-3 pr-4">
                    <span className={ent.status === 'Verified' ? 'ca-badge-emerald' : 'ca-badge-gold'}>
                      {ent.status === 'Verified' && <ShieldCheck className="h-3 w-3 mr-1" />}
                      {ent.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4 font-mono">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-stone/20">
                        <div
                          className="h-full rounded-full bg-emerald-900 dark:bg-gold"
                          style={{ width: `${ent.quality}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-text-main">
                        {ent.quality}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 font-mono text-text-muted">{ent.updatedBy}</td>
                  <td className="py-3 text-right font-mono text-text-muted">{ent.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RecentEntitiesTable;
