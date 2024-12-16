import Image from 'next/image';

/**
 * Muestra un mensaje de que no hay proyectos disponibles
 * return {JSX.Element}
 */
const ClientProjectsEmpty = () => {
  return (
    <div className="border w-full h-full flex flex-row items-center justify-center">
      <div className="h-full w-1/2 flex flex-col items-center justify-center">
        <h1 className="font-bold text-3xl mb-[2vh]">No hay proyectos disponibles</h1>
      </div>
      <div className="relative h-[80%]" style={{ aspectRatio: `${821 / 583} / 1` }}>
        <Image src="/images/proyecto/proyecto.png" alt="Crear cliente" fill />
      </div>
    </div>
  );
};

export default ClientProjectsEmpty;
