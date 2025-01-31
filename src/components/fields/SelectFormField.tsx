import { Select, SelectItem } from '@nextui-org/react';
import { Controller, useFormContext } from 'react-hook-form';

interface SelectFormFieldProps {
  name: string;
  label: string;
  selectItems: { label: string; value: string }[];
  [key: string]: unknown;
}

const SelectFormField: React.FC<SelectFormFieldProps> = (props) => {
  const { name, label, selectItems, ...restProps } = props;
  const { control, formState } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          radius="sm"
          labelPlacement="outside"
          {...field}
          {...restProps}
          isInvalid={!!formState.errors[name]?.message?.toString()}
          errorMessage={formState.errors[name]?.message?.toString()}
          label={label}
          defaultSelectedKeys={field.value ? [field.value.toString()] : undefined}
          selectedKeys={field.value ? [field.value.toString()] : undefined}
        >
          {selectItems.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
      )}
    />
  );
};

export default SelectFormField;
