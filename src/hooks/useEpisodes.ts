import { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import type { Episode, EpisodeResponse } from '@/types/api';
import toast from 'react-hot-toast';

/**
 * Custom hook for managing episodes data with infinite scroll functionality
 * 
 * Features:
 * - Fetches episodes from Rick and Morty API
 * - Supports pagination and infinite scroll
 * - Handles loading states and error management
 * - Shows toast notifications for user feedback
 * 
 * @returns Object containing episodes data and control functions
 */
export const useEpisodes = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

   /**
   * Fetches episodes from the API for a specific page
   * 
   * @param page - The page number to fetch (1-based)
   */
  const fetchEpisodes = async (page: number) => {
    try {
      setLoading(true);
      
      // Fetch episodes data from API
      const data: EpisodeResponse = await api.getEpisodes(page);
      
      // Handle first page vs subsequent pages differently
      if (page === 1) {
        // First page: replace entire episodes array
        setEpisodes(data.results);
      } else {
        // Subsequent pages: append to existing episodes
        setEpisodes(prev => [...prev, ...data.results]);
      }
      // Update pagination state
      setHasMore(!!data.info.next);
      setCurrentPage(page);
      // Notify user when they've reached the end
      if (!data.info.next) {
        toast.success('You have reached the end of the episode list');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      // Always set loading to false, regardless of success/failure
      setLoading(false);
    }
  };

  /**
   * Loads the next page of episodes
   * Only executes if not currently loading and more episodes are available
   */
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