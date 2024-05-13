'use client';
import DateInput from '@/components/commons/DateInput';
import PlatformCoordinatesInput from '@/components/commons/PlatformCoordinatesInputs';
import PlatformInput from '@/components/commons/PlatformInput';
import createChatInvitationMessage from '@/components/emailTemplateMessage/ChatInvitationMessage';
import { MeetingDetails, createCalendarEvent, deleteCalendarEvent } from '@/lib/calendar/calendar';
import { IChatCalendar } from '@/lib/calendar/d';
import { formatDates } from '@/lib/calendar/utils';
import { CHAT_CALENDAR_ID, CHAT_LEVELS, MODALITY } from '@/lib/constants';
import { ChatWithSpeaker } from '@/lib/db/types';
import { createChat, updateChat } from '@/lib/db/utils/chats';
import chatCreationFormSchema from '@/lib/schemas/chatCreationFormSchema';
import { sendActivitiesEmail } from '@/lib/sendEmails';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Textarea } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';
import { useRouter } from 'next/navigation';
import { BaseSyntheticEvent, useEffect } from 'react';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { default as Combobox } from 'react-select';
import { toast } from 'react-toastify';
import { z } from 'zod';
import FormButtonGroup from '../commons/FormButtonGroup';
import { determineStatus } from '../workshop/lib/utils';
import createChatObject from './lib/createChatObject';
import formatChat from './lib/formatChatForEdit';

interface ChatFormProps {
  speakers: {
    id: string;
    first_names: string;
    last_names: string;
    email: string | null;
    image?: string | null;
  }[];
  kind: 'edit' | 'create';
  valuesToUpdate: ChatWithSpeaker | undefined;
}
const ChatForm: React.FC<ChatFormProps> = ({ speakers, valuesToUpdate, kind }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
    reset,
    setValue,
  } = useForm<z.infer<typeof chatCreationFormSchema>>({
    resolver: zodResolver(chatCreationFormSchema),
  });

  const speakersForCombobox = speakers.map((speaker) => ({
    value: speaker.id,
    label: `${speaker.first_names} ${speaker.last_names}`,
    email: speaker.email,
  }));


  const modality = useWatch({
    control,
    name: 'modality',
  });
  const fieldArray = useFieldArray({
    control,
    name: 'dates',
  });
  const platformOnline = useWatch({
    control,
    name: 'platformOnline',
  });

  useEffect(() => {
    if (!valuesToUpdate) return;
    const formatedChat = formatChat(valuesToUpdate);
    Object.entries(formatedChat).forEach(([key, value]) => {
      if (value !== undefined) {
        setValue(key as keyof typeof formatedChat, value);
      }
      revalidateSpecificPath('/admin/chats/crear/**');
    });
  }, [valuesToUpdate, setValue, isDirty]);

  const router = useRouter();


  const onReset = () => {
    // Reset the form state
    reset({
      dates: [{ date: '', startHour: '', endHour: '' }],
      speakers: [],
    });
  };

  const handleFormSubmit = async (
    data: z.infer<typeof chatCreationFormSchema>,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    const buttonType = ((event?.nativeEvent as SubmitEvent)?.submitter as HTMLButtonElement)?.name;
    const status = determineStatus(buttonType);
    const calendarDates = await formatDates(data.dates); //server formating
    const { platformInPerson, platformOnline, speakers, ...restData } = data;
    const calendarWorkshop: IChatCalendar = {
      platform: platformInPerson ? platformInPerson : platformOnline!,
      speakersData: speakers,
      ...calendarDates,
      ...restData,
      description: data.description ? data.description : null,
    };
    let eventsIds: string[] = [];
    let meetingDetails: MeetingDetails[] = [];

    if (buttonType !== 'create') {
      const [eventos, meet] = await createCalendarEvent(calendarWorkshop);
      eventsIds = eventos;
      meetingDetails = meet;
    }

    let meetingCoordinates = meetingDetails;
    if (buttonType !== 'create' && data.platformOnline !== 'ZOOM') {
      meetingCoordinates.push({
        meetingId: data.meetingId,
        meetingLink: data.meetingLink,
        meetingPassword: data.meetingPass,
      });
    }

    if (buttonType === 'edit' && valuesToUpdate) {
      valuesToUpdate.calendar_ids.map(
        async (id) => await deleteCalendarEvent(CHAT_CALENDAR_ID, id)
      );
      const chat = createChatObject(data, status, eventsIds, meetingCoordinates);
      await updateChat(valuesToUpdate?.id, chat);
      router.push('/admin/chats/crear');
    } else {
      const chat = createChatObject(data, status, eventsIds, meetingDetails);
      const createdChat = await createChat(chat);
      if (buttonType === 'send') {
        const chatInvitationMessage = createChatInvitationMessage();
        await sendActivitiesEmail(
          chatInvitationMessage,
          '¡Se han agregado chat clubs de inglés!'
        );
      }
      if (buttonType === 'create') {
        router.push(`/admin/chats/${createdChat.id}`);
      }
    }
    await revalidateSpecificPath('/admin/chats/crear');
    onReset();
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
          name="level"
          control={control}
          rules={{ required: true }}
          shouldUnregister={true}
          render={({ field, formState }) => (
            <Select
              value={field.value}
              onChange={field.onChange}
              isInvalid={!!formState.errors?.['level']?.message}
              errorMessage={formState.errors?.['level']?.message?.toString()}
              classNames={{ base: 'col-span-2 md:col-span-1' }}
              radius="sm"
              label="Nivel"
              defaultSelectedKeys={[field.value]}
              selectedKeys={[field.value]}
              labelPlacement="outside"
            >
              {CHAT_LEVELS.map((chatLevel) => (
                <SelectItem key={chatLevel.value} value={chatLevel.value}>
                  {chatLevel.label}
                </SelectItem>
              ))}
            </Select>
          )}
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
                selectedKeys={[field.value]}
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
          <FormButtonGroup isDisabled={isSubmitting} onlyEdit={kind === 'create' ? false : true} />
        </div>
      </form>
    </>
  );
};

export default ChatForm;
