import React from 'react';
import { FormInput } from '../../ui/FormInput';
import type { SignUpFormData } from '../../../types/SignUpFormData';
import { useSignUpValidation } from '../../../hooks/useSignUpValidation';
import { AuthButtons } from '../../ui/AuthButtons';

type SignUpStepOneTypes = {
  formData: SignUpFormData;
  setFormData: React.Dispatch<React.SetStateAction<SignUpFormData>>;
  agreed: boolean;
  setAgreed: React.Dispatch<React.SetStateAction<boolean>>;
  nextStep: () => void;
};

export const SignUpStepOne = ({
  formData,
  setFormData,
  agreed,
  setAgreed,
  nextStep,
}: SignUpStepOneTypes) => {
  const {
    usernameError,
    emailError,
    passwordsMatch,
    passwordsFilled,
    passwordLengthValid,
    passwordHasNumber,
    passwordHasSpecialChar,
    emailValid,
    approved,
  } = useSignUpValidation(
    formData.username,
    formData.email,
    formData.password,
    formData.confirmPassword,
    agreed
  );

  const passwordError =
    passwordsFilled && !passwordsMatch ? "Passwords don't match" : '';

  const emailValidError =
    formData.email.length > 0 && !emailValid
      ? ' Please enter a valid email address'
      : '';

  async function handleSubmit() {
    if (approved) nextStep();
  }

  return (
    <div className="flex flex-col gap-3">
      {/* <GoogleSignInButton
                label="Sign up with Google"
                onClick={() => console.log("google clicked")}
            />
            <div className="flex justify-center my-4">
                
                <span className="text-zinc-400 text-sm">or</span>
                
            </div> */}
      <FormInput
        label="Username"
        error={usernameError}
        type="text"
        required={true}
        placeholder="Choose a unique name"
        value={formData.username}
        onChange={(c: string) =>
          setFormData((prev) => ({ ...prev, username: c }))
        }
      />
      <FormInput
        label="Email"
        error={emailError || emailValidError}
        type="email"
        required={true}
        placeholder="explorer@domain.com"
        value={formData.email}
        onChange={(c: string) => setFormData((prev) => ({ ...prev, email: c }))}
      />
      <FormInput
        label="Password"
        type="password"
        required={true}
        placeholder="Password"
        value={formData.password}
        onChange={(c: string) =>
          setFormData((prev) => ({ ...prev, password: c }))
        }
      />
      <div
        className="
                    mt-1
                    space-y-1
                    text-xs
                    "
      >
        <p className={passwordLengthValid ? 'text-green-400' : 'text-zinc-500'}>
          • At least 8 characters
        </p>
        <p className={passwordHasNumber ? 'text-green-400' : 'text-zinc-500'}>
          • Contains a number
        </p>
        <p
          className={
            passwordHasSpecialChar ? 'text-green-400' : 'text-zinc-500'
          }
        >
          • Contains a special character
        </p>
      </div>
      <FormInput
        label="Confirm Password"
        error={passwordError}
        type="password"
        required={true}
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={(c: string) =>
          setFormData((prev) => ({ ...prev, confirmPassword: c }))
        }
      />

      {/* checkbox */}
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
          // onClick={()=> setTosOpen(true)}
          className="text-xs sm:text-sm text-zinc-500 leading-relaxed"
        >
          I agree to the
          <span className="text-purple-400 cursor-pointer hover:underline ml-1">
            Terms of Service
          </span>
        </label>
      </div>

      <AuthButtons onClick={() => handleSubmit()} clickEnabled={approved} />
    </div>
  );
};
