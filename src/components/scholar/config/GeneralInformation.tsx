'use client';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import GENERAL_INFORMATION_INPUT_DATA from '@/components/scholar/forms/data/generalInformationFormData';
import LoadingModal from '@/components/scholar/forms/LoadingModal';

interface GeneralInformationProps {
  scholarGeneralInfo: {
    firstNames: string;
    lastNames: string;
    dni: string;
    gender: string;
    birthDate: string;
    cellPhoneNumber: string;
    avaaAdmissionYear: string;
    localPhoneNumber: string;
    email: string;
  };
  id: string;
  title: string;
}

const GeneralInformation = ({
  scholarGeneralInfo,
  id,
  title,
}: GeneralInformationProps) => {
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

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      ...scholarGeneralInfo,
    },
  });

  const saveData = async (data: any, event: BaseSyntheticEvent) => {
    event.preventDefault();
    changeUpdatingState('updating');
    data.birthDate = new Date(data.birthDate);
    data.avaaAdmissionYear = new Date(data.avaaAdmissionYear);
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
            {GENERAL_INFORMATION_INPUT_DATA.map((input, index) => {
              const { label, id, placeholder, required, type } = input;
              return (
                <div className="col-span-6 sm:col-span-3" key={index}>
                  <label
                    htmlFor={id}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {label}
                  </label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    {...register(id)}
                  />
                </div>
              );
            })}
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

export default GeneralInformation;
