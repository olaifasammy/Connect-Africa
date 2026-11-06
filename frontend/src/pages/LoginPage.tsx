import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, LogIn, ShieldCheck, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(
    (location.state as { message?: string })?.message || ''
  );
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      await login(email.trim(), password);
      setLoading(false);
      setRedirecting(true);
      setSuccessMessage('Login successful! Redirecting to your workspace in 3 seconds...');
      setTimeout(() => {
        navigate('/account', { replace: true });
      }, 3000);
    } catch (err: unknown) {
      setLoading(false);
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to sign in. Please check your credentials and try again.',
      );
    }
  };

  return (
    <div className="relative min-h-screen bg-canvas text-text-main font-sans transition-colors duration-300">
      <div className="relative mx-auto flex min-h-screen w-full max-w-5xl items-center px-5 py-12 sm:px-8">
        <div className="grid w-full overflow-hidden rounded-2xl border border-stone/10 bg-surface shadow-lg lg:grid-cols-[1fr_1fr]">
          <section className="hidden border-r border-stone/10 p-10 lg:flex lg:flex-col lg:justify-between xl:p-12">
            <div>
              <p className="ca-eyebrow">Connect-Africa</p>

              <h1 className="mt-8 font-serif text-4xl font-bold tracking-tight text-text-main sm:text-5xl">
                Africa, connected.
              </h1>

              <p className="mt-6 font-sans text-base leading-relaxed text-text-muted">
                Return to a knowledge platform built around entities, relationships, evidence, and discovery.
              </p>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-stone/10 bg-stone/5 p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-text-main" />
              <div>
                <p className="text-xs font-bold text-text-main">
                  Your account remains secure
                </p>
                <p className="mt-1 font-sans text-xs text-text-muted">
                  Personal activity and account controls are protected behind authenticated access.
                </p>
              </div>
            </div>
          </section>

          <section className="p-6 sm:p-10 xl:p-12">
            <div className="mx-auto max-w-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-stone/10 bg-stone/5 text-text-main">
                <LogIn className="h-5 w-5" />
              </div>

              <p className="ca-eyebrow mt-8">Account Access</p>

              <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-text-main">
                Welcome back.
              </h2>

              <p className="mt-2 font-sans text-sm text-text-muted">
                Sign in to continue your knowledge trail.
              </p>

              {error && (
                <div role="alert" className="ca-msg-error mt-6">
                  {error}
                </div>
              )}

              {successMessage && (
                <div role="status" className="ca-msg-success mt-6">
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="login-email"
                    className="mb-2 block font-sans text-xs font-bold uppercase tracking-widest text-text-muted"
                  >
                    Email Address
                  </label>
                  <input
                    id="login-email"
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
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <label
                      htmlFor="login-password"
                      className="block font-sans text-xs font-bold uppercase tracking-widest text-text-muted"
                    >
                      Password
                    </label>

                    <Link
                      to="/reset-password"
                      className="font-mono text-xs text-text-muted transition hover:text-text-main"
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
                      className="ca-input pr-12"
                      placeholder="Enter your password"
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
                </div>

                <button
                  type="submit"
                  disabled={loading || redirecting}
                  className="ca-btn-primary group flex w-full items-center justify-center gap-2 py-3"
                >
                  {(loading || redirecting) && (
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                  )}
                  {loading
                    ? 'Signing in…'
                    : redirecting
                      ? 'Redirecting…'
                      : 'Sign in'}
                  {!loading && !redirecting && (
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  )}
                </button>
              </form>

              <div className="mt-8 border-t border-stone/10 pt-6 text-center font-sans text-sm text-text-muted">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="font-bold text-text-main transition hover:underline"
                >
                  Create one
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

export default LoginPage;
