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
  { label: 'Entities', to: '/entities' },
  { label: 'Articles', to: '/articles' },
];

const knowledgeLinks = [
  { label: 'Knowledge graph', to: '/graph' },
  { label: 'Relationships', to: '/graph' },
  { label: 'Sources', to: '/sources' },
  { label: 'Research', to: '/research' },
];

const accountLinks = [
  { label: 'Account center', to: '/account' },
  { label: 'Settings', to: '/account/settings' },
  { label: 'Security', to: '/account/security' },
];

const legalLinks = [
  { label: 'Privacy', href: '#' },
  { label: 'Security', href: '#' },
  { label: 'Terms', href: '#' },
];

const FooterLink: React.FC<{
  to: string;
  children: React.ReactNode;
}> = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="group inline-flex items-center gap-2 text-sm text-mist/70 transition-colors duration-200 hover:text-cloud"
    >
      <ChevronRight className="h-3 w-3 text-gold/50 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-gold" />
      <span>{children}</span>
    </Link>
  </li>
);

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-ink text-mist">
      {/* Subtle atmospheric field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_50%_0%,rgba(34,160,107,0.08),transparent_62%)]"
      />

      <div className="relative">
        {/* Institutional signal */}
        <div className="border-b border-white/[0.05]">
          <div className="ca-container flex min-h-12 items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald shadow-[0_0_12px_rgba(34,160,107,0.65)]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-mist/45">
                African Knowledge Infrastructure
              </span>
            </div>

            <div className="hidden items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-mist/30 sm:flex">
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
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gold/25 bg-forest/50 text-gold transition-all duration-300 group-hover:border-gold/50 group-hover:bg-forest">
                  <img
                    src="/images/africa.svg"
                    alt="Connect-Africa Logo"
                    className="h-6 w-6 object-contain transition-all duration-300 group-hover:scale-105"
                    style={{ filter: 'invert(72%) sepia(26%) saturate(1450%) hue-rotate(345deg) brightness(91%) contrast(85%)' }}
                  />
                </div>

                <div>
                  <span className="block text-lg font-semibold tracking-tight text-cloud transition-colors group-hover:text-gold">
                    Connect-Africa
                  </span>
                  <span className="mt-0.5 block text-[9px] font-mono uppercase tracking-[0.22em] text-gold/55">
                    Knowledge Platform
                  </span>
                </div>
              </Link>

              <div className="mt-7 max-w-xl">
                <h2 className="max-w-lg text-2xl font-semibold leading-tight tracking-tight text-cloud sm:text-3xl">
                  African knowledge,
                  <br />
                  connected by relationships.
                </h2>

                <p className="mt-5 max-w-lg text-sm leading-7 text-mist/65">
                  Discover the people, places, cultures, institutions,
                  histories, systems and ideas that shape Africa — connected
                  through structured knowledge and evidence.
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:col-span-7 lg:pl-8">
              <div>
                <h3 className="mb-5 text-[10px] font-mono uppercase tracking-[0.22em] text-cloud/45">
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
                <h3 className="mb-5 text-[10px] font-mono uppercase tracking-[0.22em] text-cloud/45">
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
                <h3 className="mb-5 text-[10px] font-mono uppercase tracking-[0.22em] text-cloud/45">
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
        <div className="border-t border-white/[0.05]">
          <div className="ca-container flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-mist/45">
              <span>© {year} Connect-Africa</span>
              <span className="text-white/15">·</span>
              <span>Africa Info: past, present, future</span>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {legalLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group inline-flex items-center gap-1 text-[11px] text-mist/45 transition-colors hover:text-cloud"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-2.5 w-2.5 opacity-0 transition-opacity group-hover:opacity-60" />
                </a>
              ))}

              <span className="hidden h-3 w-px bg-white/[0.08] sm:block" />

              <span className="inline-flex items-center gap-1.5 text-[11px] text-mist/35">
                Built with
                <Heart className="h-3 w-3 text-terra" />
                <span>for Africa</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};