'use client';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import BarraBusquedaNavbarSecundario from './BarraBusquedaNavbarSecundario';
import PerfilNavbarSecundario from './PerfilNavbarSecundario';

/**
 * @returns {JSX.Element} - Navbar secundario que aparece en la parte superior de la pagina
 */
const NavbarSecundario = () => {
  const pathname = usePathname();
  let nombre = '';
  let apellido = '';
  let titulo;

  useEffect(() => {
    nombre = localStorage.getItem('nombre');
    apellido = localStorage.getItem('apellido');
  }, [pathname]);

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
    default:
      titulo = 'No hay un titulo asociado. Error';
      break;
  }

  return (
    <nav className="border-t border-l border-r w-full h-[10vh] flex flex-row p-[0.5%]">
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

export default NavbarSecundario;
