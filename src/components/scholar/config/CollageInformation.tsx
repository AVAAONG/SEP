'use client';
import scholarCollageInformationSchema from '@/lib/schemas/scholar/collageInformationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { ScholarCollageInformation } from '@prisma/client';
import { BaseSyntheticEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

interface CollageInformationProps {
  scholarCollage: ScholarCollageInformation;
}
const universities = [
  { value: 'UCAB', label: 'Universidad Católica Andrés Bello (UCAB)' },
  { value: 'USB', label: 'Universidad Simón Bolívar (USB)' },
  { value: 'UCV', label: 'Universidad Central de Venezuela (UCV)' },
  { value: 'UNIMET', label: 'Universidad Metropolitana (UNIMET)' },
  { value: 'UNEXCA', label: 'Universidad Experimental de Caracas (UNEXCA)' },
  { value: 'ENAHP', label: 'Escuela Nacional de Administración y Hacienda Pública (ENAHP)' },
  { value: 'UNEARTE', label: 'Universidad Nacional Experimental de las Artes (UNEARTE)' },
  { value: 'UNESR', label: 'Universidad Nacional Experimental Simón Rodríguez (UNESR)' },
  { value: 'UCSAR', label: 'Universidad Católica Santa Rosa (UCSAR)' },
  { value: 'IUPSM', label: 'Instituto Universitario Politécnico Santiago Mariño (IUPSM)' },
  {
    value: 'UNEXPO',
    label: 'Universidad Nacional Experimental Politécnica Antonio José de Sucre (UNEXPO)',
  },
  { value: 'UMA', label: 'Universidad Monteávila (UMA)' },
  { value: 'UJMV', label: 'Universidad José María Vargas (UJMV)' },
  { value: 'UMC', label: 'Universidad Metropolitana de Caracas (UMC)' },
  { value: 'UPEL', label: 'Universidad Pedagógica Experimental Libertador (UPEL)' },
  { value: 'CUR', label: 'Colegio Universitario de Rehabilitación May Hamilton (CUR)' },
  { value: 'USM', label: 'Universidad Santa María (USM)' },
  {
    value: 'UNEFA',
    label: 'Universidad Nacional Experimental de la Fuerza Armada Nacional Bolivariana (UNEFA)',
  },
  { value: 'UAH', label: 'Universidad Alejandro de Humboldt (UAH)' },
  { value: 'UBV', label: 'Universidad Bolivariana de Venezuela (UBV)' },
];

const studyAreas = [
  { value: 'ARCHITECTURE_URBANISM', label: 'Arquitectura y Urbanismo' },
  { value: 'HEALTH_SCIENCES', label: 'Ciencias de la Salud' },
  { value: 'JURIDICAL_POLITICAL_SCIENCES', label: 'Jurídico-Políticas' },
  { value: 'SOCIAL_SCIENCES', label: 'Ciencias Sociales' },
  { value: 'HUMANITIES_EDUCATION', label: 'Humanidades y Educación' },
  { value: 'STEM', label: 'STEM (Ciencias, Tecnología, Ingenierías, Matemáticas)' },
  { value: 'OTHER', label: 'Other' },
];
const evaluationScales = [
  { value: 'CERO_TO_TEN', label: '0 al 10' },
  { value: 'CERO_TO_FIVE', label: '0 al 5' },
  { value: 'CERO_TO_TWENTY', label: '0 al 20' },
];
const CollageInformation: React.FC<CollageInformationProps> = ({ scholarCollage }) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid },
  } = useForm<z.infer<typeof scholarCollageInformationSchema>>({
    resolver: zodResolver(scholarCollageInformationSchema),
    defaultValues: {
      ...scholarCollage,
    },
  });
  console.log(scholarCollage);

  const saveData = async (
    data: z.infer<typeof scholarCollageInformationSchema>,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    event?.preventDefault();
    console.log(data);
    // await updateScholarCollageInformation(scholar.id, data);
  };

  return (
    <>
      <h3 className="text-green-900 mb-4 text-xl font-semibold dark:text-white">
        Información universitaria
      </h3>
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
            name="collage_start_date"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              return (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['collage_start_date']?.message}
                  errorMessage={formState.errors?.['collage_start_date']?.message?.toString()}
                  isRequired
                  type="date"
                  label="Fecha de inicio de universidad"
                  radius="sm"
                  classNames={{ base: 'col-span-6 lg:col-span-2 h-fit' }}
                  labelPlacement="outside"
                />
              );
            }}
          />
          <Controller
            name="kind_of_collage"
            control={control}
            rules={{ required: true }}
            shouldUnregister={true}
            render={({ field, formState }) => {
              return (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['kind_of_collage']?.message}
                  errorMessage={formState.errors?.['kind_of_collage']?.message?.toString()}
                  classNames={{ base: 'col-span-6 lg:col-span-2 h-fit' }}
                  radius="sm"
                  label="Tipo de universidad"
                  labelPlacement="outside"
                  defaultSelectedKeys={[field.value]}
                >
                  {[
                    { value: 'PUBLIC', label: 'Publica' },
                    { value: 'PRIVATE', label: 'Privada' },
                  ].map((modality) => (
                    <SelectItem key={modality.value} value={modality.value}>
                      {modality.label}
                    </SelectItem>
                  ))}
                </Select>
              );
            }}
          />
          <Controller
            name="collage"
            control={control}
            rules={{ required: true }}
            shouldUnregister={true}
            render={({ field, formState }) => {
              return (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['collage']?.message}
                  errorMessage={formState.errors?.['collage']?.message?.toString()}
                  classNames={{ base: 'col-span-6 lg:col-span-2 h-fit' }}
                  radius="sm"
                  label="Universidad"
                  labelPlacement="outside"
                  defaultSelectedKeys={[field.value]}
                >
                  {universities.map((modality) => (
                    <SelectItem key={modality.value} value={modality.value}>
                      {modality.label}
                    </SelectItem>
                  ))}
                </Select>
              );
            }}
          />
          <Controller
            name="career"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              return (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['career']?.message}
                  errorMessage={formState.errors?.['career']?.message?.toString()}
                  isRequired
                  type="text"
                  label="Carrera"
                  radius="sm"
                  classNames={{ base: 'col-span-6 lg:col-span-2 h-fit' }}
                  labelPlacement="outside"
                />
              );
            }}
          />
          <Controller
            name="mention"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              return (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['mention']?.message}
                  errorMessage={formState.errors?.['mention']?.message?.toString()}
                  type="text"
                  label="Mención"
                  radius="sm"
                  classNames={{ base: 'col-span-6 lg:col-span-2 h-fit' }}
                  labelPlacement="outside"
                />
              );
            }}
          />
          <Controller
            name="study_area"
            control={control}
            rules={{ required: true }}
            shouldUnregister={true}
            render={({ field, formState }) => {
              return (
                <Select
                  isRequired
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['study_area']?.message}
                  errorMessage={formState.errors?.['study_area']?.message?.toString()}
                  classNames={{ base: 'col-span-6 lg:col-span-2 h-fit' }}
                  radius="sm"
                  label="Area de estudio"
                  labelPlacement="outside"
                  defaultSelectedKeys={[field.value]}
                >
                  {studyAreas.map((modality) => (
                    <SelectItem key={modality.value} value={modality.value}>
                      {modality.label}
                    </SelectItem>
                  ))}
                </Select>
              );
            }}
          />
          <Controller
            name="evaluation_scale"
            control={control}
            rules={{ required: true }}
            shouldUnregister={true}
            render={({ field, formState }) => {
              return (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['evaluation_scale']?.message}
                  errorMessage={formState.errors?.['evaluation_scale']?.message?.toString()}
                  classNames={{ base: 'col-span-6 lg:col-span-2 h-fit' }}
                  radius="sm"
                  label="Escala de evaluacion"
                  labelPlacement="outside"
                  defaultSelectedKeys={[field.value]}
                >
                  {evaluationScales.map((modality) => (
                    <SelectItem key={modality.value} value={modality.value}>
                      {modality.label}
                    </SelectItem>
                  ))}
                </Select>
              );
            }}
          />
          <Controller
            name="study_regime"
            control={control}
            rules={{ required: true }}
            shouldUnregister={true}
            render={({ field, formState }) => {
              return (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['study_regime']?.message}
                  errorMessage={formState.errors?.['study_regime']?.message?.toString()}
                  classNames={{ base: 'col-span-6 lg:col-span-2 h-fit' }}
                  radius="sm"
                  label="Regimen de estudio"
                  labelPlacement="outside"
                  defaultSelectedKeys={[field.value]}
                >
                  {[
                    {
                      label: 'Semestral',
                      value: 'SEMESTER',
                    },
                    {
                      label: 'Trimestral',
                      value: 'QUARTER',
                    },
                    {
                      label: 'Cuatrimestral',
                      value: 'QUARTIER',
                    },
                    {
                      label: 'Anual',
                      value: 'ANNUAL',
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
          <Controller
            name="have_schooolarship"
            control={control}
            rules={{ required: true }}
            shouldUnregister={true}
            render={({ field, formState }) => {
              return (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['have_schooolarship']?.message}
                  errorMessage={formState.errors?.['have_schooolarship']?.message?.toString()}
                  classNames={{ base: 'col-span-6 lg:col-span-2 h-fit' }}
                  radius="sm"
                  label="¿Posee beca?"
                  labelPlacement="outside"
                  defaultSelectedKeys={[field.value]}
                >
                  {[
                    {
                      label: 'Si',
                      value: true,
                    },
                    {
                      label: 'No',
                      value: false,
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
          <Controller
            name="scholarship_percentage"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              return (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['scholarship_percentage']?.message}
                  errorMessage={formState.errors?.['scholarship_percentage']?.message?.toString()}
                  type="number"
                  label="Porcentaje de beca"
                  radius="sm"
                  classNames={{ base: 'col-span-6 lg:col-span-2 h-fit' }}
                  labelPlacement="outside"
                />
              );
            }}
          />
          <Controller
            name="academic_load_completed"
            control={control}
            rules={{ required: true }}
            shouldUnregister={true}
            render={({ field, formState }) => {
              return (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['academic_load_completed']?.message}
                  errorMessage={formState.errors?.['academic_load_completed']?.message?.toString()}
                  classNames={{ base: 'col-span-6 lg:col-span-2 h-fit' }}
                  radius="sm"
                  label="¿Culminaste carga academica?"
                  labelPlacement="outside"
                  defaultSelectedKeys={[field.value]}
                >
                  {[
                    {
                      label: 'Si',
                      value: true,
                    },
                    {
                      label: 'No',
                      value: false,
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
          <Controller
            name="collage_end_date"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              return (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['collage_end_date']?.message}
                  errorMessage={formState.errors?.['collage_end_date']?.message?.toString()}
                  isRequired
                  type="date"
                  label="Fecha de culminación de estudios universitarios"
                  radius="sm"
                  classNames={{ base: 'col-span-6 lg:col-span-2 h-fit' }}
                  labelPlacement="outside"
                />
              );
            }}
          />
          <Controller
            name="collage_study_proof"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              return (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['collage_study_proof']?.message}
                  errorMessage={formState.errors?.['collage_study_proof']?.message?.toString()}
                  isRequired
                  type="file"
                  label="Constancia de inscripcion en universidad"
                  radius="sm"
                  classNames={{ base: 'col-span-6 lg:col-span-2 h-fit' }}
                  labelPlacement="outside"
                />
              );
            }}
          />
          <Controller
            name="career_schedule"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              return (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['career_schedule']?.message}
                  errorMessage={formState.errors?.['career_schedule']?.message?.toString()}
                  isRequired
                  type="file"
                  label="Horario de clases"
                  radius="sm"
                  classNames={{ base: 'col-span-6 lg:col-span-2 h-fit' }}
                  labelPlacement="outside"
                />
              );
            }}
          />
          <div className="col-span-2"></div>
          <Button
            type="submit"
            className="col-span-2 lg:col-span-1 text-white bg-green-600 hover:bg-green-500 hover:text-green-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            isDisabled={isSubmitting}
          >
            Guardar cambios
          </Button>
        </div>
      </form>
    </>
  );
};

export default CollageInformation;
