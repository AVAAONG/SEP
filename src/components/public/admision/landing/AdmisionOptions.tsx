'use client';
import Link from 'next/link';
import React from 'react';

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
      href="/signin"
      className="w-full md:max-w-[25ch] h-min relative group rounded-lg p-2 sm:p-5 text-dark dark:text-light border-primary-light border transition-all dark:hover:bg-primary-light dark:focus:bg-primary-light hover:bg-primary-1 focus:bg-primary-1"
      rel="noopener noreferrer"
    >
      <h2 className={`text-2xl font-medium`}>
        <span className="inline-block">{chapterName}</span>
        <ArrowIcon />
      </h2>
    </Link>
  );
};

const AdmisionOptions = ({ title }: { title: string }) => {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center md:justify-around gap-8 w-full  bg-transparent p-4 m-a"
      id="aplicacion"
    >
      <div className="w-full flex flex-col items-center justify-center gap-3">
        <h1 className="text-3xl font-bold tracking-tighter text-primary-light sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className=" mt-auto  w-full text-gray-500 text-center text-sm md:text-lg ">
          Selecciona la sede de AVAA que corresponda según la ubicación de tu universidad.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-6 justify-center w-full">
        {['Caracas', 'Carabobo', 'Zulia'].map((chapter) => (
          <React.Fragment key={chapter}>
            <AdmisionLinkButtons chapterName={chapter} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default AdmisionOptions;
