import {
  ActivityStatus,
  CVASchedule,
  KindOfVolunteer,
  Level,
  Modality,
  ScholarAttendance,
  Skill,
  VolunteerProject,
  VolunteerStatus,
  WorkshopYear,
} from '@prisma/client';
import { CHAT_CALENDAR_ID, VOLUNTEERS_CALENDAR_ID, WORKSHOP_CALENDAR_ID } from './constants';

export const parseSkillFromDatabase = (skill: Skill) => {
  switch (skill) {
    case Skill.CITIZEN_EXERCISE:
      return 'Ejercicio Ciudadano';
    case Skill.LEADERSHIP:
      return 'Liderazgo';
    case Skill.SELF_MANAGEMENT:
      return 'Gerencia de sí mismo';
    case Skill.ICT:
      return 'TIC';
    case Skill.ENTREPRENEURSHIP:
      return 'Emprendimiento';
    case Skill.TEAM_WORK:
      return 'Trabajo en equipo';
    default:
      return skill;
  }
};

export const parseModalityFromDatabase = (modality: Modality | null | undefined) => {
  switch (modality) {
    case Modality.ONLINE:
      return 'Virtual';
    case Modality.IN_PERSON:
      return 'Presencial';
    case Modality.HYBRID:
      return 'Híbrido';
    default:
      return 'Desconocido';
  }
};

export const parseVolunteerStatusFromDatabase = (status: VolunteerStatus) => {
  switch (status) {
    case 'APPROVED':
      return 'Aprobado';
    case 'PENDING':
      return 'Pendiente de aprobación';
    case 'SENT':
      return 'Programado';
    case 'SCHEDULED':
      return 'Programado';
    case 'REJECTED':
      return 'Rechazado';
  }
};

export const parseCvaScheduleFromDatabase = (schedule: CVASchedule | null | undefined) => {
  switch (schedule) {
    case 'DIARY':
      return 'Diario';
    case 'INTERDIARY':
      return 'Interdiario';
    case 'SABATINO':
      return 'Sabatino';
    default:
      return 'Sin datos';
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
    case ActivityStatus.SCHEDULED:
      return 'Programado';
    case ActivityStatus.SENT:
      return 'Programado';
    case ActivityStatus.ATTENDANCE_CHECKED:
      return 'Realizado';
    case ActivityStatus.SUSPENDED:
      return 'Suspendido';
  }
};

export const parseScholarAttendanceFromDatabase = (status: ScholarAttendance | 'SPEAKER') => {
  switch (status) {
    case ScholarAttendance.ENROLLED:
      return 'Inscrito';
    case ScholarAttendance.ATTENDED:
      return 'Asistió';
    case ScholarAttendance.NOT_ATTENDED:
      return 'No asistió';
    case ScholarAttendance.JUSTIFY:
      return 'Justificado';
    case ScholarAttendance.CANCELLED:
      return 'Cancelado';
    case 'SPEAKER':
      return 'Facilitador';
    default:
      return status;
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
      return 'Básico';
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

export const parseVolunteerProject = (value: VolunteerProject | null | undefined) => {
  switch (value) {
    case 'OFFICE':
      return 'Oficina';
    case 'CHAT_CLUBS':
      return 'Chat clubs';
    case 'EXTERNAL':
      return 'Externo';
    case 'SCHOLARS_COMMITTEE':
      return 'Comité de becarios';
    case 'OTHER':
      return 'Otro';
    case 'UVPL':
      return 'UVPLV';
    default:
      return value;
  }
};

export const getCalendarId = (
  activity: { level: Level } | { kind_of_volunteer: KindOfVolunteer } | { year: WorkshopYear[] }
) => {
  if ('level' in activity) return CHAT_CALENDAR_ID;
  else if ('kind_of_volunteer' in activity) return VOLUNTEERS_CALENDAR_ID;
  else if ('asociated_skill' in activity) return WORKSHOP_CALENDAR_ID;
  else return 'primary';
};
