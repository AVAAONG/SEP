/**
 * @file  This file renders the sign-in page for the admin role.
 * @remarks when the user is not signed in, this page will be rendered. Otherwise, the user will be redirected to the callback URL.
 * @remarks If the user signs in with an email not registered in the SEP as an admin, it would show an error message.
 * @author Kevin Bravo (kevinbravo.me)
 */

import Aside from '@/components/public/signin/Aside';
import GoogleSignInButton from '@/components/public/signin/signinButtons/GoogleSignInButton';

/**
 * Renders the sign-in page for the admin role.
 * @param searchParams - The search params of the URL.
 * @returns The sign-in page for the admin role.
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional} for more information about Next.js search params argument
 */
const page = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  /**
   * Specify to which URL the user will be redirected after signing in. Defaults to the page URL the sign-in is initiated from.
   * @summary The URL to redirect to after a successful sign in or sign up.
   */
  const adminCallbackUrl = (searchParams!.callbackUrl as string) || '/admin/dashboard';

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
            <GoogleSignInButton
              callbackUrl={adminCallbackUrl}
              providerId="google"
              cookieValue="admin"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
