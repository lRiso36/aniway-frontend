export const AnimeCardSkeleton = () => (
  <div className="flex flex-col gap-2 relative @container animate-pulse">
    <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-white/10" />
    <div className="h-[clamp(11px,3.2cqw,16px)] w-3/4 rounded bg-white/10 ml-1" />
  </div>
);
