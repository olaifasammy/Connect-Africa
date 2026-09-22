import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  ChevronDown,
  LogIn,
  LogOut,
  Menu,
  Moon,
  Search,
  Shield,
  Sun,
  User,
  X,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { resolvedTheme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

  const isAccountPage = location.pathname === '/account';

  const closeMobile = () => setMobileOpen(false);

  const handleLogout = () => {
    logout();
    closeMobile();
    navigate('/login', { state: { message: 'Successfully signed out.' } });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-stone/20 bg-surface/90 backdrop-blur-xl transition-colors duration-300">
      <nav className="ca-container">
        <div className="flex h-[72px] items-center justify-between">
          <Link
            to="/"
            onClick={closeMobile}
            className="group flex items-center gap-3"
          >
            <img
              src="/images/africa.svg"
              alt="Connect-Africa Logo"
              className="h-7 w-7 object-contain transition-all duration-300 group-hover:scale-105"
              style={{ filter: 'invert(70%) sepia(30%) saturate(1200%) hue-rotate(345deg) brightness(90%)' }}
            />

            <span className="font-serif text-base font-bold tracking-widest text-emerald-900 dark:text-emerald-400 transition-all duration-300 group-hover:text-gold">
              CONNECT-AFRICA
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex font-sans">
            <Link
              to="/"
              className="rounded-lg px-4 py-2 text-sm font-medium text-text-main transition hover:bg-stone/10"
            >
              Explore
            </Link>

            <Link
              to="/articles"
              className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-text-muted transition hover:bg-stone/10 hover:text-text-main"
            >
              Knowledge
              <ChevronDown className="h-3.5 w-3.5 opacity-50" />
            </Link>

            <Link
              to="/articles"
              className="rounded-lg px-4 py-2 text-sm font-medium text-text-muted transition hover:bg-stone/10 hover:text-text-main"
            >
              Graph
            </Link>

            <Link
              to="/articles"
              className="rounded-lg px-4 py-2 text-sm font-medium text-text-muted transition hover:bg-stone/10 hover:text-text-main"
            >
              Research
            </Link>
          </div>

          <div className="hidden items-center gap-2 md:flex font-sans">
            <Link
              to="/search"
              className="flex items-center gap-2 rounded-lg border border-stone/20 bg-canvas/60 px-3 py-2 text-sm text-text-muted transition hover:border-gold hover:text-text-main"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
              <kbd className="hidden rounded border border-stone/30 px-1.5 py-0.5 font-mono text-[10px] text-text-muted lg:inline">
                /
              </kbd>
            </Link>

            {/* Theme Switcher Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-lg border border-stone/20 p-2 text-text-muted transition hover:border-gold hover:bg-stone/10 hover:text-text-main"
              title={`Switch to ${resolvedTheme === 'light' ? 'Dark' : 'Parchment Light'} mode`}
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'light' ? (
                <Moon className="h-4 w-4 text-emerald-900" />
              ) : (
                <Sun className="h-4 w-4 text-gold" />
              )}
            </button>

            {isAuthenticated ? (
              <div className="ml-2 flex items-center gap-1 border-l border-stone/20 pl-3">
                {!isAccountPage && (
                  <Link
                    to="/account"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-text-muted transition hover:bg-stone/10 hover:text-text-main"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden xl:inline">
                      {user?.firstName || 'Account'}
                    </span>
                  </Link>
                )}

                {isAdmin && (
                  <Link
                    to="/admin"
                    className="rounded-lg p-2 text-gold transition hover:bg-gold/10"
                    title="Administration"
                  >
                    <Shield className="h-4 w-4" />
                  </Link>
                )}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg p-2 text-text-muted transition hover:bg-stone/10 hover:text-text-main"
                  title="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="ml-2 flex items-center gap-1 border-l border-stone/20 pl-3">
                <Link
                  to="/login"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-text-muted transition hover:text-text-main"
                >
                  <LogIn className="h-4 w-4" />
                  Sign in
                </Link>

                <Link
                  to="/register"
                  className="ca-btn-primary"
                >
                  Join
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-lg border border-stone/20 p-2 text-text-muted transition hover:bg-stone/10"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'light' ? (
                <Moon className="h-4 w-4 text-emerald-900" />
              ) : (
                <Sun className="h-4 w-4 text-gold" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="rounded-lg border border-stone/20 p-2 text-text-muted transition hover:bg-stone/10 hover:text-text-main"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-stone/20 py-4 md:hidden font-sans">
            <div className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={closeMobile}
                className="rounded-lg px-3 py-3 text-sm font-medium text-text-main hover:bg-stone/10"
              >
                Explore
              </Link>

              <Link
                to="/articles"
                onClick={closeMobile}
                className="rounded-lg px-3 py-3 text-sm font-medium text-text-muted hover:bg-stone/10 hover:text-text-main"
              >
                Knowledge
              </Link>

              <Link
                to="/articles"
                onClick={closeMobile}
                className="rounded-lg px-3 py-3 text-sm font-medium text-text-muted hover:bg-stone/10 hover:text-text-main"
              >
                Graph
              </Link>

              <Link
                to="/articles"
                onClick={closeMobile}
                className="rounded-lg px-3 py-3 text-sm font-medium text-text-muted hover:bg-stone/10 hover:text-text-main"
              >
                Research
              </Link>

              <div className="my-2 border-t border-stone/20" />

              <Link
                to="/search"
                onClick={closeMobile}
                className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm text-text-muted hover:bg-stone/10 hover:text-text-main"
              >
                <Search className="h-4 w-4" />
                Search
              </Link>

              {isAuthenticated ? (
                <>
                  {!isAccountPage && (
                    <Link
                      to="/account"
                      onClick={closeMobile}
                      className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm text-text-muted hover:bg-stone/10 hover:text-text-main"
                    >
                      <User className="h-4 w-4" />
                      Account
                    </Link>
                  )}

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={closeMobile}
                      className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm text-gold hover:bg-gold/10"
                    >
                      <Shield className="h-4 w-4" />
                      Administration
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-lg px-3 py-3 text-left text-sm text-text-muted hover:bg-stone/10 hover:text-text-main"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMobile}
                    className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm text-text-muted hover:bg-stone/10 hover:text-text-main"
                  >
                    <LogIn className="h-4 w-4" />
                    Sign in
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMobile}
                    className="mt-1 ca-btn-primary w-full text-center"
                  >
                    Join Connect-Africa
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
