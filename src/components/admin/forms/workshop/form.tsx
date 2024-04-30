'use client';
import DateInput from '@/components/commons/DateInput';
import PlatformCoordinatesInput from '@/components/commons/PlatformCoordinatesInputs';
import PlatformInput from '@/components/commons/PlatformInput';
import { createCalendarEvent, deleteCalendarEvent } from '@/lib/calendar/calendar';
import { IWorkshopCalendar } from '@/lib/calendar/d';
import { formatDates } from '@/lib/calendar/utils';
import {
  MODALITY,
  PROGRAM_COMPONENTS,
  WORKSHOP_CALENDAR_ID,
  WORKSHOP_TYPES,
  WORKSHOP_YEAR,
} from '@/lib/constants';
import { WorkshopWithSpeaker } from '@/lib/db/types';
import { createWorkshop, updateWorkshop } from '@/lib/db/utils/Workshops';
import workshopCreationFormSchema from '@/lib/schemas/workshopCreationFormSchema';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, CheckboxGroup } from '@nextui-org/checkbox';
import { Input, Textarea } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';
import { BaseSyntheticEvent, useEffect } from 'react';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { default as Combobox } from 'react-select';
import { toast } from 'react-toastify';
import { z } from 'zod';
import FormButtonGroup from '../commons/FormButtonGroup';
import createWorkshopObject from './lib/createWorkshopObject';
import formatWorkshop from './lib/formatWorkshopForEdit';
import { determineStatus } from './lib/utils';

type Schema = z.infer<typeof workshopCreationFormSchema>;

interface WorkshopCreationFormProps {
  speakers: {
    id: string;
    first_names: string;
    last_names: string;
    email: string | null;
    image?: string | null;
  }[];
  kind: 'edit' | 'create';
  valuesToUpdate: WorkshopWithSpeaker | undefined;
}
const WorkshopForm: React.FC<WorkshopCreationFormProps> = ({ speakers, valuesToUpdate, kind }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
    reset,
    setValue,
  } = useForm<Schema>({
    resolver: zodResolver(workshopCreationFormSchema),
  });

  const onReset = () => {
    // Reset the form state
    reset({
      dates: [{ date: '', startHour: '', endHour: '' }],
      speakers: [],
    });
  };

  useEffect(() => {
    if (!valuesToUpdate) return;
    const formatedWorkshop = formatWorkshop(valuesToUpdate);
    Object.entries(formatedWorkshop).forEach(([key, value]) => {
      if (value !== undefined) {
        setValue(key as keyof typeof formatedWorkshop, value);
      }
      revalidateSpecificPath('/admin/actividadesFormativas/crear/**');
    });
  }, [valuesToUpdate, setValue, isDirty]);

  const speakersForCombobox = speakers.map((speaker) => ({
    value: speaker.id,
    label: `${speaker.first_names} ${speaker.last_names}`,
    email: speaker.email,
  }));

  const modality = useWatch({
    control,
    name: 'modality',
  });
  const platformOnline = useWatch({
    control,
    name: 'platformOnline',
  });
  const fieldArray = useFieldArray({
    control,
    name: 'dates',
  });

  const handleFormSubmit = async (
    data: z.infer<typeof workshopCreationFormSchema>,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    const buttonType = ((event?.nativeEvent as SubmitEvent)?.submitter as HTMLButtonElement)?.name;
    const status = determineStatus(buttonType);
    console.log(data.dates);
    const calendarDates = await formatDates(data.dates); //server formating
    const { platformInPerson, platformOnline, speakers, ...restData } = data;

    const calendarWorkshop: IWorkshopCalendar = {
      platform: platformInPerson ? platformInPerson : platformOnline!,
      speakersData: speakers,
      ...calendarDates,
      ...restData,
      description: data.description ? data.description : null,
    };

    const [eventsIds, meetingDetails] = await createCalendarEvent(calendarWorkshop);
    let meetingCoordinates = meetingDetails;
    if (data.platformOnline !== 'ZOOM') {
      meetingCoordinates.push({
        meetingId: data.meetingId,
        meetingLink: data.meetingLink,
        meetingPassword: data.meetingPass,
      });
    }

    if (buttonType === 'edit' && valuesToUpdate) {
      valuesToUpdate.calendar_ids.map(
        async (id) => await deleteCalendarEvent(WORKSHOP_CALENDAR_ID, id)
      );
      const workshop = createWorkshopObject(data, status, eventsIds, meetingCoordinates);
      await updateWorkshop(valuesToUpdate?.id, workshop);
    } else {
      const workshop = createWorkshopObject(data, status, eventsIds, meetingDetails);
      await createWorkshop(workshop);
    }
    onReset();
    await revalidateSpecificPath('/admin/actividadesFormativas/crear');
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(
          (data, event) =>
            toast.promise(handleFormSubmit(data, event), {
              pending: 'Creando actividad...',
              success: 'Actividad creada con éxito',
              error: 'Ocurrió un error al crear la actividad',
            }),
          (errors) => console.log(errors)
        )}
        className="grid grid-cols-2 w-full items-center justify-center gap-4"
      >
        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          render={({ field, formState }) => {
            return (
              <Input
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.['title']?.message}
                errorMessage={formState.errors?.['title']?.message?.toString()}
                autoFocus
                type="text"
                label="Título"
                radius="sm"
                isRequired
                classNames={{ base: 'col-span-2 h-fit' }}
                labelPlacement="outside"
              />
            );
          }}
        />
        <DateInput control={control} fieldArray={fieldArray} />
        <Controller
          name="asociated_skill"
          control={control}
          rules={{ required: true }}
          render={({ field, formState }) => {
            return (
              <Select
                value={field.value}
                isRequired
                onChange={field.onChange}
                isInvalid={!!formState.errors?.['asociated_skill']?.message}
                errorMessage={formState.errors?.['asociated_skill']?.message?.toString()}
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                radius="sm"
                label="Competencia asociada"
                selectedKeys={[field.value]}
                defaultSelectedKeys={[field.value]}
                labelPlacement="outside"
              >
                {PROGRAM_COMPONENTS.map((programComponent) => (
                  <SelectItem key={programComponent.value} value={programComponent.value}>
                    {programComponent.label}
                  </SelectItem>
                ))}
              </Select>
            );
          }}
        />
        <div>
          <span className="text-sm">Facilitador(es)</span>
          <Controller
            name="speakers"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              return (
                <Combobox
                  // defaultValue={}
                  isMulti
                  {...field}
                  required={true}
                  className="!rounded-lg z-50 py-2"
                  options={speakersForCombobox}
                  styles={{
                    control: (baseStyles: object, _state: object) => ({
                      ...baseStyles,
                      padding: '1px 5px', // Increase vertical padding
                      borderRadius: '10px', // Set rounded corners
                      borderColor: 'transparent', // Set border color as transparent
                      outline: 'none', // Remove outline
                      boxShadow: 'none', // Remove boxShadow (ring)
                      '&:hover': {
                        backgroundColor: '#f3f4f6',
                      },
                      '&:focus': {
                        outline: 'none', // Remove outline on focus
                      },
                      '&:active': {
                        outline: 'none', // Remove outline on active
                      },
                    }),
                  }}
                />
              );
            }}
          />
        </div>

        <Controller
          name="avalible_spots"
          control={control}
          rules={{ required: true }}
          render={({ field, formState }) => {
            return (
              <Input
                isRequired
                value={field.value?.toString()}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.avalible_spots?.message}
                errorMessage={formState.errors?.avalible_spots?.message?.toString()}
                type="number"
                label="Cupos disponibles"
                radius="sm"
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                labelPlacement="outside"
              />
            );
          }}
        />
        <Controller
          name="modality"
          control={control}
          rules={{ required: true }}
          render={({ field, formState }) => {
            return (
              <Select
                isRequired
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.['modality']?.message}
                errorMessage={formState.errors?.['modality']?.message?.toString()}
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                radius="sm"
                label="Modalidad"
                labelPlacement="outside"
                selectedKeys={[field.value]}
                defaultSelectedKeys={[field.value]}
              >
                {MODALITY.map((modality) => (
                  <SelectItem key={modality.value} value={modality.value}>
                    {modality.label}
                  </SelectItem>
                ))}
              </Select>
            );
          }}
        />

        <PlatformInput modality={modality} control={control} />
        <PlatformCoordinatesInput control={control} platform={platformOnline} />
        <Controller
          name="kindOfWorkshop"
          control={control}
          rules={{ required: true }}
          render={({ field, formState }) => {
            return (
              <Select
                isRequired
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.['kindOfWorkshop']?.message}
                errorMessage={formState.errors?.['kindOfWorkshop']?.message?.toString()}
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                radius="sm"
                label="Tipo de actividad formativa"
                selectedKeys={[field.value]}
                defaultSelectedKeys={[field.value]}
                labelPlacement="outside"
              >
                {WORKSHOP_TYPES.map((modality) => (
                  <SelectItem key={modality.value} value={modality.value}>
                    {modality.label}
                  </SelectItem>
                ))}
              </Select>
            );
          }}
        />
        <Controller
          name="year"
          control={control}
          rules={{ required: true }}
          render={({ field, formState }) => {
            return (
              <CheckboxGroup
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.['year']?.message}
                errorMessage={formState.errors?.['year']?.message?.toString()}
                isRequired={true}
                color="success"
                label="Año"
                orientation="horizontal"
                classNames={{ base: 'col-span-2 md:col-span-1' }}
              >
                {WORKSHOP_YEAR.map((year) => (
                  <Checkbox key={year} radius="sm" value={year}>
                    {year}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            );
          }}
        />

        <Controller
          name="description"
          control={control}
          rules={{ required: true }}
          render={({ field, formState }) => {
            return (
              <Textarea
                radius="sm"
                value={field.value || undefined}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.['description']?.message}
                errorMessage={formState.errors?.['description']?.message?.toString()}
                label="Descripción"
                labelPlacement="outside"
                classNames={{
                  base: 'col-span-2 h-fit w-full',
                }}
                placeholder="(Opcional) Coloca la descripción de la actividad"
              />
            );
          }}
        />
        <div className="flex gap-4 col-span-2">
          <FormButtonGroup isDisabled={isSubmitting} onlyEdit={kind === 'create' ? false : true} />
        </div>
      </form>
    </>
  );
};

export default WorkshopForm;
