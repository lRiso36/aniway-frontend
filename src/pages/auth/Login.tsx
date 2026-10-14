import { useState, useEffect } from 'react';
import { AuthNav } from '../../components/common/AuthPages/AuthNav';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { AuthContainer } from '../../components/common/AuthPages/AuthContainer';
import { FormInput } from '../../components/ui/FormInput';
import { AuthButtons } from '../../components/ui/AuthButtons';
import { getMe, googleLogin, login } from '../../api/auth';
import axios from 'axios';
import { useAuthStore } from '../../stores/useAuthStore';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GoogleLoginButton } from '../../components/social-logins';
import { toastError, toastSuccess } from '../../lib/toast';
import { UsernameModal } from '../../components/common/AuthPages/UsernameModal';

export const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [needUsername, setNeedUsername] = useState(false);
  const [googleCredential, setGoogleCredential] = useState('');
  const [googleError, setGoogleError] = useState('');

  const setAuth = useAuthStore((state) => state.setAuth);

  const approved = !!(formData.email && formData.password);

  const closeUsernameModal = () => {
    setNeedUsername(false);
    setGoogleCredential('');
    setGoogleError('');
  };

  async function handleSubmit() {
    setError('');
    setLoading(true);
    try {
      const { accessToken } = await login({
        email: formData.email,
        password: formData.password,
      });
      const { data } = await getMe();
      const { _id, ...rest } = data.user;
      setAuth({ id: _id, ...rest }, accessToken);
      navigate('/home');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

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
        console.log('needs username');
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

  const verified = searchParams.get('verified');

  useEffect(() => {
    if (verified === 'true') {
      toastSuccess('Your email has been verified. You can now log in.');
    }
  }, []);

  return (
    <>
      <AuthLayout>
        <AuthNav
          preButton="Don't have an account?"
          button="Sign Up"
          to="/Signup"
        />
        <AuthContainer
          title="Welcome Back"
          subtitle="Continue your anime journey"
        >
          <div className="flex flex-col gap-4">
            <FormInput
              label="Email"
              type="email"
              required={true}
              placeholder="aniway@gmail.com"
              value={formData.email}
              onChange={(c: string) =>
                setFormData((prev) => ({ ...prev, email: c }))
              }
            />

            <FormInput
              label="Password"
              type="password"
              required={true}
              placeholder="Password"
              value={formData.password}
              onChange={(c: string) =>
                setFormData((prev) => ({ ...prev, password: c }))
              }
            />
            <div className="flex justify-between -mt-2">
              {error ? (
                <p className="ml-2 mt-1 text-red-400 text-xs ">{error}</p>
              ) : (
                <span />
              )}
              <p
                className="text-xs text-purple-400 hover:text-purple-300 cursor-pointer mt-1 text-right"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot password?
              </p>
            </div>

            {/* ASK ABOUT WIDTH ON GOOGLE BUTTONS */}
          </div>
          <div className="w-full mt-3">
            <AuthButtons
              onClick={handleSubmit}
              clickEnabled={approved && !loading}
              label={loading ? 'Logging In...' : 'Log In'}
            />

            <p className="text-center text-xs text-gray-400 my-1">or</p>

            <div className="mt-3">
              <GoogleLoginButton
                onSuccess={(response) => {
                  if (!response.credential) {
                    toastError('Google login failed. Please try again.');
                    return;
                  }
                  handleGoogleSubmit(response.credential);
                }}
              />
            </div>
          </div>
        </AuthContainer>
      </AuthLayout>
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
