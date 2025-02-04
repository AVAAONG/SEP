/**
 * @file This is the main page of the application.
 * @author Kevin Bravo (kevinbravo.me)
 */

import Image from 'next/image';
import Link from 'next/link';

/**
 * Renders the main page of the application.
 * @returns The HTML document with the rendered main page.
 * @see {@link https://nextjs.org/docs/app/api-reference/components/link} for more information about Next.js Link component.
 * @see {@link https://nextjs.org/docs/app/api-reference/components/image} for more information about Next.js Image component.
 */
const page = () => (
  <main className="dark:bg-dark bg-light flex min-h-screen flex-col w-full items-center justify-between py-8 lg:p-24 lg:gap-16 overflow-y-clip">
    <div className="w-full items-center justify-left font-mono text-sm">
      <div className="bottom-0 left-0 flex w-full items-end justify-center md:justify-end lg:static lg:h-auto lg:w-auto">
        <Link
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          href="https://www.avaa.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          By <Image src="/avaa-color-simple.png" alt="AVAA Logo" width={100} height={24} priority />
        </Link>
      </div>
    </div>

    <div className="relative flex place-items-center px-8 md:mb-16">
      <Image
        className="relative dark:drop-shadow-[0_0_1rem_#279902] animate-pulse"
        src="/proexcelencia-color.png"
        alt="Logo Proexcelencia"
        width={360}
        height={50}
        priority
      />
    </div>

    <div className="mb-32 grid  text-center sm:text-left gap-6 px-8">
      <Link
        href="/captacion"
        className="relative group rounded-lg p-2 sm:p-5 text-dark dark:text-light border-primary-light border transition-all dark:hover:bg-primary-light dark:focus:bg-primary-light hover:bg-primary-1 focus:bg-primary-1"
        rel="noopener noreferrer"
      >
        <h2 className={`text-2xl font-medium`}>
          <span className="inline-block">Postulate</span>
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              width="50"
              height="20"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              ></path>
            </svg>
          </span>
        </h2>
        <p className={` hidden sm:block m-0 max-w-[30ch] text-xs lg:text-sm `}>
          Postulate al Programa Excelencia AVAA{' '}
        </p>
      </Link>
      <Link
        href="/signin/"
        className="relative group rounded-lg p-2 sm:p-5 text-dark dark:text-light border-primary-light border transition-all dark:hover:bg-primary-light dark:focus:bg-primary-light hover:bg-primary-1 focus:bg-primary-1"
        rel="noopener noreferrer"
      >
        <h2 className={`text-2xl font-medium`}>
          Ingresa en el SEP
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none ">
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              width="30"
              height="20"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              ></path>
            </svg>
          </span>
        </h2>
        <p className={`hidden sm:block m-0 max-w-[30ch] text-xs lg:text-sm`}>
          Ingresa para administrar o ver tu progreso en el programa.
        </p>
      </Link>
    </div>
  </main>
);

export default page;
