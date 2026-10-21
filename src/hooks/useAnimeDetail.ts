import { useState, useEffect } from 'react';
import { toastError } from '../lib/toast';
import { getAnimeDetails } from '../api/anime';
import { getUserAnimeEntry } from '../api/userAnime';
import type { UserAnimeEntry } from '../types/UserAnimeEntryType.types';
import type { AnimeDetailType } from '../types/AnimeType.types';
import { useAuthStore } from '../stores/useAuthStore';

export const useAnimeDetail = (id: string | undefined) => {
  const [animeDetails, setAnimeDetails] = useState<AnimeDetailType | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [entry, setEntry] = useState<UserAnimeEntry | null>(null);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      setLoading(true);
      try {
        const details = await getAnimeDetails(Number(id));
        setAnimeDetails(details);
      } catch {
        toastError(
          'Unable to get anime details at this time. Please try again later.'
        );
        setLoading(false);
        return;
      }

      if (!user) {
        setEntry(null);
        setLoading(false);
        return;
      }

      try {
        const userAnimeEntry = await getUserAnimeEntry(Number(id));
        setEntry(userAnimeEntry ?? null);
      } catch {
        toastError(
          'Unable to get user entry for this anime. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [id, user?.id]);

  return { animeDetails, loading, entry, setEntry };
};
