export type ActivityStatusSpanish =
  | 'En progreso'
  | 'Programado'
  | 'Realizado'
  | 'Suspendido'
  | 'Enviado';

const ActivityStatusWidgetSpanish = ({ value }: { value: ActivityStatusSpanish }) => {
  if (value === 'Suspendido') {
    return (
      <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
        {value}
      </span>
    );
  } else if (value === 'Realizado') {
    return (
      <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-green-900 dark:text-green-300">
        {value}
      </span>
    );
  } else if (value === 'Programado' || value === 'Enviado') {
    return (
      <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
        Programado
      </span>
    );
  } else if (value === 'En progreso')
    return (
      <span className="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-gray-900 dark:text-gray-300">
        Error
      </span>
    );
  else {
    return (
      <span className="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-gray-900 dark:text-gray-300">
        Error
      </span>
    );
  }
};

export default ActivityStatusWidgetSpanish;
