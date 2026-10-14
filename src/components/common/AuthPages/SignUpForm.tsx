import React, { useState } from 'react';
import { FormInput } from '../../ui/FormInput';
import type { SignUpFormData } from '../../../types/SignUpFormData.types';
import { useSignUpValidation } from '../../../hooks/useSignUpValidation';
import { AuthButtons } from '../../ui/AuthButtons';
import { registerUser } from '../../../api/auth';
import { toastError } from '../../../lib/toast';
import axios from 'axios';
import { GoogleAuth } from './GoogleAuth';
import { AgreeToTerms } from './AgreeToTerms';
import { SuggestUsernameButton } from './SuggestUsernameButton';

type SignUpStepOneTypes = {
  formData: SignUpFormData;
  setFormData: React.Dispatch<React.SetStateAction<SignUpFormData>>;
  agreed: boolean;
  setAgreed: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess: () => void;
};

export const SignUpForm = ({
  formData,
  setFormData,
  agreed,
  setAgreed,
  onSuccess,
}: SignUpStepOneTypes) => {
  const [loading, setLoading] = useState(false);

  const {
    usernameError,
    emailError,
    passwordsMatch,
    passwordsFilled,
    passwordLengthValid,
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
    if (!approved) return;

    setLoading(true);
    try {
      await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      onSuccess();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        toastError(err.response.data.message);
      } else {
        toastError('Something went wrong. Please try again.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
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
      <SuggestUsernameButton
        disabled={loading}
        onSuggest={(name) =>
          setFormData((prev) => ({ ...prev, username: name }))
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
      <div className="mt-1 space-y-1 text-xs">
        <p className={passwordLengthValid ? 'text-green-400' : 'text-zinc-500'}>
          • At least 8 characters
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

      <AgreeToTerms agreed={agreed} setAgreed={setAgreed} />

      <AuthButtons
        onClick={() => handleSubmit()}
        clickEnabled={approved && !loading}
        label={loading ? 'Signing Up...' : 'Sign Up'}
      />

      <p className="text-center text-xs text-gray-400">or</p>

      <div className="-mt-2">
        <GoogleAuth
          loading={loading}
          setLoading={setLoading}
          text="signup_with"
        />
      </div>
    </div>
  );
};
