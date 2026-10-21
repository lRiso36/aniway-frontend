import { useLayoutEffect, useRef, useState } from 'react';

type AnimeDescriptionProps = {
  description?: string | null;
};

export const AnimeDescription = ({ description }: AnimeDescriptionProps) => {
  const [showFull, setShowFull] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (el && !showFull) setOverflows(el.scrollHeight > el.clientHeight);
  }, [description, showFull]);

  if (!description) return null;

  const clean = description
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/\(Source:[^)]*\)/i, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return (
    <div className="bg-white/[0.03] rounded-xl p-4">
      <p
        ref={ref}
        className={`text-white/60 text-sm sm:text-base leading-relaxed whitespace-pre-line ${showFull ? '' : 'line-clamp-4'}`}
      >
        {clean}
      </p>
      {(overflows || showFull) && (
        <button
          onClick={() => setShowFull(!showFull)}
          className="text-purple-400 text-xs mt-1 hover:text-purple-300"
        >
          {showFull ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
};
