'use client';
import InputField from '@/components/fields/InputFormField';
import SelectFormField from '@/components/fields/SelectFormField';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import languagesFormSchema from './LanguageKnowledgeSchema';

type LanguageFormSchemaType = z.infer<typeof languagesFormSchema>;

const LanguagesForm = () => {
  const methods = useForm<LanguageFormSchemaType>({
    resolver: zodResolver(languagesFormSchema),
    mode: 'all',
  });
  const speaksOtherLang = useWatch({
    control: methods.control,
    name: 'speaksOtherLanguage',
  });

  const onSubmit = (data: LanguageFormSchemaType) => {
    console.log(data);
    methods.reset(
      {},
      {
        keepErrors: false,
      }
    );
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <SelectFormField
            isRequired
            label="¿Habla otro idioma?"
            name="speaksOtherLanguage"
            selectItems={[
              { label: 'Si', value: 'YES' },
              { label: 'No', value: 'NO' },
            ]}
          />
          <InputField
            label="Especifique el idioma"
            type="text"
            name="specifiedLanguage"
            required={speaksOtherLang}
            isRequired={speaksOtherLang}
            isDisabled={!speaksOtherLang}
          />
          <SelectFormField
            required={speaksOtherLang}
            isRequired={speaksOtherLang}
            isDisabled={!speaksOtherLang}
            label="Nivel de competencia"
            name="englishLevel"
            selectItems={[
              { label: 'Básico', value: 'BASIC' },
              { label: 'Intermedio', value: 'INTERMEDIATE' },
              { label: 'Avanzado', value: 'ADVANCED' },
            ]}
          />
        </div>
        <div className="col-span-2 flex gap-4">
          <Button
            radius="sm"
            as={Link}
            href="/captacion/laboral"
            className="w-full"
            variant="bordered"
          >
            Anterior
          </Button>
          <Button radius="sm" type="submit" className="w-full">
            Siguiente
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default LanguagesForm;
