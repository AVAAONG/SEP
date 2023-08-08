import { CheckIcon, XIcon } from '@/assets/svgs';
import { useEffect } from 'react';

interface LoadingModalProps {
  state: 'updating' | 'updated' | 'error' | 'none';
  changeState: (state: 'updating' | 'updated' | 'error' | 'none') => void;
}

const LoadingModal = ({ state, changeState }: LoadingModalProps) => {
  if (state === 'none') return null;
  else if (state === 'error') {
    return (
      <div className="relative p-4 w-full h-full transition-opacity">
        <div className="relative p-4 rounded-lg shadow bg-red-100 md:p-8 ">
          <div className="flex flex-col justify-center items-center transition-all duration-500">
            <h3 className="mb-3 text-sm font-bold  text-red-800 dark:text-gray-300">
              Ocurrio un error inesperado al guardar
            </h3>
            <div className="w-1/3">
              <XIcon />
            </div>
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => changeState('none')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-100 bg-red-600 hover:bg-red-700 hover:text-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
              >
                Intentalo de nuevo
              </button>
              <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-200 hover:bg-red-600 hover:text-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600">
                Contacta con soporte
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (state === 'updating') {
    return (
      <div className="p-4 w-full h-full animate-pulse">
        <div className="p-4 rounded-lg shadow bg-gray-100 md:p-8">
          <div className="flex flex-col justify-center items-center">
            <h3 className="mb-3 text-lg font-bold  text-emerald-800">
              Actualizando tus datos
            </h3>
            <div className="w-1/3">
              <svg
                className="animate-spin w-full text-emerald-600 transition-all duration-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a8 004-4h4zm-2-5.291A7.962 7.962 0 0120 12h4c0-3.042-1.135-5.824-3-7.938l-3 2.647z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (state === 'updated') {
    return (
      <div className="w-full h-full animate-pulse">
        <div className="relative p-4 rounded-lg shadow bg-green-100 md:p-8">
          <div className="flex flex-col justify-center items-center transition-all duration-500">
            <h3 className="mb-3 text-sm font-bold  text-emerald-700 dark:text-emerald-600">
              ¡Tus datos se han actualizado de forma correcta!
            </h3>
            <div className="w-1/3">
              <CheckIcon color="#16a34a" />
            </div>
          </div>
        </div>
      </div>
    );
  } else return <> </>;
};

export default LoadingModal;
