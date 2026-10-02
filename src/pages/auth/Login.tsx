import { useState, useEffect } from 'react';
import { AuthNav } from '../../components/common/AuthPages/AuthNav';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { AuthContainer } from '../../components/common/AuthPages/AuthContainer';
import { FormInput } from '../../components/ui/FormInput';
import { AuthButtons } from '../../components/ui/AuthButtons';
import { getMe, login } from '../../api/auth';
import axios from 'axios';
import { useAuthStore } from '../../stores/useAuthStore';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GoogleLoginButton } from '../../components/social-logins';
import { toastSuccess } from '../../lib/toast';

export const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);

  const approved = !!(formData.email && formData.password);

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

  const verified = searchParams.get('verified');

  useEffect(() => {
    if (verified === 'true') {
      toastSuccess('Your email has been verified. You can now log in.');
    }
  }, []);

  return (
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
                console.log('Google login successful:', response);
              }}
            />
          </div>
        </div>
      </AuthContainer>
    </AuthLayout>
  );
};
