import React from 'react';
import styles from './SearchBar.module.css';

export const SearchBar: React.FC = () => (
  <div className={styles.searchBar}>
    <input type="text" placeholder="Search entities, articles, events..." aria-label="Search" />
    <button className={styles.searchBtn} aria-label="Submit Search">🔍</button>
  </div>
);
