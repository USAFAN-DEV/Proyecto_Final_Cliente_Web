'use client';
import { useState } from 'react';
import InterfazCrearCliente from './InterfazCrearCliente';
import FormCrearCliente from './FormCrearCliente';
import { LogoCliente, NotasCliente, TagsCliente } from './DetailsCrearCliente';

const ContentCrearClientePage = ({ clientes, setClientes }) => {
  /**
   * Función que se ejecuta al hacer clic en el botón "Crear Cliente", se encarga de cambiar el contenido de la página a un formulario para crear un cliente.
   */
  const handleClick = () => {
    setContentCrearCliente(
      <FormCrearCliente setContentCrearCliente={setContentCrearCliente} clientes={clientes} setClientes={setClientes} />
    );
  };

  /**
   * Estado que maneja el contenido del componente principal de la página.
   *  - InterfazCrearCliente
   *  - FormCrearCliente
   *  - El estado inicial sera InterfazCrearCliente (numClientes == 0).
   */
  const [contentCrearCliente, setContentCrearCliente] = useState(<InterfazCrearCliente handleClick={handleClick} />);

  return (
    <div className="flex flex-row">
      <CrearCliente content={contentCrearCliente} />
      <div className="flex flex-col w-2/5">
        <LogoCliente />
        <NotasCliente />
        <TagsCliente />
      </div>
    </div>
  );
};

const CrearCliente = ({ content }) => {
  const isFormCrearCliente = content.type === FormCrearCliente;

  return (
    <div
      className={`w-3/5 border-t border-l border-b flex flex-col items-center ${
        isFormCrearCliente ? 'h-[40vh]' : 'h-[80vh]'
      }}`}
    >
      {content}
    </div>
  );
};

export default ContentCrearClientePage;
