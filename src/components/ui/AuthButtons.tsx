type AuthButtonsProps = {
  onBack?: () => void;
  onClick: () => void;
  clickEnabled: boolean;
  label?: string;
};

export const AuthButtons = ({
  onBack,
  onClick,
  clickEnabled,
  label = 'Next',
}: AuthButtonsProps) => {
  return (
    <div className={onBack ? 'flex gap-3' : ''}>
      {onBack && (
        <button
          onClick={onBack}
          className="
                flex-1 
                w-full
                py-3 sm:py-3
                rounded-xl
                text-white
                text-sm
                sm:text-base
                mt-4
                border
                border-zinc-700
                transition-colors
                hover:bg-white/5 hover:border-zinc-500
                "
        >
          Back
        </button>
      )}
      <button
        onClick={onClick}
        className={`flex-1 w-full py-3 sm:py-3 rounded-xl font-semibold text-white text-sm sm:text-base mt-4 transition-colors ${
          clickEnabled
            ? 'bg-purple-600 hover:bg-purple-500'
            : 'bg-purple-600/30 cursor-not-allowed'
        }`}
      >
        {label}
      </button>
    </div>
  );
};
