import { useState, useEffect } from 'react';
import type { AnimeType } from '../types/AnimeType';
import { getAnimeBySearch } from '../api/anime';
import { toastError } from '../lib/toast';

export const useAnimeSearch = (query: string) => {
  const [animeSearchResults, setAnimeSearchResults] = useState<AnimeType[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      return;
    }

    setSearchLoading(true);
    
    const timer = setTimeout(async () => {
      try {
        const results = await getAnimeBySearch(query);
        setAnimeSearchResults(results);
      } catch {
        toastError('Failed to search anime');
      } finally {
        setSearchLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return { animeSearchResults, searchLoading };
};
