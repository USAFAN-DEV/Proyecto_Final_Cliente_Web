import Image from 'next/image';

/**
 * @param {boolean} props.isOpen - Indica si el navbar está abierto o no.
 * @param {function} props.toggleNavbar - Función para cambiar el estado del navbar.
 * @returns {JSX.Element} - Boton para abrir y cerrar el Navbar.
 */
const BotonNavbar = ({ isOpen, toggleNavbar }) => {
  return (
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
  );
};

export default BotonNavbar;
