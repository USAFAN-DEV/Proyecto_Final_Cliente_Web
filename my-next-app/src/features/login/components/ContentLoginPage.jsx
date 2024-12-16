'use client';

import LoginRegisterTitle from '@/components/LoginRegisterTitle';
import LoginForm from '@/features/login/components/LoginForm';
import GoToRegister from '@/features/login/components/GoToRegister';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useState } from 'react';

const ContentLoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col p-[10vw_10vh] justify-center items-center w-screen h-screen">
      <div className="rounded-3xl flex flex-col bg-white shadow-md p-[1%]">
        <LoginRegisterTitle />
        <LoginForm setIsLoading={setIsLoading} />
        <GoToRegister />
      </div>
    </div>
  );
};

export default ContentLoginPage;
