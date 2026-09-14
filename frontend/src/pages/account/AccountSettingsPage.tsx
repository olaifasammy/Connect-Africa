import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Bell,
  Check,
  Globe2,
  Languages,
  LockKeyhole,
  Mail,
  Monitor,
  RotateCcw,
  Smartphone,
  Save,
  Shield,
  SlidersHorizontal,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { settingsApi } from '../../services/api';
import type { UserSettings } from '../../services/api';

const TIMEZONES = [
  'Africa/Tripoli',
  'Africa/Cairo',
  'Africa/Johannesburg',
  'Africa/Lagos',
  'Africa/Nairobi',
  'Africa/Accra',
  'UTC',
];

const LOCALES = [
  { value: 'en-US', label: 'English' },
  { value: 'ar-LY', label: 'العربية' },
  { value: 'fr-FR', label: 'Français' },
];

const PRIVACY_LEVELS = [
  {
    value: 'private',
    label: 'Private',
    description: 'Keep your account activity private.',
  },
  {
    value: 'public',
    label: 'Public',
    description: 'Allow supported public activity surfaces to use your profile.',
  },
];

const initialSettings: UserSettings = {
  theme: 'dark',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Africa/Tripoli',
  locale: navigator.language || 'en-US',
  privacyLevel: 'private',
  notificationsEnabled: true,
  notificationPreference: 'email',
  mfaEnabled: false,
};

const SettingRow: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}> = ({ icon, title, description, children }) => (
  <div className="flex flex-col gap-5 border-b border-white/[0.06] py-6 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex min-w-0 gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-forest text-sage">
        {icon}
      </div>

      <div>
        <h3 className="font-medium text-cloud">{title}</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-mist">
          {description}
        </p>
      </div>
    </div>

    <div className="sm:shrink-0">{children}</div>
  </div>
);

const Toggle: React.FC<{
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}> = ({ checked, disabled, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={() => onChange(!checked)}
    className={[
      'relative h-7 w-12 rounded-full border transition',
      checked
        ? 'border-emerald/50 bg-emerald'
        : 'border-white/10 bg-white/[0.06]',
      disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
    ].join(' ')}
  >
    <span
      className={[
        'absolute top-1 h-5 w-5 rounded-full bg-cloud transition',
        checked ? 'left-6' : 'left-1',
      ].join(' ')}
    />
  </button>
);

export const AccountSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>(initialSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await settingsApi.get();

        if (active) {
          setSettings(data);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : 'Unable to load your settings.',
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, []);

  const persist = async (next: UserSettings) => {
    try {
      setSaving(true);
      setError('');
      setNotice('');

      await settingsApi.update({
        theme: next.theme,
        timezone: next.timezone,
        locale: next.locale,
      });

      setSettings(next);
      setNotice('Settings saved.');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to save your settings.',
      );
    } finally {
      setSaving(false);
    }
  };

  const updateTheme = async (theme: UserSettings['theme']) => {
    const next = { ...settings, theme };

    try {
      setSaving(true);
      setError('');
      setNotice('');
      await settingsApi.changeTheme(theme);
      setSettings(next);
      setNotice('Theme preference saved.');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to update theme.',
      );
    } finally {
      setSaving(false);
    }
  };

  const updateLanguage = async (locale: string) => {
    const next = { ...settings, locale };

    try {
      setSaving(true);
      setError('');
      setNotice('');
      await settingsApi.updateLanguage(locale);
      setSettings(next);
      setNotice('Language preference saved.');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to update language.',
      );
    } finally {
      setSaving(false);
    }
  };

  const updatePrivacy = async (privacyLevel: string) => {
    const next = { ...settings, privacyLevel };

    try {
      setSaving(true);
      setError('');
      setNotice('');
      await settingsApi.updatePrivacy(privacyLevel);
      setSettings(next);
      setNotice('Privacy preference saved.');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to update privacy.',
      );
    } finally {
      setSaving(false);
    }
  };

  const updateNotifications = async (enabled: boolean) => {
    const next = { ...settings, notificationsEnabled: enabled };

    try {
      setSaving(true);
      setError('');
      setNotice('');
      await settingsApi.updateNotifications(enabled);
      setSettings(next);
      setNotice('Notification preference saved.');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to update notifications.',
      );
    } finally {
      setSaving(false);
    }
  };

  const updateNotificationPreference = async (
    preference: UserSettings['notificationPreference'],
  ) => {
    const next = { ...settings, notificationPreference: preference };

    try {
      setSaving(true);
      setError('');
      setNotice('');

      await settingsApi.updateNotificationPreference(preference);

      setSettings(next);
      setNotice('Notification delivery preference saved.');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to update notification delivery preference.',
      );
    } finally {
      setSaving(false);
    }
  };

  const reset = async () => {
    try {
      setResetting(true);
      setError('');
      setNotice('');

      await settingsApi.reset();

      const fresh = await settingsApi.get();
      setSettings(fresh);
      setNotice('Settings restored to their defaults.');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to reset your settings.',
      );
    } finally {
      setResetting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-ink pb-20 pt-10 text-cloud sm:pt-14">
        <div className="ca-container">
          <div className="animate-pulse">
            <div className="h-4 w-28 rounded bg-white/[0.06]" />
            <div className="mt-8 h-9 w-56 rounded bg-white/[0.06]" />
            <div className="mt-3 h-5 w-full max-w-2xl rounded bg-white/[0.04]" />
            <div className="mt-10 h-[560px] rounded-3xl bg-forest/50" />
          </div>
        </div>
      </div>
    );
  }

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

        <header className="mt-7 max-w-3xl">
          <p className="ca-eyebrow">Account control</p>
          <div className="mt-2 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Settings
              </h1>
              <p className="mt-3 text-sm leading-6 text-mist sm:text-base">
                Control how Connect-Africa behaves for your account.
              </p>
            </div>

            <button
              type="button"
              onClick={() => void reset()}
              disabled={resetting || saving}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm font-medium text-mist transition hover:border-white/[0.14] hover:text-cloud disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">
                {resetting ? 'Resetting…' : 'Reset'}
              </span>
            </button>
          </div>
        </header>

        {(error || notice) && (
          <div className="mt-6 max-w-3xl">
            {error && (
              <div className="rounded-2xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            {!error && notice && (
              <div className="flex items-center gap-2 rounded-2xl border border-emerald/20 bg-emerald/[0.06] px-4 py-3 text-sm text-sage">
                <Check className="h-4 w-4" />
                {notice}
              </div>
            )}
          </div>
        )}

        <main className="mt-8 max-w-4xl space-y-6">
          <section className="ca-surface overflow-hidden rounded-3xl shadow-soft">
            <div className="border-b border-white/[0.06] px-6 py-5 sm:px-8">
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="h-5 w-5 text-sage" />
                <div>
                  <h2 className="font-semibold">Experience</h2>
                  <p className="mt-1 text-sm text-mist">
                    Language, regional formatting and appearance preferences.
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 sm:px-8">
              <SettingRow
                icon={<Monitor className="h-5 w-5" />}
                title="Theme"
                description="Choose the visual theme associated with your account."
              >
                <div className="flex rounded-xl border border-white/[0.08] bg-white/[0.03] p-1">
                  {(['dark', 'light'] as const).map((theme) => (
                    <button
                      key={theme}
                      type="button"
                      disabled={saving}
                      onClick={() => void updateTheme(theme)}
                      className={[
                        'rounded-lg px-3 py-2 text-sm capitalize transition',
                        settings.theme === theme
                          ? 'bg-brand text-cloud'
                          : 'text-mist hover:text-cloud',
                      ].join(' ')}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </SettingRow>

              <SettingRow
                icon={<Languages className="h-5 w-5" />}
                title="Language"
                description="Choose the language used by the Connect-Africa experience."
              >
                <select
                  value={settings.locale}
                  disabled={saving}
                  onChange={(event) =>
                    void updateLanguage(event.target.value)
                  }
                  className="min-w-44 rounded-xl border border-white/[0.08] bg-ink px-3 py-2.5 text-sm text-cloud outline-none transition focus:border-emerald/50"
                >
                  {LOCALES.map((locale) => (
                    <option key={locale.value} value={locale.value}>
                      {locale.label}
                    </option>
                  ))}
                  {!LOCALES.some(
                    (locale) => locale.value === settings.locale,
                  ) && (
                    <option value={settings.locale}>
                      {settings.locale}
                    </option>
                  )}
                </select>
              </SettingRow>

              <SettingRow
                icon={<Globe2 className="h-5 w-5" />}
                title="Timezone"
                description="Used when displaying dates, activity and knowledge history."
              >
                <select
                  value={settings.timezone}
                  disabled={saving}
                  onChange={(event) =>
                    setSettings((current) => ({
                      ...current,
                      timezone: event.target.value,
                    }))
                  }
                  className="min-w-56 rounded-xl border border-white/[0.08] bg-ink px-3 py-2.5 text-sm text-cloud outline-none transition focus:border-emerald/50"
                >
                  {!TIMEZONES.includes(settings.timezone) && (
                    <option value={settings.timezone}>
                      {settings.timezone}
                    </option>
                  )}
                  {TIMEZONES.map((timezone) => (
                    <option key={timezone} value={timezone}>
                      {timezone}
                    </option>
                  ))}
                </select>
              </SettingRow>

              <div className="flex justify-end border-t border-white/[0.06] py-5">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => void persist(settings)}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-sage disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {saving ? 'Saving…' : 'Save changes'}
                </button>
              </div>
            </div>
          </section>

          <section className="ca-surface overflow-hidden rounded-3xl shadow-soft">
            <div className="border-b border-white/[0.06] px-6 py-5 sm:px-8">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-gold" />
                <div>
                  <h2 className="font-semibold">Privacy & security</h2>
                  <p className="mt-1 text-sm text-mist">
                    Control account visibility and security-related preferences.
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 sm:px-8">
              <SettingRow
                icon={<LockKeyhole className="h-5 w-5" />}
                title="Privacy"
                description="Control the privacy level associated with your account activity."
              >
                <select
                  value={settings.privacyLevel}
                  disabled={saving}
                  onChange={(event) =>
                    void updatePrivacy(event.target.value)
                  }
                  className="min-w-44 rounded-xl border border-white/[0.08] bg-ink px-3 py-2.5 text-sm text-cloud outline-none transition focus:border-emerald/50"
                >
                  {PRIVACY_LEVELS.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                  {!PRIVACY_LEVELS.some(
                    (level) => level.value === settings.privacyLevel,
                  ) && (
                    <option value={settings.privacyLevel}>
                      {settings.privacyLevel}
                    </option>
                  )}
                </select>
              </SettingRow>

              <SettingRow
                icon={<Bell className="h-5 w-5" />}
                title="Notifications"
                description="Allow Connect-Africa to deliver account and knowledge notifications."
              >
                <Toggle
                  checked={settings.notificationsEnabled}
                  disabled={saving}
                  onChange={(enabled) => void updateNotifications(enabled)}
                />
              </SettingRow>

              <SettingRow
                icon={
                  settings.notificationPreference === 'email' ? (
                    <Mail className="h-5 w-5" />
                  ) : (
                    <Smartphone className="h-5 w-5" />
                  )
                }
                title="Notification delivery"
                description="Choose the primary channel used for supported Connect-Africa notifications."
              >
                <select
                  value={settings.notificationPreference}
                  disabled={saving}
                  onChange={(event) =>
                    void updateNotificationPreference(
                      event.target.value as UserSettings['notificationPreference'],
                    )
                  }
                  className="min-w-44 rounded-xl border border-white/[0.08] bg-ink px-3 py-2.5 text-sm text-cloud outline-none transition focus:border-emerald/50"
                >
                  <option value="in_app">In-app</option>
                  <option value="email">Email</option>
                  <option value="push">Push</option>
                </select>
              </SettingRow>

              <SettingRow
                icon={<Shield className="h-5 w-5" />}
                title="Multi-factor authentication"
                description="Review your MFA preference. Actual MFA enrollment remains controlled by the authentication flow."
              >
                <div className="flex items-center gap-3">
                  <span
                    className={[
                      'rounded-full border px-2.5 py-1 text-xs font-medium',
                      settings.mfaEnabled
                        ? 'border-emerald/30 bg-emerald/[0.08] text-sage'
                        : 'border-white/[0.08] bg-white/[0.03] text-mist',
                    ].join(' ')}
                  >
                    {settings.mfaEnabled ? 'Enabled' : 'Not enabled'}
                  </span>
                </div>
              </SettingRow>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AccountSettingsPage;
