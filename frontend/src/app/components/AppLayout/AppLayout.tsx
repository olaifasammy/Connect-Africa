import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, LogIn, UserPlus } from 'lucide-react';
import styles from './AppLayout.module.css';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}><Link to="/">Connect Africa</Link></div>
          <ul className={styles.navLinks}>
            <li><Link to="/"><LayoutGrid size={18} /> Explore</Link></li>
            <li><Link to="/login"><LogIn size={18} /> Login</Link></li>
            <li><Link to="/register"><UserPlus size={18} /> Register</Link></li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        © 2026 Connect Africa Knowledge Platform
      </footer>
    </div>
  );
};
