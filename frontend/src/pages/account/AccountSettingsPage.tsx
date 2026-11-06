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
  Smartphone,
  SlidersHorizontal,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { settingsApi } from '../../services/api';
import type { UserSettings } from '../../services/api';
import { useTheme } from '../../context/ThemeContext';

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
  theme: 'light',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Africa/Tripoli',
  locale: navigator.language || 'en-US',
  privacyLevel: 'private',
  notificationsEnabled: true,
  notificationPreference: 'email',
  mfaEnabled: false,
};

const SettingRow: React.FC<{
  icon: React.FC<any>;
  title: string;
  description: string;
  children: React.ReactNode;
}> = ({ icon: Icon, title, description, children }) => (
  <div className="flex flex-col gap-6 py-10 last:border-b-0 sm:flex-row sm:items-start sm:justify-between font-sans">
    <div className="flex min-w-0 gap-6">
      <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone/10 text-text-main">
        <Icon size={18} />
      </div>

      <div>
        <h3 className="font-serif text-2xl font-bold text-text-main">{title}</h3>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-text-muted">
          {description}
        </p>
      </div>
    </div>

    <div className="mt-6 sm:mt-0 sm:shrink-0">{children}</div>
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
      'relative h-7 w-12 rounded-full transition-colors outline-none ring-offset-2 focus:ring-1 focus:ring-text-main',
      checked
        ? 'bg-text-main'
        : 'bg-stone/20',
      disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
    ].join(' ')}
  >
    <span
      className={[
        'absolute top-1 left-1 h-5 w-5 rounded-full bg-white transition-transform',
        checked ? 'translate-x-5' : 'translate-x-0',
      ].join(' ')}
    />
  </button>
);

export const AccountSettingsPage: React.FC = () => {
  const { theme: activeTheme, setTheme } = useTheme();
  const initialTheme: 'light' | 'dark' = activeTheme === 'dark' ? 'dark' : 'light';
  const [settings, setSettings] = useState<UserSettings>({ ...initialSettings, theme: initialTheme });
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
            err instanceof Error ? err.message : 'Unable to load your settings.',
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
      setNotice('Settings saved successfully.');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to save your settings.',
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
      setTheme(theme === 'dark' ? 'dark' : 'light');
      await settingsApi.changeTheme(theme);
      setSettings(next);
      setNotice('Theme preference updated.');
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
      setNotice('Language preference updated.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update language.');
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
      setNotice('Privacy preference updated.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update privacy.');
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
      setNotice('Notification preference updated.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update notifications.');
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
      setNotice('Notification delivery channel updated.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update channel.');
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
      setNotice('Settings restored to defaults.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to reset settings.');
    } finally {
      setResetting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-scholar-canvas bg-canvas pb-20 pt-10 text-text-main font-sans sm:pt-14">
        <div className="ca-container">
          <div className="animate-pulse">
            <div className="h-4 w-28 rounded bg-stone/20" />
            <div className="mt-8 h-9 w-56 rounded bg-stone/20" />
            <div className="mt-10 h-[400px] rounded-xl bg-surface border border-stone/20" />
          </div>
        </div>
      </div>
    );
  }

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
              <SlidersHorizontal className="h-6 w-6" />
            </div>

            <button
              type="button"
              onClick={() => void reset()}
              disabled={resetting || saving}
              className="rounded-full border border-stone/10 px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition hover:border-text-main"
            >
              {resetting ? 'Resetting...' : 'Reset Defaults'}
            </button>
          </div>

          <p className="ca-eyebrow">Account Control</p>

          <h1 className="mt-2 font-serif text-4xl font-bold text-text-main sm:text-5xl lg:text-6xl">
            Settings.
          </h1>

          <p className="mt-6 max-w-xl font-sans text-lg text-text-muted">
            Customize your discovery environment — appearance, localization, and notification dispatches.
          </p>
        </header>

        {(error || notice) && (
          <div className="mt-10">
            {error && (
              <div className="ca-msg-error">
                {error}
              </div>
            )}

            {!error && notice && (
              <div className="ca-msg-success">
                <Check className="h-4 w-4" />
                {notice}
              </div>
            )}
          </div>
        )}

        <main className="mt-16 divide-y divide-stone/10 border-t border-stone/10">
          <SettingRow
            icon={Monitor}
            title="Workspace Theme"
            description="Select between Paper Light (Default) and Ink Dark environments."
          >
            <div className="flex rounded-full border border-stone/10 p-1">
              {(['light', 'dark'] as const).map((themeChoice) => (
                <button
                  key={themeChoice}
                  type="button"
                  disabled={saving}
                  onClick={() => void updateTheme(themeChoice)}
                  className={`rounded-full px-5 py-1.5 font-sans text-[10px] font-bold uppercase tracking-widest transition ${
                    settings.theme === themeChoice
                      ? 'bg-text-main text-white'
                      : 'text-text-muted hover:text-text-main'
                  }`}
                >
                  {themeChoice}
                </button>
              ))}
            </div>
          </SettingRow>

          <SettingRow
            icon={Languages}
            title="Language"
            description="Choose your primary language interface for the platform archives."
          >
            <select
              value={settings.locale}
              disabled={saving}
              onChange={(event) => void updateLanguage(event.target.value)}
              className="min-w-44 border-b border-stone/10 bg-transparent py-1.5 font-sans text-sm font-medium outline-none focus:border-text-main transition-colors"
            >
              {LOCALES.map((locale) => (
                <option key={locale.value} value={locale.value}>
                  {locale.label}
                </option>
              ))}
            </select>
          </SettingRow>

          <SettingRow
            icon={Globe2}
            title="Timezone"
            description="Used to format historical chronology and archival logs."
          >
            <div className="flex flex-col items-end gap-4">
              <select
                value={settings.timezone}
                disabled={saving}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    timezone: event.target.value,
                  }))
                }
                className="min-w-56 border-b border-stone/10 bg-transparent py-1.5 font-sans text-sm font-medium outline-none focus:border-text-main transition-colors"
              >
                {TIMEZONES.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
              <button
                type="button"
                disabled={saving}
                onClick={() => void persist(settings)}
                className="text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-text-main transition-colors"
              >
                {saving ? 'Saving...' : 'Confirm Timezone'}
              </button>
            </div>
          </SettingRow>

          <SettingRow
            icon={LockKeyhole}
            title="Privacy"
            description="Control the public visibility of your scholarly profile and activity records."
          >
            <select
              value={settings.privacyLevel}
              disabled={saving}
              onChange={(event) => void updatePrivacy(event.target.value)}
              className="min-w-44 border-b border-stone/10 bg-transparent py-1.5 font-sans text-sm font-medium outline-none focus:border-text-main transition-colors"
            >
              {PRIVACY_LEVELS.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </SettingRow>

          <SettingRow
            icon={Bell}
            title="Dispatch"
            description="Receive automated updates regarding archival discoveries and platform activity."
          >
            <Toggle
              checked={settings.notificationsEnabled}
              disabled={saving}
              onChange={(enabled) => void updateNotifications(enabled)}
            />
          </SettingRow>

          <SettingRow
            icon={settings.notificationPreference === 'email' ? Mail : Smartphone}
            title="Channel"
            description="Choose your primary delivery channel for account dispatches."
          >
            <select
              value={settings.notificationPreference}
              disabled={saving}
              onChange={(event) =>
                void updateNotificationPreference(
                  event.target.value as UserSettings['notificationPreference'],
                )
              }
              className="min-w-44 border-b border-stone/10 bg-transparent py-1.5 font-sans text-sm font-medium outline-none focus:border-text-main transition-colors"
            >
              <option value="in_app">In-App Inbox</option>
              <option value="email">Email Service</option>
              <option value="push">Push Notification</option>
            </select>
          </SettingRow>
        </main>

        <div className="mt-20 flex justify-center">
          <Link
            to="/account"
            className="rounded-full bg-text-main px-12 py-4 text-sm font-medium text-white transition hover:bg-stone/80"
          >
            Return to Workspace
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsPage;
