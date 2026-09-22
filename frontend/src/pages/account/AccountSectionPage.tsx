import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Bell,
  Bookmark,
  Compass,
  History,
  LockKeyhole,
  Search,
  Settings,
} from 'lucide-react';

type AccountSection =
  | 'notifications'
  | 'bookmarks'
  | 'history'
  | 'searches'
  | 'settings'
  | 'security'
  | 'preferences';

const config: Record<
  AccountSection,
  {
    eyebrow: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    message: string;
  }
> = {
  notifications: {
    eyebrow: 'Account Activity',
    title: 'Notifications',
    description: 'Important updates and activity associated with your account.',
    icon: <Bell className="h-6 w-6" />,
    message:
      'You have no notifications yet. Important Connect Africa activity will appear here when notifications are delivered.',
  },
  bookmarks: {
    eyebrow: 'Knowledge Workspace',
    title: 'Bookmarks',
    description: 'Knowledge records you choose to keep within reach.',
    icon: <Bookmark className="h-6 w-6" />,
    message:
      'You have no saved knowledge yet. Bookmark entities and articles while exploring.',
  },
  history: {
    eyebrow: 'Knowledge Workspace',
    title: 'Reading History',
    description: 'A record of the knowledge entries you have explored.',
    icon: <History className="h-6 w-6" />,
    message:
      'Your reading history is empty. Pages you explore will appear here automatically.',
  },
  searches: {
    eyebrow: 'Knowledge Workspace',
    title: 'Recent Searches',
    description: 'Return to questions and concepts you searched for previously.',
    icon: <Search className="h-6 w-6" />,
    message:
      'No recent searches are recorded yet. Search queries will appear here.',
  },
  settings: {
    eyebrow: 'Account Control',
    title: 'Settings',
    description: 'Manage account-level controls and system preferences.',
    icon: <Settings className="h-6 w-6" />,
    message:
      'Account settings are managed through your profile dashboard.',
  },
  security: {
    eyebrow: 'Protection',
    title: 'Security',
    description: 'Review authentication and multi-factor security controls.',
    icon: <LockKeyhole className="h-6 w-6" />,
    message:
      'Security controls are available in the Security & MFA page.',
  },
  preferences: {
    eyebrow: 'Experience',
    title: 'Preferences',
    description: 'Control how Connect Africa presents your knowledge workspace.',
    icon: <Compass className="h-6 w-6" />,
    message:
      'Display preferences are linked to your workspace theme state.',
  },
};

interface Props {
  section: AccountSection;
}

export const AccountSectionPage: React.FC<Props> = ({ section }) => {
  const page = config[section];

  return (
    <div className="min-h-screen bg-scholar-canvas bg-canvas pb-20 pt-10 text-text-main font-sans transition-colors duration-300">
      <div className="ca-container">
        <Link
          to="/account"
          className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-emerald-900 dark:text-gold hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Account Center
        </Link>

        <section className="mt-6 max-w-3xl ca-card bg-surface shadow-scholar">
          <div className="border-b border-stone/20 pb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
              {page.icon}
            </div>

            <p className="ca-eyebrow mt-6">{page.eyebrow}</p>

            <h1 className="mt-1 font-serif text-3xl font-bold text-text-main">
              {page.title}
            </h1>

            <p className="mt-2 font-sans text-sm text-text-muted">
              {page.description}
            </p>
          </div>

          <div className="pt-6">
            <div className="rounded-xl border border-dashed border-stone/30 bg-canvas px-6 py-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-stone/20 bg-surface text-gold">
                {page.icon}
              </div>

              <h2 className="mt-4 font-serif text-lg font-bold text-text-main">
                Nothing to Show Yet
              </h2>

              <p className="mx-auto mt-2 max-w-xl font-sans text-xs text-text-muted">
                {page.message}
              </p>

              <Link
                to="/search"
                className="mt-6 ca-btn-primary inline-flex text-xs"
              >
                <Search className="h-4 w-4" />
                Explore Knowledge
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AccountSectionPage;
