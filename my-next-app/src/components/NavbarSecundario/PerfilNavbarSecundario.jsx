import Image from 'next/image';

/**
 * @param {string} props.nombre - El nombre del usuario.
 * @param {string} props.apellido - El apellido del usuario.
 * @returns {JSX.Element} - Perfil del usuario
 */
const PerfilNavbarSecundario = ({ nombre, apellido }) => {
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
