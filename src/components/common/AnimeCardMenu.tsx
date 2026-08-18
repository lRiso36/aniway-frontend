import { Trash2 } from 'lucide-react';

type MenuItem = {
  label: string | React.ReactNode;
  id: string;
};

type AnimeCardMenuType = {
  menuOpen: boolean;
  openLeft: boolean;
  items: MenuItem[];
  canRemove: boolean;
  isCard?: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
};

export const AnimeCardMenu = ({
  menuOpen,
  openLeft,
  items,
  canRemove,
  onClose,
  onSelect,
  isCard = true,
}: AnimeCardMenuType) => {
  if (!menuOpen) return null;

  const positionClasses = `
      absolute top-8
      ${openLeft ? 'right-0' : 'left-0'}
      bg-[#1e1e2e] border border-white/10
      rounded-xl shadow-xl
      z-50
      w-40 sm:w-48
    `;

  const select = (id: string) => {
    onSelect(id);
    onClose();
  };

  if (isCard) {
    const log = items.find((i) => i.id === 'log');
    const rateReview = items.find((i) => i.id === 'rate-review');
    const favorite = items.find((i) => i.id === 'favorite');
    const list = items.find((i) => i.id === 'list');

    return (
      <div className={`${positionClasses} p-1 sm:p-1.5 flex flex-col gap-1`}>
        <div className="flex items-stretch gap-1">
          {log && (
            <button
              className="flex-1 text-left px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm text-white/80 hover:bg-white/5 rounded-lg transition-colors"
              onClick={() => select(log.id)}
            >
              {log.label}
            </button>
          )}
          {log && favorite && <div className="w-px bg-white/10 my-1" />}
          {favorite && (
            <button
              className="w-7 sm:w-9 flex items-center justify-center hover:bg-white/5 rounded-lg transition-colors text-sm sm:text-base"
              onClick={() => select(favorite.id)}
            >
              {favorite.label}
            </button>
          )}
        </div>

        {rateReview && (
          <>
            <div className="h-px bg-white/10 mx-1" />
            <button
              className="w-full text-left px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm text-white/80 hover:bg-white/5 rounded-lg transition-colors"
              onClick={() => select(rateReview.id)}
            >
              {rateReview.label}
            </button>
          </>
        )}

        {(list || canRemove) && <div className="h-px bg-white/10 mx-1" />}

        <div className="flex items-stretch gap-1">
          {list && (
            <button
              className="flex-1 text-left px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm text-white/80 hover:bg-white/5 rounded-lg transition-colors"
              onClick={() => select(list.id)}
            >
              {list.label}
            </button>
          )}
          {list && canRemove && <div className="w-px bg-white/10 my-1" />}
          {canRemove && (
            <button
              className="w-7 sm:w-9 flex items-center justify-center text-red-400 hover:bg-white/5 rounded-lg transition-colors text-sm sm:text-base"
              onClick={() => select('remove')}
            >
              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`${positionClasses} py-1`}>
      {items.map((item) => (
        <button
          key={item.id}
          className="w-full text-left px-3 py-1.5 sm:px-4 text-xs sm:text-sm text-white/80 hover:bg-white/5 transition-colors"
          onClick={() => select(item.id)}
        >
          {item.label}
        </button>
      ))}
      {canRemove && (
        <>
          <div className="border-t border-white/10 my-1" />
          <button
            className="w-full text-left px-3 py-1.5 sm:px-4 text-xs sm:text-sm text-red-400 hover:bg-white/5 transition-colors"
            onClick={() => select('remove')}
          >
            🗑️ Remove
          </button>
        </>
      )}
    </div>
  );
};
