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
            err instanceof Error ? err.message : 'Unable to load your bookmarks.',
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
        err instanceof Error ? err.message : 'Unable to remove this bookmark.',
      );
    } finally {
      setRemovingId(null);
    }
  };

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
            <Bookmark className="h-6 w-6" />
          </div>

          <p className="ca-eyebrow mt-6">Knowledge Shelf</p>

          <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-serif text-3xl font-bold text-text-main sm:text-4xl">
                Bookmarks
              </h1>

              <p className="mt-2 font-sans text-sm text-text-muted">
                Articles and knowledge entries saved to your personal shelf.
              </p>
            </div>

            {!loading && bookmarks.length > 0 && (
              <span className="font-mono text-xs text-text-muted">
                {bookmarks.length}{' '}
                {bookmarks.length === 1 ? 'saved article' : 'saved articles'}
              </span>
            )}
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
              Loading saved bookmarks...
            </div>
          ) : bookmarks.length === 0 ? (
            <div className="ca-card border-dashed border-stone/30 bg-surface/50 px-6 py-14 text-center sm:px-10">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-stone/20 bg-surface text-gold">
                <BookmarkX className="h-6 w-6" />
              </div>

              <h2 className="mt-4 font-serif text-xl font-bold text-text-main">
                Your Knowledge Shelf is Empty
              </h2>

              <p className="mx-auto mt-2 max-w-xl font-sans text-xs text-text-muted">
                Save research publications and articles while exploring Connect Africa.
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
            <div className="grid gap-4 lg:grid-cols-2">
              {bookmarks.map((article) => (
                <article
                  key={article.id}
                  className="ca-card-hover group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        {article.category && (
                          <span className="ca-badge-clay">
                            {article.category}
                          </span>
                        )}

                        <Link
                          to={`/articles/${encodeURIComponent(article.slug)}`}
                          className="mt-2 block"
                        >
                          <h2 className="font-serif text-lg font-bold text-text-main group-hover:text-emerald-900 dark:group-hover:text-gold transition">
                            {article.title}
                          </h2>
                        </Link>
                      </div>

                      <Bookmark className="mt-1 h-5 w-5 shrink-0 text-gold fill-gold/20" />
                    </div>

                    {article.description && (
                      <p className="mt-3 line-clamp-3 font-sans text-xs leading-relaxed text-text-muted">
                        {article.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-stone/15 pt-4 font-mono text-xs">
                    <Link
                      to={`/articles/${encodeURIComponent(article.slug)}`}
                      className="ca-article-link inline-flex items-center gap-1.5"
                    >
                      Open Article
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => void removeBookmark(article.id)}
                      disabled={removingId === article.id}
                      className="ca-btn-outline px-2.5 py-1 text-xs text-clay"
                    >
                      {removingId === article.id ? (
                        <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <BookmarkX className="h-3.5 w-3.5" />
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
