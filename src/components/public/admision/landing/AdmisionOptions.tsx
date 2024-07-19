import AdmisionLinkButtons from '@/components/admission/common/AdmisionLinkButtons';

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
      <div className="flex flex-col md:flex-row gap-6 justify-center w-full">
        {['Zulia', 'Carabobo', 'Caracas'].map((chapter) => (
          <AdmisionLinkButtons chapterName={chapter} />
        ))}
      </div>
    </section>
  );
};

export default AdmisionOptions;
