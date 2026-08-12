import { useState } from 'react';
import { AuthContainer } from '../../components/common/AuthContainer';
import type { SignUpFormData } from '../../types/SignUpFormData';
import { SignUpForm } from '../../components/common/SignUpForm';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { AuthNav } from '../../components/common/AuthNav';
import { MailOpen } from 'lucide-react';

const initialFormData: SignUpFormData = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const SignUp = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<SignUpFormData>(initialFormData);
  const [agreed, setAgreed] = useState(false);

  return (
    <AuthLayout>
      <AuthNav
        preButton="Already have an account?"
        button="Log In"
        to="/login"
      />
      <AuthContainer
        title={submitted ? 'Check Your Email' : 'Begin Your Adventure'}
        subtitle={
          submitted
            ? "We've sent a verification link to your inbox"
            : 'Join the community of anime explorers today'
        }
      >
        {!submitted && (
          <SignUpForm
            formData={formData}
            setFormData={setFormData}
            agreed={agreed}
            setAgreed={setAgreed}
            onSuccess={() => setSubmitted(true)}
          />
        )}
        {submitted && (
          <div className="flex flex-col items-center justify-center space-y-3 py-10">
            <div className="flex gap-3 items-center">
              <MailOpen className="w-7 h-7 text-white-500" />
              <p className="text-white font-semibold text-lg">Almost there!</p>
            </div>
            <p className="text-zinc-400 text-sm text-center max-w-sm mx-auto">
              Click the link in your email to verify your account, then log in.
            </p>
          </div>
        )}
      </AuthContainer>
    </AuthLayout>
  );
};
