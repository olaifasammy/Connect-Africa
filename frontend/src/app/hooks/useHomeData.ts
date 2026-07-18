import { useState, useEffect } from 'react';
import { apiClient } from '../../shared/api/apiClient';

export interface HomeData {
  stats: {
    entities: number;
    articles: number;
    events: number;
    categories: number;
  };
  recentEntities: any[];
  recentArticles: any[];
}

export const useHomeData = () => {
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Assuming backend endpoints based on Adminconsole.md
        const homeData = await apiClient<HomeData>('/home'); 
        setData(homeData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
