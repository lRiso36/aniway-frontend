type ScoreBadgeProps = {
  averageScore?: number | null;
};

export const ScoreBadge = ({ averageScore }: ScoreBadgeProps) => {
  if (!averageScore) return null;

  return (
    <span className="text-zinc-300 text-sm sm:text-base px-2 py-1 rounded-md flex items-center gap-1 font-semibold">
      <span className="text-purple-500 text-lg pb-px">★</span>
      {(averageScore / 10).toFixed(1)}
    </span>
  );
};
