import { Input } from '@nextui-org/input';
import clsx from 'clsx';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface InputFieldProps {
  name: string;
  type: 'text' | 'number';
  label: string;
  props?: any;
}

const InputField: React.FC<InputFieldProps> = ({ name, type, label, ...props }) => {
  const { control, formState } = useFormContext();
  const classes = clsx(props.className);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState }) => (
        <Input
          {...field}
          {...props}
          type={type}
          label={label}
          isInvalid={!!formState.errors[name]}
          errorMessage={formState.errors[name]?.message?.toString()}
          className={classes}
        />
      )}
    />
  );
};

export default InputField;
