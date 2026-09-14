import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  ChevronRight,
  CircleDot,
  Compass,
  Crown,
  Globe2,
  GraduationCap,
  Heart,
  History,
  Languages,
  Map,
  Menu,
  Network,
  Search,
  Sparkles,
  Users,
  X,
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0b1110] text-[#f3f1ea]">
      {/* -------------------------------------------------
          HERO
      ------------------------------------------------- */}
      <section className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-[-20%] h-[650px] w-[900px] -translate-x-1/2 rounded-full bg-emerald/[0.07] blur-[120px]" />
          <div className="absolute -left-32 top-32 h-72 w-72 rounded-full bg-[#b47a3d]/[0.08] blur-[100px]" />
          <div className="absolute -right-32 top-56 h-80 w-80 rounded-full bg-sage/[0.06] blur-[110px]" />
        </div>

        <div className="ca-container relative py-16 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald/20 bg-emerald/[0.07] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-sage">
              <CircleDot size={11} />
              Africa's knowledge network
            </div>

            <h1 className="text-balance text-[clamp(2.65rem,9vw,6.7rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-cloud">
              Discover.
              <br />
              <span className="text-sage">Connect.</span>
              <br />
              Understand Africa.
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-cloud/45 sm:text-base">
              Explore the people, places, events, languages, cultures and
              histories that shape the continent — connected as one living
              knowledge graph.
            </p>

            <form
              onSubmit={(event) => {
                event.preventDefault();

                if (query.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(
                    query.trim(),
                  )}`;
                }
              }}
              className="mx-auto mt-9 max-w-2xl"
            >
              <div className="group flex min-h-[58px] items-center rounded-2xl border border-white/[0.1] bg-[#f3f1ea] p-1.5 shadow-[0_20px_80px_rgba(0,0,0,0.28)] transition focus-within:border-emerald/50">
                <Search
                  size={19}
                  className="ml-4 shrink-0 text-[#31403a]/55"
                />

                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search people, places, cultures, history..."
                  className="min-w-0 flex-1 bg-transparent px-3 text-sm text-[#16201c] outline-none placeholder:text-[#52605a]/55"
                  aria-label="Search Connect-Africa"
                />

                <button
                  type="submit"
                  className="flex h-11 shrink-0 items-center gap-2 rounded-xl bg-[#c6894a] px-4 text-xs font-semibold text-[#07100c] transition hover:bg-[#d89a55]"
                >
                  Search
                  <ArrowRight size={15} />
                </button>
              </div>
            </form>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <span className="mr-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cloud/25">
                Popular
              </span>

              {popularSearches.map((item) => (
                <a
                  key={item}
                  href={`/search?q=${encodeURIComponent(item)}`}
                  className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[11px] text-cloud/45 transition hover:border-emerald/25 hover:bg-emerald/[0.06] hover:text-cloud/75"
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
      <section className="ca-container pb-16 sm:pb-20">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="ca-eyebrow">Explore</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-cloud sm:text-3xl">
              Explore by category
            </h2>
          </div>

          <a
            href="/search"
            className="hidden items-center gap-1 text-xs font-medium text-sage transition hover:text-cloud sm:flex"
          >
            View all
            <ChevronRight size={14} />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map(({ label, icon: Icon }) => (
            <a
              key={label}
              href={`/search?category=${encodeURIComponent(label)}`}
              className="group rounded-2xl border border-white/[0.065] bg-white/[0.025] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-emerald/25 hover:bg-emerald/[0.045]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-[#111a17] text-sage transition group-hover:border-emerald/25 group-hover:bg-emerald/[0.08]">
                <Icon size={17} strokeWidth={1.7} />
              </div>

              <p className="mt-4 text-xs font-medium leading-5 text-cloud/65 group-hover:text-cloud">
                {label}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------
          DISCOVERIES
      ------------------------------------------------- */}
      <section className="border-y border-white/[0.055] bg-[#0e1714]">
        <div className="ca-container py-16 sm:py-20">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <p className="ca-eyebrow">Curated discovery</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-cloud sm:text-3xl">
                Discoveries
              </h2>
            </div>

            <button
              type="button"
              className="hidden items-center gap-1 text-xs text-cloud/35 transition hover:text-cloud sm:flex"
            >
              Explore more
              <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {discoveries.map((item, index) => (
              <article
                key={item.title}
                className="group overflow-hidden rounded-3xl border border-white/[0.07] bg-[#111a17] transition duration-300 hover:-translate-y-1 hover:border-emerald/25"
              >
                <div
                  className={[
                    'relative h-44 overflow-hidden',
                    index === 0
                      ? 'bg-[radial-gradient(circle_at_30%_40%,rgba(198,137,74,.34),transparent_32%),linear-gradient(135deg,#28382f,#9b6839_50%,#151e19)]'
                      : index === 1
                        ? 'bg-[radial-gradient(circle_at_70%_35%,rgba(34,160,107,.32),transparent_34%),linear-gradient(135deg,#15211c,#725738_55%,#111916)]'
                        : 'bg-[radial-gradient(circle_at_35%_35%,rgba(137,177,126,.3),transparent_30%),linear-gradient(135deg,#25362d,#5f765b 55%,#101713)]',
                  ].join(' ')}
                >
                  <div className="absolute inset-x-6 bottom-5 flex items-end justify-between">
                    <span className="rounded-full border border-white/15 bg-black/20 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/65 backdrop-blur">
                      {item.tag}
                    </span>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/20 text-white/70 backdrop-blur transition group-hover:bg-emerald group-hover:text-[#07100c]">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-sage/70">
                    {item.eyebrow}
                  </p>

                  <h3 className="mt-2 text-lg font-semibold tracking-[-0.025em] text-cloud">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-cloud/38">
                    {item.description}
                  </p>

                  <a
                    href="/search"
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-sage transition hover:text-cloud"
                  >
                    Read more
                    <ChevronRight size={13} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------
          KNOWLEDGE NETWORK
      ------------------------------------------------- */}
      <section className="ca-container py-16 sm:py-20">
        <div className="mb-7 max-w-2xl">
          <p className="ca-eyebrow">The graph</p>

          <div className="mt-2 flex items-center gap-3">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-cloud sm:text-3xl">
              Explore the knowledge network
            </h2>

            <Network
              size={22}
              className="hidden text-sage sm:block"
              strokeWidth={1.6}
            />
          </div>

          <p className="mt-3 text-sm leading-6 text-cloud/38">
            Connect-Africa is built around entities and relationships. Instead
            of isolated pages, discover how people, places, cultures and
            historical events connect.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {networkNodes.map((network) => (
            <a
              key={network.title}
              href="/search"
              className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0e1714] p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald/25"
            >
              <div className="absolute right-[-50px] top-[-50px] h-40 w-40 rounded-full bg-emerald/[0.055] blur-2xl transition group-hover:bg-emerald/[0.1]" />

              <div className="relative">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sage/65">
                    {network.type}
                  </span>

                  <ArrowUpRight
                    size={15}
                    className="text-cloud/25 transition group-hover:text-sage"
                  />
                </div>

                <div className="relative mb-6 h-28">
                  <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-emerald/25 bg-emerald/[0.09] text-[10px] font-semibold text-sage">
                    {network.title}
                  </div>

                  <div className="absolute left-[17%] top-[13%] h-px w-[27%] rotate-[25deg] bg-sage/15" />
                  <div className="absolute right-[17%] top-[13%] h-px w-[27%] -rotate-[25deg] bg-sage/15" />
                  <div className="absolute bottom-[12%] left-[18%] h-px w-[28%] -rotate-[25deg] bg-sage/15" />
                  <div className="absolute bottom-[12%] right-[18%] h-px w-[28%] rotate-[25deg] bg-sage/15" />

                  {network.nodes.map((node, index) => {
                    const positions = [
                      'left-[4%] top-0',
                      'right-[4%] top-0',
                      'left-[4%] bottom-0',
                      'right-[4%] bottom-0',
                    ];

                    return (
                      <span
                        key={node}
                        className={`absolute ${positions[index]} rounded-lg border border-white/[0.06] bg-[#131e1a] px-2 py-1 text-[8px] text-cloud/35`}
                      >
                        {node}
                      </span>
                    );
                  })}
                </div>

                <h3 className="text-base font-semibold text-cloud">
                  {network.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-cloud/35">
                  {network.description}
                </p>

                <div className="mt-4 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-sage/65">
                  Open network
                  <ChevronRight size={12} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------
          ON THIS DAY
      ------------------------------------------------- */}
      <section className="border-y border-white/[0.055] bg-[#0e1714]">
        <div className="ca-container py-16 sm:py-20">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald/20 bg-emerald/[0.07] text-sage">
              <CalendarDays size={18} />
            </div>

            <div>
              <p className="ca-eyebrow">Historical timeline</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-cloud">
                On this day in African history
              </h2>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-[7px] top-2 h-[calc(100%-8px)] w-px bg-gradient-to-b from-emerald/40 via-sage/15 to-transparent sm:left-1/2 sm:-translate-x-1/2" />

            <div className="space-y-6">
              {[
                {
                  date: 'Today',
                  title: 'A moment connected to Africa’s wider story',
                  description:
                    'As the knowledge graph grows, historical events will be connected to the people, places and movements around them.',
                },
                {
                  date: 'Past',
                  title: 'Trade, migration and cultural exchange',
                  description:
                    'Discover how relationships between communities shaped the continent across centuries.',
                },
                {
                  date: 'Always',
                  title: 'History is a network',
                  description:
                    'Every event becomes more meaningful when you can follow what and who it connects to.',
                },
              ].map((item, index) => (
                <div
                  key={item.date}
                  className="relative grid gap-4 pl-8 sm:grid-cols-2 sm:gap-10 sm:pl-0"
                >
                  <div
                    className={
                      index % 2 === 0
                        ? 'sm:text-right'
                        : 'sm:col-start-2'
                    }
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-sage">
                      {item.date}
                    </p>

                    <h3 className="mt-1 text-sm font-semibold text-cloud">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-cloud/32">
                      {item.description}
                    </p>
                  </div>

                  <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-4 border-[#0e1714] bg-emerald sm:left-1/2 sm:-translate-x-1/2" />
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
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="ca-eyebrow">Guided exploration</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-cloud sm:text-3xl">
              Featured paths
            </h2>
          </div>

          <Compass
            size={23}
            className="text-sage/60"
            strokeWidth={1.6}
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {paths.map((path, index) => (
            <a
              key={path.title}
              href="/search"
              className="group flex min-h-40 flex-col justify-between rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald/25 hover:bg-emerald/[0.035]"
            >
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sage/55">
                  0{index + 1} · {path.count}
                </span>

                <h3 className="mt-3 max-w-xs text-base font-semibold leading-6 text-cloud">
                  {path.title}
                </h3>

                <p className="mt-2 text-xs text-cloud/30">
                  {path.description}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-cloud/25">
                  Follow path
                </span>

                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.07] text-cloud/35 transition group-hover:border-emerald/25 group-hover:bg-emerald group-hover:text-[#07100c]">
                  <ArrowRight size={14} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------
          NEWSLETTER / KNOWLEDGE CTA
      ------------------------------------------------- */}
      <section className="ca-container pb-16 sm:pb-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-emerald/20 bg-gradient-to-br from-[#163d2c] via-[#123123] to-[#0e241b] p-7 sm:p-10">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-sage/10 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-sage">
                <BookOpen size={18} />
              </div>

              <h2 className="mt-5 max-w-xl text-3xl font-semibold tracking-[-0.04em] text-cloud sm:text-4xl">
                Stay connected to African knowledge.
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-6 text-cloud/50">
                Get new discoveries, connected histories and emerging
                knowledge from the Connect-Africa network.
              </p>
            </div>

            <form
              onSubmit={(event) => event.preventDefault()}
              className="flex flex-col gap-2 sm:flex-row lg:flex-col"
            >
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Email address"
                className="h-12 min-w-0 flex-1 rounded-xl border border-white/10 bg-black/15 px-4 text-sm text-cloud outline-none placeholder:text-cloud/25 focus:border-emerald/50"
              />

              <button
                type="submit"
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#f3f1ea] px-5 text-xs font-semibold text-[#102019] transition hover:bg-white"
              >
                Subscribe
                <ArrowRight size={15} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------
          FOOTER
      ------------------------------------------------- */}
      <footer className="border-t border-white/[0.055]">
        <div className="ca-container flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold text-cloud/55">
              Connect<span className="text-sage">-Africa</span>
            </p>
            <p className="mt-1 text-[10px] text-cloud/25">
              Africa, connected as knowledge.
            </p>
          </div>

          <div className="flex items-center gap-5 text-[10px] text-cloud/25">
            <a href="/about" className="transition hover:text-cloud/60">
              About
            </a>
            <a href="/search" className="transition hover:text-cloud/60">
              Explore
            </a>
            <a href="/account" className="transition hover:text-cloud/60">
              Account
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default HomePage;
