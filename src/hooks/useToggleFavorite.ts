import { useState } from 'react';
import { toggleIsFavorite } from '../api/userAnime';
import { toastError } from '../lib/toast';

export function useToggleFavorite(
  animeId: string,
  initialFavoriteValue: boolean
) {
  const [isFavorite, setIsFavorite] = useState(initialFavoriteValue);
  const [isToggling, setIsToggling] = useState(false);

  const toggleFavorite = async () => {
    const previous = isFavorite;
    setIsFavorite(!initialFavoriteValue);
    setIsToggling(true);

    try {
      await toggleIsFavorite(animeId);
    } catch {
      setIsFavorite(previous);

      if (previous) {
        toastError('Could not remove from favorites. Try again later');
      } else {
        toastError('Could not add to favorites. Try again later');
      }
    } finally {
      setIsToggling(false);
    }
  };

  return { isFavorite, setIsFavorite, isToggling, toggleFavorite };
}
