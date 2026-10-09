// src/hooks/anime/useMyAnime.ts
import { useState, useEffect } from 'react';
import { getUserAnimeEntries } from '../api/userAnime';
import type {
  AnimeEntryItem,
  UserAnimeEntry,
  UserAnimeEntryWithAnime,
} from '../types/UserAnimeEntryType.types';
import { toastError } from '../lib/toast';

export const useMyAnime = () => {
  const [animeEntryList, setAnimeEntryList] = useState<AnimeEntryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const handleEntryChange = (
    updated: UserAnimeEntry | null,
    anilistId: number
  ) => {
    setAnimeEntryList((prev) => {
      if (updated === null) {
        return prev.filter((item) => item.entry.anilistId !== anilistId);
      }
      return prev.map((item) =>
        item.entry.anilistId === anilistId
          ? {
              ...item,
              entry: { ...updated, updatedAt: new Date().toISOString() },
            }
          : item
      );
    });
  };

  useEffect(() => {
    const fetchAnimeData = async () => {
      setLoading(true);
      try {
        const data = (await getUserAnimeEntries(
          true
        )) as UserAnimeEntryWithAnime[];
        setAnimeEntryList(
          data.map(({ animeData, ...entry }) => ({ entry, anime: animeData }))
        );
      } catch {
        toastError('Failed to get user anime');
      } finally {
        setLoading(false);
      }
    };
    fetchAnimeData();
  }, []);

  const toTime = (d?: string | Date) => (d ? new Date(d).getTime() : 0);

  const watching = animeEntryList
    .filter((item) => item.entry.status === 'watching')
    .sort(
      (a, b) =>
        new Date(b.entry.updatedAt).getTime() -
        new Date(a.entry.updatedAt).getTime()
    )
    .map((item) => item.anime);
  console.log(
    animeEntryList.map((i) => [typeof i.entry.finishDate, i.entry.finishDate])
  );
  const completed = animeEntryList
    .filter((item) => item.entry.status === 'completed')
    .sort((a, b) => toTime(b.entry.finishDate) - toTime(a.entry.finishDate))
    .map((item) => item.anime);
  const planToWatch = animeEntryList
    .filter((item) => item.entry.status === 'planning')
    .map((item) => item.anime);
  const favorites = animeEntryList
    .filter((item) => item.entry.isFavorite)
    .map((item) => item.anime);
  const dropped = animeEntryList
    .filter((item) => item.entry.status === 'dropped')
    .map((item) => item.anime);
  const rewatching = animeEntryList
    .filter((item) => item.entry.status === 'rewatching')
    .sort(
      (a, b) =>
        new Date(b.entry.updatedAt).getTime() -
        new Date(a.entry.updatedAt).getTime()
    )
    .map((item) => item.anime);
  const paused = animeEntryList
    .filter((item) => item.entry.status === 'paused')
    .map((item) => item.anime);
  const entries = animeEntryList.map((item) => item.entry);

  return {
    loading,
    watching,
    completed,
    planToWatch,
    favorites,
    dropped,
    rewatching,
    paused,
    entries,
    handleEntryChange,
  };
};
