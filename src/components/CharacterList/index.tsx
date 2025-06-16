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

  /**
 * Effect hook to fetch character data when character URLs change
 * 
 * This effect:
 * - Extracts character IDs from URLs
 * - Fetches all characters in parallel for better performance
 * - Handles loading states and error scenarios
 * - Cleans up properly to prevent memory leaks
 */
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        // Extract character IDs from URLs
        // URLs typically look like: "https://rickandmortyapi.com/api/character/1"
        const characterIds = characterUrls.map(url => url.split('/').pop());
        const characterPromises = characterIds.map(id => api.getCharacter(Number(id)));
        // Fetch all characters in parallel
        const characterData = await Promise.all(characterPromises);
        // Update state with fetched characters
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