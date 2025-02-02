'use client';
import InputField from '@/components/fields/InputFormField';
import SelectFormField from '@/components/fields/SelectFormField';
import TextAreaFormField from '@/components/fields/TextAreaFormField';
import { createOrUpdateAdditionalInfo } from '@/lib/db/utils/applicant';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Link } from '@nextui-org/react';
import {
  AdditionalInfo,
  InternetConnectionStability,
  Prisma,
  ProgramDiscoverySource,
} from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import additionalInfoFormSchema from './AdditionalInfoSchema';

type AdditionalInfoFormSchemaType = z.infer<typeof additionalInfoFormSchema>;

const AdditionalInfoForm = ({
  applicantId,
  applicantAdditionalInfo,
}: {
  applicantId: string;
  applicantAdditionalInfo?: AdditionalInfo;
}) => {
  const router = useRouter();

  const methods = useForm<AdditionalInfoFormSchemaType>({
    resolver: zodResolver(additionalInfoFormSchema),
    defaultValues: {
      ...applicantAdditionalInfo,
      hasInternetConnection: applicantAdditionalInfo?.hasInternetConnection === true ? 'YES' : 'NO',
      isReferredByScholar: applicantAdditionalInfo?.isReferredByScholar === true ? 'YES' : 'NO',
    },
    mode: 'onSubmit',
  });

  const { handleSubmit, formState } = methods;

  const hasInternetConnectionWatch = useWatch({
    control: methods.control,
    name: 'hasInternetConnection',
  });

  const referredByScholarWatch = useWatch({
    control: methods.control,
    name: 'isReferredByScholar',
  });

  useEffect(() => {
    if (hasInternetConnectionWatch === 'NO') methods.setValue('internetConnectionStability', null);
    if (referredByScholarWatch === 'NO') methods.setValue('referredScholarName', '');
  }, [hasInternetConnectionWatch, referredByScholarWatch]);

  const referredByScholar = referredByScholarWatch === 'YES';
  const hasInternetConnection = hasInternetConnectionWatch === 'YES';

  const onSubmit = async (data: AdditionalInfoFormSchemaType) => {
    const dataToSubmit: Prisma.AdditionalInfoUpdateInput = {
      ...data,
      programDiscoverySource: data.programDiscoverySource as ProgramDiscoverySource,
      internetConnectionStability: data.internetConnectionStability as InternetConnectionStability,
      hasInternetConnection: data.hasInternetConnection === 'YES',
      isReferredByScholar: data.isReferredByScholar === 'YES',
    };
    if (data.isReferredByScholar === 'NO') dataToSubmit.referredScholarName = null;
    if (data.hasInternetConnection === 'NO') dataToSubmit.internetConnectionStability = null;

    await createOrUpdateAdditionalInfo(applicantId, dataToSubmit);
    router.push(`/captacion/postulacion/anexos`);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <SelectFormField
            isRequired
            label="¿Posee conexión a internet?"
            name="hasInternetConnection"
            selectItems={[
              { label: 'Si', value: 'YES' },
              { label: 'No', value: 'NO' },
            ]}
          />
          <SelectFormField
            isDisabled={!hasInternetConnection}
            isRequired={hasInternetConnection}
            label="¿Qué tan estable es tu conectividad? "
            name="internetConnectionStability"
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
            label="¿Eres referido por algún becario de AVAA?"
            name="isReferredByScholar"
            selectItems={[
              { label: 'Si', value: 'YES' },
              { label: 'No', value: 'NO' },
            ]}
          />
          <InputField
            isRequired={referredByScholar}
            isDisabled={!referredByScholar}
            type="text"
            label="Nombre del Becario por quien vienes referido"
            name="referredScholarName"
          />
          <SelectFormField
            isRequired
            label="¿Cómo se enteró del Programa Excelencia?"
            name="programDiscoverySource"
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
                label: 'YouTube',
                value: 'YOUTUBE',
              },
              {
                label: 'Búsqueda en Internet',
                value: 'INTERNET_SEARCH',
              },
            ]}
          />
          <TextAreaFormField
            isRequired
            className="col-span-2"
            isResizable
            label="¿Por qué solicita esta beca?"
            name="scholarshipApplicationReason"
          />
        </div>
        <div className="col-span-2 flex gap-4">
          <Button
            radius="sm"
            as={Link}
            href="/captacion/postulacion/universidad"
            className="w-full"
            variant="bordered"
          >
            Anterior
          </Button>
          <Button radius="sm" type="submit" className="w-full" isLoading={formState.isSubmitting}>
            Siguiente
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default AdditionalInfoForm;
