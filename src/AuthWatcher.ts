import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from './stores/useAuthStore';

export function AuthWatcher() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return null;
}
