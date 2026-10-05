import type { AnimeType } from "./AnimeType.types";

export type UserAnimeStatus =
  'watching' | 'rewatching' | 'completed' | 'planning' | 'paused' | 'dropped';

export type UserAnimeEntry = {
  _id: string;
  user: string;
  anime: string;
  anilistId: number;
  status: UserAnimeStatus;
  currentEpisode?: number;
  score?: number;
  startDate?: string;
  finishDate?: string;
  repeatCount: number;
  notes?: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UserAnimeEntryWithAnime = UserAnimeEntry & {
  animeData: AnimeType;
};
export type AnimeEntryItem = { entry: UserAnimeEntry; anime: AnimeType };