import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams();

  const article = {
    title: slug?.replace(/-/g, ' ').toUpperCase() || 'Article Title',
    category: 'Research & Knowledge',
    author: 'Dr. Amina Diallo',
    createdAt: '2026-09-10',
    content: `
      This is a comprehensive research publication detailing the strategic developments, infrastructure expansion, and socio-economic impact across the African continent.

      ## Overview
      Recent advancements in technology, policy frameworks, and regional integration have catalyzed sustainable growth. Key stakeholders are collaborating to build resilient systems that empower local communities and foster cross-border innovation.

      ## Key Findings
      - Accelerated digital and physical infrastructure investments.
      - Enhanced multi-lateral cooperation and knowledge sharing.
      - Strong commitment to sustainable energy and economic diversification.

      ## Conclusion
      The future outlook remains highly positive as new governance models and technological platforms unlock unprecedented potential across the region.
    `,
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-slate-100">
      <div className="max-w-3xl mx-auto">
        <Link to="/articles" className="inline-flex items-center space-x-2 text-emerald-400 hover:underline mb-6 text-sm font-medium">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Articles</span>
        </Link>

        <div className="bg-slate-900 rounded-xl border border-slate-800 p-8 shadow-xl">
          <div className="flex items-center space-x-4 mb-4">
            <span className="bg-emerald-950 text-emerald-400 px-3 py-1 rounded-md text-xs font-semibold">
              {article.category}
            </span>
            <span className="text-slate-400 text-sm flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{article.createdAt}</span>
            </span>
            <span className="text-slate-400 text-sm flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 capitalize">{article.title}</h1>

          <div className="prose prose-invert max-w-none text-slate-300 space-y-4 whitespace-pre-line leading-relaxed border-t border-slate-800 pt-6">
            {article.content}
          </div>
        </div>
      </div>
    </div>
  );
};
