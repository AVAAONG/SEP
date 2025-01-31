'use client';
import InputField from '@/components/fields/InputFormField';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Link } from '@nextui-org/react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import contactInfoFormSchema from './contactInfoSchema';

type CollageFormSchemaType = z.infer<typeof contactInfoFormSchema>;

const ContactInfoForm = () => {
  const methods = useForm<CollageFormSchemaType>({
    resolver: zodResolver(contactInfoFormSchema),
    mode: 'all',
  });
  const onSubmit = (data: CollageFormSchemaType) => {
    console.log(data);
    methods.reset(
      {},
      {
        keepErrors: false,
      }
    );
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <InputField
            isRequired
            label="Número de teléfono local"
            type="number"
            name="local_phone_number"
          />
          <InputField
            isRequired
            label="Número telefónico asociado a WhatsApp"
            type="number"
            name="whatsapp_number"
          />
          <InputField isRequired label="Correo electrónico" type="email" name="email" />
          <InputField
            type="text"
            name="parent_phone_number"
            isRequired
            label="Teléfono de un familiar/pariente/amigo cercano"
            description="En el caso de que no podamos contactarte, ¿con quién podemos comunicarnos?"
          />
          <InputField
            name="parental"
            type="text"
            isRequired
            label="Nombre del familiar/pariente/amigo cercano"
            description="Especifique el nombre del familiar/pariente/amigo cercano y la relación con usted"
          />

          <div className="col-span-2 flex gap-4 mt-6">
            <Button
              radius="sm"
              as={Link}
              href="/captacion/postulacion"
              className="w-full"
              variant="bordered"
            >
              Anterior
            </Button>
            <Button radius="sm" type="submit" className="w-full">
              Siguiente
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default ContactInfoForm;
