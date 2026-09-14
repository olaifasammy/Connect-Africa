import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ChevronDown,
  LogIn,
  LogOut,
  Menu,
  Search,
  Shield,
  User,
  X,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

  const isAccountPage = location.pathname === '/account';

  const closeMobile = () => setMobileOpen(false);

  const handleLogout = () => {
    logout();
    closeMobile();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-ink/90 backdrop-blur-xl">
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
              className="h-7 w-7 object-contain transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_6px_rgba(217,164,65,0.5)]"
              style={{ filter: 'invert(72%) sepia(26%) saturate(1450%) hue-rotate(345deg) brightness(91%) contrast(85%)' }}
            />

            <span className="text-sm font-black tracking-[0.2em] text-gold transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(217,164,65,0.4)]">
              Connect-Africa
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            <Link
              to="/"
              className="rounded-lg px-4 py-2 text-sm font-medium text-cloud transition hover:bg-white/[0.05]"
            >
              Explore
            </Link>

            <Link
              to="/articles"
              className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-mist transition hover:bg-white/[0.05] hover:text-cloud"
            >
              Knowledge
              <ChevronDown className="h-3.5 w-3.5 opacity-50" />
            </Link>

            <Link
              to="/articles"
              className="rounded-lg px-4 py-2 text-sm font-medium text-mist transition hover:bg-white/[0.05] hover:text-cloud"
            >
              Graph
            </Link>

            <Link
              to="/articles"
              className="rounded-lg px-4 py-2 text-sm font-medium text-mist transition hover:bg-white/[0.05] hover:text-cloud"
            >
              Research
            </Link>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              to="/search"
              className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-sm text-mist transition hover:border-white/[0.12] hover:text-cloud"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
              <kbd className="hidden rounded border border-white/[0.08] px-1.5 py-0.5 text-[10px] text-mist lg:inline">
                /
              </kbd>
            </Link>

            {isAuthenticated ? (
              <div className="ml-2 flex items-center gap-1 border-l border-white/[0.07] pl-3">
                {!isAccountPage && (
                  <Link
                    to="/account"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-mist transition hover:bg-white/[0.05] hover:text-cloud"
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
                  className="rounded-lg p-2 text-mist transition hover:bg-white/[0.05] hover:text-cloud"
                  title="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="ml-2 flex items-center gap-1 border-l border-white/[0.07] pl-3">
                <Link
                  to="/login"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-mist transition hover:text-cloud"
                >
                  <LogIn className="h-4 w-4" />
                  Sign in
                </Link>

                <Link
                  to="/register"
                  className="rounded-lg bg-emerald px-4 py-2 text-sm font-semibold text-ink transition hover:bg-sage"
                >
                  Join
                </Link>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="rounded-lg border border-white/[0.07] p-2 text-mist transition hover:bg-white/[0.05] hover:text-cloud md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/[0.06] py-4 md:hidden">
            <div className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={closeMobile}
                className="rounded-lg px-3 py-3 text-sm font-medium text-cloud hover:bg-white/[0.05]"
              >
                Explore
              </Link>

              <Link
                to="/articles"
                onClick={closeMobile}
                className="rounded-lg px-3 py-3 text-sm font-medium text-mist hover:bg-white/[0.05] hover:text-cloud"
              >
                Knowledge
              </Link>

              <Link
                to="/articles"
                onClick={closeMobile}
                className="rounded-lg px-3 py-3 text-sm font-medium text-mist hover:bg-white/[0.05] hover:text-cloud"
              >
                Graph
              </Link>

              <Link
                to="/articles"
                onClick={closeMobile}
                className="rounded-lg px-3 py-3 text-sm font-medium text-mist hover:bg-white/[0.05] hover:text-cloud"
              >
                Research
              </Link>

              <div className="my-2 border-t border-white/[0.06]" />

              <Link
                to="/search"
                onClick={closeMobile}
                className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm text-mist hover:bg-white/[0.05] hover:text-cloud"
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
                      className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm text-mist hover:bg-white/[0.05] hover:text-cloud"
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
                    className="flex items-center gap-2 rounded-lg px-3 py-3 text-left text-sm text-mist hover:bg-white/[0.05] hover:text-cloud"
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
                    className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm text-mist hover:bg-white/[0.05] hover:text-cloud"
                  >
                    <LogIn className="h-4 w-4" />
                    Sign in
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMobile}
                    className="mt-1 rounded-lg bg-emerald px-3 py-3 text-center text-sm font-semibold text-ink"
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
