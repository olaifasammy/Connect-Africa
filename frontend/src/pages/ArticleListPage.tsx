import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, Calendar, User, ArrowUpRight } from 'lucide-react';

const MOCK_ARTICLES = [
  {
    id: '1',
    slug: 'renewable-energy-infrastructure-east-africa',
    title: 'Renewable Energy Infrastructure in East Africa',
    summary: 'An in-depth analysis of geothermal, solar, and wind energy investments across the East African Community.',
    author: 'Dr. Amina Diallo',
    createdAt: '2026-09-10',
    category: 'Energy Infrastructure',
  },
  {
    id: '2',
    slug: 'digital-transformation-fintech-west-africa',
    title: 'Digital Transformation & Fintech Innovation in West Africa',
    summary: 'How mobile money and decentralized finance are shaping economic inclusion in Nigeria, Ghana, and Senegal.',
    author: 'Kofi Mensah',
    createdAt: '2026-09-08',
    category: 'Technology & Economy',
  },
  {
    id: '3',
    slug: 'continental-free-trade-area-afcfta-impact',
    title: 'The African Continental Free Trade Area (AfCFTA): Progress & Prospects',
    summary: 'Evaluating intra-continental trade corridors, tariff reductions, and cross-border supply chains.',
    author: 'Fatima Zahra',
    createdAt: '2026-09-05',
    category: 'Trade & Policy',
  },
];

export const ArticleListPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = MOCK_ARTICLES.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-scholar-canvas bg-canvas py-12 px-4 sm:px-6 lg:px-8 text-text-main font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 border-b border-stone/20 pb-6">
          <div>
            <div className="flex items-center space-x-2 font-mono text-xs font-semibold text-gold uppercase tracking-widest mb-1">
              <BookOpen className="h-4 w-4 text-emerald-900 dark:text-gold" />
              <span>Connect Africa Publications</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-text-main sm:text-4xl">
              Research & Knowledge Articles
            </h1>
            <p className="text-text-muted mt-1 text-sm">Explore peer-reviewed publications, archival insights, and field reports.</p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 h-4 w-4 text-stone" />
            <input
              type="text"
              placeholder="Search published articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ca-input pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              to={`/articles/${article.slug}`}
              className="ca-card-hover group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="ca-badge-clay">
                    {article.category}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-stone group-hover:text-gold transition-colors" />
                </div>
                <h3 className="font-serif text-xl font-bold mb-2 text-text-main group-hover:text-emerald-900 dark:group-hover:text-gold transition">
                  {article.title}
                </h3>
                <p className="text-text-muted text-xs leading-relaxed mb-4">{article.summary}</p>
              </div>

              <div className="flex items-center justify-between font-mono text-xs text-text-muted pt-4 border-t border-stone/15">
                <span className="flex items-center space-x-1">
                  <User className="h-3.5 w-3.5 text-stone" />
                  <span>{article.author}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Calendar className="h-3.5 w-3.5 text-stone" />
                  <span>{article.createdAt}</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
