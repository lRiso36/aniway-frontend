import { useState } from 'react';
import { PrivacyModal } from './PrivacyModal';
import { TermsModal } from './TermsModal';

type Props = {
  agreed: boolean;
  setAgreed: (value: boolean) => void;
};

export const AgreeToTerms = ({ agreed, setAgreed }: Props) => {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [tosOpen, setTosOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          id="agree"
          checked={agreed}
          className="accent-purple-500 shrink-0"
          onChange={(e) => setAgreed(e.target.checked)}
        />
        <label
          htmlFor="agree"
          className="text-xs sm:text-sm text-zinc-500 leading-relaxed"
        >
          I agree to the
          <span
            className="text-purple-400 cursor-pointer hover:underline mx-1"
            onClick={(e) => {
              e.preventDefault();
              setTosOpen(true);
            }}
          >
            Terms of Service
          </span>
          and
          <span
            className="text-purple-400 cursor-pointer hover:underline ml-1"
            onClick={(e) => {
              e.preventDefault();
              setPrivacyOpen(true);
            }}
          >
            Privacy Policy
          </span>
        </label>
      </div>

      {privacyOpen && <PrivacyModal onClose={() => setPrivacyOpen(false)} />}
      {tosOpen && <TermsModal onClose={() => setTosOpen(false)} />}
    </>
  );
};
