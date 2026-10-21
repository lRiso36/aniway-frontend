import { useSearchParams } from 'react-router-dom';

type TabItem = { id: string; label: string };

type TabNavProps = {
  items: TabItem[];
  defaultTab: string;
  variant?: 'pill' | 'underline';
  replace?: boolean;
};

const VARIANT_STYLES = {
  pill: {
    wrapper: '',
    row: 'pb-5',
    button:
      'px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm lg:text-lg',
    active: 'bg-purple-600 text-white',
    inactive: 'text-white/50 hover:text-white/80',
  },
  underline: {
    wrapper: 'mt-6 sm:mt-8',
    row: 'pb-1',
    button: 'px-3 py-2 sm:px-4 text-sm sm:text-xl border-b-2 -mb-[1px]',
    active: 'border-purple-500 text-white',
    inactive: 'border-transparent text-white/50 hover:text-white/80',
  },
};

export const TabNav = ({
  items,
  defaultTab,
  variant = 'pill',
  replace = false,
}: TabNavProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = searchParams.get('tab') || defaultTab;
  const styles = VARIANT_STYLES[variant];

  const handleSelect = (id: string) => {
    setSearchParams({ tab: id }, { replace });
  };

  return (
    <div className={`relative w-full ${styles.wrapper}`}>
      <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-[#0a0a14] to-transparent z-10 pointer-events-none sm:hidden" />
      <div
        className={`flex gap-1 overflow-x-auto scrollbar-none w-full border-b border-white/10 ${styles.row}`}
      >
        {items.map((item) => {
          const isActive = selected === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`font-medium transition-colors whitespace-nowrap shrink-0 ${styles.button} ${
                isActive ? styles.active : styles.inactive
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
