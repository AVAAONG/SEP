import { MODALITY, PROGRAM_COMPONENTS, WORKSHOP_YEAR } from '@/lib/constants';
import {
  Avatar,
  Button,
  Checkbox,
  CheckboxGroup,
  Chip,
  Input,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react';
import { Prisma, Speaker, Workshop, WorkshopYear } from '@prisma/client';
import { BaseSyntheticEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR, { Fetcher } from 'swr';
import DateInput from '../commons/DateInput';
import PlatformInput from '../commons/PlatformInput';

const workshopWithSpeaker = Prisma.validator<Prisma.WorkshopDefaultArgs>()({
  include: {
    speaker: true,
  },
});
export type WorkshopWithSpeaker = Prisma.WorkshopGetPayload<typeof workshopWithSpeaker>;

const WorkshopCreationForm = () => {
  const { register, handleSubmit, reset, watch } = useForm<WorkshopWithSpeaker>();
  const [checkedYears, setCheckedYears] = useState<WorkshopYear[]>([]);
  const modality = watch('modality');
  const fetcher: Fetcher<{ speakers: Speaker[] } | {}[], string> = (...args) =>
    fetch([...args].join('')).then((res) => res.json());

  const { data, isLoading } = useSWR('/admin/api/speakers/workshops', fetcher, {
    fallbackData: [{}],
  });
  const handleFormSubmit = async (
    formWorkshopData: Workshop,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    formWorkshopData.year = checkedYears;
    console.log(formWorkshopData);
    if (event === undefined) return;
    event.preventDefault();
    reset();
    setCheckedYears([]);
  };

  return (
    <form
      onSubmit={handleSubmit(
        async (data: Workshop, event: BaseSyntheticEvent<object, any, any> | undefined) =>
          await handleFormSubmit(data, event!)
      )}
      className="grid grid-cols-2 w-full space-y-9 gap-x-4 items-center justify-center p-4"
    >
      <h1 className="col-span-2 mb-3 text-center w-full font-semibold text-2xl text-primary-light uppercase tracking-widest">
        crear actividad formativa
      </h1>
      <Input
        isClearable
        isRequired
        type="text"
        label="Título"
        radius="sm"
        classNames={{ base: 'col-span-2 h-fit' }}
        labelPlacement="outside"
        {...register('title')}
        aria-required="true"
      />

      <DateInput register={register} />
      <Select
        radius="sm"
        label="Competencia asociada"
        isRequired
        classNames={{ mainWrapper: 'md:mt-6', base: 'col-span-2 md:col-span-1' }}
        {...register('asociated_skill')}
        labelPlacement="outside"
      >
        {PROGRAM_COMPONENTS.map((animal) => (
          <SelectItem key={animal.value} value={animal.value}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
      {isLoading || !('speakers' in data) || data.speakers.length < 3 ? (
        <Input
          radius="sm"
          isDisabled
          type="text"
          defaultValue="Cargando facilitadores"
          className="animate-pulse"
        />
      ) : (
        <Select
          items={data.speakers as Speaker[]}
          radius="sm"
          label="Facilitador"
          isRequired
          {...register(`speaker`)}
          labelPlacement="outside"
          isMultiline={true}
          selectionMode="multiple"
          classNames={{
            base: 'col-span-2 md:col-span-1',
            trigger: 'min-h-unit-12 py-2',
          }}
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
      )}

      <Input
        classNames={{ base: 'col-span-2 md:col-span-1' }}
        radius="sm"
        {...register('avalible_spots', {
          valueAsNumber: true,
        })}
        type="number"
        isRequired
        min={0}
        max={300}
        label="Cupos disponibles"
        labelPlacement="outside"
      />
      <Select
        classNames={{ base: 'col-span-2 md:col-span-1' }}
        radius="sm"
        label="Modalidad"
        {...register('modality')}
        labelPlacement="outside"
      >
        {MODALITY.map((animal) => (
          <SelectItem key={animal.value} value={animal.value}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>

      <div className="col-span-2 md:col-span-1">
        <PlatformInput modality={modality} registerFunction={register} />
      </div>
      <CheckboxGroup
        {...register('year')}
        isRequired={true}
        color="success"
        label="Año"
        orientation="horizontal"
        classNames={{ base: 'col-span-2' }}
        value={checkedYears}
        onChange={(e) => setCheckedYears(e as WorkshopYear[])}
      >
        {WORKSHOP_YEAR.map((year) => (
          <Checkbox key={year} radius="sm" value={year}>
            {year}
          </Checkbox>
        ))}
      </CheckboxGroup>
      <Textarea
        radius="sm"
        {...register('description')}
        label="Descripción"
        labelPlacement="outside"
        classNames={{
          base: 'col-span-2 h-fit w-full',
        }}
        placeholder="(Opcional) Coloca la descripcion de la actividad"
      />
      <div className="col-span-2 h-fit flex gap-4">
        <Button
          type="submit"
          radius="sm"
          className="bg-gradient-to-tr from-primary-1 to-emerald-500 text-white w-1/2"
        >
          Agendar
        </Button>
        <Button radius="sm" className=" w-1/2">
          Enviar
        </Button>
      </div>
    </form>
  );
};

export default WorkshopCreationForm;
