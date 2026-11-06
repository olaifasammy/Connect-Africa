import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkX,
  LoaderCircle,
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
          <div className="mb-6 flex items-center justify-between gap-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-stone/10 text-text-main">
              <Bookmark className="h-6 w-6" />
            </div>

            {!loading && bookmarks.length > 0 && (
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                {bookmarks.length}{' '}
                {bookmarks.length === 1 ? 'record' : 'records'}
              </span>
            )}
          </div>

          <p className="ca-eyebrow">Knowledge Shelf</p>

          <h1 className="mt-2 font-serif text-4xl font-bold text-text-main sm:text-5xl lg:text-6xl">
            Bookmarks.
          </h1>

          <p className="mt-6 max-w-xl font-sans text-lg text-text-muted">
            Your personal collection of significant articles and research entries curated during your exploration.
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
              Loading archives...
            </div>
          ) : bookmarks.length === 0 ? (
            <div className="max-w-xl mx-auto py-20 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-stone/10 text-text-muted">
                <BookmarkX className="h-8 w-8" strokeWidth={1} />
              </div>

              <h2 className="mt-8 font-serif text-3xl font-bold text-text-main">
                The shelf is empty.
              </h2>

              <p className="mt-4 font-sans text-lg text-text-muted leading-relaxed">
                As you explore the knowledge graph, bookmark records to build your personal library of African history and culture.
              </p>

              <Link
                to="/search"
                className="mt-10 inline-flex rounded-full bg-text-main px-8 py-3 text-sm font-medium text-white transition hover:bg-stone/80"
              >
                Explore Knowledge
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-stone/10 border-t border-stone/10">
              {bookmarks.map((article) => (
                <article
                  key={article.id}
                  className="group flex flex-col justify-between py-10 transition-colors sm:flex-row sm:items-start"
                >
                  <div className="min-w-0 flex-1 pr-8">
                    <div className="flex items-center gap-3">
                      {article.category && (
                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                          {article.category}
                        </span>
                      )}
                    </div>

                    <Link
                      to={`/articles/${encodeURIComponent(article.slug)}`}
                      className="mt-3 block font-serif text-3xl font-bold leading-tight text-text-main transition hover:text-text-muted"
                    >
                      {article.title}
                    </Link>

                    {article.description && (
                      <p className="mt-4 line-clamp-2 font-sans text-base leading-relaxed text-text-muted max-w-3xl">
                        {article.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-8 flex items-center gap-4 sm:mt-0 sm:shrink-0">
                    <Link
                      to={`/articles/${encodeURIComponent(article.slug)}`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone/10 text-text-muted transition hover:border-text-main hover:text-text-main"
                      title="Read Article"
                    >
                      <ArrowRight size={18} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => void removeBookmark(article.id)}
                      disabled={removingId === article.id}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone/10 text-text-muted transition hover:border-clay hover:text-clay"
                      title="Remove Bookmark"
                    >
                      {removingId === article.id ? (
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                      ) : (
                        <BookmarkX size={18} />
                      )}
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
