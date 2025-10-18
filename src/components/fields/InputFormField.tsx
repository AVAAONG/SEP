import { Input, InputProps } from '@nextui-org/input';
import clsx from 'clsx';
import React from 'react';
import {
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';

interface InputFieldProps<T extends FieldValues = FieldValues>
  extends Omit<InputProps, 'name' | 'isInvalid' | 'errorMessage'> {
  name: FieldPath<T>;
  label: string;
  description?: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'date' | 'email' | 'tel' | 'password' | 'url' | 'search';
  isRequired?: boolean;
  rules?: RegisterOptions<T>;
  showErrorMessage?: boolean;
  helperText?: string;
}
const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

const InputField = <T extends FieldValues = FieldValues>({
  name,
  description,
  placeholder,
  label,
  type = 'text',
  isRequired = false,
  rules,
  showErrorMessage = true,
  helperText,
  className,
  ...restProps
}: InputFieldProps<T>) => {
  const { control, formState } = useFormContext<T>();

  // More robust error handling
  const fieldError = getNestedValue(formState.errors, name);
  const errorMessage = fieldError?.message?.toString();
  const hasError = !!fieldError;

  // Combine validation rules
  const validationRules = React.useMemo(
    () => ({
      required: isRequired ? `${label} is required` : false,
      ...rules,
    }),
    [isRequired, label, rules]
  );

  return (
    <Controller
      name={name}
      control={control}
      rules={validationRules}
      render={({ field }) => (
        <Input
          {...field}
          {...restProps}
          labelPlacement="outside"
          radius="sm"
          type={type}
          label={label}
          placeholder={placeholder}
          description={description || helperText}
          isRequired={isRequired}
          isInvalid={hasError}
          errorMessage={showErrorMessage ? errorMessage : undefined}
          className={clsx(className)}
          // Convert number inputs properly
          onChange={(e) => {
            const value =
              type === 'number'
                ? e.target.value === ''
                  ? ''
                  : Number(e.target.value)
                : e.target.value;
            field.onChange(value);
          }}
        />
      )}
    />
  );
};

export default React.memo(InputField) as typeof InputField;
