'use client';
import { useState } from 'react';
import CreateAccountForm from './CreateAccountForm';
import LoadingSpinner from '@/components/LoadingSpinner';
import VerifyAccountForm from './VerifyAccountForm';

/**
 * Componente de login que muestra un formulario para iniciar sesión.
 */
const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [registrated, setRegistrated] = useState(false);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return registrated ? (
    <VerifyAccountForm setIsLoading={setIsLoading} setRegistrated={setRegistrated} />
  ) : (
    <CreateAccountForm setIsLoading={setIsLoading} setRegistrated={setRegistrated} />
  );
};

export default RegisterForm;
