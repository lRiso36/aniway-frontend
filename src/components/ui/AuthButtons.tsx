type AuthButtonsProps = {
  onClick: () => void;
  clickEnabled: boolean;
  label?: string;
};

export const AuthButtons = ({
  onClick,
  clickEnabled,
  label = 'Submit',
}: AuthButtonsProps) => {
  return (
    <button
      onClick={onClick}
      disabled={!clickEnabled}
      className={`w-full py-3 sm:py-3 rounded-xl font-semibold text-white text-sm sm:text-base mt-4 transition-colors ${
        clickEnabled
          ? 'bg-purple-600 hover:bg-purple-500'
          : 'bg-purple-600/30 cursor-not-allowed'
      }`}
    >
      {label}
    </button>
  );
};
