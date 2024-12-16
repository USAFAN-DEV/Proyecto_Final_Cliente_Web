'use client';
//Librerias react/next
import { useState } from 'react';
//Componentes
import CrearClienteContent from '@/features/clientes/components/CrearCliente/CrearClienteContent.jsx';
import CrearClienteLogoCliente from '@/features/clientes/components/CrearCliente/CrearClienteLogoCliente.jsx';

/**
 * Renderiza la pagina de crear-cliente
 * @returns {JSX.Element}
 */
const CrearClientePage = () => {
  const [uploadLogo, setUploadLogo] = useState(false);
  return (
    <>
      <CrearClienteContent setUploadLogo={setUploadLogo} />

      <div className="flex flex-col w-2/5">
        <CrearClienteLogoCliente uploadLogo={uploadLogo} setUploadLogo={setUploadLogo} />
      </div>
    </>
  );
};

export default CrearClientePage;
