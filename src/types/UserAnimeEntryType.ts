export type UserAnimeStatus = 'watching' | 'rewatching' | 'completed' | 'planning' | 'paused' | 'dropped';

export type UserAnimeEntry = {
    _id: string,
    userId: string,
    animeId: string,
    status: UserAnimeStatus,
    currentEpisode: number,
    score: number,
    startDate: string,
    finishDate: string,
    totalRewatches: number,
    notes: string,
    isFavorite: boolean,
    createdAt: string,
    updatedAt: string,
}

