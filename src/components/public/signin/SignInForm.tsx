'use client';
import InputField from '@/components/fields/InputFormField';
import scholarSignInSchema from '@/lib/schemas/scholarSignInSchema';
import { Button } from "@heroui/react";
import { signIn } from 'next-auth/react';
import { BaseSyntheticEvent } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

const SigninForm = () => {
  const methods = useForm<z.infer<typeof scholarSignInSchema>>();

  const { handleSubmit, formState } = methods;
  const { isValid, isSubmitting } = formState;

  const onSubmit = async (data: { email: string }, event: BaseSyntheticEvent) => {
    event.preventDefault();
    await signIn('email', {
      email: data.email,
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(async (data, event) =>
          toast.promise(onSubmit(data, event!), {
            pending: 'Realizando análisis de seguridad.',
            success: 'Análisis de seguridad completado. Enviando enlace de acceso.',
            error: 'Ocurrió un error',
          })
        )}
      >
        <div className="mb-3 flex flex-col gap-2">
          <InputField
            name="email"
            label="Correo electrónico"
            type="email"
            required={true}
            placeholder="nombre@gmail.com"
          />
        </div>
        <Button
          name="button"
          type="submit"
          isDisabled={!isValid || isSubmitting}
          radius="sm"
          className="bg-transparent border border-primary-light  hover:bg-primary-light hover:text-white font-medium w-full  "
        >
          Entrar con email
        </Button>
      </form>
    </FormProvider>
  );
};

export default SigninForm;
