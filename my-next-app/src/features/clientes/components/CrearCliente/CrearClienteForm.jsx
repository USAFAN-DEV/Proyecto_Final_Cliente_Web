'use client';
//Librerias react/next
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Image from 'next/image';
//Componentes
import CrearClienteSection from './CrearClienteSection.jsx';
import { ClienteContext } from '../ClienteContext.jsx';
import LoadingSpinner from '@/components/LoadingSpinner';
//Funciones
import { postCliente } from '../../api/clientesRequests';

/**
 * Esquema de validación de los datos del formulario de crear cliente para manejar errores.
 */
const SignSquema = Yup.object({
  name: Yup.string().required('El nombre es obligatorio'),
  address: Yup.string()
    .required('El domicilio fiscal es obligatorio')
    .matches(
      /^[a-zA-Z\s]+,\s\d+,\s\d{5},\s[a-zA-Z\s]+$/,
      'El domicilio fiscal debe tener el formato "Calle de las Rosas, 23, 28054, Madrid"'
    ),
  cif: Yup.string()
    .required('El CIF es obligatorio')
    .min(8, 'El CIF debe tener al menos 8 caracteres')
    .max(9, 'El CIF no puede tener más de 9 caracteres'),
});

/**
 * Formulario para crear un cliente.
 * @param {Function} setContentCrearCliente - Función que actualiza el contenido de la página.
 * @param {Function} setUploadLogo - Función que actualiza el estado de subida del logo.
 * @returns {JSX.Element}
 */
const FormCrearCliente = ({ setContentCrearCliente, setUploadLogo }) => {
  const router = useRouter();
  //Estado que controla los clientes del usuario, a traves de un contexto.
  const [clientes, setClientes] = useContext(ClienteContext);
  //Estado que controla si se esta cargando la informacion.
  const [isLoading, setIsLoading] = useState(false);

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
   * @param {Object} clientData - Datos del cliente a crear.
   */
  const onSubmit = async (clientData) => {
    try {
      setIsLoading(true);
      const response = await postCliente(clientData);
      console.log('Cliente creado:', response);
      localStorage.setItem('clientID', response._id);
    } catch (error) {
      console.error('Error en postCliente:', error);
    } finally {
      setIsLoading(false);
      setUploadLogo(true); //Cuando el cliente se crea, ya podemos hacer PATCH para subir el logo.
    }

    router.push('/main/clientes');
  };

  /**
   * Función que se ejecuta al hacer clic en el botón "Descartar", se encarga de resetear los valores del formulario y redirigir al contenido correspondiente
   * @param {Event} e
   */
  const handleReset = (e) => {
    e.preventDefault(); //No enviamos el formulario (No saltan los errores)
    reset();

    if (clientes.length == 0) {
      //Si no hay ningun cliente guardado en la API, volvemos a CrearClienteSection
      setContentCrearCliente(
        <CrearClienteSection
          handleClick={() => setContentCrearCliente(<FormCrearCliente setContentCrearCliente={setContentCrearCliente} />)}
        />
      );
    } else {
      router.push('/main/clientes');
    }
  };

  //!Refactorizar el formulario

  if (isLoading) {
    console.log('cargando');
    return <LoadingSpinner />;
  } else {
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
            <label className="block text-base" htmlFor="name">
              Nombre del cliente o empresa
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className="mt-[1vh] block w-full h-[3vh] rounded-sm bg-slate-100 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div className="mb-[2vh]">
            <label className="block text-base" htmlFor="address">
              Domicilio Fiscal
            </label>
            <input
              id="address"
              type="text"
              {...register('address')}
              className="mt-[1vh] block w-full h-[3vh] rounded-sm bg-slate-100 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
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
  }
};

export default FormCrearCliente;
