import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, LogIn, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setError('');
    setLoading(true);

    try {
      await login(email.trim(), password);
      navigate('/account', { replace: true });
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to sign in. Please check your credentials and try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink text-cloud">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-emerald/10 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-[32rem] w-[32rem] rounded-full bg-gold/5 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-5 py-12 sm:px-8">
        <div className="grid w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-forest/80 shadow-soft lg:grid-cols-[1.05fr_0.95fr]">
          <section className="hidden border-r border-white/[0.06] p-10 lg:flex lg:flex-col lg:justify-between xl:p-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sage">
                CONNECT-AFRICA
              </p>

              <h1 className="mt-12 max-w-xl text-5xl font-semibold leading-[1.05] tracking-tight text-cloud xl:text-6xl">
                Africa,
                <br />
                connected.
              </h1>

              <p className="mt-7 max-w-lg text-base leading-7 text-mist">
                Return to a knowledge platform built around entities,
                relationships, evidence, and discovery.
              </p>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald" />
              <div>
                <p className="text-sm font-medium text-cloud">
                  Your account remains yours
                </p>
                <p className="mt-1 text-xs leading-5 text-mist">
                  Personal activity and account controls are protected behind
                  authenticated access.
                </p>
              </div>
            </div>
          </section>

          <section className="p-6 sm:p-10 xl:p-14">
            <div className="mx-auto max-w-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald/20 bg-brand text-emerald shadow-glow">
                <LogIn className="h-5 w-5" />
              </div>

              <p className="ca-eyebrow mt-8">Account access</p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-cloud">
                Welcome back.
              </h2>

              <p className="mt-3 text-sm leading-6 text-mist">
                Sign in to continue your knowledge trail.
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
                <div>
                  <label
                    htmlFor="login-email"
                    className="mb-2 block text-sm font-medium text-cloud"
                  >
                    Email address
                  </label>
                  <input
                    id="login-email"
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
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <label
                      htmlFor="login-password"
                      className="block text-sm font-medium text-cloud"
                    >
                      Password
                    </label>

                    <Link
                      to="/reset-password"
                      className="text-xs font-medium text-sage transition hover:text-cloud"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="w-full rounded-xl border border-white/[0.08] bg-ink/80 px-4 py-3 pr-12 text-sm text-cloud outline-none transition placeholder:text-mist/60 focus:border-emerald/50 focus:ring-2 focus:ring-emerald/10"
                      placeholder="Enter your password"
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
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald px-5 py-3 text-sm font-semibold text-ink transition hover:bg-sage disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? 'Signing in…' : 'Sign in'}
                  {!loading && (
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  )}
                </button>
              </form>

              <div className="mt-8 border-t border-white/[0.06] pt-6 text-center text-sm text-mist">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="font-medium text-sage transition hover:text-cloud"
                >
                  Create one
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

export default LoginPage;
