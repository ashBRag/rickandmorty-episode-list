'use client';

import { useState } from 'react';
import EpisodesList from '@/components/EpisodesList';
import CharacterList from '@/components/CharacterList';
import type { Episode } from '@/types/api';

export default function Home() {
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);

  return (
    <main className="flex h-screen">
      <div className="w-80 flex-shrink-0">
        <EpisodesList
          onSelectEpisode={setSelectedEpisode}
          selectedEpisodeId={selectedEpisode?.id ?? null}
        />
      </div>
      
      <div className="flex-1 p-8 overflow-y-auto">
        {selectedEpisode ? (
          <div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
               {selectedEpisode.characters.length} Characters in episode {selectedEpisode.episode} {selectedEpisode.name}
              </h2>
              <CharacterList characterUrls={selectedEpisode.characters} />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-lg">
              Select an episode to view its details
            </p>
          </div>
        )}
      </div>
    </main>
  );
}