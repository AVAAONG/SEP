'use client';
import GENERAL_INFORMATION_INPUT_DATA from '@/components/scholar/forms/data/generalInformationFormData';
import { updateScholar } from '@/lib/db/utils/users';
import scholarInfoSchema from '@/lib/schemas/scholar/scholarGeneralInformationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { Scholar } from '@prisma/client';
import moment from 'moment';
import { BaseSyntheticEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

interface GeneralInformationProps {
  scholar: Scholar;
  title: string;
}

const GeneralInformation: React.FC<GeneralInformationProps> = ({ scholar, title }) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid },
  } = useForm<z.infer<typeof scholarInfoSchema>>({
    resolver: zodResolver(scholarInfoSchema),
    defaultValues: {
      ...scholar,
      birthdate: moment(scholar.birthdate).format('YYYY-MM-DD'),
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
      <h3 className="text-green-900 mb-4 text-xl font-semibold dark:text-white">{title}</h3>
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
          {GENERAL_INFORMATION_INPUT_DATA.map((input) => {
            const { label, id, type } = input;
            return (
              <Controller
                name={id}
                key={id}
                control={control}
                rules={{ required: true }}
                render={({ field, formState }) => {
                  return (
                    <Input
                      value={field.value}
                      onChange={field.onChange}
                      isInvalid={!!formState.errors?.[id]?.message}
                      errorMessage={formState.errors?.[id]?.message?.toString()}
                      isRequired
                      type={type}
                      label={label}
                      radius="sm"
                      classNames={{ base: 'col-span-2 h-fit' }}
                      labelPlacement="outside"
                    />
                  );
                }}
              />
            );
          })}
          <Controller
            name="gender"
            control={control}
            rules={{ required: true }}
            shouldUnregister={true}
            render={({ field, formState }) => {
              return (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['gender']?.message}
                  errorMessage={formState.errors?.['gender']?.message?.toString()}
                  classNames={{ base: 'col-span-2 h-fit' }}
                  radius="sm"
                  label="Género"
                  labelPlacement="outside"
                  defaultSelectedKeys={[field.value]}
                >
                  {[
                    { value: 'M', label: 'Masculino' },
                    { value: 'F', label: 'Femenino' },
                    {
                      value: 'O',
                      label: 'Empresa u Organización',
                    },
                  ].map((modality) => (
                    <SelectItem key={modality.value} value={modality.value}>
                      {modality.label}
                    </SelectItem>
                  ))}
                </Select>
              );
            }}
          />
          <Button
            type="submit"
            className="text-white bg-green-600 hover:bg-green-500 hover:text-green-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            isDisabled={isSubmitting}
          >
            Guardar cambios
          </Button>
        </div>
      </form>
    </>
  );
};

export default GeneralInformation;
