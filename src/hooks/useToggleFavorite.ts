import { useState } from 'react';
import { toggleIsFavorite } from '../api/userAnime';
import { toastError } from '../lib/toast';
import type { UserAnimeEntry } from '../types/UserAnimeEntryType.types';

export function useToggleFavorite(
  animeId: string,
  initialFavoriteValue: boolean,
  onToggled?: (entry: UserAnimeEntry) => void
) {
  const [pending, setPending] = useState<boolean | null>(null);
  const [isToggling, setIsToggling] = useState(false);

  const isFavorite = pending ?? initialFavoriteValue;
  // resync when the entry loads or changes after mount

  const toggleFavorite = async () => {
    const previous = isFavorite;
    setPending(!previous);
    setIsToggling(true);

    try {
      const updated = await toggleIsFavorite(animeId);
      onToggled?.(updated);
    } catch {
      if (previous) {
        toastError('Could not remove from favorites. Try again later');
      } else {
        toastError('Could not add to favorites. Try again later');
      }
    } finally {
      setPending(null);
      setIsToggling(false);
    }
  };

  return { isFavorite, isToggling, toggleFavorite };
}
