import { Textarea } from '@nextui-org/input';
import { Controller, useFormContext } from 'react-hook-form';

interface TextAreaFormFieldProps {
  name: string;
  label: string;
  props?: any;
}

const TextAreaFormField: React.FC<TextAreaFormFieldProps> = ({ name, label, ...props }) => {
  const { control, formState } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState }) => (
        <Textarea
          {...field}
          label={label}
          isInvalid={!!formState.errors[name]}
          errorMessage={formState.errors[name]?.message?.toString()}
          {...props}
        />
      )}
    />
  );
};

export default TextAreaFormField;
