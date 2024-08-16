import { Input } from '@nextui-org/input';
import clsx from 'clsx';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface InputFieldProps {
  name: string;
  type: 'text' | 'number' | 'date' | 'email' | 'tel';
  label: string;
  [key: string]: unknown;
}

const InputField: React.FC<InputFieldProps> = (props) => {
  const { name, type, label, ...restProps } = props;
  const { control, formState } = useFormContext();
  const classes = restProps.className ? clsx(restProps.className as string) : '';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          radius="sm"
          {...field}
          {...restProps}
          type={type}
          label={label}
          isInvalid={!!formState.errors[name]?.message?.toString()}
          errorMessage={formState.errors[name]?.message?.toString()}
          className={classes}
        />
      )}
    />
  );
};

export default InputField;
