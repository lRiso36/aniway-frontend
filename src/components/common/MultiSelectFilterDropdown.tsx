import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectFilterDropdownProps {
  label: string;
  options: Option[];
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export function MultiSelectFilterDropdown({
  label,
  options,
  values,
  onChange,
  placeholder = 'Any',
}: MultiSelectFilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState('');
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
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
        boxRef.current &&
        !boxRef.current.contains(e.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setIsFocused(false);
        setSearch('');
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

  const toggleOption = (val: string) => {
    if (values.includes(val)) {
      onChange(values.filter((v) => v !== val));
    } else {
      onChange([...values, val]);
    }
    setIsFocused(false);
    setSearch('');
  };

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const firstSelectedLabel =
    values.length > 0
      ? (options.find((o) => o.value === values[0])?.label ?? values[0])
      : null;

  return (
    <div className="flex flex-col gap-1.5 sm:gap-2 shrink-0 w-[140px] sm:w-[180px] sm:mx-1">
      <span className="text-xs sm:text-sm font-semibold text-white">
        {label}
      </span>

      <div
        ref={boxRef}
        onClick={() => {
          inputRef.current?.focus();
        }}
        className="flex items-center justify-between gap-2
                   bg-[#1e1e2e] border border-white/10 rounded-md
                   px-2.5 py-1.5 sm:px-3 sm:py-2
                   text-xs sm:text-sm
                   cursor-text hover:border-white/20 transition-colors
                  w-full"
      >
        {isFocused ? (
          <input
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              setOpen(true);
            }}
            className="bg-transparent outline-none text-xs sm:text-sm text-white/70 flex-1 min-w-0"
            autoFocus
          />
        ) : (
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            {values.length === 0 ? (
              <span className="text-xs sm:text-sm text-white/30">
                {placeholder}
              </span>
            ) : (
              <>
                <span className="flex items-center bg-purple-500/20 text-purple-300 text-xs px-2 py-0.5 rounded-sm truncate">
                  {firstSelectedLabel}
                </span>
                {values.length > 1 && (
                  <span className="flex items-center bg-white/10 text-white/70 text-xs px-2 py-0.5 rounded-sm shrink-0">
                    +{values.length - 1}
                  </span>
                )}
              </>
            )}
            {/* hidden input to still catch focus when clicking box in chip mode */}
            <input
              ref={isFocused ? undefined : inputRef}
              onFocus={() => {
                setIsFocused(true);
                setOpen(true);
              }}
              readOnly
              className="opacity-0 w-0 h-0 absolute"
            />
          </div>
        )}

        <ChevronDown
          onClick={(e) => {
            e.stopPropagation();
            setOpen((prev) => !prev);
          }}
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/40 shrink-0 transition-transform cursor-pointer ${
            open ? 'rotate-180' : ''
          }`}
        />
      </div>

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
            {filteredOptions.length === 0 && (
              <div className="px-3 py-2 text-xs sm:text-sm text-white/30">
                No matches
              </div>
            )}
            {filteredOptions.map((opt) => {
              const selected = values.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  onClick={() => toggleOption(opt.value)}
                  className={`w-full text-left px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm transition-colors
                              hover:bg-white/10
                              ${selected ? 'text-purple-300 bg-purple-500/10' : 'text-white/70'}`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>,
          document.body
        )}
    </div>
  );
}
