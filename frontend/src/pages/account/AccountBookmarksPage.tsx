import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Bookmark,
  BookmarkX,
  ExternalLink,
  LoaderCircle,
  Search,
} from 'lucide-react';
import {
  articleActivityApi,
  type ArticleSummary,
} from '../../services/api';

export const AccountBookmarksPage: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<ArticleSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadBookmarks = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await articleActivityApi.getBookmarks();

        if (active) {
          setBookmarks(data);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : 'Unable to load your bookmarks.',
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadBookmarks();

    return () => {
      active = false;
    };
  }, []);

  const removeBookmark = async (articleId: string) => {
    try {
      setRemovingId(articleId);
      setError(null);

      await articleActivityApi.removeBookmark(articleId);

      setBookmarks((current) =>
        current.filter((article) => article.id !== articleId),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to remove this bookmark.',
      );
    } finally {
      setRemovingId(null);
    }
  };

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
            <Bookmark className="h-6 w-6" />
          </div>

          <p className="ca-eyebrow mt-6">Knowledge workspace</p>

          <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Bookmarks
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-mist sm:text-base">
                Knowledge you have chosen to keep within reach.
              </p>
            </div>

            {!loading && bookmarks.length > 0 && (
              <span className="text-sm text-mist">
                {bookmarks.length}{' '}
                {bookmarks.length === 1 ? 'saved article' : 'saved articles'}
              </span>
            )}
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
                Loading your bookmarks…
              </div>
            </div>
          ) : bookmarks.length === 0 ? (
            <div className="rounded-3xl border border-white/[0.07] bg-forest/60 px-6 py-14 text-center sm:px-10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.02] text-sage">
                <BookmarkX className="h-6 w-6" />
              </div>

              <h2 className="mt-5 text-xl font-semibold">
                Your knowledge shelf is empty
              </h2>

              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-mist">
                Save articles you want to return to while exploring African
                knowledge.
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
            <div className="grid gap-4 lg:grid-cols-2">
              {bookmarks.map((article) => (
                <article
                  key={article.id}
                  className="group rounded-3xl border border-white/[0.07] bg-forest/60 p-5 transition duration-300 hover:border-emerald/25 hover:bg-forest sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      {article.category && (
                        <p className="ca-eyebrow text-[10px]">
                          {article.category}
                        </p>
                      )}

                      <Link
                        to={`/articles/${encodeURIComponent(article.slug)}`}
                        className="mt-2 block"
                      >
                        <h2 className="text-lg font-semibold leading-7 text-cloud transition group-hover:text-sage">
                          {article.title}
                        </h2>
                      </Link>
                    </div>

                    <Bookmark className="mt-1 h-5 w-5 shrink-0 text-gold" />
                  </div>

                  {article.description && (
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-mist">
                      {article.description}
                    </p>
                  )}

                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
                    <Link
                      to={`/articles/${encodeURIComponent(article.slug)}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-sage transition hover:text-cloud"
                    >
                      Open article
                      <ExternalLink className="h-4 w-4" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => void removeBookmark(article.id)}
                      disabled={removingId === article.id}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] px-3 py-2 text-xs font-semibold text-mist transition hover:border-terra/30 hover:text-cloud disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {removingId === article.id ? (
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                      ) : (
                        <BookmarkX className="h-4 w-4" />
                      )}
                      Remove
                    </button>
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

export default AccountBookmarksPage;
