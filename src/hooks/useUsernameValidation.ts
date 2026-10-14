import { useEffect, useState } from 'react';

export function useUsernameValidation(username: string) {
  const [availError, setAvailError] = useState('');

  const formatError = !username
    ? ''
    : username.length < 3
      ? 'Username must be at least 3 characters'
      : username.length > 20
        ? 'Username must be at most 20 characters'
        : !/^[a-zA-Z0-9_]+$/.test(username)
          ? 'Username can only contain letters, numbers and underscores'
          : '';

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (formatError || !username) {
        setAvailError('');
        return;
      }
      try {
        // const available = await checkUsernameAvailable(username);
        const available = true;
        setAvailError(available ? '' : 'Username is already taken');
      } catch {
        setAvailError('');
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [username, formatError]);

  const usernameError = formatError || availError;
  const usernameValid = !!username && !usernameError;

  return { usernameError, usernameValid };
}
