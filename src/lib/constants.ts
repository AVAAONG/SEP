import { VolunteerProject } from "@prisma/client";

export const CLIENT_ID = process.env.GOOGLE_ADMIN_API_CLIENT_ID;
export const CLIENT_SECRET = process.env.GOOGLE_ADMIN_API_CLIENT_SECRET;
export const REDIRECT_URL = 'http://localhost:3000/api/auth/callback/adminGoogle';

export const WORKSHOP_CALENDAR_ID =
  'be4b05254bd3b7658f56172520efc8e1cc4dc70bf54641a56b5d37f65d5741b0@group.calendar.google.com';
export const CHAT_CALENDAR_ID =
  '4c33cf47616aea0e0c818290ef4f6369f119c42f7e25baaff330250f5af3a592@group.calendar.google.com';
export const VOLUNTEERS_CALENDAR_ID =
  '8a325e7fdbcb87bdb47ea4e1b45f81e83fa7077fe2de99911c7f51215d3e5f7d@group.calendar.google.com';

export const MONTHS = [
  '0',
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export const ACTIVITIES_CALENDAR_COLORS = [
  {
    activity: 'workshop',
    comingActivities: '#295594',
    pastActivities: '#98b7e1',
  },
  {
    activity: 'chat',
    comingActivities: '#d82f20',
    pastActivities: '#fdaba4',
  },
  {
    activity: 'volunteer',
    comingActivities: '#16a34a',
    pastActivities: '#bbf7d0',
  },
];
// ======================= CONSTANTS FOR WORKSHOP =======================

export const PROGRAM_COMPONENTS = [
  { label: 'Liderazgo', value: 'LEADERSHIP' },
  { label: 'Ejercicio Ciudadano', value: 'CITIZEN_EXERCISE' },
  { label: 'Gerencia de sí mismo', value: 'SELF_MANAGEMENT' },
  { label: 'TIC', value: 'ICT' },
  { label: 'Emprendimiento', value: 'ENTREPRENEURSHIP' },
  { label: 'Trabajo en equipo', value: 'TEAM_WORK' },
];

export const WORKSHOP_TYPES = [
  { label: 'Taller', value: 'WORKSHOP' },
  { label: 'Cine Foro', value: 'CINEMA_FORUM' },
  { label: 'Foro', value: 'FORUM' },
  { label: 'Webinar', value: 'WEBINAR' },
  { label: 'Curso', value: 'COURSE' },
  { label: 'Charla', value: 'TALK' },
  { label: 'Conversatorio', value: 'CONVERSATORIO' },
];

export const MODALITY = [
  { label: 'Presencial', value: 'IN_PERSON' },
  { label: 'Virtual', value: 'ONLINE' },
  { label: 'Híbrido', value: 'HYBRID' },
];



export const VOLUNTEER_PROJECT: {
  label: string;
  value: VolunteerProject;
}[] = [
    { label: 'UMAA', value: 'UMAA' },
    { label: 'OAL', value: 'OAL' },
    { label: 'ALV', value: 'ALV' },
    { label: 'UVPLV', value: 'UVPL' },
    { label: 'GA', value: 'GA' },
    { label: 'Comite de becarios', value: 'SCHOLARS_COMMITTEE' },
    { label: 'Oficina', value: 'OFFICE' },
    { label: 'ChatClubs', value: 'CHAT_CLUBS' },
    { label: 'Externo', value: 'EXTERNAL' },
    { label: 'Otro', value: 'OTHER' },
  ];

export const ONLINE_PLATFORMS = [
  { label: 'Zoom', value: 'ZOOM' },
  { label: 'Google Meet', value: 'GOOGLE_MEET' },
  { label: 'Padlet', value: 'PADLET' },
  { label: 'Microsoft Teams', value: 'MS_TEAMS' },
  { label: 'Otra', value: 'OTHER' },
];
export const WORKSHOP_YEAR = ['I', 'II', 'III', 'IV', 'V'];

export const CHAT_LEVELS = [
  { label: 'Básico', value: 'BASIC' },
  { label: 'Intermedio', value: 'INTERMEDIATE' },
  { label: 'Avanzado', value: 'ADVANCED' },
];

export const STATES_OF_VENEZUELA = [
  'Amazonas',
  'Anzoátegui',
  'Apure',
  'Aragua',
  'Barinas',
  'Bolívar',
  'Carabobo',
  'Cojedes',
  'Delta Amacuro',
  'Distrito Capital',
  'Falcón',
  'Guárico',
  'Lara',
  'Mérida',
  'Miranda',
  'Monagas',
  'Nueva Esparta',
  'Portuguesa',
  'Sucre',
  'Táchira',
  'Trujillo',
  'Vargas',
  'Yaracuy',
  'Zulia',
];

export const COLLAGES = [
  'ENAHP',
  'UCSAR',
  'UCV',
  'UNIMET',
  'IUPSM',
  'UCAB',
  'USB',
  'UNE',
  'UNEXPO',
  'UNESR',
  'UMA',
  'UNEARTE',
  'UJMV',
  'UMC',
  'UPEL',
  'CUR',
  'USM',
  'UNEFA',
  'UNEXCA',
  'UAH',
  'UBV',
];

export const STUDY_AREAS = [
  { value: 'ARCHITECTURE_URBANISM', label: 'Arquitectura y Urbanismo' },
  { value: 'HEALTH_SCIENCES', label: 'Ciencias de la Salud' },
  { value: 'JURIDICAL_POLITICAL_SCIENCES', label: 'Jurídico-Políticas' },
  { value: 'SOCIAL_SCIENCES', label: 'Ciencias Sociales' },
  { value: 'HUMANITIES_EDUCATION', label: 'Humanidades y Educación' },
  { value: 'STEM', label: 'STEM (Ciencias, Tecnología, Ingenierías, Matemáticas)' },
  { value: 'OTHER', label: 'Other' },
];

export const EVALUATION_SCALES = [
  { value: 'CERO_TO_TEN', label: '0 al 10' },
  { value: 'CERO_TO_FIVE', label: '0 al 5' },
  { value: 'CERO_TO_TWENTY', label: '0 al 20' },
];

export const COLLAGE_LONG_AND_SHORT = [
  { value: 'UCAB', label: 'Universidad Católica Andrés Bello (UCAB)' },
  { value: 'USB', label: 'Universidad Simón Bolívar (USB)' },
  { value: 'UCV', label: 'Universidad Central de Venezuela (UCV)' },
  { value: 'UNIMET', label: 'Universidad Metropolitana (UNIMET)' },
  { value: 'UNEXCA', label: 'Universidad Experimental de Caracas (UNEXCA)' },
  { value: 'ENAHP', label: 'Escuela Nacional de Administración y Hacienda Pública (ENAHP)' },
  { value: 'UNEARTE', label: 'Universidad Nacional Experimental de las Artes (UNEARTE)' },
  { value: 'UNESR', label: 'Universidad Nacional Experimental Simón Rodríguez (UNESR)' },
  { value: 'UCSAR', label: 'Universidad Católica Santa Rosa (UCSAR)' },
  { value: 'IUPSM', label: 'Instituto Universitario Politécnico Santiago Mariño (IUPSM)' },
  {
    value: 'UNEXPO',
    label: 'Universidad Nacional Experimental Politécnica Antonio José de Sucre (UNEXPO)',
  },
  { value: 'UMA', label: 'Universidad Monteávila (UMA)' },
  { value: 'UJMV', label: 'Universidad José María Vargas (UJMV)' },
  { value: 'UMC', label: 'Universidad Nacional Experimental Marítima del Caribe (UMC)' },
  { value: 'UPEL', label: 'Universidad Pedagógica Experimental Libertador (UPEL)' },
  { value: 'CUR', label: 'Colegio Universitario de Rehabilitación May Hamilton (CUR)' },
  { value: 'USM', label: 'Universidad Santa María (USM)' },
  {
    value: 'UNEFA',
    label: 'Universidad Nacional Experimental de la Fuerza Armada Nacional Bolivariana (UNEFA)',
  },
  { value: 'UAH', label: 'Universidad Alejandro de Humboldt (UAH)' },
  { value: 'UBV', label: 'Universidad Bolivariana de Venezuela (UBV)' },
];
