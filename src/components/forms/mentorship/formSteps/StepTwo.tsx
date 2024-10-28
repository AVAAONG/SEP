import InputField from '@/components/fields/InputFormField';
import SelectFormField from '@/components/fields/SelectFormField';
import { useWatch } from 'react-hook-form';
import FileInput from '../../common/FileInput';

const StepTwo = ({ formControl }: { formControl: any }) => {
  const employed = useWatch({
    control: formControl,
    name: 'employed',
  });

  const speakOtherLang = useWatch({
    control: formControl,
    name: 'speaks_other_lang',
  });

  return (
    <>
      <div className="space-y-0.5 col-start-2 col-span-5">
        <h2 className="text-2xl font-bold ">Experiencia y Formación</h2>
        <p className="text-muted-foreground">Por favor, completa todos los campos requeridos</p>
        <div className="w-full h-0.5 bg-primary-light opacity-40" />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <InputField
          isRequired
          label="Profesión"
          type="text"
          name="profession"
          placeholder="Ingeniero"
        />
        <SelectFormField
          isRequired
          label="¿Trabajas actualmente?"
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
          isDisabled={employed === 'false'}
          isRequired={employed === 'true'}
          placeholder="Empresa XYZ"
        />
        <InputField
          label="Cargo u ocupación"
          type="text"
          name="position"
          isDisabled={employed === 'false'}
          isRequired={employed === 'true'}
          placeholder="Gerente de Proyectos"
        />
        <FileInput
          name="cv"
          label="Resumen de CV*"
          existingFileUrl={undefined}
          control={formControl}
        />
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
          isRequired={speakOtherLang === 'true'}
          label="Especifica el idioma"
          type="text"
          isDisabled={speakOtherLang === 'false'}
          name="other_lang"
          placeholder="Inglés"
        />
      </div>
    </>
  );
};

export default StepTwo;
