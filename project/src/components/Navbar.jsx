'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true); //useState para manejar el estado del navbar
  const [logoHeight, setLogoHeight] = useState(0); //useState para manejar la altura del logo sin texto
  const logoRef = useRef(null); //referencia para calcular la altura del logo sin texto

  const toggleNavbar = () => {
    //función para actualizar el estado del navbar
    setIsOpen(!isOpen);
  };

  const getLogo = () => {
    /*
    Función para obtener el logo. Si el navbar esta abierto, mostramos el logo con texto, si no, mostramos solo el logo. 
    Para ello usamos el estado logoHeight, que se actualiza cada vez que se redimensiona la ventana.
    */
    return isOpen ? (
      <div ref={logoRef} className={'relative w-full mb-16'} style={{ aspectRatio: `${458 / 123} / 1` }}>
        <Image src={'/images/logo/logo2.png'} alt="Logo" fill priority />
      </div>
    ) : (
      <div
        className={'relative border border-red-400 w-1/2 flex justify-center mb-16'} /*el width es 1/2 del nav original*/
        style={{ height: `${logoHeight}px`, marginLeft: '50%' }} /*metemos margin del 50% para poder centrar*/
      >
        <Image
          className={'ml-3'} /*por el padding del nav para que quede bien centrado*/
          src={'/images/logo/logo2-symbol.png'}
          alt="Logo"
          width={`${logoHeight}`}
          height={`${logoHeight}`}
          priority
        />
      </div>
    );
  };

  const updateLogoHeight = () => {
    //función para actualizar la altura del logo sin texto
    if (logoRef.current) {
      //Si la referencia esta asignada
      setLogoHeight(logoRef.current.offsetHeight);
    }
  };

  useEffect(() => {
    // ! si hago resize cuando el navbar esta cerrado no funciona
    updateLogoHeight(); //Establecemos la altura inicial del logo sin texto
    //Añadimos un event listener para que cada vez que se redimensione la ventana, se actualice la altura del logo sin texto
    window.addEventListener('resize', updateLogoHeight);
    return () => {
      // ? Cuando el componente se desmonte, eliminamos el event listener para evitar memory leaks (no va a estar montado siempre?)
      window.removeEventListener('resize', updateLogoHeight);
    };
  }, []);

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
      className={`fixed top-0 left-0 h-screen w-1/6 flex flex-col items-center p-3 border transition-transform duration-500 transform 
      ${isOpen ? 'translate-x' : '-translate-x-1/2'}`}
      style={{ borderColor: '#D9E2EC', borderWidth: '0 0.12rem 0 0' }}
    >
      <div className="absolute z-10 -right-[16px] top-[12px] lg:visible ">
        <button onClick={toggleNavbar} className="bg-white">
          <Image
            src="/images/menu/flecha.png"
            alt="Salir"
            width={32}
            height={32}
            className={`transition-transform duration-500 transform ${isOpen ? 'rotate-0' : 'rotate-180'}`}
          />
        </button>
      </div>
      {/*DIFERENTE LOGO SI EL MENU ESTA ABIERTO O NO*/}
      {getLogo()}
      <ul className="w-full h-auto flex flex-col ">
        {navBarItems.map((item, index) => (
          <li key={index} className="h-16 flex items-center justify-center">
            <div className="w-3/4 flex flex-row items-center">
              <Image
                className={'mr-4'}
                src={`/images/menu/${item.name.toLowerCase()}.png`}
                alt={item.name}
                width={32}
                height={32}
              />
              <Link className="font-bold text-gray-800 hover:text-blue-500" href={item.href}>
                {item.name}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

{
  /*
body {
    transition: margin-left 0.3s;
  }
  
  .toggle-button {
    position: fixed;
    top: 10px;
    left: 10px;
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 1000;
  }
  
  .side-navbar {
    height: 100%;
    width: 0;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: 0.3s;
    padding-top: 60px;
    z-index: 999;
  }
  
  .side-navbar.open {
    width: 250px;
  }
  
  .side-navbar ul {
    list-style-type: none;
    padding: 0;
  }
  
  .side-navbar ul li {
    padding: 8px 16px;
    text-align: left;
  }
  
  .side-navbar ul li a {
    color: white;
    text-decoration: none;
    display: block;
  }
  
  .side-navbar ul li a:hover {
    background-color: #575757;
  }
*/
}
