import { useState } from 'react';
import { generateAvailableUsername } from '../../../utils/generateUsername';

type Props = {
  onSuggest: (username: string) => void;
  disabled?: boolean;
};

export const SuggestUsernameButton = ({ onSuggest, disabled }: Props) => {
  const [suggesting, setSuggesting] = useState(false);

  const handleSuggest = async () => {
    setSuggesting(true);
    const name = await generateAvailableUsername();
    setSuggesting(false);
    if (name) onSuggest(name);
  };

  return (
    <button
      type="button"
      onClick={handleSuggest}
      disabled={suggesting || disabled}
      className="w-full rounded-lg border border-purple-400/20 text-zinc-300 text-sm py-2 bg-zinc-900 hover:bg-purple-500/20 transition-colors disabled:border-purple-500/40 disabled:text-purple-300/50 disabled:cursor-not-allowed"
    >
      {suggesting ? 'Finding one...' : 'Suggest a username'}
    </button>
  );
};
