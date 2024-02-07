'use client';
import { updateScholar } from '@/lib/db/utils/users';
import scholarInfoSchema from '@/lib/schemas/scholar/scholarGeneralInformationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@nextui-org/react';
import { Scholar } from '@prisma/client';
import { BaseSyntheticEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

interface CollageInformationProps {
  scholar: Scholar;
  title: string;
}

const CollageInformation: React.FC<CollageInformationProps> = ({ scholar }) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid },
  } = useForm<z.infer<typeof scholarInfoSchema>>({
    resolver: zodResolver(scholarInfoSchema),
    defaultValues: {
      ...scholar,
    },
  });

  const saveData = async (
    data: z.infer<typeof scholarInfoSchema>,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    event?.preventDefault();
    data.birthdate = new Date(data.birthdate).toISOString();
    await updateScholar(scholar.id, data);
  };
  const onInvalid = (errors) => console.error(errors);

  return (
    <>
      <h3 className="text-green-900 mb-4 text-xl font-semibold dark:text-white">
        Información universitaria
      </h3>
      <form
        onSubmit={handleSubmit(
          async (data, event) =>
            toast.promise(saveData(data, event), {
              pending: 'Guardando cambios...',
              success: 'Cambios guardados',
              error: 'Error al guardar cambios',
            }),
          onInvalid
        )}
      >
        <div className="grid grid-cols-6 gap-6">
          <Controller
            name="state"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              return (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['state']?.message}
                  errorMessage={formState.errors?.['state']?.message?.toString()}
                  isRequired
                  type="text"
                  label="Estado de origen"
                  radius="sm"
                  classNames={{ base: 'col-span-3 h-fit' }}
                  labelPlacement="outside"
                />
              );
            }}
          />
        </div>
      </form>
    </>
  );
};

export default CollageInformation;
