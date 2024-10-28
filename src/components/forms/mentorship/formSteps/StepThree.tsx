import InputField from '@/components/fields/InputFormField';
import SelectFormField from '@/components/fields/SelectFormField';
import TextAreaFormField from '@/components/fields/TextAreaFormField';
import { useWatch } from 'react-hook-form';
const StepThree = ({ formControl }: { formControl: any }) => {
  const prevExperience = useWatch({
    control: formControl,
    name: 'prev_mentor_exp',
  });
  return (
    <>
      <div className="space-y-0.5 col-start-2 col-span-5">
        <h2 className="text-2xl font-bold">Motivación y Compromiso</h2>
        <p className="text-muted-foreground">Por favor, completa todos los campos requeridos</p>
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
        {/* <SelectFormField
          isRequired
          label="¿Estás dispuesto a participar en actividades, eventos o talleres organizados por la AVAA?"
          name="group_activities"
          selectItems={[
            { label: 'Sí', value: 'true' },
            { label: 'No', value: 'false' },
          ]}
        /> */}
        <InputField
          isRequired
          label="¿Cuánto tiempo estimas dedicar al desarrollo del programa de mentoría?"
          type="text"
          name="time_commitment"
          placeholder="Ej: 2 horas semanales"
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
          isDisabled={prevExperience === 'false'}
          isRequired={prevExperience === 'true'}
          className="!col-span-1 md:!col-span-2"
          label="Comenta brevemente tu experiencia como mentor"
          name="prev_mentor_desc"
        />
        <TextAreaFormField
          isRequired
          className="!col-span-1 md:!col-span-2"
          label="¿Por qué deseas ser Mentor en la AVAA?"
          name="mentor_reason"
        />

        <TextAreaFormField
          isRequired
          className="!col-span-1 md:!col-span-2"
          label="¿Qué habilidades y fortalezas posees que te hacen un buen candidato para ser mentor?"
          name="skills_strengths"
        />
        {/* <TextAreaFormField
          isRequired
          className="!col-span-1 md:!col-span-2"
          label="¿Qué técnicas utilizas para construir relaciones de confianza y respeto con otras personas?"
          name="trust_techniques"
        /> */}
        {/* <TextAreaFormField
          isRequired
          className="!col-span-1 md:!col-span-2"
          label="¿Qué tipo de apoyo u orientación esperas brindar a tu mentee?"
          name="mentee_support"
        /> */}
        <TextAreaFormField
          isRequired
          label="¿Cómo describirías a tu mentee ideal?"
          name="ideal_mentee"
          className="!col-span-1 md:!col-span-2"
        />
      </div>
    </>
  );
};

export default StepThree;
