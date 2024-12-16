//Librerias de next/React
import Image from 'next/image';
import { useContext, useState } from 'react';
//Contextos
import { ClienteContext } from '@/features/clientes/components/ClienteContext';
import { useEffect } from 'react';

const CrearProyectoSeleccionarClienteForm = () => {
  const [clientes, setClientes] = useContext(ClienteContext);
  const [selectedCliente, setSelectedCliente] = useState(null);

  useEffect(() => {
    localStorage.removeItem('selectedCliente');
    localStorage.setItem('selectedCliente', JSON.stringify(selectedCliente));
  }, [selectedCliente]);

  const handleSelect = (cliente) => {
    setSelectedCliente(cliente);
  };

  return (
    <div className="w-2/5 h-full overflow-y-auto custom-scrollbar flex justify-center flex-col">
      {selectedCliente ? (
        <InfoCliente cliente={selectedCliente} setSelectedCliente={setSelectedCliente} />
      ) : (
        <>
          <div className="w-full h-[15%] flex items-center justify-center border-b">
            <h1 className="text-2xl font-bold">Selecciona un cliente</h1>
          </div>
          <div className="relative w-full h-[85%] flex flex-col justify-start items-center">
            <SeleccionarCliente clientes={clientes} handleSelect={handleSelect} />
          </div>
        </>
      )}
    </div>
  );
};

const InfoCliente = ({ cliente, setSelectedCliente }) => {
  return (
    <div className="border w-full h-[70%] flex flex-col items-center ">
      <div className="w-[50%] h-[50%] flex flex-col items-center justify-center">
        <div className="h-[70%] relative rounded-full" style={{ aspectRatio: 1 }}>
          <img src={cliente.logo} alt="Logo Cliente" className="w-full rounded-full" style={{ aspectRatio: 1 }} />
        </div>
        <h1 className="text-2xl font-bold mt-[2vh]">{cliente.name}</h1>
      </div>
      <div className="w-[50%] h-[20%] flex flex-col items-center justify-center">
        <h1 className="text-xl">{`CIF: ${cliente.cif}`}</h1>
        <h1 className="text-xl">{`Province: ${cliente.address.province}`}</h1>
      </div>
      <button
        type="submit"
        onClick={() => setSelectedCliente(null)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-[3vh] rounded"
      >
        Cambiar Cliente
      </button>
    </div>
  );
};

const SeleccionarCliente = ({ clientes, handleSelect }) => {
  return clientes.map((cliente) => (
    <button
      key={cliente._id}
      className="border-b w-full h-1/6 flex flex-row items-center justify-center p-2 cursor-pointer hover:bg-gray-200"
      onClick={() => handleSelect(cliente)}
    >
      <div className=" relative h-full mr-[1%] " style={{ aspectRatio: 1 }}>
        <img src={cliente.logo} alt="Logo Cliente" className="w-full rounded-full" style={{ aspectRatio: 1 }} />
      </div>
      <div className="w-[50%] h-full flex justify-start items-center ml-[2%]">
        <h1 className="text-xl">{cliente.name}</h1>
      </div>
      <div className="w-[30%] h-full flex justify-center items-center ">
        <h1 className="text-xl">{`CIF: ${cliente.cif}`}</h1>
      </div>
    </button>
  ));
};

export default CrearProyectoSeleccionarClienteForm;
