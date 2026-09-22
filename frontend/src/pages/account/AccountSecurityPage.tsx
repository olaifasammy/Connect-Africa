import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  Check,
  ChevronRight,
  KeyRound,
  Laptop,
  LockKeyhole,
  Mail,
  Monitor,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Trash2,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  securityApi,
  apiKeyApi,
  type AuthSession,
  type MfaSetup,
  type ApiKeyItem,
} from '../../services/api';

function formatDate(value?: string | null): string {
  if (!value) return 'Not available';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Not available';

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function sessionIcon(userAgent?: string | null) {
  const value = (userAgent || '').toLowerCase();
  if (value.includes('android') || value.includes('iphone') || value.includes('ipad')) {
    return Smartphone;
  }
  if (value.includes('windows') || value.includes('macintosh') || value.includes('linux')) {
    return Laptop;
  }
  return Monitor;
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
}

export const AccountSecurityPage: React.FC = () => {
  const { user, logout } = useAuth();

  const [sessions, setSessions] = useState<AuthSession[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [sessionError, setSessionError] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordBusy, setPasswordBusy] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [newEmail, setNewEmail] = useState('');
  const [emailBusy, setEmailBusy] = useState(false);
  const [emailMessage, setEmailMessage] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const [mfaBusy, setMfaBusy] = useState(false);
  const [mfaSetup, setMfaSetup] = useState<MfaSetup | null>(null);
  const [mfaCode, setMfaCode] = useState('');
  const [mfaMessage, setMfaMessage] = useState<string | null>(null);
  const [mfaError, setMfaError] = useState<string | null>(null);
  const [recoveryCodes, setRecoveryCodes] = useState<string[] | null>(null);

  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>([]);
  const [loadingApiKeys, setLoadingApiKeys] = useState(true);
  const [newKeyName, setNewKeyName] = useState('');
  const [createdApiKey, setCreatedApiKey] = useState<string | null>(null);
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);

  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const passwordValid = useMemo(
    () =>
      currentPassword.length > 0 &&
      newPassword.length >= 8 &&
      newPassword === confirmPassword,
    [currentPassword, newPassword, confirmPassword],
  );

  const loadSessions = async () => {
    setLoadingSessions(true);
    setSessionError(null);
    try {
      setSessions(await securityApi.getSessions());
    } catch (error) {
      setSessionError(getErrorMessage(error, 'Unable to load active sessions.'));
    } finally {
      setLoadingSessions(false);
    }
  };

  const loadApiKeys = async () => {
    setLoadingApiKeys(true);
    try {
      setApiKeys(await apiKeyApi.list());
    } catch {
      // ignore
    } finally {
      setLoadingApiKeys(false);
    }
  };

  useEffect(() => {
    void loadSessions();
    void loadApiKeys();
  }, []);

  const handlePasswordChange = async () => {
    setPasswordMessage(null);
    setPasswordError(null);

    if (!passwordValid) {
      setPasswordError('Enter your current password, use at least 8 characters for the new password, and confirm it exactly.');
      return;
    }

    setPasswordBusy(true);
    try {
      await securityApi.changePassword(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordMessage('Your password has been changed successfully.');
    } catch (error) {
      setPasswordError(getErrorMessage(error, 'Unable to change your password.'));
    } finally {
      setPasswordBusy(false);
    }
  };

  const handleEmailChange = async () => {
    setEmailMessage(null);
    setEmailError(null);
    const normalizedEmail = newEmail.trim().toLowerCase();

    if (!normalizedEmail || !normalizedEmail.includes('@')) {
      setEmailError('Enter a valid email address.');
      return;
    }

    if (normalizedEmail === user?.email?.toLowerCase()) {
      setEmailError('That is already your current email address.');
      return;
    }

    setEmailBusy(true);
    try {
      await securityApi.changeEmail(normalizedEmail);
      setNewEmail('');
      setEmailMessage('Your email change request was submitted successfully.');
    } catch (error) {
      setEmailError(getErrorMessage(error, 'Unable to change your email address.'));
    } finally {
      setEmailBusy(false);
    }
  };

  const handleEnableMfa = async () => {
    setMfaBusy(true);
    setMfaMessage(null);
    setMfaError(null);
    try {
      const setup = await securityApi.enableMfa();
      setMfaSetup(setup);
      setMfaMessage('MFA setup initiated. Scan QR code or copy key to complete setup.');
    } catch (error) {
      setMfaError(getErrorMessage(error, 'Unable to start MFA enrollment.'));
    } finally {
      setMfaBusy(false);
    }
  };

  const handleVerifyMfa = async () => {
    setMfaBusy(true);
    setMfaMessage(null);
    setMfaError(null);
    setRecoveryCodes(null);

    try {
      const codes = await securityApi.verifyMfa(mfaCode.trim());
      setMfaCode('');
      setMfaSetup(null);
      setMfaMessage('Multi-factor authentication enabled successfully.');
      if (codes && Array.isArray(codes)) {
        setRecoveryCodes(codes);
      }
    } catch (error) {
      setMfaError(getErrorMessage(error, 'MFA verification code was invalid.'));
    } finally {
      setMfaBusy(false);
    }
  };

  const handleCreateApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    setApiKeyError(null);
    setCreatedApiKey(null);

    try {
      const res = await apiKeyApi.create(newKeyName.trim());
      setCreatedApiKey(res.apiKey);
      setNewKeyName('');
      await loadApiKeys();
    } catch (error) {
      setApiKeyError(getErrorMessage(error, 'Unable to create API key.'));
    }
  };

  const handleRevokeApiKey = async (id: string) => {
    try {
      await apiKeyApi.revoke(id);
      await loadApiKeys();
    } catch (error) {
      setApiKeyError(getErrorMessage(error, 'Unable to revoke API key.'));
    }
  };

  const handleRevokeSession = async (session: AuthSession) => {
    if (!session.token) return;
    try {
      await securityApi.revokeSession(session.token);
      await loadSessions();
    } catch (error) {
      setSessionError(getErrorMessage(error, 'Unable to revoke session.'));
    }
  };

  const handleRevokeAllSessions = async () => {
    setSessionError(null);
    try {
      await securityApi.revokeAllSessions();
      await loadSessions();
    } catch (error) {
      setSessionError(getErrorMessage(error, 'Unable to revoke all active sessions.'));
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteError(null);
    if (deleteConfirmation !== 'DELETE') {
      setDeleteError('Type DELETE exactly to confirm account deletion.');
      return;
    }

    setDeleteBusy(true);
    try {
      await securityApi.deleteAccount();
      logout();
      window.location.assign('/login');
    } catch (error) {
      setDeleteError(getErrorMessage(error, 'Unable to delete your account.'));
      setDeleteBusy(false);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      <header className="border-b border-stone/20 pb-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
            <ShieldCheck size={24} />
          </div>

          <div>
            <p className="ca-eyebrow">Account Protection</p>
            <h1 className="mt-1 font-serif text-3xl font-bold text-text-main sm:text-4xl">
              Security & Access Control
            </h1>
            <p className="mt-2 text-sm text-text-muted">
              Manage credentials, active sessions, API keys, and multi-factor authentication.
            </p>
          </div>
        </div>
      </header>

      {/* Password Change */}
      <section className="ca-card bg-surface shadow-scholar">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-stone/20 bg-canvas text-gold">
            <LockKeyhole size={18} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="ca-eyebrow">Credentials</p>
            <h2 className="font-serif text-lg font-bold text-text-main">
              Change Account Password
            </h2>

            <div className="mt-4 grid gap-4 md:grid-cols-3 font-sans text-xs">
              <label className="text-text-muted">
                Current Password
                <input
                  className="ca-input mt-1.5"
                  type="password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  autoComplete="current-password"
                />
              </label>

              <label className="text-text-muted">
                New Password
                <input
                  className="ca-input mt-1.5"
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  autoComplete="new-password"
                />
              </label>

              <label className="text-text-muted">
                Confirm New Password
                <input
                  className="ca-input mt-1.5"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  autoComplete="new-password"
                />
              </label>
            </div>

            {passwordError && (
              <p className="mt-3 text-xs text-clay font-mono">{passwordError}</p>
            )}

            {passwordMessage && (
              <p className="mt-3 flex items-center gap-2 text-xs text-emerald-900 dark:text-gold font-mono">
                <Check size={14} />
                {passwordMessage}
              </p>
            )}

            <button
              type="button"
              onClick={() => void handlePasswordChange()}
              disabled={passwordBusy}
              className="ca-btn-primary mt-5 px-4 py-2 text-xs"
            >
              {passwordBusy ? 'Updating Password...' : 'Update Password'}
            </button>
          </div>
        </div>
      </section>

      {/* Email Change */}
      <section className="ca-card bg-surface shadow-scholar">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-stone/20 bg-canvas text-gold">
            <Mail size={18} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="ca-eyebrow">Sign-in Email</p>
            <h2 className="font-serif text-lg font-bold text-text-main">
              Email Address Management
            </h2>

            <div className="mt-3 rounded-lg border border-stone/20 bg-canvas px-4 py-2.5 font-mono text-xs">
              <span className="text-text-muted">Current Primary Email: </span>
              <span className="font-bold text-text-main">{user?.email || 'Unavailable'}</span>
            </div>

            <label className="mt-4 block font-sans text-xs text-text-muted">
              New Email Address
              <input
                className="ca-input mt-1.5"
                type="email"
                value={newEmail}
                onChange={(event) => setNewEmail(event.target.value)}
                placeholder="scholar@connectafrica.org"
                autoComplete="email"
              />
            </label>

            {emailError && (
              <p className="mt-3 text-xs text-clay font-mono">{emailError}</p>
            )}

            {emailMessage && (
              <p className="mt-3 flex items-center gap-2 text-xs text-emerald-900 dark:text-gold font-mono">
                <Check size={14} />
                {emailMessage}
              </p>
            )}

            <button
              type="button"
              onClick={() => void handleEmailChange()}
              disabled={emailBusy}
              className="ca-btn-outline mt-4 px-4 py-2 text-xs"
            >
              {emailBusy ? 'Updating Email...' : 'Update Email Address'}
              {!emailBusy && <ChevronRight size={14} />}
            </button>
          </div>
        </div>
      </section>

      {/* MFA */}
      <section className="ca-card bg-surface shadow-scholar">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-stone/20 bg-canvas text-gold">
            <KeyRound size={18} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="ca-eyebrow">Multi-Factor Authentication</p>
            <h2 className="font-serif text-lg font-bold text-text-main">
              TOTP Security Setup
            </h2>
            <p className="mt-1 text-xs text-text-muted">
              Secure your account using time-based one-time passwords (TOTP).
            </p>

            {!mfaSetup ? (
              <button
                type="button"
                onClick={() => void handleEnableMfa()}
                disabled={mfaBusy}
                className="ca-btn-primary mt-4 px-4 py-2 text-xs"
              >
                {mfaBusy ? 'Initiating Setup...' : 'Enroll in MFA'}
              </button>
            ) : (
              <div className="mt-4 rounded-xl border border-gold/30 bg-gold/10 p-4">
                <p className="font-serif text-sm font-bold text-text-main">
                  Scan QR Code in Authenticator App
                </p>

                {(mfaSetup.qrCode || mfaSetup.qrCodeUrl) && (
                  <img
                    src={mfaSetup.qrCode || mfaSetup.qrCodeUrl}
                    alt="MFA QR Code"
                    className="mt-3 h-40 w-48 rounded-lg bg-white p-2 border border-stone/30"
                  />
                )}

                {mfaSetup.secret && (
                  <p className="mt-3 font-mono text-xs text-text-muted">
                    Secret Key: <span className="text-text-main font-bold">{mfaSetup.secret}</span>
                  </p>
                )}

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <input
                    className="ca-input sm:max-w-xs"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={12}
                    value={mfaCode}
                    onChange={(event) => setMfaCode(event.target.value)}
                    placeholder="Enter 6-digit code"
                  />

                  <button
                    type="button"
                    onClick={() => void handleVerifyMfa()}
                    disabled={mfaBusy || !mfaCode.trim()}
                    className="ca-btn-primary px-4 py-2 text-xs"
                  >
                    {mfaBusy ? 'Verifying...' : 'Verify Code'}
                  </button>
                </div>
              </div>
            )}

            {mfaError && (
              <p className="mt-3 text-xs text-clay font-mono">{mfaError}</p>
            )}

            {mfaMessage && (
              <p className="mt-3 flex items-center gap-2 text-xs text-emerald-900 dark:text-gold font-mono">
                <Check size={14} />
                {mfaMessage}
              </p>
            )}

            {recoveryCodes && recoveryCodes.length > 0 && (
              <div className="mt-4 rounded-xl border border-stone/20 bg-canvas p-4 font-mono text-xs">
                <p className="font-bold text-text-main">Backup Recovery Codes</p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-gold">
                  {recoveryCodes.map((code) => (
                    <div key={code} className="rounded border border-stone/20 bg-surface p-1.5 text-center">
                      {code}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Active Sessions */}
      <section className="ca-card bg-surface shadow-scholar">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="ca-eyebrow">Sessions</p>
            <h2 className="font-serif text-lg font-bold text-text-main">
              Active Sign-in Sessions
            </h2>
          </div>

          <button
            type="button"
            onClick={() => void loadSessions()}
            disabled={loadingSessions}
            className="ca-btn-outline px-3 py-1.5 text-xs font-mono"
          >
            <RefreshCw size={14} className={loadingSessions ? 'animate-spin' : ''} />
            Refresh Sessions
          </button>
        </div>

        {sessionError && (
          <div className="mt-4 ca-msg-error">
            {sessionError}
          </div>
        )}

        {loadingSessions ? (
          <div className="mt-4 font-mono text-xs text-text-muted">
            Loading active sessions...
          </div>
        ) : sessions.length === 0 ? (
          <div className="mt-4 font-mono text-xs text-text-muted">
            No active sessions found.
          </div>
        ) : (
          <div className="mt-4 space-y-3 font-sans">
            {sessions.map((session, index) => {
              const Icon = sessionIcon(session.userAgent);
              const label = session.userAgent || 'Unknown browser';

              return (
                <div
                  key={session.token || `${label}-${index}`}
                  className="rounded-xl border border-stone/20 bg-canvas p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-stone/20 bg-surface text-gold">
                      <Icon size={16} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-serif text-sm font-bold text-text-main">{label}</p>
                        {session.current && (
                          <span className="ca-badge-emerald">Current</span>
                        )}
                      </div>

                      <div className="mt-1 font-mono text-[11px] text-text-muted grid gap-1 sm:grid-cols-2">
                        <span>IP: {session.ipAddress || 'Unavailable'}</span>
                        <span>Last Active: {formatDate(session.lastActiveAt)}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => void handleRevokeSession(session)}
                      className="ca-btn-outline px-2 py-1 text-xs text-clay"
                      title="Revoke session"
                    >
                      <X size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {sessions.length > 1 && (
          <button
            type="button"
            onClick={() => void handleRevokeAllSessions()}
            className="ca-btn-danger mt-5 px-4 py-2 text-xs"
          >
            Revoke All Other Sessions
          </button>
        )}
      </section>

      {/* Programmatic API Keys */}
      <section className="ca-card bg-surface shadow-scholar">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-stone/20 bg-canvas text-gold">
            <KeyRound size={18} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="ca-eyebrow">Programmatic Keys</p>
            <h2 className="font-serif text-lg font-bold text-text-main">
              API Access Keys
            </h2>

            {apiKeyError && (
              <div className="mt-3 ca-msg-error">{apiKeyError}</div>
            )}

            {createdApiKey && (
              <div className="mt-3 rounded-xl border border-gold/30 bg-gold/10 p-3 font-mono text-xs">
                <p className="font-bold text-text-main">API Key Generated:</p>
                <input
                  type="text"
                  readOnly
                  value={createdApiKey}
                  className="mt-1 w-full rounded border border-stone/20 bg-surface px-2.5 py-1.5 text-gold font-bold"
                />
              </div>
            )}

            <form onSubmit={handleCreateApiKey} className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Key label (e.g. Research Script)"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="ca-input flex-1"
              />
              <button
                type="submit"
                disabled={!newKeyName.trim()}
                className="ca-btn-primary px-4 py-2 text-xs"
              >
                Generate Key
              </button>
            </form>

            {loadingApiKeys ? (
              <div className="mt-4 font-mono text-xs text-text-muted">
                Loading API keys...
              </div>
            ) : apiKeys.length > 0 && (
              <div className="mt-4 space-y-2">
                {apiKeys.map((key) => (
                  <div
                    key={key.id}
                    className="flex items-center justify-between rounded-lg border border-stone/20 bg-canvas p-3 font-mono text-xs"
                  >
                    <div>
                      <span className="font-bold text-text-main">{key.name}</span>
                      <span className="ml-2 text-text-muted">({key.prefix}...)</span>
                    </div>

                    {key.isActive && (
                      <button
                        type="button"
                        onClick={() => void handleRevokeApiKey(key.id)}
                        className="ca-btn-outline px-2 py-1 text-xs text-clay"
                      >
                        Revoke
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="ca-card border-clay/40 bg-surface shadow-scholar">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-clay/30 bg-clay/10 text-clay">
            <AlertTriangle size={18} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="ca-eyebrow text-clay">Danger Zone</p>
            <h2 className="font-serif text-lg font-bold text-text-main">
              Delete Account Record
            </h2>
            <p className="mt-1 text-xs text-text-muted">
              Permanent action. Type DELETE to confirm deletion.
            </p>

            <label className="mt-4 block font-mono text-xs text-text-muted">
              Confirmation Key
              <input
                className="ca-input mt-1.5 max-w-xs border-clay/30 focus:border-clay"
                value={deleteConfirmation}
                onChange={(event) => setDeleteConfirmation(event.target.value)}
                placeholder="DELETE"
              />
            </label>

            {deleteError && (
              <p className="mt-3 text-xs text-clay font-mono">{deleteError}</p>
            )}

            <button
              type="button"
              onClick={() => void handleDeleteAccount()}
              disabled={deleteBusy || deleteConfirmation !== 'DELETE'}
              className="ca-btn-danger mt-4 px-4 py-2 text-xs"
            >
              <Trash2 size={15} />
              {deleteBusy ? 'Deleting Account...' : 'Delete Account Record'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccountSecurityPage;
