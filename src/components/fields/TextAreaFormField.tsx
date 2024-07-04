import { Textarea } from '@nextui-org/input';
import { Controller, useFormContext } from 'react-hook-form';

interface TextAreaFormFieldProps {
  name: string;
  label: string;
  props?: any;
  [key: string]: unknown;
}

const TextAreaFormField: React.FC<TextAreaFormFieldProps> = (props) => {
  const { name, label, ...restProps } = props;
  const { control, formState } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Textarea
          {...field}
          label={label}
          isInvalid={!!formState.errors[name]}
          errorMessage={formState.errors[name]?.message?.toString()}
          {...restProps}
        />
      )}
    />
  );
};

export default TextAreaFormField;
