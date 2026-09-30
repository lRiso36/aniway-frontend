import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MainNavSideBar } from './MainNavSideBar';
import { useAuthStore } from '../../stores/useAuthStore';

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const selected = location.pathname.split('/')[1] || 'home';
  const userName = user?.displayName || user?.username || '';

  return (
    <div className="flex min-h-screen">
      <div className="hidden sm:block sticky top-0 h-screen">
        <MainNavSideBar
          userName={userName}
          userAvatar={user?.avatar || null}
          selected={selected}
          onSelect={(id) => {
            if (id === 'profile') navigate(`/profile/${user?.username}`);
            else navigate('/' + id);
          }}
        />
      </div>
      <main className="flex-1 min-w-0 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
