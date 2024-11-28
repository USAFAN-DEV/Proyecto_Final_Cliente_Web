'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Componente para redireccionar a una ruta específica al cargar la página.
 */
const Redireccion = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    router.push(token ? '/main' : '/login');
  }, []);

  return null;
};

export default Redireccion;
