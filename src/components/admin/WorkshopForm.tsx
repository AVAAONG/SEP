import { MODALITY, PLATFORMS, PROGRAM_COMPONENTS, WORKSHOP_YEAR } from '@/lib/constants';
import { Platform } from '@/types/General';
import { Workshop as FormTypeWorkshop } from '@/types/Workshop';
import { WorkshopSpeaker } from '@prisma/client';
import { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import useSWR, { Fetcher } from 'swr';

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
  const { register, handleSubmit, reset } = useForm<FormTypeWorkshop>();
  ///@ts-ignore
  const fetcher: Fetcher<WorkshopSpeaker[] | {}[], string> = (...args) =>
    fetch([...args]).then((res) => res.json());

  const { data, isLoading } = useSWR('/admin/api/speakers/workshops', fetcher, {
    fallbackData: [{}, {}],
  });

  const scheduleWorkshop = async (
    formWorkshopData: FormTypeWorkshop,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    if (event === undefined) return;
    console.log(formWorkshopData)
    event.preventDefault();
    formWorkshopData.platform =
      formWorkshopData.modality.toLowerCase() === 'virtual'
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
      className="grid gap-6 md:grid-cols-2 md:grid-rows-2 caret-green-500 text-slate-300 w-full"
    >
      <div className="col-span-2 h-fit">
        <label className="block mb-2 text-xs m-l-1 font-semibold text-slate-400 uppercase">
          titulo del taller
        </label>
        <input {...register('title')} type={'text'} id={'Titulo del taller'} required={true} />
      </div>

      <div>
        <label className="block mb-2 text-xs font-semibold  text-slate-400 uppercase">
          Competencia asociada
        </label>
        <select
          {...register('pensum')}
          id="Competencia asociada"
          required={true}
          className="capitalize"
        >
          {PROGRAM_COMPONENTS.map((option, index) => {
            return (
              <option value={option.value} key={index}>
                {option.option}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <label className="block mb-2 text-xs m-l-1 font-semibold  text-slate-400 uppercase">
          fecha
        </label>
        <input {...register('date')} type={'date'} id={'Fecha'} required={true} />
      </div>

      <div>
        <label className="block mb-2 text-xs m-l-1 font-semibold  text-slate-400 uppercase">
          hora de inicio
        </label>
        <input {...register('startHour')} type={'time'} id={'Hora de inicio'} required={true} />
      </div>

      <div>
        <label className="block mb-2 text-xs m-l-1 font-semibold  text-slate-400 uppercase">
          hora de cierre
        </label>
        <input {...register('endHour')} type={'time'} id={'Hora de cierre'} required={true} />
      </div>

      <div>
        <label className="block mb-2 text-xs font-semibold  text-slate-400 uppercase">
          facilitador
        </label>
        {isLoading || data.length < 1 ? (
          <input {...register('speaker')} type="text" />
        ) :
          (<select {...register('speaker')} id="Facilitador" required={true}>
            {data.map((value) => {
              const { id, first_names, last_names, email } = value as WorkshopSpeaker;
              const fullName = `${first_names} ${last_names}`;
              return (
                <option key={id} value={`${id}+/+${fullName}+/+${email}`}>
                  {fullName}
                </option>
              );
            })}
          </select>)
        }
      </div>
      <div>
        <label className="block mb-2 text-xs font-semibold  text-slate-400 uppercase">
          cupos disponibles
        </label>
        <input {...register('spots')} type={'number'} id="first_name" required min={0} max={300} />
      </div>
      <div>
        <label className="block mb-2 text-xs font-semibold  text-slate-400 uppercase">
          modalidad
        </label>
        <select {...register('modality')} id="Modalidad" required={true} className="capitalize" >
          {MODALITY.map((option, index) => {
            return (
              <option value={option?.value} key={index}>
                {option?.option}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label className="block mb-2 text-xs font-semibold text-slate-400 uppercase">
          platafomra/lugar
        </label>
        <input list="allowedSelection" {...register('platform')} id={'Platafomra/Lugar'}></input>
        <datalist id="allowedSelection">
          {PLATFORMS.map((option) => {
            return (
              <option className="capitalize" key={option}>
                {option}
              </option>
            );
          })}
        </datalist>
      </div>
      <div className="col-span-2 h-fit flex flex-col">
        <p className="block mb-2 text-xs font-semibold  text-slate-400 uppercase">año del taller</p>
        <div className="flex">
          {WORKSHOP_YEAR.map((input) => {
            return (
              <div className="flex flex-row items-center mr-4" key={input}>
                <input
                  {...register('workshopYear')}
                  type="checkbox"
                  value={input}
                  id="year"
                  className="w-4 h-4 bg-emerald-900  accent-green-500 text-emerald-600 uppercase border-gray-300 focus:ring-0 "
                />
                <label htmlFor="year" className="ml-2 font-semibold text-xs ">
                  {input}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div className="col-span-2 h-fit">
        <label className="block mb-2 text-xs m-l-1 font-semibold max-h-10 text-slate-400 uppercase">
          descripción
        </label>
        <textarea {...register('description')} />
      </div>
      <div className="col-span-2 h-fit flex flex-col md:flex-row gap-4">
        <button
          type="submit"
          className="w-1/2 justify-self-center  text-white bg-gradient-to-br from-emerald-500 to-lime-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none  focus:ring-green-800 font-semibold rounded-lg text-xs px-5 py-2.5 text-center mr-2 mb-2"
        >
          Agendar Taller
        </button>
        <button className="relative w-1/2 inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-emerald-800 group-hover:from-green-400 group-hover:to-green-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
          <span className="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-slate-950 rounded-md group-hover:bg-opacity-0">
            Enviar taller
          </span>
        </button>
      </div>
    </form>
  );
};

export default WorkshopForm;
