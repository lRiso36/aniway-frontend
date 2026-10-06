import type { AnimeType } from '../../../types/AnimeType.types';
import type { UserAnimeEntry } from '../../../types/UserAnimeEntryType.types';
import { AnimeCardSkeleton } from '../../ui/AnimeCardSkeleton';
import { AnimeCard } from '../AnimeCard';

type MyAnimeContainerType = {
  title: string;
  items: AnimeType[];
  readOnly?: boolean;
  onViewAll?: () => void;
  mode?: 'row' | 'grid';
  entries?: UserAnimeEntry[];
  loading?: boolean;
  onEntryChange?: (updated: UserAnimeEntry | null, anilistId: number) => void;
};

// PROGRESS WILL COME FROM DATABASE LATER

export const MyAnimeContainer = ({
  title,
  items,
  readOnly = false,
  onViewAll,
  mode,
  entries,
  onEntryChange,
  loading = false,
}: MyAnimeContainerType) => {
  const containerClass =
    mode === 'row'
      ? 'flex gap-3 overflow-x-auto scrollbar-none pb-4'
      : 'grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4';
  const itemClass =
    mode === 'row' ? 'w-[100px] sm:w-[140px] shrink-0' : 'w-full';
  const skeletonCount = mode === 'row' ? 10 : 12;

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-white font-semibold text-base sm:text-lg md:text-xl px-2 py-1">
          {title}
        </h2>
        {mode === 'row' && (
          <button
            onClick={onViewAll}
            className="
                text-purple-400 
                text-xs 
                sm:text-sm 
                hover:text-purple-300 
                transition-colors
                px-3
                "
          >
            View all
          </button>
        )}
      </div>
      {loading ? (
        <div className={containerClass}>
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <div key={i} className={itemClass}>
              <AnimeCardSkeleton />
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-white/30">
          <p className="text-sm lg:text-base">No anime here yet</p>
        </div>
      ) : (
        <div className={containerClass}>
          {items.map((anime) => (
            <div key={anime.anilistId} className={itemClass}>
              <AnimeCard
                anime={anime}
                entry={entries?.find((e) => e.anilistId === anime.anilistId)}
                onEntryChange={onEntryChange}
                myAnimePage={true}
                readOnly={readOnly}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
