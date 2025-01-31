import { Input } from '@nextui-org/input';
import clsx from 'clsx';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface InputFieldProps {
  name: string;
  label: string;
  description?: string;
  placeholder?: string;
  type: 'text' | 'number' | 'date' | 'email' | 'tel';
  isRequired?: boolean;
  [key: string]: unknown;
}

const InputField: React.FC<InputFieldProps> = (props) => {
  const { name, description, placeholder, label, type, isRequired, ...restProps } = props;
  const { control, formState } = useFormContext();
  const classes = restProps.className ? clsx(restProps.className as string) : '';

  return (
    <Controller
      name={name}
      rules={{ required: isRequired }}
      control={control}
      render={({ field }) => (
        <Input
          labelPlacement="outside"
          radius="sm"
          {...field}
          {...restProps}
          isRequired={isRequired}
          description={description}
          placeholder={placeholder}
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
