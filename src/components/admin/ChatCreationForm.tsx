'use client';
import { createCalendarEvent } from '@/lib/calendar/calendar';
import { IChatCalendar } from '@/lib/calendar/d';
import { formatDates } from '@/lib/calendar/utils';
import { CHAT_LEVELS, MODALITY } from '@/lib/constants';
import { createChat } from '@/lib/db/utils/chats';
import chatCreationFormSchema from '@/lib/schemas/chatCreationFormSchema';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import { Input, Textarea } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';
import { Prisma } from '@prisma/client';
import { BaseSyntheticEvent } from 'react';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
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
  chatForEdit: z.infer<typeof chatCreationFormSchema> | null;
}
const ChatCreationForm: React.FC<ChatCreationFormProps> = ({
  speakers,
  chatForEdit,
}) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
  } = useForm<z.infer<typeof chatCreationFormSchema>>({
    resolver: zodResolver(chatCreationFormSchema),
    // defaultValues: chatForEdit!,
    defaultValues: {
      title: 'Chat de prueba',
      dates: [
        {
          date: '2024-01-31',
          startHour: '13:00',
          endHour: '14:00',
        },
      ],
      level: 'BASIC',
      modality: 'IN_PERSON',
      speakersId: 'pEsSon3-arJyIQ7vxURmj',
      platformInPerson: 'Oficinas de avaa',
    },
  });
  const modality = useWatch({
    control,
    name: 'modality',
  });
  const fieldArray = useFieldArray({
    control,
    name: 'dates',
  });

  const handleFormSubmit = async (
    data: z.infer<typeof chatCreationFormSchema>,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    const buttonType = ((event?.nativeEvent as SubmitEvent)?.submitter as HTMLButtonElement)?.name;
    const dates = await formatDates(data.dates);
    const chatSpeakersId = data.speakersId.split(',');


    const calendarChat: IChatCalendar = {
      platform: data.platformInPerson ? data.platformInPerson : data.platformOnline!,
      speakersData: chatSpeakersId.map((speakerId: string) => {
        const speaker = speakers.find((speaker) => speaker.id === speakerId);
        return {
          id: speaker?.id!,
          speakerName: `${speaker?.first_names} ${speaker?.last_names}` || '',
          speakerEmail: speaker?.email || '',
        };
      }),
      ...dates,
      ...data,
    };
    const [eventsIds, meetingDetails] = await createCalendarEvent(calendarChat);

    const chat: Prisma.ChatCreateArgs = {
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

    if (buttonType === 'schedule') {
      chat.data.activity_status = 'SCHEDULED';
      await createChat(chat);
    } else if (buttonType === 'send') {
      chat.data.activity_status = 'SENT';
      await createChat(chat);
    } else {
    }
    reset();
    await revalidateSpecificPath('/admin/actividadesFormativas/crear');
  };

  return (
    <>
      <form
        onSubmit={handleSubmit((data, event) => handleFormSubmit(data, event))}
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
          render={({ field, formState }) => {
            return (
              <Select
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.['level']?.message}
                errorMessage={formState.errors?.['level']?.message?.toString()}
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                radius="sm"
                label="Nivel"
                defaultSelectedKeys={[field.value]}
                labelPlacement="outside"
              >
                {CHAT_LEVELS.map((chatLevel) => (
                  <SelectItem key={chatLevel.value} value={chatLevel.value}>
                    {chatLevel.label}
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
      </form>
    </>
  );
};

export default ChatCreationForm;
