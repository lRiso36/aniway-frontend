import client from './client';
import type { AnimeType } from '../types/AnimeType.types';

export async function getRecommendedAnime() {
    const response = await client.get<AnimeType[]>('anime/recommended');
    return response.data;
}