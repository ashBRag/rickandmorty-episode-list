import { useState } from 'react';
import type { Episode } from '@/types/api';

export const useSelectedEpisode = () => {
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);

  return {
    selectedEpisode,
    setSelectedEpisode,
  };
}; 