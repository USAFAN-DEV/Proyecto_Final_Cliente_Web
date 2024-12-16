//TODO LOADING PAGE WHEN CHECKING LOGIN,
//TODO ERROR PAGE WHEN LOGIN NOT CORRECT

'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/features/login/api/loginRequest';

/**
 * Esquema de validación de los datos del formulario de login para manejar errores.
 */
const SignSquema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(4).max(10),
});

/**
 * Componente de login que muestra un formulario para iniciar sesión.
 */
const LoginForm = ({ setIsLoading }) => {
  const router = useRouter();

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
    console.log('hola');
    try {
      const { email, password } = userData;
      setIsLoading(true);
      const response = await loginUser({ email, password });

      if (response.token) {
        //Si la consulta es correcta, guardamos el token y redirigimos a la pagina principal
        localStorage.setItem('jwt', response.token);
        router.push('/main');
      } else {
        console.error('Login failed, response:', response);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error en onSubmit:', error);
      setIsLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className=" w-[20vw] mx-auto p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            {...register('email', {})}
            placeholder="Introduce email"
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="email"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            {...register('password', {})}
            placeholder="Introduce password"
            type="password"
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            id="password"
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Iniciar sesion
        </button>
      </form>
    </>
  );
};

export default LoginForm;
