import { ActivityStatus, Level, Modality, Skill } from '@prisma/client';

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
      return 'CITIZEN_EXERCISE';
  }
};

export const parseModalityFromDatabase = (modality: Modality) => {
  switch (modality) {
    case 'IN_PERSON':
      return 'Presencial';
    case 'ONLINE':
      return 'Virtual';
    case 'HYBRID':
      return 'Hibrida';
    default:
      return 'IN_PERSON';
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
    case 'TEAMS':
      return 'Teams';
    case 'GOOGLE_MEET':
      return 'Google Meet';
    case 'DISCORD':
      return 'Discord';
    case 'WHATSAPP':
      return 'Whatsapp';
    case 'FACEBOOK':
      return 'Facebook';
    case 'INSTAGRAM':
      return 'Instagram';
    case 'TWITTER':
      return 'Twitter';
    case 'YOUTUBE':
      return 'Youtube';
    case 'TWITCH':
      return 'Twitch';
    case 'OTHER':
      return 'Otra';
    default:
      return platform;
  }
};
