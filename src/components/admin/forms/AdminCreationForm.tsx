'use client';
import { Button, Input, Select, SelectItem, Spinner } from '@nextui-org/react';
import { AdminProfile } from '@prisma/client';
import Image from 'next/image';
import { BaseSyntheticEvent } from 'react';
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import defaultProfilePic from '../../../../public/defaultProfilePic.png';

interface AdminCreationFormProps {
  register: UseFormRegister<AdminProfile>;
  createAdmin: (
    data: AdminProfile,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  handleImageChange: (event: BaseSyntheticEvent<object, any, any>) => void;
  handleSubmit: UseFormHandleSubmit<AdminProfile>;
  image: File | null;
  isCreating: boolean;
}
const AdminCreationForm: React.FC<AdminCreationFormProps> = ({
  register,
  createAdmin,
  handleImageChange,
  handleSubmit,
  image,
  isCreating,
}) => {
  return (
    <>
      <form
        className="flex flex-col gap-4 w-full sm:w-1/2 "
        onSubmit={handleSubmit(async (data, event) => await createAdmin(data, event!))}
      >
        <h1 className="text-xl text-center font-semibold text-gray-900 sm:text-2xl dark:text-white mb-4">
          Crear administrador
        </h1>
        <div className="w-full rounded-full flex items-center justify-center gap-4 ">
          <Image
            width={80}
            height={80}
            className="rounded-full bg-white"
            src={image == null ? defaultProfilePic : URL.createObjectURL(image)}
            alt="profile picture"
          />
          <input
            {...register('profilePic')}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
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
        <div className="flex flex-col gap-4 md:flex-row">
          <Input
            isRequired
            label="Nombre"
            size="md"
            labelPlacement="outside"
            type="text"
            {...register('profileName')}
          />
          <div className="w-full flex gap-4">
            <div className="w-1/2">
              <Select
                isRequired={true}
                {...register('gender')}
                label="Género"
                labelPlacement="outside"
              >
                <SelectItem key="M" value="M">
                  Masculino
                </SelectItem>
                <SelectItem key="F" value="F">
                  Femenino
                </SelectItem>
              </Select>
            </div>
            <div className="w-1/2">
              <Select
                isRequired={true}
                {...register('chapter_id')}
                label="Capitulo"
                labelPlacement="outside"
              >
                <SelectItem key="Rokk6_XCAJAg45heOEzYb" value="Rokk6_XCAJAg45heOEzYb">
                  Caracas
                </SelectItem>
                <SelectItem key="H0rvqSucbop6uozNUpuC-" value="H0rvqSucbop6uozNUpuC-">
                  Zulia
                </SelectItem>
                <SelectItem key="VYmgeeUPWwh_P_myJ1PCJ" value="VYmgeeUPWwh_P_myJ1PCJ">
                  Carabobo
                </SelectItem>
              </Select>
            </div>
          </div>
        </div>
        <Input
          isRequired
          label="Correo electrónico"
          size="md"
          labelPlacement="outside"
          type="email"
          {...register('allowedEmail')}
        />
        <div className="flex flex-col md:flex-row gap-4 ">
          <div className="w-full">
            <Select isRequired={true} {...register('role_id')} label="Rol" labelPlacement="outside">
              <SelectItem key={'4ERMUKjj33LSXplU6dg5N'} value={'4ERMUKjj33LSXplU6dg5N'}>
                Coordinador de Projectos
              </SelectItem>
              <SelectItem key={'CheUBJvQ5Bxl_BkWZRDv-'} value={'CheUBJvQ5Bxl_BkWZRDv-'}>
                Super Administrador
              </SelectItem>
              <SelectItem key={'LMLe7Jiv9E2O2Qw3rdxjd'} value={'LMLe7Jiv9E2O2Qw3rdxjd-'}>
                Administrador de capitulo
              </SelectItem>
              <SelectItem key={'W7x4qZmntsQLMOEwm4Z7q'} value={'W7x4qZmntsQLMOEwm4Z7q-'}>
                Coordinador de Chats
              </SelectItem>
            </Select>
          </div>
          <div className="w-full">
            <Input
              label="Cargo"
              size="md"
              labelPlacement="outside"
              type="text"
              isRequired={true}
              {...register('responsibility')}
              placeholder="Asistente de programas educativos"
            />
          </div>
        </div>
        <Button
          color="success"
          className="w-full md:w-1/2 self-center mt-4"
          type="submit"
          disabled={isCreating}
        >
          {isCreating ? <Spinner color="primary" labelColor="primary" /> : 'Crear administrador'}
        </Button>
      </form>
    </>
  );
};

export default AdminCreationForm;
