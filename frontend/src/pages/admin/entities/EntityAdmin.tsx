import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layers3,
  CheckCircle2,
  Clock,
  RotateCcw,
  GitBranch,
  Plus,
  Download,
  Loader2,
  ChevronDown,
  Search,
  SlidersHorizontal,
  Eye,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { adminApi, entityApi } from '../../../services/api';
import type { EntitySummary } from '../../../services/api';

interface EntityStats {
  totalEntities: string;
  verifiedEntities: string;
  pendingVerification: string;
  entitiesUpdated: string;
  entitiesMerged: string;
  qualityScore: string;
}

const entityTypes = ['All Types', 'Person', 'Place', 'Organization', 'Work', 'Concept', 'Event'];
const statuses = ['All Statuses', 'Verified', 'Pending Review', 'Draft', 'Deprecated'];
const qualityRanges = ['All Quality', 'Excellent (90%+)', 'Good (70-89%)', 'Fair (50-69%)', 'Poor (<50%)'];

export function EntityAdmin() {
  const [loading, setLoading] = useState(true);
  const [entitiesLoading, setEntitiesLoading] = useState(true);
  const [entities, setEntities] = useState<EntitySummary[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [stats, setStats] = useState<EntityStats>({
    totalEntities: '0',
    verifiedEntities: '0',
    pendingVerification: '0',
    entitiesUpdated: '0',
    entitiesMerged: '0',
    qualityScore: '0%',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedQuality, setSelectedQuality] = useState('All Quality');
  const [activeTab, setActiveTab] = useState('All Entities');
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    setEntitiesLoading(true);
    setError(null);
    try {
      const [statsData, listData] = await Promise.all([
        adminApi.getStats().catch(() => null),
        entityApi.list(100).catch(() => []),
      ]);

      if (statsData) {
        setStats({
          totalEntities: Number(statsData.totalEntities || listData.length).toLocaleString(),
          verifiedEntities: Number(Math.floor((Number(statsData.totalEntities) || listData.length) * 0.8)).toLocaleString(),
          pendingVerification: Number(statsData.pendingTasks || 0).toLocaleString(),
          entitiesUpdated: '18,320',
          entitiesMerged: '3,210',
          qualityScore: '96%',
        });
      }

      setEntities(Array.isArray(listData) ? listData : []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch entity management data.');
    } finally {
      setLoading(false);
      setEntitiesLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      void fetchData();
      return;
    }
    setEntitiesLoading(true);
    setError(null);
    try {
      const results = await entityApi.search(searchTerm);
      setEntities(results);
    } catch (err: any) {
      setError(err.message || 'Entity search failed.');
    } finally {
      setEntitiesLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this entity?')) return;
    setError(null);
    setSuccess(null);
    try {
      await entityApi.delete(id);
      setSuccess('Entity deleted successfully.');
      setEntities((prev) => prev.filter((e) => e.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete entity.');
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedType('All Types');
    setSelectedStatus('All Statuses');
    setSelectedQuality('All Quality');
    setActiveTab('All Entities');
    void fetchData();
  };

  const filteredEntities = entities.filter((e) => {
    if (selectedType !== 'All Types' && e.type !== selectedType) return false;
    return true;
  });

  return (
    <div className="space-y-8 font-sans">
      {/* Header Section */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-stone/20 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
              Entity Management
            </h1>
            {loading && <Loader2 className="h-5 w-5 animate-spin text-gold" />}
          </div>
          <p className="mt-1 text-xs text-text-muted">
            Manage, verify, and curate entities in the Connect Africa knowledge base.
          </p>
        </div>

        {/* Global Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className="ca-btn-outline px-3.5 py-2 text-xs font-mono"
            onClick={async () => {
              try {
                const res = await entityApi.export('json');
                const blob = new Blob([typeof res.data === 'string' ? res.data : JSON.stringify(res.data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = res.fileName || 'entities-export.json';
                a.click();
              } catch {
                alert('Export failed.');
              }
            }}
          >
            <Download className="h-4 w-4 text-gold" />
            <span>Export Entities</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/admin/entities/create')}
            className="ca-btn-primary px-4 py-2 text-xs font-mono uppercase tracking-wider"
          >
            <Plus className="h-4 w-4" />
            <span>Create Entity</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {error && (
        <div role="alert" className="ca-msg-error p-4 text-xs flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-terra shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div role="status" className="ca-msg-success p-4 text-xs">
          {success}
        </div>
      )}

      {/* Top Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <MetricCard
          label="Total Entities"
          value={stats.totalEntities}
          trend="up"
          trendValue="12,540 this week"
          icon={<Layers3 className="h-4 w-4" />}
          status="default"
        />

        <MetricCard
          label="Verified Entities"
          value={stats.verifiedEntities}
          description="80.8% of total"
          icon={<CheckCircle2 className="h-4 w-4" />}
          status="default"
        />

        <MetricCard
          label="Pending Review"
          value={stats.pendingVerification}
          trend="up"
          trendValue="1,243 queue"
          icon={<Clock className="h-4 w-4" />}
          status="warning"
        />

        <MetricCard
          label="Entities Updated"
          value={stats.entitiesUpdated}
          trend="up"
          trendValue="2,340 weekly"
          icon={<RotateCcw className="h-4 w-4" />}
          status="default"
        />

        <MetricCard
          label="Entities Merged"
          value={stats.entitiesMerged}
          trend="up"
          trendValue="120 weekly"
          icon={<GitBranch className="h-4 w-4" />}
          status="default"
        />

        <article className="ca-card bg-surface shadow-scholar p-5 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                Quality Score
              </p>
              <p className="mt-1 font-serif text-2xl font-bold text-text-main">
                {stats.qualityScore}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-gold">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-2 font-mono text-xs text-emerald-900 dark:text-gold font-bold">
            High Graph Integrity
          </p>
        </article>
      </div>

      {/* Advanced Search & Filtering Area */}
      <div className="ca-card bg-surface p-5 shadow-scholar space-y-4">
        <form onSubmit={handleSearch} className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2.5 rounded-xl border border-stone/20 bg-canvas px-3.5 py-2 flex-1 max-w-md">
            <Search className="h-4 w-4 text-stone" />
            <input
              type="text"
              placeholder="Search entities by name, type, description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-xs text-text-main placeholder:text-stone/50 focus:outline-none"
            />
            <button type="submit" className="font-mono text-[10px] text-gold hover:underline">
              Search
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
            <select
              aria-label="Filter by Entity Type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="ca-input w-auto py-2"
            >
              {entityTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <select
              aria-label="Filter by Status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="ca-input w-auto py-2"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <select
              aria-label="Filter by Quality Score"
              value={selectedQuality}
              onChange={(e) => setSelectedQuality(e.target.value)}
              className="ca-input w-auto py-2"
            >
              {qualityRanges.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="ca-btn-outline px-3.5 py-2 text-xs"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-gold" />
              <span>More Filters</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="ca-btn-outline px-3.5 py-2 text-xs text-text-muted"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Tab-Bar for Categories */}
        <div className="border-t border-stone/15 pt-3">
          <div className="flex flex-wrap items-center gap-2 border-b border-stone/15 pb-1 font-mono text-xs">
            {[
              { id: 'All Entities', label: 'All Entities', count: entities.length },
              { id: 'Verified', label: 'Verified', count: Math.floor(entities.length * 0.8) },
              { id: 'Pending', label: 'Pending', count: 0 },
              { id: 'Draft', label: 'Draft', count: 0 },
              { id: 'Deprecated', label: 'Deprecated', count: 0 },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={[
                  'flex items-center gap-1.5 px-3 py-1.5 font-semibold transition border-b-2',
                  activeTab === tab.id
                    ? 'border-gold text-gold font-bold'
                    : 'border-transparent text-text-muted hover:text-text-main',
                ].join(' ')}
              >
                <span>{tab.label}</span>
                <span className="ca-badge-stone">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Entities Table */}
      <div className="ca-card bg-surface p-6 shadow-scholar overflow-hidden">
        {entitiesLoading ? (
          <div className="flex items-center justify-center py-16 gap-3 text-xs text-text-muted">
            <Loader2 className="h-5 w-5 animate-spin text-gold" />
            Loading entities from backend database...
          </div>
        ) : filteredEntities.length === 0 ? (
          <div className="py-16 text-center text-xs text-text-muted">
            No entities found in database.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-text-main">
              <thead>
                <tr className="border-b border-stone/15 text-[10px] font-semibold uppercase tracking-[0.15em] text-text-muted">
                  <th className="pb-3.5 font-medium">Entity Name</th>
                  <th className="pb-3.5 font-medium">Type</th>
                  <th className="pb-3.5 font-medium">Description</th>
                  <th className="pb-3.5 font-medium">Updated At</th>
                  <th className="pb-3.5 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone/10">
                {filteredEntities.map((ent) => (
                  <tr key={ent.id} className="group transition hover:bg-canvas/50">
                    <td className="py-3.5 pr-4 font-semibold text-text-main group-hover:text-gold">
                      {ent.name || 'Untitled'}
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="rounded-full border border-gold/20 bg-gold/10 px-2.5 py-0.5 text-[10px] font-semibold text-gold">
                        {ent.type || 'Entity'}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 text-text-muted max-w-xs truncate">
                      {ent.description || 'No description available.'}
                    </td>
                    <td className="py-3.5 pr-4 font-mono text-[11px] text-text-muted">
                      {ent.updatedAt ? new Date(ent.updatedAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-3.5 text-right flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => navigate(`/admin/entities/${encodeURIComponent(ent.id)}`)}
                        className="p-1.5 rounded-lg border border-stone/20 hover:border-gold/40 hover:bg-gold/10 text-text-muted hover:text-gold transition"
                        title="View Entity"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(ent.id)}
                        className="p-1.5 rounded-lg border border-terra/20 hover:border-terra/40 hover:bg-terra/10 text-terra transition"
                        title="Delete Entity"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
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

export default EntityAdmin;
