import { useState } from 'react';
import { AuthContainer } from '../components/common/AuthContainer';
import type { SignUpFormData } from '../types/SignUpFormData';
import { SignUpStepOne } from '../components/common/SignUpComponents/SignUpStepOne';
import { SignUpStepTwo } from '../components/common/SignUpComponents/SignUpStepTwo';
import { AuthLayout } from '../components/layout/AuthLayout';
import { AuthNav } from '../components/common/AuthNav';
// import { useNavigate } from "react-router-dom";

const initialFormData: SignUpFormData = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  avatar: '',
  displayName: '',
  bio: '',
  favoriteGenres: [],
};

const stepContent: Record<number, { title: string; subtitle: string }> = {
  1: {
    title: 'Begin Your Adventure',
    subtitle: 'Join the community of anime explorers today',
  },
  2: {
    title: 'Build Your Profile',
    subtitle: 'Tell the community about yourself',
  },
  3: { title: '', subtitle: '' },
};

export const SignUp = () => {
  // const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SignUpFormData>(initialFormData);
  const [agreed, setAgreed] = useState(false);

  const nextStep = async () => {
    // if (loading) return;

    if (step === 2) {
      // setLoading(true);
      // await sign up & set step 3

      console.log('signing up');
      console.log(formData);
      setStep(3);
      // setTimeout(() => {
      //         navigate("/home")
      // }, 2000)
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <AuthLayout>
      <AuthNav
        preButton="Already have an account?"
        button="Log In"
        to="/login"
      />
      <AuthContainer
        title={stepContent[step].title}
        subtitle={stepContent[step].subtitle}
        step={step}
      >
        {step === 1 && (
          <SignUpStepOne
            formData={formData}
            setFormData={setFormData}
            agreed={agreed}
            setAgreed={setAgreed}
            nextStep={nextStep}
          />
        )}
        {step === 2 && (
          <SignUpStepTwo
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 3 && (
          <div className="flex flex-col items-center justify-center space-y-3 py-10">
            <p className="text-3xl">🎉</p>
            <h2 className="text-white text-xl font-semibold">
              Welcome to AniWay!
            </h2>
            <p className="text-zinc-400 text-sm">
              Taking you to the home page...
            </p>
          </div>
        )}
      </AuthContainer>
    </AuthLayout>
  );
};
