import { useState } from 'react';
import Image from 'next/image';

//TODO - Implementar la funcionalidad de la barra de busqueda

/**
 * @returns {JSX.Element} - Barra de busqueda de clientes
 */
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
          placeholder="En implementacion..."
        />
        <button type="submit" className="h-3/4 relative text-white rounded ml-2" style={{ aspectRatio: 1 }}>
          <Image src="/images/cliente/search.png" alt="Buscar" fill />
        </button>
      </form>
    </div>
  );
};

export default BarraBusquedaNavbarSecundario;
