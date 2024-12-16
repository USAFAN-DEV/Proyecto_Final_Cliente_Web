//Librerias react/next
import { useState } from 'react';
//Componentes
import ClientesList from './ClientsList';
import ClientInfo from './ClientInfo';
import ClientProjects from './ClientProjects';

/**
 * Lista de Clientes
 * @param {Object} clientes - Diccionario con la informacion de los clientes.
 * @returns
 */
const ListaClientesPage = ({ clientes }) => {
  //Estado que gestiona el cliente del que se muestra la informacion
  const [clienteAMostrar, setClienteAMostrar] = useState(0);

  return (
    <div className="flex flex-row">
      <div className="border-l border-b border-t w-2/6 h-[80vh] ">
        <ClientesList clientes={clientes} setClienteAMostrar={setClienteAMostrar} />
      </div>
      <div className="flex flex-col w-4/6">
        <ClientInfo client={clientes[clienteAMostrar]} />
        <ClientProjects client={clientes[clienteAMostrar]} />
      </div>
    </div>
  );
};

export default ListaClientesPage;
