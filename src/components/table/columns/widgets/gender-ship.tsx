import { Gender } from '@prisma/client';

export const GenderShip = ({ gender }: { gender: Gender }) => {
  if (gender === 'M') {
    return (
      <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
        Masculino
      </span>
    );
  } else if (gender === 'F') {
    return (
      <span className="inline-flex items-center bg-rose-100 text-rose-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-rose-900 dark:text-rose-300">
        Femenino
      </span>
    );
  } else if (gender === 'O') {
    return (
      <span className="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-900 dark:text-rose-300">
        Empresa
      </span>
    );
  }
};
