import { useState } from 'react';
import { FormInput } from '../../ui/FormInput';
import { useUsernameValidation } from '../../../hooks/useUsernameValidation';
import { AuthButtons } from '../../ui/AuthButtons';
import { AgreeToTerms } from './AgreeToTerms';
import { SuggestUsernameButton } from './SuggestUsernameButton';

type UsernameModalProps = {
  onClose: () => void;
  onSubmit: (username: string) => void;
  isLoading: boolean;
  onInputChange?: () => void;
  error?: string;
};

export const UsernameModal = ({
  onClose,
  onSubmit,
  isLoading,
  onInputChange,
  error,
}: UsernameModalProps) => {
  const [username, setUsername] = useState('');
  const { usernameError, usernameValid } = useUsernameValidation(username);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = () => {
    if (usernameValid && !isLoading) onSubmit(username);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1e1e2e] rounded-xl w-full max-w-sm border border-white/10 p-6 relative">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 w-7 h-7 rounded-md bg-black/30 flex items-center justify-center text-white/70 hover:text-white transition-colors"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold text-white mb-1">
          Choose a username
        </h2>
        <p className="text-sm text-white/60 mb-4">
          One last step to finish creating your account.
        </p>

        <div className="flex flex-col gap-3">
          <FormInput
            label="Username"
            error={usernameError || error}
            type="text"
            required={true}
            placeholder="Choose a unique name"
            value={username}
            onChange={(c: string) => {
              setUsername(c);
              onInputChange?.();
            }}
          />

          <SuggestUsernameButton
            disabled={isLoading}
            onSuggest={(name) => {
              setUsername(name);
              onInputChange?.();
            }}
          />

          <AgreeToTerms agreed={agreed} setAgreed={setAgreed} />

          <AuthButtons
            onClick={handleSubmit}
            clickEnabled={usernameValid && agreed && !isLoading}
            label={isLoading ? 'Creating...' : 'Create account'}
          />
        </div>
      </div>
    </div>
  );
};
