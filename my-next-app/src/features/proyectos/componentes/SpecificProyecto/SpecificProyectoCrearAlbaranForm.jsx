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
import SpecificProyectoCrearAlbaranInputForm from './SpecificProyectoCrearAlbaranInputForm.jsx';
//Funcs
import { postAlbaran } from '../../api/proyectosRequests';

/**
 * Esquema de validación de los datos del formulario de crear proyecto para manejar errores.
 */
const SignSquema = Yup.object().shape({
  format: Yup.string().matches('material', 'El formato debe ser -> material').required('El formato es requerido'),
  material: Yup.string().required('El material es requerido'),
  description: Yup.string().required('La descripción es requerida'),
  workdate: Yup.string()
    .required('La fecha de trabajo es requerida')
    .matches(/^\d{1,2}\/\d{1,2}\/\d{4}$/, 'La fecha debe tener el formato DD/MM/YYYY'),
});

/**
 * Formulario para crear un proyecto.
 */
const CrearProyectoForm = ({ proyecto }) => {
  const [isLoading, setIsLoading] = useState(false);
  console.log(proyecto);

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
   */
  const onSubmit = async (albaranData) => {
    try {
      setIsLoading(true);
      await postAlbaran(albaranData, proyecto.clientId, proyecto._id);
    } catch (error) {
      console.error('Error en postCliente:', error);
    } finally {
      window.location.reload();
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
      <div className="w-full h-full flex flex-row items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="border w-full bg-white shadow-md p-[2%] flex flex-col">
          <TitleCrearProyectoForm />
          <div className="flex flex-row flex-wrap items-center p-[1%] h-[15vh]">
            <div className="w-[25%] h-full flex flex-col">
              <SpecificProyectoCrearAlbaranInputForm
                inputTitle="Formato"
                inputID="format"
                inputType="text"
                placeholder="material"
                register={register}
              />
              {errors.format && <p className="text-red-500 text-xs mt-1 mb-[1vh]">{errors.format.message}</p>}
            </div>
            <div className=" w-[25%] h-full flex flex-col">
              <SpecificProyectoCrearAlbaranInputForm
                inputTitle="Material"
                inputID="material"
                inputType="text"
                placeholder="Tipo de material"
                register={register}
              />
              {errors.material && <p className="text-red-500 text-xs mt-1 mb-[1vh]">{errors.material.message}</p>}
            </div>
            <div className=" w-[25%] h-full flex flex-col">
              <SpecificProyectoCrearAlbaranInputForm
                inputTitle="Descripcion"
                inputID="description"
                inputType="text"
                placeholder="Descripcion del albaran"
                register={register}
              />
              {errors.description && <p className="text-red-500 text-xs mt-1 mb-[1vh]">{errors.description.message}</p>}
            </div>
            <div className=" w-[25%] h-full flex flex-col">
              <SpecificProyectoCrearAlbaranInputForm
                inputTitle="Workdate"
                inputID="workdate"
                inputType="text"
                placeholder="2/1/2024"
                register={register}
              />
              {errors.workdate && <p className="text-red-500 text-xs mt-1 mb-[1vh]">{errors.workdate.message}</p>}
            </div>
          </div>
          <div className="w-full flex flex-row justify-end mt-[4vh]">
            <button
              onClick={handleReset}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-[2vw]"
            >
              Descartar
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Crear Albaran
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
      <h1 className="font-bold text-2xl text-center">Crear Albaran </h1>
    </div>
  );
};

export default CrearProyectoForm;
