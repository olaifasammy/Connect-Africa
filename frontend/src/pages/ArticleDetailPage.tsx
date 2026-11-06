import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Clock,
  ChevronRight,
  MessageSquare,
  MapPin,
} from 'lucide-react';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const titleFormatted = slug
    ? slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
    : 'Research Publication';

  const article = {
    title: titleFormatted,
    category: 'Archival Research',
    subtitle: 'An investigation into socio-economic dynamics and cultural preservation strategies in modern continental policy.',
    author: 'Dr. Amina Diallo',
    affiliation: 'University of Timbuktu, Department of History',
    createdAt: 'September 10, 2026',
    readTime: '8 min read',
    content: [
      {
        type: 'paragraph',
        text: 'This comprehensive research publication examines strategic developments, infrastructure expansion, and socio-economic dynamics across the African continent. Recent advancements in policy frameworks and regional integration have catalyzed sustainable growth.',
      },
      {
        type: 'heading',
        text: 'Key Themes & Methodologies',
      },
      {
        type: 'paragraph',
        text: 'Academic researchers and institutional stakeholders collaborate to build resilient systems that preserve cultural heritage while advancing scientific innovation. The integration of local knowledge systems with global research standards is a critical pillar of this transformation.',
      },
      {
        type: 'image',
        url: '/images/africa.svg',
        caption: 'Figure 1: Continental geospatial topology and cross-border knowledge corridor mapping.',
        alt: 'Continental Knowledge Map',
      },
      {
        type: 'blockquote',
        text: 'The archive is not a static repository of the past, but a living foundation for future innovation.',
      },
      {
        type: 'heading',
        text: 'Primary Research Findings',
      },
      {
        type: 'list',
        items: [
          'Accelerated investment in renewable energy corridors and cross-border connectivity.',
          'Enhanced multi-lateral cooperation and open-access scholarly citation networks.',
          'Strong institutional commitment to sustainable economic diversification and archival digitization.',
        ],
      },
      {
        type: 'map',
        title: 'Geographic Focus: East & West African Corridors',
        description: 'Interactive archival mapping of historical exchange routes and modern infrastructure nodes.',
        location: 'EAC & ECOWAS Economic Zones',
      },
      {
        type: 'paragraph',
        text: 'Furthermore, data suggests that digitized archival access correlates with higher engagement in regional policy debates among the younger generation of African scholars.',
      },
      {
        type: 'heading',
        text: 'Conclusion & Scholarly Outlook',
      },
      {
        type: 'paragraph',
        text: 'The long-term outlook remains profoundly positive as new governance models and technological knowledge graphs unlock unprecedented access to African research and historical data.',
      },
    ],
    tags: ['Policy', 'Digital Archive', 'Regional Integration', 'Heritage'],
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-canvas pb-16 text-text-main font-sans transition-colors duration-300">
      {/* TOP NAVIGATION BAR */}
      <nav className="sticky top-16 z-40 border-b border-stone/10 bg-canvas/90 py-2.5 backdrop-blur-md">
        <div className="ca-container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/articles"
              className="group flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-text-muted transition hover:text-text-main"
            >
              <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
              Archive
            </Link>
            <div className="h-3 w-px bg-stone/20" />
            <span className="hidden truncate text-[10px] font-bold uppercase tracking-widest text-text-muted sm:block max-w-[220px]">
              {article.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`transition ${isBookmarked ? 'text-text-main' : 'text-text-muted hover:text-text-main'}`}
              title="Bookmark"
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button className="text-text-muted transition hover:text-text-main" title="Share">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </nav>

      <main className="mt-8 sm:mt-12">
        <article className="mx-auto max-w-screen-md px-5 sm:px-6">
          {/* Header */}
          <header className="mb-8 border-b border-stone/10 pb-8">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                {article.category}
              </span>
              <span className="h-1 w-1 rounded-full bg-stone/20" />
              <div className="flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                <Clock className="h-3 w-3" />
                {article.readTime}
              </div>
            </div>

            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-text-main sm:text-5xl">
              {article.title}
            </h1>

            <p className="mt-6 font-serif text-lg italic leading-relaxed text-text-muted sm:text-xl">
              {article.subtitle}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full border border-stone/10 bg-stone/5 flex items-center justify-center font-serif text-sm font-bold text-text-muted">
                {article.author.split(' ').pop()?.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-bold text-text-main">{article.author}</p>
                <p className="text-[11px] text-text-muted">
                  {article.affiliation} · {article.createdAt}
                </p>
              </div>
            </div>
          </header>

          {/* Content Body */}
          <div className="space-y-6">
            {article.content.map((block, idx) => {
              if (block.type === 'paragraph') {
                return (
                  <p key={idx} className="font-serif text-base leading-relaxed text-text-main sm:text-lg">
                    {block.text}
                  </p>
                );
              }
              if (block.type === 'heading') {
                return (
                  <h2 key={idx} className="mb-3 mt-8 font-serif text-2xl font-bold text-text-main sm:text-3xl">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === 'blockquote') {
                return (
                  <blockquote key={idx} className="my-6 border-l-2 border-text-main pl-5 py-0.5">
                    <p className="font-serif text-xl italic leading-relaxed text-text-main">
                      "{block.text}"
                    </p>
                  </blockquote>
                );
              }
              if (block.type === 'list') {
                return (
                  <ul key={idx} className="space-y-2.5 list-disc pl-5 font-serif text-base leading-relaxed text-text-main sm:text-lg">
                    {block.items?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                );
              }
              if (block.type === 'image') {
                return (
                  <figure key={idx} className="my-8 rounded-xl border border-stone/15 bg-stone/5 p-4 text-center">
                    <div className="flex items-center justify-center py-6">
                      <img
                        src={block.url}
                        alt={block.alt || 'Archival Illustration'}
                        className="max-h-72 w-auto object-contain brightness-0 dark:invert transition-all"
                      />
                    </div>
                    {block.caption && (
                      <figcaption className="mt-3 font-mono text-xs text-text-muted">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              }
              if (block.type === 'map') {
                return (
                  <div key={idx} className="my-8 rounded-xl border border-[var(--accent-teal)]/30 bg-[var(--accent-teal)]/5 p-5">
                    <div className="flex items-center gap-2.5 mb-2 text-[var(--accent-teal)]">
                      <MapPin size={18} />
                      <span className="font-mono text-xs font-bold uppercase tracking-widest">Interactive Archival Map</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-text-main">{block.title}</h3>
                    <p className="mt-1 font-sans text-xs text-text-muted">{block.description}</p>
                    <div className="mt-4 flex items-center justify-between border-t border-[var(--accent-teal)]/20 pt-3 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                      <span>Region: {block.location}</span>
                      <span className="text-[var(--accent-teal)] font-bold">View Geospatial Layer →</span>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* Footer Tags */}
          <footer className="mt-12 border-t border-stone/10 pt-8">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-stone/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted transition hover:border-text-main hover:text-text-main cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <button className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-text-main">
                  <MessageSquare className="h-3.5 w-3.5" />
                  Discuss
                </button>
                <button className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-text-main">
                  <Share2 className="h-3.5 w-3.5" />
                  Share
                </button>
              </div>

              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-stone/40">
                Ref ID: CA-PUB-2026-904
              </div>
            </div>
          </footer>
        </article>
      </main>

      {/* RECOMMENDED SECTION */}
      <section className="mt-10 border-t border-stone/10 bg-stone/5 py-8">
        <div className="ca-container">
          <p className="ca-eyebrow mb-4">Related Scholarly Works</p>
          <div className="grid gap-6 lg:grid-cols-2">
            {[1, 2].map((i) => (
              <Link key={i} to="/articles" className="group">
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1.5">
                  Further Reading
                </p>
                <h3 className="font-serif text-lg font-bold text-text-main group-hover:text-text-muted transition">
                  Exploration of {i === 1 ? 'Regional Trade Corridors' : 'Digital Heritage Repositories'}
                </h3>
                <div className="mt-2 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-text-main group-hover:gap-3 transition-all">
                  Read Record <ChevronRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticleDetailPage;
