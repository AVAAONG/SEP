'use client';
import { MODALITY, PROGRAM_COMPONENTS, WORKSHOP_TYPES, WORKSHOP_YEAR } from '@/lib/constants';
import { formatDates } from '@/lib/googleAPI/calendar/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Checkbox, CheckboxGroup } from '@nextui-org/checkbox';
import { Chip } from '@nextui-org/chip';
import { Input, Textarea } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';
import { Modality, Prisma, Skill, WorkshopYear } from '@prisma/client';
import { BaseSyntheticEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import DateInput from '../commons/DateInput';
import PlatformInput from '../commons/PlatformInput';

const workshopCreationFormSchema = z.object({
  title: z.string().min(1, { message: 'El titulo no puede estar vacio' }),
  kindOfWorkshop: z.string().min(1, { message: 'Debes especificar el tipo de actividad' }),
  dates: z.string().refine((date) => new Date(date) >= new Date(), {
    message: 'La fecha no puede ser menor a la actual',
  }),
  startHours: z.string(),
  endHours: z.string(),
  modality: z.nativeEnum(Modality),
  asociated_skill: z.nativeEnum(Skill),
  avalible_spots: z.string().min(1, { message: 'Debes tener al menos un cupo disponible' }),
  platformOnline: z.string().min(1, { message: 'Debes elegir una plataforma' }).optional(),
  platformInPerson: z
    .string()
    .min(1, { message: 'Debes colocar el lugar de la actividad' })
    .optional(),
  speakersId: z.string().min(1, { message: 'Debes elegir al menos un facilitador' }),
  year: z.nativeEnum(WorkshopYear).array().min(1, { message: 'Debes elegir al menos un año' }),
  description: z.string().optional(),
});

interface WorkshopCreationFormProps {
  speakers: {
    id: string;
    first_names: string;
    last_names: string;
    email: string;
    image?: string;
  }[];
}
const WorkshopCreationForm: React.FC<WorkshopCreationFormProps> = ({ speakers }) => {
  const { control, handleSubmit, watch } = useForm<z.infer<typeof workshopCreationFormSchema>>({
    resolver: zodResolver(workshopCreationFormSchema),
    defaultValues: {
      title: 'Taller de prueba',
      dates: '2024-09-30',
      startHours: '10:00',
      endHours: '12:00',
      avalible_spots: '20',
      asociated_skill: 'SELF_MANAGEMENT',
      modality: 'ONLINE',
      kindOfWorkshop: 'WORKSHOP',
      year: ['I'],
    },
  });
  const modality = watch('modality');
  const handleFormSubmit = (
    data: z.infer<typeof workshopCreationFormSchema>,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    const buttonType = ((event?.nativeEvent as SubmitEvent)?.submitter as HTMLButtonElement)?.name;
    const workshopSpeakersId = data.speakersId.split(',');
    const dates = formatDates(data.dates, data.startHours, data.endHours);
    const workshopSpeakers = workshopSpeakersId.map((speakerId) => {
      const s = speakers.find((speaker) => speaker.id === speakerId);
      return { id: s?.id, name: `${s?.first_names} ${s?.last_names}`, email: s?.email };
    });
    const workshop: Prisma.WorkshopCreateArgs = {
      data: {
        title: data.title,
        avalible_spots: z.coerce.number().parse(data.avalible_spots),
        platform: data.platformInPerson ? data.platformInPerson : data.platformOnline!,
        description: data.description ? data.description : null,
        kindOfWorkshop: data.kindOfWorkshop,
        calendar_ids: [],
        ...dates,
        year: data.year as unknown as WorkshopYear[],
        modality: data.modality,
        asociated_skill: data.asociated_skill,
        activity_status: 'SCHEDULED',
        speaker: {
          connect: workshopSpeakers.map((speaker) => ({ id: speaker.id })),
        },
      },
    };
    console.log(workshop);

    if (buttonType === 'schedule') {
      //creamos el evento o los eventos en el calendario
      //le mandamos al facilitador una invitacion a la reunion
      //agregamos los ids al workshop
      //creamos el workshop en la base de datos
    } else if (buttonType === 'send') {
      //creamos la reunion en zoom, si existe
      //creamos el evento o los eventos en el calendario
      //creamos la runion
      //agregamos los ids al workshop
      //creamos el workshop en la base de datos
    } else {
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit((data, event) => handleFormSubmit(data, event))}
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
        <DateInput control={control} />
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
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.['avalible_spots']?.message}
                errorMessage={formState.errors?.['avalible_spots']?.message?.toString()}
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
                value={field.value}
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
          >
            Agendar
          </Button>

          <Button type="submit" name="send" radius="sm" className=" w-1/2">
            Enviar
          </Button>
        </div>
      </form>
    </>
  );
};

export default WorkshopCreationForm;
