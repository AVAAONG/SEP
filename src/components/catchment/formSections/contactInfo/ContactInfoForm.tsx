'use client';
import InputField from '@/components/fields/InputFormField';
import { createOrUpdateContactInfo } from '@/lib/db/utils/applicant';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Link } from '@nextui-org/react';
import { ContactInfo } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import contactInfoFormSchema from './contactInfoSchema';

type CollageFormSchemaType = z.infer<typeof contactInfoFormSchema>;

const ContactInfoForm = ({
  applicantId,
  applicantContactInfo,
}: {
  applicantId: string;
  applicantContactInfo: ContactInfo | undefined;
}) => {
  const router = useRouter();
  const { update, data: session } = useSession();

  const methods = useForm<CollageFormSchemaType>({
    resolver: zodResolver(contactInfoFormSchema),
    mode: 'onBlur',
    defaultValues: applicantContactInfo,
  });

  useEffect(() => {
    if (!applicantContactInfo && session) {
      methods.setValue('email', session.email);
    }
  }, [session]);

  const { handleSubmit, formState } = methods;

  const onSubmit = async (data: CollageFormSchemaType) => {
    await createOrUpdateContactInfo(applicantId, data);
    update();
    await revalidateSpecificPath(`/captacion/postulacion/`);
    router.push('/captacion/postulacion/familia');
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            isRequired
            label="Número de teléfono local"
            type="number"
            name="localPhoneNumber"
          />
          <InputField
            isRequired
            label="Número telefónico asociado a WhatsApp"
            type="number"
            name="whatsAppPhoneNumber"
          />
          <InputField isRequired label="Correo electrónico" type="email" name="email" />
          <InputField
            type="text"
            name="parentalPhoneNumber"
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
        </div>

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
          <Button isLoading={formState.isSubmitting} radius="sm" type="submit" className="w-full">
            Siguiente
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ContactInfoForm;
