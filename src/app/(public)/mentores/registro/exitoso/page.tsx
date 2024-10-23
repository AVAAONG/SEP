import { CheckCircleIcon } from '@heroicons/react/24/solid';

const page = () => {
  return (
    <div className="min-h-screen h-full w-full flex items-center justify-center">
      <div className="flex h-full w-full flex-col items-center gap-4">
        <CheckCircleIcon className="w-28 h-28 text-green-500" />
        <h2 className="text-3xl font-bold">Tu registro se ha completado con exito</h2>
        <p className="text-gray-600 text-xl">
          Gracias por ser parte de nuestro programa de mentores, te contactaremos pronto.
        </p>
      </div>
    </div>
  );
};

export default page;
