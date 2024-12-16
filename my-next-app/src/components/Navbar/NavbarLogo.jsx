import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

/**
 * @param {boolean} props.isOpen - Indica si el navbar está abierto o no.
 * @returns {JSX.Element} - Logo que aparece en la parte superior del Navbar. Dependiendo del isOpen, se muestra el logo con o sin texto.
 */
const LogoNavbar = ({ isOpen }) => {
  // Estado para manejar la altura del logo sin texto
  const [logoHeight, setLogoHeight] = useState(0);
  // Referencia para calcular la altura del logo sin texto
  const logoRef = useRef(null);

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
    // ! Problema. Como el logo con texto no existe cuando resizeamos la pantalla, no se actualiza la altura del logo sin texto. No es responsive
    updateLogoHeight(); //Establecemos la altura inicial del logo sin texto
    window.addEventListener('resize', updateLogoHeight);
    return () => {
      // ? Cuando el componente se desmonte, eliminamos el event listener para evitar memory leaks (no va a estar montado siempre?)
      window.removeEventListener('resize', updateLogoHeight);
    };
  }, [isOpen]);

  /**
   * Función para obtener el logo.
   * Si el navbar está abierto, mostramos el logo con texto.
   * Si no, mostramos solo el logo.
   */
  const getLogo = () => {
    return isOpen ? (
      <div ref={logoRef} className={'relative w-full mb-[5vh] mt-[2vh]'} style={{ aspectRatio: `${458 / 123} / 1` }}>
        <Image src={'/images/logo/logo2.png'} alt="Logo" fill />
      </div>
    ) : (
      <div
        className={'w-1/2 flex justify-center mb-[5vh] mt-[2vh]'} /*transformación navbar = navbar/2 -> w-1/2*/
        style={{ height: `${logoHeight}px`, transform: 'translateX(50%)' }}
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

  return <>{getLogo()}</>;
};

export default LogoNavbar;
