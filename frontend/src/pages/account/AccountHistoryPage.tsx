import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Clock3,
  ExternalLink,
  History,
  LoaderCircle,
  Search,
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
    <div className="min-h-screen bg-scholar-canvas bg-canvas pb-20 pt-10 text-text-main font-sans transition-colors duration-300">
      <div className="ca-container">
        <Link
          to="/account"
          className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-emerald-900 dark:text-gold hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Account Center
        </Link>

        <header className="mt-8 max-w-3xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
            <History className="h-6 w-6" />
          </div>

          <p className="ca-eyebrow mt-6">Reading Trail</p>

          <div className="mt-2">
            <h1 className="font-serif text-3xl font-bold text-text-main sm:text-4xl">
              Reading History
            </h1>

            <p className="mt-2 font-sans text-sm text-text-muted">
              A chronological log of articles and entries explored during your research.
            </p>
          </div>
        </header>

        {error && (
          <div className="mt-6 ca-msg-error">
            {error}
          </div>
        )}

        <section className="mt-8">
          {loading ? (
            <div className="flex min-h-64 items-center justify-center font-mono text-xs text-text-muted ca-card">
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin text-gold" />
              Loading reading history...
            </div>
          ) : history.length === 0 ? (
            <div className="ca-card border-dashed border-stone/30 bg-surface/50 px-6 py-14 text-center sm:px-10">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-stone/20 bg-surface text-gold">
                <Clock3 className="h-6 w-6" />
              </div>

              <h2 className="mt-4 font-serif text-xl font-bold text-text-main">
                Reading History is Empty
              </h2>

              <p className="mx-auto mt-2 max-w-xl font-sans text-xs text-text-muted">
                Articles you explore will automatically be logged here for quick reference.
              </p>

              <Link
                to="/search"
                className="mt-6 ca-btn-primary inline-flex text-xs"
              >
                <Search className="h-4 w-4" />
                Explore Knowledge
              </Link>
            </div>
          ) : (
            <div className="ca-card bg-surface p-0 shadow-scholar">
              <div className="divide-y divide-stone/15">
                {history.map((entry, index) => (
                  <article
                    key={`${entry.article.id}-${entry.timestamp}-${index}`}
                    className="group px-5 py-4 transition hover:bg-stone/5 sm:px-7"
                  >
                    <div className="flex gap-4 sm:gap-6">
                      <div className="relative flex w-6 shrink-0 justify-center">
                        <div className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-900 dark:bg-gold" />
                        {index < history.length - 1 && (
                          <div className="absolute top-5 bottom-[-1rem] w-px bg-stone/20" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            {entry.article.category && (
                              <span className="ca-badge-emerald">
                                {entry.article.category}
                              </span>
                            )}

                            <Link
                              to={`/articles/${encodeURIComponent(entry.article.slug)}`}
                              className="mt-1 block"
                            >
                              <h2 className="font-serif text-base font-bold text-text-main group-hover:text-emerald-900 dark:group-hover:text-gold transition">
                                {entry.article.title}
                              </h2>
                            </Link>
                          </div>

                          <span className="shrink-0 font-mono text-xs text-text-muted">
                            {formatHistoryTime(entry.timestamp)}
                          </span>
                        </div>

                        {entry.article.description && (
                          <p className="mt-2 line-clamp-2 font-sans text-xs text-text-muted">
                            {entry.article.description}
                          </p>
                        )}

                        <Link
                          to={`/articles/${encodeURIComponent(entry.article.slug)}`}
                          className="mt-3 ca-article-link inline-flex items-center gap-1.5 font-sans text-xs font-semibold"
                        >
                          Continue Reading
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AccountHistoryPage;
