import Image from 'next/image';

//! Podria no ser necesario
/**
 * Seccion de la pagina de Crear Cliente que guia al usuario a la creacion de un cliente.
 * @param {function} handleClick - Funcion que cambia el contenido de la pagina.
 * @returns
 */
const CrearClienteSection = ({ handleClick }) => {
  return (
    <>
      <div className="relative h-2/3" style={{ aspectRatio: `${1185 / 1080} / 1` }}>
        <Image src="/images/cliente/cliente.png" alt="Crear cliente" fill />
      </div>
      <div className="h-1/6 flex flex-col items-center justify-center">
        <h1 className="font-bold text-xl mb-[2vh]">Crea un cliente</h1>
        <h1 className="text-lg mb-[2vh]">Para poder generar Albaranes digitales</h1>
      </div>
      <div>
        <button
          onClick={handleClick}
          className="w-[9vw] h-[6vh] bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-[2vh]"
        >
          Crear Cliente
        </button>
      </div>
    </>
  );
};

export default CrearClienteSection;
