import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  History,
  LoaderCircle,
} from 'lucide-react';
import {
  articleActivityApi,
  type ReadingHistoryEntry,
} from '../../services/api';

function formatHistoryTime(timestamp: string): string {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return 'Recently viewed';
  }
  const now = Date.now();
  const difference = now - date.getTime();

  if (difference >= 0 && difference < 60_000) return 'Just now';
  if (difference >= 60_000 && difference < 3_600_000) {
    const minutes = Math.floor(difference / 60_000);
    return `${minutes} ${minutes === 1 ? 'min' : 'mins'} ago`;
  }
  if (difference >= 3_600_000 && difference < 86_400_000) {
    const hours = Math.floor(difference / 3_600_000);
    return `${hours} ${hours === 1 ? 'hr' : 'hrs'} ago`;
  }
  if (difference >= 86_400_000 && difference < 604_800_000) {
    const days = Math.floor(difference / 86_400_000);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }

  return new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export const AccountHistoryPage: React.FC = () => {
  const [history, setHistory] = useState<ReadingHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadHistory = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await articleActivityApi.getReadingHistory();
        if (active) {
          setHistory(data);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error ? err.message : 'Unable to load your reading history.',
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadHistory();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-canvas pb-24 pt-8 text-text-main font-sans transition-colors duration-300">
      <div className="ca-container">
        <Link
          to="/account"
          className="group inline-flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-text-main transition-colors"
        >
          <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
          Workspace
        </Link>

        <header className="mt-12 border-b border-stone/10 pb-10">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-stone/10 text-text-main">
            <History className="h-6 w-6" />
          </div>

          <p className="ca-eyebrow">Reading Trail</p>

          <h1 className="mt-2 font-serif text-4xl font-bold text-text-main sm:text-5xl lg:text-6xl">
            History.
          </h1>

          <p className="mt-6 max-w-xl font-sans text-lg text-text-muted">
            A chronological log of articles and research entries explored during your journey through the platform archive.
          </p>
        </header>

        {error && (
          <div className="mt-10 ca-msg-error">
            {error}
          </div>
        )}

        <section className="mt-16">
          {loading ? (
            <div className="flex min-h-64 items-center justify-center font-mono text-[10px] uppercase tracking-widest text-text-muted">
              <LoaderCircle className="mr-3 h-4 w-4 animate-spin" />
              Loading history...
            </div>
          ) : history.length === 0 ? (
            <div className="max-w-xl mx-auto py-20 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-stone/10 text-text-muted">
                <Clock3 className="h-8 w-8" strokeWidth={1} />
              </div>

              <h2 className="mt-8 font-serif text-3xl font-bold text-text-main">
                The trail is empty.
              </h2>

              <p className="mt-4 font-sans text-lg text-text-muted leading-relaxed">
                Every archive record you open will be automatically logged here, creating a personal chronology of your research.
              </p>

              <Link
                to="/search"
                className="mt-10 inline-flex rounded-full bg-text-main px-8 py-3 text-sm font-medium text-white transition hover:bg-stone/80"
              >
                Explore Knowledge
              </Link>
            </div>
          ) : (
            <div className="space-y-0 divide-y divide-stone/10 border-t border-stone/10">
              {history.map((entry, index) => (
                <article
                  key={`${entry.article.id}-${entry.timestamp}-${index}`}
                  className="group py-10 transition-colors sm:flex sm:items-start"
                >
                  <div className="mb-4 sm:mb-0 sm:w-40 sm:shrink-0">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                      {formatHistoryTime(entry.timestamp)}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1 sm:pl-10">
                    <div className="flex items-center gap-3">
                      {entry.article.category && (
                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                          {entry.article.category}
                        </span>
                      )}
                    </div>

                    <Link
                      to={`/articles/${encodeURIComponent(entry.article.slug)}`}
                      className="mt-3 block font-serif text-3xl font-bold leading-tight text-text-main transition hover:text-text-muted"
                    >
                      {entry.article.title}
                    </Link>

                    {entry.article.description && (
                      <p className="mt-4 line-clamp-2 font-sans text-base leading-relaxed text-text-muted max-w-3xl">
                        {entry.article.description}
                      </p>
                    )}

                    <div className="mt-8">
                      <Link
                        to={`/articles/${encodeURIComponent(entry.article.slug)}`}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone/10 text-text-muted transition hover:border-text-main hover:text-text-main"
                      >
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AccountHistoryPage;
