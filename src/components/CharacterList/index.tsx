/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import type { Character } from '@/types/api';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import Image from 'next/image';

interface CharacterListProps {
  characterUrls: string[];
}

export default function CharacterList({ characterUrls }: CharacterListProps) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const characterIds = characterUrls.map(url => url.split('/').pop());
        const characterPromises = characterIds.map(id => api.getCharacter(Number(id)));
        const characterData = await Promise.all(characterPromises);
        setCharacters(characterData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load characters');
      } finally {
        setLoading(false);
      }
    };

    if (characterUrls.length > 0) {
      fetchCharacters();
    }
  }, [characterUrls]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="grid grid-cols-4 gap-6">
    {characters.map((character) => (
        <div
        key={character.id}
        className="flex flex-col items-center p-4"
      >
        <div className="relative w-full aspect-square mb-3 p-2">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="object-cover shadow-md rounded"
            priority={false}
          />
        </div>
        <h3 
          className="text-sm font-medium text-gray-800 text-center leading-tight w-full"
          style={{ wordWrap: 'break-word' }}
        >
          {character.name}
        </h3>
      </div>
    ))}
  </div>
  );
} 