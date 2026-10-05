// src/hooks/browse/useBrowseData.ts
import { useState, useEffect } from 'react';
// import { getTopRatedAnime, getTrendingAnime, getTrendingMovies, getHiddenGems } from "../../services/animeGroupService";
import { getUserAnimeEntries } from '../api/userAnime';
import type { UserAnimeEntry } from '../types/UserAnimeEntryType.types';
import { toastError } from '../lib/toast';
import { getRecommendedAnime, getTrendingAnime } from '../api/browse';
import type { AnimeType } from '../types/AnimeType.types';

export const useBrowseData = () => {
  // const [trendingAnime, setTrendingAnime] = useState<AnimeType[]>([]);
  // const [topRatedAnime, setTopRatedAnime] = useState<AnimeType[]>([]);
  // const [trendingMovies, setTrendingMovies] = useState<AnimeType[]>([]);
  // const [hiddenGems, setHiddenGems] = useState<AnimeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [animeEntryList, setAnimeEntryList] = useState<UserAnimeEntry[]>([]);
  const [recommended, setRecommended] = useState<AnimeType[]>([]);
  const [trending, setTrending] = useState<AnimeType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userAnimeEntries, reccommendedAnime, trendingAnime] =
          await Promise.all([
            getUserAnimeEntries(),
            getRecommendedAnime(30),
            getTrendingAnime(40),
          ]);
        // const [trending, topRated, movies, gems, userAnime] = await Promise.all([
        //     getTrendingAnime(),
        //     getTopRatedAnime(),
        //     getTrendingMovies(),
        //     getHiddenGems(),
        //     getUserAnime()
        // ]);
        // setTrendingAnime(trending || []);
        // setTopRatedAnime(topRated || []);
        // setTrendingMovies(movies || []);
        // setHiddenGems(gems || []);
        setAnimeEntryList(userAnimeEntries || []);
        setRecommended(reccommendedAnime);
        setTrending(trendingAnime);
      } catch {
        toastError('Unable to get all browsing data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return {
    // trendingAnime, topRatedAnime, trendingMovies, hiddenGems,
    loading,
    animeEntryList,
    setAnimeEntryList,
    recommended,
    trending,
  };
};
