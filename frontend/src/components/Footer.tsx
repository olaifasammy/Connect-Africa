import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ChevronRight,
  Globe2,
  Heart,
} from 'lucide-react';

const exploreLinks = [
  { label: 'Search knowledge', to: '/search' },
  { label: 'Explore Africa', to: '/explore' },
  { label: 'Entities', to: '/articles' },
  { label: 'Articles', to: '/articles' },
];

const knowledgeLinks = [
  { label: 'Knowledge graph', to: '/articles' },
  { label: 'Relationships', to: '/articles' },
  { label: 'Sources', to: '/articles' },
  { label: 'Research', to: '/articles' },
];

const accountLinks = [
  { label: 'Account center', to: '/account' },
  { label: 'Settings', to: '/account/settings' },
  { label: 'Security', to: '/account/security' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Security Protocols', href: '#' },
  { label: 'Terms of Access', href: '#' },
];

const FooterLink: React.FC<{
  to: string;
  children: React.ReactNode;
}> = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="group inline-flex items-center gap-2 font-sans text-sm text-text-muted transition-colors duration-200 hover:text-emerald-900 dark:hover:text-gold"
    >
      <ChevronRight className="h-3 w-3 text-gold/60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-gold" />
      <span>{children}</span>
    </Link>
  </li>
);

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-stone/20 bg-surface text-text-muted transition-colors duration-300">
      {/* Subtle atmospheric gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_50%_0%,rgba(201,168,106,0.06),transparent_65%)]"
      />

      <div className="relative">
        {/* Institutional signal */}
        <div className="border-b border-stone/15">
          <div className="ca-container flex min-h-12 items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-900 dark:bg-emerald-400 shadow-sm" />
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-text-muted">
                African Knowledge Infrastructure & Archive
              </span>
            </div>

            <div className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted/60 sm:flex">
              <Globe2 className="h-3.5 w-3.5" />
              <span>Past · Present · Future</span>
            </div>
          </div>
        </div>

        {/* Main footer */}
        <div className="ca-container py-16 sm:py-20">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
            {/* Brand / statement */}
            <div className="lg:col-span-5">
              <Link
                to="/"
                className="group inline-flex items-center gap-3"
                aria-label="Connect-Africa home"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/30 bg-canvas text-gold transition-all duration-300 group-hover:border-gold">
                  <img
                    src="/images/africa.svg"
                    alt="Connect-Africa Logo"
                    className="h-6 w-6 object-contain transition-all duration-300 group-hover:scale-105"
                    style={{ filter: 'invert(70%) sepia(30%) saturate(1200%) hue-rotate(345deg) brightness(90%)' }}
                  />
                </div>

                <div>
                  <span className="block font-serif text-lg font-bold tracking-tight text-text-main transition-colors group-hover:text-gold">
                    Connect-Africa
                  </span>
                  <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.22em] text-gold">
                    Knowledge Platform
                  </span>
                </div>
              </Link>

              <div className="mt-7 max-w-xl">
                <h2 className="max-w-lg font-serif text-2xl font-bold leading-tight tracking-tight text-text-main sm:text-3xl">
                  African knowledge,
                  <br />
                  connected by relationships.
                </h2>

                <p className="mt-5 max-w-lg font-sans text-sm leading-relaxed text-text-muted">
                  Organizing, preserving, and expanding structured knowledge about Africa’s people, history, cultures, institutions, and futures.
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:col-span-7 lg:pl-8">
              <div>
                <h3 className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-text-main/70 font-semibold">
                  Explore
                </h3>

                <ul className="space-y-3.5">
                  {exploreLinks.map((item) => (
                    <FooterLink key={item.to + item.label} to={item.to}>
                      {item.label}
                    </FooterLink>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-text-main/70 font-semibold">
                  Knowledge
                </h3>

                <ul className="space-y-3.5">
                  {knowledgeLinks.map((item) => (
                    <FooterLink key={item.to + item.label} to={item.to}>
                      {item.label}
                    </FooterLink>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-text-main/70 font-semibold">
                  Account
                </h3>

                <ul className="space-y-3.5">
                  {accountLinks.map((item) => (
                    <FooterLink key={item.to + item.label} to={item.to}>
                      {item.label}
                    </FooterLink>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stone/15 font-sans">
          <div className="ca-container flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-text-muted">
              <span>© {year} Connect-Africa</span>
              <span className="text-stone/40">·</span>
              <span>Preserving African Knowledge Infrastructure</span>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {legalLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group inline-flex items-center gap-1 text-[11px] text-text-muted transition-colors hover:text-text-main"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-2.5 w-2.5 opacity-0 transition-opacity group-hover:opacity-60" />
                </a>
              ))}

              <span className="hidden h-3 w-px bg-stone/20 sm:block" />

              <span className="inline-flex items-center gap-1.5 text-[11px] text-text-muted">
                Built with
                <Heart className="h-3 w-3 text-clay fill-clay" />
                <span>for Africa</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
