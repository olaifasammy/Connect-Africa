import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  ChevronRight,
  CircleDot,
  Compass,
  Crown,
  GraduationCap,
  Heart,
  History,
  Languages,
  Map,
  Network,
  Search,
  Sparkles,
  Users,
} from 'lucide-react';
import { useState } from 'react';

const categories = [
  { label: 'History', icon: History },
  { label: 'Geography', icon: Map },
  { label: 'Kingdoms & Empires', icon: Crown },
  { label: 'Languages', icon: Languages },
  { label: 'Ethnic Groups', icon: Users },
  { label: 'Arts & Culture', icon: Sparkles },
  { label: 'Education', icon: GraduationCap },
  { label: 'Religion', icon: Heart },
];

const popularSearches = [
  'Oduduwa',
  'Mali Empire',
  'Swahili Coast',
  'Great Zimbabwe',
  'Nile Valley',
];

const networkNodes = [
  {
    title: 'Mali Empire',
    type: 'Historical polity',
    description:
      'A connected knowledge view of rulers, cities, trade routes, cultures and historical periods.',
    nodes: ['Mali', 'Mansa Musa', 'Timbuktu', 'Sankore'],
  },
  {
    title: 'Swahili Coast',
    type: 'Cultural region',
    description:
      'Explore the relationships between coastal cities, languages, trade networks and cultures.',
    nodes: ['Kilwa', 'Mombasa', 'Swahili', 'Indian Ocean'],
  },
  {
    title: 'Ile-Ife',
    type: 'Cultural centre',
    description:
      'Follow the network around Yoruba history, mythology, archaeology and cultural heritage.',
    nodes: ['Oduduwa', 'Yoruba', 'Ife', 'Osun'],
  },
];

const discoveries = [
  {
    eyebrow: 'Archaeology · West Africa',
    title: 'The walls of ancient Benin',
    description:
      'Follow the people, settlements, engineering and historical context connected to one of Africa’s remarkable earthwork systems.',
    tag: 'Knowledge discovery',
  },
  {
    eyebrow: 'History · North Africa',
    title: 'Caravan routes across the Sahara',
    description:
      'Trace the relationships between cities, commodities, kingdoms and communities that connected the desert.',
    tag: 'Connected history',
  },
  {
    eyebrow: 'Culture · East Africa',
    title: 'The living world of Swahili',
    description:
      'Explore how language, coastlines, trade and cultural exchange shaped a major African cultural sphere.',
    tag: 'Cultural network',
  },
];

const paths = [
  {
    title: 'Rise of West African Empires',
    description: 'Ghana → Mali → Songhai',
    count: '12 entities',
  },
  {
    title: 'Ancient Civilizations of North Africa',
    description: 'Nile Valley → Kush → Egypt',
    count: '18 entities',
  },
  {
    title: 'Pre-colonial Trade Systems',
    description: 'Sahara → Sahel → Indian Ocean',
    count: '21 entities',
  },
];

export function HomePage() {
  const [query, setQuery] = useState('');

  return (
    <div className="min-h-screen bg-scholar-canvas bg-canvas text-text-main font-sans transition-colors duration-300">
      {/* -------------------------------------------------
          HERO SECTION — THE SCHOLAR DIGITAL ARCHIVE
      ------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-stone/20 py-16 sm:py-24 lg:py-28">
        <div className="ca-container relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-gold">
              <CircleDot size={12} className="text-gold animate-pulse" />
              African Knowledge Infrastructure & Graph
            </div>

            <h1 className="font-serif text-balance text-4xl font-bold leading-tight tracking-tight text-text-main sm:text-6xl lg:text-7xl">
              Discover. <span className="italic text-emerald-900 dark:text-emerald-400">Connect.</span>
              <br />
              Understand Africa.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-text-muted">
              Explore the people, places, events, languages, cultures, and histories shaping the continent — preserved and connected as an authoritative knowledge graph.
            </p>

            {/* Search Bar */}
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (query.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
                }
              }}
              className="mx-auto mt-8 max-w-2xl"
            >
              <div className="group flex min-h-[56px] items-center rounded-xl border border-stone/30 bg-surface p-1.5 shadow-scholar transition-all focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20">
                <Search size={20} className="ml-3 shrink-0 text-stone" />

                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search people, places, cultures, history..."
                  className="min-w-0 flex-1 bg-transparent px-3 font-sans text-sm text-text-main outline-none placeholder:text-stone/60"
                  aria-label="Search Connect-Africa"
                />

                <button
                  type="submit"
                  className="ca-btn-primary h-11 shrink-0 px-5 text-xs uppercase tracking-wider"
                >
                  Search
                  <ArrowRight size={15} />
                </button>
              </div>
            </form>

            {/* Popular Searches */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 font-sans">
              <span className="mr-1 font-mono text-xs uppercase tracking-wider text-text-muted">
                Popular:
              </span>

              {popularSearches.map((item) => (
                <a
                  key={item}
                  href={`/search?q=${encodeURIComponent(item)}`}
                  className="rounded-lg border border-stone/20 bg-surface px-3 py-1 font-mono text-xs text-text-muted transition-colors hover:border-gold hover:text-emerald-900 dark:hover:text-gold"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------
          CATEGORY GRID
      ------------------------------------------------- */}
      <section className="ca-container py-16 sm:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="ca-eyebrow">Taxonomy</p>
            <h2 className="mt-1 font-serif text-2xl font-bold tracking-tight text-text-main sm:text-3xl">
              Explore by Domain Category
            </h2>
          </div>

          <a
            href="/search"
            className="hidden items-center gap-1 font-sans text-xs font-semibold text-emerald-900 dark:text-gold transition hover:underline sm:flex"
          >
            View all categories
            <ChevronRight size={14} />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map(({ label, icon: Icon }) => (
            <a
              key={label}
              href={`/search?category=${encodeURIComponent(label)}`}
              className="ca-card-hover flex flex-col items-center justify-center p-4 text-center group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-stone/20 bg-canvas text-emerald-900 dark:text-emerald-400 transition group-hover:border-gold group-hover:text-gold">
                <Icon size={18} strokeWidth={1.8} />
              </div>

              <p className="mt-3 font-sans text-xs font-semibold text-text-main group-hover:text-emerald-900 dark:group-hover:text-gold">
                {label}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------
          CURATED DISCOVERIES
      ------------------------------------------------- */}
      <section className="border-y border-stone/20 bg-surface/50 py-16 sm:py-20">
        <div className="ca-container">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="ca-eyebrow">Archival Highlights</p>
              <h2 className="mt-1 font-serif text-2xl font-bold tracking-tight text-text-main sm:text-3xl">
                Featured Knowledge Discoveries
              </h2>
            </div>

            <a
              href="/articles"
              className="hidden items-center gap-1 font-sans text-xs font-semibold text-text-muted hover:text-text-main sm:flex"
            >
              Explore all articles
              <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {discoveries.map((item, index) => (
              <article
                key={item.title}
                className="ca-card-hover group flex flex-col justify-between"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className={index === 0 ? "ca-badge-gold" : index === 1 ? "ca-badge-emerald" : "ca-badge-clay"}>
                      {item.tag}
                    </span>
                    <ArrowUpRight size={16} className="text-stone group-hover:text-gold transition-colors" />
                  </div>

                  <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                    {item.eyebrow}
                  </p>

                  <h3 className="mt-2 font-serif text-xl font-bold tracking-tight text-text-main group-hover:text-emerald-900 dark:group-hover:text-gold">
                    {item.title}
                  </h3>

                  <p className="mt-3 font-sans text-xs leading-relaxed text-text-muted">
                    {item.description}
                  </p>
                </div>

                <a
                  href="/articles"
                  className="mt-6 ca-article-link inline-flex items-center gap-1.5 font-sans text-xs font-semibold"
                >
                  Read archived entry
                  <ChevronRight size={13} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------
          THE KNOWLEDGE NETWORK / GRAPH
      ------------------------------------------------- */}
      <section className="ca-container py-16 sm:py-20">
        <div className="mb-8 max-w-2xl">
          <p className="ca-eyebrow">The Knowledge Graph</p>

          <div className="mt-1 flex items-center gap-3">
            <h2 className="font-serif text-2xl font-bold tracking-tight text-text-main sm:text-3xl">
              Explore Entity Relationships
            </h2>

            <Network size={22} className="text-gold" strokeWidth={1.8} />
          </div>

          <p className="mt-3 font-sans text-sm leading-relaxed text-text-muted">
            Connect-Africa models history as a living graph. Uncover how people, places, institutions, and historical epochs interconnect.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {networkNodes.map((network) => (
            <a
              key={network.title}
              href="/articles"
              className="ca-card-hover group flex flex-col justify-between"
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="ca-badge-gold">{network.type}</span>
                  <ArrowUpRight size={15} className="text-stone group-hover:text-gold transition-colors" />
                </div>

                <div className="relative mb-6 h-28 rounded-xl border border-stone/20 bg-canvas p-3">
                  <div className="absolute left-1/2 top-1/2 flex h-12 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border border-emerald-900 dark:border-emerald-500 bg-emerald-900 dark:bg-emerald-700 text-white font-serif text-xs font-bold shadow-sm">
                    {network.title}
                  </div>

                  {network.nodes.map((node, index) => {
                    const positions = [
                      'left-2 top-2',
                      'right-2 top-2',
                      'left-2 bottom-2',
                      'right-2 bottom-2',
                    ];

                    return (
                      <span
                        key={node}
                        className={`absolute ${positions[index]} rounded-md border border-stone/20 bg-surface px-2 py-0.5 font-mono text-[9px] text-text-muted`}
                      >
                        {node}
                      </span>
                    );
                  })}
                </div>

                <h3 className="font-serif text-lg font-bold text-text-main group-hover:text-emerald-900 dark:group-hover:text-gold">
                  {network.title}
                </h3>

                <p className="mt-2 font-sans text-xs leading-relaxed text-text-muted">
                  {network.description}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-1 font-mono text-xs font-semibold text-gold group-hover:underline">
                Explore Graph Nodes
                <ChevronRight size={12} />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------
          HISTORICAL TIMELINE
      ------------------------------------------------- */}
      <section className="border-y border-stone/20 bg-surface/50 py-16 sm:py-20">
        <div className="ca-container">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
              <CalendarDays size={18} />
            </div>

            <div>
              <p className="ca-eyebrow">Chronology</p>
              <h2 className="mt-1 font-serif text-2xl font-bold tracking-tight text-text-main sm:text-3xl">
                On This Day in African History
              </h2>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-2 top-2 h-[calc(100%-16px)] w-0.5 bg-stone/20 sm:left-1/2 sm:-translate-x-1/2" />

            <div className="space-y-6">
              {[
                {
                  date: 'Today in History',
                  title: 'Moments Connected Across Time',
                  description: 'Historical occurrences indexed against primary sources, entities, and geopolitical contexts.',
                },
                {
                  date: 'Trade & Culture',
                  title: 'Trans-Saharan & Maritime Networks',
                  description: 'Tracing century-long economic and scholarly exchanges across northern, western, and eastern coasts.',
                },
                {
                  date: 'Graph Integrity',
                  title: 'Verified Historical Provenance',
                  description: 'Every record is backed by primary source citations and ontological verification rules.',
                },
              ].map((item, index) => (
                <div
                  key={item.date}
                  className="relative grid gap-4 pl-8 sm:grid-cols-2 sm:gap-10 sm:pl-0"
                >
                  <div className={index % 2 === 0 ? 'sm:text-right' : 'sm:col-start-2'}>
                    <p className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">
                      {item.date}
                    </p>

                    <h3 className="mt-1 font-serif text-base font-bold text-text-main">
                      {item.title}
                    </h3>

                    <p className="mt-1 font-sans text-xs leading-relaxed text-text-muted">
                      {item.description}
                    </p>
                  </div>

                  <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-surface bg-emerald-900 sm:left-1/2 sm:-translate-x-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------
          FEATURED PATHS
      ------------------------------------------------- */}
      <section className="ca-container py-16 sm:py-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="ca-eyebrow">Guided Reading</p>
            <h2 className="mt-1 font-serif text-2xl font-bold tracking-tight text-text-main sm:text-3xl">
              Curated Research Paths
            </h2>
          </div>

          <Compass size={24} className="text-gold" strokeWidth={1.8} />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {paths.map((path, index) => (
            <a
              key={path.title}
              href="/search"
              className="ca-card-hover group flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-semibold text-gold">
                  PATH 0{index + 1} · {path.count}
                </span>

                <h3 className="mt-3 font-serif text-lg font-bold text-text-main group-hover:text-emerald-900 dark:group-hover:text-gold">
                  {path.title}
                </h3>

                <p className="mt-2 font-sans text-xs text-text-muted">
                  {path.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-stone/15 pt-4">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                  Follow Path
                </span>
                <ArrowRight size={14} className="text-gold group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------
          SUBSCRIPTION CTA
      ------------------------------------------------- */}
      <section className="ca-container pb-16 sm:pb-20">
        <div className="ca-card border-gold/40 bg-surface p-8 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                <BookOpen size={18} />
              </div>

              <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
                Stay connected to African knowledge.
              </h2>

              <p className="mt-2 font-sans text-sm text-text-muted">
                Receive new research entries, verified historical updates, and graph expansions directly from Connect Africa.
              </p>
            </div>

            <form
              onSubmit={(event) => event.preventDefault()}
              className="flex flex-col gap-2 sm:flex-row lg:flex-col"
            >
              <input
                type="email"
                placeholder="Enter your academic or personal email"
                aria-label="Email address"
                className="ca-input"
              />

              <button type="submit" className="ca-btn-primary">
                Subscribe to Knowledge Briefs
                <ArrowRight size={15} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
