import type { AnimeType } from '../../types/AnimeType';
// import type { UserAnimeEntry, UserAnimeStatus } from "../types/UserAnimeEntry";
// import { AnimeCardMenu } from "./AnimeCardMenu";
// import { LogModal } from "./LogModal";
// import { RemoveModal } from "./RemoveModal";
import { useNavigate } from 'react-router-dom';
// import { RateReviewModal } from "./RateReviewModal";
// import { AddToListModal } from "./AddToListsModal";
// import { CreateListModal } from "./MyListsComponents/CreateListModal";
// import toast from "react-hot-toast";
import { useAnimeCard } from '../../hooks/useAnimeCard';
import { AnimeCardMenu } from './AnimeCardMenu';
import { Heart, Tv, Star, ListPlus } from 'lucide-react';

type AnimeCardType = {
  anime: AnimeType;
  //   entry?: UserAnimeEntry;
  readOnly?: boolean;
  //   onEntryChange?: (updated: UserAnimeEntry | null, anilistId: number) => void;
  //   onStatusChange?: (anilistId: number, status: UserAnimeStatus) => void;
  onRate?: (anilistId: number) => void;
  onReview?: (anilistId: number) => void;
  onFavorite?: (anilistId: number) => void;
  onAddToList?: (anilistId: number) => void;
  onRemove?: (anilistId: number) => void;
};

export const AnimeCard = ({ anime, readOnly = false }: AnimeCardType) => {
  const isFavorite = true;
  const MENU_ITEMS = [
    {
      label: (
        <span className="flex items-center gap-2">
          <Tv className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-blue-400 -mt-0.5" />
          Log
        </span>
      ),
      id: 'log',
    },
    {
      label: (
        <span className="flex items-center gap-2">
          <Star
            className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-amber-400 "
            fill="currentColor"
          />
          Rate & Review
        </span>
      ),
      id: 'rate-review',
    },
    {
      label: (
        <Heart
          className={`w-3.5 h-3.5 sm:w-5 sm:h-5 ${isFavorite ? 'text-red-400' : 'text-white/50'}`}
          {...(isFavorite ? { fill: 'currentColor' } : {})}
        />
      ),
      id: 'favorite',
    },
    {
      label: (
        <span className="flex items-center gap-2">
          <ListPlus className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-purple-400" />
          Add to List
        </span>
      ),
      id: 'list',
    },
  ];

  //   const canRemove = !!entry;
  const canRemove = true;
  const navigate = useNavigate();

  const {
    menuOpen,
    setMenuOpen,
    openLeft,
    // activeModal,
    setActiveModal,
    menuRef,
    handleMenuOpen,
    // toggleFavorite
  } = useAnimeCard();

  return (
    <div ref={menuRef} className="flex flex-col gap-2 relative">
      <div
        className="relative group aspect-[3/4] rounded-lg overflow-hidden @container"
        onClick={() => navigate(`/anime/${anime.anilistId}`)}
      >
        <img
          src={anime.coverLarge}
          alt={anime.titleEnglish ?? anime.titleRomaji}
          className="w-full h-full object-cover"
        />
        {!readOnly && (
          <div className="absolute top-1 right-1 z-20">
            <button
              onClick={handleMenuOpen}
              className="w-[20cqw] h-[24cqw] sm:w-[18cqw] sm:h-[22cqw] aspect-square max-w-9 min-w-4 flex items-center justify-center text-white bg-black/50 hover:bg-black/70 transition-colors rounded-md"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 26 26"
                fill="currentColor"
                className="w-6/8 h-5/8 transition-transform group-hover:scale-115"
              >
                <circle cx="12" cy="4" r="2.5" />
                <circle cx="12" cy="13" r="2.5" />
                <circle cx="12" cy="22" r="2.5" />
              </svg>
            </button>
          </div>
        )}

        <div className="absolute inset-0 border-2 border-purple-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10" />
      </div>

      {!readOnly && (
        <AnimeCardMenu
          menuOpen={menuOpen}
          openLeft={openLeft}
          items={MENU_ITEMS}
          canRemove={canRemove}
          onClose={() => setMenuOpen(false)}
          onSelect={(id) => {
            if (id === 'log') setActiveModal('log');
            // if (id === 'favorite') toggleFavorite();
            if (id === 'remove') setActiveModal('remove');
            if (id === 'rate-review') setActiveModal('rate-review');
            if (id === 'list') setActiveModal('list');
          }}
        />
      )}

      <div>
        <p className="-mt-1 ml-1 text-zinc-200 text-[10px] sm:text-sm font-medium line-clamp-2 leading-tight">
          {anime.titleEnglish ?? anime.titleRomaji}
        </p>
        {/* <p className="ml-1 text-white/50 text-xs">
                    {entry
                        ? `Ep ${entry.currentEpisode}${anime.episodes ? ` / ${anime.episodes}` : ""}`
                        : `${anime.episodes ?? "—"} eps`}
                </p> */}
      </div>
    </div>

    //     <div ref={menuRef} className="flex flex-col gap-2 relative">
    //       <div className="relative group aspect-[3/4] rounded-lg overflow-hidden"
    //         onClick={() => navigate(`/anime/${anime.anilistId}`)}
    //       >
    //         <img
    //           src={anime.coverImage.large}
    //           alt={anime.title.english ?? anime.title.romaji}
    //           className="w-full h-full object-cover"
    //         />
    // {!readOnly && (
    //   <div className="absolute top-1 right-1 z-20">
    //     <button
    //       onClick={handleMenuOpen}
    //       className="w-6 h-7 lg:w-8 lg:h-9 flex items-center justify-center text-white bg-black/50 hover:bg-black/80 transition-colors rounded-md"
    //     >
    //       <svg width="16" height="16" viewBox="0 0 26 26" fill="currentColor"
    //         className="lg:w-5 lg:h-5 transition-transform group-hover:scale-125"
    //       >
    //         <circle cx="12" cy="4" r="2.5" />
    //         <circle cx="12" cy="13" r="2.5" />
    //         <circle cx="12" cy="22" r="2.5" />
    //       </svg>
    //     </button>
    //   </div>
    // )}
    //         <div className="absolute inset-0 border-2 border-purple-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10" />
    //       </div>

    //       {!readOnly && (
    //         <AnimeCardMenu
    //           menuOpen={menuOpen}
    //           openLeft={openLeft}
    //           items={MENU_ITEMS}
    //           canRemove={canRemove}
    //           onClose={() => setMenuOpen(false)}
    //           onSelect={(id) => {
    //             if (id === 'log') setActiveModal('log');
    //             if (id === 'favorite') toggleFavorite();
    //             if (id === 'remove') setActiveModal('remove');
    //             if (id === 'rate-review') setActiveModal('rate-review');
    //             if (id === 'list') setActiveModal('list');
    //           }}
    //         />
    //       )}

    //       <div>
    //         <p className="-mt-1 ml-1 text-white text-xs lg:text-base font-medium line-clamp-1">
    //           {anime.title.english ?? anime.title.romaji}
    //         </p>
    //         <p className="ml-1 text-white/50 text-xs">
    //           {entry
    //             ? `Ep ${entry.currentEpisode}${anime.episodes ? ` / ${anime.episodes}` : ""}`
    //             : `${anime.episodes ?? "—"} eps`}
    //         </p>
    //       </div>

    //       {entry?.status === "watching" && anime.episodes && (
    //         <div className="w-full h-1 bg-white/10 rounded-full">
    //           <div
    //             className="h-1 bg-purple-500 rounded-full"
    //             style={{ width: `${Math.round((entry.currentEpisode / anime.episodes) * 100)}%` }}
    //           />
    //         </div>
    //       )}

    //       {!readOnly && (
    //         <>
    //           <LogModal
    //             isOpen={activeModal === 'log'}
    //             onClose={() => setActiveModal(null)}
    //             anime={anime}
    //             currentEntry={entry}
    //             onSave={(updated) => {
    //               setActiveModal(null);
    //               onEntryChange?.(updated, anime.anilistId)
    //             }}
    //           />
    //           <RemoveModal
    //             isOpen={activeModal === 'remove'}
    //             onClose={() => setActiveModal(null)}
    //             anime={anime}
    //             currentEntry={entry}
    //             onSave={() => {
    //               setActiveModal(null);
    //               onEntryChange?.(null, anime.anilistId)
    //             }}
    //           />
    //           <RateReviewModal
    //             isOpen={activeModal === 'rate-review'}
    //             onClose={() => setActiveModal(null)}
    //             anime={anime}
    //             currentEntry={entry}
    //             onSave={(updated) => {
    //               setActiveModal(null);
    //               onEntryChange?.(updated, anime.anilistId)
    //             }}
    //             onPosted={() => toast("Posted to feed ✓", {
    //               position: "bottom-center",
    //               style: {
    //                 background: "#9333ea",
    //                 color: "white",
    //                 fontWeight: "500",
    //                 borderRadius: "9999px",
    //                 padding: "10px 20px",
    //               },
    //               duration: 2500,
    //             })}
    //           />
    //           {activeModal === 'list' && (
    //             <AddToListModal
    //               isOpen={activeModal === 'list'}
    //               onClose={() => setActiveModal(null)}
    //               animeToAdd={anime}
    //               onSave={() => setActiveModal(null)}
    //               onCreateList={() => setActiveModal('create-list')}
    //             />
    //           )}
    //           {activeModal === 'create-list' && (
    //             <CreateListModal
    //               isOpen={activeModal === 'create-list'}
    //               onClose={() => setActiveModal(null)}
    //               initialAnime={anime}
    //               onSave={() => setActiveModal(null)}
    //             />
    //           )}
    //         </>
    //       )}
    //     </div>
  );
};
