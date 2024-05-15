import { VolunteerStatus } from '@prisma/client';

const VolunteerStatusWidget = ({ value }: { value: VolunteerStatus | undefined }) => {
  if (value === 'PENDING') {
    return (
      <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
        Pendiente de aprobación
      </span>
    );
  } else if (value === 'APPROVED') {
    return (
      <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-green-900 dark:text-green-300">
        Aprobado/Realizado
      </span>
    );
  } else if (value === 'REJECTED') {
    return (
      <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-red-900 dark:text-red-300">
        Rechazado/Suspendido
      </span>
    );
  } else {
    return (
      <span className="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-gray-900 dark:text-gray-300">
        {value}
      </span>
    );
  }
};

export default VolunteerStatusWidget;
