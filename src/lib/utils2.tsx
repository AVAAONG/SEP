import { ActivityStatus, CVASchedule, Level, Modality, Skill, WorkshopYear } from '@prisma/client';

export const parseSkillFromDatabase = (skill: Skill) => {
  switch (skill) {
    case 'CITIZEN_EXERCISE':
      return 'Ejercicio ciudadano';
    case 'ENTREPRENEURSHIP':
      return 'Emprendimiento';
    case 'SELF_MANAGEMENT':
      return 'Gerencia de sí mismo';
    case 'LEADERSHIP':
      return 'Liderazgo';
    case 'ICT':
      return 'TIC';
    default:
      return 'Ejercicio ciudadano';
  }
};

export const parseModalityFromDatabase = (modality: Modality | null) => {
  switch (modality) {
    case 'IN_PERSON':
      return 'Presencial';
    case 'ONLINE':
      return 'Virtual';
    case 'HYBRID':
      return 'Hibrida';
    default:
      return 'Presencial';
  }
};

export const parseCvaScheduleFromDatabase = (schedule: CVASchedule | null) => {
  switch (schedule) {
    case 'DIARY':
      return 'Diario';
    case 'INTERDIARY':
      return 'Interdiario';
    case 'SABATINO':
      return 'Sabatino';
    default:
      return 'error';
  }
};

export const parseKindOfVolunteerFromDatabase = (kindOfVolunteer: string) => {
  switch (kindOfVolunteer) {
    case 'INTERNAL':
      return 'Interno';
    case 'EXTERNAL':
      return 'Externo';
    default:
      return 'INTERNAL';
  }
};
export const parseWorkshopStatusFromDatabase = (status: ActivityStatus) => {
  switch (status) {
    case 'ATTENDANCE_CHECKED':
      return 'Realizado';
    case 'SCHEDULED':
      return 'Programado';
    case 'SENT':
      return 'Enviado';
    case 'SUSPENDED':
      return 'Suspendido';
  }
};

export const parseChatLevelFromDatabase = (level: Level) => {
  switch (level) {
    case 'ADVANCED':
      return 'Avanzado';
    case 'BASIC':
      return 'Básico';
    case 'INTERMEDIATE':
      return 'Intermedio';
    default:
      return 'BASIC';
  }
};

export const parsePlatformFromDatabase = (platform: string) => {
  switch (platform) {
    case 'ZOOM':
      return 'Zoom';
    case 'MS_TEAMS':
      return 'Teams';
    case 'GOOGLE_MEET':
      return 'Google Meet';
    case 'DISCORD':
      return 'Discord';
    case 'OTHER':
      return 'Otra';
    default:
      return platform;
  }
};

export const parseWorkshopKindFromDatabase = (kind: string) => {
  switch (kind) {
    case 'WORKSHOP':
      return 'Taller';
    case 'CINEMA_FORUM':
      return 'Cine foro';
    case 'FORUM':
      return 'Foro';
    case 'WEBINAR':
      return 'Webinar';
    case 'TALK':
      return 'Charla';
    case 'CONVERSATORIO':
      return 'Conversatorio';
    default:
      return 'sin definir';
  }
};
export const parseWorkshopYearFromDatabase = (years: WorkshopYear[]) => {
  if (years.length === 5) {
    return 'Todos';
  } else {
    return years.join(', ');
  }
};

