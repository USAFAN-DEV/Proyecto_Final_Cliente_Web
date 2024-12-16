'use client';
import { useState } from 'react';
import Image from 'next/image';
import { getDeliveryNote } from '../../api/albaranesRequests';

//TODO - Implementar la funcionalidad de la barra de busqueda

/**
 * Componente que muestra la barra de busqueda de proyectos.
 * @returns {JSX.Element}
 */
export const ListaAlbaranesSearchBar = () => {
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

export const ListaAlbaranesDescargar = ({ selectedAlbaranes }) => {
  let idAlbaran = null;
  if (selectedAlbaranes.length > 1) {
    idAlbaran = selectedAlbaranes[0];
  } else {
    idAlbaran = selectedAlbaranes;
  }

  const downloadPDF = async (albaranId) => {
    try {
      const blob = await getDeliveryNote(albaranId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `deliverynote_${albaranId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar el PDF:', error);
    }
  };

  return (
    <div className="h-[50%] ml-[2vw]">
      <button onClick={() => downloadPDF(idAlbaran)} className="w-full h-full bg-blue-500 text-white rounded px-[1vw]">
        Descargar Albaran
      </button>
    </div>
  );
};
