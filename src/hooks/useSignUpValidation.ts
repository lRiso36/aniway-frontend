// INCOMPLETE. FILL WHEN BACKEND IS ADDED
import { useState, useEffect } from 'react';

export const useSignUpValidation = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
  agreed: boolean
) => {
  const [usernameAvailError, setUsernameAvailError] = useState('');
  const [emailAvailError, setEmailAvailError] = useState('');

  const passwordsMatch = password === confirmPassword;
  const passwordsFilled = password.length > 0 && confirmPassword.length > 0;
  const passwordLengthValid = password.length >= 8;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const usernameValid =
    username.length >= 3 &&
    username.length <= 20 &&
    /^[a-zA-Z0-9_]+$/.test(username);

  const usernameFormatError = !username
    ? ''
    : username.length < 3
      ? 'Username must be at least 3 characters'
      : username.length > 20
        ? 'Username must be under 20 characters'
        : !/^[a-zA-Z0-9_]+$/.test(username)
          ? 'Username can only contain letters, numbers and underscores'
          : '';

  const usernameError = usernameFormatError || usernameAvailError;
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
      if (usernameFormatError || !username) {
        setUsernameAvailError('');
        return;
      }
      try {
        // const available = await checkUsernameAvailable(username);
        const available = true;
        setUsernameAvailError(available ? '' : 'Username is already taken');
      } catch {
        setUsernameAvailError('');
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [username, usernameFormatError]);

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
