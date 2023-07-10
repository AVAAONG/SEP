'use client'
import React from 'react'
import { useSearchParams } from "next/navigation";
import { signIn } from 'next-auth/react'

import Aside from '@/components/auth componets/Aside';

const page = () => {
    const searchParams = useSearchParams();

    /**
     * Specify to which URL the user will be redirected after signing in. Defaults to the page URL the sign-in is initiated from.
     * @summary The URL to redirect to after a successful sign in or sign up.
     */
    const adminCallbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard";
    const scholarCallbackUrl  = searchParams.get("callbackUrl") || "/becario/dashboard";

    return (
        <main className="flex flex-col sm:flex-row-reverse min-h-screen sm:h-screen bg-gradient-to-b from-emerald-950 to-slate-950">
            <Aside />
            <section className="justify-center px-4 md:px-0 md:flex md:w-2/3">
                <div className="w-full max-w-sm py-4 mx-auto my-auto min-w-min md:py-9 md:w-7/12">
                    <h2 className="text-xl font-semibold md:text-2xl">Registrate</h2>
                    <p className="text-xs md:text-sm text-slate-400">¿Ya tienes una cuenta? {' '}
                        <a className="text-green-600 text-xs md:text-sm font-semibold" href="/auth/signIn">Entra.</a>
                    </p>
                    <div className="my-4">
                        <form className="new_user" id="new_user" action="/register" acceptCharset="UTF-8" method="post">
                            <input type="hidden" name="authenticity_token" value="W2UJYFiq_3As3omwiyfdMIYlpgTavuR8vcsjIFUhbAVcxRm9egyIbaOvUm75Vz2VXzD8ClWfkmxxsEwy7tYvmQ" autoComplete="off" />
                            <div className="mb-3 flex flex-col gap-2">
                                <label htmlFor="user_email" className='text-sm text-slate-400'>Correo electronico</label>
                                <input className='focus:outline-none  focus:outline-offset-0 py-1 px-3 rounded-md w-full bg-emerald-950  ring-1 ring-emerald-900 active:border-zinc-950 focus:outline-emerald-600 ' autoFocus={true} autoComplete="email" required={true} type="email" name="user[email]" id="user_email" />
                            </div>
                            <div className="mb-3 flex flex-col gap-2">
                                <label htmlFor="user_password" className='text-sm text-slate-400'>Contraseña</label>
                                <input autoComplete="current-password" className='focus:outline-none focus:outline-offset-0  focus:outline-emerald-600  py-1 px-3 rounded-md w-full bg-emerald-950 ring-1 ring-emerald-900 border-emerald-700' required={true} type="password" name="user[password]" id="user_password" />
                            </div>
                            <div className="mb-3 flex flex-col gap-2">
                                <label htmlFor="user_password" className='text-sm text-slate-400'>Confirmar contraseña</label>
                                <input autoComplete="current-password" className='focus:outline-none focus:outline-offset-0  focus:outline-emerald-600  py-1 px-3 rounded-md w-full bg-emerald-950 ring-1 ring-emerald-900 border-emerald-700' required={true} type="password" name="user[password]" id="user_password" />
                            </div>
                            <p className="mb-3 text-xs text-slate-400 ">
                                Al registrarse, acepta el procesamiento de sus datos personales por ProExcelencia como se describe en las <a href="" target="_blank" className='text-green-500 hover:font-semibold' >Politica de Privacidad.</a>
                            </p>
                            <div className="flex items-center mb-4 gap-2">
                                <input className="w-4 h-4 text-blue-600 bg-slate-400 rounded" type="checkbox" required={true} />
                                <label className="mb-0 font-normal text-xs" htmlFor="tos">He leido y acepto los{" "}<a href="" target="_blank" className='text-green-500 hover:font-semibold' >Terminos del servicio.</a></label>
                            </div>
                            <button name="button" type="submit" className="bg-emerald-950 hover:bg-green-600 hover:border-green-600 font-semibold box-border border-emerald-900 border-2 py-1 px-4 w-full rounded-md">Registrate</button>
                        </form>
                    </div>
                    <div className="inline-flex items-center justify-around w-full ">
                        <hr className="w-40 h-px my-8  border-0 bg-emerald-700 opacity-40" />
                        <span className="absolute px-3 font-medium   text-white ">o</span>
                        <hr className="w-40 h-px my-8  border-0 bg-emerald-700 opacity-40" />
                    </div>
                    <div className="flex mb-4 w-full">

                        {/* <a
                        ESTA ES PARA ADMINISTRADORES
                            onClick={() => signIn('google', { callbackUrl })}
                            role="button"
                            className="bg-green-600 hover:bg-emerald-950 border-2 border-emerald-950 hover:border-green-600 text-white font-semibold py-2 px-4 rounded-md w-full flex justify-center gap-4"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" aria-label="Gmail" role="img" viewBox="0 0 512 512" fill="#000000" width={25}><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><rect width="512" height="512" rx="15%" fill="#ffffff"></rect><path d="M158 391v-142l-82-63V361q0 30 30 30" fill="#4285f4"></path><path d="M 154 248l102 77l102-77v-98l-102 77l-102-77" fill="#ea4335"></path><path d="M354 391v-142l82-63V361q0 30-30 30" fill="#34a853"></path><path d="M76 188l82 63v-98l-30-23c-27-21-52 0-52 26" fill="#c5221f"></path><path d="M436 188l-82 63v-98l30-23c27-21 52 0 52 26" fill="#fbbc04"></path></g></svg>
                            Registrate con Google
                        </a> */}
                        <a
                            onClick={() => signIn('userGoogle', { scholarCallbackUrl })}
                            role="button"
                            className="bg-green-600 hover:bg-emerald-950 border-2 border-emerald-950 hover:border-green-600 text-white font-semibold py-2 px-4 rounded-md w-full flex justify-center gap-4"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" aria-label="Gmail" role="img" viewBox="0 0 512 512" fill="#000000" width={25}><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><rect width="512" height="512" rx="15%" fill="#ffffff"></rect><path d="M158 391v-142l-82-63V361q0 30 30 30" fill="#4285f4"></path><path d="M 154 248l102 77l102-77v-98l-102 77l-102-77" fill="#ea4335"></path><path d="M354 391v-142l82-63V361q0 30-30 30" fill="#34a853"></path><path d="M76 188l82 63v-98l-30-23c-27-21-52 0-52 26" fill="#c5221f"></path><path d="M436 188l-82 63v-98l30-23c27-21 52 0 52 26" fill="#fbbc04"></path></g></svg>
                            Regístrate con Google
                        </a>


                    </div>
                </div>
            </section >
        </main >
    )
}

export default page