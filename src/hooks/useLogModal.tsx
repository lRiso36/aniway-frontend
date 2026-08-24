import { useState } from 'react';
// import { logAnime } from "../../services/userAnimeService";

import { toastError } from '../lib/toast';
import type { AnimeType } from '../types/AnimeType';
import type { UserAnimeEntry } from '../types/UserAnimeEntryType';
import { logAnime } from '../api/userAnime';
import type { LogFormData } from '../types/LogFormData';

export const useLogModal = (
  anime: AnimeType,
  currentEntry: UserAnimeEntry | undefined,
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
        repeatCount: formData.totalRewatches,
        score: formData.score,
        startDate: formData.startDate,
        finishDate: formData.finishDate,
        notes: formData.notes,
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
