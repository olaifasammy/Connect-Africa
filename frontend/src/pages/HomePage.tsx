import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Clock3,
  Compass,
  ExternalLink,
  Flame,
  GitBranch,
  Globe2,
  Landmark,
  Map,
  Network,
  Search,
  Sparkles,
  TrendingUp,
  UsersRound,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { EntityVisual } from '../components/entity/EntityVisual';

type FeaturedEntity = {
  name: string;
  type: 'PERSON' | 'PLACE' | 'ORGANIZATION' | 'CULTURE';
  description: string;
  connections: string[];
};

const featuredEntities: FeaturedEntity[] = [
  {
    name: 'Oduduwa',
    type: 'PERSON',
    description:
      'A foundational figure in Yoruba traditions, connected to histories of origin, kingship and Ile-Ife.',
    connections: ['Ile-Ife', 'Yoruba traditions', 'Kingship'],
  },
  {
    name: 'Ile-Ife',
    type: 'PLACE',
    description:
      'A historic centre of Yoruba civilisation with deep relationships across culture, archaeology and political history.',
    connections: ['Oduduwa', 'Ife traditions', 'Archaeology'],
  },
  {
    name: 'African Union',
    type: 'ORGANIZATION',
    description:
      'A continental institution connecting African states through governance, diplomacy and regional cooperation.',
    connections: ['Member states', 'Governance', 'Pan-Africanism'],
  },
  {
    name: 'Yoruba Traditions',
    type: 'CULTURE',
    description:
      'A broad cultural knowledge domain spanning language, belief systems, histories, arts and institutions.',
    connections: ['Oduduwa', 'Ile-Ife', 'Orisha traditions'],
  },
];

const discoveryAreas = [
  { label: 'People', icon: UsersRound },
  { label: 'Places', icon: Map },
  { label: 'Organizations', icon: Landmark },
  { label: 'Cultures', icon: Globe2 },
  { label: 'History', icon: BookOpen },
  { label: 'Systems', icon: Network },
];

const regions = [
  ['North Africa', 'Maghreb, Nile Valley and the Sahara'],
  ['West Africa', 'Atlantic societies, Sahel and Gulf of Guinea'],
  ['Central Africa', 'Congo Basin and surrounding regions'],
  ['East Africa', 'Great Lakes, Horn and Indian Ocean'],
  ['Southern Africa', 'Southern states, cultures and systems'],
];

const latestUpdates = [
  {
    kind: 'Entity',
    title: 'Knowledge entities entering the graph',
    description:
      'New entities become discoverable through their relationships, aliases and source evidence.',
    icon: Sparkles,
  },
  {
    kind: 'Relationship',
    title: 'Connections across the knowledge graph',
    description:
      'Relationships reveal how people, places, institutions and cultural systems connect.',
    icon: GitBranch,
  },
  {
    kind: 'Source',
    title: 'Evidence attached to knowledge',
    description:
      'Sources provide provenance for entities, relationships and the knowledge built around them.',
    icon: ExternalLink,
  },
];

const trendingTopics = [
  'African governance systems',
  'Ile-Ife and Yoruba history',
  'Pan-African institutions',
  'African cultural knowledge',
  'Historical trade networks',
];

export function HomePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const rotatingEntity = useMemo(() => {
    const day = Math.floor(Date.now() / 86_400_000);
    const index = Math.floor(day / 3) % featuredEntities.length;
    return featuredEntities[index];
  }, []);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = search.trim();

    if (!query) {
      navigate('/search');
      return;
    }

    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(34,160,107,0.11),transparent_28%),radial-gradient(circle_at_15%_75%,rgba(217,164,65,0.06),transparent_26%)]" />

        <div className="ca-container relative py-20 sm:py-24 lg:py-32">
          <div className="max-w-5xl">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-emerald" />
              <span className="ca-eyebrow">Africa Knowledge Platform</span>
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.045em] text-cloud sm:text-6xl lg:text-8xl">
              Africa,
              <span className="block text-sage">connected.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-mist sm:text-lg">
              Explore the people, places, cultures, institutions, histories
              and systems that shape Africa — connected through entities,
              relationships and evidence.
            </p>

            <form onSubmit={submitSearch} className="mt-10 max-w-3xl">
              <div className="group flex items-center rounded-2xl border border-white/[0.10] bg-forest/80 p-2 shadow-soft backdrop-blur-xl transition focus-within:border-emerald/50">
                <Search className="ml-4 shrink-0 text-mist" size={21} />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search an entity, place, person, institution..."
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-cloud outline-none placeholder:text-mist/60 sm:text-base"
                />

                <button
                  type="submit"
                  className="hidden rounded-xl bg-emerald px-5 py-3 text-sm font-semibold text-ink transition hover:bg-sage sm:block"
                >
                  Explore
                </button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-mist">
                <span>Try:</span>
                {['Oduduwa', 'African Union', 'Nile Valley'].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => navigate(`/search?q=${encodeURIComponent(term)}`)}
                    className="text-sage transition hover:text-cloud"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </form>
          </div>

          <div className="mt-20 grid gap-4 sm:grid-cols-3">
            {[
              ['ENTITY', 'Knowledge starts with things that exist.'],
              ['RELATIONSHIP', 'Meaning emerges through connection.'],
              ['EVIDENCE', 'Knowledge remains grounded in sources.'],
            ].map(([label, text], index) => (
              <div
                key={label}
                className="border-l border-white/[0.10] pl-5"
              >
                <p className="text-[10px] font-semibold tracking-[0.2em] text-emerald">
                  0{index + 1} / {label}
                </p>
                <p className="mt-2 max-w-xs text-sm leading-6 text-mist">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore */}
      <section className="border-b border-white/[0.06]">
        <div className="ca-container py-16 lg:py-20">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="ca-eyebrow">Explore knowledge</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-cloud">
                Start anywhere.
              </h2>
            </div>

            <button
              onClick={() => navigate('/explore')}
              className="inline-flex items-center gap-2 text-sm font-medium text-sage transition hover:text-cloud"
            >
              Explore all
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {discoveryAreas.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => navigate(`/search?q=${encodeURIComponent(label)}`)}
                className="group rounded-xl border border-white/[0.07] bg-forest/50 p-5 text-left transition duration-300 hover:-translate-y-0.5 hover:border-emerald/35 hover:bg-forest"
              >
                <Icon
                  size={20}
                  strokeWidth={1.5}
                  className="text-sage transition group-hover:text-emerald"
                />
                <span className="mt-8 block text-sm font-medium text-cloud">
                  {label}
                </span>
                <ChevronRight
                  size={15}
                  className="mt-2 text-mist/50 transition group-hover:translate-x-1 group-hover:text-sage"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured knowledge */}
      <section className="border-b border-white/[0.06]">
        <div className="ca-container py-16 lg:py-24">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="ca-eyebrow">Featured knowledge</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-cloud sm:text-4xl">
                Meet the entities behind the knowledge.
              </h2>
            </div>

            <button
              onClick={() => navigate('/entities')}
              className="inline-flex items-center gap-2 text-sm font-medium text-sage transition hover:text-cloud"
            >
              Browse entities
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {featuredEntities.map((entity, index) => (
              <article
                key={entity.name}
                className="group overflow-hidden rounded-2xl border border-white/[0.07] bg-forest/60 transition duration-300 hover:-translate-y-1 hover:border-emerald/30 hover:shadow-glow"
              >
                <EntityVisual
                  type={entity.type}
                  label={entity.name}
                  index={index}
                />

                <div className="p-5">
                  <h3 className="text-xl font-semibold tracking-tight text-cloud">
                    {entity.name}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-mist">
                    {entity.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {entity.connections.map((connection) => (
                      <span
                        key={connection}
                        className="rounded-full border border-white/[0.07] px-2.5 py-1 text-[10px] text-sage"
                      >
                        {connection}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/entities/${encodeURIComponent(entity.name)}`)
                    }
                    className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald transition hover:text-sage"
                  >
                    View entity
                    <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Graph */}
      <section className="border-b border-white/[0.06]">
        <div className="ca-container py-16 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="ca-eyebrow">Knowledge graph</p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-cloud sm:text-4xl">
                Knowledge is not a list.
                <span className="block text-sage">It is a network.</span>
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-mist">
                Connect-Africa models entities and the relationships between
                them so that discovery can follow meaning, not just matching
                words.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  ['Strong connection', 'Oduduwa → Ile-Ife', '0.94'],
                  ['Cultural relationship', 'Ile-Ife → Yoruba traditions', '0.88'],
                  ['Institutional relationship', 'African Union → Member states', '0.82'],
                ].map(([label, relation, strength]) => (
                  <div
                    key={relation}
                    className="rounded-xl border border-white/[0.07] bg-forest/60 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[10px] uppercase tracking-[0.16em] text-sage">
                        {label}
                      </span>
                      <span className="text-[10px] tabular-nums text-gold">
                        {strength}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-sm text-cloud">
                      <span>{relation.split(' → ')[0]}</span>
                      <ArrowRight size={14} className="text-emerald" />
                      <span>{relation.split(' → ')[1]}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/graph')}
                className="mt-7 inline-flex items-center gap-2 rounded-xl border border-white/[0.09] px-4 py-3 text-sm font-medium text-cloud transition hover:border-emerald/40 hover:bg-forest"
              >
                Open knowledge graph
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="relative min-h-[440px] overflow-hidden rounded-3xl border border-white/[0.08] bg-forest/55 shadow-soft">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,160,107,0.12),transparent_45%)]" />

              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 700 500"
                fill="none"
                aria-label="Knowledge graph preview"
              >
                <defs>
                  <filter id="softGlow">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {[
                  [350, 245, 130, 100],
                  [350, 245, 165, 72],
                  [350, 245, 175, 225],
                  [350, 245, 105, 260],
                  [350, 245, 270, 285],
                  [350, 245, 325, 155],
                  [350, 245, 270, 70],
                ].map(([x1, y1, x2, y2], index) => (
                  <g key={`${x2}-${y2}`}>
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={index < 3 ? '#22A06B' : '#8BC7A8'}
                      strokeOpacity={index < 3 ? '0.5' : '0.2'}
                      strokeWidth={index < 3 ? '2' : '1'}
                    />
                    <circle
                      cx={(x1 + x2) / 2}
                      cy={(y1 + y2) / 2}
                      r="3"
                      fill="#D9A441"
                      fillOpacity="0.65"
                    />
                  </g>
                ))}

                {([
                  [350, 245, 36, '#22A06B'],
                  [480, 173, 23, '#D9A441'],
                  [515, 317, 27, '#C96B4B'],
                  [175, 345, 25, '#8BC7A8'],
                  [180, 317, 18, '#8BC7A8'],
                  [455, 75, 19, '#D9A441'],
                  [625, 145, 17, '#8BC7A8'],
                  [80, 190, 16, '#C96B4B'],
                ] as [number, number, number, string][]).map(([cx, cy, radius, fill], index) => (
                  <g key={`${cx}-${cy}`}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={radius}
                      fill={fill}
                      fillOpacity={index === 0 ? '0.18' : '0.08'}
                      stroke={fill}
                      strokeOpacity={index === 0 ? '0.8' : '0.35'}
                      filter={index === 0 ? 'url(#softGlow)' : undefined}
                    />
                    <circle
                      cx={cx}
                      cy={cy}
                      r={index === 0 ? '8' : '5'}
                      fill={fill}
                      fillOpacity="0.8"
                    />
                  </g>
                ))}
              </svg>

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-xs font-semibold tracking-[0.16em] text-emerald">
                  ENTITY
                </div>
                <div className="mt-1 text-2xl font-semibold text-cloud">
                  Oduduwa
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.16em] text-mist">
                  7 connected entities
                </div>
              </div>

              {[
                ['Ile-Ife', 'top-[30%] right-[22%]'],
                ['Yoruba', 'bottom-[26%] right-[20%]'],
                ['Orisha', 'bottom-[22%] left-[17%]'],
                ['History', 'top-[35%] left-[10%]'],
              ].map(([label, position]) => (
                <div
                  key={label}
                  className={`absolute ${position} rounded-full border border-white/[0.10] bg-ink/80 px-3 py-1.5 text-[10px] text-sage backdrop-blur`}
                >
                  {label}
                </div>
              ))}

              <div className="absolute bottom-5 left-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-mist">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
                Relationship preview
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest + Trending */}
      <section className="border-b border-white/[0.06]">
        <div className="ca-container py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="ca-eyebrow">Latest updates</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-cloud">
                    What is changing?
                  </h2>
                </div>

                <Clock3 size={20} className="text-mist" />
              </div>

              <div className="mt-8 divide-y divide-white/[0.07] rounded-2xl border border-white/[0.07] bg-forest/45">
                {latestUpdates.map(({ kind, title, description, icon: Icon }) => (
                  <button
                    key={title}
                    onClick={() => navigate('/explore')}
                    className="group flex w-full items-start gap-5 p-5 text-left transition hover:bg-forest/70 sm:p-6"
                  >
                    <div className="mt-1 rounded-lg border border-white/[0.08] bg-ink/50 p-2.5 text-emerald">
                      <Icon size={17} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
                          {kind}
                        </span>
                      </div>

                      <h3 className="mt-1 text-sm font-semibold text-cloud">
                        {title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-mist">
                        {description}
                      </p>
                    </div>

                    <ChevronRight
                      size={17}
                      className="mt-1 shrink-0 text-mist/50 transition group-hover:translate-x-1 group-hover:text-sage"
                    />
                  </button>
                ))}
              </div>
            </div>

            <aside>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="ca-eyebrow">Trending contents</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-cloud">
                    Follow the signal.
                  </h2>
                </div>

                <Flame size={20} className="text-gold" />
              </div>

              <div className="mt-8 space-y-2">
                {trendingTopics.map((topic, index) => (
                  <button
                    key={topic}
                    onClick={() =>
                      navigate(`/search?q=${encodeURIComponent(topic)}`)
                    }
                    className="group flex w-full items-center gap-4 rounded-xl border border-transparent px-4 py-4 text-left transition hover:border-white/[0.07] hover:bg-forest/60"
                  >
                    <span className="w-6 text-xs tabular-nums text-mist/60">
                      0{index + 1}
                    </span>
                    <span className="flex-1 text-sm text-cloud">
                      {topic}
                    </span>
                    <TrendingUp
                      size={15}
                      className="text-mist/40 transition group-hover:text-emerald"
                    />
                  </button>
                ))}
              </div>

              <p className="mt-5 text-xs leading-5 text-mist/60">
                Trending signals will be powered by search and analytics data
                as the platform matures.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* Rotating discovery */}
      <section className="border-b border-white/[0.06]">
        <div className="ca-container py-16 lg:py-20">
          <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-[radial-gradient(circle_at_80%_20%,rgba(217,164,65,0.12),transparent_32%),#10201A] p-7 sm:p-10 lg:p-12">
            <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-emerald/5 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                  <Compass size={14} />
                  Start with an entity
                </div>

                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-cloud sm:text-4xl">
                  {rotatingEntity.name}
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-mist">
                  {rotatingEntity.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {rotatingEntity.connections.map((connection) => (
                    <span
                      key={connection}
                      className="rounded-full border border-white/[0.08] bg-ink/20 px-3 py-1.5 text-xs text-sage"
                    >
                      {connection}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() =>
                    navigate(
                      `/entities/${encodeURIComponent(rotatingEntity.name)}`
                    )
                  }
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gold px-5 py-3 text-sm font-semibold text-ink transition hover:bg-sand"
                >
                  Explore {rotatingEntity.name}
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="hidden lg:block">
                <div className="relative h-48 w-48 rounded-full border border-gold/20">
                  <div className="absolute inset-8 rounded-full border border-emerald/20" />
                  <div className="absolute inset-16 rounded-full bg-gold/10" />
                  <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_35px_rgba(217,164,65,0.5)]" />
                  <div className="absolute left-1/2 top-0 h-1/2 w-px origin-bottom -rotate-[28deg] bg-gradient-to-t from-gold/60 to-transparent" />
                  <div className="absolute bottom-0 left-1/2 h-1/2 w-px origin-top rotate-[52deg] bg-gradient-to-b from-emerald/50 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regions */}
      <section>
        <div className="ca-container py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="ca-eyebrow">Explore Africa</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-cloud sm:text-4xl">
                Geography as knowledge.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-mist">
                Move through the continent by region, then follow the people,
                places, institutions and histories connected to each one.
              </p>

              <button
                onClick={() => navigate('/explore')}
                className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-sage transition hover:text-cloud"
              >
                Open continental explorer
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {regions.map(([region, description], index) => (
                <button
                  key={region}
                  onClick={() =>
                    navigate(`/search?q=${encodeURIComponent(region)}`)
                  }
                  className="group rounded-xl border border-white/[0.07] bg-forest/35 p-5 text-left transition hover:border-emerald/25 hover:bg-forest/70"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tabular-nums text-mist/60">
                      0{index + 1}
                    </span>
                    <Map
                      size={15}
                      className="text-mist/50 transition group-hover:text-emerald"
                    />
                  </div>

                  <h3 className="mt-8 text-base font-semibold text-cloud">
                    {region}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-mist">
                    {description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06]">
        <div className="ca-container flex flex-col gap-5 py-8 text-xs text-mist sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-semibold tracking-[0.16em] text-cloud">
              CONNECT-AFRICA
            </span>
            <span className="ml-3 text-mist/60">
              Africa knowledge, connected.
            </span>
          </div>

          <div className="flex flex-wrap gap-5">
            <button
              onClick={() => navigate('/about')}
              className="transition hover:text-cloud"
            >
              About
            </button>
            <button
              onClick={() => navigate('/sources')}
              className="transition hover:text-cloud"
            >
              Sources
            </button>
            <button
              onClick={() => navigate('/research')}
              className="transition hover:text-cloud"
            >
              Research
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
