import Image from 'next/image';
import { useEffect, useState } from 'react';

/**
 * @param {string} props.nombre - El nombre del usuario.
 * @param {string} props.apellido - El apellido del usuario.
 * @returns {JSX.Element} - Perfil del usuario
 */
const PerfilNavbarSecundario = () => {
  // ! Se ejecuta antes el return que el useEffect y no aparece el nombre y apellido
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');

  //TODO puedo hacer que esto pase solo una vez. No tiene sentido que se ejecute cada vez que se renderiza el componente
  useEffect(() => {
    setNombre(localStorage.getItem('nombre'));
    setApellido(localStorage.getItem('apellido'));
  }, []);

  return (
    <div className="w-1/4 h-full flex justify-end items-center">
      <div className="relative h-3/4 mr-[2%]" style={{ aspectRatio: 1 }}>
        <Image src="/images/cliente/user.png" alt="Buscar" fill />
      </div>
      <p className="mr-[2%]">
        {nombre} {apellido}
      </p>
    </div>
  );
};

export default PerfilNavbarSecundario;
