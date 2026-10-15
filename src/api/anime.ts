import client from './client';
import { type AnimeDetailType, type AnimeType } from '../types/AnimeType.types';
import type {
  AnimeFilterResponse,
  AnimeFilterParams,
} from '../types/AnimeSearch.types';

export async function getAnimeBySearch(query: string) {
  const response = await client.get<AnimeType[]>(`/anime/search`, {
    params: { q: query },
  });
  return response.data;
}

export async function getAnimeByFilters(params: AnimeFilterParams) {
  const response = await client.get<AnimeFilterResponse>('/anime', { params });
  return response.data;
}

export async function getAnimeDetails(anilistId: number) {
  const response = await client.get<AnimeDetailType>(`/anime/${anilistId}`);
  return response.data;
}