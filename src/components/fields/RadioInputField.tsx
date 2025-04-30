import { Radio, RadioGroup, RadioGroupProps } from '@nextui-org/react';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface RadioInputFieldProps extends Omit<RadioGroupProps, 'children' | 'name' | 'label'> {
  name: string;
  label: string;
  isVertical?: boolean;
  radioItems: { label: string; value: string }[];
}

const RadioInputField: React.FC<RadioInputFieldProps> = ({
  name,
  label,
  radioItems,
  isVertical = false,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <RadioGroup
          orientation={isVertical ? 'vertical' : 'horizontal'}
          color="success"
          value={field.value}
          isRequired
          onChange={field.onChange}
          isInvalid={!!fieldState.error}
          errorMessage={fieldState.error?.message}
          label={label}
          classNames={{
            label: 'mb-0.5',
          }}
        >
          {radioItems.map(({ label, value }) => (
            <Radio key={value} value={value}>
              {label}
            </Radio>
          ))}
        </RadioGroup>
      )}
    />
  );
};

export default RadioInputField;
