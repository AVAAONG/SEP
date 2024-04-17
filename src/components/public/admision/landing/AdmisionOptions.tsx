import Link from 'next/link';

const ArrowIcon = () => {
  return (
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
  );
};

const AdmisionOptions = ({ title }: { title: string }) => {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-around w-full p-8 lg:p-24 bg-transparent"
      id="aplicacion"
    >
      <div className="w-full flex flex-col items-center justify-center gap-3">
        <h1 className="text-3xl font-bold tracking-tighter text-primary-light sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className=" mt-auto text-lg w-full text-gray-500 text-center ">
          Selecciona el Capítulo en base a donde se encuentre el campus de tu universidad
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-6 justify-center w-full  ">
        <Link
          href="/postulante/registro"
          className="w-full md:max-w-[35ch] h-min relative group rounded-lg p-2 sm:p-5 text-dark dark:text-light border-primary-light border transition-all dark:hover:bg-primary-light dark:focus:bg-primary-light hover:bg-primary-1 focus:bg-primary-1"
          rel="noopener noreferrer"
        >
          <h2 className={`text-2xl font-medium`}>
            <span className="hidden md:inline-block">Capítulo Zulia</span>
            <span className="inline-block md:hidden">Zulia</span>

            <ArrowIcon />
          </h2>
          <p className={`hidden sm:block m-0 max-w-[30ch] text-xs lg:text-sm`}>
            Si el campus de tu universidad se encuentra en el estado de Zulia, ingresa aqui
          </p>
        </Link>
        <Link
          href="/postulante/registro"
          className="w-full md:max-w-[35ch] h-min  relative group rounded-lg p-2 sm:p-5 text-dark dark:text-light border-primary-light border transition-all dark:hover:bg-primary-light dark:focus:bg-primary-light hover:bg-primary-1 focus:bg-primary-1"
          rel="noopener noreferrer"
        >
          <h2 className={`text-2xl font-medium`}>
            <span className="hidden md:inline-block">Capítulo Carabobo</span>
            <span className="inline-block md:hidden">Carabobo</span>
            <ArrowIcon />
          </h2>
          <p className={`hidden sm:block m-0 max-w-[30ch] text-xs lg:text-sm`}>
            Si el campus de tu universidad se encuentra en el estado de Carabobo, ingresa aqui
          </p>
        </Link>
        <Link
          href="/postulante/registro"
          className="w-full md:max-w-[35ch] h-min relative group rounded-lg p-2 sm:p-5 text-dark dark:text-light border-primary-light border transition-all dark:hover:bg-primary-light dark:focus:bg-primary-light hover:bg-primary-1 focus:bg-primary-1"
          rel="noopener noreferrer"
        >
          <h2 className={`text-2xl font-medium`}>
            <span className="hidden md:inline-block">Capítulo Caracas</span>
            <span className="inline-block md:hidden">Caracas</span>
            <ArrowIcon />
          </h2>
          <p className={`hidden sm:block m-0 max-w-[30ch] text-xs lg:text-sm`}>
            Si el campus de tu universidad se encuentra en la Region Capital, ingresa aqui
          </p>
        </Link>
      </div>
    </section>
  );
};

export default AdmisionOptions;
