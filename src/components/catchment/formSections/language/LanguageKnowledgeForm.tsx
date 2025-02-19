'use client';
import InputField from '@/components/fields/InputFormField';
import SelectFormField from '@/components/fields/SelectFormField';
import { createOrUpdateLangInfo } from '@/lib/db/utils/applicant';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@heroui/react";
import { LanguageKnowledge, Level, Prisma } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import languagesFormSchema from './LanguageKnowledgeSchema';

type LanguageFormSchemaType = z.infer<typeof languagesFormSchema>;

const LanguagesForm = ({
  applicantId,
  applicantLangKnowledge,
}: {
  applicantId: string;
  applicantLangKnowledge?: LanguageKnowledge;
}) => {
  const router = useRouter();

  const methods = useForm<LanguageFormSchemaType>({
    resolver: zodResolver(languagesFormSchema),
    defaultValues: {
      speaksOtherLanguage: applicantLangKnowledge?.speaksOtherLanguage === true ? 'YES' : 'NO',
      languageLevel: applicantLangKnowledge?.languageLevel ?? undefined,
      specifiedLanguage: applicantLangKnowledge?.specifiedLanguage ?? undefined,
    },
    mode: 'onSubmit',
  });

  const { handleSubmit, formState } = methods;

  const speaksOtherLangWatch = useWatch({
    control: methods.control,
    name: 'speaksOtherLanguage',
  });

  const speaksOtherLang = speaksOtherLangWatch === 'YES';

  useEffect(() => {
    if (!speaksOtherLang) {
      methods.reset(
        {
          speaksOtherLanguage: 'NO',
          specifiedLanguage: '',
          languageLevel: '',
        },
        {
          keepErrors: false,
        }
      );
    }
  }, [speaksOtherLang]);

  const onSubmit = async (data: LanguageFormSchemaType) => {
    const dataToSubmit: Prisma.LanguageKnowledgeUpdateInput = {
      ...data,
      speaksOtherLanguage: data.speaksOtherLanguage === 'YES',
      languageLevel: data.languageLevel as Level,
    };
    if (data.speaksOtherLanguage === 'NO') {
      dataToSubmit.specifiedLanguage = null;
      dataToSubmit.languageLevel = null;
    }
    await createOrUpdateLangInfo(applicantId, dataToSubmit);
    router.push('/captacion/postulacion/secundaria');
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
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
            name="languageLevel"
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
            href="/captacion/postulacion/laboral"
            className="w-full"
            variant="bordered"
          >
            Anterior
          </Button>
          <Button radius="sm" type="submit" className="w-full" isLoading={formState.isSubmitting}>
            Siguiente
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default LanguagesForm;
