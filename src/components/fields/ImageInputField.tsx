import { getBlobImage, uploadBlob } from '@/lib/azure/azure';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import { STORAGE_KEY } from '../forms/mentorship/MentorshipRecruitmentForm';

interface ImageUploadProps {
  name: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ name }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    getValues,
  } = useFormContext();
  const [preview, setPreview] = useState<string | null>(null);

  const fileValue = watch(name);
  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const str = JSON.parse(storedData);
        const photo = await getBlobImage(str.photo);
        return photo;
      }
      if (fileValue instanceof File) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(fileValue);
      } else {
        setPreview(null);
      }
    };

    const fetchAndSetPreview = async () => {
      const photo = await fetchData();
      if (photo !== undefined) {
        setPreview(photo);
      }
    };

    fetchAndSetPreview();
  }, [fileValue]);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      let url: string = '';
      reader.onloadend = async function () {
        const base64String = reader.result;
        try {
          const response = await uploadBlob(base64String as string, 'picture');
          const values = getValues();
          values[name] = response;
          console.log(values);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
          console.log('File uploaded to Azure Blob Storage');
        } catch (error) {
          console.error('Error uploading file: ', error);
        }
        try {
        } catch (error) {
          console.error('Error saving the image ', error);
        }
      };
      reader.readAsDataURL(file);
      setValue(name, file, { shouldValidate: true });
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      toast.success('Image uploaded successfully');
      // Revoke the object URL after the image is loaded to avoid memory leaks
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  return (
    <div className="w-full rounded-full flex items-center justify-center gap-4">
      <div className="flex-shrink-0 flex items-center justify-center w-28 h-28 object-contain rounded-full shadow-lg border-3 border-green-500 p-1 overflow-hidden">
        {preview ? (
          <Image
            src={preview}
            alt="Preview"
            width={112}
            height={112}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
            Sin Foto
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center gap-2 lg:w-full">
        <label htmlFor={name} className="cursor-pointer">
          <span
            className="text-center shadow-none bg-transparent block w-fit text-sm text-slate-500
            py-2 px-4 rounded-full border-1 border-primary-light font-semibold
            bg-secondary-2 text-primary-light
            hover:bg-primary-light hover:text-secondary-2 transition-colors"
          >
            Subir foto
          </span>
          <input
            {...register(name)}
            id={name}
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        {errors[name] && (
          <p className="text-red-500 text-sm mt-1">{errors[name]?.message as string}</p>
        )}
        <div className="text-sm text-gray-500 dark:text-gray-400">Solo archivos JPG or PNG </div>
      </div>
    </div>
  );
};

export default ImageUpload;
