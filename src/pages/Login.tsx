import { useState } from 'react';
import { AuthNav } from '../components/common/AuthNav';
import { AuthLayout } from '../components/layout/AuthLayout';
import { AuthContainer } from '../components/common/AuthContainer';
import { FormInput } from '../components/ui/FormInput';
import { AuthButtons } from '../components/ui/AuthButtons';
import type { Asterisk } from 'lucide-react';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const approved = !!(formData.email && formData.password);

  async function handleSubmit() {
    try {
      console.log(formData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to log in. Try again.'
      );
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
            clickEnabled={approved}
            label="Login"
          />
        </div>
      </AuthContainer>
    </AuthLayout>
  );
};
