'use client';
import { useState } from 'react';
import InterfazCrearCliente from './InterfazCrearCliente';
import FormCrearCliente from './FormCrearCliente';

const ContentClientePage = () => {
  const handleSubmit = () => {
    setContentCrearCliente(FormCrearCliente);
  };
  const [contentCrearCliente, setContentCrearCliente] = useState(<InterfazCrearCliente handleSubmit={handleSubmit} />);

  return (
    <div className="flex flex-row">
      <CrearCliente content={contentCrearCliente} handleSubmit={handleSubmit} />
      <div className="border border-green-500 flex flex-col w-2/5">
        <LogoCliente />
        <NotasCliente />
        <TagsCliente />
      </div>
    </div>
  );
};

export default ContentClientePage;

const CrearCliente = ({ content, handleSubmit }) => {
  return <div className="w-3/5 h-[80vh] border flex flex-col items-center">{content}</div>;
};

const LogoCliente = () => {
  return (
    <div className="w-full h-[20vh] border border-red-500">
      <h1>Logo Cliente</h1>
    </div>
  );
};

const NotasCliente = () => {
  return (
    <div className="w-full h-[40vh] border border-blue-500">
      <h1>Notes Cliente</h1>
    </div>
  );
};

const TagsCliente = () => {
  return (
    <div className="w-full h-[20vh] border border-yellow-500">
      <h1>Tags Cliente</h1>
    </div>
  );
};
