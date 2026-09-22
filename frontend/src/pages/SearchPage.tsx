import {
  ArrowUpDown,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  FileText,
  Filter,
  LoaderCircle,
  Network,
  Search as SearchIcon,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';

type ResourceType =
  | 'entity'
  | 'article'
  | 'ontology'
  | 'relationship'
  | 'source'
  | 'user';

type SearchResult = {
  id: string;
  title: string;
  resourceType: ResourceType;
  snippet: string;
  score: number;
};

type SearchResponse = {
  results: SearchResult[];
  total: number;
  page: number;
  limit: number;
  facets?: Record<string, Record<string, number>>;
};

const resourceTypes: {
  value: ResourceType;
  label: string;
}[] = [
  { value: 'entity', label: 'Entities' },
  { value: 'article', label: 'Articles' },
  { value: 'relationship', label: 'Relationships' },
  { value: 'source', label: 'Sources' },
  { value: 'ontology', label: 'Ontologies' },
];

const resourceIcons: Record<ResourceType, typeof Network> = {
  entity: Sparkles,
  article: FileText,
  relationship: Network,
  source: BookOpen,
  ontology: Network,
  user: UserRound,
};

const resourceBadgeStyles: Record<ResourceType, string> = {
  entity: 'ca-badge-emerald',
  article: 'ca-badge-gold',
  relationship: 'ca-badge-clay',
  source: 'ca-badge-stone',
  ontology: 'ca-badge-clay',
  user: 'ca-badge-stone',
};

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get('q') ?? '';
  const initialType = searchParams.get('resourceType') as ResourceType | null;

  const [query, setQuery] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);
  const [resourceType, setResourceType] = useState<ResourceType | ''>(
    initialType && resourceTypes.some((item) => item.value === initialType)
      ? initialType
      : '',
  );
  const [sortBy, setSortBy] = useState<
    'relevance' | 'alphabetical' | 'dateCreated'
  >('relevance');
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState<SearchResponse | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [error, setError] = useState('');

  const hasQuery = activeQuery.trim().length > 0;

  const totalPages = useMemo(() => {
    if (!response || response.limit <= 0) return 1;
    return Math.max(1, Math.ceil(response.total / response.limit));
  }, [response]);

  useEffect(() => {
    const queryFromUrl = searchParams.get('q') ?? '';
    const typeFromUrl = searchParams.get('resourceType') as ResourceType | null;

    setQuery(queryFromUrl);
    setActiveQuery(queryFromUrl);
    setPage(Number(searchParams.get('page') ?? '1') || 1);

    if (
      typeFromUrl &&
      resourceTypes.some((item) => item.value === typeFromUrl)
    ) {
      setResourceType(typeFromUrl);
    } else {
      setResourceType('');
    }
  }, [searchParams]);

  useEffect(() => {
    if (!hasQuery || query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    let cancelled = false;

    const timer = window.setTimeout(async () => {
      setSuggestionsLoading(true);

      try {
        const result = await api.get(
          `/search/autocomplete?q=${encodeURIComponent(query.trim())}`,
        );

        if (!cancelled) {
          setSuggestions(Array.isArray(result) ? result : []);
        }
      } catch {
        if (!cancelled) {
          setSuggestions([]);
        }
      } finally {
        if (!cancelled) {
          setSuggestionsLoading(false);
        }
      }
    }, 250);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [query, hasQuery]);

  useEffect(() => {
    if (!hasQuery) {
      setResponse(null);
      setLoading(false);
      setError('');
      return;
    }

    let cancelled = false;

    const loadResults = async () => {
      setLoading(true);
      setError('');

      const params = new URLSearchParams({
        q: activeQuery,
        page: String(page),
        limit: '12',
        sortBy,
        sortOrder: 'desc',
      });

      if (resourceType) {
        params.set('resourceType', resourceType);
      }

      try {
        const result = (await api.get(`/search?${params.toString()}`)) as SearchResponse;

        if (!cancelled) {
          setResponse(result);
        }
      } catch (requestError) {
        if (!cancelled) {
          setResponse(null);
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'Unable to search the knowledge base.',
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadResults();

    return () => {
      cancelled = true;
    };
  }, [activeQuery, page, resourceType, sortBy, hasQuery]);

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextQuery = query.trim();

    if (!nextQuery) {
      setSearchParams({});
      return;
    }

    setPage(1);

    const params = new URLSearchParams({
      q: nextQuery,
    });

    if (resourceType) {
      params.set('resourceType', resourceType);
    }

    setSearchParams(params);
  };

  const selectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    setPage(1);

    const params = new URLSearchParams({
      q: suggestion,
    });

    if (resourceType) {
      params.set('resourceType', resourceType);
    }

    setSearchParams(params);
  };

  const setTypeFilter = (value: ResourceType | '') => {
    setResourceType(value);
    setPage(1);

    const params = new URLSearchParams();

    if (activeQuery) {
      params.set('q', activeQuery);
    }

    if (value) {
      params.set('resourceType', value);
    }

    setSearchParams(params);
  };

  const changePage = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages) return;

    const params = new URLSearchParams(searchParams);
    params.set('page', String(nextPage));
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearSearch = () => {
    setQuery('');
    setSearchParams({});
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-scholar-canvas bg-canvas text-text-main font-sans transition-colors duration-300">
      <section className="border-b border-stone/20 bg-surface/50 py-12 sm:py-16 lg:py-20">
        <div className="ca-container">
          <div className="max-w-4xl">
            <p className="ca-eyebrow">Universal Knowledge Index</p>

            <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-text-main sm:text-5xl">
              Search African Knowledge Entities
            </h1>

            <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-text-muted sm:text-base">
              Query across entities, research articles, ontological relationships, primary sources, and historical metadata.
            </p>

            <form onSubmit={submitSearch} className="relative mt-8">
              <div className="flex items-center rounded-xl border border-stone/30 bg-surface p-2 shadow-scholar backdrop-blur-xl transition focus-within:border-gold">
                <SearchIcon className="ml-3 shrink-0 text-stone" size={20} />

                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search an entity, place, person, institution, culture..."
                  className="min-w-0 flex-1 bg-transparent px-3 py-2 font-sans text-sm text-text-main outline-none placeholder:text-stone/50 sm:text-base"
                  autoFocus
                />

                {query && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="rounded-lg p-2 text-stone transition hover:bg-stone/10 hover:text-text-main"
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}

                <button
                  type="submit"
                  className="ca-btn-primary px-5 py-2.5 text-xs uppercase tracking-wider"
                >
                  Search Index
                </button>
              </div>

              {(suggestions.length > 0 || suggestionsLoading) && query.trim().length >= 2 && (
                <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-stone/20 bg-surface shadow-scholar font-sans">
                  {suggestionsLoading ? (
                    <div className="flex items-center gap-2 px-4 py-3 text-xs text-text-muted">
                      <LoaderCircle className="h-4 w-4 animate-spin text-gold" />
                      Searching index suggestions...
                    </div>
                  ) : (
                    suggestions.slice(0, 6).map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => selectSuggestion(suggestion)}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-text-main transition hover:bg-stone/10"
                      >
                        <SearchIcon size={15} className="text-stone" />
                        {suggestion}
                      </button>
                    ))
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <section className="ca-container py-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <aside className="font-sans">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
              <Filter size={14} className="text-gold" />
              Filter Domain
            </div>

            <div className="mt-4 space-y-1">
              <button
                type="button"
                onClick={() => setTypeFilter('')}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                  !resourceType
                    ? 'bg-emerald-900/10 text-emerald-900 dark:text-gold font-bold'
                    : 'text-text-muted hover:bg-stone/10 hover:text-text-main'
                }`}
              >
                All Knowledge
              </button>

              {resourceTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setTypeFilter(type.value)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                    resourceType === type.value
                      ? 'bg-emerald-900/10 text-emerald-900 dark:text-gold font-bold'
                      : 'text-text-muted hover:bg-stone/10 hover:text-text-main'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </aside>

          <div className="min-w-0">
            {!hasQuery ? (
              <div className="ca-card border-dashed border-stone/30 bg-surface/50 px-6 py-16 text-center">
                <SearchIcon className="mx-auto text-stone" size={32} />
                <h2 className="mt-4 font-serif text-xl font-bold text-text-main">
                  Search Connect Africa Knowledge Base
                </h2>
                <p className="mx-auto mt-2 max-w-md font-sans text-sm text-text-muted">
                  Begin typing an entity name, historical polity, ruler, trade route, or cultural context.
                </p>
              </div>
            ) : (
              <>
                <div className="flex flex-col justify-between gap-4 border-b border-stone/20 pb-5 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-mono text-xs text-text-muted">
                      {loading
                        ? 'Searching index...'
                        : `${response?.total ?? 0} record${
                            response?.total === 1 ? '' : 's'
                          } found`}
                    </p>

                    <h2 className="mt-1 font-serif text-xl font-bold text-text-main">
                      "{activeQuery}"
                    </h2>
                  </div>

                  <label className="flex items-center gap-2 font-mono text-xs text-text-muted">
                    <ArrowUpDown size={14} className="text-stone" />
                    <select
                      value={sortBy}
                      onChange={(event) => {
                        setPage(1);
                        setSortBy(
                          event.target.value as
                            | 'relevance'
                            | 'alphabetical'
                            | 'dateCreated',
                        );
                      }}
                      className="rounded-lg border border-stone/20 bg-surface px-3 py-1.5 font-sans text-xs text-text-main outline-none focus:border-gold"
                    >
                      <option value="relevance">Sort by Relevance</option>
                      <option value="alphabetical">Alphabetical</option>
                      <option value="dateCreated">Newest First</option>
                    </select>
                  </label>
                </div>

                {error && (
                  <div className="mt-6 ca-msg-error">
                    {error}
                  </div>
                )}

                {loading && !response && (
                  <div className="flex items-center justify-center py-20 font-sans text-sm text-text-muted">
                    <LoaderCircle className="mr-3 animate-spin text-gold" size={20} />
                    Querying African Knowledge Graph Index...
                  </div>
                )}

                {!loading && !error && response && response.results.length === 0 && (
                  <div className="ca-card border-dashed border-stone/30 bg-surface/50 px-6 py-16 text-center">
                    <Sparkles className="mx-auto text-stone" size={28} />
                    <h2 className="mt-4 font-serif text-lg font-bold text-text-main">
                      No Records Found
                    </h2>
                    <p className="mt-2 font-sans text-sm text-text-muted">
                      Try adjusting search keywords or clearing resource filters.
                    </p>
                  </div>
                )}

                <div className="mt-6 space-y-4">
                  {response?.results.map((result) => {
                    const Icon = resourceIcons[result.resourceType];
                    const badgeClass = resourceBadgeStyles[result.resourceType];

                    return (
                      <article
                        key={`${result.resourceType}-${result.id}`}
                        className="ca-card-hover group"
                      >
                        <div className="flex gap-4">
                          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-stone/20 bg-canvas text-emerald-900 dark:text-gold">
                            <Icon size={18} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                              <span className={badgeClass}>
                                {result.resourceType}
                              </span>

                              <span className="font-mono text-[10px] text-text-muted">
                                Score: {result.score.toFixed(3)}
                              </span>
                            </div>

                            <h3 className="mt-2 font-serif text-lg font-bold text-text-main group-hover:text-emerald-900 dark:group-hover:text-gold transition">
                              {result.title}
                            </h3>

                            {result.snippet && (
                              <p className="mt-2 max-w-3xl font-sans text-xs leading-relaxed text-text-muted">
                                {result.snippet}
                              </p>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {response && response.results.length > 0 && totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-between border-t border-stone/20 pt-5 font-mono text-xs">
                    <button
                      type="button"
                      disabled={page <= 1}
                      onClick={() => changePage(page - 1)}
                      className="ca-btn-outline px-3 py-1.5"
                    >
                      <ChevronLeft size={15} />
                      Previous
                    </button>

                    <span className="text-text-muted">
                      Page {page} of {totalPages}
                    </span>

                    <button
                      type="button"
                      disabled={page >= totalPages}
                      onClick={() => changePage(page + 1)}
                      className="ca-btn-outline px-3 py-1.5"
                    >
                      Next
                      <ChevronRight size={15} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
