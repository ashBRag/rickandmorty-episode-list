'use client';

import { useEpisodes } from '@/hooks/useEpisodes';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { Toaster } from 'react-hot-toast';
import type { Episode } from '@/types/api';

interface EpisodesListProps {
  onSelectEpisode: (episode: Episode | null) => void;
  selectedEpisodeId: number | null;
}

export default function EpisodesList({ onSelectEpisode, selectedEpisodeId }: EpisodesListProps) {
  const { episodes, loading, error, hasMore, loadMore } = useEpisodes();
  const { lastElementRef } = useInfiniteScroll({
    onLoadMore: loadMore,
    hasMore,
    loading,
  });

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const handleEpisodeClick = (episode: Episode) => {
    if(selectedEpisodeId === episode.id) {
      onSelectEpisode(null);
    } else {
      onSelectEpisode(episode);
    }
  };

  return (
    <div className="h-screen w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto">
      <Toaster position="bottom-right" />
      
      <div className="sticky top-0 z-10 bg-gray-50 p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Episodes</h2>
      </div>

      <nav className="p-2">
        {episodes.map((episode, index) => (
          
          <div
            key={episode.id}
            ref={index === episodes.length - 1 ? lastElementRef : null}
            onClick={() => handleEpisodeClick(episode)}
            className={`
              p-3 rounded-lg cursor-pointer transition-all duration-200
              ${selectedEpisodeId === episode.id 
                ? 'bg-blue-50 border-l-4 border-blue-500 shadow-sm' 
                : 'hover:bg-gray-100 border-l-4 border-transparent'
              }
            `}
          >
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-500">{episode.episode}</span>
              <span className={`text-sm ${selectedEpisodeId === episode.id ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>
                {episode.name}
              </span>
            </div>
         
          </div>
        ))}
      </nav>

      {loading && (
        <div className="p-4 flex justify-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
} 