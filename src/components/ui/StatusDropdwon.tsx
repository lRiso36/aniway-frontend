import { useState, useRef, useEffect } from 'react';
import { FieldBox } from './LogFieldBox';
import type { UserAnimeStatus } from '../../types/UserAnimeEntryType.types';
type StatusOption = {
  value: UserAnimeStatus;
  label: string;
};

type StatusDropdownProps = {
  value: UserAnimeStatus | undefined;
  onChange: (value: UserAnimeStatus) => void;
  options: StatusOption[];
};

export function StatusDropdown({
  value,
  onChange,
  options,
}: StatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  //clicking code
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  //starting label on undefined
  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? 'Status';

  return (
    <div ref={containerRef} className="relative">
      <FieldBox
        as="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full px-3 py-2 flex items-center justify-between"
      >
        <span>{selectedLabel}</span>
        <svg
          className={`w-4 h-4 text-white/50 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </FieldBox>

      <div
        className={`absolute left-0 right-0 mt-1 bg-[#2a2a3e] rounded-lg overflow-hidden z-10 shadow-lg transition-all duration-200 origin-top ${
          isOpen
            ? 'opacity-100 scale-y-100 max-h-80'
            : 'opacity-0 scale-y-95 max-h-0 pointer-events-none'
        }`}
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => {
              onChange(option.value);
              setIsOpen(false);
            }}
            className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition-colors ${
              option.value === value ? 'text-purple-400' : 'text-white/80'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
