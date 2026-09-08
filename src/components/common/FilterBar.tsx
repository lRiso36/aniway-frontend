import { FilterDropdown } from '../ui/FilterDropdown';

interface FilterConfig {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

interface FilterBarProps {
  filters: FilterConfig[];
  values: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
}

export function FilterBar({ filters, values, onFilterChange }: FilterBarProps) {
  return (
    <div className="no-scrollbar flex gap-4 mt-1 overflow-x-auto pb-1 w-full">
      {filters.map((filter) => (
        <FilterDropdown
          key={filter.key}
          label={filter.label}
          options={filter.options}
          value={values[filter.key] ?? ''}
          onChange={(val) => onFilterChange(filter.key, val)}
        />
      ))}
    </div>
  );
}
