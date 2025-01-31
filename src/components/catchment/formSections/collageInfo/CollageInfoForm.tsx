'use client';
import InputField from '@/components/fields/InputFormField';
import SelectFormField from '@/components/fields/SelectFormField';
import { COLLAGE_LONG_AND_SHORT, MODALITY, STUDY_AREAS } from '@/lib/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import scholarCollageInformationSchema from '@/lib/schemas/scholar/collageInformationSchema';
import { Button, Link } from '@nextui-org/react';
import { ACADEMIC_PERIODS_KIND, getAcademicPeriodBasedOnStudyRegime } from './utils';

type CollageFormSchemaType = z.infer<typeof scholarCollageInformationSchema>;

const CollageForm = () => {
  const methods = useForm<CollageFormSchemaType>({
    resolver: zodResolver(scholarCollageInformationSchema),
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

  const studyRegime = useWatch({
    control: methods.control,
    name: 'study_regime',
  });
  const haveScholarship = useWatch({
    control: methods.control,
    name: 'have_schooolarship',
  });
  const kindOfCollage = useWatch({
    control: methods.control,
    name: 'kind_of_collage',
  });

  const academicPeriods = getAcademicPeriodBasedOnStudyRegime(studyRegime);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <SelectFormField
            isRequired
            label="Tipo de universidad"
            name="kind_of_collage"
            selectItems={[
              { label: 'Pública', value: 'PUBLIC' },
              { label: 'Privada', value: 'PRIVATE' },
            ]}
          />
          <SelectFormField
            isRequired
            label="Universidad"
            name="collage"
            selectItems={COLLAGE_LONG_AND_SHORT}
          />
          <SelectFormField
            isRequired
            label="Área de estudio"
            name="study_area"
            selectItems={STUDY_AREAS}
          />
          <InputField
            isRequired
            label="Carrera"
            type="text"
            name="career"
            placeholder="Estudios internacionales"
          />
          <InputField
            isRequired
            type="date"
            label="Fecha de inicio de estudios universitarios"
            name="collage_start_date"
          />
          <SelectFormField
            isRequired
            label="Régimen de estudio"
            name="study_regime"
            selectItems={ACADEMIC_PERIODS_KIND}
          />
          <SelectFormField
            isDisabled={academicPeriods.length === 0}
            isRequired={academicPeriods.length >= 1}
            label="Período académico (en curso)"
            name="current_academic_period"
            selectItems={academicPeriods}
          />
          <InputField
            isRequired
            type="number"
            label="Promedio del último período académico culminado"
            name="grade"
            min={1}
            max={20}
          />
          <SelectFormField
            isRequired
            label="Modalidad de clases"
            name="class_modality"
            selectItems={MODALITY}
          />
          {kindOfCollage === 'PRIVATE' && (
            <>
              <SelectFormField
                isRequired
                label="¿Posee beca?"
                name="have_schooolarship"
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
              {haveScholarship === 'YES' && (
                <InputField
                  isRequired
                  type="number"
                  label="Porcentaje de la beca"
                  name="scholarship_percentage"
                />
              )}
            </>
          )}
        </div>
        <div className="col-span-2 flex gap-4">
          <Button
            radius="sm"
            as={Link}
            href="/captacion/secundaria"
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

export default CollageForm;
