import Image from 'next/image';

const InterfazCrearCliente = ({ handleSubmit }) => {
  return (
    <>
      <div className="relative h-2/3" style={{ aspectRatio: `${1185 / 1080} / 1` }}>
        <Image src="/images/cliente/cliente.png" alt="Crear cliente" fill />
      </div>
      <div className="h-1/6 flex flex-col items-center justify-center">
        <h1 className="font-bold mb-[2vh]">Crea tu primer cliente</h1>
        <h2>Para poder generar Albaranes digitales</h2>
      </div>
      <div>
        <button
          onClick={handleSubmit}
          className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-[2vh]"
        >
          Crear Cliente
        </button>
      </div>
    </>
  );
};

export default InterfazCrearCliente;
