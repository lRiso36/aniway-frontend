import { useEffect, useState } from "react"
import type { EpisodeDataType } from "../types/AnimeDetailType.types"
import { getAnimeEpisodes } from "../api/anime";
import { toastError } from "../lib/toast";



export const useEpisodeData = (
    aninilistId: number | undefined,
    tab: string
) => {
    const [episodeData, setEpisodeData] = useState<EpisodeDataType[] | null>([]);
    const [episodeLoading, setEpisodeLoading] = useState(true);

    const fetchEpisodeData = async () => {
        setEpisodeLoading(true);
        try {
            const data = await getAnimeEpisodes(Number(aninilistId));
            setEpisodeData(data ?? [])
        } catch {
            toastError("Failed to get episode data");
        } finally {
            setEpisodeLoading(false);
        }
    }

    useEffect(() => {
        if (tab === 'episodes' && episodeData?.length === 0 && aninilistId) {
            fetchEpisodeData();
        }
    }, [tab])

    return { episodeData, episodeLoading }
}