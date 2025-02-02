import { Autocomplete, AutocompleteItem, AutocompleteProps } from '@nextui-org/react';
import { Controller, useFormContext } from 'react-hook-form';

interface AutocompleteFormFieldProps
  extends Omit<AutocompleteProps, 'children' | 'name' | 'label'> {
  name: string;
  isForUniversities?: boolean;
  label: string;
  selectItems: { label: string; value: string }[];
}

const AutocompleteFormField: React.FC<AutocompleteFormFieldProps> = ({
  name,
  label,
  isForUniversities = false,
  selectItems,
  ...restProps
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Autocomplete
          radius="sm"
          labelPlacement="outside"
          {...restProps}
          isInvalid={!!fieldState.error}
          errorMessage={fieldState.error?.message}
          label={label}
          selectedKey={field.value ? String(field.value) : ''}
          onSelectionChange={(key) => {
            if (isForUniversities) {
              const value = key || '';
              const match = value.toString().match(/\(([^)]+)\)/);
              const valueInParentheses = match ? match[1] : null;
              field.onChange(valueInParentheses);
            } else {
              const value = key || '';
              field.onChange(value);
            }
          }}
          onBlur={field.onBlur}
        >
          {selectItems.map((item) => (
            <AutocompleteItem key={item.value} value={item.value === '' ? undefined : item.value}>
              {item.label}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      )}
    />
  );
};

export default AutocompleteFormField;
