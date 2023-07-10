"use client";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

const SigninForm = () => {
  const { register, handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit(async () => await signIn("email", { callbackUrl: "/becario/dsfasd/config" }))}>
      <div className="mb-3 flex flex-col gap-2">
        <label htmlFor="user_email" className="text-sm text-slate-400">
          Correo electrónico
        </label>
        <input
          className="focus:outline-none  focus:outline-offset-0 py-1 px-3 rounded-md w-full bg-emerald-950  ring-1 ring-emerald-900 active:border-zinc-950 focus:outline-emerald-600 "
          autoFocus={true}
          autoComplete="email"
          required={true}
          {...register("email", { required: true })}
          placeholder="kevin@gmail.com"
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

export default SigninForm;
