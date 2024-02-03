import { Chip } from '@nextui-org/chip';
import { ActivityStatus as IActivityStatus } from '@prisma/client';

const ActivityStatus = ({ value }: { value: IActivityStatus }) => {
  if (value === 'SUSPENDED') {
    return (
      <Chip
        startContent={<div className="rounded-full bg-red-800 p-1"></div>}
        className="inline-flex items-center bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
      >
        Suspendido
      </Chip>
    );
  } else if (value === 'DONE') {
    return (
      <Chip
        startContent={<div className="rounded-full bg-yellow-800 p-1"></div>}
        className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300"
      >
        Realizado (Encuesta de satisfacción no enviada)
      </Chip>
    );
  } else if (value === 'ATTENDANCE_CHECKED') {
    return (
      <Chip
        startContent={<div className="rounded-full bg-green-800 p-1"></div>}
        className="inline-flex items-center bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-1 rounded-full dark:bg-green-900 dark:text-green-300"
      >
        Encuesta de satisfacción enviada
      </Chip>
    );
  } else if (value === 'SENT') {
    return (
      <Chip
        startContent={<div className="rounded-full bg-blue-800 p-1"></div>}
        className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300"
      >
        Programado
      </Chip>
    );
  } else if (value === 'IN_PROGRESS')
    return (
      <Chip
        startContent={<div className="rounded-full bg-gray-800 p-1"></div>}
        className="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-1 rounded-full dark:bg-gray-900 dark:text-gray-300"
      >
        En progreso
      </Chip>
    );
  else {
    return (
      <Chip
        startContent={<div className="rounded-full bg-gray-800 p-1"></div>}
        className="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-1 rounded-full dark:bg-gray-900 dark:text-gray-300"
      >
        Error
      </Chip>
    );
  }
};

export default ActivityStatus;
