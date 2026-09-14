import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  Bell,
  Check,
  CheckCheck,
  ExternalLink,
  Loader2,
  Trash2,
} from 'lucide-react';
import {
  notificationApi,
  type Notification,
} from '../../services/api';

const formatNotificationDate = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const now = Date.now();
  const diff = now - date.getTime();

  if (diff < 60_000) {
    return 'Just now';
  }

  if (diff < 3_600_000) {
    const minutes = Math.floor(diff / 60_000);
    return `${minutes}m ago`;
  }

  if (diff < 86_400_000) {
    const hours = Math.floor(diff / 3_600_000);
    return `${hours}h ago`;
  }

  if (diff < 604_800_000) {
    const days = Math.floor(diff / 86_400_000);
    return `${days}d ago`;
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

const notificationTypeLabel = (type: string): string => {
  switch (type) {
    case 'KNOWLEDGE_UPDATE':
      return 'Knowledge update';
    case 'ARTICLE_PUBLISHED':
      return 'Article published';
    case 'SECURITY':
      return 'Account security';
    case 'SYSTEM':
      return 'System';
    default:
      return type.replace(/_/g, ' ');
  }
};

const notificationTypeClass = (type: string): string => {
  switch (type) {
    case 'SECURITY':
      return 'border-gold/25 bg-gold/[0.06] text-gold';
    case 'KNOWLEDGE_UPDATE':
    case 'ARTICLE_PUBLISHED':
      return 'border-emerald/25 bg-emerald/[0.06] text-emerald';
    default:
      return 'border-white/[0.08] bg-white/[0.025] text-sage';
  }
};

interface NotificationRowProps {
  notification: Notification;
  busy: boolean;
  onRead: (notification: Notification) => void;
  onDelete: (notification: Notification) => void;
  onOpen: (notification: Notification) => void;
}

const NotificationRow: React.FC<NotificationRowProps> = ({
  notification,
  busy,
  onRead,
  onDelete,
  onOpen,
}) => {
  const handleOpen = () => {
    if (!notification.isRead) {
      onRead(notification);
    }

    if (notification.targetUrl) {
      onOpen(notification);
    }
  };

  return (
    <article
      className={`group relative border-b border-white/[0.06] px-5 py-5 transition last:border-b-0 sm:px-7 ${
        notification.isRead
          ? 'bg-transparent'
          : 'bg-emerald/[0.035]'
      }`}
    >
      {!notification.isRead && (
        <span
          className="absolute left-2 top-7 h-2 w-2 rounded-full bg-emerald shadow-[0_0_12px_rgba(34,160,107,0.65)] sm:left-3"
          aria-label="Unread"
        />
      )}

      <div className="flex items-start gap-4">
        <div
          className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${notificationTypeClass(
            notification.type,
          )}`}
        >
          <Bell className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2
                  className={`text-sm font-semibold ${
                    notification.isRead
                      ? 'text-cloud/85'
                      : 'text-cloud'
                  }`}
                >
                  {notification.title}
                </h2>

                <span
                  className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${notificationTypeClass(
                    notification.type,
                  )}`}
                >
                  {notificationTypeLabel(notification.type)}
                </span>
              </div>

              <p className="mt-2 text-sm leading-6 text-mist">
                {notification.content}
              </p>
            </div>

            <time
              dateTime={notification.createdAt}
              className="shrink-0 text-xs text-mist/70"
            >
              {formatNotificationDate(notification.createdAt)}
            </time>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {notification.targetUrl && (
              <button
                type="button"
                onClick={handleOpen}
                disabled={busy}
                className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-xs font-medium text-cloud transition hover:border-emerald/30 hover:bg-emerald/[0.05] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ExternalLink className="h-3.5 w-3.5 text-sage" />
                Open
              </button>
            )}

            {!notification.isRead && (
              <button
                type="button"
                onClick={() => onRead(notification)}
                disabled={busy}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-sage transition hover:bg-white/[0.04] hover:text-cloud disabled:cursor-not-allowed disabled:opacity-50"
              >
                {busy ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Check className="h-3.5 w-3.5" />
                )}
                Mark as read
              </button>
            )}

            <button
              type="button"
              onClick={() => onDelete(notification)}
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-mist transition hover:bg-terra/[0.07] hover:text-cloud disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Trash2 className="h-3.5 w-3.5" />
              )}
              Remove
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export const AccountNotificationsPage: React.FC = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState<'all' | 'unread' | 'system'>('all');
  const [loading, setLoading] = useState(true);
  const [markingAll, setMarkingAll] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const inbox = await notificationApi.getInbox();

      setNotifications(inbox.notifications);
      setUnreadCount(inbox.unreadCount);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load notifications.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadNotifications();
  }, [loadNotifications]);

  const filteredNotifications = useMemo(() => {
    if (filter === 'unread') {
      return notifications.filter((notification) => !notification.isRead);
    }

    if (filter === 'system') {
      return notifications.filter(
        (notification) =>
          notification.type === 'SYSTEM' ||
          notification.type === 'SECURITY',
      );
    }

    return notifications;
  }, [filter, notifications]);

  const handleRead = async (notification: Notification) => {
    if (notification.isRead) {
      return;
    }

    setBusyId(notification.id);
    setError(null);

    try {
      await notificationApi.markAsRead(notification.id);

      setNotifications((current) =>
        current.map((item) =>
          item.id === notification.id
            ? { ...item, isRead: true }
            : item,
        ),
      );

      setUnreadCount((current) => Math.max(0, current - 1));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to mark notification as read.',
      );
    } finally {
      setBusyId(null);
    }
  };

  const handleMarkAll = async () => {
    if (unreadCount === 0 || markingAll) {
      return;
    }

    setMarkingAll(true);
    setError(null);

    try {
      await notificationApi.markAllAsRead();

      setNotifications((current) =>
        current.map((notification) => ({
          ...notification,
          isRead: true,
        })),
      );

      setUnreadCount(0);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to mark notifications as read.',
      );
    } finally {
      setMarkingAll(false);
    }
  };

  const handleDelete = async (notification: Notification) => {
    setBusyId(notification.id);
    setError(null);

    try {
      await notificationApi.delete(notification.id);

      setNotifications((current) =>
        current.filter((item) => item.id !== notification.id),
      );

      if (!notification.isRead) {
        setUnreadCount((current) => Math.max(0, current - 1));
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to remove notification.',
      );
    } finally {
      setBusyId(null);
    }
  };

  const handleOpen = (notification: Notification) => {
    if (!notification.targetUrl) {
      return;
    }

    if (
      notification.targetUrl.startsWith('/') &&
      !notification.targetUrl.startsWith('//')
    ) {
      navigate(notification.targetUrl);
      return;
    }

    window.location.assign(notification.targetUrl);
  };

  return (
    <div className="min-h-screen bg-ink pb-20 pt-10 text-cloud sm:pt-14">
      <div className="ca-container">
        <Link
          to="/account"
          className="inline-flex items-center gap-2 text-sm text-mist transition hover:text-cloud"
        >
          <ArrowLeft className="h-4 w-4" />
          Account center
        </Link>

        <section className="mt-6 overflow-hidden rounded-3xl border border-white/[0.07] bg-forest/70 shadow-soft">
          <div className="border-b border-white/[0.06] px-6 py-6 sm:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald/20 bg-brand text-sage">
                    <Bell className="h-6 w-6" />
                  </div>

                  <div>
                    <p className="ca-eyebrow">Account activity</p>
                    <h1 className="mt-1 text-3xl font-semibold tracking-tight">
                      Notifications
                    </h1>
                  </div>
                </div>

                <p className="mt-4 max-w-2xl text-sm leading-6 text-mist sm:text-base">
                  Important updates and activity associated with your
                  Connect-Africa account.
                </p>
              </div>

              <button
                type="button"
                onClick={handleMarkAll}
                disabled={unreadCount === 0 || markingAll || loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 text-sm font-medium text-cloud transition hover:border-emerald/30 hover:bg-emerald/[0.05] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {markingAll ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <CheckCheck className="h-4 w-4 text-sage" />
                )}
                Mark all as read
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.06] px-6 py-4 sm:px-8">
            {[
              ['all', 'All'],
              ['unread', `Unread${unreadCount ? ` · ${unreadCount}` : ''}`],
              ['system', 'System'],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  setFilter(value as 'all' | 'unread' | 'system')
                }
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                  filter === value
                    ? 'bg-emerald text-ink'
                    : 'text-mist hover:bg-white/[0.04] hover:text-cloud'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {error && (
            <div className="border-b border-terra/20 bg-terra/[0.05] px-6 py-4 sm:px-8">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-terra" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-cloud">
                    Notification service unavailable
                  </p>
                  <p className="mt-1 text-xs leading-5 text-mist">
                    {error}
                  </p>
                  <button
                    type="button"
                    onClick={() => void loadNotifications()}
                    className="mt-3 text-xs font-semibold text-sage transition hover:text-cloud"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex min-h-[320px] items-center justify-center px-6 py-16">
              <div className="flex items-center gap-3 text-sm text-mist">
                <Loader2 className="h-5 w-5 animate-spin text-sage" />
                Loading notifications…
              </div>
            </div>
          ) : filteredNotifications.length > 0 ? (
            <div>
              {filteredNotifications.map((notification) => (
                <NotificationRow
                  key={notification.id}
                  notification={notification}
                  busy={busyId === notification.id}
                  onRead={handleRead}
                  onDelete={handleDelete}
                  onOpen={handleOpen}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[360px] flex-col items-center justify-center px-6 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.025] text-sage">
                <Bell className="h-6 w-6" />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-cloud">
                {filter === 'unread'
                  ? 'You are all caught up'
                  : filter === 'system'
                    ? 'No system notifications'
                    : 'No notifications yet'}
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-mist">
                {filter === 'unread'
                  ? 'There are no unread notifications associated with your account.'
                  : filter === 'system'
                    ? 'System and security notifications will appear here when they are generated.'
                    : 'Important Connect-Africa activity will appear here when notifications are generated for your account.'}
              </p>

              <Link
                to="/search"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-sage"
              >
                Explore knowledge
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AccountNotificationsPage;
