"use client";
import handler from "@/lib/auth/serverAction";
import { signIn } from "next-auth/react";
import { BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import useSWR from 'swr'

interface SigninFormProps {
  callbackUrl: string;
  cookieValue: string;
}


const SigninForm = ({ callbackUrl, cookieValue }: SigninFormProps) => {
  const { register, handleSubmit } = useForm();
  const fetcher = (...args: RequestInfo[] | URL[]) => fetch([...args]).then(res => res.json())

  const crsfToken = useSWR('../api/crfToken', fetcher, { fallbackData: "" })

  const onSubmit = async (data: { email: string }, event: BaseSyntheticEvent) => {
    event.preventDefault();
    console.log(data)
    await handler(cookieValue)

    await signIn("email", {
      callbackUrl,
      email: data.email,
    });
  };


  return (
    <form onSubmit={handleSubmit(async (data, event) => await onSubmit(data, event!))}>
      <div className="mb-3 flex flex-col gap-2">
        {/* <input type="hidden" name="csrfToken" value={crsfToken.data.csrfToken} /> */}
        <label htmlFor="user_email" className="text-sm text-slate-400">
          Correo electrónico
        </label>
        <input
          className="focus:outline-none  focus:outline-offset-0 py-1 px-3 rounded-md w-full bg-emerald-950  ring-1 ring-emerald-900 active:border-zinc-950 focus:outline-emerald-600 "
          autoFocus={true}
          autoComplete="email"
          type="email"
          required={true}
          {...register("email", { required: true })}
          placeholder="kevinbravo@gmail.com"
        />
      </div>
      <button
        name="button"
        type="submit"
        className="bg-transparent border-2 border-emerald-900 hover:bg-green-600 hover:border-green-600 text-white font-semibold py-1 px-3 rounded-md w-full flex justify-center gap-4"
      >
        Entra con email
      </button>
    </form>
  );
};


export default SigninForm
