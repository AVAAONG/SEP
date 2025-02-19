import { getBlobImage, uploadBlob } from '@/lib/azure/azure';
import { Avatar } from "@heroui/react";
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';

interface ImageUploadProps {
  name: string; // updateFunction: (blobUrl: string) => Promise<void>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ name }) => {
  const {
    register,
    setValue,
    watch,

    formState: { errors },
  } = useFormContext();
  const [image, setImage] = useState<string | undefined>();
  const watcherImage = watch(name);
  console.log(watcherImage);

  useEffect(() => {
    const getImage = async () => {
      const blobImage = (await getBlobImage(watcherImage)) || undefined;
      setImage(blobImage);
    };

    getImage();
  }, [watcherImage]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
    // updateFunction: (blobUrl: string) => Promise<void>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async function () {
        const base64String = reader.result;
        try {
          const response = await uploadBlob(base64String as string, 'picture');
          setValue(name, response, { shouldValidate: true });
        } catch (error) {
          console.error('Error uploading file: ', error);
        }
        try {
        } catch (error) {
          console.error('Error saving the image ', error);
        }
      };
      reader.readAsDataURL(file);
      toast.success('Image uploaded successfully');
    }
  };

  return (
    <div className="w-full rounded-full flex items-end justify-center gap-4">
      <Avatar
        color="primary"
        src={image}
        isBordered
        alt="Preview"
        radius="md"
        className="w-28 md:w-32 h-28 "
      />
      <div className="flex flex-col justify-center gap-2 lg:w-full">
        <label htmlFor={name} className="cursor-pointer max-w-fit">
          <span className="text-center shadow-none bg-transparent block w-fit text-sm text-slate-500 py-2 px-4 rounded-lg border-1 border-blue-500 font-semibold bg-blue-50 hover:bg-blue-500 hover:text-blue-50 transition-colors">
            Subir foto
          </span>
          <input
            {...register(name)}
            id={name}
            type="file"
            accept="image/jpeg,image/png"
            onChange={(event) => handleFileChange(event)}
            className="hidden"
          />
        </label>
        {errors[name] && (
          <p className="text-red-500 text-sm mt-1">{errors[name]?.message as string}</p>
        )}
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Solo archivos JPG or PNG </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            La foto debe de ser cuadrada (1:1)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
