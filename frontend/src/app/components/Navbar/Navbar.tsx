import React from 'react';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => (
  <nav className={styles.navbar}>
    <div className={styles.logo}>Afriseek</div>
    <button className={styles.menuButton} aria-label="Menu">☰</button>
  </nav>
);
