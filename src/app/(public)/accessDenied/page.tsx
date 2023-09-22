import BackButton from '@/components/public/BackButton';
import Image from 'next/image';
import Link from 'next/link';

const page = () => {
  return (
    <div className="bg-light dark:bg-dark min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <div className="max-w-xs m-auto">
          <Image src="/svgs/access-denied.svg" width={450} height={450} alt="acceso denegado" />
        </div>
        <main className="sm:flex">
          <p className="text-4xl font-extrabold text-primary-light sm:text-5xl">403</p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-200 tracking-tight sm:text-5xl">
                Accion denegada.{' '}<span className="font-normal">🤨</span>
              </h1>
              <p className="mt-1 text-base text-gray-500">
                No tienes los permisos necesarios para ingresar a esta pagina.
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

export default page;
