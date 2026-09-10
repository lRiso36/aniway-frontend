import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, X } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function FilterDropdown({
  label,
  options,
  value,
  onChange,
  placeholder = 'Any',
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setCoords({
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX,
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

  const selectedLabel = options.find((o) => o.value === value)?.label;
  const isSelected = !!selectedLabel;

  return (
    <div
      className="flex flex-col gap-1.5 sm:gap-2 shrink-0 w-[140px] sm:w-[180px]
        sm:mx-1
        "
    >
      <span className="text-xs sm:text-sm font-semibold text-white">
        {label}
      </span>

      <button
        ref={buttonRef}
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between
               bg-[#1e1e2e] border border-white/10 rounded-md
               px-2.5 py-1.5 sm:px-3 sm:py-2
               text-xs sm:text-sm
               hover:border-white/20 transition-colors"
      >
        <span className={isSelected ? 'text-purple-400' : 'text-white/30'}>
          {selectedLabel ?? placeholder}
        </span>

        {isSelected ? (
          <X
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/40 hover:text-white/70 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onChange('');
            }}
          />
        ) : (
          <ChevronDown
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/40 transition-transform ${
              open ? 'rotate-180' : ''
            }`}
          />
        )}
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
                       max-h-60 overflow-y-auto shadow-lg"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full text-left px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm transition-colors
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
