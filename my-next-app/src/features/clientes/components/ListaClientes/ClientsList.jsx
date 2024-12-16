import { useRouter } from 'next/navigation';

/**
 * Lista de Clientes de un usuario
 * @param {Object} clientes - Diccionario con la informacion de los clientes.
 * @param {Function} setClienteAMostrar - Funcion que actualiza el cliente a mostrar.
 * @returns {JSX.Element}
 */
const ListaClientes = ({ clientes, setClienteAMostrar }) => {
  const router = useRouter();
  const handleClickCrearCliente = () => {
    router.push('/main/clientes/crear-cliente');
  };

  const handleClickMostrarCliente = (index) => {
    setClienteAMostrar(index);
  };

  return (
    <>
      <ul className="w-full h-[65vh] overflow-y-auto custom-scrollbar flex flex-col mb-[3vh] p-[2vh_1vw]">
        {clientes.map((item, index) => (
          <li key={index} className="flex items-center justify-center">
            <button
              onClick={() => handleClickMostrarCliente(index)}
              className={'h-[8vh] w-4/5 flex flex-row items-center hover:bg-blue-100 rounded-md'}
            >
              <ImagenCliente src={item.logo} />
              <h1 className="font-bold text-lg ml-[1vw]">{item.name}</h1>
            </button>
          </li>
        ))}
      </ul>
      <div className="w-full h-[10vh] flex items-center justify-center">
        <button
          onClick={handleClickCrearCliente}
          className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Crear Cliente
        </button>
      </div>
    </>
  );
};

const ImagenCliente = ({ src }) => {
  return (
    <div className="relative h-[90%]" style={{ aspectRatio: 1 }}>
      <img className="rounded-full object-cover w-full h-full" src={src} alt="Logo Cliente" />
    </div>
  );
};

export default ListaClientes;
