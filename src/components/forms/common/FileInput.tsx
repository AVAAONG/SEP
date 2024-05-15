import { ArrowUpTrayIcon, PaperClipIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { Controller } from 'react-hook-form';

interface FileInputProps {
  name: string;
  control: any; // Replace with actual type from RHF
  label: string;
  acceptedFileTypes?: string | string[]; // Allow single or multiple types
  onFileChange?: (file: React.ChangeEvent<HTMLInputElement> | null) => void;
  existingFileUrl: string | undefined | null;
}

const FileInput: React.FC<FileInputProps> = ({
  name,
  control,
  label,
  acceptedFileTypes = '.pdf, .jpg, .jpeg, .png',
  onFileChange,
  existingFileUrl,
}) => {
  const inputIdentifier = `input-${name}`;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && onFileChange) onFileChange(e);
  };
  const acceptedTypesString = Array.isArray(acceptedFileTypes)
    ? acceptedFileTypes.join(', ')
    : acceptedFileTypes;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="col-span-2 md:col-span-1 h-fit flex gap-1 text-sm flex-col">
          <label htmlFor={inputIdentifier}>{label}</label>

          <Button
            radius="sm"
            className="flex gap-4 p-2.5 rounded-md items-center justify-between !bg-white hover:!bg-gray-200"
          >
            {existingFileUrl || field.value ? (
              <>
                {existingFileUrl ? (
                  <Link href={existingFileUrl}>
                    <PaperClipIcon />
                  </Link>
                ) : (
                  <PaperClipIcon className="w-5 h-5" />
                )}
              </>
            ) : null}
            <input
              {...field}
              onChange={(e) => {
                if (e && onFileChange) onFileChange(e);
                field.onChange(e);
              }}
              type="file"
              id={inputIdentifier}
              accept={acceptedTypesString}
              style={{ display: 'none' }}
            />

            <label
              htmlFor={existingFileUrl ? '' : inputIdentifier}
              className={
                existingFileUrl
                  ? 'flex items-center text-sm w-full'
                  : 'flex items-center text-sm cursor-pointer w-full'
              }
            >
              {existingFileUrl || field.value ? (
                <>
                  {existingFileUrl ? (
                    <Link href={existingFileUrl}>Comprobante del modulo cargado</Link>
                  ) : (
                    `${label} cargado`
                  )}
                </>
              ) : (
                `Subir ${label.toLocaleLowerCase()}`
              )}
            </label>
            <label htmlFor={inputIdentifier} className="cursor-pointer">
              <ArrowUpTrayIcon className="w-5 h-5 cursor-pointer" />
            </label>
          </Button>
        </div>
      )}
    />
  );
};

export default FileInput;
