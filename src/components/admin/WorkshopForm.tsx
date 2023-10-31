import { MODALITY, PROGRAM_COMPONENTS, WORKSHOP_YEAR } from '@/lib/constants';
import { Platform } from '@/types/General';
import { Workshop as FormTypeWorkshop } from '@/types/Workshop';
import { Checkbox, CheckboxGroup, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import DateInput from '../commons/DateInput';
import PlatformInput from '../commons/PlatformInput';

/**
 * @description Normalizes the string inputs to be used as keys in the database
 * @param data String to be normalized
 * @returns Normalized string
 */
const normalizeStringInputs = (data: string) => {
  const normalizedData = data.trim().toUpperCase().replaceAll(' ', '_');
  return normalizedData;
};

const WorkshopForm = () => {
  const { register, handleSubmit, reset, watch } = useForm<FormTypeWorkshop>();
  const modality = watch('modality');
  const scheduleWorkshop = async (
    formWorkshopData: FormTypeWorkshop,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    if (event === undefined) return;
    console.log(formWorkshopData);
    event.preventDefault();
    formWorkshopData.platform =
      formWorkshopData.modality.toLowerCase() === 'online'
        ? (normalizeStringInputs(formWorkshopData.platform) as Platform)
        : formWorkshopData.platform;
    await fetch('/admin/api/workshops/schedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formWorkshopData),
    });
    // reset();
  };

  return (
    <form
      onSubmit={handleSubmit(async (data, event) => await scheduleWorkshop(data, event!))}
      className="grid gap-6 grid-cols-2 md:grid-rows-2 w-full"
    >
      <Input
        type="text"
        label="Título"
        radius="sm"
        classNames={{ base: 'col-span-2' }}
        labelPlacement="outside"
        {...register('title')}
        aria-required="true"
      />

      <DateInput register={register} />

      <div className="col-span-2 md:col-span-1 flex w-full flex-wrap md:flex-nowrap gap-4">
        <Select label="Competencia asociada" {...register('pensum')} labelPlacement="outside">
          {PROGRAM_COMPONENTS.map((animal) => (
            <SelectItem key={animal.value} value={animal.value}>
              {animal.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="col-span-2 md:col-span-1">
        <Select label="Facilitador" {...register('pensum')} labelPlacement="outside">
          {PROGRAM_COMPONENTS.map((animal) => (
            <SelectItem key={animal.value} value={animal.value}>
              {animal.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="col-span-2 md:col-span-1">
        <Input
          {...register('spots')}
          type="number"
          required
          min={0}
          max={300}
          label="cupos disponibles"
          labelPlacement="outside"
        />
      </div>
      <div className="col-span-2 md:col-span-1">
        <Select label="Modalidad" {...register('pensum')} labelPlacement="outside">
          {MODALITY.map((animal) => (
            <SelectItem key={animal.value} value={animal.value}>
              {animal.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="col-span-2 md:col-span-1">
        <PlatformInput modality={modality} registerFunction={register} />
      </div>
      <CheckboxGroup
        color="success"
        label="Año"
        orientation="horizontal"
        classNames={{ base: 'col-span-2' }}
      >
        {WORKSHOP_YEAR.map((year) => (
          <Checkbox value={year}>{year}</Checkbox>
        ))}
      </CheckboxGroup>
      <div className="col-span-2 h-fit">
        <Textarea
          {...register('description')}
          label="Description"
          labelPlacement="outside"
          placeholder="Enter your description"
        />
      </div>
      <div className="col-span-2 h-fit flex  gap-4">
        <button
          type="submit"
          className="w-1/2 justify-self-center  text-white bg-gradient-to-br from-emerald-500 to-lime-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none  focus:ring-green-800 font-semibold rounded-lg text-xs px-5 py-2.5 text-center mr-2 mb-2"
        >
          Agendar actividad formativa
        </button>
        <button className="relative w-1/2 inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-emerald-800 group-hover:from-green-400 group-hover:to-green-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
          <span className="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-slate-950 rounded-md group-hover:bg-opacity-0">
            Enviar actividad formativa
          </span>
        </button>
      </div>
    </form>
  );
};

export default WorkshopForm;
