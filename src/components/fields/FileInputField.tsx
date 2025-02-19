'use client';
import { uploadBlob } from '@/lib/azure/azure';
import { Dropzone, ExtFile } from '@files-ui/react';
import { DocumentIcon } from '@heroicons/react/24/outline';
import { Button } from "@heroui/react";
import React, { useCallback } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';

interface FileInputFieldProps {
  name: string;
  fileName: string;
  acceptedFileTypes?: string;
  isRequired?: boolean;
  maxFileSize: number;
  onUpload: (fileString: string) => Promise<void>;
  containerType?: 'files' | 'picture'; // Add containerType prop
}

const FileInputField: React.FC<FileInputFieldProps> = ({
  isRequired = true,
  name,
  fileName,
  acceptedFileTypes,
  maxFileSize,
  onUpload,
  containerType = 'picture', // Default to 'picture'
}) => {
  const { control, setValue, formState } = useFormContext();

  const handleUpload = useCallback(
    async (file: ExtFile) => {
      if (file.file) {
        toast.info('Subiendo archivo...');
        const reader = new FileReader();
        reader.onloadend = async function () {
          const base64String = reader.result;
          try {
            const response = await uploadBlob(
              base64String as string,
              file.file.type,
              containerType
            );
            console.log('Archivo subido exitosamente ', response);
            await onUpload(response);
            setValue(name, response, { shouldValidate: true });
            toast.success('Image uploaded successfully');
          } catch (error) {
            console.error('Error uploading file: ', error);
            toast.error('Error uploading file');
          }
        };
        reader.readAsDataURL(file.file);
      }
    },
    [containerType, name, setValue]
  );

  const onDelete = useCallback(() => {
    // Delete file logic here
    setValue(name, null, { shouldValidate: true }); // Clear the field value
    toast.info('File deleted');
  }, [name, setValue]);

  return (
    <Controller
      name={name}
      rules={{ required: isRequired }}
      control={control}
      render={({ field }) => (
        <div>
          <Dropzone
            accept={acceptedFileTypes}
            maxFileSize={maxFileSize}
            maxFiles={1}
            footerConfig={{
              className: '!text-sm',
              customMessage: 'Solo archivos de hasta 5MB, en formato PDF',
            }}
            header={false}
            className="!text-sm"
            label={`Haz clic o arrastra ${fileName}`}
            required={isRequired}
            behaviour="replace"
            value={field.value ? [field.value] : []} // Ensure value is an array
            onChange={async (files: ExtFile[]) => {
              if (files.length > 0) {
                await handleUpload(files[0]); // Handle the first file
              } else {
                setValue(name, null, { shouldValidate: true }); // Clear the field if no files
              }
            }}
            minHeight="110px"
            color={!formState.errors[name]?.message?.toString() ? '#0069B0' : 'red'}
            name={name}
            cleanFiles={true}
            ref={field.ref}
            localization="ES-es"
          >
            {field.value && (
              <div className="flex items-start gap-2 w-full p-2">
                <Button
                  radius="sm"
                  isIconOnly
                  variant="ghost"
                  onClick={() => window.open(field.value as string, '_blank')}
                >
                  <DocumentIcon className="w-8 h-8 text-blue-400" />
                </Button>
              </div>
            )}
          </Dropzone>
          {formState.errors[name]?.message?.toString() && (
            <p className="text-sm text-red-500">{formState.errors[name]?.message?.toString()}</p>
          )}
        </div>
      )}
    />
  );
};

export default React.memo(FileInputField);
