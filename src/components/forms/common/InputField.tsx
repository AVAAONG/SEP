import { Input } from '@nextui-org/input';
import clsx from 'clsx';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface InputFieldProps {
  name: string;
  label: string;
  description?: string;
  placeholder?: string;
  inputType: 'text' | 'number' | 'date' | 'email' | 'tel';
  required?: boolean;
  [key: string]: unknown;
}

const InputField: React.FC<InputFieldProps> = (props) => {
  const { name, description, placeholder, label, inputType, required, ...restProps } = props;
  const { control, formState } = useFormContext();
  const classes = restProps.className ? clsx(restProps.className as string) : '';

  return (
    <Controller
      name={name}
      rules={{ required: required }}
      control={control}
      render={({ field }) => (
        <Input
          labelPlacement="outside"
          radius="sm"
          {...field}
          {...restProps}
          description={description}
          placeholder={placeholder}
          type={inputType}
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
