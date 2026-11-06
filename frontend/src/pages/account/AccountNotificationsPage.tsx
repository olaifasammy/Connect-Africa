import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Bell,
  Check,
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

  if (diff < 60_000) return 'Just now';
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  if (diff < 604_800_000) return `${Math.floor(diff / 86_400_000)}d ago`;

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

const notificationTypeLabel = (type: string): string => {
  switch (type) {
    case 'KNOWLEDGE_UPDATE':
      return 'Knowledge Update';
    case 'ARTICLE_PUBLISHED':
      return 'Article Published';
    case 'SECURITY':
      return 'Security Alert';
    case 'SYSTEM':
      return 'System';
    default:
      return type.replace(/_/g, ' ');
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
      className={`group relative border-b border-stone/10 px-5 py-8 transition last:border-b-0 sm:px-7 ${
        notification.isRead ? 'bg-transparent' : 'bg-stone/5'
      }`}
    >
      {!notification.isRead && (
        <span
          className="absolute left-2 top-10 h-2 w-2 rounded-full bg-text-main"
          aria-label="Unread"
        />
      )}

      <div className="flex items-start gap-6">
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone/10 text-text-main">
          <Bell className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-serif text-2xl font-bold leading-tight text-text-main">
                  {notification.title}
                </h2>

                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                  {notificationTypeLabel(notification.type)}
                </span>
              </div>

              <p className="mt-3 text-base leading-relaxed text-text-muted max-w-3xl">
                {notification.content}
              </p>
            </div>

            <time
              dateTime={notification.createdAt}
              className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-text-muted"
            >
              {formatNotificationDate(notification.createdAt)}
            </time>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            {notification.targetUrl && (
              <button
                type="button"
                onClick={handleOpen}
                disabled={busy}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone/10 text-text-muted transition hover:border-text-main hover:text-text-main"
              >
                <ExternalLink size={16} />
              </button>
            )}

            {!notification.isRead && (
              <button
                type="button"
                onClick={() => onRead(notification)}
                disabled={busy}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone/10 text-text-muted transition hover:border-text-main hover:text-text-main"
              >
                {busy ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Check size={16} />
                )}
              </button>
            )}

            <button
              type="button"
              onClick={() => onDelete(notification)}
              disabled={busy}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone/10 text-text-muted transition hover:border-clay hover:text-clay"
            >
              {busy ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 size={16} />
              )}
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
        err instanceof Error ? err.message : 'Unable to load notifications.',
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
          notification.type === 'SYSTEM' || notification.type === 'SECURITY',
      );
    }
    return notifications;
  }, [filter, notifications]);

  const handleRead = async (notification: Notification) => {
    if (notification.isRead) return;
    setBusyId(notification.id);
    setError(null);

    try {
      await notificationApi.markAsRead(notification.id);
      setNotifications((current) =>
        current.map((item) =>
          item.id === notification.id ? { ...item, isRead: true } : item,
        ),
      );
      setUnreadCount((current) => Math.max(0, current - 1));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to mark notification as read.');
    } finally {
      setBusyId(null);
    }
  };

  const handleMarkAll = async () => {
    if (unreadCount === 0 || markingAll) return;
    setMarkingAll(true);
    setError(null);

    try {
      await notificationApi.markAllAsRead();
      setNotifications((current) =>
        current.map((notification) => ({ ...notification, isRead: true })),
      );
      setUnreadCount(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to mark notifications as read.');
    } finally {
      setMarkingAll(false);
    }
  };

  const handleDelete = async (notification: Notification) => {
    setBusyId(notification.id);
    setError(null);

    try {
      await notificationApi.delete(notification.id);
      setNotifications((current) => current.filter((item) => item.id !== notification.id));
      if (!notification.isRead) {
        setUnreadCount((current) => Math.max(0, current - 1));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to remove notification.');
    } finally {
      setBusyId(null);
    }
  };

  const handleOpen = (notification: Notification) => {
    if (!notification.targetUrl) return;
    if (notification.targetUrl.startsWith('/') && !notification.targetUrl.startsWith('//')) {
      navigate(notification.targetUrl);
      return;
    }
    window.location.assign(notification.targetUrl);
  };

  return (
    <div className="min-h-screen bg-canvas pb-24 pt-8 text-text-main font-sans transition-colors duration-300">
      <div className="ca-container">
        <Link
          to="/account"
          className="group inline-flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-text-main transition-colors"
        >
          <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
          Workspace
        </Link>

        <header className="mt-12 border-b border-stone/10 pb-10">
          <div className="mb-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-stone/10 text-text-main">
              <Bell className="h-6 w-6" />
            </div>

            <button
              type="button"
              onClick={handleMarkAll}
              disabled={unreadCount === 0 || markingAll || loading}
              className="rounded-full border border-stone/10 px-6 py-2 text-xs font-bold uppercase tracking-widest transition hover:border-text-main"
            >
              {markingAll ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Mark All Read'
              )}
            </button>
          </div>

          <p className="ca-eyebrow">Account Dispatch</p>

          <h1 className="mt-2 font-serif text-4xl font-bold text-text-main sm:text-5xl lg:text-6xl">
            Notifications.
          </h1>

          <p className="mt-6 max-w-xl font-sans text-lg text-text-muted">
            Important dispatches and activity logs associated with your account within the knowledge archive.
          </p>
        </header>

        <div className="mt-10 flex flex-wrap items-center gap-6 border-b border-stone/10 pb-4 font-mono text-[10px] uppercase tracking-widest">
          {[
            ['all', 'All'],
            ['unread', `Unread (${unreadCount})`],
            ['system', 'System Alerts'],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value as 'all' | 'unread' | 'system')}
              className={`transition ${
                filter === value
                  ? 'text-text-main underline decoration-text-main decoration-2 underline-offset-8'
                  : 'text-text-muted hover:text-text-main'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {error && (
          <div className="mt-10 ca-msg-error">
            {error}
          </div>
        )}

        <section className="mt-12">
          {loading ? (
            <div className="flex min-h-[250px] items-center justify-center font-mono text-[10px] uppercase tracking-widest text-text-muted">
              <Loader2 className="mr-3 h-4 w-4 animate-spin" />
              Loading archives...
            </div>
          ) : filteredNotifications.length > 0 ? (
            <div className="divide-y divide-stone/10">
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
            <div className="flex min-h-[400px] flex-col items-center justify-center px-6 py-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-stone/10 text-text-muted">
                <Bell className="h-8 w-8" strokeWidth={1} />
              </div>
              <h2 className="mt-8 font-serif text-3xl font-bold text-text-main">
                {filter === 'unread' ? 'Archives are clear.' : 'No notifications.'}
              </h2>
              <p className="mt-4 font-sans text-lg text-text-muted max-w-md mx-auto">
                Activity alerts and system dispatches will appear here as the platform expands.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AccountNotificationsPage;
