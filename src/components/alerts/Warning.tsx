import React from 'react';

interface WarningProps {
  title: string;
  subtitle: string;
}

const Warning = ({ title, subtitle }: WarningProps) => {
  return (
    <div
      className="p-4 mb-4 text-yellow-600 border border-yellow-300 rounded-lg bg-transparent dark:bg-transparent dark:text-yellow-400 dark:border-yellow-800"
      role="alert"
    >
      <div className="flex items-center ">
        <svg
          className="flex-shrink-0 w-4 h-4 mr-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <div className="mt-2 mb-4 text-sm">{subtitle}</div>
      <div className="flex">
        <button
          type="button"
          className="text-white bg-yellow-600 hover:bg-yellow-500 hover:text-yellow-900 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:hover:bg-yellow-400 dark:focus:ring-yellow-800"
        >
          <svg
            className="-ml-0.5 mr-2 h-3 w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 14"
          >
            <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
          </svg>
          Ver correos permitidos
        </button>
        <button
          type="button"
          className="text-yellow-600 bg-transparent border border-yellow-600 hover:bg-yellow-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-gray-800 dark:focus:ring-yellow-600"
          data-dismiss-target="#alert-additional-content-4"
          aria-label="Close"
        >
          Pedir ayuda
        </button>
      </div>
    </div>
  );
};

export default Warning;
