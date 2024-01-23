/**
 * @file This file renders a custom 404 error page.
 * @remarks This custom 404 error page is rendered when a user navigates to a route that does not exist in the application.
 * @author Kevin Bravo (kevinbravo.me)
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/not-found} for more information about the Next.js custom 404 error page.
 */

import BackButton from '@/components/public/BackButton';
import Link from 'next/link';
import { NotFoundImage } from '../../public/svgs/svgs';

/**
 * The NotFound component renders a custom 404 error page.
 * The page includes a white background with a green header that displays the error code "404" in a large font.
 * Below the header, there is a message that informs the user that the page was not found and suggests that they check the URL and try again.
 * The page also includes two buttons: a "Back" button that allows the user to go back to the previous page, and a "Contact Support" button that opens the user's email client with a pre-filled email address.
 */
const NotFound = () => {
  return (
    <div className="bg-light dark:bg-dark min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <div className="max-w-xs m-auto">
          <NotFoundImage />
        </div>
        <main className="sm:flex">
          <p className="text-4xl font-extrabold text-primary-light sm:text-5xl">404</p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-200 tracking-tight sm:text-5xl">
                Página no encontrada. <span className="font-normal">🤔</span>
              </h1>
              <p className="mt-1 text-base text-gray-500">
                Verifique la URL en la barra de dirección y vuelva a intentarlo.
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <BackButton />
              <Link
                href="mailto:avaatecnologia@gmail.com"
                className="inline-flex items-center px-4 py-2 border-primary-light border border-transparent text-sm font-medium rounded-md text-primary-light bg-secondary-1 hover:bg-secondary-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light"
              >
                Contacta con soporte
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotFound;
