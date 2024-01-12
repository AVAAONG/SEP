'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import DateInput from '../commons/DateInput';

const WorkshopCreationForm = () => {
  const workshopCreationFormSchema = z.object({
    title: z.string().min(1, { message: 'El titulo no puede estar vacio' }),
    dates: z.array(z.date()).min(1, { message: 'Debe haber al menos una fecha' }),
    startHours: z.array(z.string()).min(1, { message: 'Debe haber al menos una hora de inicio' }),
    endHours: z.array(z.string()).min(1, { message: 'Debe haber al menos una hora de fin' }),
  });

  const { control, handleSubmit } = useForm<z.infer<typeof workshopCreationFormSchema>>({
    resolver: zodResolver(workshopCreationFormSchema),
  });
  const createWorkshop = (data) => {
    console.log(data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(createWorkshop)}
        className="grid grid-cols-2 w-full items-center justify-center gap-4"
      >
        <h1 className="col-span-2 text-center w-full font-semibold text-2xl text-primary-light uppercase tracking-widest">
          crear actividad formativa
        </h1>
        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          shouldUnregister={true}
          render={({ field, formState }) => {
            return (
              <Input
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.['title']?.message}
                errorMessage={formState.errors?.['title']?.message?.toString()}
                autoFocus
                type="text"
                label="Título"
                radius="sm"
                classNames={{ base: 'col-span-2 h-fit' }}
                labelPlacement="outside"
              />
            );
          }}
        />
        <DateInput control={control} />
        <div className="col-span-2 h-fit flex gap-4">
          <Button
            type="submit"
            name="schedule"
            radius="sm"
            className="bg-gradient-to-tr from-primary-1 to-emerald-500 text-white w-1/2"
          >
            Agendar
          </Button>

          {/* <Button type="submit" name="send" radius="sm" className=" w-1/2">
            Enviar
          </Button> */}
        </div>
      </form>
    </>
  );
};

export default WorkshopCreationForm;
