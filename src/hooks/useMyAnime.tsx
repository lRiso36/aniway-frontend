// src/hooks/anime/useMyAnime.ts
import { useState, useEffect } from "react";
import { getUserAnimeEntries } from "../api/userAnime";
import type { AnimeEntryItem, UserAnimeEntry, UserAnimeEntryWithAnime } from "../types/UserAnimeEntryType.types";
import { toastError } from "../lib/toast";

export const useMyAnime = () => {
    const [animeEntryList, setAnimeEntryList] = useState<AnimeEntryItem[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAnimeData = async () => {
        setLoading(true);
        try {
            const data = (await getUserAnimeEntries(true)) as UserAnimeEntryWithAnime[];
            setAnimeEntryList(data.map(({ animeData, ...entry }) => ({ entry, anime: animeData })));
        } catch {
            toastError("Failed to get user anime");
        } finally {
            setLoading(false);
        }
    };

    const handleEntryChange = (updated: UserAnimeEntry | null, anilistId: number) => {
        setAnimeEntryList(prev => {
            if (updated === null) {
                return prev.filter(item => item.entry.anilistId !== anilistId);
            }
            return prev
                .map(item =>
                    item.entry.anilistId === anilistId
                        ? { ...item, entry: { ...updated, updatedAt: new Date().toISOString() } }
                        : item
                )
                .sort((a, b) => {
                    const aDate = a.entry.updatedAt ?? '';
                    const bDate = b.entry.updatedAt ?? '';
                    return bDate.localeCompare(aDate);
                });
        });
    };

    useEffect(() => {
        fetchAnimeData();
    }, []);

    const watching = animeEntryList.filter(item => item.entry.status === 'watching').map(item => item.anime);
    const completed = animeEntryList.filter(item => item.entry.status === 'completed').map(item => item.anime);
    const planToWatch = animeEntryList.filter(item => item.entry.status === 'planning').map(item => item.anime);
    const favorites = animeEntryList.filter(item => item.entry.isFavorite).map(item => item.anime);
    const dropped = animeEntryList.filter(item => item.entry.status === 'dropped').map(item => item.anime);
    const entries = animeEntryList.map(item => item.entry);

    return { loading, watching, completed, planToWatch, favorites, dropped, entries, handleEntryChange };
};