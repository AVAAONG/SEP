'use client';
import InputField from '@/components/fields/InputFormField';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectItem } from '@nextui-org/react';
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import languagesFormSchema from './schema';

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
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 "
      >
        <Controller
          name="speaksOtherLanguage"
          control={methods.control}
          rules={{ required: speaksOtherLang }}
          render={({ field, formState }) => (
            <Select
              autoFocus
              value={field.value?.toString() as 'YES' | 'NO'}
              onChange={field.onChange}
              isInvalid={!!formState.errors.speaksOtherLanguage?.message}
              errorMessage={formState.errors.speaksOtherLanguage?.message?.toString()}
              radius="sm"
              label="¿Habla otro idioma?"
              isRequired
              defaultSelectedKeys={[field.value?.toString() as 'YES' | 'NO']}
              selectedKeys={[field.value?.toString() as 'YES' | 'NO']}
            >
              {[
                { label: 'Si', value: 'YES' },
                { label: 'No', value: 'NO' },
              ].map((chatLevel) => (
                <SelectItem key={chatLevel.value} value={chatLevel.value}>
                  {chatLevel.label}
                </SelectItem>
              ))}
            </Select>
          )}
        />
        <InputField label="Especifique el idioma" type="text" name="specifiedLanguage" />
        duplicar estas pregantas
        <Controller
          name="englishLevel"
          control={methods.control}
          render={({ field, formState }) => (
            <Select
              value={field.value}
              onChange={field.onChange}
              isInvalid={!!formState.errors.englishLevel?.message}
              errorMessage={formState.errors.englishLevel?.message?.toString()}
              radius="sm"
              label="Nivel de competencia"
              defaultSelectedKeys={[
                field.value?.toString() as 'BASIC' | 'INTERMEDIATE' | 'ADVANCED',
              ]}
              selectedKeys={[field.value?.toString() as 'BASIC' | 'INTERMEDIATE' | 'ADVANCED']}
            >
              {[
                { label: 'Básico', value: 'BASIC' },
                { label: 'Intermedio', value: 'INTERMEDIATE' },
                { label: 'Avanzado', value: 'ADVANCED' },
              ].map((chatLevel) => (
                <SelectItem key={chatLevel.value} value={chatLevel.value}>
                  {chatLevel.label}
                </SelectItem>
              ))}
            </Select>
          )}
        />
        <button type="submit">Siguiente</button>
      </form>
    </FormProvider>
  );
};

export default LanguagesForm;
