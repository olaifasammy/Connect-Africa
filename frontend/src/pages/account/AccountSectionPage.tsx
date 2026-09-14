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
    eyebrow: 'Account activity',
    title: 'Notifications',
    description: 'Important updates and activity associated with your account.',
    icon: <Bell className="h-6 w-6" />,
    message:
      'You have no notifications yet. Important Connect-Africa activity will appear here when the notification service is connected.',
  },
  bookmarks: {
    eyebrow: 'Knowledge workspace',
    title: 'Bookmarks',
    description: 'Knowledge you choose to keep within reach.',
    icon: <Bookmark className="h-6 w-6" />,
    message:
      'You have no saved knowledge yet. Bookmark entities and other knowledge as the discovery experience comes online.',
  },
  history: {
    eyebrow: 'Knowledge workspace',
    title: 'Reading history',
    description: 'A record of the knowledge you have explored.',
    icon: <History className="h-6 w-6" />,
    message:
      'Your reading history is empty. Pages you meaningfully explore will appear here once activity tracking is connected.',
  },
  searches: {
    eyebrow: 'Knowledge workspace',
    title: 'Recent searches',
    description: 'Return to questions and concepts you searched for previously.',
    icon: <Search className="h-6 w-6" />,
    message:
      'No recent searches are available yet. Search activity will appear here once search history is connected.',
  },
  settings: {
    eyebrow: 'Account control',
    title: 'Settings',
    description: 'Manage account-level controls for your Connect-Africa experience.',
    icon: <Settings className="h-6 w-6" />,
    message:
      'Account settings are being connected to the platform settings service. No changes are being simulated here.',
  },
  security: {
    eyebrow: 'Account protection',
    title: 'Security',
    description: 'Review authentication and security controls.',
    icon: <LockKeyhole className="h-6 w-6" />,
    message:
      'Security controls will appear here as the account security surface is connected to the authentication service.',
  },
  preferences: {
    eyebrow: 'Experience',
    title: 'Preferences',
    description: 'Control how Connect-Africa behaves and presents your knowledge experience.',
    icon: <Compass className="h-6 w-6" />,
    message:
      'Experience preferences will appear here as the preference service is connected.',
  },
};

interface Props {
  section: AccountSection;
}

export const AccountSectionPage: React.FC<Props> = ({ section }) => {
  const page = config[section];

  return (
    <div className="min-h-screen bg-ink pb-20 pt-10 text-cloud sm:pt-14">
      <div className="ca-container">
        <Link
          to="/account"
          className="inline-flex items-center gap-2 text-sm text-mist transition hover:text-cloud"
        >
          <ArrowLeft className="h-4 w-4" />
          Account center
        </Link>

        <section className="mt-6 max-w-3xl overflow-hidden rounded-3xl border border-white/[0.07] bg-forest/70 shadow-soft">
          <div className="border-b border-white/[0.06] p-6 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald/20 bg-brand text-sage">
              {page.icon}
            </div>

            <p className="ca-eyebrow mt-6">{page.eyebrow}</p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              {page.title}
            </h1>

            <p className="mt-3 text-sm leading-6 text-mist sm:text-base">
              {page.description}
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-6 py-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.07] bg-forest text-sage">
                {page.icon}
              </div>

              <h2 className="mt-5 text-lg font-semibold">
                Nothing to show yet
              </h2>

              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-mist">
                {page.message}
              </p>

              <Link
                to="/search"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-sage"
              >
                <Search className="h-4 w-4" />
                Explore knowledge
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AccountSectionPage;
