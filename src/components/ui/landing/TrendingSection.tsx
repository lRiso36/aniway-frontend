import { getTrendingAnime } from "../../../api/browse";
import type { AnimeType } from "../../../types/AnimeType.types";
import { AnimeRankCard } from "./AnimeRankCard.tsx";
import { useEffect, useRef } from "react";
import { useState } from "react";

export const TrendingSection = () => {
    const [startIndex, setStartIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [trending, setTrending] = useState<AnimeType[]>([])
    const cardRef = useRef<HTMLDivElement>(null);
    const TRANSITION_MS = 500;
    const moveDistanceRef = useRef<number>(184);

    useEffect(() => {
        async function getTrending() {
            try {
                const trendingAnime = await getTrendingAnime();
                setTrending(trendingAnime);
            } catch (err) {
                console.error("Could not get trending anime");
            }
        }
        getTrending();
    }, [])


    function scrollRight() {
        if (isAnimating) return;

        if (cardRef.current) {
            moveDistanceRef.current = cardRef.current.offsetWidth + 24;
        }

        setIsAnimating(true);
        setTimeout(() => {
            setStartIndex(prev =>
                prev === trending.length - 1 ? 0 : prev + 1
            );

            setIsAnimating(false);
        }, TRANSITION_MS);
    }

    const orderedAnime = [
        ...trending.slice(startIndex),
        ...trending.slice(0, startIndex)
    ];

    return (
        <section className="space-y-10 relative">
            <div>
                <h2 className="
                    text-3xl
                    md:text-4xl
                    font-bold
                    tracking-tight
                ">Trending Now</h2>
            </div>

            {/* viewport */}
            <div className="overflow-hidden pb-4">
                {/* moving track */}
                <div
                    className="
                flex
                gap-6
                "
                    style={{
                        transform: isAnimating
                            ? `translateX(-${moveDistanceRef.current}px)`
                            : "translateX(0px)",
                        transition: isAnimating
                            ? `transform ${TRANSITION_MS}ms ease`
                            : "none",
                    }}
                >
                    {orderedAnime.map((anime, index) => {
                        return (
                            <div
                                key={`${anime.anilistId}-${index}`}
                                ref={index === 0 ? cardRef : null}
                                className="flex-shrink-0">

                                <AnimeRankCard
                                    id={anime.anilistId}
                                    title={anime.titleEnglish ?? anime.titleRomaji}
                                    score={anime.averageScore ? anime.averageScore / 10 : 8.2}
                                    image={anime.coverLarge}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
            <button
                onClick={scrollRight}
                className="
            absolute
            -right-6
            top-1/2
            z-20
            py-3
            lg:py-5
            px-5
            lg:px-7
            rounded-full
            border border-white/20
            bg-black/70
            hover:bg-purple-600/80
            transition
            font-bold
            text-lg
            lg:text-xl
            "
            >❯</button>
        </section>
    )
}