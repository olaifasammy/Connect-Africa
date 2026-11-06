import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bell,
  Bookmark,
  History,
  Search,
  Settings,
  Shield,
  UserRound,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  notificationApi,
  profileApi,
  articleActivityApi,
  articleApi,
  entityApi,
  type UserProfileData,
  type ArticleSummary,
} from '../services/api';

interface ActivityCardProps {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  meta?: string;
}

interface LatestUpdateItem {
  id: string;
  title: string;
  description?: string | null;
  type: 'Article' | 'Entity';
  category?: string;
  date: string;
  link: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  icon,
  eyebrow,
  title,
  description,
  href,
  meta,
}) => {
  return (
    <Link
      to={href}
      className="group flex flex-col justify-between border-b border-stone/10 pb-6 transition-colors hover:border-text-main"
    >
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center text-text-main">
            {icon}
          </div>
          <p className="ca-eyebrow !mb-0">{eyebrow}</p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <h2 className="font-serif text-2xl font-bold text-text-main">
            {title}
          </h2>

          {meta && (
            <span className="ca-badge-stone">
              {meta}
            </span>
          )}
        </div>

        <p className="mt-2 font-sans text-sm leading-relaxed text-text-muted">
          {description}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-widest text-text-main group-hover:gap-4 transition-all">
        Explore
        <ArrowRight className="h-3 w-3" />
      </div>
    </Link>
  );
};

export const UserAccountCenterPage: React.FC = () => {
  const { user, isAdmin } = useAuth();

  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [bookmarks, setBookmarks] = useState<ArticleSummary[]>([]);
  const [latestUpdates, setLatestUpdates] = useState<LatestUpdateItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadAccountData = async () => {
      setLoading(true);

      const [
        notificationResult,
        profileResult,
        ,
        bookmarkResult,
        latestArticlesResult,
        latestEntitiesResult,
      ] = await Promise.allSettled([
        notificationApi.getUnreadCount(),
        profileApi.getProfile(),
        articleActivityApi.getReadingHistory(),
        articleActivityApi.getBookmarks(),
        articleApi.getLatest(10),
        entityApi.list(10),
      ]);

      if (!active) return;

      if (notificationResult.status === 'fulfilled') {
        setUnreadCount(notificationResult.value);
      }

      if (profileResult.status === 'fulfilled' && profileResult.value) {
        setProfile(profileResult.value);
      }

      if (bookmarkResult.status === 'fulfilled' && Array.isArray(bookmarkResult.value)) {
        setBookmarks(bookmarkResult.value);
      }

      const artUpdates: LatestUpdateItem[] =
        latestArticlesResult.status === 'fulfilled' &&
        Array.isArray(latestArticlesResult.value)
          ? latestArticlesResult.value.map((a) => ({
              id: a.id,
              title: a.title,
              description: a.description,
              type: 'Article' as const,
              category: a.category || 'Research',
              date: a.updatedAt || a.createdAt || new Date().toISOString(),
              link: `/articles/${encodeURIComponent(a.slug)}`,
            }))
          : [];

      const entUpdates: LatestUpdateItem[] =
        latestEntitiesResult.status === 'fulfilled' &&
        Array.isArray(latestEntitiesResult.value)
          ? latestEntitiesResult.value.map((e) => ({
              id: e.id,
              title: e.name || 'Entity',
              description: e.description,
              type: 'Entity' as const,
              category: e.type || 'Entity',
              date: e.updatedAt || e.createdAt || new Date().toISOString(),
              link: `/search?q=${encodeURIComponent(e.name || '')}`,
            }))
          : [];

      const sampleFallback: LatestUpdateItem[] = [
        {
          id: 'ecowas-success',
          title: 'The impact of regional trade agreements in West Africa',
          description:
            'A review of regional stability, trade corridors, and economic integration across member states.',
          type: 'Article',
          category: 'Geopolitics',
          date: new Date().toISOString(),
          link: '/articles/continental-free-trade-area-afcfta-impact',
        },
      ];

      const combined = [...artUpdates, ...entUpdates, ...sampleFallback]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10);

      setLatestUpdates(combined);
      setLoading(false);
    };

    void loadAccountData();

    return () => {
      active = false;
    };
  }, []);

  const displayName =
    profile?.displayName ||
    [user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
    user?.email?.split('@')[0] ||
    'Connect Africa Scholar';

  const initials =
    displayName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part: string) => part[0]?.toUpperCase())
      .join('') || 'CA';

  const location = profile?.country || 'Not set';
  const roleLabel = isAdmin ? 'Administrator' : 'Scholar';
  const notificationLabel = unreadCount > 99 ? '99+' : String(unreadCount);

  return (
    <div className="min-h-screen bg-canvas pb-24 pt-8 text-text-main font-sans transition-colors duration-300">
      <div className="ca-container">
        {/* Page Header */}
        <header className="mb-10 border-b border-stone/10 pb-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="ca-eyebrow">Personal Dashboard</p>

              <h1 className="mt-2 font-serif text-4xl font-bold text-text-main sm:text-5xl lg:text-6xl">
                Workspace.
              </h1>

              <p className="mt-4 max-w-xl font-sans text-lg text-text-muted">
                Your personal library and research logs — a private archive of your journey through the platform.
              </p>
            </div>

            <div className="hidden items-center gap-4 sm:flex">
              <Link
                to="/account/notifications"
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-stone/10 text-text-muted transition hover:border-text-main hover:text-text-main"
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-text-main px-1 font-mono text-[9px] font-bold text-white">
                    {notificationLabel}
                  </span>
                )}
              </Link>

              <Link
                to="/account/settings"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone/10 text-text-muted transition hover:border-text-main hover:text-text-main"
              >
                <Settings className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </header>

        {/* Identity Banner */}
        <section className="mb-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-start gap-8">
              <Link
                to="/profile"
                className="group relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-stone/10 transition hover:border-text-main"
              >
                {profile?.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={displayName}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-stone/5 font-serif text-2xl font-bold text-text-muted">
                    {initials}
                  </div>
                )}
              </Link>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-text-muted">
                  <span>Scholar ID</span>
                  <span>·</span>
                  <span className="truncate">{user?.email}</span>
                </div>

                <h2 className="mt-2 font-serif text-3xl font-bold text-text-main sm:text-4xl">
                  {displayName}
                </h2>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-stone/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-text-muted">
                    {roleLabel}
                  </span>

                  <span className="rounded-full border border-stone/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-text-muted">
                    {loading ? '...' : location}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/profile"
                className="rounded-full border border-stone/10 px-6 py-2.5 text-sm font-medium transition hover:border-text-main"
              >
                Edit Profile
              </Link>

              <Link
                to="/search"
                className="rounded-full bg-text-main px-6 py-2.5 text-sm font-medium text-white transition hover:bg-stone/80"
              >
                Explore Knowledge
              </Link>
            </div>
          </div>
        </section>

        {/* Activity Workspace Cards */}
        <section className="mb-16">
          <div className="mb-8">
            <p className="ca-eyebrow">Activity Logs</p>
            <h2 className="font-serif text-3xl font-bold text-text-main">
              Discovery History.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <ActivityCard
              icon={<Search className="h-5 w-5" />}
              eyebrow="Query Archive"
              title="Recent Searches"
              description="Review your past research queries and topic investigations."
              href="/account/searches"
            />
            <ActivityCard
              icon={<History className="h-5 w-5" />}
              eyebrow="Chronology"
              title="Reading History"
              description="A temporal list of every article and entity you've explored."
              href="/account/history"
            />
            <ActivityCard
              icon={<Bookmark className="h-5 w-5" />}
              eyebrow="Library"
              title="Bookmarks"
              description="Your curated selection of significant articles and records."
              href="/account/bookmarks"
              meta={String(bookmarks.length)}
            />
          </div>
        </section>

        {/* Latest Updates Section */}
        <section className="mb-12">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="ca-eyebrow">Archival Feed</p>
              <h2 className="font-serif text-3xl font-bold text-text-main">
                Latest indexed records.
              </h2>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
              {latestUpdates.length} records found
            </span>
          </div>

          {loading ? (
            <div className="py-8 text-center text-sm text-text-muted">Loading indices...</div>
          ) : (
            <div className="divide-y divide-stone/10 border-t border-stone/10">
              {latestUpdates.map((item, idx) => (
                <div
                  key={`${item.type}-${item.id}-${idx}`}
                  className="group flex flex-col justify-between py-3 transition-colors sm:flex-row sm:items-center"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                        {item.type}
                      </span>
                      {item.category && (
                        <span className="h-1 w-1 rounded-full bg-stone/20" />
                      )}
                      {item.category && (
                        <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                          {item.category}
                        </span>
                      )}
                    </div>
                    <Link
                      to={item.link}
                      className="mt-2 block font-serif text-xl font-bold text-text-main transition hover:text-text-muted"
                    >
                      {item.title}
                    </Link>
                  </div>

                  <div className="mt-4 flex items-center gap-6 sm:mt-0">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                      {new Date(item.date).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <Link
                      to={item.link}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-stone/10 text-text-muted transition hover:border-text-main hover:text-text-main"
                    >
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Account Controls Section */}
        <section className="mb-12">
          <div className="mb-6">
            <p className="ca-eyebrow">Preferences</p>
            <h2 className="font-serif text-3xl font-bold text-text-main">
              Account Management.
            </h2>
          </div>

          <div className="grid gap-x-6 gap-y-6 border-t border-stone/10 pt-6 sm:grid-cols-2 lg:grid-cols-4">
            <Link to="/profile" className="group">
              <div className="flex items-center gap-3">
                <UserRound className="h-4 w-4" />
                <h3 className="font-serif text-lg font-bold text-text-main group-hover:text-text-muted transition">Profile</h3>
              </div>
              <p className="mt-2 font-sans text-xs text-text-muted leading-relaxed">Identity, bio, and expertise records.</p>
            </Link>

            <Link to="/account/settings" className="group">
              <div className="flex items-center gap-3">
                <Settings className="h-4 w-4" />
                <h3 className="font-serif text-lg font-bold text-text-main group-hover:text-text-muted transition">Settings</h3>
              </div>
              <p className="mt-2 font-sans text-xs text-text-muted leading-relaxed">Platform preferences and UI controls.</p>
            </Link>

            <Link to="/account/security" className="group">
              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4" />
                <h3 className="font-serif text-lg font-bold text-text-main group-hover:text-text-muted transition">Security</h3>
              </div>
              <p className="mt-2 font-sans text-xs text-text-muted leading-relaxed">Password and authentication layer.</p>
            </Link>

            <Link to="/account/notifications" className="group">
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4" />
                <h3 className="font-serif text-lg font-bold text-text-main group-hover:text-text-muted transition">Alerts</h3>
              </div>
              <p className="mt-2 font-sans text-xs text-text-muted leading-relaxed">Archive updates and system notices.</p>
            </Link>

            {isAdmin && (
              <Link to="/admin" className="group pt-6 border-t border-stone/10 lg:col-span-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-4 w-4" />
                  <h3 className="font-serif text-lg font-bold text-text-main group-hover:text-text-muted transition">Administration</h3>
                </div>
                <p className="mt-2 font-sans text-xs text-text-muted leading-relaxed">Full access to platform administration and ontological management.</p>
              </Link>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserAccountCenterPage;
