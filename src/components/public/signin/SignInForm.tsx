/**
 * @file This file renders the sign-in form for the scholar role.
 * @remarks allows the user to sign in with their email trhough magic link or with their Google account.
 * also allows the user to sign up if they don't have an account yet.
 * @author Kevin Bravo (kevinbravo.me)
 */
'use client';
import handler from '@/lib/serverAction';
import { Button, Input } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';

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
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: { email: string }, event: BaseSyntheticEvent) => {
    event.preventDefault();
    await handler(cookieValue);

    await signIn('email', {
      callbackUrl,
      email: data.email,
    });
  };

  return (
    <form onSubmit={handleSubmit(async (data, event) => await onSubmit(data, event!))}>
      <div className="mb-3 flex flex-col gap-2">
        <Input
          label="Correo electrónico"
          autoFocus={true}
          radius='sm'
          autoComplete="email"
          type="email"
          labelPlacement='outside'
          required={true}
          {...register('email', { required: true })}
          placeholder="kevinbravo@gmail.com"
        />
      </div>
      <Button
        name="button"
        type="submit"
        radius='sm'
        className="bg-transparent border border-primary-light  hover:bg-primary-light hover:text-white font-medium w-full  "
      >
        Entrar con email
      </Button>
    </form>
  );
};

export default SigninForm;
