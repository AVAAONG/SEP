import { RecruitmentStatus } from '@prisma/client';

// PHASE_I;
// PHASE_II_PENDING;
// PHASE_II_APPROVED;
// PHASE_II_REJECTED;
// PHASE_III_PENDING;
// PHASE_III_APPROVED;
// PHASE_III_REJECTED;

const ApplicationStatusShip = ({ status }: { status: RecruitmentStatus }) => {
  if (status === 'PHASE_I') {
    return (
      <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
        Completando formulario
      </span>
    );
  } else if (status === 'PHASE_II_PENDING') {
    return (
      <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
        Formulario completado
      </span>
    );
  } else if (status === 'PHASE_II_APPROVED') {
    return (
      <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
        Aplica
      </span>
    );
  } else if (status === 'PHASE_II_REJECTED') {
    return (
      <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
        No aplica
      </span>
    );
  } else if (status === 'PHASE_III_PENDING') {
    return (
      <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
        Pendiente por entrevista
      </span>
    );
  } else if (status === 'PHASE_III_APPROVED') {
    return (
      <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
        Aceptada
      </span>
    );
  } else if (status === 'PHASE_III_REJECTED') {
    return (
      <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
        Rechazada
      </span>
    );
  }
};

export default ApplicationStatusShip;
