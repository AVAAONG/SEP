'use client';
import { EditIcon, XIcon } from '@/assets/svgs';
import { useForm } from 'react-hook-form';

const page = () => {
  const { register, handleSubmit } = useForm();
  return (
    <section className="w-full h-screen">
      <div className="flex px-2 justify-start w-full gap-4 h-full">
        <form className="flex flex-col gap-4 justify-center w-1/2">
          <h1 className="text-xl text-center font-semibold text-gray-900 sm:text-2xl dark:text-white mb-4">
            Crear administrador
          </h1>
          <div className="">
            <label
              htmlFor="studyArea"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nombre Completo
            </label>
            <input type="text" placeholder="" required className="bg-white" />
          </div>
          <div className="">
            <label
              htmlFor="currentAcademicPeriod"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email{' '}
            </label>
            <input type="date" required className="bg-white" />
          </div>
          <div className="">
            <label
              htmlFor="grade"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Rol del administrador
            </label>
            <input type="number" required className="bg-white" />
          </div>
          <button
            className="text-white bg-green-600 hover:bg-green-500 hover:text-green-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
          >
            Crear administrador
          </button>
        </form>
        <div className="w-1/2 flex flex-col px-2 justify-center items-center gap-4 h-full">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white mb-4">
            Administradores del SEP
          </h1>
          <ul className="w-full">
            <li className="p-4 focus:outline-none focus:outline-offset-0  rounded-md w-full bg-slate-900">
              <div className="flex items-center space-x-4">
                <div className="w-6 h-6 cursor-pointer">
                  <EditIcon />
                </div>
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/docs/images/people/profile-picture-1.jpg"
                    alt="Neil image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Karhil Canelones
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    caneloneskarhil@gmail.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  STAFF
                </div>
                <div className="w-6 h-6 cursor-pointer">
                  <XIcon />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default page;
