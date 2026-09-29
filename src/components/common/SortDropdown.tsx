import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpDown, ChevronDown } from 'lucide-react';

interface SortOption {
  value: string;
  label: string;
}

const sortOptions: SortOption[] = [
  { value: 'TITLE', label: 'Title' },
  { value: 'POPULARITY_DESC', label: 'Popularity' },
  { value: 'TRENDING_DESC', label: 'Trending' },
  { value: 'SCORE_DESC', label: 'Average Score' },
  { value: 'FAVOURITES_DESC', label: 'Favorites' },
  { value: '', label: 'Default' },
];

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setCoords({
      top: rect.bottom + window.scrollY + 4,
      left: rect.right + window.scrollX - rect.width,
      width: rect.width,
    });
  };

  useEffect(() => {
    if (!open) return;
    updatePosition();

    function handleClickOutside(e: MouseEvent) {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const selectedLabel =
    sortOptions.find((o) => o.value === value)?.label ?? 'Sort By';

  return (
    <div className="shrink-0">
      <button
        ref={buttonRef}
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2
                   bg-[#1e1e2e] border border-white/10 rounded-md
                   px-2.5 py-1.5 sm:px-3 sm:py-2
                   text-xs sm:text-sm text-white/70
                   hover:border-white/20 transition-colors"
      >
        <ArrowUpDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/40" />
        {selectedLabel}
        <ChevronDown
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/40 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              position: 'absolute',
              top: coords.top,
              left: coords.left,
              width: coords.width,
            }}
            className="no-scrollbar z-50
                       bg-[#1e1e2e] border border-white/10 rounded-md
                       overflow-y-auto shadow-lg"
          >
            {sortOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs sm:text-sm whitespace-nowrap transition-colors
                            hover:bg-white/10
                            ${
                              opt.value === value
                                ? 'text-purple-300 bg-purple-500/10'
                                : 'text-white/70'
                            }`}
              >
                {opt.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}
