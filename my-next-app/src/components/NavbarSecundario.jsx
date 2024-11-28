'use client';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

const NavbarSecundario = () => {
  const pathname = usePathname();
  let nombre = localStorage.getItem('nombre');
  let apellido = localStorage.getItem('apellido');
  let titulo;

  switch (pathname) {
    case '/main':
      titulo = 'Resumen';
      break;
    case '/main/clientes':
      titulo = 'Clientes';
      break;
    case '/main/proyectos':
      titulo = 'Proyectos';
      break;
    case '/main/albaranes':
      titulo = 'Albaranes';
      break;
    default:
      titulo = 'No hay un titulo asociado. Error';
      break;
  }

  return (
    <nav className="border w-full h-[10vh] flex flex-row p-[0.5%]">
      <TituloNavbarSecundario titulo={titulo} />
      <BarraBusquedaNavbarSecundario />
      <PerfilNavbarSecundario nombre={nombre} apellido={apellido} />
    </nav>
  );
};

const TituloNavbarSecundario = ({ titulo }) => {
  return (
    <div className="w-1/4 h-full flex items-center">
      <p className="font-bold text-3xl ml-[5%]">{titulo}</p>
    </div>
  );
};

const BarraBusquedaNavbarSecundario = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle the search logic here
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="w-2/4 h-full">
      <form className="w-full h-full flex items-center justify-center" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-3/4 h-3/4 p-2 border border-gray-300 rounded"
          placeholder="Buscar..."
        />
        <button type="submit" className="h-3/4 relative text-white rounded ml-2" style={{ aspectRatio: 1 }}>
          <Image src="/images/cliente/search.png" alt="Buscar" fill />
        </button>
      </form>
    </div>
  );
};

const PerfilNavbarSecundario = ({ nombre, apellido }) => {
  return (
    <div className="w-1/4 h-full flex justify-end items-center">
      <div className="relative h-3/4 mr-[2%]" style={{ aspectRatio: 1 }}>
        <Image src="/images/cliente/user.png" alt="Buscar" fill />
      </div>
      <p className="mr-[2%]">
        {nombre} {apellido}
      </p>
    </div>
  );
};

export default NavbarSecundario;
