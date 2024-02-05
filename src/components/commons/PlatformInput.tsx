import { ONLINE_PLATFORMS } from '@/lib/constants';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { Control, Controller } from 'react-hook-form';

interface PlatformInputProps {
  modality: string;
  control: Control<any, any>;
}

const PlatformInput = ({ modality, control }: PlatformInputProps) => {
  if (modality === 'ONLINE') {
    return (
      <>
        <Controller
          name="platformOnline"
          control={control}
          rules={{ required: true }}
          shouldUnregister={true}
          render={({ field, formState }) => {
            return (
              <Select
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.['platformOnline']?.message}
                errorMessage={formState.errors?.['platformOnline']?.message?.toString()}
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                radius="sm"
                label="Plataforma"
                labelPlacement="outside"
                selectedKeys={[field.value]}
                defaultSelectedKeys={[field.value]}
              >
                {ONLINE_PLATFORMS.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </Select>
            );
          }}
        />
      </>
    );
  } else if (modality === 'IN_PERSON') {
    return (
      <>
        <Controller
          name="platformInPerson"
          control={control}
          rules={{ required: true }}
          shouldUnregister={true}
          render={({ field, formState }) => {
            return (
              <Input
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.['platformInPerson']?.message}
                errorMessage={formState.errors?.['platformInPerson']?.message?.toString()}
                type="text"
                label="Lugar"
                radius="sm"
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                labelPlacement="outside"
              />
            );
          }}
        />
      </>
    );
  } else if (modality === 'HYBRID') {
    return (
      <>
        <Controller
          name="platformOnline"
          control={control}
          rules={{ required: true }}
          shouldUnregister={true}
          render={({ field, formState }) => {
            return (
              <Select
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.['platformOnline']?.message}
                errorMessage={formState.errors?.['platformOnline']?.message?.toString()}
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                radius="sm"
                label="Plataforma (Virtual)"
                selectedKeys={[field.value]}
                defaultSelectedKeys={[field.value]}
                labelPlacement="outside"
              >
                {ONLINE_PLATFORMS.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </Select>
            );
          }}
        />

        <Controller
          name="platformInPerson"
          control={control}
          rules={{ required: true }}
          shouldUnregister={true}
          render={({ field, formState }) => {
            return (
              <Input
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.['platformInPerson']?.message}
                errorMessage={formState.errors?.['platformInPerson']?.message?.toString()}
                type="text"
                label="Lugar (Presencial)"
                radius="sm"
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                labelPlacement="outside"
              />
            );
          }}
        />
      </>
    );
  } else {
    return (
      <Input
        radius="sm"
        isRequired
        type="text"
        label="Plataforma"
        labelPlacement="outside"
        isDisabled
        placeholder="Selecciona primero la modalidad"
        id={'Lugar'}
      />
    );
  }
};

export default PlatformInput;
