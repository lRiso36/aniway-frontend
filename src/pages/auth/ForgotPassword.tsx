import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthNav } from '../../components/common/AuthNav';
import { AuthContainer } from '../../components/common/AuthContainer';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { MailCheck } from 'lucide-react';
import { FormInput } from '../../components/ui/FormInput';
import { AuthButtons } from '../../components/ui/AuthButtons';
import { forgotPassword } from '../../api/auth';
import { toastError } from '../../lib/toast';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) return;

    setLoading(true);
    setError('');

    try {
      await forgotPassword(email.trim());
      setSent(true);
    } catch {
      toastError('Unable to send email right now. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthNav
        preButton="Remember your password?"
        button="Log In"
        to="/login"
      />
      <AuthContainer
        title="Forgot Password"
        subtitle={
          sent
            ? 'Check your email for a reset link'
            : "Enter your email and we'll send you a reset link"
        }
      >
        {sent ? (
          <div className="flex flex-col gap-4 items-center text-center py-4">
            <div className="flex gap-3 items-center">
              <MailCheck className="w-8 h-8 text-white-500" />
              <p className="text-white font-semibold text-lg">Email sent!</p>
            </div>
            <p className="text-zinc-400 text-sm">
              Check your inbox for a password reset link. It may take a few
              minutes.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full py-3 rounded-xl font-semibold text-white text-sm sm:text-base mt-2 bg-purple-600 hover:bg-purple-500 transition"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            <FormInput
              label="Email"
              type="email"
              required={true}
              error={error}
              placeholder="aniway@gmail.com"
              value={email}
              onChange={(c: string) => setEmail(c)}
              onEnter={handleSubmit}
            />
            <AuthButtons
              onClick={handleSubmit}
              clickEnabled={!!email.trim() && !loading}
              label={loading ? 'Sending...' : 'Send Reset Link'}
            />

            <p className="text-center text-zinc-500 text-sm mt-2">
              Remember your password?{' '}
              <span
                className="text-purple-400 hover:text-purple-300 cursor-pointer"
                onClick={() => navigate('/login')}
              >
                Log in
              </span>
            </p>
          </div>
        )}
      </AuthContainer>
    </AuthLayout>
  );
};
