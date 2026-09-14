import type { AnimeType } from "./AnimeType.types";

export interface AnimeFilterResponse {
  results: AnimeType[];
  totalCount: number;
  totalPages: number;
}

export interface AnimeFilterParams {
  q?: string;
  genre?: string[];
  tag?: string[];
  year?: number;
  season?: string;
  format?: string;
  status?: string;
  sort?: string;
  page?: number;
  limit?: number;
}
