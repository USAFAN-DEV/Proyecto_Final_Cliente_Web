//TODO REPASAR - INCOMPLETO
'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Link from 'next/link';
import { createUser } from '@/features/register/api/createUser';

const SignSquema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(4).max(10),
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(SignSquema) });

  async function onSubmit(data) {
    console.log(data);
    const response = await createUser(data);
    const token = await response.token;

    if (token) {
      console.log(token);
    } else {
      console.log(response);
    }
    //reset(); //resetea el contenido escrito en los inputs
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            {...register('email', {
              /* { required: 'Obligatorio' } */
            })}
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
            {...register('password', {
              /* { required: 'Obligatorio', minLength: { value: 8, message: "Error longitud" } } */
            })}
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
          <Link href="/main">Registrarse</Link>
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
