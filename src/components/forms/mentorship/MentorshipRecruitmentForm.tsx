'use client';

import ImageUpload from '@/components/fields/ImageInputField';
import InputField from '@/components/fields/InputFormField';
import SelectFormField from '@/components/fields/SelectFormField';
import TextAreaFormField from '@/components/fields/TextAreaFormField';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import FormNavigationButtons from '../common/FormNavigationButtons';
import MentorSchema, { MentorSchemaType } from './schema';

const STORAGE_KEY = 'mentorFormData';
const CURRENT_STEP_KEY = 'mentorFormStep';

const MentorshipRecruitmentForm = () => {
  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState(0);
  const methods = useForm<MentorSchemaType>({
    resolver: zodResolver(MentorSchema),
    mode: 'all',
  });

  const { handleSubmit, trigger, getValues, reset } = methods;

  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    const currentStep = localStorage.getItem(CURRENT_STEP_KEY);
    if (storedData) {
      reset(JSON.parse(storedData));
    }
    if (currentStep) {
      setCompletedSteps(Number(currentStep));
    }
  }, [reset]);

  const onSubmit = (data: MentorSchemaType) => {
    console.log(data);
    localStorage.removeItem(STORAGE_KEY);
    reset({}, { keepErrors: false });
  };

  const nextStep = async () => {
    const fields = getStepFields(step);
    const isStepValid = await trigger(fields);
    if (isStepValid) {
      const updatedData = getValues();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
      localStorage.setItem(CURRENT_STEP_KEY, (step + 1).toString());
      setStep(step + 1);
      setCompletedSteps(step + 1);
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

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="space-y-0.5 col-start-2 col-span-5">
              <h2 className="text-2xl font-bold ">Información Personal</h2>
              <p className="text-muted-foreground">Postulación al programa de mentoria AVAA</p>
              <div className="w-full h-0.5 bg-primary-light opacity-40" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full md:col-span-2">
                <ImageUpload name="photo" />
              </div>
              <InputField
                isRequired
                label="Nombres"
                type="text"
                name="first_name"
                placeholder="Juan"
              />
              <InputField
                isRequired
                label="Apellidos"
                type="text"
                name="last_name"
                placeholder="Pérez"
              />
              <InputField
                isRequired
                label="Cédula de Identidad"
                type="number"
                name="id_number"
                placeholder="12345678"
              />
              <InputField isRequired type="date" label="Fecha de nacimiento" name="birth_date" />
              <InputField
                isRequired
                label="Lugar de residencia (ciudad, país)"
                type="text"
                name="residence"
                placeholder="Caracas, Venezuela"
              />
              <InputField
                isRequired
                label="Número telefónico asociado a WhatsApp"
                type="tel"
                name="phone"
                placeholder="+58 412 1234567"
              />
              <InputField
                isRequired
                label="Correo electrónico"
                type="email"
                name="email"
                placeholder="juanperez@example.com"
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="space-y-0.5 col-start-2 col-span-5">
              <h2 className="text-2xl font-bold ">Experiencia y Formación</h2>
              <p className="text-muted-foreground">Postulación al programa de mentoria AVAA</p>
              <div className="w-full h-0.5 bg-primary-light opacity-40" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                isRequired
                label="Profesión"
                type="text"
                name="profession"
                placeholder="Ingeniero"
              />
              <SelectFormField
                isRequired
                label="¿Trabaja actualmente?"
                name="employed"
                selectItems={[
                  { label: 'Sí', value: 'true' },
                  { label: 'No', value: 'false' },
                ]}
              />
              <InputField
                label="Empresa, institución u organización donde trabaja"
                type="text"
                name="company"
                placeholder="Empresa XYZ"
              />
              <InputField
                label="Cargo u ocupación"
                type="text"
                name="position"
                placeholder="Gerente de Proyectos"
              />
              <TextAreaFormField
                label="Experiencia laboral en tu área de ocupación"
                name="work_experience"
              />
              <TextAreaFormField
                label="Formación o experiencia en psicología, educación, liderazgo, comunicación o emprendimiento"
                name="related_experience"
              />
              <InputField
                label="Otras actividades u oficios"
                type="text"
                name="other_activities"
                placeholder="Voluntariado, proyectos personales, etc."
              />
              {/* <InputField
                isRequired
                type="file"
                label="Resumen de CV"
                name="cv"
                accept=".pdf,.doc,.docx"
              /> */}
              <SelectFormField
                isRequired
                label="¿Hablas otro idioma?"
                name="speaks_other_lang"
                selectItems={[
                  { label: 'Sí', value: 'true' },
                  { label: 'No', value: 'false' },
                ]}
              />
              <InputField
                label="Especifica el idioma"
                type="text"
                name="other_lang"
                placeholder="Inglés"
              />
              <SelectFormField
                label="Nivel de idioma"
                name="lang_level"
                selectItems={[
                  { label: 'Básico', value: 'BASIC' },
                  { label: 'Intermedio', value: 'INTERMEDIATE' },
                  { label: 'Avanzado', value: 'ADVANCED' },
                ]}
              />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="space-y-0.5 col-start-2 col-span-5">
              <h2 className="text-2xl font-bold ">Motivación y Compromiso</h2>
              <p className="text-muted-foreground">Postulación al programa de mentoria AVAA</p>
              <div className="w-full h-0.5 bg-primary-light opacity-40" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                isRequired
                label="Áreas de interés personal (al menos 2)"
                type="text"
                name="interests"
                placeholder="Tecnología, Educación"
              />
              <InputField
                isRequired
                label="Hobbies (al menos 2)"
                type="text"
                name="hobbies"
                placeholder="Lectura, Senderismo"
              />
              <TextAreaFormField
                isRequired
                label="¿Por qué deseas ser Mentor en la AVAA?"
                name="mentor_reason"
              />
              <SelectFormField
                isRequired
                label="¿Has sido mentor anteriormente?"
                name="prev_mentor_exp"
                selectItems={[
                  { label: 'Sí', value: 'true' },
                  { label: 'No', value: 'false' },
                ]}
              />
              <TextAreaFormField
                label="Comenta brevemente tu experiencia como mentor"
                name="prev_mentor_desc"
              />
              <TextAreaFormField
                label="¿Qué habilidades y fortalezas posees que te hacen un buen candidato para ser mentor?"
                name="skills_strengths"
              />
              <TextAreaFormField
                label="¿Qué técnicas utilizas para construir relaciones de confianza y respeto con otras personas?"
                name="trust_techniques"
              />
              <TextAreaFormField
                label="¿Qué tipo de apoyo u orientación esperas brindar a tu mentee?"
                name="mentee_support"
              />
              <InputField
                isRequired
                label="¿Cuánto tiempo estimas dedicar al desarrollo del programa de mentoría?"
                type="text"
                name="time_commitment"
                placeholder="Ej: 2 horas semanales"
              />
              <TextAreaFormField
                label="¿Cómo describirías a tu mentee ideal?"
                name="ideal_mentee"
              />
              <SelectFormField
                isRequired
                label="¿Estás dispuesto a participar en actividades grupales, eventos o talleres organizados por la AVAA?"
                name="group_activities"
                selectItems={[
                  { label: 'Sí', value: 'true' },
                  { label: 'No', value: 'false' },
                ]}
              />
            </div>
          </>
        );
      case 4:
        return (
          <>
            <div className="space-y-0.5 col-start-2 col-span-5">
              <h2 className="text-2xl font-bold ">Redes Sociales</h2>
              <p className="text-muted-foreground">Postulación al programa de mentoria AVAA</p>
              <div className="w-full h-0.5 bg-primary-light opacity-40" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Instagram" type="text" name="instagram" placeholder="@usuario" />
              <InputField
                label="LinkedIn"
                type="text"
                name="linkedin"
                placeholder="https://www.linkedin.com/in/usuario"
              />
              <InputField
                isRequired
                label="¿Cómo te enteraste del programa de Mentoría de la Asociación Venezolano Americana de Amistad?"
                type="text"
                name="referral_source"
                placeholder="Redes sociales, amigo, etc."
              />
            </div>
          </>
        );
      default:
        return null;
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
        <FormNavigationButtons buttonInfo={buttonNavigationInfo} completedSteps={completedSteps} />
      </div>
      <div className="space-y-5 md:col-span-5">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
            {renderStep()}
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
                <Button radius="sm" type="submit">
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
