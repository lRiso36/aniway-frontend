import type { AnimeDetailType } from "../../../types/AnimeType.types";
import type { UserAnimeEntry } from "../../../types/UserAnimeEntryType.types";
import { GenreBadges } from "./GenreBadges";
import { ScoreBadge } from "./ScoreBadge";
import { AnimeDescription } from "./AnimeDescription";
import { AnimeActionButtons } from "./AnimeActionButtons";
import { ProgressBox } from "./ProgressBox";

type AnimeHeaderProps = {
    anime: AnimeDetailType;
    entry: UserAnimeEntry | null;
    onLog: () => void;
    onToggleFavorite: () => void;
    onMenuSelect: (id: string) => void;
};

export const AnimeHeader = ({ anime, entry, onLog, onToggleFavorite, onMenuSelect }: AnimeHeaderProps) => {
    const title = anime.titleEnglish ?? anime.titleRomaji;
    const showRomaji = anime.titleEnglish && anime.titleRomaji !== anime.titleEnglish;

    return (
        <div
            className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-8 grid gap-x-4 gap-y-3 items-start
                grid-cols-[7rem_1fr] md:grid-cols-[9rem_1fr_auto] lg:grid-cols-[11rem_1fr_auto]
                ${anime.bannerImage ? "-mt-24 md:-mt-32" : "pt-18"}`}
        >
            <img
                src={anime.coverLarge ?? ""}
                alt={title}
                className="w-full aspect-[3/4] object-cover rounded-lg shadow-lg md:row-span-2"
            />

            <div className="flex flex-col gap-1 min-w-0">
                <h1 className="text-white font-bold text-lg sm:text-2xl md:text-3xl line-clamp-2">{title}</h1>
                {showRomaji && <p className="text-white/40 text-xs sm:text-sm">{anime.titleRomaji}</p>}
                <GenreBadges anime={anime} />
                <ScoreBadge averageScore={anime.averageScore} />
            </div>

            <div className="col-span-2 md:col-span-1 md:col-start-2 flex flex-col gap-3">
                <AnimeDescription description={anime.description} />
                <AnimeActionButtons
                    entry={entry}
                    onLog={onLog}
                    onToggleFavorite={onToggleFavorite}
                    onMenuSelect={onMenuSelect}
                />
            </div>

            <div className="col-span-2 md:col-span-1 md:col-start-3 md:row-start-1 md:row-span-2 md:self-end">
                <ProgressBox entry={entry} episodeCount={anime.episodeCount} />
            </div>
        </div>
    );
};