//TODO LOADING PAGE WHEN CHECKING LOGIN,
//TODO ERROR PAGE WHEN LOGIN NOT CORRECT

'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { verifyUser } from '@/features/register/api/createUser.js';
import RegisterFormInput from './RegisterFormInput';

/**
 * Esquema de validación de los datos del formulario de login para manejar errores.
 */
const SignSquema = Yup.object({
  code: Yup.string().required().min(6).max(6),
});

/**
 * Componente de login que muestra un formulario para iniciar sesión.
 */
const VerifyAccountForm = ({ setIsLoading, setRegistrated }) => {
  const router = useRouter();

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
   * Funcion que se ejecuta al enviar el formulario, se encarga de hacer el fetch a la API de login.
   * @param {Object} userData
   *   @param {string} userData.email
   *   @param {string} userData.password
   * @returns {Promise<void>}
   */
  async function onSubmit(code) {
    try {
      setIsLoading(true);
      const response = await verifyUser(code);

      if (!response.acknowledged) {
        console.error('Code verification failed, response:', response);
        setIsLoading(false);
        alert('Verification code is incorrect. Please try again.');
        reset();
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Error en onSubmit:', error);
      setIsLoading(false);
    }
  }

  const handleClick = () => {
    setRegistrated(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className=" h-[25vh] w-[20vw] mt-[2vh]">
        <RegisterFormInput
          inputTitle="Codigo de verificacion"
          register={register}
          placeholder="12345"
          inputID="code"
          errors={errors}
        />
        {errors.code && <p className="mt-[1vh] text-sm text-red-600">{errors.code.message}</p>}
        <button
          type="submit"
          className="mt-[4vh] w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Verificar
        </button>
        <button
          type="button"
          onClick={handleClick}
          className="mt-[2vh] w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancelar
        </button>
      </form>
    </>
  );
};

export default VerifyAccountForm;
