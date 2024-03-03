import { ScholarAttendance } from '@prisma/client';

const ScholarAttendanceWidget = ({ value }: { value: ScholarAttendance | undefined }) => {
  if (value === 'NOT_ATTENDED') {
    return (
      <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-red-900 dark:text-red-300">
        No asistió
      </span>
    );
  } else if (value === 'ATTENDED') {
    return (
      <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-green-900 dark:text-green-300">
        Asistió
      </span>
    );
  } else if (value === 'ENROLLED') {
    return (
      <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
        Inscrito
      </span>
    );
  } else if (value === 'JUSTIFY') {
    return (
      <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
        Justificó
      </span>
    );
  } else if (value === 'CANCELLED') {
    return (
      <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-red-900 dark:text-red-300">
        Canceló
      </span>
    );
  } else if (value === 'SPEAKER') {
    return (
      <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-green-900 dark:text-green-300">
        Facilitador
      </span>
    );
  } else if (value === undefined) {
    return (
      <span className="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-1 rounded-full dark:bg-gray-900 dark:text-gray-300">
        No estas inscrito
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

export default ScholarAttendanceWidget;
