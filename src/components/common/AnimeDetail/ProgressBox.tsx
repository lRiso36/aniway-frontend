import type { UserAnimeEntry } from '../../../types/UserAnimeEntryType.types';

type ProgressBoxProps = {
  entry: UserAnimeEntry | null;
  episodeCount?: number | null;
};

export const ProgressBox = ({ entry, episodeCount }: ProgressBoxProps) => {
  if (!entry || !['watching', 'rewatching'].includes(entry.status)) return;

  const current = entry.currentEpisode ?? 0;

  const percent = episodeCount
    ? Math.min(100, Math.round((current / episodeCount) * 100))
    : 0;

  return (
    <div className="flex flex-col gap-3 bg-white/5 border border-white/10 rounded-xl p-4 w-full md:w-56 shrink-0">
      <p className="text-white font-medium text-sm">Your Progress</p>
      <p className="text-white/50 text-xs">
        Ep {current}
        {episodeCount ? ` / ${episodeCount}` : ''}
      </p>
      <div className="w-full h-1 bg-white/10 rounded-full">
        <div
          className="h-1 bg-purple-500 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
      {entry.score ? (
        <p className="text-white/50 text-xs">Score: {entry.score} / 10</p>
      ) : null}
    </div>
  );
};
