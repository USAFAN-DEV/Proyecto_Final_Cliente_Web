'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Componente Navbar
 * @param isOpen {boolean} isOpen - Estado que indica si el navbar está abierto
 * @param {function} toggleNavbar - Función para alternar el estado del navbar
 */
const Navbar = ({ isOpen, toggleNavbar }) => {
  // Estado para manejar la altura del logo sin texto
  const [logoHeight, setLogoHeight] = useState(0);
  // Referencia para calcular la altura del logo sin texto
  const logoRef = useRef(null);

  /**
   * Función para obtener el logo.
   * Si el navbar está abierto, mostramos el logo con texto.
   * Si no, mostramos solo el logo.
   */
  const getLogo = () => {
    return isOpen ? (
      <div ref={logoRef} className={'relative w-full mb-16'} style={{ aspectRatio: `${458 / 123} / 1` }}>
        <Image src={'/images/logo/logo2.png'} alt="Logo" fill />
      </div>
    ) : (
      <div
        className={'w-1/2 flex justify-center mb-16'} /*transformación navbar = navbar/2 -> w-1/2*/
        style={{ height: `${logoHeight}px`, marginLeft: '50%' }}
      >
        <Image
          className={'ml-3'} /*navbar p-3*/
          src={'/images/logo/logo2-symbol.png'}
          alt="Logo"
          width={`${logoHeight}`}
          height={`${logoHeight}`}
        />
      </div>
    );
  };

  /**
   * Función para actualizar la altura del logo sin texto
   */
  const updateLogoHeight = () => {
    if (logoRef.current) {
      //Si la referencia esta asignada a un elemento del DOM
      setLogoHeight(logoRef.current.offsetHeight);
    }
  };

  /**
   * useEffect para actualizar la altura del logo cuando el componente se monta
   * y añadir un event listener para actualizar la altura cuando la ventana
   * se redimensiona.
   */
  useEffect(() => {
    // ! si hago resize cuando el navbar esta cerrado no funciona
    updateLogoHeight(); //Establecemos la altura inicial del logo sin texto
    window.addEventListener('resize', updateLogoHeight);
    return () => {
      // ? Cuando el componente se desmonte, eliminamos el event listener para evitar memory leaks (no va a estar montado siempre?)
      window.removeEventListener('resize', updateLogoHeight);
    };
  }, []);

  //Elementos del navbar
  const navBarItems = [
    { name: 'Resumen', href: '/' },
    { name: 'Clientes', href: '/clientes' },
    { name: 'Proyectos', href: '/proyectos' },
    { name: 'Albaranes', href: '/albaranes' },
    { name: 'Proveedores', href: '/proveedores' },
    { name: 'Ajustes', href: '/ajustes' },
  ];

  //TODO responsive navbar
  return (
    <nav
      className={`fixed top-0 left-0 h-screen w-1/6 flex flex-col items-center p-3 border transition-transform duration-300 transform ${
        isOpen ? 'translate-x' : '-translate-x-1/2'
      }`}
      style={{ borderColor: '#D9E2EC', borderWidth: '0 0.12rem 0 0' }}
    >
      {/* Botón para alternar el estado del navbar */}
      <div className="absolute z-10 -right-[16px] top-[12px] lg:visible ">
        <button onClick={toggleNavbar} className="bg-white">
          <Image
            src="/images/menu/flecha.png"
            alt="Salir"
            width={32}
            height={32}
            className={`transition-transform duration-300 transform ${isOpen ? 'rotate-0' : 'rotate-180'}`}
          />
        </button>
      </div>

      {/* Diferente logo si el navbar está abierto o no */}
      {getLogo()}

      {/* Lista de elementos del navbar */}
      <ul className="w-full h-auto flex flex-col ">
        {navBarItems.map((item, index) => (
          <Link
            key={index}
            className={`${
              isOpen
                ? 'h-16 flex items-center justify-center hover:bg-blue-100 rounded-md group'
                : 'h-16 w-1/3 flex items-center justify-center'
            }`}
            style={isOpen ? {} : { marginLeft: '61%' }}
            href={item.href}
          >
            <div
              className={`w-3/4 flex flex-row items-center ${
                isOpen ? '' : 'h-3/4 justify-center hover:bg-blue-100 rounded-md'
              }`}
            >
              <Image
                className={`${isOpen ? 'mr-4' : ''}`} //? revisar
                src={`/images/menu/${item.name.toLowerCase()}.png`}
                alt={item.name}
                width={32}
                height={32}
              />
              <h1 className={`font-bold text-gray-800 group-hover:text-blue-400 ${isOpen ? '' : 'hidden'}`}>{item.name}</h1>
            </div>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
