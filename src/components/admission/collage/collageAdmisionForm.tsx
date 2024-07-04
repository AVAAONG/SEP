'use client';
import InputField from '@/components/fields/InputFormField';
import SelectFormField from '@/components/fields/SelectFormField';
import { COLLAGE_LONG_AND_SHORT, MODALITY, STUDY_AREAS } from '@/lib/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import collageFormSchema from './schema';

type CollageFormSchemaType = z.infer<typeof collageFormSchema>;

const Semesters = [
  {
    value: '1',
    label: '1er semestre',
  },
  {
    value: '2',
    label: '2do semestre',
  },
  {
    value: '3',
    label: '3er semestre',
  },
];

const Trimestre = [
  {
    value: '1',
    label: '1er trimestre',
  },
  {
    value: '2',
    label: '2do trimestre',
  },
  {
    value: '3',
    label: '3er trimestre',
  },
  {
    value: '4',
    label: '4to trimestre',
  },
];
const anos = [
  {
    value: '1',
    label: '1er año',
  },
  {
    value: '2',
    label: '2do año',
  },
  {
    value: '3+',
    label: '3er año o más',
  },
];

const cuatrimestre = [
  {
    value: '1',
    label: '1er año',
  },
  {
    value: '2',
    label: '2do año',
  },
  {
    value: '3',
    label: '3er año o mas',
  },
];
const ACADEMIC_PERIODS_KIND = [
  {
    label: 'Semestral',
    value: 'SEMESTRAL',
  },
  {
    label: 'Trimestral',
    value: 'TRIMESTRAL',
  },
  {
    label: 'Cuatrimestral',
    value: 'CUATRIMESTRAL',
  },
  {
    label: 'Anual',
    value: 'ANUAL',
  },
];

const CollageForm = () => {
  const methods = useForm<CollageFormSchemaType>({
    resolver: zodResolver(collageFormSchema),
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
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 "
      >
        <SelectFormField
          label="Tipo de universidad"
          name="kind_of_collage"
          selectItems={[
            { label: 'Pública', value: 'PUBLIC' },
            { label: 'Privada', value: 'PRIVATE' },
          ]}
        />
        <SelectFormField label="Universidad" name="collage" selectItems={COLLAGE_LONG_AND_SHORT} />
        <InputField label="Carrera" type="text" name="career" />
        <SelectFormField label="Universidad" name="collage" selectItems={STUDY_AREAS} />
        <InputField
          isRequired
          type="date"
          label="Fecha de inicio de estudios universitarios"
          name="career"
        />
        <SelectFormField
          label="Régimen de Estudio"
          name="collage"
          selectItems={ACADEMIC_PERIODS_KIND}
        />
        <SelectFormField
          label="Período académico (en curso)"
          name="collage"
          selectItems={ACADEMIC_PERIODS_KIND}
        />
        <InputField
          isRequired
          type="number"
          label="Promedio del último período académico culminado"
          name="career"
        />
        <SelectFormField label="Modalidad de clases" name="collage" selectItems={MODALITY} />
        <SelectFormField
          label="¿Posee beca?"
          name="collage"
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
        <InputField isRequired type="number" label="Porcentaje de la beca" name="career" />
      </form>
    </FormProvider>
  );
};

export default CollageForm;
