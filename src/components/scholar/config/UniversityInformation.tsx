'use client';
import LoadingModal from '@/components/scholar/forms/LoadingModal';
import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import UNIVERSITY_OPTIONS from '@/components/scholar/forms/data/universityOptions';

interface UniversityInformationProps {
  scholarCollageInfo: {
    collage: string;
    carrer: string;
    studyArea: string;
    currentAcademicPeriod: string;
    grade: string;
    gradeKind: string;
    classModality: string;
    academicPeriodType: string;
  };
  id: string;
  title: string;
}

const UniversityInformation = ({
  scholarCollageInfo,
  id,
  title,
}: UniversityInformationProps) => {
  const [updatinState, changeUpdatingState] = useState<
    'updating' | 'updated' | 'error' | 'none'
  >('none');

  useEffect(() => {
    if (updatinState === 'updated') {
      setTimeout(() => {
        changeUpdatingState('none');
      }, 3000);
    }
  }, [updatinState]);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      ...scholarCollageInfo,
    },
  });

  const saveData = async (data: any, event: BaseSyntheticEvent) => {
    event.preventDefault();
    changeUpdatingState('updating');
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
    return (
      <LoadingModal state={updatinState} changeState={changeUpdatingState} />
    );
  } else {
    return (
      <>
        <h3 className="text-green-900 mb-4 text-xl font-semibold dark:text-white">
          {title}
        </h3>
        <form action="#">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="collage"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Universidad
              </label>
              <select
                {...register('collage')}
                className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
              >
                {UNIVERSITY_OPTIONS.map(({ name, value }, index) => (
                  <option value={value} key={index}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="carrer"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Carrera
              </label>
              <input
                type="text"
                {...register('carrer')}
                placeholder="Ingenieria en sistemas"
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="classModality"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Modalidad de clases
              </label>
              <select
                {...register('classModality')}
                className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
              >
                <option value="PRESENCIAL">Presencial</option>
                <option value="VIRTUAL">Virtual</option>
                <option value="HIBRIDA">Hibrida</option>
              </select>
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="studyArea"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Area de estudio
              </label>
              <input
                type="text"
                {...register('studyArea')}
                placeholder=""
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="academicPeriodType"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tipo de periodo academico academico
              </label>
              <select
                {...register('academicPeriodType')}
                className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
              >
                <option value="SEMESTRE">Semestral</option>
                <option value="TRIMESTRE">Trimestral</option>
                <option value="AÑO">Anual</option>
              </select>
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="currentAcademicPeriod"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Periodo academico actual
              </label>
              <input
                type="number"
                {...register('currentAcademicPeriod')}
                placeholder="1"
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="gradeKind"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ¿Cómo se colocan las notas en tu universidad?
              </label>
              <select
                {...register('gradeKind')}
                className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
              >
                <option value="5">0 - 5</option>
                <option value="10">0 - 10</option>
                <option value="20">0 - 20</option>
              </select>
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="grade"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Periodo academico actual
              </label>
              <input
                type="number"
                {...register('grade')}
                placeholder="19"
                required
              />
            </div>

            <div className="col-span-6 sm:col-full">
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

export default UniversityInformation;
