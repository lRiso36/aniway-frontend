import { SlidersHorizontal } from 'lucide-react';

interface FilterButtonProps {
  open: boolean;
  onClick: () => void;
}

export function FilterButton({ open, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center shrink-0
                  w-10 h-10 sm:w-11 sm:h-11
                  bg-[#1e1e2e] border rounded-md
                  transition-all duration-150 active:scale-95
                  ${
                    open
                      ? 'border-purple-400/40 text-purple-400'
                      : 'border-white/10 text-white/30 hover:bg-[#2a2a3d] hover:border-white/20 hover:text-white'
                  }`}
    >
      <SlidersHorizontal className="w-5 h-5 sm:w-6 sm:h-6" />
    </button>
  );
}
