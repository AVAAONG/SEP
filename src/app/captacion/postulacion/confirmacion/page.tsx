import { CheckCircleIcon } from '@heroicons/react/24/solid';

const page = () => {
  return (
    <div className="min-h-screen h-full w-full flex items-center justify-center">
      <div className="flex h-full w-full flex-col items-center gap-4">
        <CheckCircleIcon className="w-28 h-28 text-[#0069B0]" />
        <h2 className="text-3xl font-bold">Tu aplicación se ha completado con éxito</h2>
        <p className="text-gray-600 text-xl">
          Gracias por postularte a nuestra convocatoria, te contactaremos pronto.
        </p>
      </div>
    </div>
  );
};

export default page;
