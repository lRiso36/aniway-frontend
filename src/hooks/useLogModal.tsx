import { useState } from 'react';
// import { logAnime } from "../../services/userAnimeService";

import { toastError } from '../lib/toast';
import type { AnimeType } from '../types/AnimeType.types';
import type { UserAnimeEntry } from '../types/UserAnimeEntryType.types';
import { logAnime } from '../api/userAnime';
import type { LogFormData } from '../types/LogFormData.types';

export const useLogModal = (
  anime: AnimeType,
  onSave: (updated: UserAnimeEntry) => void
) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (formData: LogFormData) => {
    setIsSaving(true);
    try {
      const savedEntry = await logAnime({
        animeId: anime._id, // see note below
        status: formData.status ?? 'planning',
        currentEpisode: formData.currentEpisode,
        repeatCount: formData.repeatCount,
        score: formData.score || undefined,
        startDate: formData.startDate || undefined,
        finishDate: formData.finishDate || undefined,
        notes: formData.notes,
        isFavorite: formData.isFavorite,
      });

      onSave(savedEntry);
    } catch {
      toastError('Failed to log anime, please try again');
    } finally {
      setIsSaving(false);
    }
  };

  return { isSaving, handleSave };
};
