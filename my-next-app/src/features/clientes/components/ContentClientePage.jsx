'use client';
import { useContext } from 'react';
import ListaClientesContent from './ListaClientes/ListaClientesContent';
import { useRouter } from 'next/navigation';
import { ClienteContext } from './ClienteContext.jsx';

/**
 * Página de contenido de clientes
 * @returns {JSX.Element}
 */
const ContentClientePage = () => {
  const router = useRouter();
  // Estado para manejar los clientes que hay en la API
  const [clientes, setClientes] = useContext(ClienteContext);

  if (clientes.length == 0) {
    router.push('./clientes/crear-cliente');
  } else {
    return <ListaClientesContent clientes={clientes} />;
  }
};

export default ContentClientePage;
