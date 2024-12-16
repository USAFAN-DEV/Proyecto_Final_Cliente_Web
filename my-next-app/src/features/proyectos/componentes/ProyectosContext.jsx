'use client';
import { createContext, useState, useEffect } from 'react';
import { getProyectos } from '../api/proyectosRequests';
import LoadingSpinner from '@/components/LoadingSpinner';

// Crear el contexto
const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
  const [proyectos, setProyectos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const proyectos = await getProyectos();
        setProyectos(proyectos);
      } catch (error) {
        console.error('Error en fetchProyectos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProyectos();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  } else {
    return <ProyectosContext.Provider value={[proyectos, setProyectos]}>{children}</ProyectosContext.Provider>;
  }
};

export { ProyectosContext, ProyectosProvider };
