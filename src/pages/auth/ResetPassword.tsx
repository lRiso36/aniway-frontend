import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { AuthNav } from '../../components/common/AuthNav';
import { AuthContainer } from '../../components/common/AuthContainer';
import { FormInput } from '../../components/ui/FormInput';
import { AuthButtons } from '../../components/ui/AuthButtons';
import { resetPassword } from '../../api/auth';
import { toastError } from '../../lib/toast';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const buttonEnabled = !!password && !!confirmPassword && !loading;

  const handleSubmit = async () => {
    if (!token) {
      toastError('Inavalid or missing reset token');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await resetPassword(token, password);
      navigate('/login');
    } catch {
      toastError('Unable to reset password. The link may have expired.');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <AuthLayout>
        <AuthContainer
          title="Invalid Link"
          subtitle="This password reset link is missing or malformed."
        >
          <div className="-mt-4">
            <AuthButtons
              onClick={() => navigate('/forgot-password')}
              clickEnabled={true}
              label="Request a new link"
            />
          </div>
        </AuthContainer>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthNav
        preButton="Remember your password?"
        button="Log In"
        to="/login"
      />

      <AuthContainer
        title="Reset Password"
        subtitle="Enter your new password below"
      >
        <div className="flex flex-col gap-3">
          <FormInput
            label="New Password"
            type="password"
            required={true}
            placeholder="Password"
            value={password}
            onChange={(c: string) => setPassword(c)}
          />

          <FormInput
            label="Confirm Password"
            error={error}
            type="password"
            required={true}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(c: string) => setConfirmPassword(c)}
          />
          <AuthButtons
            onClick={handleSubmit}
            clickEnabled={buttonEnabled}
            label={loading ? 'Resetting...' : 'Reset Password'}
          />
        </div>
      </AuthContainer>
    </AuthLayout>
  );
};
