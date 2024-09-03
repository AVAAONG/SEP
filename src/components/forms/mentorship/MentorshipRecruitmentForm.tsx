'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import FormNavigationButtons from '../common/FormNavigationButtons';
import StepOne from './formSteps/step1';
import StepFour from './formSteps/StepFour';
import StepThree from './formSteps/StepThree';
import StepTwo from './formSteps/StepTwo';
import MentorSchema, { MentorSchemaType } from './schema';

export const STORAGE_KEY = 'mentorFormData';
const CURRENT_STEP_KEY = 'mentorFormStep';

const MentorshipRecruitmentForm = () => {
  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState(0);
  const methods = useForm<MentorSchemaType>({
    resolver: zodResolver(MentorSchema),
    mode: 'onChange',
  });

  const { handleSubmit, trigger, getValues, reset, control } = methods;

  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    const currentStep = localStorage.getItem(CURRENT_STEP_KEY);

    if (storedData) {
      const formStoredData = JSON.parse(storedData);
      reset({
        ...formStoredData,
        cv: ''
      });
    }

    if (currentStep) {
      const stepNumber = Number(currentStep);
      setCompletedSteps(stepNumber);
      setStep(stepNumber);
    }
  }, [reset]);
  const onSubmit: SubmitHandler<MentorSchemaType> = (data) => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(CURRENT_STEP_KEY);
    reset({}, { keepErrors: false });
    // Here you would typically send the data to your backend
  };

  const nextStep = async () => {
    const fields = getStepFields(step);
    const isStepValid = await trigger(fields);
    if (isStepValid) {
      const storedData = localStorage.getItem(STORAGE_KEY);
      let photo;
      if (storedData) {
        const formStoredData = JSON.parse(storedData);
        photo = formStoredData.photo;
      }
      const updatedData = getValues();
      updatedData.photo = photo;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
      localStorage.setItem(CURRENT_STEP_KEY, (step + 1).toString());
      setStep((prevStep) => prevStep + 1);
      setCompletedSteps((prevCompleted) => Math.max(prevCompleted, step + 1));
    }
  };
  const goToStep = (step: number) => {
    setStep(step);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const getStepFields = (currentStep: number): Array<keyof MentorSchemaType> => {
    switch (currentStep) {
      case 1:
        return [
          'photo',
          'first_name',
          'last_name',
          'id_number',
          'birth_date',
          'residence',
          'phone',
          'email',
        ];
      case 2:
        return [
          'profession',
          'employed',
          'company',
          'position',
          'work_experience',
          'related_experience',
          'other_activities',
          'cv',
          'speaks_other_lang',
          'other_lang',
          'lang_level',
        ];
      case 3:
        return [
          'interests',
          'hobbies',
          'mentor_reason',
          'prev_mentor_exp',
          'prev_mentor_desc',
          'skills_strengths',
          'trust_techniques',
          'mentee_support',
          'time_commitment',
          'ideal_mentee',
          'group_activities',
        ];
      case 4:
        return ['instagram', 'linkedin', 'referral_source'];
      default:
        return [];
    }
  };
  const buttonNavigationInfo = [
    {
      label: 'Información Personal',
      onClickFnc: () => goToStep(1),
      step: 1,
    },
    {
      label: 'Experiencia y Formación',
      onClickFnc: () => goToStep(2),
      step: 2,
    },
    {
      label: 'Motivación y Compromiso',
      onClickFnc: () => goToStep(3),
      step: 3,
    },
    {
      label: 'Redes Sociales',
      onClickFnc: () => goToStep(4),
      step: 4,
    },
  ];


  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-8 w-full">
      <div className="w-full flex flex-col justify-center gap-8">
        <FormNavigationButtons buttonInfo={buttonNavigationInfo} completedSteps={5} />
      </div>
      <div className="space-y-5 md:col-span-5">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
            {step === 1 && <StepOne />}
            {step === 2 && <StepTwo formControl={control} />}
            {step === 3 && <StepThree formControl={control} />}
            {step === 4 && <StepFour />}

            <div className="w-full flex justify-end mt-6 gap-4">
              {step > 1 && (
                <Button onClick={prevStep} radius="sm" type="button">
                  Previous
                </Button>
              )}
              {step < 4 ? (
                <Button radius="sm" color="success" type="button" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button radius="sm" type="submit" color="success">
                  Submit
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default MentorshipRecruitmentForm;
