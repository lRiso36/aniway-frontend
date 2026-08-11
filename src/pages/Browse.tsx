import { useState } from 'react';
// import { BrowseRow } from "../components/BrowseComponents/BrowseRow";
// import type { UserAnimeEntry } from "../types/UserAnimeEntry";
// import { AnimeCard } from "../components/AnimeCard";
// import { BareLoading, Loading } from "../components/Loading";
// import { useBrowseData } from "../hooks/browse/useBrowseData";
// import { useGenreFilter } from "../hooks/browse/useGenreFilter";
import { useAnimeSearch } from '../hooks/useAnimeSearch';

// const genres = [
//     "All",
//     "Action",
//     "Adventure",
//     "Comedy",
//     "Drama",
//     "Ecchi",
//     "Fantasy",
//     "Horror",
//     "Mystery",
//     "Romance",
//     "Sci-Fi",
//     "Slice of Life",
//     "Sports",
//     "Supernatural",
// ]

export const Browse = () => {
  // const {
  //     trendingAnime, topRatedAnime, trendingMovies, hiddenGems,
  //     loading, animeEntryList, setAnimeEntryList
  // } = useBrowseData();

  // const { activeGenre, setActiveGenre, genreResults, genreLoading } = useGenreFilter();
  const [searchQuery, setSearchQuery] = useState('');

  const { animeSearchResults: searchResults, searchLoading } =
    useAnimeSearch(searchQuery);

  // const updateEntry = (updated: UserAnimeEntry | null, anilistId: number) => {
  //     setAnimeEntryList(current => {
  //         // remove
  //         if (updated === null) {
  //             return current.filter(item => item.entry.anilistId !== anilistId)
  //         }

  //         // update existing
  //         if (current.find(item => item.entry.anilistId === anilistId)) {
  //             return current.map(item =>
  //                 item.entry.anilistId === anilistId
  //                     ? { entry: updated, anime: item.anime }
  //                     : item
  //             )
  //         }

  //         //new entry if anime was in list before
  //         const animeData =
  //             trendingAnime.find(a => a.anilistId === anilistId) ||
  //             topRatedAnime.find(a => a.anilistId === anilistId) ||
  //             trendingMovies.find(a => a.anilistId === anilistId) ||
  //             hiddenGems.find(a => a.anilistId === anilistId) ||
  //             searchResults.find(a => a.anilistId === anilistId) ||
  //             genreResults.find(a => a.anilistId === anilistId);

  //         if (!animeData) return current;

  //         return [...current, { entry: updated, anime: animeData }]
  //     })
  // }

  // const entries = animeEntryList.map(item => item.entry);

  // if (loading) return (
  //     cool thing anilist does
  // )

  return (
    <div className="min-h-screen bg-[#0a0a14] ">
      <div
        className="
            max-w-6xl
            mx-auto
            px-4 
            sm:px-8 
            py-8 
            flex 
            flex-col 
            gap-4
            w-full"
      >
        {/* <h2 className="ml-1 sm:mb-3 text-zinc-100 text-xl sm:text-4xl font-bold">Browse Anime</h2> */}
        {/* search div */}
        <div
          className="
                flex items-center gap-3
                bg-[#1e1e2e]
                border border-white/10
                rounded-xl 
                px-4 py-2 sm:py-2.5
                "
        >
          {/* search icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="
                    text-white/30 shrink-0 
                    w-4 h-4 sm:w-5 sm:h-5
                    "
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            placeholder="Search anime..."
            className="
                        bg-transparent
                        text-white
                        placeholder-white/30
                        text-sm
                        sm:text-base
                        w-full
                        outline-none
                        "
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-white/30 hover:text-white/60 transition-colors shrink-0"
            >
              ✕
            </button>
          )}
        </div>
        {searchQuery.trim() &&
          //search mode
          (searchLoading ? (
            <div className="flex items-center justify-center pt-30">
              {/* <BareLoading loading={genreLoading} /> */}
              <p> Loading </p>
            </div>
          ) : searchResults?.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
              {searchResults.map((anime) => (
                <p className="text-white">
                  {anime.titleEnglish ?? anime.titleRomaji}
                </p>
                // <div key={anime.anilistId} className="w-full">
                //     <AnimeCard
                //         anime={anime}
                //         entry={entries.find(e => e.anilistId === anime.anilistId)}
                //         onEntryChange={updateEntry}
                //     />
                // </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-500 text-sm tracking-wide text-center pt-10">
              No anime found for{' '}
              <span className="text-purple-400">'{searchQuery.trim()}'</span>
            </p>
          ))}
      </div>
    </div>
  );
};
