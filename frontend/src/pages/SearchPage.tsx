import {
  ArrowUpDown,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  FileText,
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

  /* setTypeFilter removed */

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
    <div className="min-h-[calc(100vh-72px)] bg-canvas text-text-main font-sans transition-colors duration-300">
      <section className="border-b border-stone/10 py-12 sm:py-16">
        <div className="ca-container">
          <div className="max-w-4xl">
            <p className="ca-eyebrow">Universal Knowledge Index</p>

            <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-text-main sm:text-6xl">
              Search the Archives.
            </h1>

            <p className="mt-6 max-w-2xl font-sans text-lg text-text-muted">
              Query across historical entities, research articles, ontological relationships, and primary metadata.
            </p>

            <form onSubmit={submitSearch} className="relative mt-10">
              <div className="flex items-center border-b border-stone/20 bg-transparent transition focus-within:border-text-main">
                <SearchIcon className="shrink-0 text-stone/40" size={20} strokeWidth={1.5} />

                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search entities, places, people, trade routes..."
                  className="min-w-0 flex-1 bg-transparent px-4 py-4 font-serif text-xl text-text-main outline-none placeholder:text-stone/30 sm:text-2xl"
                  autoFocus
                />

                {query && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="p-2 text-stone/40 transition hover:text-text-main"
                    aria-label="Clear search"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              {(suggestions.length > 0 || suggestionsLoading) && query.trim().length >= 2 && (
                <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-stone/10 bg-canvas shadow-xl font-sans">
                  {suggestionsLoading ? (
                    <div className="flex items-center gap-3 px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-text-muted">
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      Searching index...
                    </div>
                  ) : (
                    suggestions.slice(0, 6).map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => selectSuggestion(suggestion)}
                        className="flex w-full items-center gap-4 px-6 py-4 text-left font-serif text-lg text-text-main transition hover:bg-stone/5"
                      >
                        <SearchIcon size={16} className="text-stone/30" strokeWidth={1.5} />
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

      <section className="ca-container py-12">
        <div className="max-w-4xl">
          {!hasQuery ? (
              <div className="py-20 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-stone/10 text-text-muted">
                  <SearchIcon size={32} strokeWidth={1} />
                </div>
                <h2 className="mt-8 font-serif text-3xl font-bold text-text-main">
                  Awaiting query.
                </h2>
                <p className="mx-auto mt-4 max-w-md font-sans text-lg text-text-muted">
                  Begin typing an entity name, historical polity, ruler, or trade route to query the knowledge graph.
                </p>
              </div>
            ) : (
              <>
                <div className="flex flex-col justify-between gap-6 border-b border-stone/10 pb-8 sm:flex-row sm:items-end">
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                      {loading
                        ? 'Searching index...'
                        : `${response?.total ?? 0} records found`}
                    </span>

                    <h2 className="mt-2 font-serif text-4xl font-bold text-text-main">
                      "{activeQuery}"
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                    <ArrowUpDown size={12} />
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
                      className="bg-transparent font-bold uppercase outline-none focus:text-text-main transition-colors"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="alphabetical">Alpha</option>
                      <option value="dateCreated">Newest</option>
                    </select>
                  </div>
                </div>

                {error && (
                  <div className="mt-10 ca-msg-error">
                    {error}
                  </div>
                )}

                {loading && !response && (
                  <div className="flex flex-col items-center justify-center py-24 font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                    <LoaderCircle className="mb-4 animate-spin" size={24} />
                    Querying Index...
                  </div>
                )}

                {!loading && !error && response && response.results.length === 0 && (
                  <div className="py-20 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-stone/10 text-text-muted">
                      <Sparkles size={32} strokeWidth={1} />
                    </div>
                    <h2 className="mt-8 font-serif text-3xl font-bold text-text-main">
                      No records found.
                    </h2>
                    <p className="mt-4 font-sans text-lg text-text-muted">
                      Try adjusting your keywords or clearing domain filters.
                    </p>
                  </div>
                )}

                <div className="divide-y divide-stone/10">
                  {response?.results.map((result) => {
                    const Icon = resourceIcons[result.resourceType];

                    return (
                      <article
                        key={`${result.resourceType}-${result.id}`}
                        className="group py-10 transition-colors"
                      >
                        <div className="flex gap-8">
                          <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone/10 text-text-main transition group-hover:border-text-main">
                            <Icon size={18} strokeWidth={1.5} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                                {result.resourceType}
                              </span>

                              <span className="h-1 w-1 rounded-full bg-stone/20" />

                              <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted/60">
                                REL: {result.score.toFixed(3)}
                              </span>
                            </div>

                            <h3 className="mt-3 font-serif text-3xl font-bold text-text-main transition group-hover:text-text-muted sm:text-4xl">
                              {result.title}
                            </h3>

                            {result.snippet && (
                              <p className="mt-4 max-w-4xl font-sans text-base leading-relaxed text-text-muted lg:text-lg">
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
                  <div className="mt-12 flex items-center justify-between border-t border-stone/10 pt-10 font-mono text-[10px] font-bold uppercase tracking-widest">
                    <button
                      type="button"
                      disabled={page <= 1}
                      onClick={() => changePage(page - 1)}
                      className="flex items-center gap-2 text-text-muted transition hover:text-text-main disabled:opacity-30"
                    >
                      <ChevronLeft size={14} />
                      Prev
                    </button>

                    <span className="text-text-muted">
                      {page} / {totalPages}
                    </span>

                    <button
                      type="button"
                      disabled={page >= totalPages}
                      onClick={() => changePage(page + 1)}
                      className="flex items-center gap-2 text-text-muted transition hover:text-text-main disabled:opacity-30"
                    >
                      Next
                      <ChevronRight size={14} />
                    </button>
                  </div>
                )}
              </>
            )}
        </div>
      </section>
    </div>
  );
}
