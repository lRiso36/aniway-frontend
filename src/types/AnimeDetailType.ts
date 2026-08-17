import type { AnimeType } from './AnimeType';

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
  characters: CharacterLink[];
  studios: StudioLink[];
  source?: string;
  startDate?: { year?: number; month?: number; day?: number };
  endDate?: { year?: number; month?: number; day?: number };
  season?: 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL';
  seasonYear?: number;
  externalLinks: ExternalLink[];
  detailsCached: boolean;
};
