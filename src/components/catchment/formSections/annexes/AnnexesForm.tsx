'use client';
import FileInput from '@/components/forms/common/FileInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Link } from '@nextui-org/react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import attachedFilesFormSchema from './AnnecesSchema';
import documentFields from './items';

type AttachedFilesFormSchemaType = z.infer<typeof attachedFilesFormSchema>;

const AttachedFilesForm = () => {
  const methods = useForm<AttachedFilesFormSchemaType>({
    resolver: zodResolver(attachedFilesFormSchema),
    mode: 'all',
  });
  const onSubmit = (data: AttachedFilesFormSchemaType) => {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {documentFields.map(({ label, name, description }) => (
            <div key={name}>
              <FileInput
                control={methods.control}
                label={label}
                name={name}
                description={description}
                acceptedFileTypes={['.pdf']}
                //   onFileChange={async (file) => {
                //     if (scholarCollage?.collage_study_proof) {
                //       await deleteBlobFile(scholarCollage?.collage_study_proof!);
                //     }
                //     setFiles((prev) => {
                //       prev.collage_study_proof = file?.target.files?.[0] || null;
                //       return prev;
                //     });
                //   }}
                existingFileUrl={null}
              />
            </div>
          ))}
        </div>
        <div className="col-span-2 flex gap-4">
          <Button
            radius="sm"
            as={Link}
            href="/captacion/adicional"
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

export default AttachedFilesForm;
