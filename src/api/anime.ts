import client from './client';
import type { AnimeType } from '../types/AnimeType';

export async function getAnimeBySearch(query: string) {
  const response = await client.get<AnimeType[]>(`/anime/search`, {
    params: { q: query },
  });
  return response.data;
}
