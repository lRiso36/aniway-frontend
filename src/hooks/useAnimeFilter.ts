import { useState, useEffect } from 'react';
import type { AnimeType } from '../types/AnimeType.types';
import { getAnimeByFilters } from '../api/anime';
import { toastError } from '../lib/toast';
import type { FilterValues } from '../types/FilterValues.types';
import type { AnimeFilterParams } from '../types/AnimeSearch.types';

export const useAnimeFilter = (
  filterValues: FilterValues,
  sortBy: string,
  query: string
) => {
  const [animeSearchResults, setAnimeSearchResults] = useState<AnimeType[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const params: AnimeFilterParams = {
    q: query || undefined,
    genre: filterValues.genre.length ? filterValues.genre : undefined,
    tag: filterValues.tag.length ? filterValues.tag : undefined,
    year: filterValues.year ? Number(filterValues.year) : undefined,
    season: filterValues.season || undefined,
    format: filterValues.format || undefined,
    status: filterValues.airingStatus || undefined,
    sort: sortBy || undefined,
    page: page,
    limit: 20,
  };

  const hasActiveFilters =
    filterValues.genre.length > 0 ||
    filterValues.tag.length > 0 ||
    filterValues.year !== '' ||
    filterValues.season !== '' ||
    filterValues.format !== '' ||
    filterValues.airingStatus !== '';

  const isSearching = query.trim() !== '' || hasActiveFilters;
  const showBrowse = !query.trim() && !hasActiveFilters

  const loadNextPage = () => {
    if (!hasNextPage || searchLoading) return;
    setLoadingMore(true);
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (!query.trim() && !hasActiveFilters) {
      return;
    }

    setSearchLoading(true);
    setPage(1);

    const timer = setTimeout(async () => {
      try {
        const response = await getAnimeByFilters({ ...params, page: 1 });
        setAnimeSearchResults(response.results);
        setHasNextPage(page < response.totalPages);
      } catch {
        setAnimeSearchResults([]);
        setHasNextPage(false);
        toastError('Failed to search anime');
      } finally {
        setSearchLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [filterValues, sortBy, query]);

  useEffect(() => {
    if (page === 1) return;

    const fetchNextPage = async () => {
      try {
        const response = await getAnimeByFilters(params);
        setAnimeSearchResults((prev) => [...prev, ...response.results]);
        setHasNextPage(page < response.totalPages);
      } catch {
        toastError('Failed to load more anime');
      } finally {
        setLoadingMore(false);
      }
    };

    fetchNextPage();
  }, [page]);

  return {
    animeSearchResults,
    searchLoading,
    loadNextPage,
    loadingMore,
    isSearching,
    showBrowse
  };
};
