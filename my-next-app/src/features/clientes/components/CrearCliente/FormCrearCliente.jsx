'use client';

import { set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Image from 'next/image';
import InterfazCrearCliente from './InterfazCrearCliente';

/**
 * Esquema de validación de los datos del formulario de crear cliente para manejar errores.
 */
const SignSquema = Yup.object({
  nombre: Yup.string().required('El nombre es obligatorio'),
  domicilio_fiscal: Yup.string().required('El domicilio fiscal es obligatorio'),
  cif: Yup.string()
    .required('El CIF es obligatorio')
    .min(8, 'El CIF debe tener al menos 8 caracteres')
    .max(9, 'El CIF no puede tener más de 9 caracteres'),
});

/**
 * Formulario para crear un cliente.
 *  - Si el cliente se crea (Crear Cliente), se hace un post a la API api/client y se redirige a la lista de clientes.
 *  - Si el cliente no se crea (Descartar) se resetean los valores del formulario y
 *    - Si no hay ningun cliente guardado en la API, se redirige a la InterfazCrearCliente.
 *    - Si ya hay clientes guardados en la API, se redirige a la lista de clientes.
 */
const FormCrearCliente = ({ setContentCrearCliente, clientes, setClientes }) => {
  /**
   * Desestructuracion de los metodos de useForm para manejar el formulario intengrando el esquema de validacion de Yup.
   */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(SignSquema) });

  /**
   * Funcion que se ejecuta al enviar el formulario, se encarga de hacer el post a la API de client.
   * @param {string} clientData.nombre - Nombre del cliente o empresa.
   * @param {string} clientData.domicilio_fiscal - Domicilio fiscal del cliente.
   * @param {string} clientData.cif - CIF del cliente.
   *  ? @returns ?
   */
  const onSubmit = async (clientData) => {
    //TODO
    setClientes([...clientes, clientData]);
    console.log(clientData);
  };

  /**
   * Función que se ejecuta al hacer clic en el botón "Descartar", se encarga de resetear los valores del formulario y redirigir al contenido correspondiente
   * @param {Event} e - El evento del clic.
   */
  const handleReset = (e) => {
    e.preventDefault(); //Evitamos el comportamiento por defecto del formulario, es decir, no enviamos el formulario (No saltan los errores)
    reset();

    if (clientes.length == 1) {
      /**
       * Si no hay ningun cliente guardado en la API, volvemos a la InterfazCrearCliente
       * Para ello seteamos el content de CrearClientePage a InterfazCrearCliente.
       * Le tenemos que pasar la funcion handleClick a InterfazCrearCliente para que sepa que hacer al hacer clic en el boton "Crear Cliente". (Venir a este formulario)
       */
      setContentCrearCliente(
        <InterfazCrearCliente
          handleClick={() =>
            setContentCrearCliente(
              <FormCrearCliente
                setContentCrearCliente={setContentCrearCliente}
                clientes={clientes}
                setClientes={setClientes}
              />
            )
          }
        />
      );
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border w-[35vw] mx-auto rounded-2xl bg-white shadow-md mt-[5%] p-[5%]"
      >
        <div className="mb-[4vh]">
          <h1 className="font-bold text-2xl text-center">Crear Cliente</h1>
        </div>
        <div className="mb-[2vh]">
          <label className="block text-base" htmlFor="nombre">
            Nombre del cliente o empresa
          </label>
          <input
            id="nombre"
            type="text"
            {...register('nombre')}
            className="mt-[1vh] block w-full h-[3vh] rounded-sm bg-slate-100 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>}
        </div>
        <div className="mb-[2vh]">
          <label className="block text-base" htmlFor="domicilio_fiscal">
            Domicilio Fiscal
          </label>
          <input
            id="domicilio_fiscal"
            type="text"
            {...register('domicilio_fiscal')}
            className="mt-[1vh] block w-full h-[3vh] rounded-sm bg-slate-100 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.domicilio_fiscal && <p className="text-red-500 text-xs mt-1">{errors.domicilio_fiscal.message}</p>}
        </div>
        <div className="mb-[2vh]">
          <label className="block text-base" htmlFor="cif">
            CIF
          </label>
          <input
            id="cif"
            type="text"
            {...register('cif')}
            className="mt-[1vh] block w-full h-[3vh] rounded-sm bg-slate-100 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.cif && <p className="text-red-500 text-xs mt-1">{errors.cif.message}</p>}
        </div>
        <div className="w-full flex flex-row justify-end mt-[4vh]">
          <button
            onClick={handleReset}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-[2vw]"
          >
            Descartar
          </button>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Crear Cliente
          </button>
        </div>
      </form>
      <div className="relative h-[20vh] mt-[3vh]" style={{ aspectRatio: 1 }}>
        <Image src="/images/cliente/clienteForm.png" alt="iconoAcuerdo" fill />
      </div>
    </>
  );
};

export default FormCrearCliente;
