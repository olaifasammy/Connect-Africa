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

const notificationTypeBadgeClass = (type: string): string => {
  switch (type) {
    case 'SECURITY':
      return 'ca-badge-clay';
    case 'KNOWLEDGE_UPDATE':
    case 'ARTICLE_PUBLISHED':
      return 'ca-badge-gold';
    default:
      return 'ca-badge-emerald';
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
      className={`group relative border-b border-stone/15 px-5 py-4 transition last:border-b-0 sm:px-7 ${
        notification.isRead ? 'bg-transparent' : 'bg-gold/5'
      }`}
    >
      {!notification.isRead && (
        <span
          className="absolute left-2 top-6 h-2 w-2 rounded-full bg-gold"
          aria-label="Unread"
        />
      )}

      <div className="flex items-start gap-4">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-stone/20 bg-surface text-gold">
          <Bell className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1 font-sans">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-serif text-base font-bold text-text-main">
                  {notification.title}
                </h2>

                <span className={notificationTypeBadgeClass(notification.type)}>
                  {notificationTypeLabel(notification.type)}
                </span>
              </div>

              <p className="mt-1 text-xs leading-relaxed text-text-muted">
                {notification.content}
              </p>
            </div>

            <time
              dateTime={notification.createdAt}
              className="shrink-0 font-mono text-xs text-text-muted"
            >
              {formatNotificationDate(notification.createdAt)}
            </time>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-xs">
            {notification.targetUrl && (
              <button
                type="button"
                onClick={handleOpen}
                disabled={busy}
                className="ca-btn-outline px-2.5 py-1 text-xs"
              >
                <ExternalLink className="h-3.5 w-3.5 text-gold" />
                Open Entry
              </button>
            )}

            {!notification.isRead && (
              <button
                type="button"
                onClick={() => onRead(notification)}
                disabled={busy}
                className="ca-btn-outline px-2.5 py-1 text-xs"
              >
                {busy ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Check className="h-3.5 w-3.5" />
                )}
                Mark Read
              </button>
            )}

            <button
              type="button"
              onClick={() => onDelete(notification)}
              disabled={busy}
              className="ca-btn-outline px-2.5 py-1 text-xs text-clay"
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
    <div className="min-h-screen bg-scholar-canvas bg-canvas pb-20 pt-10 text-text-main font-sans transition-colors duration-300">
      <div className="ca-container">
        <Link
          to="/account"
          className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-emerald-900 dark:text-gold hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Account Center
        </Link>

        <section className="mt-6 ca-card bg-surface shadow-scholar p-0">
          <div className="border-b border-stone/20 px-6 py-6 sm:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                    <Bell className="h-6 w-6" />
                  </div>

                  <div>
                    <p className="ca-eyebrow">Account Dispatch</p>
                    <h1 className="mt-1 font-serif text-3xl font-bold text-text-main">
                      Notifications
                    </h1>
                  </div>
                </div>

                <p className="mt-2 font-sans text-sm text-text-muted">
                  Important dispatches and activity associated with your account.
                </p>
              </div>

              <button
                type="button"
                onClick={handleMarkAll}
                disabled={unreadCount === 0 || markingAll || loading}
                className="ca-btn-outline px-4 py-2 text-xs font-mono"
              >
                {markingAll ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <CheckCheck className="h-4 w-4 text-gold" />
                )}
                Mark All Read
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-b border-stone/15 px-6 py-3 font-mono text-xs">
            {[
              ['all', 'All'],
              ['unread', `Unread${unreadCount ? ` (${unreadCount})` : ''}`],
              ['system', 'System Alerts'],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value as 'all' | 'unread' | 'system')}
                className={`rounded-md px-3 py-1.5 font-semibold transition ${
                  filter === value
                    ? 'bg-emerald-900 text-white dark:bg-emerald-500 dark:text-ink'
                    : 'text-text-muted hover:bg-stone/10 hover:text-text-main'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {error && (
            <div className="border-b border-clay/30 bg-clay/10 px-6 py-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
                <div className="min-w-0 font-sans text-xs text-clay">
                  <p className="font-bold">Notification Dispatch Warning</p>
                  <p className="mt-0.5">{error}</p>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex min-h-[250px] items-center justify-center font-mono text-xs text-text-muted">
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-gold" />
              Loading notifications inbox...
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
            <div className="flex min-h-[250px] flex-col items-center justify-center px-6 py-12 text-center">
              <Bell className="h-8 w-8 text-gold" />
              <h2 className="mt-3 font-serif text-lg font-bold text-text-main">
                {filter === 'unread' ? 'All Caught Up' : 'No Notifications'}
              </h2>
              <p className="mt-1 font-sans text-xs text-text-muted">
                Activity alerts and system dispatches will appear here.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AccountNotificationsPage;
