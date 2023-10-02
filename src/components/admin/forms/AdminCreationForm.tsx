'use client';
import { AdminProfile } from '@prisma/client';
import Image from 'next/image';
import { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import defaultProfilePic from '../../../../public/defaultProfilePic.png';

const AdminCreationForm = () => {
  const { register, handleSubmit, control } = useForm<AdminProfile>();

  const createAdmin = async (
    data: AdminProfile,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    if (event === undefined) return;
    event.preventDefault();
    console.log(data);
    const imageFile = event.target.files?.[0];
    if (imageFile) {
      setImage(imageFile);
    }
    // await createAdminProfileUser(data);
  };

  // const editAdmin = (inputId: string) => {
  //   const adminUser = adminUsers.filter((admin: AdminUser) => admin.id === inputId);
  //   const { name, email, role, image } = adminUser[0];
  //   reset({ name, email, role, image });
  // };
  return (
    <form
      className="flex flex-col gap-4 w-full sm:w-1/2 sm:mt-16"
      onSubmit={handleSubmit(async (data, event) => await createAdmin(data, event!))}
    >
      <h1 className="text-xl text-center font-semibold text-gray-900 sm:text-2xl dark:text-white mb-4">
        Crear administrador
      </h1>
      <div className="w-full rounded-full flex gap-2 items-center justify-center">
        <Image
          width={80}
          height={80}
          className="mb-4 rounded-lg sm:mb-0 xl:mb-4 2xl:mb-0"
          src={defaultProfilePic}
          alt="profile picture"
        />
        <input
          {...register('profileImage')}
          type="file"
          accept="image/*"
          className="shadow-none bg-transparent block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:active:outline-none file:active:ring-0
      file:cursor-pointer
      file:bg-secondary-2 file:text-primary-light
      hover:file:bg-primary-light hover:file:text-secondary-2"
        />
      </div>
      <div className="flex gap-4">
        <div className="w-full">
          <label
            htmlFor="studyArea"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nombre
          </label>
          <input type="text" required {...register('profileName')} />
        </div>
        <div className="w-full flex gap-4">
          <div className="w-1/2">
            <label
              htmlFor="studyArea"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Genero
            </label>
            <select {...register('gender')}>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </div>
          <div className="w-1/2">
            <label
              htmlFor="studyArea"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Capitulo
            </label>
            <select {...register('chapter')}>
              <option value="CARACAS">Caracas</option>
              <option value="ZULIA">Zulia</option>
              <option value="CARABOBO">Carabobo</option>
            </select>
          </div>
        </div>
      </div>

      <div className="">
        <label
          htmlFor="currentAcademicPeriod"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email{' '}
        </label>
        <input type="email" required {...register('allowedEmail')} />
      </div>
      <div className="flex gap-4 ">
        <div className="w-full">
          <label
            htmlFor="currentAcademicPeriod"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Rol{' '}
          </label>
        </div>
        <div className="w-full">
          <label
            htmlFor="currentAcademicPeriod"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Responsabilidad{' '}
          </label>
          <input
            type="text"
            required
            {...register('responsibility')}
            placeholder="Asistente de programas educativos"
          />
        </div>
      </div>

      <button
        className="text-white bg-primary-light hover:bg-primary-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="submit"
      >
        Crear administrador
      </button>
    </form>
  );
};

export default AdminCreationForm;
