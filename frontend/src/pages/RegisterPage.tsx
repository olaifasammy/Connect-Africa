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
    <div className="relative min-h-screen overflow-hidden bg-ink text-cloud">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-10rem] top-[-8rem] h-[32rem] w-[32rem] rounded-full bg-emerald/10 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-[-8rem] h-[30rem] w-[30rem] rounded-full bg-terracotta/5 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-5 py-12 sm:px-8">
        <div className="grid w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-forest/80 shadow-soft lg:grid-cols-[0.9fr_1.1fr]">
          <section className="hidden border-r border-white/[0.06] p-10 lg:flex lg:flex-col lg:justify-between xl:p-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sage">
                CONNECT-AFRICA
              </p>

              <h1 className="mt-12 max-w-md text-5xl font-semibold leading-[1.05] tracking-tight text-cloud xl:text-6xl">
                Build your
                <br />
                knowledge trail.
              </h1>

              <p className="mt-7 max-w-md text-base leading-7 text-mist">
                Create an account to keep track of the knowledge you discover
                across people, places, cultures, institutions, and history.
              </p>
            </div>

            <div className="space-y-3">
              {[
                'Save important knowledge',
                'Return to your reading history',
                'Keep your searches within reach',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-mist">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald/10 text-emerald">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="p-6 sm:p-10 xl:p-14">
            <div className="mx-auto max-w-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald/20 bg-brand text-emerald shadow-glow">
                <UserPlus className="h-5 w-5" />
              </div>

              <p className="ca-eyebrow mt-8">Create account</p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-cloud">
                Join Connect-Africa.
              </h2>

              <p className="mt-3 text-sm leading-6 text-mist">
                Create your personal space for discovering African knowledge.
              </p>

              {error && (
                <div
                  role="alert"
                  className="mt-6 rounded-2xl border border-red-400/20 bg-red-500/[0.08] px-4 py-3 text-sm leading-6 text-red-200"
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="register-first-name"
                      className="mb-2 block text-sm font-medium text-cloud"
                    >
                      First name
                    </label>
                    <input
                      id="register-first-name"
                      type="text"
                      required
                      autoComplete="given-name"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      className="w-full rounded-xl border border-white/[0.08] bg-ink/80 px-4 py-3 text-sm text-cloud outline-none transition placeholder:text-mist/60 focus:border-emerald/50 focus:ring-2 focus:ring-emerald/10"
                      placeholder="First name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="register-last-name"
                      className="mb-2 block text-sm font-medium text-cloud"
                    >
                      Last name
                    </label>
                    <input
                      id="register-last-name"
                      type="text"
                      required
                      autoComplete="family-name"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                      className="w-full rounded-xl border border-white/[0.08] bg-ink/80 px-4 py-3 text-sm text-cloud outline-none transition placeholder:text-mist/60 focus:border-emerald/50 focus:ring-2 focus:ring-emerald/10"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="register-email"
                    className="mb-2 block text-sm font-medium text-cloud"
                  >
                    Email address
                  </label>
                  <input
                    id="register-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-xl border border-white/[0.08] bg-ink/80 px-4 py-3 text-sm text-cloud outline-none transition placeholder:text-mist/60 focus:border-emerald/50 focus:ring-2 focus:ring-emerald/10"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="register-password"
                    className="mb-2 block text-sm font-medium text-cloud"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="register-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={8}
                      autoComplete="new-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="w-full rounded-xl border border-white/[0.08] bg-ink/80 px-4 py-3 pr-12 text-sm text-cloud outline-none transition placeholder:text-mist/60 focus:border-emerald/50 focus:ring-2 focus:ring-emerald/10"
                      placeholder="Create a secure password"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-mist transition hover:bg-white/[0.05] hover:text-cloud"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  <div className="mt-3 grid gap-2 text-xs sm:grid-cols-3">
                    {[
                      ['8+ characters', passwordChecks.length],
                      ['A letter', passwordChecks.letter],
                      ['A number', passwordChecks.number],
                    ].map(([label, valid]) => (
                      <div
                        key={String(label)}
                        className={`flex items-center gap-2 ${
                          valid ? 'text-emerald' : 'text-mist'
                        }`}
                      >
                        <Check className="h-3.5 w-3.5" />
                        {label}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald px-5 py-3 text-sm font-semibold text-ink transition hover:bg-sage disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? 'Creating account…' : 'Create account'}
                  {!loading && (
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  )}
                </button>
              </form>

              <div className="mt-8 border-t border-white/[0.06] pt-6 text-center text-sm text-mist">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-sage transition hover:text-cloud"
                >
                  Sign in
                </Link>
              </div>

              <Link
                to="/"
                className="mt-5 block text-center text-xs text-mist/70 transition hover:text-mist"
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
