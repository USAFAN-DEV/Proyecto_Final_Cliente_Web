'use client';
//Librerias react/next
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
//Componentes
import ClientInfoInputForm from './ClientInfoInputForm';
import LoadingSpinner from '@/components/LoadingSpinner';
//Funciones
import { updateCliente } from '@/features/clientes/api/clientesRequests';

// Esquema de validación con Yup
const SignSchema = Yup.object().shape({
  province: Yup.string().required('La provincia es obligatoria'),
  address: Yup.string()
    .required('El domicilio fiscal es obligatorio')
    .matches(
      /^[a-zA-Z\s]+,\s\d+,\s\d{5},\s[a-zA-Z\s]+$/,
      'El domicilio fiscal debe tener el formato "Calle de las Rosas, 23, 28054, Madrid"'
    ),
  postalCode: Yup.string().required('El código postal es obligatorio').length(5, 'El código postal debe tener 5 caracteres'),
  cif: Yup.string()
    .required('El CIF es obligatorio')
    .min(8, 'El CIF debe tener al menos 8 caracteres')
    .max(9, 'El CIF no puede tener más de 9 caracteres'),
});

/**
 * Formulario de Informacion del Cliente
 * @param {dict} client - Diccionario con la informacion del cliente.
 * @returns {JSX.Element}
 */
const ClientInfoForm = ({ client }) => {
  //Estado que gestiona si se esta cargando la informacion
  const [isLoading, setIsLoading] = useState(false);
  //Estado que gestiona si se puede editar la informacion
  const [isEditable, setIsEditable] = useState(false);

  //Desestructuracion de funciones de react-hook-form y establecimiento de valores default
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignSchema),
    defaultValues: {
      province: client.address.province,
      address: `${client.address.street}, ${client.address.number}, ${client.address.postal}, ${client.address.province}`,
      postalCode: client.address.postal,
      cif: client.cif,
    },
  });

  useEffect(() => {
    reset({
      province: client.address.province,
      address: `${client.address.street}, ${client.address.number}, ${client.address.postal}, ${client.address.province}`,
      postalCode: client.address.postal,
      cif: client.cif,
    });
  }, [client]);

  const onSubmit = async (clientData) => {
    setIsEditable(false);

    try {
      setIsLoading(true);
      let clientId = client._id;
      await updateCliente(clientId, clientData, client.name);
    } catch (error) {
      console.error('Error en updateCliente:', error);
    } finally {
      window.location.reload(); //!Revisar queda mal en la pagina
      //setIsLoading(false); No hace falta, se recarga la página
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  } else {
    return (
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full flex flex-wrap flex-row items-center">
          <div className=" flex flex-col h-[30%] w-[45%] mr-[2vw]">
            <ClientInfoInputForm
              inputTitle="Provincia"
              inputID="province"
              inputType="text"
              register={register}
              disabled={!isEditable}
            />
            {errors.province && <p className="text-red-500 text-xs mt-1 mb-[1vh]">{errors.province.message}</p>}
          </div>
          <div className=" flex flex-col h-[30%] w-[45%]">
            <ClientInfoInputForm
              inputTitle="Domicilio Fiscal"
              inputID="address"
              inputType="text"
              register={register}
              disabled={!isEditable}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1 mb-[1vh]">{errors.address.message}</p>}
          </div>
          <div className=" flex flex-col h-[30%] w-[45%] mr-[2vw]">
            <ClientInfoInputForm
              inputTitle="Código Postal"
              inputID="postalCode"
              inputType="text"
              register={register}
              disabled={!isEditable}
            />
            {errors.postalCode && <p className="text-red-500 text-xs mt-1 mb-[1vh]">{errors.postalCode.message}</p>}
          </div>
          <div className=" flex flex-col h-[30%] w-[45%]">
            <ClientInfoInputForm
              inputTitle="CIF"
              inputID="cif"
              inputType="text"
              register={register}
              disabled={!isEditable}
            />
            {errors.cif && <p className="text-red-500 text-xs mt-1 mb-[1vh]">{errors.cif.message}</p>}
          </div>
          <div className="w-full flex flex-row justify-end mt-[1vh]">
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

export default ClientInfoForm;
