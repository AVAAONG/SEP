'use client';
import DateInput from '@/components/commons/DateInput';
import PlatformInput from '@/components/commons/PlatformInput';
import { createCalendarEvent, updateCalendarEvent } from '@/lib/calendar/calendar';
import { formatDatesClient } from '@/lib/calendar/clientUtils';
import { IWorkshopCalendar } from '@/lib/calendar/d';
import { formatDates } from '@/lib/calendar/utils';
import { MODALITY, PROGRAM_COMPONENTS, WORKSHOP_TYPES, WORKSHOP_YEAR } from '@/lib/constants';
import { WorkshopWithSpeaker } from '@/lib/db/types';
import { createWorkshop, editWorkshop } from '@/lib/db/utils/Workshops';
import workshopCreationFormSchema from '@/lib/schemas/workshopCreationFormSchema';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar } from '@nextui-org/avatar';
import { Checkbox, CheckboxGroup } from '@nextui-org/checkbox';
import { Chip } from '@nextui-org/chip';
import { Input, Textarea } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';
import { Prisma, WorkshopYear } from '@prisma/client';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { BaseSyntheticEvent, useEffect } from 'react';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import FormButtonGroup from '../commons/FormButtonGroup';

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
  workshopForEdit: WorkshopWithSpeaker | undefined;
}
const WorkshopCreationForm: React.FC<WorkshopCreationFormProps> = ({
  speakers,
  workshopForEdit,
  kind,
}) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
    setValue,
  } = useForm<Schema>({
    resolver: zodResolver(workshopCreationFormSchema),
  });
  useEffect(() => {
    reset();
    if (workshopForEdit) {
      const formatedChat: Schema = {
        title: workshopForEdit?.title ?? '',
        dates: [
          {
            date: moment(workshopForEdit?.start_dates[0]).format('YYYY-MM-DD'),
            startHour: moment(workshopForEdit?.start_dates[0]).format('HH:mm'),
            endHour: moment(workshopForEdit?.end_dates[0]).format('HH:mm'),
          },
        ],
        modality: workshopForEdit?.modality!,
        speakersId: workshopForEdit?.speaker.map((speaker) => speaker.id).toString()!,
        platformInPerson: workshopForEdit?.platform ?? '',
        platformOnline: workshopForEdit?.platform ?? '',
        description: workshopForEdit?.description ?? undefined,
        avalible_spots: workshopForEdit?.avalible_spots ?? 0,
        asociated_skill: workshopForEdit?.asociated_skill!,
        kindOfWorkshop: workshopForEdit?.kindOfWorkshop!,
        year: workshopForEdit?.year as unknown as WorkshopYear[],
      };
      Object.keys(formatedChat).forEach((key) => {
        if (key in formatedChat) {
          const valueKey = key as keyof typeof formatedChat;
          if (formatedChat[valueKey] !== undefined) {
            setValue(valueKey, formatedChat[valueKey]);
          }
        }
      });
    }
  }, [workshopForEdit, setValue]);
  const router = useRouter();

  const modality = useWatch({
    control,
    name: 'modality',
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
    const dates = formatDatesClient(data.dates); //client formating
    const calendarDates = await formatDates(data.dates); //server formating
    const workshopSpeakersId = data.speakersId.split(',');
    const speakersData = workshopSpeakersId
      .map((speakerId: string) => {
        const speaker = speakers.find((speaker) => speaker.id === speakerId);
        if (!speaker) return null;
        return {
          id: speaker?.id,
          speakerName: `${speaker?.first_names.split(' ')[0]} ${speaker?.last_names.split(' ')[0]}`,
          speakerEmail: speaker?.email,
        };
      })
      .filter((speaker) => speaker !== null) as IWorkshopCalendar['speakersData'];
    const { platformInPerson, platformOnline, speakersId, ...restData } = data;
    const calendarWorkshop: IWorkshopCalendar = {
      platform: platformInPerson ? platformInPerson : platformOnline!,
      speakersData,
      ...calendarDates,
      ...restData,
      description: data.description ? data.description : null,
    };

    if (buttonType === 'edit') {
      const meetingDetails = await updateCalendarEvent(
        workshopForEdit?.calendar_ids!,
        calendarWorkshop,
        workshopForEdit?.meeting_id!
      );

      const editedWorkshop: Prisma.WorkshopUpdateArgs = {
        where: {
          id: workshopForEdit?.id!,
        },
        data: {
          title: data.title,
          avalible_spots: z.coerce.number().parse(data.avalible_spots),
          platform: data.platformInPerson ? data.platformInPerson : data.platformOnline!,
          description: data.description ? data.description : null,
          ...dates,
          modality: data.modality,
          asociated_skill: data.asociated_skill,
          activity_status: 'SCHEDULED',
          calendar_ids: workshopForEdit?.calendar_ids!,
          kindOfWorkshop: data.kindOfWorkshop,
          year: data.year as unknown as WorkshopYear[],
          meeting_id: meetingDetails.map(
            (meetingDetail) => meetingDetail.meetingId || ''
          ) as string[],
          meeting_link: meetingDetails.map(
            (meetingDetail) => meetingDetail.meetingLink || ''
          ) as string[],
          meeting_password: meetingDetails.map(
            (meetingDetail) => meetingDetail.meetingPassword || ''
          ) as string[],
          speaker: {
            connect: calendarWorkshop.speakersData.map((speaker) => ({ id: speaker.id })),
          },
        },
      };
      await editWorkshop(editedWorkshop);
    } else {
      const [eventsIds, meetingDetails] = await createCalendarEvent(calendarWorkshop);
      const workshop: Prisma.WorkshopCreateArgs = {
        data: {
          title: data.title,
          avalible_spots: z.coerce.number().parse(data.avalible_spots),
          platform: data.platformInPerson ? data.platformInPerson : data.platformOnline!,
          description: data.description ? data.description : null,
          kindOfWorkshop: data.kindOfWorkshop,
          calendar_ids: [...eventsIds],
          ...dates,
          year: data.year as unknown as WorkshopYear[],
          modality: data.modality,
          asociated_skill: data.asociated_skill,
          activity_status: 'SCHEDULED',
          speaker: {
            connect: calendarWorkshop.speakersData.map((speaker) => ({ id: speaker.id })),
          },
        },
      };
      if (data.modality === 'ONLINE') {
        workshop.data.meeting_id = meetingDetails.map(
          (meetingDetail) => meetingDetail.meetingId || null
        ) as string[];
        workshop.data.meeting_link = meetingDetails.map(
          (meetingDetail) => meetingDetail.meetingLink || null
        ) as string[];
        workshop.data.meeting_password = ['null'];
        if (platformOnline === 'ZOOM') {
          workshop.data.meeting_password = meetingDetails.map(
            (meetingDetail) => meetingDetail.meetingPassword || null
          ) as string[];
        }
      }
      if (buttonType === 'schedule') {
        workshop.data.activity_status = 'SCHEDULED';
        await createWorkshop(workshop);
      } else if (buttonType === 'send') {
        workshop.data.activity_status = 'SENT';
        await createWorkshop(workshop);
      } else {
      }
    }
    reset();
    await revalidateSpecificPath('/admin/actividadesFormativas/crear');
    router.push('/admin/actividadesFormativas/crear');
  };

  return (
    <>
      <form
        onSubmit={handleSubmit((data, event) =>
          toast.promise(handleFormSubmit(data, event), {
            pending: 'Creando actividad...',
            success: 'Actividad creada con éxito',
            error: 'Ocurrió un error al crear la actividad',
          })
        )}
        className="grid grid-cols-2 w-full items-center justify-center gap-4"
      >
        <h1 className="col-span-2 text-center w-full font-semibold text-2xl text-primary-light uppercase tracking-widest">
          crear actividad formativa
        </h1>
        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          shouldUnregister={true}
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
          shouldUnregister={true}
          render={({ field, formState }) => {
            return (
              <Select
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.['asociated_skill']?.message}
                errorMessage={formState.errors?.['asociated_skill']?.message?.toString()}
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                radius="sm"
                label="Competencia asociada"
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
        <Controller
          name="speakersId"
          control={control}
          rules={{ required: true }}
          shouldUnregister={true}
          render={({ field, formState }) => {
            return (
              <Select
                value={field.value}
                onChange={field.onChange}
                items={speakers}
                isMultiline={true}
                selectionMode="multiple"
                isInvalid={!!formState.errors?.['speakersId']?.message}
                errorMessage={formState.errors?.['speakersId']?.message?.toString()}
                classNames={{
                  base: 'col-span-2',
                }}
                radius="sm"
                label="Facilitador(es)"
                labelPlacement="outside"
                defaultSelectedKeys={[field.value]}
                renderValue={(items) => {
                  return (
                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <Chip key={item.key}>
                          {item.data?.first_names} {item.data?.last_names}
                        </Chip>
                      ))}
                    </div>
                  );
                }}
              >
                {(speaker) => (
                  <SelectItem
                    classNames={{ base: 'col-span-2 md:col-span-1' }}
                    key={speaker.id}
                    textValue={`${speaker.first_names} ${speaker.last_names}`}
                  >
                    <div className="flex gap-2 items-center">
                      <Avatar
                        alt={speaker.first_names}
                        className="flex-shrink-0"
                        size="sm"
                        src={speaker.image || ''}
                      />
                      <div className="flex flex-col">
                        <span className="text-small">{`${speaker.first_names} ${speaker.last_names}`}</span>
                        <span className="text-tiny text-default-400">{speaker.email}</span>
                      </div>
                    </div>
                  </SelectItem>
                )}
              </Select>
            );
          }}
        />
        <Controller
          name="avalible_spots"
          control={control}
          rules={{ required: true }}
          shouldUnregister={true}
          render={({ field, formState }) => {
            return (
              <Input
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
          shouldUnregister={true}
          render={({ field, formState }) => {
            return (
              <Select
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.['modality']?.message}
                errorMessage={formState.errors?.['modality']?.message?.toString()}
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                radius="sm"
                label="Modalidad"
                labelPlacement="outside"
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
        <Controller
          name="kindOfWorkshop"
          control={control}
          rules={{ required: true }}
          shouldUnregister={true}
          render={({ field, formState }) => {
            return (
              <Select
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.['kindOfWorkshop']?.message}
                errorMessage={formState.errors?.['kindOfWorkshop']?.message?.toString()}
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                radius="sm"
                label="Tipo de actividad formativa"
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
        <PlatformInput modality={modality} control={control} />

        <Controller
          name="year"
          control={control}
          rules={{ required: true }}
          shouldUnregister={true}
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
          shouldUnregister={true}
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
                placeholder="(Opcional) Coloca la descripcion de la actividad"
              />
            );
          }}
        />
        <div className="flex gap-4 col-span-2">
          <FormButtonGroup
            isDisabled={!isValid || isSubmitting}
            onlyEdit={kind === 'create' ? false : true}
          />
        </div>
      </form>
    </>
  );
};

export default WorkshopCreationForm;
