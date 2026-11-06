import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  UserPlus,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const passwordChecks = {
    length: password.length >= 8,
    letter: /[A-Za-z]/.test(password),
    number: /\d/.test(password),
  };

  const passwordReady =
    passwordChecks.length &&
    passwordChecks.letter &&
    passwordChecks.number;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!passwordReady) {
      setError(
        'Use a password with at least 8 characters, including a letter and a number.',
      );
      return;
    }

    setError('');
    setLoading(true);

    try {
      await register(
        email.trim(),
        password,
        firstName.trim(),
        lastName.trim(),
      );
      navigate('/account', { replace: true });
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to create your account. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-canvas text-text-main font-sans transition-colors duration-300">
      <div className="relative mx-auto flex min-h-screen w-full max-w-5xl items-center px-5 py-12 sm:px-8">
        <div className="grid w-full overflow-hidden rounded-2xl border border-stone/10 bg-surface shadow-lg lg:grid-cols-[0.9fr_1.1fr]">
          <section className="hidden border-r border-stone/10 p-10 lg:flex lg:flex-col lg:justify-between xl:p-12">
            <div>
              <p className="ca-eyebrow">Connect-Africa</p>

              <h1 className="mt-8 font-serif text-4xl font-bold tracking-tight text-text-main sm:text-5xl">
                Build your knowledge trail.
              </h1>

              <p className="mt-6 font-sans text-base leading-relaxed text-text-muted">
                Create an account to keep track of the knowledge you discover across people, places, cultures, institutions, and history.
              </p>
            </div>

            <div className="space-y-3">
              {[
                'Save important knowledge',
                'Return to your reading history',
                'Keep your searches within reach',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 font-sans text-xs text-text-muted">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-stone/20 bg-stone/5 text-text-main">
                    <Check className="h-3 w-3" />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="p-6 sm:p-10 xl:p-12">
            <div className="mx-auto max-w-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-stone/10 bg-stone/5 text-text-main">
                <UserPlus className="h-5 w-5" />
              </div>

              <p className="ca-eyebrow mt-8">Create Account</p>

              <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-text-main">
                Join Connect-Africa.
              </h2>

              <p className="mt-2 font-sans text-sm text-text-muted">
                Begin your personal scholarly archive.
              </p>

              {error && (
                <div role="alert" className="ca-msg-error mt-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="register-firstname"
                      className="mb-2 block font-sans text-xs font-bold uppercase tracking-widest text-text-muted"
                    >
                      First Name
                    </label>
                    <input
                      id="register-firstname"
                      type="text"
                      required
                      autoComplete="given-name"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      className="ca-input"
                      placeholder="Amina"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="register-lastname"
                      className="mb-2 block font-sans text-xs font-bold uppercase tracking-widest text-text-muted"
                    >
                      Last Name
                    </label>
                    <input
                      id="register-lastname"
                      type="text"
                      required
                      autoComplete="family-name"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                      className="ca-input"
                      placeholder="Diallo"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="register-email"
                    className="mb-2 block font-sans text-xs font-bold uppercase tracking-widest text-text-muted"
                  >
                    Email Address
                  </label>
                  <input
                    id="register-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="ca-input"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="register-password"
                    className="mb-2 block font-sans text-xs font-bold uppercase tracking-widest text-text-muted"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="register-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete="new-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="ca-input pr-12"
                      placeholder="At least 8 characters"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-stone transition hover:text-text-main"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-widest text-text-muted">
                    <span
                      className={
                        passwordChecks.length
                          ? 'text-[var(--accent-teal)] font-bold'
                          : ''
                      }
                    >
                      ✓ 8+ chars
                    </span>
                    <span
                      className={
                        passwordChecks.letter
                          ? 'text-[var(--accent-teal)] font-bold'
                          : ''
                      }
                    >
                      ✓ Letter
                    </span>
                    <span
                      className={
                        passwordChecks.number
                          ? 'text-[var(--accent-teal)] font-bold'
                          : ''
                      }
                    >
                      ✓ Number
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !passwordReady}
                  className="ca-btn-primary group flex w-full items-center justify-center gap-2 py-3 mt-6"
                >
                  {loading ? 'Creating account…' : 'Create Account'}
                  {!loading && (
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  )}
                </button>
              </form>

              <div className="mt-8 border-t border-stone/10 pt-6 text-center font-sans text-sm text-text-muted">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-bold text-text-main transition hover:underline"
                >
                  Sign in
                </Link>
              </div>

              <Link
                to="/"
                className="mt-4 block text-center font-mono text-[10px] uppercase tracking-widest text-stone/60 transition hover:text-text-main"
              >
                Return to Connect-Africa
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
