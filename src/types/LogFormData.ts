import type { UserAnimeStatus } from "./UserAnimeEntryType";

export type LogFormData = {
    status: UserAnimeStatus | undefined,
    currentEpisode: number,
    score: number,
    startDate: string,
    finishDate: string,
    totalRewatches: number,
    notes: string,
};
