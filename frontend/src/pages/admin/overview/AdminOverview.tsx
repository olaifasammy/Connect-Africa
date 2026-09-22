import { useState, useEffect } from 'react';
import {
  Calendar,
  CheckCircle2,
  ChevronDown,
  FileText,
  GitBranch,
  Globe,
  Layers3,
  Users,
  Loader2,
} from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { SystemHealthGauge } from './SystemHealthGauge';
import { RecentActivityPanel } from './RecentActivityPanel';
import { QuickActionsPanel } from './QuickActionsPanel';
import { RecentEntitiesTable } from './RecentEntitiesTable';
import { adminApi } from '../../../services/api';

const dateRanges = [
  { id: '7d', label: 'Last 7 Days' },
  { id: '30d', label: 'Last 30 Days' },
  { id: '90d', label: 'Last 90 Days' },
  { id: 'ytd', label: 'Year to Date' },
];

export function AdminOverview() {
  const [selectedRange, setSelectedRange] = useState(dateRanges[0]);
  const [rangeDropdownOpen, setRangeDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEntities: '0',
    totalRelationships: '0',
    totalArticles: '0',
    totalSources: '0',
    totalUsers: '0',
    totalOntologies: '0',
    systemHealth: '100%',
    pendingTasks: '0',
  });

  useEffect(() => {
    let active = true;
    const fetchStats = async () => {
      setLoading(true);
      try {
        const data = await adminApi.getStats();
        if (!active) return;
        setStats({
          totalEntities: Number(data.totalEntities || 0).toLocaleString(),
          totalRelationships: Number(data.totalRelationships || 0).toLocaleString(),
          totalArticles: Number(data.totalArticles || 0).toLocaleString(),
          totalSources: Number(data.totalSources || 0).toLocaleString(),
          totalUsers: Number(data.totalUsers || 0).toLocaleString(),
          totalOntologies: Number(data.totalOntologies || 0).toLocaleString(),
          systemHealth: `${data.systemHealth || 100}%`,
          pendingTasks: String(data.pendingTasks || 0),
        });
      } catch (err) {
        console.error('Failed to load telemetry stats:', err);
      } finally {
        if (active) setLoading(false);
      }
    };
    void fetchStats();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-8 font-sans">
      {/* Welcome & Date Range Selector */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-stone/20 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
              Studio Control Center
            </h1>
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin text-gold" />
            ) : (
              <span className="text-xl" role="img" aria-label="sparkles">
                ✨
              </span>
            )}
          </div>
          <p className="mt-1 font-sans text-xs text-text-muted">
            Real-time telemetry and governance overview for Connect Africa.
          </p>
        </div>

        {/* Date Filter Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setRangeDropdownOpen((prev) => !prev)}
            className="ca-btn-outline px-3.5 py-2 text-xs font-mono"
          >
            <Calendar className="h-3.5 w-3.5 text-gold" />
            <span>{selectedRange.label}</span>
            <ChevronDown className="h-3.5 w-3.5 text-stone" />
          </button>

          {rangeDropdownOpen && (
            <>
              <button
                type="button"
                aria-label="Close date range dropdown"
                className="fixed inset-0 z-20 cursor-default bg-transparent"
                onClick={() => setRangeDropdownOpen(false)}
              />
              <div className="absolute right-0 top-full z-30 mt-2 w-48 rounded-xl border border-stone/20 bg-surface p-1 shadow-scholar font-mono text-xs">
                {dateRanges.map((range) => (
                  <button
                    key={range.id}
                    type="button"
                    onClick={() => {
                      setSelectedRange(range);
                      setRangeDropdownOpen(false);
                    }}
                    className={[
                      'flex w-full items-center justify-between rounded-lg px-3 py-2 transition',
                      range.id === selectedRange.id
                        ? 'bg-gold/15 text-gold font-bold'
                        : 'text-text-muted hover:bg-stone/10 hover:text-text-main',
                    ].join(' ')}
                  >
                    <span>{range.label}</span>
                    {range.id === selectedRange.id && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-gold" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Top Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Total Entities"
          value={stats.totalEntities}
          trend="up"
          trendValue="Live Telemetry"
          icon={<Layers3 className="h-5 w-5" />}
          status="default"
        />

        <MetricCard
          label="Relationships"
          value={stats.totalRelationships}
          trend="up"
          trendValue="Live Telemetry"
          icon={<GitBranch className="h-5 w-5" />}
          status="default"
        />

        <MetricCard
          label="Articles"
          value={stats.totalArticles}
          trend="up"
          trendValue="Live Telemetry"
          icon={<FileText className="h-5 w-5" />}
          status="default"
        />

        <MetricCard
          label="Sources"
          value={stats.totalSources}
          trend="up"
          trendValue="Live Telemetry"
          icon={<Globe className="h-5 w-5" />}
          status="default"
        />

        <MetricCard
          label="Users"
          value={stats.totalUsers}
          trend="up"
          trendValue="Active Accounts"
          icon={<Users className="h-5 w-5" />}
          status="default"
        />

        <MetricCard
          label="Ontologies"
          value={stats.totalOntologies}
          trend="neutral"
          trendValue="Active Schema"
          icon={<Layers3 className="h-5 w-5" />}
          status="default"
        />

        <MetricCard
          label="System Health"
          value={stats.systemHealth}
          trend="up"
          trendValue="Operational"
          icon={<CheckCircle2 className="h-5 w-5" />}
          status="healthy"
        />

        <MetricCard
          label="Pending Tasks"
          value={stats.pendingTasks}
          trend="neutral"
          trendValue="Attention"
          icon={<FileText className="h-5 w-5" />}
          status="warning"
        />
      </div>

      {/* Main Two-Column Dashboard Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
        {/* Left Column: Recent Entities & Operations */}
        <div className="space-y-6">
          <RecentEntitiesTable />
        </div>

        {/* Right Column: Companion Sidebar */}
        <div className="space-y-6">
          <SystemHealthGauge />
          <RecentActivityPanel />
          <QuickActionsPanel />
        </div>
      </div>
    </div>
  );
}

export default AdminOverview;
