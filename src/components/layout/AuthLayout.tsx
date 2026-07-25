type AuthLayoutProps = {
  children: React.ReactNode;
};

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#020204] via-[#04050A] to-[#08090F] text-white px-4 sm:px-6 lg:px-8">
      {children}
    </main>
  );
};
