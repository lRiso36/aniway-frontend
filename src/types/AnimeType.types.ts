export type AnimeType = {
  _id: string;
  anilistId: number;
  malId: number | null;
  titleEnglish: string | null;
  titleRomaji: string;
  displayTitle: string | null;
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

export type VoiceActor = {
  _id: string;
  name: string;
  image?: string;
};
export type VoiceActorLink = {
  voiceActor: VoiceActor;
  language: 'ENGLISH' | 'JAPANESE';
};
export type Character = {
  _id: string;
  name: string;
  image?: string;
};
export type CharacterLink = {
  character: Character;
  role: 'MAIN' | 'SUPPORTING' | 'BACKGROUND';
  voiceActors: VoiceActorLink[];
};
export type Studio = {
  _id: string;
  name: string;
  anilistId: number;
};
export type StudioLink = {
  studio: Studio;
  isAnimationStudio: boolean;
};
export type ExternalLink = {
  url: string;
  site: string;
  icon?: string;
  color?: string;
};

export type AnimeDetailType = AnimeType & {
  endDate?: { year?: number; month?: number; day?: number };
  format?: string;
  status?: string;
  duration?: number;
  source?: string;
  season?: string;
  seasonYear?: number;
  characters: CharacterLink[];
  studios: StudioLink[];
  externalLinks: ExternalLink[];
};
