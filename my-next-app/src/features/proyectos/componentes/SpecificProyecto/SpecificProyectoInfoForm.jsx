'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import SpecificProyectoInfoInputForm from './SpecificProyectoInfoInputForm';
import LoadingSpinner from '@/components/LoadingSpinner';
import { updateProject } from '@/features/proyectos/api/proyectosRequests';

// Esquema de validación con Yup
const SignSchema = Yup.object().shape({
  address: Yup.string()
    .required('El domicilio fiscal del cliente creador del proyecto es obligatorio')
    .matches(
      /^[a-zA-Z\s]+,\s\d+,\s\d{5},\s[a-zA-Z\s]+$/,
      'El domicilio fiscal debe tener el formato "Calle de las Rosas, 23, 28054, Madrid"'
    ),
  code: Yup.string()
    .required('El CIP es obligatorio')
    .min(8, 'El CIP debe tener al menos 8 caracteres')
    .max(9, 'El CIP no puede tener más de 9 caracteres'),
});

const SpecificProyectoInfoForm = ({ proyecto }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignSchema),
    defaultValues: {
      address: `${proyecto.address.street}, ${proyecto.address.number}, ${proyecto.address.postalCode}, ${proyecto.address.province}`,
      code: proyecto.code,
    },
  });

  useEffect(() => {
    reset({
      address: `${proyecto.address.street}, ${proyecto.address.number}, ${proyecto.address.postal}, ${proyecto.address.province}`,
      code: proyecto.code,
    });
  }, [proyecto, reset]);

  const onSubmit = async (projectData) => {
    setIsEditable(false);

    try {
      setIsLoading(true);
      await updateProject(projectData, proyecto);
    } catch (error) {
      console.error('Error en updateCliente:', error);
    } finally {
      window.location.reload();
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  } else {
    return (
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full flex flex-wrap flex-row">
          <div className="h-[10vh] w-[40%] flex flex-col mr-[2vw]">
            <SpecificProyectoInfoInputForm
              inputTitle="Codigo Interno"
              inputID="code"
              inputType="text"
              register={register}
              disabled={!isEditable}
            />
            {errors.code && <p className="text-red-500 text-xs mt-1 mb-[1vh]">{errors.code.message}</p>}
          </div>
          <div className="h-[10vh] w-[40%] flex flex-col">
            <SpecificProyectoInfoInputForm
              inputTitle="Address"
              inputID="address"
              inputType="text"
              register={register}
              disabled={!isEditable}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1 mb-[1vh]">{errors.address.message}</p>}
          </div>
          <div className="w-full flex flex-row justify-end mt-[4vh]">
            <button
              type="submit"
              className="mr-[2vw] w-[6vw] flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => setIsEditable(true)}
              className="w-[6vw] flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Editar
            </button>
          </div>
        </form>
      </div>
    );
  }
};

export default SpecificProyectoInfoForm;
