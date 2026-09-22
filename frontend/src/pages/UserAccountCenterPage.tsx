import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bell,
  Bookmark,
  Check,
  ChevronRight,
  Clock3,
  Compass,
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
  type ReadingHistoryEntry,
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
      className="ca-card-hover group flex flex-col justify-between"
    >
      <div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-gold">
          {icon}
        </div>

        <p className="mt-4 ca-eyebrow">{eyebrow}</p>

        <div className="mt-1 flex items-center justify-between gap-4">
          <h2 className="font-serif text-lg font-bold text-text-main group-hover:text-emerald-900 dark:group-hover:text-gold transition">
            {title}
          </h2>

          {meta && (
            <span className="ca-badge-gold">
              {meta}
            </span>
          )}
        </div>

        <p className="mt-2 font-sans text-xs leading-relaxed text-text-muted">
          {description}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-1 font-mono text-xs font-semibold text-emerald-900 dark:text-gold group-hover:underline">
        Open Workspace
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

export const UserAccountCenterPage: React.FC = () => {
  const { user, isAdmin } = useAuth();

  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [readingHistory, setReadingHistory] = useState<ReadingHistoryEntry[]>([]);
  const [bookmarks, setBookmarks] = useState<ArticleSummary[]>([]);
  const [latestUpdates, setLatestUpdates] = useState<LatestUpdateItem[]>([]);
  const [historyPage, setHistoryPage] = useState(1);
  const [bookmarkPage, setBookmarkPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const pageSize = 6;

  useEffect(() => {
    let active = true;

    const loadAccountData = async () => {
      setLoading(true);

      const [
        notificationResult,
        profileResult,
        historyResult,
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

      if (historyResult.status === 'fulfilled' && Array.isArray(historyResult.value)) {
        setReadingHistory(historyResult.value);
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
    <div className="min-h-screen bg-scholar-canvas bg-canvas pb-24 pt-8 text-text-main font-sans transition-colors duration-300">
      <div className="ca-container">
        {/* Page Header */}
        <header className="mb-8 border-b border-stone/20 pb-6">
          <div className="flex items-center justify-between gap-6">
            <div>
              <p className="ca-eyebrow">Personal Dashboard</p>

              <h1 className="mt-1 font-serif text-3xl font-bold text-text-main sm:text-4xl">
                Your Knowledge Workspace
              </h1>

              <p className="mt-2 font-sans text-sm text-text-muted">
                Manage your profile, bookmarks, reading history, and administrative access.
              </p>
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <Link
                to="/account/notifications"
                title="Notifications"
                aria-label={
                  unreadCount > 0
                    ? `${unreadCount} unread notifications`
                    : 'Notifications'
                }
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-stone/20 bg-surface text-stone transition hover:border-gold hover:text-gold"
              >
                <Bell className="h-4 w-4 text-gold" />

                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-emerald-900 px-1 font-mono text-[9px] font-bold text-white">
                    {notificationLabel}
                  </span>
                )}
              </Link>

              <Link
                to="/account/settings"
                title="Settings"
                aria-label="Settings"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-stone/20 bg-surface text-stone transition hover:border-gold hover:text-text-main"
              >
                <Settings className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </header>
      </div>

      {/* Identity Banner */}
      <section className="relative w-full border-y border-stone/20 bg-surface/80 my-6 py-8">
        <div className="ca-container">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-start gap-5 sm:gap-6">
              <Link
                to="/profile"
                title="View profile"
                className="group relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gold/30 bg-gold/10 shadow-sm transition hover:border-gold"
              >
                {profile?.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={displayName}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <span className="font-serif text-2xl font-bold text-gold">
                    {initials}
                  </span>
                )}

                <span
                  className="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-900 text-white"
                  title="Active account"
                >
                  <Check className="h-2.5 w-2.5" />
                </span>
              </Link>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-text-muted">
                  <span className="ca-eyebrow">
                    Welcome back
                  </span>
                  <span>·</span>
                  <span className="truncate">{user?.email}</span>
                </div>

                <h2 className="mt-1 font-serif text-2xl font-bold text-text-main sm:text-3xl">
                  {displayName}
                </h2>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="ca-badge-emerald">
                    {roleLabel}
                  </span>

                  <span className="ca-badge-stone">
                    {loading ? 'Loading location…' : location}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/profile"
                className="ca-btn-outline text-xs"
              >
                <UserRound className="h-4 w-4 text-gold" />
                Edit Profile
              </Link>

              <Link
                to="/search"
                className="ca-btn-primary text-xs"
              >
                <Search className="h-4 w-4" />
                Explore Knowledge
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="ca-container">
        {/* Activity Workspace Cards */}
        <section className="mt-10">
          <div className="mb-6">
            <p className="ca-eyebrow">Activity & History</p>
            <h2 className="font-serif text-2xl font-bold text-text-main">
              Your Knowledge Activity
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <ActivityCard
              icon={<Clock3 className="h-5 w-5" />}
              eyebrow="Query Archive"
              title="Recent Searches"
              description="Revisit past search queries, filter states, and topic investigations."
              href="/account/searches"
            />
          </div>
        </section>

        {/* Latest Updates Table */}
        <section className="ca-card mt-10 p-0 shadow-scholar">
          <div className="flex flex-col gap-2 border-b border-stone/20 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="ca-eyebrow">Knowledge Index Updates</p>
              <h2 className="font-serif text-xl font-bold text-text-main">
                Latest Platform Additions
              </h2>
            </div>

            <span className="font-mono text-xs text-text-muted">
              Showing last {latestUpdates.length} indexed records
            </span>
          </div>

          {loading ? (
            <div className="p-8 text-center font-sans text-xs text-text-muted">
              Loading latest updates…
            </div>
          ) : latestUpdates.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <Compass className="mx-auto h-8 w-8 text-stone" />
              <h3 className="mt-2 font-serif text-base font-bold text-text-main">
                No updates indexed yet
              </h3>
            </div>
          ) : (
            <div className="divide-y divide-stone/15">
              {latestUpdates.map((item, index) => (
                <div
                  key={`${item.type}-${item.id}-${index}`}
                  className="flex flex-col gap-2 px-6 py-3.5 transition hover:bg-stone/5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={item.type === 'Article' ? 'ca-badge-gold' : 'ca-badge-emerald'}>
                        {item.type}
                      </span>
                      {item.category && (
                        <span className="font-mono text-[10px] text-text-muted">
                          {item.category}
                        </span>
                      )}
                    </div>
                    <Link
                      to={item.link}
                      className="mt-1 block truncate font-serif text-sm font-bold text-text-main hover:text-emerald-900 dark:hover:text-gold transition"
                    >
                      {item.title}
                    </Link>
                  </div>

                  <div className="flex shrink-0 items-center gap-3 font-mono text-xs text-text-muted">
                    <span>
                      {new Date(item.date).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <Link
                      to={item.link}
                      className="ca-btn-outline px-2.5 py-1 text-[11px]"
                    >
                      <span>View</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Bookmarks Section */}
        <section className="ca-card mt-10 p-0 shadow-scholar">
          <div className="flex flex-col gap-2 border-b border-stone/20 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="ca-eyebrow">Saved Knowledge</p>
              <h2 className="font-serif text-xl font-bold text-text-main">
                Bookmarks
              </h2>
            </div>

            <span className="font-mono text-xs text-text-muted">
              {bookmarks.length} {bookmarks.length === 1 ? 'item' : 'items'} saved
            </span>
          </div>

          {loading ? (
            <div className="p-8 text-center font-sans text-xs text-text-muted">
              Loading bookmarks…
            </div>
          ) : bookmarks.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <Bookmark className="mx-auto h-8 w-8 text-gold" />
              <h3 className="mt-2 font-serif text-base font-bold text-text-main">
                No Bookmarks Saved Yet
              </h3>
              <p className="mt-1 font-sans text-xs text-text-muted">
                Articles you bookmark while researching will appear here.
              </p>
            </div>
          ) : (
            <div>
              <div className="divide-y divide-stone/15">
                {bookmarks
                  .slice((bookmarkPage - 1) * pageSize, bookmarkPage * pageSize)
                  .map((article) => (
                    <article
                      key={article.id}
                      className="flex flex-col gap-2 px-6 py-3.5 transition hover:bg-stone/5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        {article.category && (
                          <span className="ca-badge-clay">
                            {article.category}
                          </span>
                        )}
                        <Link
                          to={`/articles/${encodeURIComponent(article.slug)}`}
                          className="mt-1 block truncate font-serif text-sm font-bold text-text-main hover:text-emerald-900 dark:hover:text-gold transition"
                        >
                          {article.title}
                        </Link>
                      </div>

                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            await articleActivityApi.removeBookmark(article.id);
                            setBookmarks((prev) => prev.filter((b) => b.id !== article.id));
                          } catch {
                            // ignore
                          }
                        }}
                        className="ca-btn-outline px-2.5 py-1 text-xs text-clay"
                      >
                        Remove
                      </button>
                    </article>
                  ))}
              </div>

              {bookmarks.length > pageSize && (
                <div className="flex items-center justify-between border-t border-stone/15 px-6 py-3 font-mono text-xs">
                  <button
                    type="button"
                    disabled={bookmarkPage === 1}
                    onClick={() => setBookmarkPage((p) => Math.max(1, p - 1))}
                    className="ca-btn-outline px-3 py-1"
                  >
                    Previous
                  </button>

                  <span className="text-text-muted">
                    Page {bookmarkPage} of {Math.ceil(bookmarks.length / pageSize)}
                  </span>

                  <button
                    type="button"
                    disabled={bookmarkPage * pageSize >= bookmarks.length}
                    onClick={() => setBookmarkPage((p) => p + 1)}
                    className="ca-btn-outline px-3 py-1"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Reading History Section */}
        <section className="ca-card mt-10 p-0 shadow-scholar">
          <div className="flex flex-col gap-2 border-b border-stone/20 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="ca-eyebrow">Trail</p>
              <h2 className="font-serif text-xl font-bold text-text-main">
                Reading History
              </h2>
            </div>

            <span className="font-mono text-xs text-text-muted">
              {readingHistory.length} {readingHistory.length === 1 ? 'item' : 'items'} explored
            </span>
          </div>

          {loading ? (
            <div className="p-8 text-center font-sans text-xs text-text-muted">
              Loading reading history…
            </div>
          ) : readingHistory.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <History className="mx-auto h-8 w-8 text-gold" />
              <h3 className="mt-2 font-serif text-base font-bold text-text-main">
                No Reading History Recorded
              </h3>
            </div>
          ) : (
            <div>
              <div className="divide-y divide-stone/15">
                {readingHistory
                  .slice((historyPage - 1) * pageSize, historyPage * pageSize)
                  .map((entry, index) => (
                    <article
                      key={`${entry.article.id}-${entry.timestamp}-${index}`}
                      className="flex flex-col gap-2 px-6 py-3.5 transition hover:bg-stone/5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        {entry.article.category && (
                          <span className="ca-badge-emerald">
                            {entry.article.category}
                          </span>
                        )}
                        <Link
                          to={`/articles/${encodeURIComponent(entry.article.slug)}`}
                          className="mt-1 block truncate font-serif text-sm font-bold text-text-main hover:text-emerald-900 dark:hover:text-gold transition"
                        >
                          {entry.article.title}
                        </Link>
                      </div>

                      <div className="shrink-0 font-mono text-xs text-text-muted">
                        {new Date(entry.timestamp).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                    </article>
                  ))}
              </div>

              {readingHistory.length > pageSize && (
                <div className="flex items-center justify-between border-t border-stone/15 px-6 py-3 font-mono text-xs">
                  <button
                    type="button"
                    disabled={historyPage === 1}
                    onClick={() => setHistoryPage((p) => Math.max(1, p - 1))}
                    className="ca-btn-outline px-3 py-1"
                  >
                    Previous
                  </button>

                  <span className="text-text-muted">
                    Page {historyPage} of {Math.ceil(readingHistory.length / pageSize)}
                  </span>

                  <button
                    type="button"
                    disabled={historyPage * pageSize >= readingHistory.length}
                    onClick={() => setHistoryPage((p) => p + 1)}
                    className="ca-btn-outline px-3 py-1"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Account Controls */}
        <section className="mt-10">
          <div className="mb-4">
            <p className="ca-eyebrow">Settings & Controls</p>
            <h2 className="font-serif text-2xl font-bold text-text-main">
              Account Management
            </h2>
          </div>

          <div className="grid border border-stone/20 bg-surface rounded-xl overflow-hidden sm:grid-cols-2 lg:grid-cols-3 font-sans">
            <Link
              to="/profile"
              className="flex items-center justify-between border-b border-stone/15 p-5 transition hover:bg-stone/5 sm:border-r"
            >
              <div className="flex items-center gap-3">
                <UserRound className="h-4 w-4 text-gold" />
                <div>
                  <p className="font-serif text-sm font-bold text-text-main">Profile</p>
                  <p className="font-mono text-xs text-text-muted">Identity and details</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-stone" />
            </Link>

            <Link
              to="/account/settings"
              className="flex items-center justify-between border-b border-stone/15 p-5 transition hover:bg-stone/5 lg:border-r"
            >
              <div className="flex items-center gap-3">
                <Settings className="h-4 w-4 text-gold" />
                <div>
                  <p className="font-serif text-sm font-bold text-text-main">Settings</p>
                  <p className="font-mono text-xs text-text-muted">Preferences & controls</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-stone" />
            </Link>

            <Link
              to="/account/security"
              className="flex items-center justify-between border-b border-stone/15 p-5 transition hover:bg-stone/5 sm:border-r lg:border-r-0"
            >
              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4 text-gold" />
                <div>
                  <p className="font-serif text-sm font-bold text-text-main">Security</p>
                  <p className="font-mono text-xs text-text-muted">Password & MFA</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-stone" />
            </Link>

            <Link
              to="/account/notifications"
              className="flex items-center justify-between p-5 transition hover:bg-stone/5 sm:border-r lg:border-b-0"
            >
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4 text-gold" />
                <div>
                  <p className="font-serif text-sm font-bold text-text-main">Notifications</p>
                  <p className="font-mono text-xs text-text-muted">
                    {unreadCount > 0 ? `${notificationLabel} unread` : 'No unread items'}
                  </p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-stone" />
            </Link>

            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center justify-between border-t border-stone/15 p-5 transition hover:bg-stone/5 sm:border-r"
              >
                <div className="flex items-center gap-3">
                  <Shield className="h-4 w-4 text-emerald-900 dark:text-gold" />
                  <div>
                    <p className="font-serif text-sm font-bold text-text-main">Administration</p>
                    <p className="font-mono text-xs text-text-muted">Platform admin panel</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-stone" />
              </Link>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserAccountCenterPage;
