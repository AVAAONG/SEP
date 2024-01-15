import { Input } from '@nextui-org/input';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';

type Props = {
  control: Control<any, any>;
};

const DateInput: React.FC<Props> = ({ control }) => {
  const [inputs, setInputs] = useState([{ id: nanoid(), date: '', startHour: '', endHour: '' }]);

  const addInput = () => {
    const newId = nanoid();
    setInputs([...inputs, { id: newId, date: '', startHour: '', endHour: '' }]);
  };

  const deleteInput = (id: string) => {
    const newInputs = inputs.filter((input) => input.id !== id);
    setInputs(newInputs);
  };

  const validateDate = (date: string) => {
    const today = new Date().toISOString().split('T')[0];
    console.log(today, date);
    return date >= today;
  };

  const isInvalid = (value: string) => {
    return React.useMemo(() => {
      if (value === '') return false;

      return validateDate(value) ? false : true;
    }, [value]);
  };

  return (
    <>
      {/* {inputs.map((input, index) => {
        const { id, date, startHour, endHour } = input;
        const isLastInput = index === inputs.length - 1;
        return (
          <React.Fragment key={id}> */}
      <div className="col-span-2 md:col-span-1">
        {/* <div className="min-h-0 h-0 flex justify-end w-full">
          <Button
            size="sm"
            isIconOnly
            radius="full"
            onClick={isLastInput ? addInput : () => deleteInput(id)}
            className={`translate-x-4 translate-y-2 text-white z-50  ${
              isLastInput ? 'bg-gray-300 hover:bg-primary-light' : 'bg-red-200 hover:bg-red-700'
            }`}
          >
            {isLastInput ? '+' : '-'}
          </Button>
        </div> */}
        <Controller
          name={`dates`}
          control={control}
          rules={{ required: true }}
          shouldUnregister={true}
          render={({ field, fieldState, formState }) => {
            return (
              <Input
                isInvalid={!!formState.errors?.[`dates`]?.message}
                errorMessage={formState.errors?.[`dates`]?.message?.toString()}
                radius="sm"
                type="date"
                label={`Fecha `}
                placeholder="Fecha"
                labelPlacement="outside"
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                value={field.value}
                onChange={field.onChange}
              />
            );
          }}
        />
      </div>
      <Controller
        name={`startHours`}
        control={control}
        rules={{ required: true }}
        shouldUnregister={true}
        render={({ field, fieldState, formState }) => {
          return (
            <Input
              isInvalid={!!formState.errors?.[`startHours`]?.message}
              errorMessage={formState.errors?.[`startHours`]?.message?.toString()}
              radius="sm"
              type="time"
              label={`Hora de inicio `}
              placeholder="Hora de inicio"
              labelPlacement="outside"
              classNames={{ base: 'col-span-2 md:col-span-1' }}
              value={field.value}
              onChange={field.onChange}
            />
          );
        }}
      />
      <Controller
        name={`endHours`}
        control={control}
        rules={{ required: true }}
        shouldUnregister={true}
        render={({ field, fieldState, formState }) => {
          return (
            <Input
              isInvalid={!!formState.errors?.[`endHours`]?.message}
              errorMessage={formState.errors?.[`endHours`]?.message?.toString()}
              radius="sm"
              label={`Hora de cierre `}
              placeholder="Hora de cierre"
              labelPlacement="outside"
              classNames={{ base: 'col-span-2 md:col-span-1' }}
              type="time"
              value={field.value}
              onChange={field.onChange}
            />
          );
        }}
      />
      {/* </React.Fragment>
        );
      })} */}
    </>
  );
};

export default DateInput;
