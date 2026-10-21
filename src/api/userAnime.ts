import type { UserAnimeStatus } from '../types/UserAnimeEntryType.types';
import client from './client';

interface logAnimeData {
  animeId: string;
  status?: UserAnimeStatus;
  currentEpisode?: number;
  repeatCount?: number;
  score?: number;
  startDate?: string;
  finishDate?: string;
  notes?: string;
  isFavorite?: boolean;
}

export async function logAnime(data: logAnimeData) {
  const response = await client.patch('user-anime/log', data);
  return response.data;
}

export async function toggleIsFavorite(animeId: string) {
  const response = await client.patch('/user-anime/toggle-favorite', {
    animeId: animeId,
  });
  return response.data;
}

export async function getUserAnimeEntries(includeAnime = false) {
  const response = await client.get('/user-anime/', {
    params: { includeAnime },
  });
  return response.data;
}

export async function removeAnimeEntry(animeId: string) {
  await client.delete(`/user-anime/${animeId}`);
}

export async function getUserAnimeEntry(anilistId: number) {
  const response = await client.get(`/user-anime/${anilistId}`);
  return response.data.entry;
}
