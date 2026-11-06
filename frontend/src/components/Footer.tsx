import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone/10 bg-surface py-12 transition-colors duration-300">
      <div className="ca-container">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-6">
            <Link to="/" className="font-serif text-lg font-bold text-text-main">
              Connect-Africa
            </Link>
            <div className="hidden h-4 w-px bg-stone/20 md:block" />
            <div className="flex gap-6">
              <Link to="/articles" className="text-xs font-medium text-text-muted hover:text-text-main transition-colors">Archive</Link>
              <Link to="/search" className="text-xs font-medium text-text-muted hover:text-text-main transition-colors">Search</Link>
              <Link to="/account" className="text-xs font-medium text-text-muted hover:text-text-main transition-colors">Account</Link>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-text-muted">
            <a href="#" className="hover:text-text-main transition-colors">Privacy</a>
            <a href="#" className="hover:text-text-main transition-colors">Terms</a>
            <span>© {year} Connect-Africa</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
