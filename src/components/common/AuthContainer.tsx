import type { ReactNode } from 'react';
import { ProgressBar } from './SignUpComponents/ProgressBar';

type AuthContainerType = {
  title: string;
  subtitle?: string;
  step?: number;
  children: ReactNode;
};
export const AuthContainer = ({
  title,
  subtitle,
  step,
  children,
}: AuthContainerType) => {
  return (
    <div
      className="
            flex 
            flex-col 
            items-center 
            text-center
            pt-28
            sm:pt-28
            md:pt-28
            pb-10
            "
    >
      <h2
        className="
                text-2xl
                sm:text-4xl
                mm:text-5xl
                font-bold
                tracking-tight
                "
      >
        {title}
      </h2>
      <p
        className="
                text-sm
                sm:text-base 
                text-zinc-300 
                mt-1
                max-w-md
                "
      >
        {subtitle}
      </p>

      <div
        className="
                mt-6 
                w-full 
                max-w-md 
                md:max-w-xl
                lg:max-w-2xl
                bg-white/5 
                border 
                border-white/10 
                rounded-2xl 
                p-5
                sm:p-8
                md:p-10 
                text-left
                "
      >
        {step && <ProgressBar step={step} />}
        {children}
      </div>
    </div>
  );
};
