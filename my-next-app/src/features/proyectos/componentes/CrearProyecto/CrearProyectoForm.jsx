'use client';

//Librerias del formulario
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
//Librerias de next/React
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
//Contextos
import { ProyectosContext } from '../ProyectosContext';
//Componentes
import LoadingSpinner from '@/components/LoadingSpinner';
import CrearProyectoInputForm from './CrearProyectoInputForm';
//Funcs
import { postProyecto } from '../../api/proyectosRequests';
/**
 * Esquema de validación de los datos del formulario de crear proyecto para manejar errores.
 */
const SignSquema = Yup.object({
  name: Yup.string().required('El nombre del proyecto es obligatorio'),
  address: Yup.string()
    .required('El domicilio fiscal del cliente creador del proyecto es obligatorio')
    .matches(
      /^[a-zA-Z\s]+,\s\d+,\s\d{5},\s[a-zA-Z\s]+$/,
      'El domicilio fiscal debe tener el formato "Calle de las Rosas, 23, 28054, Madrid"'
    ),
  email: Yup.string().email('El email no es válido').required('El email es obligatorio'),
  CIP: Yup.string()
    .required('El CIP es obligatorio')
    .min(8, 'El CIP debe tener al menos 8 caracteres')
    .max(9, 'El CIP no puede tener más de 9 caracteres'),
});

/**
 * Formulario para crear un proyecto.
 */
const CrearProyectoForm = ({ cliente }) => {
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
   * @param {string} clientData.nombre - Nombre del cliente o empresa.
   * @param {string} clientData.domicilio_fiscal - Domicilio fiscal del cliente.
   * @param {string} clientData.cif - CIF del cliente.
   *  ? @returns ?
   */
  const onSubmit = async (proyectoData) => {
    try {
      //alert si no hay selected cliente
      setIsLoading(true);
      let clientId = JSON.parse(localStorage.getItem('selectedCliente'))._id;
      const result = await postProyecto(proyectoData, clientId);
      console.log('Proyecto creado:', result);
    } catch (error) {
      console.error('Error en postCliente:', error);
    } finally {
      reset();
      setIsLoading(false);
    }
  };

  /**
   * Función que se ejecuta al hacer clic en el botón "Descartar", se encarga de resetear los valores del formulario y redirigir al contenido correspondiente
   * @param {Event} e - El evento del clic.
   */
  const handleReset = (e) => {
    e.preventDefault(); //Evitamos el comportamiento por defecto del formulario, es decir, no enviamos el formulario (No saltan los errores)
    reset();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  } else {
    return (
      <div className="w-3/5 h-full flex flex-row items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="border w-[30vw] rounded-2xl bg-white shadow-md p-[4%]">
          <TitleCrearProyectoForm />
          <CrearProyectoInputForm
            inputTitle="Nombre del proyecto"
            inputID="name"
            inputType="text"
            placeholder="Macdonals"
            register={register}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1 mb-[1vh]">{errors.name.message}</p>}
          <CrearProyectoInputForm
            inputTitle="CIP (Codigo interno del proyecto)"
            inputID="CIP"
            inputType="text"
            placeholder="Ar44kjld3"
            register={register}
          />
          {errors.CIP && <p className="text-red-500 text-xs mt-1 mb-[1vh]">{errors.CIP.message}</p>}
          <CrearProyectoInputForm
            inputTitle="Domicilio Fiscal"
            inputID="address"
            inputType="text"
            placeholder="Calle de las Rosas, 23, 28054, Madrid"
            register={register}
          />
          {errors.address && <p className="text-red-500 text-xs mt-1 mb-[1vh]">{errors.address.message}</p>}
          <CrearProyectoInputForm
            inputTitle="Email"
            inputID="email"
            inputType="email"
            placeholder="agapito@email.com"
            register={register}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1 mb-[1vh]">{errors.email.message}</p>}
          <div className="w-full flex flex-row justify-end mt-[4vh]">
            <button
              onClick={handleReset}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-[2vw]"
            >
              Descartar
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Crear Proyecto
            </button>
          </div>
        </form>
      </div>
    );
  }
};

const TitleCrearProyectoForm = () => {
  return (
    <div className="mb-[4vh]">
      <h1 className="font-bold text-2xl text-center">Crear Proyecto </h1>
    </div>
  );
};

export default CrearProyectoForm;
