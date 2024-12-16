import Image from 'next/image';

/**
 * Componente que se muestra cuando no hay proyectos asociados a un usuario.
 * @returns {JSX.Element}
 */
const AllProyectosEmpty = () => {
  return (
    <div className="w-full h-full flex flex-row items-center">
      <div className="h-full w-1/2 flex flex-col items-center justify-center">
        <h1 className="font-bold text-3xl mb-[2vh]">No hay proyectos disponibles</h1>
        <h2 className="text-xl">Crea proyectos desde cero con tus clientes</h2>
      </div>
      <div className="relative h-[80%]" style={{ aspectRatio: `${821 / 583} / 1` }}>
        <Image src="/images/proyecto/proyecto.png" alt="Crear cliente" fill />
      </div>
    </div>
  );
};

export default AllProyectosEmpty;
