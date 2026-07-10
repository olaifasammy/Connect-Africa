import { Database, Tag, BookOpen } from 'lucide-react';
import styles from './FeaturedSection.module.css';

const icons = [Database, Tag, BookOpen];

export const FeaturedSection = () => (
  <section className={styles.featured}>
    <h2>Featured Knowledge</h2>
    <div className={styles.grid}>
      {[1, 2, 3].map((i, index) => {
        const Icon = icons[index];
        return (
          <div key={i} className={styles.card}>
            <Icon size={32} color="#2563eb" style={{ marginBottom: '1rem' }} />
            <h3>Featured Item {i}</h3>
            <p>Brief description of the featured entity, article, or source.</p>
          </div>
        );
      })}
    </div>
  </section>
);
