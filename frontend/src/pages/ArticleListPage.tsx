import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, Calendar, User } from 'lucide-react';

const MOCK_ARTICLES = [
  {
    id: '1',
    slug: 'renewable-energy-infrastructure-east-africa',
    title: 'Renewable Energy Infrastructure in East Africa',
    summary: 'An in-depth analysis of geothermal, solar, and wind energy investments across the East African Community.',
    author: 'Dr. Amina Diallo',
    createdAt: '2026-09-10',
    category: 'Energy',
  },
  {
    id: '2',
    slug: 'digital-transformation-fintech-west-africa',
    title: 'Digital Transformation & Fintech Innovation in West Africa',
    summary: 'How mobile money and decentralized finance are shaping economic inclusion in Nigeria, Ghana, and Senegal.',
    author: 'Kofi Mensah',
    createdAt: '2026-09-08',
    category: 'Technology',
  },
  {
    id: '3',
    slug: 'continental-free-trade-area-afcfta-impact',
    title: 'The African Continental Free Trade Area (AfCFTA): Progress & Prospects',
    summary: 'Evaluating intra-continental trade corridors, tariff reductions, and cross-border supply chains.',
    author: 'Fatima Zahra',
    createdAt: '2026-09-05',
    category: 'Economics',
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
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-emerald-400" />
              <span>Research Articles</span>
            </h1>
            <p className="text-slate-400 mt-1">Explore knowledge publications, reports, and insights.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              to={`/articles/${article.slug}`}
              className="bg-slate-900 rounded-xl border border-slate-800 p-6 hover:border-emerald-500 transition flex flex-col justify-between"
            >
              <div>
                <span className="inline-block bg-emerald-950 text-emerald-400 px-2.5 py-1 rounded-md text-xs font-semibold mb-3">
                  {article.category}
                </span>
                <h3 className="text-xl font-bold mb-2 text-white hover:text-emerald-400 transition">{article.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{article.summary}</p>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-800">
                <span className="flex items-center space-x-1">
                  <User className="h-3.5 w-3.5" />
                  <span>{article.author}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Calendar className="h-3.5 w-3.5" />
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
