import {
  ArrowRight,
  ArrowUpRight,
  Search,
  LoaderCircle,
} from 'lucide-react';
import {
  BookBookmark,
} from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articleApi, type ArticleSummary } from '../services/api';

const FALLBACK_DISCOVERIES = [
  {
    id: '1',
    slug: 'walls-of-ancient-benin',
    category: 'Archaeology · West Africa',
    title: 'The walls of ancient Benin',
    description:
      'Follow the people, settlements, engineering and historical context connected to one of Africa’s remarkable earthwork systems.',
    readTime: '8 min read',
  },
  {
    id: '2',
    slug: 'caravan-routes-sahara',
    category: 'History · North Africa',
    title: 'Caravan routes across the Sahara',
    description:
      'Trace the relationships between cities, commodities, kingdoms and communities that connected the desert.',
    readTime: '10 min read',
  },
  {
    id: '3',
    slug: 'living-world-swahili',
    category: 'Culture · East Africa',
    title: 'The living world of Swahili',
    description:
      'Explore how language, coastlines, trade and cultural exchange shaped a major African cultural sphere.',
    readTime: '7 min read',
  },
];

export function HomePage() {
  const [query, setQuery] = useState('');
  const [discoveries, setDiscoveries] = useState<ArticleSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadLatestArticles = async () => {
      try {
        const articles = await articleApi.getLatest(3);
        if (active && articles && articles.length > 0) {
          setDiscoveries(articles);
        } else if (active) {
          setDiscoveries(FALLBACK_DISCOVERIES as unknown as ArticleSummary[]);
        }
      } catch {
        if (active) {
          setDiscoveries(FALLBACK_DISCOVERIES as unknown as ArticleSummary[]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadLatestArticles();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-scholar-canvas bg-canvas text-text-main font-sans transition-colors duration-300">
      {/* -------------------------------------------------
          HERO SECTION
      ------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-stone/10 py-20 sm:py-28 lg:py-32">
        {/* Large Africa Map SVG Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] dark:opacity-[0.04]">
          <img
            src="/images/africa.svg"
            alt=""
            className="h-[450px] w-[450px] object-contain brightness-0 dark:invert transition-all duration-300 select-none"
          />
        </div>

        <div className="ca-container relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center mb-5 rounded-full border border-[var(--accent-teal)]/30 bg-[var(--accent-teal)]/10 px-4 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--accent-teal)]">
              Connect Africa Research & Archives
            </div>

            <h1 className="font-serif text-balance text-5xl font-bold leading-[1.08] tracking-tight text-text-main sm:text-7xl lg:text-8xl">
              Understand <span className="text-[var(--accent-teal)]">Africa</span>.
            </h1>

            <p className="mx-auto mt-6 max-w-xl font-sans text-lg leading-relaxed text-text-muted">
              The living archive of African people, history, and culture — connected as an interactive knowledge graph.
            </p>

            {/* Search Bar */}
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (query.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
                }
              }}
              className="mx-auto mt-8 max-w-lg"
            >
              <div className="group flex min-h-[48px] items-center rounded-full border border-stone/20 bg-surface px-5 shadow-sm transition-all focus-within:border-[var(--accent-teal)] focus-within:ring-2 focus-within:ring-[var(--accent-teal)]/10">
                <Search size={18} className="shrink-0 text-stone" />

                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search the archive, polities, empires, routes..."
                  className="min-w-0 flex-1 bg-transparent px-3 font-sans text-base text-text-main outline-none placeholder:text-stone/40"
                  aria-label="Search Connect-Africa"
                />
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------
          CURATED DISCOVERIES (REAL API BACKED)
      ------------------------------------------------- */}
      <section className="py-12 sm:py-16">
        <div className="ca-container">
          <div className="mb-8 flex items-end justify-between border-b border-stone/10 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BookBookmark size={16} weight="duotone" className="text-[var(--accent-amber)]" />
                <p className="ca-eyebrow">Archival Highlights</p>
              </div>
              <h2 className="font-serif text-2xl font-bold tracking-tight text-text-main sm:text-3xl">
                Featured Knowledge Discoveries
              </h2>
            </div>

            <Link
              to="/articles"
              className="hidden items-center gap-1 font-sans text-xs font-semibold text-text-muted hover:text-[var(--accent-teal)] sm:flex"
            >
              Explore all articles
              <ArrowUpRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16 font-mono text-xs uppercase tracking-widest text-text-muted">
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin text-[var(--accent-teal)]" />
              Loading live archive records...
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-3">
              {discoveries.map((item) => {
                const articleRecord = item as unknown as {
                  id: string;
                  slug: string;
                  title: string;
                  description?: string;
                  content?: string;
                  category?: string;
                  readTime?: string;
                };
                return (
                  <article
                    key={articleRecord.id || articleRecord.slug}
                    className="ca-card group flex flex-col justify-between py-5 px-6 transition-all hover:border-[var(--accent-teal)]"
                  >
                    <div>
                      <div className="mb-2.5 flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--accent-amber)]">
                          {articleRecord.category || 'Archival Research'}
                        </span>
                      </div>

                      <Link to={`/articles/${articleRecord.slug}`} className="block">
                        <h3 className="font-serif text-xl font-bold text-text-main group-hover:text-[var(--accent-teal)] transition">
                          {articleRecord.title}
                        </h3>
                      </Link>

                      <p className="mt-2 font-sans text-xs leading-relaxed text-text-muted line-clamp-3">
                        {articleRecord.description || articleRecord.content || 'Explore historical context and empirical research records.'}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-stone/10 pt-3">
                      <Link
                        to={`/articles/${articleRecord.slug}`}
                        className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-text-main group-hover:text-[var(--accent-teal)] transition-all"
                      >
                        Read record <ArrowRight size={12} />
                      </Link>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted">
                        {articleRecord.readTime || '5 min read'}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
