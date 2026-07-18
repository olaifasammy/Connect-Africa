import React from 'react';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { SearchBar } from '../../shared/components/SearchBar/SearchBar';
import { CategoryCard } from '../../shared/components/CategoryCard/CategoryCard';
import { useHomeData } from '../hooks/useHomeData';
import styles from './HomePage.module.css';

/**
 * HomePage
 * 
 * Main landing page for Afriseek.
 * Mirrors the Home.png design.
 */
export const HomePage: React.FC = () => {
  const { data, loading, error } = useHomeData();

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!data) return null;

  return (
    <div className={styles.page}>
      <Navbar />

      {/* Hero */}
      <header className={styles.hero}>
        <h1 className={styles.heroTitle}>Explore Africa’s Knowledge Network</h1>
        <p className={styles.heroDesc}>Discover interconnected knowledge about Africa. People, places, cultures, history and more.</p>
        <div className={styles.searchContainer}>
          <SearchBar />
          <div className={styles.popularSearches}>
            <span>Popular searches:</span>
            {['Yoruba', 'Benin Empire', 'Timbuktu', 'Nile River'].map(tag => (
              <button key={tag} className={styles.tag}>{tag}</button>
            ))}
          </div>
        </div>
      </header>

      {/* Categories */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}><h2>Explore by Category</h2><a href="/categories">View all &gt;</a></div>
        <div className={styles.categoriesGrid}>
          {['Geography', 'Peoples & Identity', 'Culture', 'History', 'Events', 'Articles'].map(cat => (
            <CategoryCard key={cat} title={cat} />
          ))}
        </div>
      </section>

      {/* Recently Added Entities */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}><h2>Recently Added Entities</h2><a href="/entities">View all &gt;</a></div>
        <div className={styles.list}>
            {data.recentEntities.map(entity => (
                <div key={entity.id} className={styles.listItem}>{entity.name}</div>
            ))}
        </div>
      </section>

      {/* Recent Articles */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}><h2>Recent Articles</h2><a href="/articles">View all &gt;</a></div>
        <div className={styles.list}>
            {data.recentArticles.map(article => (
                <div key={article.id} className={styles.listItem}>{article.title}</div>
            ))}
        </div>
      </section>

      {/* Stats */}
      <section className={styles.stats}>
        <div className={styles.statItem}><strong>{data.stats.entities}</strong><br/>Entities</div>
        <div className={styles.statItem}><strong>{data.stats.articles}</strong><br/>Articles</div>
        <div className={styles.statItem}><strong>{data.stats.events}</strong><br/>Events</div>
        <div className={styles.statItem}><strong>{data.stats.categories}</strong><br/>Categories</div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
