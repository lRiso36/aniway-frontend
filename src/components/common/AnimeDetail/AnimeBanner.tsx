import type { AnimeDetailType } from '../../../types/AnimeType.types';

type AnimeBannerProps = {
  anime: Pick<AnimeDetailType, 'bannerImage' | 'titleEnglish' | 'titleRomaji'>;
};

export const AnimeBanner = ({ anime }: AnimeBannerProps) => {
  if (!anime.bannerImage) return null;

  return (
    <div className="relative w-full h-64 sm:h-80 lg:h-96">
      <img
        src={anime.bannerImage}
        alt={anime.titleEnglish ?? anime.titleRomaji}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/60 to-[#0a0a14]" />
    </div>
  );
};
