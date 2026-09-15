import { useState, useEffect } from 'react';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Database,
  FileText,
  GitBranch,
  Globe,
  Layers3,
  Shield,
  Users,
} from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { KnowledgeGraphOverview } from './KnowledgeGraphOverview';
import { KnowledgeGrowthChart } from './KnowledgeGrowthChart';
import { SystemHealthGauge } from './SystemHealthGauge';
import { RecentActivityPanel } from './RecentActivityPanel';
import { QuickActionsPanel } from './QuickActionsPanel';
import { RecentEntitiesTable } from './RecentEntitiesTable';
import { adminApi } from '../../../services/api';

const dateRanges = [
  { id: '7d', label: 'May 20 – May 27, 2025' },
  { id: '30d', label: 'Last 30 days' },
  { id: '90d', label: 'Last 90 days' },
  { id: 'ytd', label: 'Year to date' },
];

export function AdminOverview() {
  const [selectedRange, setSelectedRange] = useState(dateRanges[0]);
  const [rangeDropdownOpen, setRangeDropdownOpen] = useState(false);
  const [stats, setStats] = useState({
    totalEntities: '0',
    totalRelationships: '0',
    totalArticles: '0',
    totalSources: '0',
    totalUsers: '0',
    totalOntologies: '0',
    systemHealth: '100%',
    pendingTasks: '0',
    entities: [] as any[],
    auditLogs: [] as any[],
  });

  useEffect(() => {
    let active = true;
    const fetchStats = async () => {
      try {
        const data = await adminApi.getStats();
        if (!active) return;
        setStats({
          totalEntities: data.totalEntities.toLocaleString(),
          totalRelationships: data.totalRelationships.toLocaleString(),
          totalArticles: data.totalArticles.toLocaleString(),
          totalSources: data.totalSources.toLocaleString(),
          totalUsers: data.totalUsers.toLocaleString(),
          totalOntologies: data.totalOntologies.toLocaleString(),
          systemHealth: `${data.systemHealth}%`,
          pendingTasks: String(data.pendingTasks),
          entities: data.entities || [],
          auditLogs: data.auditLogs || [],
        });
      } catch {
        // fallback
      }
    };
    void fetchStats();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome & Date Range Selector */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-cloud sm:text-3xl">
              Welcome back, Samuel
            </h1>
            <span className="text-2xl" role="img" aria-label="waving hand">
              👋
            </span>
          </div>
          <p className="mt-1 text-sm text-cloud/55">
            Here's what's happening with your knowledge base today.
          </p>
        </div>

        {/* Date Filter Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setRangeDropdownOpen((prev) => !prev)}
            className="inline-flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-forest/80 px-4 py-2 text-xs font-medium text-cloud/80 backdrop-blur transition hover:border-white/20 hover:bg-forest"
          >
            <Calendar className="h-3.5 w-3.5 text-sage" />
            <span>{selectedRange.label}</span>
            <ChevronDown className="h-3.5 w-3.5 text-cloud/40 transition duration-200" />
          </button>

          {rangeDropdownOpen && (
            <>
              <button
                type="button"
                aria-label="Close date range dropdown"
                className="fixed inset-0 z-20 cursor-default bg-transparent"
                onClick={() => setRangeDropdownOpen(false)}
              />
              <div className="absolute right-0 top-full z-30 mt-2 w-52 rounded-xl border border-white/[0.08] bg-ink/95 p-1.5 shadow-2xl backdrop-blur-xl">
                {dateRanges.map((range) => (
                  <button
                    key={range.id}
                    type="button"
                    onClick={() => {
                      setSelectedRange(range);
                      setRangeDropdownOpen(false);
                    }}
                    className={[
                      'flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs transition',
                      range.id === selectedRange.id
                        ? 'bg-emerald/15 font-semibold text-sage'
                        : 'text-cloud/70 hover:bg-white/[0.05] hover:text-cloud',
                    ].join(' ')}
                  >
                    <span>{range.label}</span>
                    {range.id === selectedRange.id && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Two-Column Dashboard Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_340px]">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Top 8 Metric Cards Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              label="Total Entities"
              value={stats.totalEntities}
              trend="up"
              trendValue="Live sync"
              icon={<Layers3 className="h-5 w-5" />}
              iconBgColor="bg-blue-500/10"
              iconColor="text-blue-400"
              status="default"
            />

            <MetricCard
              label="Relationships"
              value={stats.totalRelationships}
              trend="up"
              trendValue="Live sync"
              icon={<GitBranch className="h-5 w-5" />}
              iconBgColor="bg-purple-500/10"
              iconColor="text-purple-400"
              status="default"
            />

            <MetricCard
              label="Articles"
              value={stats.totalArticles}
              trend="up"
              trendValue="Live sync"
              icon={<FileText className="h-5 w-5" />}
              iconBgColor="bg-emerald/10"
              iconColor="text-emerald"
              status="default"
            />

            <MetricCard
              label="Sources"
              value={stats.totalSources}
              trend="up"
              trendValue="Live sync"
              icon={<Globe className="h-5 w-5" />}
              iconBgColor="bg-amber-500/10"
              iconColor="text-amber-400"
              status="default"
            />

            <MetricCard
              label="Users"
              value={stats.totalUsers}
              trend="up"
              trendValue="Active"
              icon={<Users className="h-5 w-5" />}
              iconBgColor="bg-cyan-500/10"
              iconColor="text-cyan-400"
              status="default"
            />

            <MetricCard
              label="Ontology"
              value={stats.totalOntologies}
              trend="up"
              trendValue="Schema active"
              icon={<Database className="h-5 w-5" />}
              iconBgColor="bg-indigo-500/10"
              iconColor="text-indigo-400"
              status="default"
            />

            <MetricCard
              label="System Health"
              value={stats.systemHealth}
              description="All systems operational"
              icon={<Shield className="h-5 w-5" />}
              iconBgColor="bg-emerald/10"
              iconColor="text-emerald"
              status="healthy"
            />

            <MetricCard
              label="Pending Tasks"
              value={stats.pendingTasks}
              description="Requires attention"
              icon={<AlertCircle className="h-5 w-5" />}
              iconBgColor="bg-gold/10"
              iconColor="text-gold"
              status="warning"
            />
          </div>

          {/* Middle Charts */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <KnowledgeGraphOverview />
            <KnowledgeGrowthChart />
          </div>

          {/* Bottom Table: Recent Entities */}
          <RecentEntitiesTable entities={stats.entities} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <SystemHealthGauge health={stats.systemHealth} />
          <RecentActivityPanel auditLogs={stats.auditLogs} />
          <QuickActionsPanel />
        </div>
      </div>
    </div>
  );
}

export default AdminOverview;
