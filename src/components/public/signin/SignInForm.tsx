/**
 * @file This file renders the sign-in form for the scholar role.
 * @remarks allows the user to sign in with their email trhough magic link or with their Google account.
 * also allows the user to sign up if they don't have an account yet.
 * @author Kevin Bravo (kevinbravo.me)
 */
'use client';
import handler from '@/lib/serverAction';
import { signIn } from 'next-auth/react';
import { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

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
  const fetcher = (...args: RequestInfo[] | URL[]) => fetch([...args]).then((res) => res.json());

  const crsfToken = useSWR('../api/crfToken', fetcher, { fallbackData: '' });

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
        {/* <input type="hidden" name="csrfToken" value={crsfToken.data.csrfToken} /> */}
        <label htmlFor="user_email" className="text-sm dark:text-gray-400 text-gray-600">
          Correo electrónico
        </label>
        <input
          autoFocus={true}
          autoComplete="email"
          type="email"
          required={true}
          {...register('email', { required: true })}
          placeholder="kevinbravo@gmail.com"
        />
      </div>
      <button
        name="button"
        type="submit"
        className="bg-transparent border border-primary-light  hover:bg-primary-light hover:text-white font-medium py-1 px-3 rounded-md w-full flex justify-center gap-4"
      >
        Entrar con email
      </button>
    </form>
  );
};

export default SigninForm;
