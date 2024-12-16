//TODO LOADING PAGE WHEN CHECKING LOGIN,
//TODO ERROR PAGE WHEN LOGIN NOT CORRECT

'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { createUser } from '@/features/register/api/createUser.js';
import RegisterFormInput from './RegisterFormInput';

/**
 * Esquema de validación de los datos del formulario de login para manejar errores.
 */
const SignSquema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(4).max(10),
  nombre: Yup.string().required(),
  apellido: Yup.string().required(),
});

/**
 * Componente de login que muestra un formulario para iniciar sesión.
 */
const CreateAccountForm = ({ setIsLoading, setRegistrated }) => {
  /**
   * Desestructuracion de los metodos de useForm para manejar el formulario intengrando el esquema de validacion de Yup.
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(SignSquema) });

  /**
   * Funcion que se ejecuta al enviar el formulario, se encarga de hacer el fetch a la API de login.
   * @param {Object} userData
   *   @param {string} userData.email
   *   @param {string} userData.password
   * @returns {Promise<void>}
   */
  async function onSubmit(userData) {
    try {
      setIsLoading(true);
      const { email, password, nombre, apellido } = userData;
      const response = await createUser({ email, password });

      if (response.token) {
        localStorage.setItem('jwt', response.token);
        localStorage.setItem('email', response.user.email);
        localStorage.setItem('nombre', nombre);
        localStorage.setItem('apellido', apellido);
        setRegistrated(true);
      } else {
        console.error('Regiter failed, response:', response); //!Handle better
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error en onSubmit:', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className=" h-[1/2] w-[20vw] mx-auto p-6 space-y-4">
        <RegisterFormInput
          inputTitle="Email"
          inputType={'email'}
          register={register}
          placeholder="Introduce email"
          inputID="email"
          errors={errors}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        <RegisterFormInput
          inputTitle="Password"
          inputType={'password'}
          register={register}
          placeholder="Introduce password"
          inputID="password"
          errors={errors}
        />
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
        <RegisterFormInput
          inputTitle="Nombre"
          inputType={'text'}
          register={register}
          placeholder="Introduce tu nombre"
          inputID="nombre"
          errors={errors}
        />
        {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>}
        <RegisterFormInput
          inputTitle="Apellido"
          inputType={'text'}
          register={register}
          placeholder="Introduce tu apellido"
          inputID="apellido"
          errors={errors}
        />
        {errors.apellido && <p className="mt-1 text-sm text-red-600">{errors.apellido.message}</p>}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Crear cuenta
        </button>
      </form>
    </>
  );
};

export default CreateAccountForm;
