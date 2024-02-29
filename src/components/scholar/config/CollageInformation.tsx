'use client';
import { deleteBlobFile, getBlobFile, uploadBlob } from '@/lib/azure/azure';
import { COLLAGE_LONG_AND_SHORT, EVALUATION_SCALES, STUDY_AREAS } from '@/lib/constants';
import { updateScholarCollageInformation } from '@/lib/db/utils/users';
import scholarCollageInformationSchema from '@/lib/schemas/scholar/collageInformationSchema';
import { CalendarDaysIcon, DocumentChartBarIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { Prisma, ScholarCollageInformation } from '@prisma/client';
import moment from 'moment';
import Link from 'next/link';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

interface CollageInformationProps {
  scholarCollage: ScholarCollageInformation | undefined;
}

const readFileAsBase64 = (file: File | null): Promise<string> => {
  if (file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  } else {
    throw new Error('No file provided');
  }
};

const CollageInformation: React.FC<CollageInformationProps> = ({ scholarCollage }) => {
  const [schedule, setSchedule] = useState<string | null | undefined>(
    scholarCollage?.career_schedule
  );
  const [proof, setProof] = useState<string | null | undefined>(
    scholarCollage?.collage_study_proof
  );

  useEffect(() => {
    if (scholarCollage?.collage_study_proof) {
      getBlobFile(scholarCollage?.collage_study_proof)
        .then((proof) => {
          setProof(proof);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    if (scholarCollage?.career_schedule) {
      getBlobFile(scholarCollage?.career_schedule)
        .then((url) => {
          setSchedule(url);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [scholarCollage?.career_schedule, scholarCollage?.collage_study_proof]);

  const [files, setFiles] = useState<{
    collage_study_proof: File | null;
    career_schedule: File | null;
  }>({
    collage_study_proof: null,
    career_schedule: null,
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid },
  } = useForm<z.infer<typeof scholarCollageInformationSchema>>({
    resolver: zodResolver(scholarCollageInformationSchema),
    defaultValues: {
      collage_start_date: moment(scholarCollage?.collage_start_date).format('YYYY-MM-DD'),
      collage_end_date: moment(scholarCollage?.collage_end_date).format('YYYY-MM-DD'),
      academic_load_completed: scholarCollage?.academic_load_completed === true ? 'SI' : 'NO',
      have_schooolarship: scholarCollage?.have_schooolarship === true ? 'SI' : 'NO',
      career: scholarCollage?.career ?? undefined,
      mention: scholarCollage?.mention ?? undefined,
      scholarship_percentage: scholarCollage?.scholarship_percentage ?? undefined,
      collage: scholarCollage?.collage ?? undefined,
      kind_of_collage: scholarCollage?.kind_of_collage ?? undefined,
      evaluation_scale: scholarCollage?.evaluation_scale ?? undefined,
      study_area: scholarCollage?.study_area ?? undefined,
      study_regime: scholarCollage?.study_regime ?? undefined,
    },
  });
  const haveScholarship = useWatch({
    control,
    name: 'have_schooolarship',
  });
  const academicLoadComplete = useWatch({
    control,
    name: 'academic_load_completed',
  });
  const kindOfCollage = useWatch({
    control,
    name: 'kind_of_collage',
  });

  const saveData = async (
    data: z.infer<typeof scholarCollageInformationSchema>,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    event?.preventDefault();
    let scholarCollageInfo: Prisma.ScholarCollageInformationUpdateInput = {
      kind_of_collage: data.kind_of_collage,
      collage: data.collage,
      career: data.career,
      mention: data.mention,
      study_area: data.study_area,
      evaluation_scale: data.evaluation_scale,
      study_regime: data.study_regime,
      scholarship_percentage: data.scholarship_percentage,
    };
    if (files.collage_study_proof !== null && files.career_schedule !== null) {
      const scheduleBase64 = await readFileAsBase64(files.career_schedule);
      const proofBase64 = await readFileAsBase64(files.collage_study_proof);
      const schedule = await uploadBlob(scheduleBase64, 'application/pdf', 'files');
      const proof = await uploadBlob(proofBase64, 'application/pdf', 'files');
      scholarCollageInfo.career_schedule = schedule!;
      scholarCollageInfo.collage_study_proof = proof!;
    }

    scholarCollageInfo.collage_start_date = new Date(data.collage_start_date).toISOString();
    scholarCollageInfo.collage_end_date = data.collage_end_date
      ? new Date(data.collage_end_date).toISOString()
      : null;

    scholarCollageInfo.have_schooolarship = data.have_schooolarship === 'SI' ? true : false;
    scholarCollageInfo.academic_load_completed =
      data.academic_load_completed === 'SI' ? true : false;
    await updateScholarCollageInformation(scholarCollage?.scholar_id!, scholarCollageInfo);
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
                  isRequired
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
                  isRequired
                  label="Universidad"
                  labelPlacement="outside"
                  defaultSelectedKeys={[field.value]}
                >
                  {COLLAGE_LONG_AND_SHORT.map((collage) => (
                    <SelectItem key={collage.value} value={collage.value}>
                      {collage.label}
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
                  value={field.value?.toString()}
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
                  {STUDY_AREAS.map((studyArea) => (
                    <SelectItem key={studyArea.value} value={studyArea.value}>
                      {studyArea.label}
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
                  isRequired
                  labelPlacement="outside"
                  defaultSelectedKeys={[field.value]}
                >
                  {EVALUATION_SCALES.map((evaluationScale) => (
                    <SelectItem key={evaluationScale.value} value={evaluationScale.value}>
                      {evaluationScale.label}
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
                  isRequired
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
          {kindOfCollage === 'PRIVATE' && (
            <Controller
              name="have_schooolarship"
              control={control}
              rules={{ required: true }}
              shouldUnregister={true}
              render={({ field, formState }) => {
                return (
                  <Select
                    value={field.value?.toString()}
                    onChange={field.onChange}
                    isInvalid={!!formState.errors?.['have_schooolarship']?.message}
                    errorMessage={formState.errors?.['have_schooolarship']?.message?.toString()}
                    classNames={{ base: 'col-span-6 lg:col-span-2 h-fit' }}
                    radius="sm"
                    label="¿Posee beca?"
                    labelPlacement="outside"
                    defaultSelectedKeys={field.value ? [field.value] : []}
                  >
                    {[
                      {
                        label: 'Si',
                        value: 'SI',
                      },
                      {
                        label: 'No',
                        value: 'NO',
                      },
                    ].map((modality) => (
                      <SelectItem key={modality.value.toString()} value={modality.value.toString()}>
                        {modality.label}
                      </SelectItem>
                    ))}
                  </Select>
                );
              }}
            />
          )}

          {haveScholarship?.toString() === 'SI' && (
            <Controller
              name="scholarship_percentage"
              control={control}
              rules={{ required: true }}
              render={({ field, formState }) => {
                return (
                  <Input
                    value={field.value?.toString()}
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
          )}

          <Controller
            name="academic_load_completed"
            control={control}
            rules={{ required: true }}
            shouldUnregister={true}
            render={({ field, formState }) => {
              return (
                <Select
                  value={field.value || ''}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['academic_load_completed']?.message}
                  errorMessage={formState.errors?.['academic_load_completed']?.message?.toString()}
                  classNames={{ base: 'col-span-6 lg:col-span-2 h-fit' }}
                  radius="sm"
                  isRequired
                  label="¿Culminaste carga academica?"
                  labelPlacement="outside"
                  defaultSelectedKeys={field.value ? [field.value] : []}
                >
                  {[
                    {
                      label: 'Si',
                      value: 'SI',
                    },
                    {
                      label: 'No',
                      value: 'NO',
                    },
                  ].map(({ label, value }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </Select>
              );
            }}
          />
          {academicLoadComplete?.toString() === 'SI' && (
            <Controller
              name="collage_end_date"
              control={control}
              rules={{ required: true }}
              render={({ field, formState }) => {
                return (
                  <Input
                    value={field.value?.toString()}
                    onChange={field.onChange}
                    isRequired
                    isInvalid={!!formState.errors?.['collage_end_date']?.message}
                    errorMessage={formState.errors?.['collage_end_date']?.message?.toString()}
                    type="date"
                    label="Fecha de culminación de estudios universitarios"
                    radius="sm"
                    classNames={{ base: 'col-span-6 lg:col-span-2 h-fit' }}
                    labelPlacement="outside"
                  />
                );
              }}
            />
          )}

          <Controller
            name="collage_study_proof"
            control={control}
            render={({ field, formState }) => {
              // getBlobFile(scholarCollage.collage_study_proof)
              //   .then((url) => {
              //     setProof(url);
              //   })
              //   .catch((error) => {
              //     console.error(error);
              //   });
              return (
                <Input
                  value={field.value?.toString()}
                  startContent={
                    proof && (
                      <div className="w-5 h-5 text-primary-light animate-pulse">
                        <Link href={proof}>
                          <DocumentChartBarIcon />
                        </Link>
                      </div>
                    )
                  }
                  onChange={async (e) => {
                    if (scholarCollage?.collage_study_proof) {
                      await deleteBlobFile(scholarCollage?.collage_study_proof!);
                    }
                    setFiles((prev) => {
                      prev.collage_study_proof = e?.target.files?.[0] || null;
                      return prev;
                    });
                    field.onChange(e);
                  }}
                  isInvalid={!!formState.errors?.['collage_study_proof']?.message}
                  errorMessage={formState.errors?.['collage_study_proof']?.message?.toString()}
                  type="file"
                  className="flex items-center"
                  accept="application/pdf"
                  label="Constancia de inscripcion en universidad"
                  placeholder="Constancia"
                  description="Solo archivos en formato PDF"
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
            render={({ field, formState }) => {
              // getBlobFile(scholarCollage.career_schedule)
              //   .then((url) => {
              //     setSchedule(url);
              //   })
              //   .catch((error) => {
              //     console.error(error);
              //   });
              return (
                <Input
                  startContent={
                    schedule && (
                      <div className="w-5 h-5 text-primary-light animate-pulse">
                        <Link href={schedule}>
                          <CalendarDaysIcon />
                        </Link>
                      </div>
                    )
                  }
                  value={field.value || ''}
                  onChange={async (e) => {
                    if (scholarCollage?.career_schedule) {
                      await deleteBlobFile(scholarCollage?.career_schedule!);
                    }
                    setFiles((prev) => {
                      prev.career_schedule = e?.target.files?.[0] || null;
                      return prev;
                    });
                    field.onChange(e);
                  }}
                  className="flex items-center"
                  isInvalid={!!formState.errors?.['career_schedule']?.message}
                  errorMessage={formState.errors?.['career_schedule']?.message?.toString()}
                  type="file"
                  accept="application/pdf"
                  placeholder="horario"
                  description="Solo archivos en formato PDF"
                  label="Horario de clases"
                  radius="sm"
                  classNames={{ base: 'col-span-6 lg:col-span-2 h-fit' }}
                  labelPlacement="outside"
                />
              );
            }}
          />
        </div>
        <Button
          type="submit"
          className="col-span-2 lg:col-span-1 text-white bg-green-600 hover:bg-green-500 hover:text-green-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          isDisabled={isSubmitting}
        >
          Guardar cambios
        </Button>
      </form>
    </>
  );
};

export default CollageInformation;
