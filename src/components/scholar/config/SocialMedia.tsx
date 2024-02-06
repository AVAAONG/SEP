'use client';
import { updateScholar } from '@/lib/db/utils/users';
import scholarScialMediaInformation from '@/lib/schemas/scholar/scholarSocialMediaInformation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { Scholar } from '@prisma/client';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TiktokIcon,
  TwitterIcon,
  YoutubeIcon,
} from 'public/svgs/SocialNetworks';
import { BaseSyntheticEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

interface SocialInformationProps {
  scholar: Scholar;
}
const SocialMedia: React.FC<SocialInformationProps> = ({ scholar }) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid },
  } = useForm<z.infer<typeof scholarScialMediaInformation>>({
    resolver: zodResolver(scholarScialMediaInformation),
    defaultValues: {
      ...scholar,
    },
  });

  const saveData = async (
    data: z.infer<typeof scholarScialMediaInformation>,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    event?.preventDefault();
    await updateScholar(scholar.id, data);
  };
  return (
    <>
      <h3 className="text-green-900 mb-4 text-xl font-semibold dark:text-white">Redes Sociales</h3>
      <form
        onSubmit={handleSubmit(async (data, event) =>
          toast.promise(saveData(data, event), {
            pending: 'Guardando cambios...',
            success: 'Cambios guardados',
            error: 'Error al guardar cambios',
          })
        )}
      >
        <div className="flex flex-col gap-6">
          <Controller
            name="instagram_user"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              return (
                <Input
                  startContent={<div className="w-5 h-5">{InstagramIcon()}</div>}
                  value={field.value ? field.value : ''}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['instagram_user']?.message}
                  errorMessage={formState.errors?.['instagram_user']?.message?.toString()}
                  type="text"
                  label="Usuario de Instagram"
                  radius="sm"
                  classNames={{ base: 'col-span-3 h-fit' }}
                  labelPlacement="outside"
                />
              );
            }}
          />
          <Controller
            name="twitter_user"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              return (
                <Input
                  startContent={<div className="w-5 h-5">{TwitterIcon()}</div>}
                  value={field.value ? field.value : ''}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['twitter_user']?.message}
                  errorMessage={formState.errors?.['twitter_user']?.message?.toString()}
                  type="text"
                  label="Usuario de Twitter"
                  radius="sm"
                  classNames={{ base: 'col-span-3 h-fit' }}
                  labelPlacement="outside"
                />
              );
            }}
          />
          <Controller
            name="facebook_user"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              return (
                <Input
                  startContent={<div className="w-5 h-5">{FacebookIcon()}</div>}
                  value={field.value ? field.value : ''}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['facebook_user']?.message}
                  errorMessage={formState.errors?.['facebook_user']?.message?.toString()}
                  type="text"
                  label="Usuario de Facebook"
                  radius="sm"
                  classNames={{ base: 'col-span-3 h-fit' }}
                  labelPlacement="outside"
                />
              );
            }}
          />
          <Controller
            name="linkedin_user"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              return (
                <Input
                  startContent={<div className="w-5 h-5">{LinkedinIcon()}</div>}
                  value={field.value ? field.value : ''}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['linkedin_user']?.message}
                  errorMessage={formState.errors?.['linkedin_user']?.message?.toString()}
                  type="text"
                  label="Usuario de  Linkedin"
                  radius="sm"
                  classNames={{ base: 'col-span-3 h-fit' }}
                  labelPlacement="outside"
                />
              );
            }}
          />
          <Controller
            name="tiktok_user"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              return (
                <Input
                  startContent={<div className="w-5 h-5">{TiktokIcon()}</div>}
                  value={field.value ? field.value : ''}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['tiktok_user']?.message}
                  errorMessage={formState.errors?.['tiktok_user']?.message?.toString()}
                  type="text"
                  label="Usuario de Tiktok"
                  radius="sm"
                  classNames={{ base: 'col-span-3 h-fit' }}
                  labelPlacement="outside"
                />
              );
            }}
          />
          <Controller
            name="youtube_user"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              return (
                <Input
                  startContent={<div className="w-5 h-5">{YoutubeIcon()}</div>}
                  value={field.value ? field.value : ''}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['youtube_user']?.message}
                  errorMessage={formState.errors?.['youtube_user']?.message?.toString()}
                  type="text"
                  label="Usuario de Youtube"
                  radius="sm"
                  classNames={{ base: 'col-span-3 h-fit' }}
                  labelPlacement="outside"
                />
              );
            }}
          />
          <Button
            type="submit"
            className="text-white bg-green-600 hover:bg-green-500 hover:text-green-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            isDisabled={isSubmitting}
          >
            Guardar cambios
          </Button>
        </div>
      </form>
    </>
  );
};

export default SocialMedia;
