'use client';
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
const AdmisionLinkButtons = ({ chapterName }: { chapterName: string }) => {
  return (
    <Link
      href="/signin/postulante?chapter=zulia&"
      className="w-full md:max-w-[35ch] h-min relative group rounded-lg p-2 sm:p-5 text-dark dark:text-light border-primary-light border transition-all dark:hover:bg-primary-light dark:focus:bg-primary-light hover:bg-primary-1 focus:bg-primary-1"
      rel="noopener noreferrer"
      onClick={() => fetch(`/api/setAuthCookie?cookieValue=${chapterName}`)}
    >
      <h2 className={`text-2xl font-medium`}>
        <span className="hidden md:inline-block">Capítulo {chapterName}</span>
        <span className="inline-block md:hidden">{chapterName}</span>

        <ArrowIcon />
      </h2>
      <p className={`hidden sm:block m-0 max-w-[30ch] text-xs lg:text-sm`}>
        Si el campus de tu universidad se encuentra en el estado de {chapterName}, ingresa aqui
      </p>
    </Link>
  );
};

export default AdmisionLinkButtons;
