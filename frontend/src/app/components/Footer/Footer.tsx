import React from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.footerLogo}>Afriseek</div>
    <div className={styles.footerLinks}>
        <div>Explore</div>
        <div>Resources</div>
        <div>Legal</div>
        <div>Contact</div>
    </div>
  </footer>
);
