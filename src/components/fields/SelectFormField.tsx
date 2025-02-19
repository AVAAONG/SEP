import { Select, SelectItem, SelectProps } from "@heroui/react";
import { Controller, useFormContext } from 'react-hook-form';

interface SelectFormFieldProps extends Omit<SelectProps, 'children' | 'name' | 'label'> {
  name: string;
  label: string;
  selectItems: { label: string; value: string }[];
}

const SelectFormField: React.FC<SelectFormFieldProps> = ({
  name,
  label,
  selectItems,
  ...restProps
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Select
          radius="sm"
          labelPlacement="outside"
          {...restProps}
          isInvalid={!!fieldState.error}
          errorMessage={fieldState.error?.message}
          label={label}
          selectedKeys={field.value ? [String(field.value)] : []}
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] || '';
            field.onChange(value);
          }}
          onBlur={field.onBlur}
        >
          {selectItems.map((item) => (
            <SelectItem key={item.value} value={item.value === '' ? undefined : item.value}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
      )}
    />
  );
};

export default SelectFormField;
