const API_BASE_URL = 'http://localhost:3000/api/v1';

async function request(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message ||
        data.error ||
        'An error occurred during API request',
    );
  }

  return data;
}

export const api = {
  get: (endpoint: string) =>
    request(endpoint, {
      method: 'GET',
    }),

  post: (endpoint: string, body: unknown = {}) =>
    request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  put: (endpoint: string, body: unknown = {}) =>
    request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  patch: (endpoint: string, body: unknown = {}) =>
    request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),

  delete: (endpoint: string) =>
    request(endpoint, {
      method: 'DELETE',
    }),
};

export interface Notification {
  id: string;
  recipientId: string;
  type: string;
  title: string;
  content: string;
  targetUrl: string | null;
  channel: string;
  status: string;
  isRead: boolean;
  createdAt: string;
  templateId: string | null;
}

export interface NotificationInbox {
  notifications: Notification[];
  unreadCount: number;
}

export interface NotificationUnreadCount {
  unreadCount: number;
}

export interface MarkAllNotificationsRead {
  updatedCount: number;
}

export const notificationApi = {
  getInbox: async (): Promise<NotificationInbox> => {
    const response = await api.get('/notification/inbox');
    return response.data;
  },

  getUnreadCount: async (): Promise<number> => {
    const response = await api.get('/notification/unread-count');
    const data: NotificationUnreadCount = response.data;
    return data.unreadCount;
  },

  markAsRead: async (notificationId: string): Promise<void> => {
    await api.post(`/notification/${encodeURIComponent(notificationId)}/read`);
  },

  markAllAsRead: async (): Promise<number> => {
    const response = await api.post('/notification/read-all');
    const data: MarkAllNotificationsRead = response.data;
    return data.updatedCount;
  },

  delete: async (notificationId: string): Promise<void> => {
    await api.delete(
      `/notification/${encodeURIComponent(notificationId)}`,
    );
  },
};

export interface ArticleSummary {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  content?: string | null;
  category?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ReadingHistoryEntry {
  article: ArticleSummary;
  timestamp: string;
}

function unwrapData<T>(response: unknown): T {
  if (
    response &&
    typeof response === 'object' &&
    'data' in response
  ) {
    return (response as { data: T }).data;
  }

  return response as T;
}

function normalizeArticle(article: ArticleSummary): ArticleSummary {
  return {
    id: String(article.id),
    title: article.title || 'Untitled article',
    slug: article.slug || article.id,
    description: article.description ?? null,
    content: article.content ?? null,
    category: article.category ?? null,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
  };
}

export const articleActivityApi = {
  getBookmarks: async (): Promise<ArticleSummary[]> => {
    const response = await api.get('/article/bookmarks');

    const articles = unwrapData<ArticleSummary[]>(response);

    return (Array.isArray(articles) ? articles : []).map(normalizeArticle);
  },

  removeBookmark: async (articleId: string): Promise<void> => {
    await api.delete(
      `/article/bookmark/${encodeURIComponent(articleId)}`,
    );
  },

  getReadingHistory: async (): Promise<ReadingHistoryEntry[]> => {
    const response = await api.get('/article/history');

    const history = unwrapData<ReadingHistoryEntry[]>(response);

    return (Array.isArray(history) ? history : [])
      .filter((entry) => entry && entry.article)
      .map((entry) => ({
        article: normalizeArticle(entry.article),
        timestamp: entry.timestamp,
      }));
  },
};


export interface UserSettings {
  theme: 'light' | 'dark';
  timezone: string;
  locale: string;
  privacyLevel: string;
  notificationsEnabled: boolean;
  notificationPreference: 'in_app' | 'email' | 'push';
  mfaEnabled: boolean;
}

export const settingsApi = {
  get: async (): Promise<UserSettings> => {
    const response = await api.get('/settings');
    const data = unwrapData<Partial<UserSettings>>(response);

    return {
      theme: data.theme === 'light' ? 'light' : 'dark',
      timezone: data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      locale: data.locale || navigator.language || 'en-US',
      privacyLevel: data.privacyLevel || 'private',
      notificationsEnabled: data.notificationsEnabled ?? true,
      notificationPreference:
        data.notificationPreference === 'in_app' ||
        data.notificationPreference === 'push'
          ? data.notificationPreference
          : 'email',
      mfaEnabled: data.mfaEnabled ?? false,
    };
  },

  update: async (
    settings: Partial<Pick<UserSettings, 'theme' | 'timezone' | 'locale'>>,
  ): Promise<void> => {
    await api.put('/settings', settings);
  },

  changeTheme: async (theme: UserSettings['theme']): Promise<void> => {
    await api.patch('/settings/theme', { theme });
  },

  updateLanguage: async (locale: string): Promise<void> => {
    await api.patch('/settings/language', { locale });
  },

  updatePrivacy: async (level: string): Promise<void> => {
    await api.patch('/settings/privacy', { level });
  },

  updateNotifications: async (enabled: boolean): Promise<void> => {
    await api.patch('/settings/notifications', { enabled });
  },

  updateNotificationPreference: async (
    preference: UserSettings['notificationPreference'],
  ): Promise<void> => {
    await api.patch('/settings/notification-preference', { preference });
  },

  updateSecurity: async (mfaEnabled: boolean): Promise<void> => {
    await api.patch('/settings/security', { mfaEnabled });
  },

  reset: async (): Promise<void> => {
    await api.post('/settings/reset');
  },
};

export interface AuthSession {
  token: string;
  createdAt?: string | null;
  lastActiveAt?: string | null;
  expiresAt?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  current?: boolean;
}

export interface MfaSetup {
  secret?: string;
  qrCode?: string;
  qrCodeUrl?: string;
  otpauthUrl?: string;
  enabled?: boolean;
  [key: string]: unknown;
}

export const securityApi = {
  changePassword: async (
    currentPassword: string,
    newPassword: string,
  ): Promise<void> => {
    await api.post('/auth/change-password', {
      currentPassword,
      newPassword,
    });
  },

  changeEmail: async (newEmail: string): Promise<void> => {
    await api.post('/auth/change-email', {
      newEmail,
    });
  },

  getSessions: async (): Promise<AuthSession[]> => {
    const response = await api.get('/auth/sessions');
    const data = unwrapData<unknown>(response);

    if (Array.isArray(data)) {
      return data.map((session) => normalizeSession(session));
    }

    if (
      data &&
      typeof data === 'object' &&
      Array.isArray((data as { sessions?: unknown[] }).sessions)
    ) {
      return (data as { sessions: unknown[] }).sessions.map(normalizeSession);
    }

    return [];
  },

  revokeSession: async (token: string): Promise<void> => {
    await api.delete(`/auth/sessions/${encodeURIComponent(token)}`);
  },

  revokeAllSessions: async (): Promise<void> => {
    await api.delete('/auth/sessions');
  },

  enableMfa: async (): Promise<MfaSetup> => {
    const response = await api.post('/auth/enable-mfa');
    return unwrapData<MfaSetup>(response);
  },

  verifyMfa: async (code: string): Promise<void> => {
    await api.post('/auth/verify-mfa', { code });
  },

  deleteAccount: async (): Promise<void> => {
    await api.delete('/auth/delete-account');
  },
};

export interface UserProfileData {
  userId: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  coverImageUrl?: string;
  website?: string;
  socialLinks?: string[];
  country?: string;
  languages?: string[];
  expertise?: string[];
  researchInterests?: string[];
}

export const profileApi = {
  getProfile: async (): Promise<UserProfileData> => {
    const response = await api.get('/auth/profile');
    const raw = unwrapData<any>(response);

    if (raw && typeof raw === 'object' && '_props' in raw) {
      const props = raw._props;
      const userIdVal = props.userId && typeof props.userId === 'object' && 'props' in props.userId && props.userId.props
        ? props.userId.props.value
        : (props.userId?.value || props.userId);

      return {
        userId: userIdVal,
        displayName: props.displayName,
        bio: props.bio,
        avatarUrl: props.avatarUrl,
        coverImageUrl: props.coverImageUrl,
        website: props.website,
        socialLinks: props.socialLinks,
        country: props.country,
        languages: props.languages,
        expertise: props.expertise,
        researchInterests: props.researchInterests,
      };
    }

    return raw as UserProfileData;
  },

  updateProfile: async (data: {
    displayName?: string;
    bio?: string;
    avatarUrl?: string;
    coverImageUrl?: string;
    website?: string;
    socialLinks?: string[];
    country?: string;
    languages?: string[];
    expertise?: string[];
    researchInterests?: string[];
  }): Promise<void> => {
    await api.put('/auth/profile', data);
  },

  uploadAvatar: async (avatarUrl: string): Promise<void> => {
    await api.post('/auth/upload-avatar', { avatarUrl });
  },
};

function normalizeSession(value: unknown): AuthSession {
  const session =
    value && typeof value === 'object'
      ? (value as Record<string, unknown>)
      : {};

  return {
    token: String(
      session.token ??
        session.sessionToken ??
        session.id ??
        '',
    ),
    createdAt:
      typeof session.createdAt === 'string'
        ? session.createdAt
        : null,
    lastActiveAt:
      typeof session.lastActiveAt === 'string'
        ? session.lastActiveAt
        : typeof session.lastActivityAt === 'string'
          ? session.lastActivityAt
          : null,
    expiresAt:
      typeof session.expiresAt === 'string'
        ? session.expiresAt
        : null,
    ipAddress:
      typeof session.ipAddress === 'string'
        ? session.ipAddress
        : typeof session.ip === 'string'
          ? session.ip
          : null,
    userAgent:
      typeof session.userAgent === 'string'
        ? session.userAgent
        : null,
    current:
      session.current === true ||
      session.isCurrent === true,
  };
}
