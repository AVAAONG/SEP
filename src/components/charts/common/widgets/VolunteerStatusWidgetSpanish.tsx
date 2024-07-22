export type VolunteerStatusSpanish =
  | 'Pendiente de aprobación'
  | 'Aprobado'
  | 'Rechazado'
  | undefined;

const VolunteerStatusWidgetSpanish = ({ value }: { value: VolunteerStatusSpanish }) => {
  if (value === 'Rechazado') {
    return (
      <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
        {value}
      </span>
    );
  } else if (value === 'Aprobado') {
    return (
      <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-green-900 dark:text-green-300">
        {value}
      </span>
    );
  } else if (value === 'Pendiente de aprobación') {
    return (
      <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
        {value}
      </span>
    );
  }
  else if (value === 'Programado') {
    return (
      <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
        Programado
      </span>
    );
  }
  else {
    return (
      <span className="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-gray-900 dark:text-gray-300">
        Error
      </span>
    );
  }
};

export default VolunteerStatusWidgetSpanish;
