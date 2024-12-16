import Link from 'next/link';
/**
 * Componente de login que muestra un enlace para ir a la página de registro.
 */
const GoToRegister = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p>No tienes una cuenta?</p>
      <Link href="/register">
        <p className="underline">Crear cuenta</p>
      </Link>
    </div>
  );
};

export default GoToRegister;
