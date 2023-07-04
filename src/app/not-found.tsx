import { NotFoundImage } from "@/assets/svgs";

const NotFound = () => {
  return (
    <>
      <div className="bg-white dark:bg-slate-950 min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="max-w-max mx-auto">
          <div className="max-w-xs m-auto">
            <NotFoundImage />
          </div>
          <main className="sm:flex">
            <p className="text-4xl font-extrabold text-[#008000] sm:text-5xl">404</p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-200 tracking-tight sm:text-5xl">Página no encontrada.</h1>
                <p className="mt-1 text-base text-gray-500">Verifique la URL en la barra de direcciones y vuelva a intentarlo.</p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <a
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#008000] hover:bg-[#129d12] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#008000]"
                >
                  Regresar
                </a>
                <a
                  href="mailto:avaatecnologia@gmail.com"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[#008000] bg-emerald-100 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#008000]"
                >
                  Contacta con soporte
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default NotFound;