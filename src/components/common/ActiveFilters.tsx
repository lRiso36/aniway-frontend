import { X } from 'lucide-react';

interface FilterConfig {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

interface ActiveFiltersProps {
  filters: FilterConfig[];
  values: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  onClearAll: () => void;
}

export function ActiveFilters({
  filters,
  values,
  onFilterChange,
  searchQuery,
  onSearchChange,
  onClearAll,
}: ActiveFiltersProps) {
  const activeFilterChips = filters
    .filter((f) => values[f.key])
    .map((f) => ({
      key: f.key,
      display:
        f.options.find((o) => o.value === values[f.key])?.label ??
        values[f.key],
    }));

  const hasSearch = Boolean(searchQuery?.trim());
  const hasAny = hasSearch || activeFilterChips.length > 0;

  if (!hasAny) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 no-scrollbar overflow-x-auto">
      {hasSearch && (
        <span
          className="flex items-center gap-1.5 bg-purple-500/20 text-purple-300
                     text-xs sm:text-sm font-medium px-3 py-1 sm:py-1.5 rounded-full"
        >
          Search: {searchQuery}
          <X
            className="w-3.5 h-3.5 cursor-pointer hover:text-purple-100"
            onClick={() => onSearchChange?.('')}
          />
        </span>
      )}

      {activeFilterChips.map((chip) => (
        <span
          key={chip.key}
          className="flex items-center gap-1.5 bg-purple-500/20 text-purple-300
                     text-xs sm:text-sm font-medium px-3 py-1 sm:py-1.5 rounded-full"
        >
          {chip.display}
          <X
            className="w-3.5 h-3.5 cursor-pointer hover:text-purple-100"
            onClick={() => onFilterChange(chip.key, '')}
          />
        </span>
      ))}

      <button
        onClick={onClearAll}
        className="flex items-center gap-1.5 bg-white/10 text-white/70
                   text-xs sm:text-sm font-medium px-3 py-1 sm:py-1.5 rounded-full
                   hover:bg-white/20 transition-colors"
      >
        Clear All
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
