/**
 * @file This file renders the sign-in form for the scholar role.
 * @remarks allows the user to sign in with their email trhough magic link or with their Google account.
 * also allows the user to sign up if they don't have an account yet.
 * @author Kevin Bravo (kevinbravo.me)
 */
'use client';
import scholarSignInSchema from '@/lib/schemas/scholarSignInSchema';
import handler from '@/lib/serverAction';
import { Button, Input } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { BaseSyntheticEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

interface SigninFormProps {
  callbackUrl: string;
  cookieValue: string;
}

/**
 * Renders the sign-in form for the scholar role.
 * @param param0  - The callback URL to redirect to after a successful sign in or sign up.
 * @param param1 - The cookie value to be set.
 * @remarks use magic link to allow the user to aces the SEP.
 * @returns The sign-in form for the scholar role.
 */
const SigninForm = ({ callbackUrl, cookieValue }: SigninFormProps) => {
  const { handleSubmit, formState, control } = useForm<z.infer<typeof scholarSignInSchema>>();
  const { isValid, isSubmitting } = formState;

  const onSubmit = async (data: { email: string }, event: BaseSyntheticEvent) => {
    event.preventDefault();
    await handler(cookieValue);

    await signIn('email', {
      callbackUrl,
      email: data.email,
    });
  };

  return (
    <form onSubmit={handleSubmit(async (data, event) => toast.promise(onSubmit(data, event!), {
      pending: 'Realizando analisis de seguridad.',
      success: 'Analisis de seguridad completado. Enviando enlace de acceso.',
      error: 'Ocurrio un error',
    }))}>
      <div className="mb-3 flex flex-col gap-2">
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          shouldUnregister={true}
          render={({ field, formState }) => (
            <Input
              label="Correo electrónico"
              autoFocus={true}
              required={true}
              radius='sm'
              autoComplete="email"
              type="email"
              labelPlacement='outside'
              value={field.value}
              onChange={field.onChange}
              isInvalid={!!formState.errors?.email?.message}
              errorMessage={formState.errors?.email?.message?.toString()}
              placeholder="becario@gmail.com"
            />
          )}
        />
      </div>
      <Button
        name="button"
        type="submit"
        isDisabled={!isValid || isSubmitting}
        radius='sm'
        className="bg-transparent border border-primary-light  hover:bg-primary-light hover:text-white font-medium w-full  "
      >
        Entrar con email
      </Button>
    </form>
  );
};

export default SigninForm;
