'use client';
import InputField from '@/components/fields/InputFormField';
import SelectFormField from '@/components/fields/SelectFormField';
import TextAreaFormField from '@/components/fields/TextAreaFormField';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Link } from '@nextui-org/react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import additionalInfoFormSchema from './AdditionalInfoSchema';

type AdditionalInfoFormSchemaType = z.infer<typeof additionalInfoFormSchema>;

const AdditionalInfoForm = () => {
  const methods = useForm<AdditionalInfoFormSchemaType>({
    resolver: zodResolver(additionalInfoFormSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: AdditionalInfoFormSchemaType) => {
    console.log(data);
    methods.reset(
      {},
      {
        keepErrors: false,
      }
    );
  };

  const hasInternetConnection = useWatch({
    control: methods.control,
    name: 'has_internet_connection',
  });

  const referredByScholar = useWatch({
    control: methods.control,
    name: 'is_referred_by_scholar',
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <SelectFormField
            isRequired
            label="¿Posee conexión a internet?"
            name="has_internet_connection"
            selectItems={[
              { label: 'Si', value: 'YES' },
              { label: 'No', value: 'NO' },
            ]}
          />
          <SelectFormField
            isDisabled={!hasInternetConnection}
            isRequired={hasInternetConnection}
            label="¿Qué tan estable es tu conectividad? "
            name="internet_connection_stability"
            selectItems={[
              {
                label: 'Muy estable',
                value: 'VERY_STABLE',
              },
              {
                label: 'Estable',
                value: 'STABLE',
              },
              {
                label: 'Inestable',
                value: 'UNSTABLE',
              },
              {
                label: 'Muy inestable',
                value: 'VERY_UNSTABLE',
              },
            ]}
          />
          <SelectFormField
            isRequired
            label="¿Cómo se enteró del Programa Excelencia?"
            name="program_discovery_source"
            selectItems={[
              {
                label: 'Amigo/Pariente',
                value: 'FRIEND_RELATIVE',
              },
              {
                label: 'Medios de comunicación',
                value: 'MEDIA',
              },
              {
                label: 'Sitio web de AVAA',
                value: 'AVAA_WEBSITE',
              },
              {
                label: 'Instagram',
                value: 'INSTAGRAM',
              },
              {
                label: 'LinkedIn',
                value: 'LINKEDIN',
              },
              {
                label: 'X (antes Twitter)',
                value: 'TWITTER',
              },
              {
                label: 'Youtube',
                value: 'YOUTUBE',
              },
              {
                label: 'Búsqueda en Internet',
                value: 'INTERNET_SEARCH',
              },
            ]}
          />
          <SelectFormField
            isRequired
            label="¿Eres referido por algún becario de AVAA?"
            name="is_referred_by_scholar"
            selectItems={[
              { label: 'Si', value: 'YES' },
              { label: 'No', value: 'NO' },
            ]}
          />

          {referredByScholar && (
            <InputField
              isRequired={referredByScholar}
              isDisabled={!referredByScholar}
              type="text"
              label="Nombre del Becario por quien vienes referido"
              name="referring_scholar_Name"
            />
          )}

          <TextAreaFormField
            className="col-span-2"
            isRequired
            isResazable
            label="¿Por qué solicita esta beca?"
            name="scholarship_application_reason"
          />
        </div>
        <div className="col-span-2 flex gap-4">
          <Button
            radius="sm"
            as={Link}
            href="/captacion/collage"
            className="w-full"
            variant="bordered"
          >
            Anterior
          </Button>
          <Button radius="sm" type="submit" className="w-full">
            Siguiente
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default AdditionalInfoForm;
