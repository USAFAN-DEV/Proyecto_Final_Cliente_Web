import Image from 'next/image';

/**
 * Componente para el título de los formularios de la página de login y registro.
 */
const LoginRegisterTitle = () => {
  return (
    <div className="relative" style={{ aspectRatio: `${458 / 123} / 1` }}>
      <Image src="/images/logo/logo2.png" alt="Logo" fill />
    </div>
  );
};

export default LoginRegisterTitle;
