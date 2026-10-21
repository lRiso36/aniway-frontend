import type { AnimeDetailType } from '../../../types/AnimeType.types';

type GenreBadgesProps = {
  anime: Pick<AnimeDetailType, 'seasonYear' | 'episodeCount' | 'genres'>;
};

const badge = 'text-xs sm:text-sm px-2 py-1 rounded-md';

export const GenreBadges = ({ anime }: GenreBadgesProps) => (
  <div className="flex flex-wrap gap-2 mt-1">
    {anime.seasonYear && (
      <span className={`${badge} bg-white/10 text-white/70`}>
        {anime.seasonYear}
      </span>
    )}
    {anime.episodeCount && (
      <span className={`${badge} bg-white/10 text-white/70`}>
        {anime.episodeCount} Episodes
      </span>
    )}
    {anime.genres.slice(0, 3).map((genre) => (
      <span key={genre} className={`${badge} bg-purple-500/15 text-purple-300`}>
        {genre}
      </span>
    ))}
  </div>
);
