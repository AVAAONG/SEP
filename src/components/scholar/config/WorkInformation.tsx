'use client';
import LoadingModal from '@/components/scholar/forms/LoadingModal';
import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface WorkInformationProps {
  title: string;
  id: string;
  workScholarInformation: {
    isCurrentlyWorking: string;
    organizationName: string;
    positionHeld: string;
    workModality: string;
    weeklyHours: Number;
  };
}

const WorkInformation = ({ workScholarInformation, id, title }: WorkInformationProps) => {
  const [updatinState, changeUpdatingState] = useState<'updating' | 'updated' | 'error' | 'none'>(
    'none'
  );

  useEffect(() => {
    if (updatinState === 'updated') {
      setTimeout(() => {
        changeUpdatingState('none');
      }, 3000);
    }
  }, [updatinState]);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      ...workScholarInformation,
    },
  });

  const saveData = async (data: any, event: BaseSyntheticEvent) => {
    event.preventDefault();
    changeUpdatingState('updating');
    data.weeklyHours = Number(data.weeklyHours);
    if (data.isCurrentlyWorking === 'TRUE') data.isCurrentlyWorking = true;
    else data.isCurrentlyWorking = false;
    const response = await fetch(`/becario/api/scholar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data, id }),
    });
    if (response.status === 200) {
      changeUpdatingState('updated');
    } else {
      changeUpdatingState('error');
    }
  };

  if (updatinState !== 'none') {
    return <LoadingModal state={updatinState} changeState={changeUpdatingState} />;
  } else {
    return (
      <>
        <h3 className="text-green-900 mb-4 text-xl font-semibold dark:text-white">{title}</h3>
        <form action="#">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="isCurrentlyWorking"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ¿Te Encuentras trabajando actualmente?
              </label>
              <select
                {...register('isCurrentlyWorking')}
                className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
              >
                <option value="TRUE">Si</option>
                <option value="FALSE">No</option>
              </select>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="collage"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Modalidad de Trabajo
              </label>
              <select
                {...register('workModality')}
                className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
              >
                <option value="PRESENCIAL">Presencial</option>
                <option value="VIRTUAL">Virtual</option>
                <option value="HIBRIDA">Hibrida</option>
              </select>
            </div>
            <div className="col-span-2">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ¿Nombre de la organizacion / Empresa?
              </label>
              <input type="text" {...register('organizationName')} placeholder="AVAA" required />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Cargo que desempeñas
              </label>
              <input
                type="text"
                {...register('positionHeld')}
                placeholder="Community Manager"
                required
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="collage"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Horas de trabajo Semanales
              </label>
              <input type="number" {...register('weeklyHours')} min={0} required />
            </div>
            <div className="col-span-full">
              <button
                onClick={handleSubmit((data, event) => saveData(data, event!))}
                className="text-white bg-green-600 hover:bg-green-500 hover:text-green-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="submit"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </form>
      </>
    );
  }
};

export default WorkInformation;
