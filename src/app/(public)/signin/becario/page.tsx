/**
 * @file  This file renders the sign-in page for the scholar role.
 * @remarks when the user is not signed in, this page will be rendered. Otherwise, the user will be redirected to the callback URL.
 * @remarks If the user signs in with an email not registerd in the SEP, it would render a warning message.
 * @author Kevin Bravo (kevinbravo.me)
 */

import Warning from "@/components/alerts/Warning";
import Aside from "@/components/public/signin/Aside";
import SigninForm from "@/components/public/signin/forms/SignInForm";
import GoogleSignInButton from "@/components/public/signin/signinButtons/GoogleSignInButton";
import authOptions from "@/lib/auth/nextAuthScholarOptions/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation"


/**
 * Renders the sign-in page for the scholar role.
 * @param searchParams - The search params of the URL.
 * @returns The sign-in page for the scholar role.
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional} for more information about Next.js search params argument
 */
const page = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getServerSession(authOptions);
  /**
   * Specify to which URL the user will be redirected after signing in. Defaults to the page URL the sign-in is initiated from.
   * @summary The URL to redirect to after a successful sign in or sign up.
   */
  const scholarCallbackUrl = searchParams!.callbackUrl as string || "/becario/config";
  if (session) {
    redirect(scholarCallbackUrl);
  }
  return (
    <main className="flex flex-col md:flex-row-reverse min-h-screen md:h-screen bg-gradient-to-b from-emerald-950 to-slate-950">
      <Aside />
      <section className="justify-center px-4 md:px-0 md:flex md:w-2/3">
        <div className="w-full max-w-sm py-4 mx-auto my-auto min-w-min md:py-9 md:w-7/12">
          {searchParams?.error === "notAllowed" && (
            <Warning
              title={`El correo no tiene permitido el acceso al SEP.`}
              subtitle={
                "Solo los correos de los becarios que se encuentran registrado en la base de datos de ProExcelencia pueden acceder al SEP"
              }
            />
          )}
          <h2 className="text-xl font-semibold md:text-2xl">¡Entra!</h2>
          <div className="my-4">
            <SigninForm callbackUrl="/becario/config" cookieValue="scholar" />
          </div>
          <div className="inline-flex items-center justify-around w-full ">
            <hr className="w-40 h-px my-8 border-0 bg-emerald-700 opacity-40" />
            <span className="absolute px-3 font-medium  text-white ">o</span>
            <hr className="w-40 h-px my-8 border-0 bg-emerald-700 opacity-40" />
          </div>

          <div className="flex">
            <GoogleSignInButton callbackUrl="/becario/config" providerId="userGoogle" cookieValue="scholar" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
