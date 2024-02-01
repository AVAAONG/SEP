'use client';
import { createCalendarEvent, updateCalendarEvent } from '@/lib/calendar/calendar';
import { IChatCalendar } from '@/lib/calendar/d';
import { formatDates } from '@/lib/calendar/utils';
import { CHAT_LEVELS, MODALITY } from '@/lib/constants';
import { ChatWithSpeaker } from '@/lib/db/types';
import { createChat, editChat } from '@/lib/db/utils/chats';
import chatCreationFormSchema from '@/lib/schemas/chatCreationFormSchema';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import { Input, Textarea } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';
import { Prisma } from '@prisma/client';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BaseSyntheticEvent, useEffect } from 'react';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import DateInput from '../commons/DateInput';
import PlatformInput from '../commons/PlatformInput';
interface ChatCreationFormProps {
  speakers: {
    id: string;
    first_names: string;
    last_names: string;
    email: string | null;
    image?: string | null;
  }[];
  chatForEdit: ChatWithSpeaker | undefined;
}
const ChatCreationForm: React.FC<ChatCreationFormProps> = ({ speakers, chatForEdit }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
    setValue,
  } = useForm<z.infer<typeof chatCreationFormSchema>>({
    resolver: zodResolver(chatCreationFormSchema),
  });
  const modality = useWatch({
    control,
    name: 'modality',
  });
  const fieldArray = useFieldArray({
    control,
    name: 'dates',
  });

  useEffect(() => {
    reset();
    if (chatForEdit) {
      const formatedChat: z.infer<typeof chatCreationFormSchema> = {
        title: chatForEdit?.title ?? '',
        dates: [
          {
            date: moment(chatForEdit?.start_dates[0]).format('YYYY-MM-DD'),
            startHour: moment(chatForEdit?.start_dates[0]).format('HH:mm'),
            endHour: moment(chatForEdit?.end_dates[0]).format('HH:mm'),
          },
        ],
        modality: chatForEdit?.modality!,
        speakersId: chatForEdit?.speaker.map((speaker) => speaker.id).toString()!,
        platformInPerson: chatForEdit?.platform ?? '',
        platformOnline: chatForEdit?.platform ?? '',
        description: chatForEdit?.description ?? undefined,
        avalible_spots: chatForEdit?.avalible_spots ?? 0,
        level: chatForEdit?.level!,
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
  }, [chatForEdit, setValue]);
  const router = useRouter();

  const handleFormSubmit = async (
    data: z.infer<typeof chatCreationFormSchema>,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    const buttonType = ((event?.nativeEvent as SubmitEvent)?.submitter as HTMLButtonElement)?.name;
    const dates = await formatDates(data.dates);
    const chatSpeakersId = data.speakersId.split(',');
    const speakersData = chatSpeakersId
      .map((speakerId: string) => {
        const speaker = speakers.find((speaker) => speaker.id === speakerId);
        if (!speaker) return null;
        return {
          id: speaker?.id,
          speakerName: `${speaker?.first_names} ${speaker?.last_names}`,
          speakerEmail: speaker?.email,
        };
      })
      .filter((speaker) => speaker !== null) as IChatCalendar['speakersData'];
    const { platformInPerson, platformOnline, speakersId, ...restData } = data;

    const calendarChat: IChatCalendar = {
      platform: platformInPerson ? platformInPerson : platformOnline!,
      speakersData,
      ...dates,
      ...restData,
      description: data.description ? data.description : null,
    };
    if (buttonType === 'edit') {
      const meetingDetails = await updateCalendarEvent(
        chatForEdit?.calendar_ids!,
        calendarChat,
        chatForEdit?.meeting_id!
      );

      const editedChat: Prisma.ChatUpdateArgs = {
        where: {
          id: chatForEdit?.id!,
        },
        data: {
          title: data.title,
          avalible_spots: z.coerce.number().parse(data.avalible_spots),
          platform: data.platformInPerson ? data.platformInPerson : data.platformOnline!,
          description: data.description ? data.description : null,
          ...dates,
          modality: data.modality,
          level: data.level,
          meeting_id: meetingDetails.map(
            (meetingDetail) => meetingDetail.meetingId || null
          ) as string[],
          meeting_link: meetingDetails.map(
            (meetingDetail) => meetingDetail.meetingLink || null
          ) as string[],
          meeting_password: meetingDetails.map(
            (meetingDetail) => meetingDetail.meetingPassword || null
          ) as string[],
          speaker: {
            connect: calendarChat.speakersData.map((speaker) => ({ id: speaker.id })),
          },
        },
      };
      await editChat(editedChat);
    } else {
      const [eventsIds, meetingDetails] = await createCalendarEvent(calendarChat);
      let chat: Prisma.ChatCreateArgs = {
        data: {
          title: data.title,
          avalible_spots: z.coerce.number().parse(data.avalible_spots),
          platform: data.platformInPerson ? data.platformInPerson : data.platformOnline!,
          description: data.description ? data.description : null,
          calendar_ids: [...eventsIds],
          ...dates,
          modality: data.modality,
          level: data.level,
          activity_status: 'SCHEDULED',
          speaker: {
            connect: calendarChat.speakersData.map((speaker) => ({ id: speaker.id })),
          },
        },
      };

      if (data.modality === 'ONLINE') {
        chat.data.meeting_id = meetingDetails.map(
          (meetingDetail) => meetingDetail.meetingId || null
        ) as string[];
        chat.data.meeting_link = meetingDetails.map(
          (meetingDetail) => meetingDetail.meetingLink || null
        ) as string[];
        chat.data.meeting_password = ['null'];
        if (platformOnline === 'ZOOM') {
          chat.data.meeting_password = meetingDetails.map(
            (meetingDetail) => meetingDetail.meetingPassword || null
          ) as string[];
        }
      }

      if (buttonType === 'schedule') {
        chat.data.activity_status = 'SCHEDULED';
        await createChat(chat);
      } else if (buttonType === 'send') {
        chat.data.activity_status = 'SENT';
        await createChat(chat);
      } else {
      }
    }
    reset({});
    await revalidateSpecificPath('/admin/chats/crear');
    router.push('/admin/chats/crear');
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
          crear chat club
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
        <Controller
          name="speakersId"
          control={control}
          rules={{ required: true }}
          shouldUnregister={true}
          render={({ field, formState }) => {
            return (
              <Select
                items={speakers}
                value={field.value}
                onChange={field.onChange}
                onSelectionChange={field.onChange}
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
                // selectedKeys={[field.value]}
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
        {chatForEdit ? (
          <div className="col-span-2 h-fit flex gap-4">
            <Button radius="sm" className=" w-1/2">
              <Link className="w-full" href={'/admin/chats/crear'} replace={false}>
                Cancelar edición
              </Link>
            </Button>
            <Button
              type="submit"
              name="edit"
              radius="sm"
              className="bg-gradient-to-tr from-primary-1 to-emerald-500 text-white w-1/2"
              isDisabled={!isValid || isSubmitting}
            >
              Editar
            </Button>
          </div>
        ) : (
          <div className="col-span-2 h-fit flex gap-4">
            <Button
              type="submit"
              name="schedule"
              radius="sm"
              className="bg-gradient-to-tr from-primary-1 to-emerald-500 text-white w-1/2"
              isDisabled={!isValid || isSubmitting}
            >
              Agendar
            </Button>
            <Button
              type="submit"
              name="send"
              radius="sm"
              isDisabled={!isValid || isSubmitting}
              className=" w-1/2"
            >
              Enviar
            </Button>
          </div>
        )}
      </form>
    </>
  );
};

export default ChatCreationForm;
