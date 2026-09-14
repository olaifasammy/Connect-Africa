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

const resourceColors: Record<ResourceType, string> = {
  entity: 'text-emerald border-emerald/20 bg-emerald/5',
  article: 'text-sage border-sage/20 bg-sage/5',
  relationship: 'text-gold border-gold/20 bg-gold/5',
  source: 'text-sand border-sand/20 bg-sand/5',
  ontology: 'text-terra border-terra/20 bg-terra/5',
  user: 'text-mist border-white/10 bg-white/[0.03]',
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
    <div className="min-h-[calc(100vh-72px)]">
      <section className="border-b border-white/[0.06]">
        <div className="ca-container py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl">
            <p className="ca-eyebrow">Universal knowledge search</p>

            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-cloud sm:text-5xl">
              Find the entities behind the knowledge.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-mist sm:text-base">
              Search across entities, articles, relationships, sources and
              ontologies. Search results are ranked by the current knowledge
              index and relevance model.
            </p>

            <form onSubmit={submitSearch} className="relative mt-8">
              <div className="flex items-center rounded-2xl border border-white/[0.10] bg-forest/80 p-2 shadow-soft backdrop-blur-xl transition focus-within:border-emerald/50">
                <SearchIcon className="ml-4 shrink-0 text-mist" size={21} />

                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search an entity, place, person, institution..."
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-cloud outline-none placeholder:text-mist/60 sm:text-base"
                  autoFocus
                />

                {query && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="rounded-lg p-2 text-mist transition hover:bg-white/[0.05] hover:text-cloud"
                    aria-label="Clear search"
                  >
                    <X size={17} />
                  </button>
                )}

                <button
                  type="submit"
                  className="rounded-xl bg-emerald px-5 py-3 text-sm font-semibold text-ink transition hover:bg-sage"
                >
                  Search
                </button>
              </div>

              {(suggestions.length > 0 || suggestionsLoading) && query.trim().length >= 2 && (
                <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-white/[0.08] bg-forest shadow-soft">
                  {suggestionsLoading ? (
                    <div className="flex items-center gap-2 px-4 py-3 text-xs text-mist">
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      Finding matches...
                    </div>
                  ) : (
                    suggestions.slice(0, 6).map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => selectSuggestion(suggestion)}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-cloud transition hover:bg-white/[0.05]"
                      >
                        <SearchIcon size={15} className="text-mist" />
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
          <aside>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-mist">
              <Filter size={14} />
              Filter
            </div>

            <div className="mt-4 space-y-1">
              <button
                type="button"
                onClick={() => setTypeFilter('')}
                className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  !resourceType
                    ? 'bg-emerald/10 text-emerald'
                    : 'text-mist hover:bg-white/[0.04] hover:text-cloud'
                }`}
              >
                All knowledge
              </button>

              {resourceTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setTypeFilter(type.value)}
                  className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    resourceType === type.value
                      ? 'bg-emerald/10 text-emerald'
                      : 'text-mist hover:bg-white/[0.04] hover:text-cloud'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </aside>

          <div className="min-w-0">
            {!hasQuery ? (
              <div className="rounded-2xl border border-dashed border-white/[0.10] bg-forest/30 px-6 py-16 text-center">
                <SearchIcon className="mx-auto text-mist" size={28} />
                <h2 className="mt-4 text-xl font-semibold text-cloud">
                  Search Africa's connected knowledge
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-mist">
                  Start with an entity, place, institution, culture, historical
                  subject or relationship.
                </p>
              </div>
            ) : (
              <>
                <div className="flex flex-col justify-between gap-4 border-b border-white/[0.07] pb-5 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs text-mist">
                      {loading
                        ? 'Searching knowledge...'
                        : `${response?.total ?? 0} result${
                            response?.total === 1 ? '' : 's'
                          }`}
                    </p>

                    <h2 className="mt-1 text-xl font-semibold text-cloud">
                      {activeQuery}
                    </h2>
                  </div>

                  <label className="flex items-center gap-2 text-xs text-mist">
                    <ArrowUpDown size={14} />
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
                      className="rounded-lg border border-white/[0.08] bg-forest px-3 py-2 text-xs text-cloud outline-none"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="alphabetical">Alphabetical</option>
                      <option value="dateCreated">Newest</option>
                    </select>
                  </label>
                </div>

                {error && (
                  <div className="mt-6 rounded-xl border border-terra/25 bg-terra/5 p-4 text-sm text-terra">
                    {error}
                  </div>
                )}

                {loading && !response && (
                  <div className="flex items-center justify-center py-20 text-mist">
                    <LoaderCircle className="mr-3 animate-spin" size={20} />
                    Searching the knowledge index...
                  </div>
                )}

                {!loading && !error && response && response.results.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-white/[0.10] bg-forest/30 px-6 py-16 text-center">
                    <Sparkles className="mx-auto text-mist" size={26} />
                    <h2 className="mt-4 text-lg font-semibold text-cloud">
                      No knowledge found
                    </h2>
                    <p className="mt-2 text-sm text-mist">
                      Try a broader entity name or remove the resource filter.
                    </p>
                  </div>
                )}

                <div className="mt-6 space-y-3">
                  {response?.results.map((result) => {
                    const Icon = resourceIcons[result.resourceType];
                    const typeStyle = resourceColors[result.resourceType];

                    return (
                      <article
                        key={`${result.resourceType}-${result.id}`}
                        className="group rounded-2xl border border-white/[0.07] bg-forest/45 p-5 transition duration-300 hover:border-emerald/25 hover:bg-forest/75"
                      >
                        <div className="flex gap-4">
                          <div
                            className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${typeStyle}`}
                          >
                            <Icon size={17} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sage">
                                {result.resourceType}
                              </span>

                              <span className="text-[10px] text-mist/50">
                                Relevance {result.score.toFixed(3)}
                              </span>
                            </div>

                            <h3 className="mt-2 text-lg font-semibold text-cloud">
                              {result.title}
                            </h3>

                            {result.snippet && (
                              <p className="mt-2 max-w-3xl text-sm leading-6 text-mist">
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
                  <div className="mt-8 flex items-center justify-between border-t border-white/[0.07] pt-5">
                    <button
                      type="button"
                      disabled={page <= 1}
                      onClick={() => changePage(page - 1)}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 text-sm text-mist transition hover:bg-white/[0.04] hover:text-cloud disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ChevronLeft size={15} />
                      Previous
                    </button>

                    <span className="text-xs tabular-nums text-mist">
                      Page {page} of {totalPages}
                    </span>

                    <button
                      type="button"
                      disabled={page >= totalPages}
                      onClick={() => changePage(page + 1)}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 text-sm text-mist transition hover:bg-white/[0.04] hover:text-cloud disabled:cursor-not-allowed disabled:opacity-30"
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
