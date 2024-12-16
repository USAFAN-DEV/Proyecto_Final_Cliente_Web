'use client';
import { createContext, useState, useEffect } from 'react';
import { getClientes } from '../api/clientesRequests';
import LoadingSpinner from '@/components/LoadingSpinner';

// Crear el contexto
const ClienteContext = createContext();

const ClienteProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const clientes = await getClientes();
        setClientes(clientes);
      } catch (error) {
        console.error('Error en fetchClientes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClientes();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  } else {
    return <ClienteContext.Provider value={[clientes, setClientes]}>{children}</ClienteContext.Provider>;
  }
};

export { ClienteContext, ClienteProvider };
