// INCOMPLETE. FILL WHEN BACKEND IS ADDED
import { useState, useEffect } from 'react';
import { useUsernameValidation } from './useUsernameValidation';

export const useSignUpValidation = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
  agreed: boolean
) => {
  const [emailAvailError, setEmailAvailError] = useState('');

  const passwordsMatch = password === confirmPassword;
  const passwordsFilled = password.length > 0 && confirmPassword.length > 0;
  const passwordLengthValid = password.length >= 8;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const { usernameError, usernameValid } = useUsernameValidation(username);
  const emailError = emailAvailError;

  const approved =
    passwordsMatch &&
    passwordLengthValid &&
    emailValid &&
    agreed &&
    !usernameError &&
    !emailError &&
    usernameValid;

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!email || !emailValid) {
        setEmailAvailError('');
        return;
      }
      try {
        // const availableEmail = await checkEmailAvailable(email);
        const availableEmail = true;
        setEmailAvailError(
          availableEmail ? '' : 'Email already used for an account'
        );
      } catch {
        setEmailAvailError('');
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [email, emailValid]);

  return {
    usernameError,
    emailError,
    passwordsMatch,
    passwordsFilled,
    passwordLengthValid,
    emailValid,
    approved,
  };
};
