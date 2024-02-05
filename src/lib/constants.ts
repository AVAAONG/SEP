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
    comingActivities: '#295594',
    pastActivities: '#98b7e1',
  },
];
// ======================= CONSTANTS FOR WORKSHOP =======================

export const PROGRAM_COMPONENTS = [
  { label: 'Liderazgo', value: 'LEADERSHIP' },
  { label: 'Ejercicio Ciudadano', value: 'CITIZEN_EXERCISE' },
  { label: 'Gerencia de sí mismo', value: 'SELF_MANAGEMENT' },
  { label: 'TIC', value: 'ICT' },
  { label: 'Emprendimiento', value: 'ENTREPRENEURSHIP' },
];

export const WORKSHOP_TYPES = [
  { label: 'Taller', value: 'WORKSHOP' },
  { label: 'Cine Foro', value: 'CINEMA_FORUM' },
  { label: 'Foro', value: 'FORUM' },
  { label: 'Webinar', value: 'WEBINAR' },
  { label: 'Charla', value: 'TALK' },
];

export const MODALITY = [
  { label: 'Presencial', value: 'IN_PERSON' },
  { label: 'Virtual', value: 'ONLINE' },
  { label: 'Híbrido', value: 'HYBRID' },
];

export const ONLINE_PLATFORMS = [
  { label: 'Zoom', value: 'ZOOM' },
  { label: 'Google Meet', value: 'GOOGLE_MEET' },
  { label: 'Padlet', value: 'PADLET' },
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
