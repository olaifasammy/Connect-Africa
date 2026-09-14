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
  type AuthSession,
  type MfaSetup,
} from '../../services/api';

const inputClass =
  'w-full rounded-xl border border-white/[0.09] bg-black/20 px-4 py-3 text-sm text-cloud outline-none transition placeholder:text-mist/50 focus:border-emerald/50 focus:ring-2 focus:ring-emerald/10';

const buttonClass =
  'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50';

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

  if (
    value.includes('android') ||
    value.includes('iphone') ||
    value.includes('ipad')
  ) {
    return Smartphone;
  }

  if (
    value.includes('windows') ||
    value.includes('macintosh') ||
    value.includes('linux')
  ) {
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
      setSessionError(
        getErrorMessage(error, 'Unable to load active sessions.'),
      );
    } finally {
      setLoadingSessions(false);
    }
  };

  useEffect(() => {
    void loadSessions();
  }, []);

  const handlePasswordChange = async () => {
    setPasswordMessage(null);
    setPasswordError(null);

    if (!passwordValid) {
      setPasswordError(
        'Enter your current password, use at least 8 characters for the new password, and confirm it exactly.',
      );
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
      setPasswordError(
        getErrorMessage(error, 'Unable to change your password.'),
      );
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
      setEmailMessage(
        'Your email change request was submitted successfully.',
      );
    } catch (error) {
      setEmailError(
        getErrorMessage(error, 'Unable to change your email address.'),
      );
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
      setMfaMessage(
        'MFA setup has been initiated. Complete verification to finish enrollment.',
      );
    } catch (error) {
      setMfaError(
        getErrorMessage(error, 'Unable to start MFA enrollment.'),
      );
    } finally {
      setMfaBusy(false);
    }
  };

  const handleVerifyMfa = async () => {
    setMfaBusy(true);
    setMfaMessage(null);
    setMfaError(null);

    try {
      await securityApi.verifyMfa(mfaCode.trim());
      setMfaCode('');
      setMfaSetup(null);
      setMfaMessage('Multi-factor authentication is now enabled.');
    } catch (error) {
      setMfaError(
        getErrorMessage(error, 'The MFA verification code was not accepted.'),
      );
    } finally {
      setMfaBusy(false);
    }
  };

  const handleRevokeSession = async (session: AuthSession) => {
    if (!session.token) return;

    try {
      await securityApi.revokeSession(session.token);
      await loadSessions();
    } catch (error) {
      setSessionError(
        getErrorMessage(error, 'Unable to revoke this session.'),
      );
    }
  };

  const handleRevokeAllSessions = async () => {
    setSessionError(null);

    try {
      await securityApi.revokeAllSessions();
      await loadSessions();
    } catch (error) {
      setSessionError(
        getErrorMessage(error, 'Unable to revoke active sessions.'),
      );
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
      setDeleteError(
        getErrorMessage(error, 'Unable to delete your account.'),
      );
      setDeleteBusy(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="border-b border-white/[0.07] pb-7">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald/20 bg-emerald/10 text-emerald">
            <ShieldCheck size={23} />
          </div>

          <div>
            <p className="ca-eyebrow">Account security</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-cloud sm:text-3xl">
              Protect your account
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-mist">
              Manage your credentials, authentication methods, and active
              sessions from one place.
            </p>
          </div>
        </div>
      </header>

      <section className="ca-surface rounded-2xl p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-sage">
            <LockKeyhole size={19} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage">
              Password
            </p>
            <h2 className="mt-1 text-lg font-semibold text-cloud">
              Change your password
            </h2>
            <p className="mt-1 text-sm text-mist">
              Use a strong password that you do not reuse elsewhere.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <label className="text-sm text-mist">
                Current password
                <input
                  className={`${inputClass} mt-2`}
                  type="password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  autoComplete="current-password"
                />
              </label>

              <label className="text-sm text-mist">
                New password
                <input
                  className={`${inputClass} mt-2`}
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  autoComplete="new-password"
                />
              </label>

              <label className="text-sm text-mist">
                Confirm password
                <input
                  className={`${inputClass} mt-2`}
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  autoComplete="new-password"
                />
              </label>
            </div>

            {passwordError && (
              <p className="mt-4 text-sm text-red-300">{passwordError}</p>
            )}

            {passwordMessage && (
              <p className="mt-4 flex items-center gap-2 text-sm text-sage">
                <Check size={16} />
                {passwordMessage}
              </p>
            )}

            <button
              type="button"
              onClick={() => void handlePasswordChange()}
              disabled={passwordBusy}
              className={`${buttonClass} mt-5 bg-emerald text-ink hover:bg-sage`}
            >
              {passwordBusy ? 'Changing…' : 'Change password'}
            </button>
          </div>
        </div>
      </section>

      <section className="ca-surface rounded-2xl p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-sage">
            <Mail size={19} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage">
              Email address
            </p>
            <h2 className="mt-1 text-lg font-semibold text-cloud">
              Manage your sign-in email
            </h2>

            <div className="mt-4 rounded-xl border border-white/[0.06] bg-black/10 px-4 py-3 text-sm">
              <span className="text-mist">Current email</span>
              <p className="mt-1 break-all font-medium text-cloud">
                {user?.email || 'Unavailable'}
              </p>
            </div>

            <label className="mt-4 block text-sm text-mist">
              New email address
              <input
                className={`${inputClass} mt-2`}
                type="email"
                value={newEmail}
                onChange={(event) => setNewEmail(event.target.value)}
                placeholder="name@example.com"
                autoComplete="email"
              />
            </label>

            {emailError && (
              <p className="mt-4 text-sm text-red-300">{emailError}</p>
            )}

            {emailMessage && (
              <p className="mt-4 flex items-center gap-2 text-sm text-sage">
                <Check size={16} />
                {emailMessage}
              </p>
            )}

            <button
              type="button"
              onClick={() => void handleEmailChange()}
              disabled={emailBusy}
              className={`${buttonClass} mt-5 border border-white/[0.09] bg-white/[0.05] text-cloud hover:bg-white/[0.08]`}
            >
              {emailBusy ? 'Updating…' : 'Update email'}
              {!emailBusy && <ChevronRight size={16} />}
            </button>
          </div>
        </div>
      </section>

      <section className="ca-surface rounded-2xl p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-gold">
            <KeyRound size={19} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage">
              Multi-factor authentication
            </p>
            <h2 className="mt-1 text-lg font-semibold text-cloud">
              Add another layer of protection
            </h2>
            <p className="mt-1 text-sm leading-6 text-mist">
              MFA reduces the risk of account takeover if your password is
              compromised.
            </p>

            {!mfaSetup ? (
              <button
                type="button"
                onClick={() => void handleEnableMfa()}
                disabled={mfaBusy}
                className={`${buttonClass} mt-5 bg-gold text-ink hover:bg-sand`}
              >
                {mfaBusy ? 'Starting setup…' : 'Set up MFA'}
              </button>
            ) : (
              <div className="mt-5 rounded-xl border border-gold/20 bg-gold/5 p-4">
                <p className="text-sm font-medium text-cloud">
                  Complete MFA verification
                </p>

                {mfaSetup.qrCode && (
                  <img
                    src={mfaSetup.qrCode}
                    alt="MFA QR code"
                    className="mt-4 h-48 w-48 rounded-xl bg-white p-3"
                  />
                )}

                {mfaSetup.qrCodeUrl && !mfaSetup.qrCode && (
                  <img
                    src={mfaSetup.qrCodeUrl}
                    alt="MFA QR code"
                    className="mt-4 h-48 w-48 rounded-xl bg-white p-3"
                  />
                )}

                {mfaSetup.secret && (
                  <p className="mt-4 break-all text-xs text-mist">
                    Manual setup key: {mfaSetup.secret}
                  </p>
                )}

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <input
                    className={`${inputClass} sm:max-w-xs`}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={12}
                    value={mfaCode}
                    onChange={(event) => setMfaCode(event.target.value)}
                    placeholder="Verification code"
                  />

                  <button
                    type="button"
                    onClick={() => void handleVerifyMfa()}
                    disabled={mfaBusy || !mfaCode.trim()}
                    className={`${buttonClass} bg-emerald text-ink hover:bg-sage`}
                  >
                    {mfaBusy ? 'Verifying…' : 'Verify MFA'}
                  </button>
                </div>
              </div>
            )}

            {mfaError && (
              <p className="mt-4 text-sm text-red-300">{mfaError}</p>
            )}

            {mfaMessage && (
              <p className="mt-4 flex items-center gap-2 text-sm text-sage">
                <Check size={16} />
                {mfaMessage}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="ca-surface rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage">
              Active sessions
            </p>
            <h2 className="mt-1 text-lg font-semibold text-cloud">
              Where you are signed in
            </h2>
            <p className="mt-1 text-sm text-mist">
              Review and revoke sessions you no longer recognize.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void loadSessions()}
            disabled={loadingSessions}
            className={`${buttonClass} border border-white/[0.09] bg-white/[0.04] text-cloud hover:bg-white/[0.08]`}
          >
            <RefreshCw
              size={16}
              className={loadingSessions ? 'animate-spin' : ''}
            />
            Refresh
          </button>
        </div>

        {sessionError && (
          <div className="mt-5 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-200">
            {sessionError}
          </div>
        )}

        {loadingSessions ? (
          <div className="mt-5 flex items-center gap-3 text-sm text-mist">
            <RefreshCw size={16} className="animate-spin" />
            Loading active sessions…
          </div>
        ) : sessions.length === 0 ? (
          <div className="mt-5 rounded-xl border border-white/[0.06] bg-black/10 px-4 py-5 text-sm text-mist">
            No active sessions were returned by the server.
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {sessions.map((session, index) => {
              const Icon = sessionIcon(session.userAgent);
              const label =
                session.userAgent || 'Unknown device or browser';

              return (
                <div
                  key={session.token || `${label}-${index}`}
                  className="rounded-xl border border-white/[0.06] bg-black/10 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-sage">
                      <Icon size={17} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium text-cloud">
                          {label}
                        </p>

                        {session.current && (
                          <span className="rounded-full bg-emerald/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-sage">
                            Current
                          </span>
                        )}
                      </div>

                      <div className="mt-2 grid gap-1 text-xs text-mist sm:grid-cols-2">
                        <span>
                          IP: {session.ipAddress || 'Not available'}
                        </span>
                        <span>
                          Last active: {formatDate(session.lastActiveAt)}
                        </span>
                        <span>
                          Created: {formatDate(session.createdAt)}
                        </span>
                        <span>
                          Expires: {formatDate(session.expiresAt)}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => void handleRevokeSession(session)}
                      className="shrink-0 rounded-lg p-2 text-mist transition hover:bg-red-400/10 hover:text-red-300"
                      title="Revoke session"
                      aria-label="Revoke session"
                    >
                      <X size={17} />
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
            className={`${buttonClass} mt-5 border border-red-400/20 bg-red-400/5 text-red-200 hover:bg-red-400/10`}
          >
            Revoke all sessions
          </button>
        )}
      </section>

      <section className="rounded-2xl border border-red-400/20 bg-red-400/[0.035] p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-400/10 text-red-300">
            <AlertTriangle size={19} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-300">
              Danger zone
            </p>
            <h2 className="mt-1 text-lg font-semibold text-cloud">
              Delete your account
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-mist">
              This is a destructive action. Your account deletion is handled
              by the authenticated backend and cannot be undone from this
              interface.
            </p>

            <label className="mt-5 block max-w-md text-sm text-mist">
              Type DELETE to confirm
              <input
                className={`${inputClass} mt-2 border-red-400/20 focus:border-red-400/50`}
                value={deleteConfirmation}
                onChange={(event) =>
                  setDeleteConfirmation(event.target.value)
                }
                placeholder="DELETE"
                autoComplete="off"
              />
            </label>

            {deleteError && (
              <p className="mt-4 text-sm text-red-300">{deleteError}</p>
            )}

            <button
              type="button"
              onClick={() => void handleDeleteAccount()}
              disabled={deleteBusy || deleteConfirmation !== 'DELETE'}
              className={`${buttonClass} mt-5 bg-red-400/10 text-red-200 hover:bg-red-400/20`}
            >
              <Trash2 size={16} />
              {deleteBusy ? 'Deleting account…' : 'Delete account'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccountSecurityPage;
