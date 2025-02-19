'use client';
import InputField from '@/components/fields/InputFormField';
import SelectFormField from '@/components/fields/SelectFormField';
import {
  MODALITY,
  STUDY_AREAS,
  UNIVERSITIES_FOR_DISPLAY_IN_INPUT,
  UNIVERSITIES_FOR_INPUT,
} from '@/lib/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import AutocompleteFormField from '@/components/fields/AutocompleteFormField';
import { formatDateToMatchInput } from '@/lib/dates';
import { createOrUpdateCollageInfo } from '@/lib/db/utils/applicant';
import { Button, Link } from "@heroui/react";
import { CollageInfo, Prisma } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import collageSchema from './CollageInfoSchema';
import { ACADEMIC_PERIODS_KIND, getAcademicPeriodBasedOnStudyRegime } from './utils';

const getValueBetweenParentheses = (str: string): string => {
  const match = str.match(/\(([^)]+)\)/);
  return match ? match[1] : str;
};

type CollageFormSchemaType = z.infer<typeof collageSchema>;

const CollageForm = ({
  applicantId,
  applicantCollageInfo,
}: {
  applicantId: string;
  applicantCollageInfo?: CollageInfo;
}) => {
  const router = useRouter();
  const methods = useForm<CollageFormSchemaType>({
    resolver: zodResolver(collageSchema),
    defaultValues: {
      ...applicantCollageInfo,
      scholarshipPercentage: applicantCollageInfo?.scholarshipPercentage ?? undefined,
      collageStartDate: formatDateToMatchInput(applicantCollageInfo?.collageStartDate),
      haveScholarship: applicantCollageInfo?.haveScholarship ? 'YES' : 'NO',
      collage:
        UNIVERSITIES_FOR_DISPLAY_IN_INPUT.find((u) => u.initials === applicantCollageInfo?.collage)
          ?.name ?? undefined,
    },
    mode: 'onSubmit',
  });

  const { handleSubmit, formState } = methods;

  const studyRegime = useWatch({
    control: methods.control,
    name: 'studyRegime',
  });
  const haveScholarshipWatch = useWatch({
    control: methods.control,
    name: 'haveScholarship',
  });
  const haveScholarship = haveScholarshipWatch === 'YES';

  useEffect(() => {
    if (!haveScholarship) {
      //@ts-ignore
      methods.setValue('scholarshipPercentage', '', { shouldDirty: false });
    }
  }, [haveScholarship]);

  const academicPeriods = getAcademicPeriodBasedOnStudyRegime(studyRegime);

  const onSubmit = async (data: CollageFormSchemaType) => {
    const dataToSubmit: Prisma.CollageInfoUpdateInput = {
      ...data,
      collage: getValueBetweenParentheses(data.collage),
      haveScholarship: data.haveScholarship === 'YES',
    };
    if (data.haveScholarship === 'NO') dataToSubmit.scholarshipPercentage = null;
    await createOrUpdateCollageInfo(applicantId, dataToSubmit);
    router.push('/captacion/postulacion/adicional');
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <SelectFormField
            isRequired
            label="Tipo de universidad"
            name="kindOfCollage"
            selectItems={[
              { label: 'Pública', value: 'PUBLIC' },
              { label: 'Privada', value: 'PRIVATE' },
            ]}
          />
          <AutocompleteFormField
            isRequired
            label="Universidad"
            name="collage"
            selectItems={UNIVERSITIES_FOR_INPUT}
          />
          <SelectFormField
            isRequired
            label="Área de estudio"
            name="studyArea"
            selectItems={STUDY_AREAS}
          />
          <InputField isRequired label="Carrera" type="text" name="career" />
          <InputField
            isRequired
            type="date"
            label="Fecha de inicio de estudios universitarios"
            name="collageStartDate"
          />
          <SelectFormField
            isRequired
            label="Régimen de estudio"
            name="studyRegime"
            selectItems={ACADEMIC_PERIODS_KIND}
          />
          <SelectFormField
            isRequired
            label="Período académico (en curso)"
            name="currentAcademicPeriod"
            selectItems={academicPeriods}
          />
          <InputField
            isRequired
            type="number"
            label="Promedio del último período académico culminado"
            name="grade"
          />
          <SelectFormField
            isRequired
            label="Modalidad de clases"
            name="classModality"
            selectItems={MODALITY}
          />
          <>
            <SelectFormField
              isRequired
              label="¿Posee beca?"
              name="haveScholarship"
              selectItems={[
                {
                  label: 'Sí',
                  value: 'YES',
                },
                {
                  label: 'No',
                  value: 'NO',
                },
              ]}
            />
            <InputField
              isRequired={haveScholarship}
              isDisabled={!haveScholarship}
              type="number"
              label="Porcentaje de la beca"
              name="scholarshipPercentage"
            />
          </>
        </div>
        <div className="col-span-2 flex gap-4">
          <Button
            radius="sm"
            as={Link}
            href="/captacion/postulacion/secundaria"
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

export default CollageForm;
