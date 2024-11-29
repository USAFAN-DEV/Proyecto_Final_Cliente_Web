'use client';
import { useState } from 'react';
import LogoNavbar from './LogoNavbar';
import BotonNavbar from './BotonNavbar';
import MenuNavbar from './MenuNavbar';

/**
 * Navbar principal de la pagina web.
 */
const Navbar = () => {
  //useState para manejar el estado del navbar
  const [isOpen, setIsOpen] = useState(true);

  /**
   * Función para alternar el estado del navbar y mover el contenido acorde a este
   */
  const toggleNavbar = () => {
    setIsOpen(!isOpen);

    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.style.marginLeft = isOpen ? '8.3334%' : '16.6667%';
    }
  };

  //TODO responsive navbar
  return (
    <nav
      className={`fixed top-0 left-0 h-screen w-1/6 flex flex-col items-center p-3 border transition-transform duration-300 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-1/2'
      }`}
      style={{ borderColor: '#D9E2EC', borderWidth: '0 0.12rem 0 0' }}
    >
      {/* Botón para abrir y cerrar el navbar */}
      <BotonNavbar isOpen={isOpen} toggleNavbar={toggleNavbar} />
      {/* Diferente logo si el navbar está abierto o no */}
      <LogoNavbar isOpen={isOpen} />
      {/* Lista de elementos del navbar */}
      <MenuNavbar isOpen={isOpen} />
    </nav>
  );
};

export default Navbar;
