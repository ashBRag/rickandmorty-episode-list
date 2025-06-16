import { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import type { Episode, EpisodeResponse } from '@/types/api';
import toast from 'react-hot-toast';

export const useEpisodes = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchEpisodes = async (page: number) => {
    try {
      setLoading(true);
      const data: EpisodeResponse = await api.getEpisodes(page);
      
      if (page === 1) {
        setEpisodes(data.results);
      } else {
        setEpisodes(prev => [...prev, ...data.results]);
      }

      setHasMore(!!data.info.next);
      setCurrentPage(page);

      if (!data.info.next) {
        toast.success('You have reached the end of the episode list');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!loading && hasMore) {
      await fetchEpisodes(currentPage + 1);
    }
  };

  useEffect(() => {
    fetchEpisodes(1).catch((error) => {
      toast.error('Failed to load episodes');
      console.error('Error loading episodes:', error);
    });
  }, []);

  return {
    episodes,
    loading,
    error,
    hasMore,
    loadMore,
  };
}; 