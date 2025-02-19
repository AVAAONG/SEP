'use client';
import DateInput from '@/components/commons/DateInput';
import PlatformCoordinatesInput from '@/components/commons/PlatformCoordinatesInputs';
import PlatformInput from '@/components/commons/PlatformInput';
import createWorkshopInvitationMessage from '@/components/emailTemplateMessage/WorkshopInvitationMessage';
import { MeetingDetails, createCalendarEvent } from '@/lib/calendar/calendar';
import { formatDates } from '@/lib/calendar/clientUtils';
import { IWorkshopCalendar } from '@/lib/calendar/d';
import { MODALITY, PROGRAM_COMPONENTS, WORKSHOP_TYPES, WORKSHOP_YEAR } from '@/lib/constants';
import { WorkshopWithSpeaker } from '@/lib/db/types';
import { createWorkshop, updateWorkshop } from '@/lib/db/utils/Workshops';
import workshopCreationFormSchema from '@/lib/schemas/workshopCreationFormSchema';
import { sendActivitiesEmail } from '@/lib/sendEmails';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { useRouter } from 'next/navigation';
import { BaseSyntheticEvent, useEffect } from 'react';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import FormButtonGroup from '../commons/FormButtonGroup';
import SpeakerInput from '../commons/SpeakerInput';
import createWorkshopObject from './lib/createWorkshopObject';
import formatWorkshop from './lib/formatWorkshopForEdit';
import { determineStatus } from './lib/utils';

type Schema = z.infer<typeof workshopCreationFormSchema>;

interface WorkshopFormProps {
  kind: 'edit' | 'create';
  valuesToUpdate: WorkshopWithSpeaker | undefined;
  showEdit: boolean;
  showSchedule: boolean;
  showCreate: boolean;
  showSend: boolean;
}
const WorkshopForm: React.FC<WorkshopFormProps> = ({
  valuesToUpdate,
  kind,
  showCreate,
  showEdit,
  showSend,
  showSchedule,
}) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
    reset,
    setValue,
  } = useForm<Schema>({
    resolver: zodResolver(workshopCreationFormSchema),
  });
  const router = useRouter();

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

  const onReset = () => {
    // Reset the form state
    reset({
      dates: [{ date: '', startHour: '', endHour: '' }],
      speakers: [],
      description: '',
    });
  };

  const handleFormSubmit = async (
    data: z.infer<typeof workshopCreationFormSchema>,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    const buttonType = ((event?.nativeEvent as SubmitEvent)?.submitter as HTMLButtonElement)?.name;
    let status;
    if (buttonType !== 'edit') status = determineStatus(buttonType);
    else status = null;
    const calendarDates = await formatDates(data.dates); //server formating
    const { platformInPerson, platformOnline, speakers, ...restData } = data;

    const calendarWorkshop: IWorkshopCalendar = {
      platform: platformInPerson ? platformInPerson : platformOnline!,
      speakersData: speakers,
      ...calendarDates,
      ...restData,
      description: data.description ? data.description : null,
    };
    let eventsIds: string[] = [];
    let meetingDetails: MeetingDetails[] = [];

    //avoid create a calendar event when the workshop is in 'create mode'
    if (buttonType === 'schedule' || buttonType === 'send') {
      const [eventos, meet] = await createCalendarEvent(calendarWorkshop);
      eventsIds = eventos;
      meetingDetails = meet;
    }

    let meetingCoordinates = meetingDetails;
    if ((buttonType === 'schedule' || buttonType === 'send') && data.platformOnline !== 'ZOOM') {
      meetingCoordinates.push({
        meetingId: data.meetingId,
        meetingLink: data.meetingLink,
        meetingPassword: data.meetingPass,
      });
    }

    if (buttonType === 'edit' && valuesToUpdate) {
      // if (
      //   valuesToUpdate.calendar_ids.length < 1 ||
      //   valuesToUpdate.activity_status === 'ATTENDANCE_CHECKED' ||
      //   valuesToUpdate.activity_status === 'SUSPENDED'
      // ) {
      // } else {
      //   valuesToUpdate.calendar_ids.map(
      //     async (id) => await deleteCalendarEvent(WORKSHOP_CALENDAR_ID, id)
      //   );
      const workshop = await createWorkshopObject(
        data,
        valuesToUpdate.activity_status,
        eventsIds,
        meetingCoordinates
      );
      await updateWorkshop(valuesToUpdate?.id, workshop);
      // router.push('/admin/actividadesFormativas/crear');
    } else {
      const workshop = await createWorkshopObject(data, status, eventsIds, meetingDetails);
      const createdWorkshop = await createWorkshop(workshop);
      if (buttonType === 'send') {
        const workshopInvitationMessage = createWorkshopInvitationMessage();
        await sendActivitiesEmail(
          workshopInvitationMessage,
          '¡Se han agregado actividades formativas!'
        );
      }
      if (buttonType === 'create') {
        router.push(`/admin/actividadesFormativas/${createdWorkshop.id}`);
      }
    }
    await revalidateSpecificPath('/admin/actividadesFormativas/crear');
    onReset();
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
        <div className="col-span-2 md:col-span-1">
          <SpeakerInput control={control} kind="workshop" />
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
          <FormButtonGroup
            isDisabled={isSubmitting}
            showCreate={showCreate}
            showEdit={showEdit}
            showSend={showSend}
            showSchedule={showSchedule}
          />
        </div>
      </form>
    </>
  );
};

export default WorkshopForm;
