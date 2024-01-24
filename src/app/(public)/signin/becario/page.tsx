/**
 * @file  This file renders the sign-in page for the scholar role.
 * @remarks when the user is not signed in, this page will be rendered. Otherwise, the user will be redirected to the callback URL.
 * @remarks If the user signs in with an email not registerd in the SEP, it would render a warning message.
 * @author Kevin Bravo (kevinbravo.me)
 */

import Warning from '@/components/alerts/Warning';
import Aside from '@/components/public/signin/Aside';
import SigninForm from '@/components/public/signin/SignInForm';
import GoogleSignInButton from '@/components/public/signin/signinButtons/GoogleSignInButton';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

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
  const scholarCallbackUrl = (searchParams!.callbackUrl as string) || '/becario/panel';

  if (session) {
    redirect(scholarCallbackUrl);
  }

  return (
    <main className="flex flex-col md:flex-row-reverse min-h-screen md:h-screen bg-light dark:bg-dark overflow-hidden">
      <Aside cookieValue="scholar" />
      <section className="justify-center px-4 md:px-0 md:flex md:w-2/3">
        <div className="py-14 m-auto md:py-9 md:w-7/12 max-w-md">
          {searchParams?.error === 'notAllowed' && (
            <Warning
              title={`El correo no tiene permitido el acceso al SEP.`}
              subtitle={
                'Solo los correos de los becarios que se encuentran registrados en la base de datos de ProExcelencia pueden acceder al SEP.'
              }
            >
              <a
                href="mailto:avaatecnologia@gmail.com"
                className="text-white bg-yellow-600 hover:bg-yellow-500 hover:text-yellow-900 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:hover:bg-yellow-400 dark:focus:ring-yellow-800"
              >
                Pedir ayuda
              </a>
            </Warning>
          )}
          <h2 className="text-xl font-semibold md:text-2xl">¡Entra!</h2>
          <div className="my-4">
            <SigninForm callbackUrl="/becario/panel" cookieValue="scholar" />
          </div>
          <div className="inline-flex items-center justify-around w-full ">
            <hr className="w-40 h-px my-8 border-0 bg-primary-light opacity-40" />
            <span className="absolute px-3 font-medium  text-gray-600 dark:text-gray-400">o</span>
            <hr className="w-40 h-px my-8 border-0 bg-primary-light opacity-40" />
          </div>
          <div className="flex">
            <GoogleSignInButton
              callbackUrl="/becario/panel"
              providerId="userGoogle"
              cookieValue="scholar"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
