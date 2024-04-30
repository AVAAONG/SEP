import { Input } from '@nextui-org/react';
import { Control, Controller } from 'react-hook-form';

interface PlatformCoordinatesInputProps {
  platform: string | undefined;
  control: Control<any, any>;
}

const PlatformCoordinatesInput = ({ platform, control }: PlatformCoordinatesInputProps) => {
  if (platform === 'ZOOM' || platform === undefined) return;
  else {
    return (
      <>
        <Controller
          name="meetingId"
          control={control}
          rules={{ required: true }}
          shouldUnregister={true}
          render={({ field, formState }) => {
            return (
              <Input
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.['meetingId']?.message}
                errorMessage={formState.errors?.['meetingId']?.message?.toString()}
                type="text"
                label="Id de la reunión"
                radius="sm"
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                labelPlacement="outside"
              />
            );
          }}
        />
        <Controller
          name="meetingLink"
          control={control}
          rules={{ required: true }}
          shouldUnregister={true}
          render={({ field, formState }) => {
            return (
              <Input
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.['meetingLink']?.message}
                errorMessage={formState.errors?.['meetingLink']?.message?.toString()}
                type="text"
                label="Link de la reunión"
                radius="sm"
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                labelPlacement="outside"
              />
            );
          }}
        />
        <Controller
          name="meetingPass"
          control={control}
          rules={{ required: true }}
          shouldUnregister={true}
          render={({ field, formState }) => {
            return (
              <Input
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.['meetingPass']?.message}
                errorMessage={formState.errors?.['meetingPass']?.message?.toString()}
                type="text"
                label="Contraseña de la reunión"
                radius="sm"
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                labelPlacement="outside"
              />
            );
          }}
        />
      </>
    );
  }
};

export default PlatformCoordinatesInput;
