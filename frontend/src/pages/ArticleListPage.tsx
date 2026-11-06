import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, Filter } from 'lucide-react';

const MOCK_ARTICLES = [
  {
    id: '1',
    slug: 'renewable-energy-infrastructure-east-africa',
    title: 'Renewable Energy Infrastructure in East Africa',
    summary: 'An in-depth analysis of geothermal, solar, and wind energy investments across the East African Community.',
    author: 'Dr. Amina Diallo',
    createdAt: 'Sept 10, 2026',
    category: 'Infrastructure',
    readTime: '8 min read',
  },
  {
    id: '2',
    slug: 'digital-transformation-fintech-west-africa',
    title: 'Digital Transformation & Fintech Innovation in West Africa',
    summary: 'How mobile money and decentralized finance are shaping economic inclusion in Nigeria, Ghana, and Senegal.',
    author: 'Kofi Mensah',
    createdAt: 'Sept 08, 2026',
    category: 'Technology',
    readTime: '12 min read',
  },
  {
    id: '3',
    slug: 'continental-free-trade-area-afcfta-impact',
    title: 'The African Continental Free Trade Area (AfCFTA): Progress & Prospects',
    summary: 'Evaluating intra-continental trade corridors, tariff reductions, and cross-border supply chains.',
    author: 'Fatima Zahra',
    createdAt: 'Sept 05, 2026',
    category: 'Policy',
    readTime: '15 min read',
  },
  {
    id: '4',
    slug: 'preservation-oral-traditions-sahel',
    title: 'Preservation of Oral Traditions in the Sahel Region',
    summary: 'A study on digital archival techniques for safeguarding intangible cultural heritage across linguistic boundaries.',
    author: 'Moussa Traoré',
    createdAt: 'Aug 28, 2026',
    category: 'Culture',
    readTime: '10 min read',
  },
];

export const ArticleListPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', ...new Set(MOCK_ARTICLES.map(a => a.category))];

  const filteredArticles = MOCK_ARTICLES.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || a.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-canvas pb-16 pt-6 text-text-main font-sans transition-colors duration-300">
      <div className="ca-container">
        {/* Header Section */}
        <header className="mb-8 border-b border-stone/10 pb-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="ca-eyebrow">Digital Archive</p>
              <h1 className="mt-2 font-serif text-4xl font-bold text-text-main sm:text-5xl">
                Library.
              </h1>
              <p className="mt-3 max-w-xl font-sans text-base text-text-muted">
                Explore a curated collection of research publications, archival insights, and field reports from across the continent.
              </p>
            </div>

            <div className="relative w-full max-w-sm">
              <Search className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-stone/40" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Search the library..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-b border-stone/20 bg-transparent py-2 pl-8 font-sans text-sm outline-none focus:border-text-main transition-colors"
              />
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="mb-8 flex items-center gap-6 overflow-x-auto pb-3 no-scrollbar border-b border-stone/10 font-mono text-[10px] font-bold uppercase tracking-widest">
          <div className="flex items-center gap-1.5 text-text-muted shrink-0">
            <Filter size={12} />
            <span>Filter</span>
          </div>
          <div className="flex gap-5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`transition-colors shrink-0 ${
                  activeFilter === cat ? 'text-text-main underline decoration-2 underline-offset-8' : 'text-text-muted hover:text-text-main'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Article Grid */}
        <div className="divide-y divide-stone/10">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <article key={article.id} className="group py-8 transition-colors first:pt-0">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-3xl flex-1">
                    <div className="mb-2.5 flex items-center gap-2.5">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                        {article.category}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-stone/20" />
                      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                        {article.createdAt}
                      </span>
                    </div>

                    <Link to={`/articles/${article.slug}`} className="block">
                      <h2 className="font-serif text-2xl font-bold leading-tight text-text-main transition group-hover:text-text-muted sm:text-3xl">
                        {article.title}
                      </h2>
                    </Link>

                    <p className="mt-2.5 font-sans text-sm leading-relaxed text-text-muted line-clamp-3 sm:text-base">
                      {article.summary}
                    </p>

                    <div className="mt-5 flex items-center gap-5">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full border border-stone/10 bg-stone/5 flex items-center justify-center font-serif text-[10px] font-bold text-text-muted">
                          {article.author.split(' ').pop()?.charAt(0)}
                        </div>
                        <span className="text-xs font-bold text-text-main">{article.author}</span>
                      </div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted">
                        {article.readTime}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/articles/${article.slug}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone/10 text-text-muted transition hover:border-text-main hover:text-text-main lg:mt-0"
                  >
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="py-16 text-center">
              <p className="font-serif text-xl text-text-muted">No records matching your search.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-xs font-bold uppercase tracking-widest text-text-main hover:underline"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
