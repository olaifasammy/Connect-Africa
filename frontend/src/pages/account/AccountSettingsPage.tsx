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
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}> = ({ icon, title, description, children }) => (
  <div className="flex flex-col gap-4 border-b border-stone/15 py-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between font-sans">
    <div className="flex min-w-0 gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-stone/20 bg-canvas text-gold">
        {icon}
      </div>

      <div>
        <h3 className="font-serif text-base font-bold text-text-main">{title}</h3>
        <p className="mt-0.5 max-w-2xl text-xs leading-relaxed text-text-muted">
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
      'relative h-6 w-11 rounded-full border transition-colors',
      checked
        ? 'border-emerald-900 bg-emerald-900 dark:bg-emerald-500'
        : 'border-stone/30 bg-stone/20',
      disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
    ].join(' ')}
  >
    <span
      className={[
        'absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform shadow-sm',
        checked ? 'translate-x-5' : 'translate-x-0.5',
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
    <div className="min-h-screen bg-scholar-canvas bg-canvas pb-20 pt-10 text-text-main font-sans transition-colors duration-300">
      <div className="ca-container">
        <Link
          to="/account"
          className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-emerald-900 dark:text-gold hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Account Center
        </Link>

        <header className="mt-6 max-w-3xl">
          <p className="ca-eyebrow">Account Control</p>
          <div className="mt-1 flex items-start justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl font-bold text-text-main sm:text-4xl">
                Account Settings
              </h1>
              <p className="mt-2 font-sans text-sm text-text-muted">
                Customize display appearance, regional settings, and notifications.
              </p>
            </div>

            <button
              type="button"
              onClick={() => void reset()}
              disabled={resetting || saving}
              className="ca-btn-outline px-3 py-1.5 font-mono text-xs"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{resetting ? 'Resetting...' : 'Reset Defaults'}</span>
            </button>
          </div>
        </header>

        {(error || notice) && (
          <div className="mt-6 max-w-3xl">
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

        <main className="mt-8 max-w-4xl space-y-6">
          <section className="ca-card bg-surface shadow-scholar">
            <div className="border-b border-stone/20 pb-4 mb-2">
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="h-5 w-5 text-gold" />
                <div>
                  <h2 className="font-serif text-lg font-bold text-text-main">Appearance & Localization</h2>
                  <p className="font-sans text-xs text-text-muted">
                    Language, timezone, and theme preferences.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <SettingRow
                icon={<Monitor className="h-5 w-5" />}
                title="Workspace Theme"
                description="Select between Parchment Light Mode (Default) and Dark Mode."
              >
                <div className="flex rounded-lg border border-stone/20 bg-canvas p-1">
                  {(['light', 'dark'] as const).map((themeChoice) => (
                    <button
                      key={themeChoice}
                      type="button"
                      disabled={saving}
                      onClick={() => void updateTheme(themeChoice)}
                      className={`rounded-md px-3 py-1 font-mono text-xs capitalize transition ${
                        settings.theme === themeChoice
                          ? 'bg-emerald-900 text-white dark:bg-emerald-500 dark:text-ink font-bold'
                          : 'text-text-muted hover:text-text-main'
                      }`}
                    >
                      {themeChoice}
                    </button>
                  ))}
                </div>
              </SettingRow>

              <SettingRow
                icon={<Languages className="h-5 w-5" />}
                title="Language & Locale"
                description="Choose your primary language interface for Connect Africa."
              >
                <select
                  value={settings.locale}
                  disabled={saving}
                  onChange={(event) => void updateLanguage(event.target.value)}
                  className="ca-input min-w-44 font-sans text-xs"
                >
                  {LOCALES.map((locale) => (
                    <option key={locale.value} value={locale.value}>
                      {locale.label}
                    </option>
                  ))}
                </select>
              </SettingRow>

              <SettingRow
                icon={<Globe2 className="h-5 w-5" />}
                title="Timezone"
                description="Used to format dates and historical timeline entries."
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
                  className="ca-input min-w-56 font-sans text-xs"
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
              </SettingRow>

              <div className="flex justify-end border-t border-stone/15 pt-4 mt-2">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => void persist(settings)}
                  className="ca-btn-primary px-5 py-2 text-xs"
                >
                  <Save className="h-4 w-4" />
                  {saving ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>
          </section>

          <section className="ca-card bg-surface shadow-scholar">
            <div className="border-b border-stone/20 pb-4 mb-2">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-gold" />
                <div>
                  <h2 className="font-serif text-lg font-bold text-text-main">Privacy & Dispatches</h2>
                  <p className="font-sans text-xs text-text-muted">
                    Manage notifications, communication channels, and account privacy.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <SettingRow
                icon={<LockKeyhole className="h-5 w-5" />}
                title="Privacy Level"
                description="Control public visibility of your account activity."
              >
                <select
                  value={settings.privacyLevel}
                  disabled={saving}
                  onChange={(event) => void updatePrivacy(event.target.value)}
                  className="ca-input min-w-44 font-sans text-xs"
                >
                  {PRIVACY_LEVELS.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </SettingRow>

              <SettingRow
                icon={<Bell className="h-5 w-5" />}
                title="Notifications Dispatch"
                description="Receive updates regarding saved knowledge and activity."
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
                title="Delivery Channel"
                description="Choose primary delivery channel for account notifications."
              >
                <select
                  value={settings.notificationPreference}
                  disabled={saving}
                  onChange={(event) =>
                    void updateNotificationPreference(
                      event.target.value as UserSettings['notificationPreference'],
                    )
                  }
                  className="ca-input min-w-44 font-sans text-xs"
                >
                  <option value="in_app">In-App Inbox</option>
                  <option value="email">Email</option>
                  <option value="push">Push Notification</option>
                </select>
              </SettingRow>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AccountSettingsPage;
