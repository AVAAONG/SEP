import { ActivityStatus, Modality, Skill } from '@prisma/client';

export const parseSkillFromDatabase = (skill: Skill) => {
  switch (skill) {
    case 'CITIZEN_EXERCISE':
      return 'Ejercicio Ciudadano';
    case 'ENTREPRENEURSHIP':
      return 'Emprendimiento';
    case 'SELF_MANAGEMENT':
      return 'Gerencia de sí mismo';
    case 'LEADERSHIP':
      return 'Liderazgo';
    case 'ICT':
      return 'TIC';
    default:
      return 'CITIZEN_EXERCISE';
  }
};

export const parseModalityFromDatabase = (modality: Modality) => {
  switch (modality) {
    case 'IN_PERSON':
      return 'Presencial';
    case 'ONLINE':
      return 'Virtual';
    default:
      return 'IN_PERSON';
  }
};
export const parseWorkshopStatusFromDatabase = (status: ActivityStatus) => {
  switch (status) {
    case 'ATTENDANCE_CHECKED':
      return 'Realizado';
    case 'DONE':
      return 'Asistencia no pasada';
    case 'SCHEDULED':
      return 'Programado';
    case 'SENT':
      return 'Enviado';
    case 'SUSPENDED':
      return 'Suspendido';
  }
};

