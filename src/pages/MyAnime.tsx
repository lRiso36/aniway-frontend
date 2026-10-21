// import { MyAnimeConatiner } from "../components/MyAnimeContainer"
import { useSearchParams } from 'react-router-dom';
import { MyAnimeContainer } from '../components/common/MyAnime/MyAnimeContainer';
// import { Loading } from "../components/Loading"
import { useMyAnime } from '../hooks/useMyAnime';
import { TabNav } from '../components/common/TabNav';
import { MY_ANIME_NAV_ITEMS } from '../data/myAnimeNavItems';

export const MyAnime = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'overview';
  const {
    loading,
    watching,
    completed,
    planToWatch,
    favorites,
    entries,
    dropped,
    paused,
    rewatching,
    handleEntryChange,
  } = useMyAnime();

  // if (loading) return (
  //     <Loading loading={loading} />
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
            gap-8
            w-full
            "
      >
        <h2 className="ml-3 text-white text-2xl font-bold">My Anime</h2>
        <TabNav
          items={MY_ANIME_NAV_ITEMS}
          defaultTab="overview"
          variant="pill"
        />

        <div>
          {tab === 'overview' && (
            <div className="-mt-3">
              <MyAnimeContainer
                title="Watching"
                items={watching}
                mode="row"
                entries={entries}
                onViewAll={() => setSearchParams({ tab: 'watching' })}
                loading={loading}
                onEntryChange={handleEntryChange}
              />
              <MyAnimeContainer
                title="Completed"
                items={completed}
                mode="row"
                entries={entries}
                onViewAll={() => setSearchParams({ tab: 'completed' })}
                loading={loading}
                onEntryChange={handleEntryChange}
              />
              <MyAnimeContainer
                title="Plan to Watch"
                items={planToWatch}
                mode="row"
                entries={entries}
                loading={loading}
                onViewAll={() => setSearchParams({ tab: 'plan-to-watch' })}
                onEntryChange={handleEntryChange}
              />
              <MyAnimeContainer
                title="Favorites"
                items={favorites}
                mode="row"
                entries={entries}
                loading={loading}
                onViewAll={() => setSearchParams({ tab: 'favorites' })}
                onEntryChange={handleEntryChange}
              />
              <MyAnimeContainer
                title="Rewatching"
                items={rewatching}
                mode="row"
                entries={entries}
                loading={loading}
                onViewAll={() => setSearchParams({ tab: 'rewatching' })}
                onEntryChange={handleEntryChange}
              />
              <MyAnimeContainer
                title="Paused"
                items={paused}
                mode="row"
                entries={entries}
                loading={loading}
                onViewAll={() => setSearchParams({ tab: 'paused' })}
                onEntryChange={handleEntryChange}
              />
              <MyAnimeContainer
                title="Dropped"
                items={dropped}
                mode="row"
                entries={entries}
                loading={loading}
                onViewAll={() => setSearchParams({ tab: 'dropped' })}
                onEntryChange={handleEntryChange}
              />
            </div>
          )}
          {tab === 'watching' && (
            <div className="-mt-4">
              <MyAnimeContainer
                title="Watching"
                items={watching}
                mode="grid"
                entries={entries}
                loading={loading}
                onViewAll={() => setSearchParams({ tab: 'watching' })}
                onEntryChange={handleEntryChange}
              />
            </div>
          )}
          {tab === 'completed' && (
            <div className="-mt-4">
              <MyAnimeContainer
                title="Completed"
                items={completed}
                mode="grid"
                entries={entries}
                loading={loading}
                onViewAll={() => setSearchParams({ tab: 'completed' })}
                onEntryChange={handleEntryChange}
              />
            </div>
          )}
          {tab === 'plan-to-watch' && (
            <div className="-mt-4">
              <MyAnimeContainer
                title="Plan to Watch"
                items={planToWatch}
                mode="grid"
                entries={entries}
                loading={loading}
                onViewAll={() => setSearchParams({ tab: 'plan-to-watch' })}
                onEntryChange={handleEntryChange}
              />
            </div>
          )}
          {tab === 'favorites' && (
            <div className="-mt-4">
              <MyAnimeContainer
                title="Favorites"
                items={favorites}
                mode="grid"
                entries={entries}
                loading={loading}
                onViewAll={() => setSearchParams({ tab: 'favorites' })}
                onEntryChange={handleEntryChange}
              />
            </div>
          )}
          {tab === 'dropped' && (
            <div className="-mt-4">
              <MyAnimeContainer
                title="Dropped"
                items={dropped}
                mode="grid"
                entries={entries}
                loading={loading}
                onViewAll={() => setSearchParams({ tab: 'dropped' })}
                onEntryChange={handleEntryChange}
              />
            </div>
          )}
          {tab === 'rewatching' && (
            <div className="-mt-4">
              <MyAnimeContainer
                title="Rewatching"
                items={rewatching}
                mode="grid"
                entries={entries}
                loading={loading}
                onViewAll={() => setSearchParams({ tab: 'rewatching' })}
                onEntryChange={handleEntryChange}
              />
            </div>
          )}
          {tab === 'paused' && (
            <div className="-mt-4">
              <MyAnimeContainer
                title="Paused"
                items={paused}
                mode="grid"
                entries={entries}
                loading={loading}
                onViewAll={() => setSearchParams({ tab: 'paused' })}
                onEntryChange={handleEntryChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
