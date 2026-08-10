import { useState } from 'react';
import { AuthNav } from '../components/common/AuthNav';
import { AuthLayout } from '../components/layout/AuthLayout';
import { AuthContainer } from '../components/common/AuthContainer';
import { FormInput } from '../components/ui/FormInput';
import { AuthButtons } from '../components/ui/AuthButtons';
import { login } from '../api/auth';
import axios from 'axios';
import { useAuthStore } from '../stores/useAuthStore';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);

  const approved = !!(formData.email && formData.password);

  async function handleSubmit() {
    console.log('clicked');
    setError('');
    setLoading(true);
    try {
      console.log('calling login');
      const { user, accessToken } = await login({
        email: formData.email,
        password: formData.password,
      });
      console.log('login succeeded', user, accessToken);
      setAuth(user, accessToken);
    } catch (err) {
      console.log('login failed', err);
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      console.log('finally ran');
      setLoading(false);
    }
  }

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
              // onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </p>
          </div>
          <AuthButtons
            onClick={handleSubmit}
            clickEnabled={approved && !loading}
            label="Login"
          />
        </div>
        <div className="mt-4">
          {/* <GoogleLoginButton
            onSuccess={(response) => {
              console.log('Google login successful:', response);
            }}
          /> */}
        </div>
      </AuthContainer>
    </AuthLayout>
  );
};
