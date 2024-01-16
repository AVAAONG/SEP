'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@nextui-org/input';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { BaseSyntheticEvent } from 'react';
import { Control, Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import BaseSpeakerFormCreation from './BaseForm';

const SpeakerCreationFormSchema = z.object({
  first_names: z.string().min(1, { message: 'El facilitador debe de tener minimo un nombre' }),
  last_names: z.string().min(1, { message: 'El facilitador debe de tener minimo un apellido' }),
  email: z.string().email().min(1, { message: 'Debes especificar el correo del facilitador' }),
  birthdate: z.string().refine((date) => new Date(date) <= new Date(), {
    message: 'La fecha no puede ser mayor a la actual',
  }),
  years_of_exp: z.string().optional(),
  job_title: z.string().optional(),
  job_company: z.string().optional(),
  actual_city: z.string().optional(),
  actual_country: z.string().optional(),
  phone_number: z.string().optional(),
  image: z.string().optional(),
  description: z.string().optional(),
  instagram_user: z.string().optional(),
  twitter_user: z.string().optional(),
  linkedin_user: z.string().optional(),
  facebook_user: z.string().optional(),
  curriculum: z.string().optional(),
  gender: z.enum(['M', 'F', 'O']).optional(),
});

const d = [
  {
    label: 'Nombre(s)',
    name: 'first_names',
    kindOfInput: 'text',
  },
  {
    label: 'Apellido(s)',
    name: 'last_names',
    kindOfInput: 'text',
  },
  {
    label: 'Correo Electrónico',
    name: 'email',
    kindOfInput: 'email',
  },
  {
    label: 'Fecha de Nacimiento',
    name: 'birthdate',
    kindOfInput: 'date',
  },
  {
    label: 'Años de Experiencia',
    name: 'years_of_exp',
    kindOfInput: 'number',
  },
  {
    label: 'Título de Trabajo',
    name: 'job_title',
    kindOfInput: 'text',
  },
  {
    label: 'Compañía de Trabajo',
    name: 'job_company',
    kindOfInput: 'text',
  },
  {
    label: 'Ciudad Actual',
    name: 'actual_city',
    kindOfInput: 'text',
  },
  {
    label: 'País Actual',
    name: 'actual_country',
    kindOfInput: 'text',
  },
  {
    label: 'Usuario de Instagram',
    name: 'instagram_user',
    kindOfInput: 'text',
  },
  {
    label: 'Usuario de Twitter',
    name: 'twitter_user',
    kindOfInput: 'text',
  },
  {
    label: 'Usuario de LinkedIn',
    name: 'linkedin_user',
    kindOfInput: 'text',
  },
  {
    label: 'Usuario de Facebook',
    name: 'facebook_user',
    kindOfInput: 'text',
  },
  {
    label: 'Número de Teléfono',
    name: 'phone_number',
    kindOfInput: 'text',
  },
];

interface InputComponentProps {
  control: Control<any, any>;
  label: string;
  name: string;
  kindOfInput: string;
}

const InputComponent: React.FC<InputComponentProps> = ({ control, label, name, kindOfInput }) => (
  <Controller
    name={name}
    control={control}
    shouldUnregister={true}
    render={({ field, formState }) => {
      return (
        <Input
          value={field.value}
          onChange={field.onChange}
          isInvalid={!!formState.errors?.[name]?.message}
          errorMessage={formState.errors?.[name]?.message?.toString()}
          type={kindOfInput}
          label={label}
          radius="sm"
          classNames={{ base: 'col-span-4 md:col-span-1' }}
          labelPlacement="outside"
        />
      );
    }}
  />
);

const SpeakerCreationForm = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { control, handleSubmit } = useForm<z.infer<typeof SpeakerCreationFormSchema>>({
    resolver: zodResolver(SpeakerCreationFormSchema),
    defaultValues: {},
  });
  const handleFormSubmit = (
    data: z.infer<typeof SpeakerCreationFormSchema>,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    console.log(data);
  };
  return (
    <>
      <Button onPress={onOpen}>Crear facilitador</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        scrollBehavior="outside"
        classNames={{
          backdrop: 'bg-secondary-dark bg-opacity-80',
          base: 'bg-light dark:bg-dark',
        }}
      >
        <form onSubmit={handleSubmit((data, event) => handleFormSubmit(data, event))}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="col-span-2 text-center w-full font-semibold text-2xl text-primary-light uppercase tracking-widest">
                  Crear Facilitador
                </ModalHeader>
                <ModalBody className="grid grid-cols-4 w-full items-center justify-center gap-4">
                  <BaseSpeakerFormCreation control={control} />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" radius="sm" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>

                  <Button
                    type="submit"
                    radius="sm"
                    className="bg-gradient-to-tr from-primary-1 to-emerald-500 text-white "
                  >
                    Crear facilitador
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default SpeakerCreationForm;
