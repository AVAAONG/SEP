'use client';

import { Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Log the error to an error reporting service
    console.error('Application Error:', error);
  }, [error]);

  const refreshPage = () => {
    window.location.reload();
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
        {/* Subtle geometric background pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.02]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='%23000000' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>

          {/* Modern accent elements */}
          <div className="absolute top-20 right-20 w-64 h-1 bg-gradient-to-r from-red-500 to-transparent opacity-20"></div>
          <div className="absolute bottom-20 left-20 w-64 h-1 bg-gradient-to-r from-red-500 to-transparent opacity-20"></div>
          <div className="absolute top-1/2 right-0 w-1 h-32 bg-gradient-to-b from-red-500 to-transparent opacity-20"></div>
        </div>

        {/* Main content container */}
        <div className="relative z-10 flex h-screen w-full flex-col items-center justify-center px-6">
          <div
            className={`text-center max-w-4xl mx-auto transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            {/* Status indicator */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-2xl mb-8 border border-red-100">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            {/* Error code */}
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-red-100 text-red-600 text-sm font-medium rounded-full tracking-wide uppercase">
                Error de Servidor
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-6 tracking-tight">
              Error del Servidor
            </h1>

            {/* Divider line */}
            <div className="w-24 h-0.5 bg-red-500 mx-auto mb-8"></div>

            {/* Description */}
            <div className="max-w-2xl mx-auto mb-12">
              <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed mb-4">
                Tenemos un error con el pago de servidores.
              </p>
              <p className="text-gray-500 leading-relaxed mb-4">
                El equipo técnico está trabajando en resolver este problema. Disculpe las molestias.
                Por favor, intente actualizar la página o vuelva a intentarlo en unos momentos.
              </p>
              {process.env.NODE_ENV === 'development' && error && (
                <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-left">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Error Details (Development Only):
                  </h3>
                  <code className="text-xs text-red-600 break-all">{error.message}</code>
                  {error.digest && (
                    <p className="text-xs text-gray-500 mt-2">Error ID: {error.digest}</p>
                  )}
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button
                onPress={refreshPage}
                color="primary"
                size="lg"
                className="w-full sm:w-auto min-w-[160px] h-12 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Actualizar Página
              </Button>

              <Button
                onPress={reset}
                variant="bordered"
                size="lg"
                className="w-full sm:w-auto min-w-[160px] h-12 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium rounded-lg"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
                Intentar de Nuevo
              </Button>

              <Button
                onPress={goBack}
                variant="bordered"
                size="lg"
                className="w-full sm:w-auto min-w-[160px] h-12 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium rounded-lg"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Volver
              </Button>
            </div>

            {/* Help section */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"
                    />
                  </svg>
                  <span>¿Sigue experimentando problemas?</span>
                </div>
                <span className="hidden sm:block text-gray-300">|</span>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Contactar Soporte
                </a>
                <span className="hidden sm:block text-gray-300">|</span>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Estado del Sistema
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
