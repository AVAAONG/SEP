export const CLIENT_ID = process.env.GOOGLE_ADMIN_API_CLIENT_ID;
export const CLIENT_SECRET = process.env.GOOGLE_ADMIN_API_CLIENT_SECRET;
export const REDIRECT_URL =
  'http://seb-git-adddb-mustafinho.vercel.app/api/google/calendarCallback';

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

const VOLUNTEER_CALENDAR_EVENT_COLORS = 'linear-gradient(to right, #16a34a, #059669)';
const WORKSHOP_CALENDAR_EVENT_COLORS = 'linear-gradient(to right, #1D4ED8, #312E81)';
const CHATS_CALENDAR_EVENT_COLORS = 'linear-gradient(to right, #e11d48, #b91c1c)';

export const CALENDAR_IDS = [
  {
    // Calendar for volunteer activities
    calendarId:
      '66c8bfc0379b164b2d4104d235933b8507228ea39a0f6301f7f3a1a7e878e204@group.calendar.google.com',
    eventColor: VOLUNTEER_CALENDAR_EVENT_COLORS,
    textColor: '#22C55E',
  },
  {
    // Calendar for english chats clubs
    calendarId:
      'e8e9c5e4d30d349b75f6061c8641fa2577ed9928403c4bd12b6bd6687291e7a9@group.calendar.google.com',
    eventColor: CHATS_CALENDAR_EVENT_COLORS,
    textColor: '#E11D48',
  },
  {
    // Calendar for workshops
    calendarId:
      '3bd2458b588a28274518ba4e7a45f44db6a04c33377cc8c008c986a72dc36cdb@group.calendar.google.com',
    eventColor: WORKSHOP_CALENDAR_EVENT_COLORS,
    textColor: '#3B82F6',
  },
];

// ======================= CONSTANTS FOR WORKSHOP =======================

export const PROGRAM_COMPONENTS = [
  { option: 'liderazgo', value: 'LEADERSHIP' },
  { option: 'ejercicio ciudadano', value: 'CITIZEN_EXERCISE' },
  { option: 'gerencia de sí mismo', value: 'SELF_MANAGEMENT' },
  { option: 'tic', value: 'ICT' },
  { option: 'emprendimiento', value: 'ENTREPRENEURSHIP' },
];

export const MODALITY = [
  { option: 'presencial', value: 'IN_PERSON' },
  { option: 'virtual', value: 'ONLINE' },
  { option: 'hibrido', value: 'HYBRID' },
];

export const PLATFORMS = ['zoom', 'google meet', 'otra', 'padlet'];
export const WORKSHOP_YEAR = ['I', 'II', 'III', 'IV', 'V', 'TODOS'];
