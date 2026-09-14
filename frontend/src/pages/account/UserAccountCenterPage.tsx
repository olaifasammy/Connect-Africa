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
import { useAuth } from '../../context/AuthContext';
import {
  notificationApi,
  profileApi,
  type UserProfileData,
} from '../../services/api';

interface ActivityCardProps {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  accent: 'emerald' | 'gold' | 'sand';
  meta?: string;
}

const accentStyles: Record<
  ActivityCardProps['accent'],
  {
    icon: string;
    border: string;
    hover: string;
  }
> = {
  emerald: {
    icon: 'border-emerald/20 bg-emerald/[0.06] text-emerald',
    border: 'border-white/[0.07]',
    hover: 'hover:border-emerald/25 hover:bg-emerald/[0.025]',
  },
  gold: {
    icon: 'border-gold/20 bg-gold/[0.06] text-gold',
    border: 'border-white/[0.07]',
    hover: 'hover:border-gold/25 hover:bg-gold/[0.025]',
  },
  sand: {
    icon: 'border-sand/20 bg-sand/[0.06] text-sand',
    border: 'border-white/[0.07]',
    hover: 'hover:border-sand/25 hover:bg-sand/[0.025]',
  },
};

const ActivityCard: React.FC<ActivityCardProps> = ({
  icon,
  eyebrow,
  title,
  description,
  href,
  accent,
  meta,
}) => {
  const styles = accentStyles[accent];

  return (
    <Link
      to={href}
      className={`group relative flex min-h-[190px] flex-col justify-between overflow-hidden rounded-2xl border bg-forest/35 p-6 transition-all duration-300 ${styles.border} ${styles.hover}`}
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/[0.02] blur-2xl transition duration-500 group-hover:bg-white/[0.04]" />

      <div className="relative">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl border ${styles.icon}`}
        >
          {icon}
        </div>

        <p className="mt-6 ca-eyebrow">{eyebrow}</p>

        <div className="mt-1 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold tracking-tight text-cloud">
            {title}
          </h2>

          {meta && (
            <span className="shrink-0 rounded-full border border-white/[0.07] bg-white/[0.025] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-mist">
              {meta}
            </span>
          )}
        </div>

        <p className="mt-2 max-w-md text-sm leading-6 text-mist">
          {description}
        </p>
      </div>

      <div className="relative mt-6 flex items-center gap-2 text-sm font-medium text-sage transition group-hover:text-cloud">
        Open
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

export const UserAccountCenterPage: React.FC = () => {
  const { user, isAdmin } = useAuth();

  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadAccountData = async () => {
      setLoading(true);

      const [notificationResult, profileResult] =
        await Promise.allSettled([
          notificationApi.getUnreadCount(),
          profileApi.getProfile(),
        ]);

      if (!active) return;

      if (notificationResult.status === 'fulfilled') {
        setUnreadCount(notificationResult.value);
      }

      if (
        profileResult.status === 'fulfilled' &&
        profileResult.value
      ) {
        setProfile(profileResult.value);
      }

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
    'Knowledge explorer';

  const initials =
    displayName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('') || 'CA';

  const location = profile?.country || 'Not set';

  const roleLabel = isAdmin ? 'Administrator' : 'Explorer';

  const notificationLabel =
    unreadCount > 99 ? '99+' : String(unreadCount);

  return (
    <div className="min-h-screen bg-ink pb-24 pt-8 text-cloud sm:pt-12">
      <div className="ca-container">
        {/* =========================================================
            PAGE HEADER
        ========================================================== */}
        <header className="mb-10">
          <div className="flex items-center justify-between gap-6">
            <div>
              <p className="ca-eyebrow">Account</p>

              <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-cloud sm:text-4xl">
                Your knowledge workspace
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-mist">
                Manage your identity, personal activity, and the knowledge
                you choose to keep within reach.
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
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-mist transition hover:border-gold/30 hover:bg-gold/[0.05] hover:text-gold"
              >
                <Bell className="h-4 w-4" />

                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex min-h-[17px] min-w-[17px] items-center justify-center rounded-full border-2 border-ink bg-emerald px-1 text-[9px] font-bold leading-none text-ink">
                    {notificationLabel}
                  </span>
                )}
              </Link>

              <Link
                to="/account/settings"
                title="Settings"
                aria-label="Settings"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-mist transition hover:border-emerald/30 hover:bg-emerald/[0.05] hover:text-emerald"
              >
                <Settings className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </header>

        {/* =========================================================
            IDENTITY
        ========================================================== */}
        <section className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-forest/55">
          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-emerald/[0.08] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 left-1/3 h-72 w-72 rounded-full bg-gold/[0.04] blur-3xl" />

          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 items-start gap-5 sm:gap-6">
                <Link
                  to="/profile"
                  title="View profile"
                  className="group relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/[0.10] bg-black/30 shadow-soft transition duration-300 hover:border-gold/40 sm:h-24 sm:w-24"
                >
                  {profile?.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={displayName}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <span className="text-xl font-semibold tracking-tight text-gold">
                      {initials}
                    </span>
                  )}

                  <span
                    className="absolute bottom-2 right-2 flex h-5 w-5 items-center justify-center rounded-full border-2 border-forest bg-emerald text-ink"
                    title="Active account"
                  >
                    <Check className="h-3 w-3" />
                  </span>
                </Link>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-xs font-medium uppercase tracking-[0.18em] text-sage">
                      Welcome back
                    </span>

                    <span className="text-mist/30">·</span>

                    <span className="truncate text-xs text-mist">
                      {user?.email}
                    </span>
                  </div>

                  <h2 className="mt-2 truncate text-2xl font-semibold tracking-[-0.025em] text-cloud sm:text-3xl">
                    {displayName}
                  </h2>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-emerald/20 bg-emerald/[0.06] px-3 py-1.5 text-xs font-medium text-sage">
                      {roleLabel}
                    </span>

                    <span className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-xs text-mist">
                      {loading ? 'Loading profile…' : location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Link
                  to="/profile"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.025] px-4 py-2.5 text-sm font-medium text-cloud transition hover:border-white/[0.16] hover:bg-white/[0.05]"
                >
                  <UserRound className="h-4 w-4 text-sage" />
                  Edit profile
                </Link>

                <Link
                  to="/search"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-sand"
                >
                  <Search className="h-4 w-4" />
                  Explore knowledge
                </Link>
              </div>
            </div>

            <div className="mt-8 border-t border-white/[0.06] pt-6">
              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-mist/55">
                    Role
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-cloud">
                    {roleLabel}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-mist/55">
                    Region
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-cloud">
                    {loading ? 'Loading…' : location}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-mist/55">
                    Notifications
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-cloud">
                    {unreadCount > 0
                      ? `${notificationLabel} unread`
                      : 'All caught up'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            KNOWLEDGE WORKSPACE
        ========================================================== */}
        <section className="mt-14">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="ca-eyebrow">Knowledge workspace</p>

              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-cloud">
                Your activity
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-mist">
                Return to knowledge you have saved, explored, or searched.
              </p>
            </div>

            <Link
              to="/search"
              className="hidden items-center gap-1.5 text-sm font-medium text-sage transition hover:text-cloud sm:flex"
            >
              Explore
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <ActivityCard
              icon={<Bookmark className="h-5 w-5" />}
              eyebrow="Saved knowledge"
              title="Bookmarks"
              description="Keep important entities, relationships, and knowledge within reach."
              href="/account/bookmarks"
              accent="gold"
            />

            <ActivityCard
              icon={<History className="h-5 w-5" />}
              eyebrow="Your trail"
              title="Reading history"
              description="Return to knowledge you have already explored across Connect-Africa."
              href="/account/history"
              accent="emerald"
            />

            <ActivityCard
              icon={<Clock3 className="h-5 w-5" />}
              eyebrow="Recent questions"
              title="Recent searches"
              description="Revisit the concepts and questions that shaped your discovery."
              href="/account/searches"
              accent="sand"
            />

            <ActivityCard
              icon={<Bell className="h-5 w-5" />}
              eyebrow="Account activity"
              title="Notifications"
              description="Review updates and system messages relevant to your account."
              href="/account/notifications"
              accent="emerald"
              meta={unreadCount > 0 ? `${notificationLabel} unread` : 'Clear'}
            />
          </div>
        </section>

        {/* =========================================================
            KNOWLEDGE TRAIL
        ========================================================== */}
        <section className="mt-10 overflow-hidden rounded-2xl border border-white/[0.07] bg-forest/35">
          <div className="flex flex-col gap-3 border-b border-white/[0.06] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div>
              <p className="ca-eyebrow">Knowledge trail</p>

              <h2 className="mt-1.5 text-lg font-semibold text-cloud">
                Your research space
              </h2>
            </div>

            <Link
              to="/search"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-sage transition hover:text-cloud"
            >
              Start exploring
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative px-6 py-12 sm:px-8 sm:py-16">
            <div className="mx-auto max-w-xl text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald/20 bg-emerald/[0.05]">
                <Compass className="h-6 w-6 text-sage" />
              </div>

              <h3 className="mt-5 text-lg font-semibold tracking-tight text-cloud">
                Build your knowledge trail
              </h3>

              <p className="mt-2 text-sm leading-6 text-mist">
                Search for an entity, follow a relationship, read an article,
                or discover a new part of Africa. Meaningful activity will
                appear here as you explore.
              </p>

              <Link
                to="/search"
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 text-sm font-medium text-cloud transition hover:border-emerald/30 hover:bg-emerald/[0.05]"
              >
                Explore Africa
                <ArrowRight className="h-4 w-4 text-sage" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================
            ACCOUNT CONTROLS
        ========================================================== */}
        <section className="mt-10">
          <div>
            <p className="ca-eyebrow">Account</p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-cloud">
              Manage your account
            </h2>
          </div>

          <div className="mt-6 grid overflow-hidden rounded-2xl border border-white/[0.07] bg-forest/30 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              to="/profile"
              className="group flex items-center justify-between border-b border-white/[0.06] p-5 transition hover:bg-white/[0.025] sm:border-r"
            >
              <div className="flex items-center gap-3">
                <UserRound className="h-4 w-4 text-sage" />
                <div>
                  <p className="text-sm font-medium text-cloud">
                    Profile
                  </p>
                  <p className="mt-0.5 text-xs text-mist">
                    Identity and personal details
                  </p>
                </div>
              </div>

              <ChevronRight className="h-4 w-4 text-mist/50 transition group-hover:translate-x-0.5 group-hover:text-cloud" />
            </Link>

            <Link
              to="/account/settings"
              className="group flex items-center justify-between border-b border-white/[0.06] p-5 transition hover:bg-white/[0.025] lg:border-r"
            >
              <div className="flex items-center gap-3">
                <Settings className="h-4 w-4 text-sage" />
                <div>
                  <p className="text-sm font-medium text-cloud">
                    Settings
                  </p>
                  <p className="mt-0.5 text-xs text-mist">
                    Preferences and account controls
                  </p>
                </div>
              </div>

              <ChevronRight className="h-4 w-4 text-mist/50 transition group-hover:translate-x-0.5 group-hover:text-cloud" />
            </Link>

            <Link
              to="/account/security"
              className="group flex items-center justify-between border-b border-white/[0.06] p-5 transition hover:bg-white/[0.025] sm:border-r lg:border-r-0"
            >
              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4 text-sage" />
                <div>
                  <p className="text-sm font-medium text-cloud">
                    Security
                  </p>
                  <p className="mt-0.5 text-xs text-mist">
                    Password, sessions, and MFA
                  </p>
                </div>
              </div>

              <ChevronRight className="h-4 w-4 text-mist/50 transition group-hover:translate-x-0.5 group-hover:text-cloud" />
            </Link>

            <Link
              to="/account/notifications"
              className="group flex items-center justify-between p-5 transition hover:bg-white/[0.025] sm:border-r lg:border-b-0"
            >
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4 text-gold" />
                <div>
                  <p className="text-sm font-medium text-cloud">
                    Notifications
                  </p>
                  <p className="mt-0.5 text-xs text-mist">
                    {unreadCount > 0
                      ? `${notificationLabel} unread`
                      : 'Nothing waiting'}
                  </p>
                </div>
              </div>

              <ChevronRight className="h-4 w-4 text-mist/50 transition group-hover:translate-x-0.5 group-hover:text-cloud" />
            </Link>

            {isAdmin && (
              <Link
                to="/admin"
                className="group flex items-center justify-between border-t border-white/[0.06] p-5 transition hover:bg-gold/[0.025] sm:border-r"
              >
                <div className="flex items-center gap-3">
                  <Shield className="h-4 w-4 text-gold" />
                  <div>
                    <p className="text-sm font-medium text-cloud">
                      Administration
                    </p>
                    <p className="mt-0.5 text-xs text-mist">
                      Knowledge platform administration
                    </p>
                  </div>
                </div>

                <ChevronRight className="h-4 w-4 text-mist/50 transition group-hover:translate-x-0.5 group-hover:text-cloud" />
              </Link>
            )}
          </div>
        </section>

        {/* =========================================================
            PRIVACY NOTE
        ========================================================== */}
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.015] px-5 py-4">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />

          <div>
            <p className="text-sm font-medium text-cloud">
              Your personal workspace
            </p>

            <p className="mt-1 text-xs leading-5 text-mist">
              Your account controls and personal activity are private to your
              account. Administrative capabilities remain restricted by role.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccountCenterPage;
