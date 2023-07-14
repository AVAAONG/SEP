"use client";
import { signIn } from "next-auth/react";
import Aside from "@/components/auth componets/Aside";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const AdminSignInPage = () => {
  const searchParams = useSearchParams();
  /**
   * Specify to which URL the user will be redirected after signing in. Defaults to the page URL the sign-in is initiated from.
   * @summary The URL to redirect to after a successful sign in or sign up.
   */
  const adminCallbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard";
  return (
    <main className="flex flex-col md:flex-row-reverse min-h-screen md:h-screen bg-gradient-to-b from-emerald-950 to-slate-950">
      <Aside />
      <section className="justify-center px-4 md:px-0 md:flex md:w-2/3">
        <div className="w-full max-w-sm py-4 mx-auto my-auto min-w-min md:py-9 md:w-7/12">
          <h2 className="text-xl font-semibold md:text-2xl">Acceso de administrador </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-3">
            ¿Eres un administrador? Ingresa con tu cuenta de Google.
          </p>
          <p className="text-green-500 text-xs md:text-sm font-semibold">
            Solo los administradores tienen acceso por este medio.
          </p>
          <div className="w-full">
            <hr className="h-px my-6 border-0 bg-emerald-700 opacity-40" />
          </div>
          <div className="flex">
            <a
              onClick={() => signIn("google", { callbackUrl: adminCallbackUrl })}
              role="button"
              className="bg-green-600 hover:bg-emerald-950 border-2 border-emerald-950 hover:border-green-600 text-white font-semibold py-2 px-4 rounded-md w-full flex justify-center gap-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Gmail"
                role="img"
                viewBox="0 0 512 512"
                fill="#000000"
                width={25}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <rect width="512" height="512" rx="15%" fill="#ffffff"></rect>
                  <path d="M158 391v-142l-82-63V361q0 30 30 30" fill="#4285f4"></path>
                  <path d="M 154 248l102 77l102-77v-98l-102 77l-102-77" fill="#ea4335"></path>
                  <path d="M354 391v-142l82-63V361q0 30-30 30" fill="#34a853"></path>
                  <path d="M76 188l82 63v-98l-30-23c-27-21-52 0-52 26" fill="#c5221f"></path>
                  <path d="M436 188l-82 63v-98l30-23c27-21 52 0 52 26" fill="#fbbc04"></path>
                </g>
              </svg>
              Acceder con Google
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminSignInPage;
