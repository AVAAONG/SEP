'use client';
import StepButton from '@/components/public/admision/form/StepButton';
import { uploadBlob } from '@/lib/azure/azure';
import AdmisionPersonalInformationSchema from '@/lib/schemas/admision/PersonalInformationSchema';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar } from '@nextui-org/avatar';
import { Input } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';
import { ChangeEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

type Schema = z.infer<typeof AdmisionPersonalInformationSchema>;

const uploadProfilePic = async (event: ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    let url: string = '';
    reader.onloadend = async function () {
      const base64String = reader.result;
      try {
        const response = await uploadBlob(base64String as string, 'picture');
        url = response!;
        console.log('File uploaded to Azure Blob Storage');
      } catch (error) {
        console.error('Error uploading file: ', error);
      }
      try {
        //colocamos el url de la foto en el context
        revalidateSpecificPath('/postulante/registro');
      } catch (error) {
        console.error('Error saving the image ', error);
      }
    };
    reader.readAsDataURL(file);
  }
};

const PersonalInformation = () => {
  const methods = useForm<Schema>({
    resolver: zodResolver(AdmisionPersonalInformationSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
    setValue,
  } = methods;

  const handleFormSubmit = async (data: Schema) => {
    console.log(data);
  }
  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-8 w-full">
      <div className="w-full rounded-full flex items-center justify-center gap-4">
        <div className="flex-shrink-0 flex items-center justify-center w-28 h-28 object-contain rounded-full shadow-lg border-3 border-green-500 p-1 overflow-hidden">
          <Avatar
            //hacemos un retreive de la photo en el context
            src={undefined}
            alt="Foto del postulante"
            className="w-full h-full rounded-full"
          />
        </div>
        <div className='flex flex-col justify-center gap-2 lg:w-full '>

          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              toast.promise(uploadProfilePic(event), {
                pending: 'Subiendo imagen...',
                success: 'Imagen subida',
                error: 'Error subiendo imagen',
              });
            }}
            className="shadow-none bg-transparent block w-28 text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:active:outline-none file:active:ring-0
                  file:cursor-pointer
                  file:bg-secondary-2 file:text-primary-light
                  hover:file:bg-primary-light hover:file:text-secondary-2"
          />
          <div className="text-sm text-gray-500 dark:text-gray-400">Solo archivos JPG o PNG</div>
        </div>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <Controller
          name="first_names"
          control={control}
          rules={{ required: true }}
          render={({ field, formState }) => (
            <Input
              {...field}
              isInvalid={!!formState.errors.first_names?.message}
              errorMessage={formState.errors.first_names?.message?.toString()}
              autoFocus
              radius="sm"
              type="text"
              isRequired
              label="Nombre(s)" />
          )}
        />
        <Controller
          name="last_names"
          control={control}
          rules={{ required: true }}
          render={({ field, formState }) => (
            <Input
              {...field}
              isInvalid={!!formState.errors.last_names?.message}
              errorMessage={formState.errors.last_names?.message?.toString()}
              radius="sm"
              type="text"
              isRequired
              label="Apellido(s)" />
          )}
        />
        <Controller
          name="dni"
          control={control}
          rules={{ required: true }}
          render={({ field, formState }) => (
            <Input
              {...field}
              isInvalid={!!formState.errors.dni?.message}
              errorMessage={formState.errors.dni?.message?.toString()}
              radius="sm"
              type="number"
              isRequired
              label="Cédula de identidad" />
          )}
        />

        <Controller
          name="gender"
          control={control}
          rules={{ required: true }}
          render={({ field, formState }) => (
            <Select
              value={field.value}
              onChange={field.onChange}
              isInvalid={!!formState.errors.gender?.message}
              errorMessage={formState.errors.gender?.message?.toString()}
              radius="sm"
              label="Género"
              isRequired
              defaultSelectedKeys={[field.value]}
              selectedKeys={[field.value]}
            >
              {[
                { label: 'Masculino', value: 'M' },
                { label: 'Femenino', value: 'F' },
              ].map((chatLevel) => (
                <SelectItem key={chatLevel.value} value={chatLevel.value}>
                  {chatLevel.label}
                </SelectItem>
              ))}
            </Select>
          )}
        />

        <Controller
          name="birthdate"
          control={control}
          rules={{ required: true }}
          render={({ field, formState }) => (
            <Input
              {...field}
              isInvalid={!!formState.errors.birthdate?.message}
              errorMessage={formState.errors.birthdate?.message?.toString()}
              radius="sm"
              type="date"
              isRequired
              placeholder="YYY/MM/DD"
              label="Fecha de nacimiento" />
          )}
        />
        <Controller
          name="state"
          control={control}
          rules={{ required: true }}
          render={({ field, formState }) => (
            <Select
              value={field.value}
              onChange={field.onChange}
              isInvalid={!!formState.errors.state?.message}
              errorMessage={formState.errors.state?.message?.toString()}
              radius="sm"
              label="Estado de procedencia"
              isRequired
              defaultSelectedKeys={[field.value]}
              selectedKeys={[field.value]}
            >
              {[
                { label: 'Masculino', value: 'M' },
                { label: 'Femenino', value: 'F' },
              ].map((chatLevel) => (
                <SelectItem key={chatLevel.value} value={chatLevel.value}>
                  {chatLevel.label}
                </SelectItem>
              ))}
            </Select>
          )}
        />

        <Controller
          name="address"
          control={control}
          rules={{ required: true }}
          render={({ field, formState }) => (
            <Input
              {...field}
              isInvalid={!!formState.errors.address?.message}
              errorMessage={formState.errors.address?.message?.toString()}
              radius="sm"
              type="text"
              isRequired
              classNames={{ base: 'col-span-1 md:col-span-2' }}

              label="Dirección de residencia actual" />
          )}
        />
        <StepButton step="contacto" />
      </div>

    </form>
  );
};

export default PersonalInformation;
