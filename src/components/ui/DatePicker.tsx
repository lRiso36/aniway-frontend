// components/ui/DatePicker.tsx
import { useState, useRef, useEffect } from 'react';
import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import { Calendar, X } from 'lucide-react';
import 'react-day-picker/style.css';
import './DatePicker.css';

type DatePickerProps = {
  value: string; // "yyyy-MM-dd" or ""
  onChange: (value: string) => void;
};

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const isValidDate = (str: string) => {
  if (!DATE_REGEX.test(str)) return false;
  const date = new Date(str + 'T00:00:00');
  return !isNaN(date.getTime());
};

export const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const defaultClassNames = getDefaultClassNames();
  const dateOnly = value ? value.slice(0, 10) : '';
  const selected = isValidDate(dateOnly)
    ? new Date(dateOnly + 'T00:00:00')
    : undefined;
  const inputText = draft ?? dateOnly;

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

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    onChange(`${yyyy}-${mm}-${dd}`);
    setDraft(null);
    setIsOpen(false);
  };

  const handleBlur = () => {
    if (draft === null) return;
    if (draft === '' || isValidDate(draft)) onChange(draft);
    setDraft(null);
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex items-center gap-2 bg-[#2a2a3e] rounded-lg border border-white/10 px-3 py-2 focus-within:border-purple-500/50">
        <Calendar
          className="w-4 h-4 text-white/40 shrink-0 cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        />
        <input
          type="text"
          placeholder="yyyy-mm-dd"
          value={inputText}
          onChange={(e) => setDraft(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={handleBlur}
          className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none min-w-0"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            aria-label="Clear date"
            className="w-4 h-4 rounded-full bg-zinc-700/80 hover:bg-purple-600/30 flex items-center justify-center text-white shrink-0 transition-colors"
          >
            <X className="w-2.5 h-2.5" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-[#1e1e2e] border border-white/10 rounded-lg shadow-lg p-2 rdp-dark">
          <DayPicker
            classNames={{ root: `${defaultClassNames.root} rdp-dark` }}
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            defaultMonth={selected}
          />
        </div>
      )}
    </div>
  );
};
