'use client';
//Librerias react/next
import { useState } from 'react';
//Componentes
import CrearClienteSection from './CrearClienteSection';
import CrearClienteForm from './CrearClienteForm';
import { ClienteProvider } from '../ClienteContext';

/**
 * Contenido de la página Crear Cliente.
 * @param {func} setUploadLogo - Funcion que actualiza el estado de subida de logo.
 * @returns {JSX.Element}
 */
const CrearClienteContent = ({ setUploadLogo }) => {
  /**
   * Estado que maneja el contenido del componente principal de la página.
   *  - CrearClienteSection
   *  - CrearClienteForm
   */

  const handleClick = () => {
    setContentCrearCliente(
      <CrearClienteForm setContentCrearCliente={setContentCrearCliente} setUploadLogo={setUploadLogo} />
    );
  };
  const [contentCrearCliente, setContentCrearCliente] = useState(<CrearClienteSection handleClick={handleClick} />);

  return (
    <div className={'w-3/5 h-[80vh] border flex flex-col items-center'}>
      <ClienteProvider>{contentCrearCliente}</ClienteProvider>
    </div>
  );
};

export default CrearClienteContent;
