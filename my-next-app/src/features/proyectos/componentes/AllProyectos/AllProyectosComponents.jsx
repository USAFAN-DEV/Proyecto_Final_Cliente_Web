'use client';
import { useState } from 'react';
import Image from 'next/image';

//TODO - Implementar la funcionalidad de la barra de busqueda

/**
 * Componente que muestra la barra de busqueda de proyectos.
 * @returns {JSX.Element}
 */
export const AllProyectosNavbarSearchbar = () => {
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
    <div className="w-1/2 h-[80%] mb">
      <form className="w-full h-full flex items-center" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-[85%] h-3/4 p-2 border border-gray-300 rounded"
          placeholder="Buscar..."
        />
        <button type="submit" className="h-3/4 relative text-white rounded ml-2" style={{ aspectRatio: 1 }}>
          <Image src="/images/cliente/search.png" alt="Buscar" fill />
        </button>
      </form>
    </div>
  );
};

export const AllProyectosNavbarSee = ({ selectedProjects }) => {
  const handleOpenNewTab = () => {
    window.open(`/main/proyectos/${selectedProjects[0]}`, '_blank');
  };

  return (
    <div className="border h-[50%] ml-[2vw]">
      <button onClick={handleOpenNewTab} className="w-full h-full bg-blue-500 text-white rounded px-[1vw]">
        Ver Proyecto
      </button>
    </div>
  );
};
