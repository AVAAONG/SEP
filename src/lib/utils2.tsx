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

export const parseSatisfactionFormResponsesFromDatabase = (response: number) => {
  switch (response) {
    case 1:
      return 'Malo';
    case 2:
      return 'Deficiente';
    case 3:
      return 'Regular';
    case 4:
      return 'Bueno';
    case 5:
      return 'Excelente';
    default:
      return 'No definido';
  }
};

export const parseSatisfactionFormTitlesFromDatabase = (key: string) => {
  switch (key) {
    case 'activity_organization':
      return {
        title: 'Organización de la actividad',
        question:
          'La actividad estuvo bien organizada (información, cumplimiento de fechas, horarios y atención)',
      };
    case 'activity_number_of_participants':
      return {
        title: 'Número de participantes',
        question: 'El número de participantes ha sido adecuado para el desarrollo de la actividad',
      };
    case 'activity_lenght':
      return {
        title: 'Duración de la actividad',
        question:
          'La duración de la actividad fue suficiente, según los objetivos y contenidos de la misma',
      };
    case 'activity_relevance_for_scholar':
      return {
        title: 'Relevancia para el becario',
        question: 'Grado de relevancia de la actividad, para mi formación integral',
      };
    case 'speaker_theory_practice_mix':
      return {
        title: 'Mezcla de teoría y práctica del facilitador',
        question: ' Combinación adecuada de teoría y aplicación práctica',
      };
    case 'speaker_knowledge_of_activity':
      return {
        title: 'Conocimiento del tema por parte del facilitador',
        question: 'Conocimiento de los temas impartidos en profundidad',
      };
    case 'speaker_foment_scholar_to_participate':
      return {
        title: 'El facilitador fomento la participación de los asistentes',
        question: 'El facilitador fomento la participación de los asistentes',
      };
    case 'speaker_knowledge_transmition':
      return {
        title: 'Transmisión de conocimientos del facilitador',
        question: 'La forma de impartir la actividad ha facilitado el aprendizaje',
      };
    case 'content_match_necesities':
      return 'El contenido coincide con las necesidades';
    case 'content_knowledge_adquisition':
      return 'Adquisición de conocimientos de contenido';
    case 'content_knowledge_expansion':
      return 'Expansión de conocimientos de contenido';
    case 'content_personal_development':
      return 'Desarrollo personal de contenido';
    case 'general_satisfaction':
      return 'Satisfacción general';
    default:
      return 'Clave no reconocida';
  }
};
