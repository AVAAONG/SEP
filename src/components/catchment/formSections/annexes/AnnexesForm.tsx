'use client';
import FileInputField from '@/components/fields/FileInputField';
import { createOrUploadAnnexes, finishApplication } from '@/lib/db/utils/applicant';
import { formatDateToStoreInDB } from '@/lib/utils/dates';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Link } from "@heroui/react";
import { Annexes } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import applicantAnnexesSchema from './AnnexesSchema';
import APPLICANT_ANNEXES_DOCUMENTS from './items';

type AttachedFilesFormSchemaType = z.infer<typeof applicantAnnexesSchema>;

const AttachedFilesForm = ({
  applicantAnnexes,
  applicantId,
}: {
  applicantAnnexes?: Annexes;
  applicantId: string;
}) => {
  const router = useRouter();
  const methods = useForm<AttachedFilesFormSchemaType>({
    resolver: zodResolver(applicantAnnexesSchema),
    defaultValues: {
      dniCard: applicantAnnexes?.dniCard ?? undefined,
      highSchoolGrades: applicantAnnexes?.highSchoolGrades ?? undefined,
      personalEssay: applicantAnnexes?.personalEssay ?? undefined,
      professorReferenceLetterI: applicantAnnexes?.professorReferenceLetterI ?? undefined,
      professorReferenceLetterII: applicantAnnexes?.professorReferenceLetterII ?? undefined,
      rif: applicantAnnexes?.rif ?? undefined,
      studyProof: applicantAnnexes?.studyProof ?? undefined,
      universityGrades: applicantAnnexes?.universityGrades ?? undefined,
      utilityBillVerification: applicantAnnexes?.utilityBillVerification ?? undefined,
    },
    mode: 'onSubmit',
  });

  const { handleSubmit, formState } = methods;

  const handleUpload = async (file: string, name: string) => {
    const annexesData = {
      [name]: file,
    };
    await createOrUploadAnnexes(applicantId, annexesData);
  };

  const onSubmit = async (data: AttachedFilesFormSchemaType) => {
    await finishApplication(applicantId, formatDateToStoreInDB(new Date().toISOString()));
    router.push(`/captacion/postulacion/confirmacion`);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {APPLICANT_ANNEXES_DOCUMENTS.map(({ label, name, description }) => (
            <div key={name}>
              <FileInputField
                onUpload={(fileString) => handleUpload(fileString, name)}
                fileName={label}
                maxFileSize={5 * 1024 * 1024}
                name={name}
                acceptedFileTypes="application/pdf"
              />
            </div>
          ))}
        </div>
        <div className="col-span-2 flex gap-4 ">
          <Button
            radius="sm"
            as={Link}
            href="/captacion/postulacion/adicional"
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

export default AttachedFilesForm;
