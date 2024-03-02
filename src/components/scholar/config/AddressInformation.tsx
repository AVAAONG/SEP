'use client';
import { ScholarWithCollageAndJob, updateScholar } from '@/lib/db/utils/users';
import scholarAddressInformationSchema from '@/lib/schemas/scholar/scholarAddressInformationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { BaseSyntheticEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
interface AddressInformationProps {
  scholar: ScholarWithCollageAndJob;
}

const AddressInformation: React.FC<AddressInformationProps> = ({ scholar }) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid },
  } = useForm<z.infer<typeof scholarAddressInformationSchema>>({
    resolver: zodResolver(scholarAddressInformationSchema),
    defaultValues: {
      state: scholar?.state || undefined,
      address: scholar?.address || undefined,
    },
  });

  const saveData = async (
    data: z.infer<typeof scholarAddressInformationSchema>,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    event?.preventDefault();
    if (!scholar?.id) return;
    await updateScholar(scholar.id, data);
  };

  return (
    <>
      <h3 className="text-green-900 mb-4 text-xl font-semibold dark:text-white">Dirección</h3>
      <form
        onSubmit={handleSubmit(async (data, event) =>
          toast.promise(saveData(data, event), {
            pending: 'Guardando cambios...',
            success: 'Cambios guardados',
            error: 'Error al guardar cambios',
          })
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
                  classNames={{ base: 'col-span-6 lg:col-span-3 h-fit' }}
                  labelPlacement="outside"
                />
              );
            }}
          />
          <Controller
            name="address"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              return (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['address']?.message}
                  errorMessage={formState.errors?.['address']?.message?.toString()}
                  isRequired
                  type="text"
                  label="Direccion de residencia actual"
                  radius="sm"
                  classNames={{ base: 'col-span-6 lg:col-span-3 h-fit' }}
                  labelPlacement="outside"
                />
              );
            }}
          />

          <Button
            type="submit"
            className="col-span-6 md:col-span-1 text-white bg-green-600 hover:bg-green-500 hover:text-green-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            isDisabled={isSubmitting}
          >
            Guardar cambios
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddressInformation;
