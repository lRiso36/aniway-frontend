import { useState } from 'react';
import { GoogleLoginButton } from '../../social-logins';
import { useAuthStore } from '../../../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toastError } from '../../../lib/toast';
import { getMe, googleLogin } from '../../../api/auth';
import { UsernameModal } from './UsernameModal';

type Props = {
  setLoading: (value: boolean) => void;
  loading: boolean;
  text?: 'signin_with' | 'signup_with' | 'continue_with';
};

export const GoogleAuth = ({ setLoading, loading, text }: Props) => {
  const navigate = useNavigate();
  const [googleCredential, setGoogleCredential] = useState('');
  const [googleError, setGoogleError] = useState('');
  const [needUsername, setNeedUsername] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);

  const closeUsernameModal = () => {
    setNeedUsername(false);
    setGoogleCredential('');
    setGoogleError('');
  };

  async function handleGoogleSubmit(credential: string, username?: string) {
    setLoading(true);
    setGoogleError('');
    try {
      const { accessToken, needsUsername } = await googleLogin(
        credential,
        username
      );

      if (needsUsername) {
        setNeedUsername(true);
        setGoogleCredential(credential);
        return;
      }

      if (!accessToken) throw new Error('Missing access token');

      const { data } = await getMe();
      const { _id, ...rest } = data.user;
      setAuth({ id: _id, ...rest }, accessToken);
      navigate('/home');
    } catch (err) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : 'Something went wrong. Please try again.';

      if (needUsername) setGoogleError(message);
      else toastError(message);
    } finally {
      setLoading(false);
    }
  }

  // TODO: NOTIFY USER PASSWORD DELETED
  return (
    <>
      <div className="mt-3">
        <GoogleLoginButton
          text={text}
          onSuccess={(response) => {
            if (!response.credential) {
              toastError('Google login failed. Please try again.');
              return;
            }
            handleGoogleSubmit(response.credential);
          }}
        />
      </div>
      {needUsername && (
        <UsernameModal
          onClose={closeUsernameModal}
          onSubmit={(username) =>
            handleGoogleSubmit(googleCredential, username)
          }
          isLoading={loading}
          onInputChange={() => setGoogleError('')}
          error={googleError}
        />
      )}
    </>
  );
};
