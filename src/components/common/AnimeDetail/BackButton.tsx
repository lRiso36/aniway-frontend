export const BackButton = () => (
  <button
    onClick={() => window.history.back()}
    aria-label="Go back"
    className="absolute top-4 left-4 z-20 w-8 h-8 bg-purple-500/40 hover:bg-purple-500/30 ring-1 ring-purple-300/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="text-white"
      aria-hidden="true"
    >
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  </button>
);
