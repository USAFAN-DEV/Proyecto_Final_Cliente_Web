'use client';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import BarraBusquedaNavbarSecundario from './NavbarSecundarioSearchBar';
import PerfilNavbarSecundario from './NavbarSecundarioProfile';

/**
 * @returns {JSX.Element} - Navbar secundario que aparece en la parte superior de la pagina
 */
const NavbarSecundario = () => {
  const pathname = usePathname();
  let titulo;

  /**
   * Determina el titulo del navbar dependiendo del pathname.
   * @param {string} pathname - El pathname actual.
   * @returns {string} - El titulo correspondiente al pathname actual.
   */
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
    case '/main/clientes/crear-cliente':
      titulo = 'Crear Cliente';
      break;
    default:
      titulo = 'Proyecto Especifico';
      break;
  }

  return (
    <nav className="border-t border-l border-r w-full h-[10vh] flex flex-row p-[0.5%]">
      <TituloNavbarSecundario titulo={titulo} />
      <BarraBusquedaNavbarSecundario />
      <PerfilNavbarSecundario />
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

export default NavbarSecundario;
