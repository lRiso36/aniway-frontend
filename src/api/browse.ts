import client from './client';
import type { AnimeType } from '../types/AnimeType.types';

export async function getRecommendedAnime(limit?: number) {
  const response = await client.get<AnimeType[]>('anime/recommended', {
    params: { limit },
  });
  return response.data;
}

export async function getTrendingAnime(limit?: number) {
  const response = await client.get<AnimeType[]>('browse/trending', {
    params: { limit },
  });
  return response.data;
}
