// import { ActionMenu } from "./ActionMenu";
import type {
  UserAnimeEntry,
  UserAnimeStatus,
} from '../../../types/UserAnimeEntryType.types';

type AnimeActionButtonsProps = {
  entry: UserAnimeEntry | null;
  onLog: () => void;
  onToggleFavorite: () => void;
  onMenuSelect: (id: string) => void;
};

const STATUS_LABELS: Record<UserAnimeStatus, string> = {
  watching: 'Watching',
  rewatching: 'Rewatching',
  completed: 'Completed',
  planning: 'Plan to Watch',
  paused: 'Paused',
  dropped: 'Dropped',
};

const btn =
  'text-sm sm:text-base font-bold px-5 py-2 rounded-lg transition-colors';

export const AnimeActionButtons = ({
  entry,
  onLog,
  onToggleFavorite,
  onMenuSelect,
}: AnimeActionButtonsProps) => (
  <div className="flex gap-2">
    <span className={`${btn} bg-purple-600 text-white`}>
      {entry ? (STATUS_LABELS[entry.status] ?? entry.status) : 'Not Added'}
    </span>
    <button
      onClick={onLog}
      className={`${btn} bg-white/10 hover:bg-white/20 text-white`}
    >
      Log
    </button>
    <button
      onClick={onToggleFavorite}
      aria-label={
        entry?.isFavorite ? 'Remove from favorites' : 'Add to favorites'
      }
      className={`text-sm sm:text-base px-3 py-2 rounded-lg transition-colors ${
        entry?.isFavorite
          ? 'bg-pink-500/20 text-pink-400'
          : 'bg-white/10 hover:bg-white/20 text-white'
      }`}
    >
      {entry?.isFavorite ? '❤️' : '🤍'}
    </button>
    {/* <ActionMenu canRemove={!!entry} onSelect={onMenuSelect} /> */}
  </div>
);
