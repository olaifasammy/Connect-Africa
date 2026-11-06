import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
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
    <header className="sticky top-0 z-50 border-b border-stone/10 bg-surface/90 backdrop-blur-xl transition-colors duration-300">
      <nav className="ca-container">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            onClick={closeMobile}
            className="group flex items-center gap-3"
          >
            <div className="flex h-6 w-6 items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <img
                src="/images/africa.svg"
                alt=""
                className="h-full w-full object-contain brightness-0 transition-all duration-300 dark:invert"
              />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-text-main transition-all duration-300 group-hover:text-text-muted">
              Connect-Africa
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex font-sans">
            <Link
              to="/articles"
              className="px-4 py-2 text-sm font-medium text-text-muted transition hover:text-text-main"
            >
              Archive
            </Link>

            <Link
              to="/articles"
              className="px-4 py-2 text-sm font-medium text-text-muted transition hover:text-text-main"
            >
              Graph
            </Link>
          </div>

          <div className="hidden items-center gap-5 md:flex font-sans">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 text-text-muted transition hover:text-text-main"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </button>

            <Link
              to="/search"
              className="text-text-muted transition hover:text-text-main"
              aria-label="Search"
            >
              <Search className="h-5 w-5" strokeWidth={1.5} />
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/account"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-text-main text-[10px] font-bold text-white uppercase"
                >
                  {user?.firstName?.charAt(0) || 'U'}
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-5">
                <Link
                  to="/login"
                  className="text-sm font-medium text-text-muted transition hover:text-text-main"
                >
                  Sign in
                </Link>

                <Link
                  to="/register"
                  className="rounded-full bg-text-main px-5 py-2 text-sm font-medium text-white transition hover:bg-stone/80"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="p-2 text-text-muted transition hover:text-text-main"
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
          <div className="border-t border-stone/10 py-4 md:hidden font-sans">
            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-2 rounded-lg px-3 py-3 text-left text-sm text-text-muted hover:bg-stone/10 hover:text-text-main"
              >
                {resolvedTheme === 'light' ? (
                  <>
                    <Moon className="h-4 w-4" />
                    Dark Mode
                  </>
                ) : (
                  <>
                    <Sun className="h-4 w-4" />
                    Light Mode
                  </>
                )}
              </button>

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

              <div className="my-2 border-t border-stone/10" />

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
                      className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm text-[var(--accent-amber)] hover:bg-[var(--accent-amber)]/10"
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
