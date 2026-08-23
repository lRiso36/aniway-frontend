import type { UserAnimeStatus } from "../types/UserAnimeEntryType";
import client from "./client"

interface logAnimeData {
    animeId: string; 
    status: UserAnimeStatus;
    currentEpisode: number;
    repeatCount: number;
    score: number; 
    startDate: string; 
    finishDate: string; 
    notes: string; 
}

export async function loganime(data: logAnimeData) {
    const response = await client.patch('user-anime/log', data);
    return response.data;
}

export async function toggleIsFavorite(animeId: string) {
    const response = await client.patch('/user-anime/toggle-favorite', {
        animeId: animeId
    });
    return response.data;
}

