import React from 'react';
import styles from './CategoryCard.module.css';

interface CategoryCardProps {
  title: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ title }) => (
  <div className={styles.categoryCard}>{title}</div>
);
