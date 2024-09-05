import { ArrowUpTrayIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/tooltip';
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

  const acceptedTypesString = Array.isArray(acceptedFileTypes)
    ? acceptedFileTypes.join(', ')
    : acceptedFileTypes;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="col-span-2 md:col-span-1 h-fit gap-1 text-sm w-full flex flex-col ">
          <label htmlFor={inputIdentifier}>{label}</label>
          <div className="w-full flex col-span-2 md:col-span-1 h-fit">
            <Button
              radius="sm"
              className={
                existingFileUrl || field.value
                  ? 'w-full !rounded-tr-none !rounded-br-none  flex gap-4 p-2.5 items-center justify-between !bg-secondary-2 dark:!bg-zinc-700 hover:!bg-secondary-1'
                  : 'w-full  flex gap-4 p-2.5 items-center justify-between !bg-white dark:!bg-zinc-700 hover:!bg-gray-200'
              }
            >
              {existingFileUrl || field.value ? (
                <>
                  {existingFileUrl ? (
                    <Link href={existingFileUrl} className="w-6 h-6 text-primary-light">
                      <CheckBadgeIcon className="font-bold" />
                    </Link>
                  ) : (
                    <CheckBadgeIcon className="w-6 h-6" />
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
                      <Link href={existingFileUrl}>{label} cargado</Link>
                    ) : (
                      `${label} cargado`
                    )}
                  </>
                ) : (
                  `Subir ${label}`
                )}
              </label>
              {existingFileUrl || field.value ? null : (
                <label htmlFor={inputIdentifier} className="cursor-pointer">
                  <ArrowUpTrayIcon className="w-5 h-5 cursor-pointer" />
                </label>
              )}
            </Button>
            {existingFileUrl || field.value ? (
              <Tooltip content="Cargar otro archivo.">
                <Button
                  radius="sm"
                  isIconOnly
                  className="!bg-white dark:!bg-zinc-700 hover:!bg-gray-200 !rounded-tl-none !rounded-bl-none"
                  startContent={
                    <label htmlFor={inputIdentifier} className="cursor-pointer">
                      <ArrowUpTrayIcon className="w-5 h-5 cursor-pointer" />
                    </label>
                  }
                ></Button>
              </Tooltip>
            ) : null}
          </div>
        </div>
      )}
    />
  );
};

export default FileInput;
