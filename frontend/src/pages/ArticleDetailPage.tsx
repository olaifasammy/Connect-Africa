import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, BookOpen } from 'lucide-react';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams();

  const titleFormatted = slug
    ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    : 'Research Publication';

  const article = {
    title: titleFormatted,
    category: 'Archival Research',
    author: 'Dr. Amina Diallo',
    createdAt: '2026-09-10',
    content: `This comprehensive research publication examines the strategic developments, infrastructure expansion, and socio-economic dynamics across the African continent.

Key Themes & Methodologies:
Recent advancements in policy frameworks, digital knowledge infrastructure, and regional integration have catalyzed sustainable growth. Academic researchers and institutional stakeholders collaborate to build resilient systems that preserve cultural heritage while advancing scientific innovation.

Primary Research Findings:
• Accelerated investment in renewable energy corridors and cross-border connectivity.
• Enhanced multi-lateral cooperation and open-access scholarly citation networks.
• Strong institutional commitment to sustainable economic diversification and archival digitization.

Conclusion & Scholarly Outlook:
The long-term outlook remains profoundly positive as new governance models and technological knowledge graphs unlock unprecedented access to African research and historical data.`,
  };

  return (
    <div className="min-h-screen bg-scholar-canvas bg-canvas py-12 px-4 sm:px-6 lg:px-8 text-text-main font-sans transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/articles"
          className="inline-flex items-center space-x-2 font-mono text-xs font-semibold text-emerald-900 dark:text-gold hover:underline mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Publications</span>
        </Link>

        <article className="ca-card bg-surface p-8 sm:p-12 shadow-scholar">
          <div className="flex flex-wrap items-center gap-4 mb-6 pb-4 border-b border-stone/15 font-mono text-xs text-text-muted">
            <span className="ca-badge-clay">
              {article.category}
            </span>
            <span className="flex items-center space-x-1">
              <Calendar className="h-3.5 w-3.5 text-stone" />
              <span>{article.createdAt}</span>
            </span>
            <span className="flex items-center space-x-1">
              <User className="h-3.5 w-3.5 text-stone" />
              <span>{article.author}</span>
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text-main mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="font-serif text-base sm:text-lg text-text-main leading-relaxed space-y-6 whitespace-pre-line border-t border-stone/20 pt-6">
            {article.content}
          </div>

          <div className="mt-12 pt-6 border-t border-stone/15 flex items-center justify-between font-mono text-xs text-text-muted">
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-gold" />
              <span>Connect Africa Digital Archive Record</span>
            </span>
            <span>Ref ID: CA-PUB-2026-904</span>
          </div>
        </article>
      </div>
    </div>
  );
};
