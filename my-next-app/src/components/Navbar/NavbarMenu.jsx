import Link from 'next/link';
import Image from 'next/image';

/**
 * @param {boolean} props.isOpen - Indica si el navbar está abierto o no.
 * @returns {JSX.Element} - Lista de pestañas del Navbar.
 */
const MenuNavbar = ({ isOpen }) => {
  //Elementos del navbar
  const navBarItems = [
    { name: 'Resumen', href: '/main' },
    { name: 'Clientes', href: '/main/clientes' },
    { name: 'Proyectos', href: '/main/proyectos' },
    { name: 'Albaranes', href: '/main/albaranes' },
    { name: 'Proveedores', href: '/main/proveedores' },
    { name: 'Ajustes', href: '/main/ajustes' },
  ];

  return (
    <ul className="w-full h-auto flex flex-col ">
      {navBarItems.map((item, index) => (
        <Link
          key={index}
          className={`h-[10vh] flex items-center justify-center hover:bg-blue-100 rounded-md group ${isOpen ? '' : 'w-1/3'}`}
          style={isOpen ? {} : { transform: 'translateX(185%)' }}
          href={item.href}
        >
          <div className={`w-4/5 flex flex-row items-center ${isOpen ? '' : 'h-3/4 justify-center'}`}>
            <ImagenItemMenuNavbar isOpen={isOpen} item={item} />
            <h1 className={`font-bold text-lg group-hover:text-blue-400 ${isOpen ? '' : 'hidden'}`}>{item.name}</h1>
          </div>
        </Link>
      ))}
    </ul>
  );
};

const ImagenItemMenuNavbar = ({ isOpen, item }) => {
  return (
    <Image
      className={`${isOpen ? 'mr-4' : ''}`} //? revisar
      src={`/images/menu/${item.name.toLowerCase()}.png`}
      alt={item.name}
      width={40}
      height={40}
    />
  );
};

export default MenuNavbar;
