import { VolunteerProject } from "@prisma/client";

export const CLIENT_ID = process.env.GOOGLE_ADMIN_API_CLIENT_ID;
export const CLIENT_SECRET = process.env.GOOGLE_ADMIN_API_CLIENT_SECRET;
export const REDIRECT_URL = 'http://localhost:3000/api/auth/callback/adminGoogle';
export const GOOGLE_API_REFRESH_TOKEN = process.env.GOOGLE_API_REFRESH_TOKEN;

export const WORKSHOP_CALENDAR_ID = process.env.GOOGLE_WORKSHOP_CALENDAR_ID
export const CHAT_CALENDAR_ID = process.env.GOOGLE_CHAT_CALENDAR_ID
export const VOLUNTEERS_CALENDAR_ID = process.env.GOOGLE_VOLUNTEER_CALENDAR_ID

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
    pastActivities: '#9ed9b8',
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
  { value: 'OTHER', label: 'Otros' },
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
  {
    value: 'UNA',
    label: 'Universidad Nacional Abierta (UNA)',
  },
  {
    value: 'IUTRBF',
    label: 'Instituto Universitario de Tecnología de Rufino Blanco Fombona (IUTRBF)',
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
  { value: 'UC', label: 'Universidad de Carabobo (UC)' },
  { value: 'UNITEC', label: 'Universidad Tecnologica del Centro (UNITEC)' },
];


export const CARACAS_UNIVERSITIES = [
  { name: 'Universidad Nacional Experimental de las Artes', initials: 'UNEARTE' },
  { name: 'Universidad Nacional Experimental de la Gran Caracas', initials: 'UNEXCA' },
  { name: 'Universidad Nacional Experimental del Magisterio "Samuel Robinson"', initials: 'UNEM' },
  { name: 'Universidad Nacional Experimental de las Telecomunicaciones e Informática', initials: 'UNETI' },
  { name: 'Universidad Politécnica Territorial de Caracas "Mariscal Sucre"', initials: 'UPTECMS' },
  { name: 'Universidad Nacional Experimental Politécnica Antonio José de Sucre', initials: 'UNEXPO' },
  { name: 'Universidad Nacional Experimental Simón Rodríguez', initials: 'UNESR' },
  { name: 'Universidad Pedagógica Experimental Libertador', initials: 'UPEL' },
  { name: 'Universidad Militar Bolivariana de Venezuela', initials: 'UMBV' },
  { name: 'Colegio Universitario de Rehabilitación "May Hamilton"', initials: 'CURMH' },
  { name: 'Universidad Nacional Experimental del Transporte', initials: 'UNET' },
  { name: 'Universidad Nacional Abierta', initials: 'UNA' },
  { name: 'Universidad Nacional Experimental Politécnica de la Fuerza Armada Nacional', initials: 'UNEFA' },
  { name: 'Colegio Universitario de Enfermería de la Alcaldía Metropolitana de Caracas', initials: 'CUEMAC' },
  { name: 'Universidad Central de Venezuela', initials: 'UCV' },
  { name: 'Universidad Bolivariana de Venezuela', initials: 'UBV' },
  { name: 'Universidad de las Ciencias de la Salud "Hugo Chávez Frías"', initials: 'UCS' },
  { name: 'Universidad Nacional Experimental de la Seguridad', initials: 'UNES' },
  { name: 'Colegio Universitario de Administración y Mercadeo', initials: 'CUAM' },
  { name: 'Instituto Universitario de Tecnología Industrial', initials: 'IUT INDUSTRIAL' },
  { name: 'Instituto Universitario de Tecnología Juan Pablo Pérez Alfonzo', initials: 'IUTEPAL' },
  { name: 'Instituto Universitario de Tecnología Venezuela', initials: 'IUT VENEZUELA' },
  { name: 'Colegio Universitario de Enfermería de la Cruz Roja de Venezuela', initials: 'CUECMCRV' },
  { name: 'Instituto Universitario YMCA Lope Mendoza', initials: 'IUYMCA' },
  { name: 'Instituto Universitario de Tecnología Industrial Rodolfo Loero Arismendi', initials: 'IUTIRLA' },
  { name: 'Instituto Universitario de Mercadotecnia', initials: 'IUDEM' },
  { name: 'Instituto Universitario de Tecnología Alberto Adriani', initials: 'IUTAA' },
  { name: 'Universidad Católica Santa Rosa', initials: 'UCSAR' },
  { name: 'Instituto Universitario de Relaciones Públicas', initials: 'IURP' },
  { name: 'Instituto Universitario Jesús Obrero', initials: 'IUJO' },
];

export const MIRANDA_UNIVERSITIES =
  [
    { name: 'Instituto Universitario de Tecnología Industrial Rodolfo Loero Arismendi', initials: 'IUTIRLA' },
    { name: 'Colegio Universitario Jean Piaget', initials: 'CUJP' },
    { name: 'Instituto Universitario Avepane', initials: 'IUAVEPANE' },
    { name: 'Colegio Universitario Monseñor de Talavera', initials: 'CUMT' },
    { name: 'Instituto Universitario de Diseño Las Mercedes', initials: 'IUDLM' },
    { name: 'Instituto Universitario de Tecnología José María Carreño', initials: 'IUTJMC' },
    { name: 'Universidad Privada Nueva Esparta', initials: 'UNE' },
    { name: 'Instituto Universitario de Tecnología Antonio José de Sucre', initials: 'IUTAJS' },
    { name: 'Instituto Universitario de Tecnología Elías Calixto Pompa', initials: 'IUTECP' },
    { name: 'Instituto Universitario de Tecnología Rufino Blanco Fombona', initials: 'IUTRBF' },
    { name: 'Universidad José María Vargas', initials: 'UJMV' },
    { name: 'Instituto Universitario de Nuevas Profesiones', initials: 'IUNP' },
    { name: 'Instituto Universitario de Tecnología Américo Vespucio', initials: 'IUTAV' },
    { name: 'Instituto Universitario de la Audición y el Lenguaje', initials: 'IUAL' },
    { name: 'Universidad Privada Monteávila', initials: 'UMA' },
    { name: 'Universidad Católica Andrés Bello', initials: 'UCAB' },
    { name: 'Instituto Universitario Salesiano Padre Ojeda', initials: 'IUSPO' },
    { name: 'Instituto Universitario de Tecnología Tomás Lander', initials: 'IUTTL' },
    { name: 'Universidad Santa María', initials: 'USM' },
    { name: 'Universidad Privada Alejandro de Humboldt', initials: 'UPAH' },
    { name: 'Universidad Metropolitana', initials: 'UNIMET' },
    { name: 'Instituto Universitario Politécnico Santiago Mariño', initials: 'IUPSM' },
    { name: 'Universidad Bicentenaria de Aragua', initials: 'UBA' },
    { name: 'Universidad Nacional Experimental de las Artes', initials: 'UNEARTE' },
    { name: 'Universidad de las Ciencias de la Salud "Hugo Chávez Frías"', initials: 'UCSHCF' },
    { name: 'Universidad Politécnica Territorial de Barlovento "Argelia Laya"', initials: 'UPTBAL' },
    { name: 'Universidad Nacional Experimental Simón Bolívar', initials: 'UNESB' },
    { name: 'Universidad Nacional Experimental Politécnica de la Fuerza Armada Nacional', initials: 'UNEFA' },
    { name: 'Universidad Nacional Abierta', initials: 'UNA' },
    { name: 'Universidad Nacional Experimental de la Gran Caracas', initials: 'UNEXCA' },
    { name: 'Universidad Nacional del Turismo', initials: 'UNATUR' },
    { name: 'Universidad Politécnica Territorial de los Valles del Tuy', initials: 'UPTVT' },
    { name: 'Universidad Nacional Experimental Politécnica Antonio José de Sucre', initials: 'UNEXPO AJS' },
    { name: 'Universidad Politécnica Territorial de Caracas “Mariscal Sucre”', initials: 'UPTCMS' },
    { name: 'Universidad Nacional Experimental Simón Rodríguez', initials: 'UNESR' },
    { name: 'Universidad Nacional Experimental del Magisterio "Samuel Robinson"', initials: 'UNEMSR' },
    { name: 'Instituto Universitario de Tecnología Escuela Nacional de Administración y Hacienda Pública', initials: 'IUTENAH' },
    { name: 'Universidad Pedagógica Experimental Libertador', initials: 'UPEL' },
    { name: 'Universidad Politécnica Territorial de los Altos Mirandinos "Cecilio Acosta"', initials: 'UPTMCA' },
    { name: 'Universidad Nacional Experimental Marítima del Caribe', initials: 'UNEMC' },
    { name: 'Universidad Bolivariana de Venezuela', initials: 'UBV' }
  ]


export const ZULIA_UNIVERSITIES = [
  { name: 'Universidad Nacional Experimental Rafael María Baralt', initials: 'UNERMB' },
  { name: 'Universidad de las Ciencias de la Salud "Hugo Chávez Frías"', initials: 'UCS' },
  { name: 'Universidad Nacional Experimental Marítima del Caribe', initials: 'UNEMCA' },
  { name: 'Universidad Politécnica Territorial de Barlovento "Argelia Laya"', initials: 'UPTBAL' },
  { name: 'Universidad Politécnica Territorial del Zulia', initials: 'UPTZ' },
  { name: 'Universidad del Zulia', initials: 'LUZ' },
  { name: 'Universidad Nacional Abierta', initials: 'UNA' },
  { name: 'Universidad Bolivariana de Venezuela', initials: 'UBV' },
  { name: 'Instituto Universitario de Aeronáutica Civil Mayor (Av) Miguel Rodríguez', initials: 'IUAC' },
  { name: 'Universidad Politécnica Territorial de Maracaibo', initials: 'UPTM' },
  { name: 'Universidad Nacional Experimental Politécnica de la Fuerza Armada Nacional', initials: 'UNEFA' },
  { name: 'Universidad Nacional Experimental Sur del Lago Jesús María Semprum', initials: 'UNESUR' },
  { name: 'Universidad Privada Alonso de Ojeda', initials: 'UNIOJEDA' },
  { name: 'Instituto Universitario de Tecnología Juan Pablo Pérez Alfonzo', initials: 'IUTJPA' },
  { name: 'Instituto Universitario de Tecnología Readic', initials: 'IUT READIC' },
  { name: 'Colegio Universitario Monseñor de Talavera', initials: 'CUMT' },
  { name: 'Instituto Universitario San Francisco', initials: 'IUSF' },
  { name: 'Instituto Universitario Pedagógico Monseñor Rafael Arias Blanco', initials: 'IUPMRAB' },
  { name: 'Instituto Universitario de Tecnología Pedro Emilio Coll', initials: 'IUTPEC' },
  { name: 'Universidad Privada Dr. José Gregorio Hernández', initials: 'UPJGH' },
  { name: 'Universidad Privada Dr. Rafael Belloso Chacín', initials: 'URBE' }
];

export const CARABOBO_UNIVERSITIES = [
  { name: 'Universidad de las Ciencias de la Salud "Hugo Chávez Frías"', initials: 'UCS-HCF' },
  { name: 'Universidad Bolivariana de Venezuela', initials: 'UBV' },
  { name: 'Universidad Nacional Experimental Simón Rodríguez', initials: 'UNESR' },
  { name: 'Universidad Nacional Experimental Politécnica de la Fuerza Armada Nacional', initials: 'UNEFA' },
  { name: 'Universidad Nacional Experimental del Magisterio "Samuel Robinson"', initials: 'UNEMSR' },
  { name: 'Universidad Nacional Experimental Francisco de Miranda', initials: 'UNEFM' },
  { name: 'Universidad Politécnica Territorial de Puerto Cabello', initials: 'UPTPC' },
  { name: 'Universidad de Carabobo', initials: 'UC' },
  { name: 'Universidad Nacional Abierta', initials: 'UNA' },
  { name: 'Universidad Politécnica Territorial de Valencia', initials: 'UPTV' },

  { name: 'Instituto Universitario de Tecnología de Administración Industrial', initials: 'IUTA INDUSTRIAL' },
  { name: 'Instituto Universitario de Tecnología Juan Pablo Pérez Alfonzo', initials: 'IUT JPEREZ ALFONZO' },
  { name: 'Colegio Universitario de Administración y Mercadeo', initials: 'CUAM' },
  { name: 'Universidad Panamericana del Puerto', initials: 'UNIPAP' },
  { name: 'Instituto Universitario Carlos Soublette', initials: 'IUT CARLOS SOUBLETTE' },
  { name: 'Colegio Universitario Padre Isaías Ojeda', initials: 'CUPIO' },
  { name: 'Instituto Universitario Politécnico Santiago Mariño', initials: 'IUTPSM' },
  { name: 'Colegio Universitario de Psicopedagogía', initials: 'CUPP' },
  { name: 'Instituto Universitario de Nuevas Profesiones', initials: 'IUNP' },
  { name: 'Instituto Universitario de Tecnología para la Informática', initials: 'IUTI' },
  { name: 'Universidad Privada Arturo Michelena', initials: 'UPAM' },
  { name: 'Universidad Privada José Antonio Páez', initials: 'UJAP' },
  { name: 'Universidad Tecnológica del Centro', initials: 'UTEC' }
];

export const UNIVERSITIES_FOR_INPUT = [
  ...CARABOBO_UNIVERSITIES,
  ...CARACAS_UNIVERSITIES,
  ...ZULIA_UNIVERSITIES
].map(university => ({
  label: `${university.name} (${university.initials})`,
  value: `${university.name} (${university.initials})`
})).filter((university, index, self) =>
  index === self.findIndex((u) => (
    u.value === university.value
  ))
);

export const UNIVERSITIES_FOR_DISPLAY_IN_INPUT = [
  ...CARABOBO_UNIVERSITIES,
  ...CARACAS_UNIVERSITIES,
  ...ZULIA_UNIVERSITIES
].map(university => ({
  name: `${university.name} (${university.initials})`,
  initials: `${university.initials}`
})).filter((university, index, self) =>
  index === self.findIndex((u) => (
    u.initials === university.initials
  ))
);