import { useEffect, useRef, useCallback } from 'react';
import toast from 'react-hot-toast';

/**
 * Props interface for the useInfiniteScroll hook
 */
interface UseInfiniteScrollProps {
  /** Function to call when more data needs to be loaded */
  onLoadMore: () => Promise<void>;
  /** Whether there are more items available to load */
  hasMore: boolean;
  /** Whether a loading operation is currently in progress */
  loading: boolean;
}

/**
 * Custom hook for implementing infinite scroll functionality using Intersection Observer API
 * 
 * @param props - Configuration object for infinite scroll behavior
 * @returns Object containing ref to attach to the last element
 */
export const useInfiniteScroll = ({ onLoadMore, hasMore, loading }: UseInfiniteScrollProps) => {
  
  // Ref to store the IntersectionObserver instance for cleanup
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Ref to attach to the last element in the scrollable list
  const lastElementRef = useRef<HTMLDivElement>(null);

  /**
   * Handles intersection observer callback when the target element comes into view
   * 
   * @param entries - Array of intersection observer entries
   */
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasMore && !loading) {
        onLoadMore().catch((error) => {
          toast.error('Failed to load more episodes');
          console.error('Error loading more episodes:', error);
        });
      }
    },
    [hasMore, loading, onLoadMore]
  );

  useEffect(() => {
    // Create new IntersectionObserver with configuration
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    });

    // Start observing the last element if it exists
    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }
    // Store observer reference for cleanup
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  return { lastElementRef };
}; 