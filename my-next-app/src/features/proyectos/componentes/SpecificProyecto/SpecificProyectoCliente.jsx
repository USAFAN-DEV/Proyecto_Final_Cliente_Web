const SpecificProyectoCliente = ({ cliente }) => {
  console.log(cliente);
  return (
    <div className="flex flex-row w-full h-full">
      <div className="relative w-1/4 mr-[2vw] flex items-center justify-center" style={{ aspectRatio: 1 }}>
        <img src={cliente.logo} alt="Logo Cliente" className="w-full rounded-full" style={{ aspectRatio: 1 }} />
      </div>
      <div className="w-[60%] h-full p-[2%]">
        <div className="w-full h-[4vh] mb-[1vh] flex items-center ">
          <h1 className="text-2xl font-bold">{cliente.name}</h1>
        </div>
        <div className="w-full h-[4vh] mb-[1vh] flex items-center ">
          <h1 className="text-lg">{`${cliente.address.street}, ${cliente.address.number}, ${cliente.address.postal}, ${cliente.address.province}`}</h1>
        </div>
      </div>
    </div>
  );
};

export default SpecificProyectoCliente;
