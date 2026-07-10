import { LayoutDashboard } from 'lucide-react';
import styles from './HeroSection.module.css';

export const HeroSection = () => (
  <section className={styles.hero}>
    <LayoutDashboard size={48} color="white" style={{ margin: '0 auto 1rem' }} />
    <h1>Connect Africa</h1>
    <p>Organizing, verifying, and connecting knowledge about Africa.</p>
  </section>
);
