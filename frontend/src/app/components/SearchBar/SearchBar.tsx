import styles from './SearchBar.module.css';

export const SearchBar = () => (
  <div className={styles.searchBar}>
    <input 
      type="text" 
      placeholder="Search entities, articles, or sources..." 
      className={styles.input} 
    />
    <button className={styles.button}>Search</button>
  </div>
);
