import { useState } from 'react';
import { removeAnimeEntry } from '../api/userAnime';
import { toastError } from '../lib/toast';

export const useRemoveAnime = (animeId: string, onSave: () => void) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await removeAnimeEntry(animeId);
      onSave();
    } catch {
      toastError('Failed to remove anime, please try again');
    } finally {
      setIsRemoving(false);
    }
  };

  return { isRemoving, handleRemove };
};
