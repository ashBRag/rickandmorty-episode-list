const BASE_URL = 'https://rickandmortyapi.com/api';

export const endpoints = {
  episodes: `${BASE_URL}/episode`,
  character: (id: number) => `${BASE_URL}/character/${id}`,
};

export const api = {
  getEpisodes: async (page: number) => {
    const response = await fetch(`${endpoints.episodes}?page=${page}`);
    if (!response.ok) throw new Error('Failed to fetch episodes');
    return response.json();
  },

  getCharacter: async (id: number) => {
    const response = await fetch(endpoints.character(id));
    if (!response.ok) throw new Error('Failed to fetch character');
    return response.json();
  }
}; 