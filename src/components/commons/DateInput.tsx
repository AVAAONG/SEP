import chatCreationFormSchema from '@/lib/schemas/chatCreationFormSchema';
import volunteerSchema from '@/lib/schemas/volunteerSchema';
import workshopCreationFormSchema from '@/lib/schemas/workshopCreationFormSchema';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/react';
import React, { useEffect } from 'react';
import { Control, Controller, UseFieldArrayReturn } from 'react-hook-form';
import { z } from 'zod';

/**
 * Props for the DateInput component
 * @typedef {Object} Props
 * @property {Control<z.infer<typeof workshopCreationFormSchema>>} control - A Control object from react-hook-form that is used to control the form state.
 * @property {UseFieldArrayReturn<z.infer<typeof workshopCreationFormSchema>>} fieldArray - A UseFieldArrayReturn object from react-hook-form that is used to manage a list of fields.
 */
interface DateInputProps {
  control:
  | Control<z.infer<typeof workshopCreationFormSchema>>
  | Control<z.infer<typeof chatCreationFormSchema>>
  | Control<z.infer<typeof volunteerSchema>>;
  fieldArray:
  | UseFieldArrayReturn<z.infer<typeof workshopCreationFormSchema>>
  | UseFieldArrayReturn<z.infer<typeof chatCreationFormSchema>>
  | UseFieldArrayReturn<z.infer<typeof volunteerSchema>>;
  haveClosedDate?: boolean; // Added this line
}

/**
 * DateInput component
 *
 * Used to manage and render a dynamic list of date inputs.
 *
 * It is designed to be used with the react-hook-form library and the zod schema validation library.
 * The component uses the Controller component from react-hook-form to manage the form state of each input field.
 *
 * @description
 * The component renders a list of date, start hour, and end hour fields based on the current state of the fieldArray
 * Each set of fields includes a button that either adds a new set of fields or removes the current set, only the last input can add more.
 *
 * @param {DateInputProps} props - Props for the component
 * @returns {React.FC<Props>} - DateInput component
 */
const DateInput: React.FC<DateInputProps> = ({ control, fieldArray, haveClosedDate = false }) => {
  const { fields, append: appendField, remove } = fieldArray;
  // Use useEffect to ensure there is always at least one set of fields

  useEffect(() => {
    if (fields.length === 0) {
      const initialField = haveClosedDate
        ? { date: '', startHour: '', endHour: '', endDate: '' }
        : { date: '', startHour: '', endHour: '' };
      appendField(initialField);
    }
  }, [fields, appendField, haveClosedDate]);

  const addInput = () => {
    const newField = haveClosedDate
      ? { date: '', startHour: '', endHour: '', endDate: '' }
      : { date: '', startHour: '', endHour: '' };
    appendField(newField);
  };

  return (
    <>
      {fields.map((field, index) => {
        const isLastInput = index === fields.length - 1;
        return (
          <React.Fragment key={field.id}>
            <div className="col-span-2 md:col-span-1">
              <div className="min-h-0 h-0 flex justify-end w-full">
                <Button
                  size="sm"
                  isIconOnly
                  radius="full"
                  onClick={isLastInput ? addInput : () => remove(index)}
                  className={`translate-x-4 translate-y-2 text-white z-50  ${isLastInput
                      ? 'bg-gray-300 hover:bg-primary-light'
                      : 'bg-red-200 hover:bg-red-700'
                    }`}
                >
                  {isLastInput ? '+' : '-'}
                </Button>
              </div>
              <Controller
                name={`dates.${index}.date`}
                control={control as Control<z.infer<typeof workshopCreationFormSchema>>}
                rules={{ required: true }}
                render={({ field, formState }) => {
                  const errorMessage = formState.errors?.dates?.[index]?.date?.message;

                  return (
                    <Input
                      {...field}
                      isInvalid={!!errorMessage}
                      errorMessage={errorMessage?.toString()}
                      radius="sm"
                      type="date"
                      isRequired
                      label={`Fecha ${index + 1}`}
                      placeholder="Fecha"
                      labelPlacement="outside"
                      classNames={{ base: 'col-span-2 md:col-span-1' }}
                    />
                  );
                }}
              />
            </div>
            <Controller
              name={`dates.${index}.startHour`}
              control={control as Control<z.infer<typeof workshopCreationFormSchema>>}
              rules={{ required: true }}
              render={({ field, formState }) => {
                const errorMessage = formState.errors.dates?.[index]?.startHour?.message;

                return (
                  <Input
                    {...field}
                    isInvalid={!!errorMessage}
                    errorMessage={errorMessage?.toString()}
                    radius="sm"
                    type="time"
                    isRequired
                    label={`Hora de inicio ${index + 1}`}
                    placeholder="Hora de inicio"
                    labelPlacement="outside"
                    classNames={{ base: 'col-span-2 md:col-span-1' }}
                  />
                );
              }}
            />
            <Controller
              name={`dates.${index}.endHour`}
              control={control as Control<z.infer<typeof workshopCreationFormSchema>>}
              rules={{ required: true }}
              render={({ field, formState }) => {
                const errorMessage = formState.errors.dates?.[index]?.endHour?.message;

                return (
                  <Input
                    {...field}
                    isInvalid={!!errorMessage}
                    errorMessage={errorMessage?.toString()}
                    radius="sm"
                    type="time"
                    isRequired
                    label={`Hora de cierre ${index + 1}`}
                    placeholder="Hora de cierre"
                    labelPlacement="outside"
                    classNames={{ base: 'col-span-2 md:col-span-1' }}
                  />
                );
              }}
            />
            {haveClosedDate && ( // Conditionally render endDate field
              <Controller
                name={`dates.${index}.endDate`}
                control={control as Control<z.infer<typeof workshopCreationFormSchema>>}
                rules={{ required: true }}
                render={({ field, formState }) => {
                  const errorMessage = formState.errors?.dates?.[index]?.endDate?.message;

                  return (
                    <Input
                      {...field}
                      isInvalid={!!errorMessage}
                      errorMessage={errorMessage?.toString()}
                      radius="sm"
                      type="date"
                      isRequired
                      label={`Fecha de cierre ${index + 1}`}
                      placeholder="Fecha de cierre"
                      labelPlacement="outside"
                      classNames={{ base: 'col-span-2 md:col-span-1' }}
                    />
                  );
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default DateInput;
