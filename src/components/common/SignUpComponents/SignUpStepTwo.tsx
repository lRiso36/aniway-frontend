import type { SignUpFormData } from '../../../types/SignUpFormData';
import { FormInput } from '../../ui/FormInput';
import { FormTextArea } from '../../ui/FormTextArea';
import { GENRES } from '../../../data/genres';
import { AuthButtons } from '../../ui/AuthButtons';

type SignUpStepTwoTypes = {
  formData: SignUpFormData;
  setFormData: React.Dispatch<React.SetStateAction<SignUpFormData>>;
  nextStep: () => void;
  prevStep: () => void;
};

export const SignUpStepTwo = ({
  formData,
  nextStep,
  setFormData,
  prevStep,
}: SignUpStepTwoTypes) => {
  // avatar?

  return (
    <div className="flex flex-col gap-2">
      {/* avatar stuff ask */}
      <div className="space-y-1 -mt-3">
        <p className="text-sm sm:text-base text-zinc-400">Avatar</p>
      </div>

      <FormInput
        label="Display Name"
        placeholder="Mikasa Ackerman"
        value={formData.displayName}
        limit={30}
        onChange={(c: string) =>
          setFormData((prev) => ({ ...prev, displayName: c }))
        }
      />

      <FormTextArea
        label="Bio"
        placeholder="Something cool..."
        value={formData.bio}
        limit={100}
        onChange={(c: string) => setFormData((prev) => ({ ...prev, bio: c }))}
      />

      <div className="space-y-1 -mt-3">
        <p className="text-sm sm:text-base text-zinc-400">Favorite Genres</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  favoriteGenres: prev.favoriteGenres.includes(genre)
                    ? prev.favoriteGenres.filter((g) => g !== genre)
                    : [...prev.favoriteGenres, genre],
                }))
              }
              className={`px-3 py-1.5 rounded-full text-sm sm:text-sm border transition-all
                                ${
                                  formData.favoriteGenres.includes(genre)
                                    ? 'bg-purple-500 border-purple-500 text-white'
                                    : 'border-white/20 text-zinc-400 hover:border-purple-400 hover:text-purple-300'
                                }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <AuthButtons
        onBack={prevStep}
        onClick={nextStep}
        clickEnabled={true}
        label="Finish"
      />
    </div>
  );
};
