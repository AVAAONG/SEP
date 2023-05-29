'use client'

import Image from 'next/image'
import React from 'react'
import { useSearchParams, useRouter } from "next/navigation";
import { useSession, signIn } from 'next-auth/react'
const page = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/profile";
    const { data: session, status } = useSession()
    // if (status === 'loading') {
    //     return <p className='text-white'>Cargando...</p>
    // }
    // if (status === 'authenticated' && session) {
    //     return <p className='text-white'>Ya estas autenticado como {session.user.email}.</p>
    // }
    if (status === 'unauthenticated') {

        return (
            <main className="flex flex-col md:flex-row-reverse min-h-screen md:h-screen bg-gradient-to-b from-emerald-950 to-slate-950">s
                <section className="flex items-center  w-full px-4 mx-auto md:px-0 md:items-center md:w-1/3">
                    <div className="flex flex-col items-center w-full max-w-sm py-4 mx-auto md:mx-0 my-auto min-w-min relative md:-left-2.5 pt-4 md:py-4 transform origin-left md:gap-44">
                        <hr className="hidden md:block w-full h-px my-8 border-0 bg-emerald-700 opacity-75 rotate-90 -translate-x-36 " />
                        <div className="flex items-center space-x-1 -translate-x-10 relative drop-shadow-[0_0_1rem_#279902]">
                            <Image src='/logo-proexcelencia-cap.png' alt='Proexcelencia Logo' width={80} height={80}></Image>
                            <Image src='/logo-proexcelencia-words.png' alt='Proexcelencia Logo' width={200} height={100} className='animate-pulse'></Image>
                        </div>
                        <hr className="hidden w-full md:block  h-px my-8  border-0 bg-emerald-700 opacity-75 rotate-90 -translate-x-36" />
                    </div>
                </section>
                <section className="justify-center px-4 md:px-0 md:flex md:w-2/3">
                    <div className="w-full max-w-sm py-4 mx-auto my-auto min-w-min md:py-9 md:w-7/12">
                        <h2 className="text-xl font-semibold md:text-2xl">Entra</h2>
                        <p className="text-xs md:text-sm text-slate-400">¿Nuevo en el programa? {' '}
                            <a className="text-green-600 text-xs md:text-sm font-semibold" href="/auth/register">Registrate.</a>
                        </p>
                        <div className="my-4">
                            <form className="new_user" id="new_user" action="/register" acceptCharset="UTF-8" method="post">
                                <input type="hidden" name="authenticity_token" value="" autoComplete="off" />
                                <div className="mb-3 flex flex-col gap-2">
                                    <label htmlFor="user_email" className='text-sm text-slate-400'>Correo electronico</label>
                                    <input className='focus:outline-none  focus:outline-offset-0 py-1 px-3 rounded-md w-full bg-emerald-950  ring-1 ring-emerald-900 active:border-zinc-950 focus:outline-emerald-600 ' autoFocus={true} autoComplete="email" required={true} type="email" name="user[email]" id="user_email" />
                                </div>
                                <div className="mb-3 flex flex-col gap-2">
                                    <label htmlFor="user_password" className='text-sm text-slate-400'>Contrasena</label>
                                    <input autoComplete="current-password" className='focus:outline-none focus:outline-offset-0  focus:outline-emerald-600  py-1 px-3 rounded-md w-full  bg-emerald-950 ring-1 ring-emerald-900 border-emerald-700' required={true} type="password" name="user[password]" id="user_password" />
                                </div>
                                <div className="flex justify-between mb-4">
                                    <a className="text-xs text-slate-400 hover:text-green-600" href="/password/new">¿Olvidaste tu contrasena?</a>
                                </div>
                                <button name="button" type="submit" className="bg-emerald-950 hover:bg-green-600 hover:border-none font-semibold box-border border-emerald-900 border-2 py-1 px-4 w-full rounded-md">Entra</button>
                            </form>
                        </div>
                        <div className="inline-flex items-center justify-around w-full ">
                            <hr className="w-40 h-px my-8 border-0 bg-emerald-700 opacity-40" />
                            <span className="absolute px-3 font-medium  text-white ">o</span>
                            <hr className="w-40 h-px my-8 border-0 bg-emerald-700 opacity-40" />
                        </div>
                        <div className="flex">
                            <form className="mb-4 w-full"   >
                                <input type="hidden" name="authenticity_token" value="" autoComplete="off" />
                                <button
                                    onClick={() => signIn("google", { callbackUrl })}
                                    className="bg-green-600 hover:bg-emerald-950 border-2 border-emerald-950 hover:border-green-600 text-white font-semibold py-2 px-4 rounded-md w-full flex justify-center gap-4"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-label="Gmail" role="img" viewBox="0 0 512 512" fill="#000000" width={25}><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><rect width="512" height="512" rx="15%" fill="#ffffff"></rect><path d="M158 391v-142l-82-63V361q0 30 30 30" fill="#4285f4"></path><path d="M 154 248l102 77l102-77v-98l-102 77l-102-77" fill="#ea4335"></path><path d="M354 391v-142l82-63V361q0 30-30 30" fill="#34a853"></path><path d="M76 188l82 63v-98l-30-23c-27-21-52 0-52 26" fill="#c5221f"></path><path d="M436 188l-82 63v-98l30-23c27-21 52 0 52 26" fill="#fbbc04"></path></g></svg>
                                    Entra con google
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main >
        )
    }
}

export default page