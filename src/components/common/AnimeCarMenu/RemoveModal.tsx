import type { AnimeType } from '../../../types/AnimeType.types';
import type { UserAnimeEntry } from '../../../types/UserAnimeEntryType.types';
import { useRemoveAnime } from '../../../hooks/useRemoveModal';

type RemoveModalTypes = {
  isOpen: boolean;
  onClose: () => void;
  anime: AnimeType;
  currentEntry?: UserAnimeEntry;
  onSave: () => void;
};

export const RemoveModal = ({
  isOpen,
  onClose,
  anime,
  currentEntry,
  onSave,
}: RemoveModalTypes) => {
  const { isRemoving, handleRemove } = useRemoveAnime(anime._id, onSave);

  if (!isOpen) return null;

  const title = anime.titleEnglish ?? anime.titleRomaji;

  // same progress logic as before, just computed once
  const progress =
    currentEntry?.status === 'watching' && currentEntry?.currentEpisode
      ? {
          text: `${currentEntry.currentEpisode} / ${anime.episodeCount}`,
          current: currentEntry.currentEpisode,
        }
      : currentEntry?.status === 'completed'
        ? {
            text: `${anime.episodeCount} / ${anime.episodeCount}`,
            current: anime.episodeCount ?? 0,
          }
        : currentEntry?.status === 'planning' && anime.episodeCount
          ? { text: `0 / ${anime.episodeCount}`, current: 0 }
          : null;

  const percent =
    progress && anime.episodeCount
      ? Math.min(100, (progress.current / anime.episodeCount) * 100)
      : 0;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#1e1e2e] rounded-xl w-full max-w-md mx-4 flex flex-col border border-white/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start gap-4 p-4 sm:p-6 pb-4">
          {anime.coverLarge && (
            <img
              src={anime.coverLarge}
              alt={title}
              className="w-16 sm:w-20 aspect-[2/3] object-cover rounded-lg border border-white/10 shrink-0"
            />
          )}
          <div className="flex-1 min-w-0 flex flex-col gap-1">
            <span className="text-red-400 text-xs font-semibold uppercase tracking-wide">
              Remove from list
            </span>
            <h2 className="text-white font-semibold text-lg sm:text-xl leading-tight line-clamp-2">
              {title}
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              This permanently deletes the entry below. It can't be undone.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white transition-colors text-lg shrink-0"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Entry summary */}
        <div className="mx-4 sm:mx-6 bg-white/10 rounded-lg divide-y divide-white/10">
          <div className="flex justify-between items-center px-3 py-2.5">
            <p className="text-white/40 text-xs sm:text-sm uppercase tracking-wide">
              Status
            </p>
            <p className="text-white text-sm sm:text-base first-letter:uppercase">
              {currentEntry?.status ? currentEntry.status : 'No Status'}
            </p>
          </div>
          <div className="flex flex-col gap-2 px-3 py-2.5">
            <div className="flex justify-between items-center">
              <p className="text-white/40 text-xs sm:text-sm uppercase tracking-wide">
                Progress
              </p>
              <p className="text-white text-sm sm:text-base">
                {progress ? progress.text : '—'}
              </p>
            </div>
            {progress && anime.episodeCount ? (
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: `${percent}%` }}
                />
              </div>
            ) : null}
          </div>
          <div className="flex justify-between items-center px-3 py-2.5">
            <p className="text-white/40 text-xs sm:text-sm uppercase tracking-wide">
              Score
            </p>
            <p className="text-white text-sm sm:text-base">
              {currentEntry?.score ? `★ ${currentEntry.score}` : 'No Score'}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-4 sm:p-6 pt-4">
          <button
            onClick={onClose}
            disabled={isRemoving}
            className="flex-1 bg-white/10 hover:bg-white/15 text-white text-base sm:text-lg font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleRemove}
            disabled={isRemoving}
            className={`flex-1 bg-red-600 hover:bg-red-500 text-white text-base sm:text-lg font-semibold py-2.5 rounded-lg transition-colors ${isRemoving ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isRemoving ? 'Removing...' : 'Remove'}
          </button>
        </div>
      </div>
    </div>
  );
};
