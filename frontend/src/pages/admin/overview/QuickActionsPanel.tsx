import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Globe, Layers3, Plus, Upload } from 'lucide-react';

export const QuickActionsPanel: React.FC = () => {
  const actions = [
    {
      title: 'New Entity',
      description: 'Add graph node',
      icon: <Layers3 className="h-4 w-4 text-gold" />,
      to: '/admin/entities',
    },
    {
      title: 'New Article',
      description: 'Draft publication',
      icon: <FileText className="h-4 w-4 text-emerald-900 dark:text-gold" />,
      to: '/admin/article',
    },
    {
      title: 'Upload Media',
      description: 'Attach assets',
      icon: <Upload className="h-4 w-4 text-clay" />,
      to: '/admin/observability/operations',
    },
    {
      title: 'Add Source',
      description: 'Crawl reference',
      icon: <Globe className="h-4 w-4 text-gold" />,
      to: '/admin/sources',
    },
  ];

  return (
    <div className="ca-card bg-surface shadow-scholar p-6 font-sans">
      <h3 className="font-serif text-base font-bold text-text-main border-b border-stone/15 pb-3">Quick Actions</h3>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {actions.map((act) => (
          <Link
            key={act.title}
            to={act.to}
            className="ca-card-hover group flex flex-col justify-between p-3.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone/20 bg-canvas transition group-hover:scale-105">
                {act.icon}
              </div>
              <Plus className="h-3.5 w-3.5 text-stone transition group-hover:text-gold" />
            </div>

            <div className="mt-4">
              <p className="font-serif text-xs font-bold text-text-main group-hover:text-emerald-900 dark:group-hover:text-gold transition">
                {act.title}
              </p>
              <p className="font-mono text-[10px] text-text-muted mt-0.5">
                {act.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsPanel;
