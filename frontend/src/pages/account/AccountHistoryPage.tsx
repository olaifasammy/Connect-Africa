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

  if (difference >= 0 && difference < 60_000) {
    return 'Just now';
  }

  if (difference >= 60_000 && difference < 3_600_000) {
    const minutes = Math.floor(difference / 60_000);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  if (difference >= 3_600_000 && difference < 86_400_000) {
    const hours = Math.floor(difference / 3_600_000);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
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
            err instanceof Error
              ? err.message
              : 'Unable to load your reading history.',
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
    <div className="min-h-screen bg-ink pb-20 pt-10 text-cloud sm:pt-14">
      <div className="ca-container">
        <Link
          to="/account"
          className="inline-flex items-center gap-2 text-sm text-mist transition hover:text-cloud"
        >
          <ArrowLeft className="h-4 w-4" />
          Account center
        </Link>

        <header className="mt-8 max-w-3xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald/20 bg-brand text-sage">
            <History className="h-6 w-6" />
          </div>

          <p className="ca-eyebrow mt-6">Knowledge workspace</p>

          <div className="mt-2">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Reading history
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-mist sm:text-base">
              A chronological record of the articles you have explored.
            </p>
          </div>
        </header>

        {error && (
          <div className="mt-8 rounded-2xl border border-terra/30 bg-terra/10 px-5 py-4 text-sm text-cloud">
            {error}
          </div>
        )}

        <section className="mt-8">
          {loading ? (
            <div className="flex min-h-64 items-center justify-center rounded-3xl border border-white/[0.07] bg-forest/60">
              <div className="flex items-center gap-3 text-sm text-mist">
                <LoaderCircle className="h-5 w-5 animate-spin text-emerald" />
                Loading your reading history…
              </div>
            </div>
          ) : history.length === 0 ? (
            <div className="rounded-3xl border border-white/[0.07] bg-forest/60 px-6 py-14 text-center sm:px-10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.02] text-sage">
                <Clock3 className="h-6 w-6" />
              </div>

              <h2 className="mt-5 text-xl font-semibold">
                Your reading history is empty
              </h2>

              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-mist">
                Articles you explore will appear here, giving you a direct
                path back into your recent knowledge trail.
              </p>

              <Link
                to="/search"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald px-5 py-3 text-sm font-semibold text-ink transition hover:bg-sage"
              >
                <Search className="h-4 w-4" />
                Explore knowledge
              </Link>
            </div>
          ) : (
            <div className="overflow-hidden rounded-3xl border border-white/[0.07] bg-forest/60">
              <div className="divide-y divide-white/[0.06]">
                {history.map((entry, index) => (
                  <article
                    key={`${entry.article.id}-${entry.timestamp}-${index}`}
                    className="group px-5 py-5 transition hover:bg-white/[0.02] sm:px-7"
                  >
                    <div className="flex gap-4 sm:gap-6">
                      <div className="relative flex w-8 shrink-0 justify-center">
                        <div className="mt-1.5 h-2.5 w-2.5 rounded-full bg-emerald ring-4 ring-emerald/10" />

                        {index < history.length - 1 && (
                          <div className="absolute top-5 bottom-[-1.25rem] w-px bg-white/[0.07]" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            {entry.article.category && (
                              <p className="ca-eyebrow text-[10px]">
                                {entry.article.category}
                              </p>
                            )}

                            <Link
                              to={`/articles/${encodeURIComponent(entry.article.slug)}`}
                              className="mt-1 block"
                            >
                              <h2 className="text-base font-semibold leading-6 text-cloud transition group-hover:text-sage sm:text-lg">
                                {entry.article.title}
                              </h2>
                            </Link>
                          </div>

                          <span className="shrink-0 text-xs text-mist">
                            {formatHistoryTime(entry.timestamp)}
                          </span>
                        </div>

                        {entry.article.description && (
                          <p className="mt-2 line-clamp-2 text-sm leading-6 text-mist">
                            {entry.article.description}
                          </p>
                        )}

                        <Link
                          to={`/articles/${encodeURIComponent(entry.article.slug)}`}
                          className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-sage transition hover:text-cloud"
                        >
                          Continue reading
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
