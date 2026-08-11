export type AnimeType = {
  _id: string;
  anilistId: number;
  malId: number | null;
  titleEnglish: string | null;
  titleRomaji: string;
  coverLarge: string;
  coverExtraLarge: string | null;
  bannerImage: string | null;
  episodeCount: number | null;
  averageScore: number | null;
  genres: string[];
  description: string | null;
  cachedAt: string;
  detailsCached: boolean;
  startDate?: { year?: number; month?: number; day?: number };
};
