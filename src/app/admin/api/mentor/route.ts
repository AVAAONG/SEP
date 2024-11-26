// import { prisma } from "@/lib/db/utils/prisma";
// import { Prisma } from "@prisma/client";
// import { NextApiRequest } from "next";


// const mentorsData: Prisma.MentorCreateInput[] = [
//   {
//     first_name: "María Enriqueta",
//     last_name: "Aquique Muñoz",
//     id_number: "10330276",
//     birth_date: new Date("07/03/1970").toISOString(),
//     gender: "F",
//     phone: "4165190088",
//     email: "maria.enriqueta.aquique@gmail.com",
//     residence: "Caracas, Venezuela",
//     profession: "Educadora",
//     created_at: new Date("2020").toISOString(),
//     status: "ASSIGNED",
//     newMentee: false,
//     company: "Universidad Metropolitana",
//     position: "Profesora tiempo parcial",
//     other_lang: "Inglés",
//     lang_level: "INTERMEDIATE",
//     interests: "Formación y crecimiento personal propio y de los demá",
//     hobbies: "Hacer ejercicio, escuchar música, ir al cine.",
//     instagram: "@circulosdebienestar.ve",
//     employed: true,
//     recruitment_status: "ACCEPTED",
//     chapter: "Rokk6_XCAJAg45heOEzYb",
//     work_experience: "12",
//     related_experience: "",
//     time_commitment: '',
//     skills_strengths: "",
//     speaks_other_lang: true,
//     photo: null,
//     cv: '',
//     mentor_reason: '',
//     prev_mentor_desc: '',
//     mentee_support: '',
//     referral_source: '',
//     prev_mentor_exp: true,
//     other_activities: '',
//     trust_techniques: "",
//     group_activities: true,
//     ideal_mentee: "",
//   },
//   {
//     first_name: "Brenda",
//     id_number: "7717536",
//     birth_date: new Date("07/06/1964").toISOString(),
//     gender: "F",
//     phone: "4143195126",
//     email: "brenda.sulbaran@gmail.com",
//     residence: "Caracas, Venezuela",
//     profession: "Lic. Administración de Empresas",
//     created_at: new Date("2023").toISOString(),
//     status: "ASSIGNED",
//     newMentee: false,
//     company: "Mil Foods, S.A",
//     position: "Directora de Finanzas",
//     other_lang: "Inglés",
//     lang_level: "INTERMEDIATE",
//     interests: "Psicología positiva, crecimiento personal, orfebrería, ejercicio físico",
//     hobbies: "",
//     instagram: "@brenda_sulbaran",
//     employed: true,
//     recruitment_status: "ACCEPTED",
//     chapter: "Rokk6_XCAJAg45heOEzYb",
//     work_experience: "12",
//     related_experience: "",
//     time_commitment: '',
//     skills_strengths: "",
//     speaks_other_lang: true,
//     photo: null,
//     cv: '',
//     mentor_reason: '',
//     prev_mentor_desc: '',
//     mentee_support: '',
//     referral_source: '',
//     prev_mentor_exp: true,
//     other_activities: '',
//     trust_techniques: "",
//     group_activities: true,
//     ideal_mentee: "",
//     last_name: 'Sulbarán',
//     linkedin: ""
//   },
//   {
//     first_name: "Maria Auxiliadora",
//     id_number: "6925534",
//     birth_date: new Date("02/19/1965").toISOString(),
//     gender: "F",
//     phone: "",
//     email: "mauximoreno@hotmail.com",
//     residence: "Caracas, Venezuela",
//     profession: "Contador Público",
//     created_at: new Date("2017").toISOString(),
//     status: "ASSIGNED",
//     newMentee: false,
//     company: "CMA CGM",
//     position: "Gerente General",
//     other_lang: "Inglés",
//     lang_level: "BASIC",
//     interests: "",
//     hobbies: "Teatro",
//     instagram: "@doramorenor",
//     employed: true,
//     recruitment_status: "ACCEPTED",
//     chapter: "Rokk6_XCAJAg45heOEzYb",
//     work_experience: "12",
//     related_experience: "",
//     time_commitment: '',
//     skills_strengths: "",
//     speaks_other_lang: true,
//     photo: null,
//     cv: '',
//     mentor_reason: '',
//     prev_mentor_desc: '',
//     mentee_support: '',
//     referral_source: '',
//     prev_mentor_exp: true,
//     other_activities: '',
//     trust_techniques: "",
//     group_activities: true,
//     ideal_mentee: "",
//     last_name: ' Moreno R.',
//     linkedin: ""
//   },
//   {
//     first_name: "Karen Alfaro ",
//     id_number: "111430421",
//     birth_date: new Date("07/12/1982").toISOString(),
//     gender: "F",
//     phone: "50688401062",
//     email: "karen.alfaro.cr.01@gmail.com",
//     residence: "Costa Rica",
//     profession: "Administración Empresas, Coach, Estudiante Psicología",
//     created_at: new Date("2021").toISOString(),
//     status: "ASSIGNED",
//     newMentee: false,
//     company: "Freelancer",
//     position: "Coach",
//     other_lang: "Inglés",
//     lang_level: "BASIC",
//     interests: "",
//     hobbies: "Leer, ver series, hacer ejercicio.",
//     instagram: "",
//     employed: true,
//     recruitment_status: "ACCEPTED",
//     chapter: "Rokk6_XCAJAg45heOEzYb",
//     work_experience: "12",
//     related_experience: "",
//     time_commitment: '',
//     skills_strengths: "",
//     speaks_other_lang: true,
//     photo: null,
//     cv: '',
//     mentor_reason: '',
//     prev_mentor_desc: '',
//     mentee_support: '',
//     referral_source: '',
//     prev_mentor_exp: true,
//     other_activities: '',
//     trust_techniques: "",
//     group_activities: true,
//     ideal_mentee: "",
//     last_name: 'Carvajal',
//     linkedin: ""
//   },
//   {
//     first_name: "Adriana",
//     id_number: "4351888",
//     birth_date: new Date("08/11/1956").toISOString(),
//     gender: "F",
//     phone: "4122525880",
//     email: "adrianadiaz2007@gmail.com",
//     residence: "Caracas, Venezuela/Valencia, España",
//     profession: "Psicologo",
//     created_at: new Date("2009").toISOString(),
//     status: "ASSIGNED",
//     newMentee: false,
//     company: "Libre ejercicio de la Profesión",
//     position: "N/A",
//     other_lang: "Inglés",
//     lang_level: "BASIC",
//     interests: "",
//     hobbies: "Lectura de temas relacionados con la profesión, historia, biografias, arte, gastronomía y vino. Ejercicios, cocinar, ver tv, viajar",
//     instagram: "",
//     employed: true,
//     recruitment_status: "ACCEPTED",
//     chapter: "Rokk6_XCAJAg45heOEzYb",
//     work_experience: "12",
//     related_experience: "",
//     time_commitment: '',
//     skills_strengths: "",
//     speaks_other_lang: true,
//     photo: null,
//     cv: '',
//     mentor_reason: '',
//     prev_mentor_desc: '',
//     mentee_support: '',
//     referral_source: '',
//     prev_mentor_exp: true,
//     other_activities: '',
//     trust_techniques: "",
//     group_activities: true,
//     ideal_mentee: "",
//     last_name: 'Diaz',
//     linkedin: ""
//   },
//   {
//     first_name: "Rita ",
//     id_number: "6914681",
//     birth_date: new Date("10/24/1967").toISOString(),
//     gender: "F",
//     phone: "4141311500",
//     email: "rdaleorrhh@gmail.com",
//     residence: "Caracas, Venezuela",
//     profession: "Actuario",
//     created_at: new Date("2019").toISOString(),
//     status: "ASSIGNED",
//     newMentee: false,
//     company: "GALAC Software",
//     position: "Gerente de Gestión Humana",
//     other_lang: "Italiano",
//     lang_level: "BASIC",
//     interests: "",
//     hobbies: "la panadería libre de gluten",
//     instagram: "@rdaleo24",
//     employed: true,
//     recruitment_status: "ACCEPTED",
//     chapter: "Rokk6_XCAJAg45heOEzYb",
//     work_experience: "12",
//     related_experience: "",
//     time_commitment: '',
//     skills_strengths: "",
//     speaks_other_lang: true,
//     photo: null,
//     cv: '',
//     mentor_reason: '',
//     prev_mentor_desc: '',
//     mentee_support: '',
//     referral_source: '',
//     prev_mentor_exp: true,
//     other_activities: '',
//     trust_techniques: "",
//     group_activities: true,
//     ideal_mentee: "",
//     last_name: "D'Aleo",
//     linkedin: ""
//   },
//   {
//     first_name: "Daysi J.",
//     id_number: "7953739",
//     birth_date: new Date().toISOString(),
//     gender: "F",
//     phone: "4141387458",
//     email: "daysidarias.2017@gmail.com",
//     residence: "Miranda, Venezuela",
//     profession: "Periodista, Administradora, Mercadóloga.",
//     created_at: new Date("2023").toISOString(),
//     status: "ASSIGNED",
//     newMentee: true,
//     company: "Ministerio de Agricultura Urbana. Instituto de Comunicación e Imagen.",
//     position: "Profesional III, Nivel VII",
//     other_lang: "Inglés",
//     lang_level: "INTERMEDIATE",
//     interests: "",
//     hobbies: "La lectura, meditar y servir.",
//     instagram: "@relacionistips_dayside",
//     employed: true,
//     recruitment_status: "ACCEPTED",
//     chapter: "Rokk6_XCAJAg45heOEzYb",
//     work_experience: "12",
//     related_experience: "",
//     time_commitment: '',
//     skills_strengths: "",
//     speaks_other_lang: true,
//     photo: null,
//     cv: '',
//     mentor_reason: '',
//     prev_mentor_desc: '',
//     mentee_support: '',
//     referral_source: '',
//     prev_mentor_exp: true,
//     other_activities: '',
//     trust_techniques: "",
//     group_activities: true,
//     ideal_mentee: "",
//     last_name: 'Darias E.',
//     linkedin: ""
//   },
//   {
//     first_name: "Manuel Alberto",
//     id_number: "5580375",
//     birth_date: new Date("07/25/1960").toISOString(),
//     gender: "M",
//     phone: "4129342053",
//     email: "mgiuseppe25@gmail.com",
//     residence: "Caracas, Venezuela",
//     profession: "Ingeniero Mecánico. Máster en Gerencia de Proyectos.",
//     created_at: new Date("2023").toISOString(),
//     status: "ASSIGNED",
//     newMentee: true,
//     company: "",
//     position: "Jubilado del Banco Central de Venezuela mayo 2024",
//     other_lang: "Inglés",
//     lang_level: "BASIC",
//     interests: "Organización, Planificación y Gerencia de Proyectos",
//     hobbies: "Leer, Escribir, Caminatas y Carreras, Practicar Yoga y Meditación, Diseñar y Colorear Mándalas.",
//     instagram: "",
//     employed: true,
//     recruitment_status: "ACCEPTED",
//     chapter: "Rokk6_XCAJAg45heOEzYb",
//     work_experience: "12",
//     related_experience: "",
//     time_commitment: '',
//     skills_strengths: "",
//     speaks_other_lang: true,
//     photo: null,
//     cv: '',
//     mentor_reason: '',
//     prev_mentor_desc: '',
//     mentee_support: '',
//     referral_source: '',
//     prev_mentor_exp: true,
//     other_activities: '',
//     trust_techniques: "",
//     group_activities: true,
//     ideal_mentee: "",
//     last_name: 'Giuseppe Yepez"',
//     linkedin: ""
//   },
//   {
//     first_name: "Samantha",
//     id_number: "12073941",
//     birth_date: new Date("02/04/1976").toISOString(),
//     gender: "F",
//     phone: "14376018152",
//     email: "samantha.vivas@gmail.com",
//     residence: "Milton Ontario, Canadá",
//     profession: "Msc. Administración de Empresa - Odontólogo",
//     created_at: new Date("2021").toISOString(),
//     status: "ASSIGNED",
//     newMentee: true,
//     company: "Freelancer",
//     position: "Asesor - Auditor",
//     other_lang: "Inglés",
//     lang_level: "INTERMEDIATE",
//     interests: "",
//     hobbies: "Leer- Senderismo - Ciclismo - Ver películas y series",
//     instagram: "@samipvl2",
//     employed: true,
//     recruitment_status: "ACCEPTED",
//     chapter: "Rokk6_XCAJAg45heOEzYb",
//     work_experience: "12",
//     related_experience: "",
//     time_commitment: '',
//     skills_strengths: "",
//     speaks_other_lang: true,
//     photo: null,
//     cv: '',
//     mentor_reason: '',
//     prev_mentor_desc: '',
//     mentee_support: '',
//     referral_source: '',
//     prev_mentor_exp: true,
//     other_activities: '',
//     trust_techniques: "",
//     group_activities: true,
//     ideal_mentee: "",
//     last_name: 'Vivas',
//     linkedin: ""
//   },
//   {
//     first_name: "Danny J. ",
//     id_number: "12258199",
//     birth_date: new Date("12/29/1974").toISOString(),
//     gender: "M",
//     phone: "4245250029",
//     email: "dannyfajardo74@gmail.com",
//     residence: "Caracas, Venezuela",
//     profession: "Administrador",
//     created_at: new Date("2021").toISOString(),
//     status: "ASSIGNED",
//     newMentee: true,
//     company: "Freelancer",
//     position: "Coach y facilitador de procesos de desarrollo humano",
//     other_lang: "Inglés",
//     lang_level: "BASIC",
//     interests: "",
//     hobbies: "Paseo al Avila. Teatro. Coordinación y logística de jornadas medico-ontológicas en el interior del país con @lafamiliaextrema y @cruzazulusm.",
//     instagram: "dannyfajardo74",
//     employed: true,
//     recruitment_status: "ACCEPTED",
//     chapter: "Rokk6_XCAJAg45heOEzYb",
//     work_experience: "12",
//     related_experience: "",
//     time_commitment: '',
//     skills_strengths: "",
//     speaks_other_lang: true,
//     photo: null,
//     cv: '',
//     mentor_reason: '',
//     prev_mentor_desc: '',
//     mentee_support: '',
//     referral_source: '',
//     prev_mentor_exp: true,
//     other_activities: '',
//     trust_techniques: "",
//     group_activities: true,
//     ideal_mentee: "",
//     last_name: 'Fajardo S.',
//     linkedin: ""
//   },
//   {
//     first_name: "Yackeline Yenise ",
//     id_number: "16051736",
//     birth_date: new Date("03/20/1981").toISOString(),
//     gender: "F",
//     phone: "4145845343",
//     email: "yackeline.peralta@gmail.com",
//     residence: "Caracas, Venezuela",
//     profession: "Lic. Relaciones Industriales, Magister en Gerencia - Mención RRHH, Programa Avanzado de Gerencia IESA",
//     created_at: new Date("2023").toISOString(),
//     status: "ASSIGNED",
//     newMentee: true,
//     company: "Grupo Nueve Once",
//     position: "Directora de Personas y Propósito",
//     other_lang: "Inglés",
//     lang_level: "INTERMEDIATE",
//     interests: "",
//     hobbies: "Aprender nuevas herramientas, Facilitar procesos de aprendizaje, Compartir con mis hijas",
//     instagram: "yackeline.peralta",
//     linkedin: "www.linkedin.com/in/yackeline-peralta",
//     employed: true,
//     recruitment_status: "ACCEPTED",
//     chapter: "Rokk6_XCAJAg45heOEzYb",
//     work_experience: "12",
//     related_experience: "",
//     time_commitment: '',
//     skills_strengths: "",
//     speaks_other_lang: true,
//     photo: null,
//     cv: '',
//     mentor_reason: '',
//     prev_mentor_desc: '',
//     mentee_support: '',
//     referral_source: '',
//     prev_mentor_exp: true,
//     other_activities: '',
//     trust_techniques: "",
//     group_activities: true,
//     ideal_mentee: "",
//     last_name: 'Peralta Perez',
//   },
//   {
//     first_name: "Rosa Maria ",
//     id_number: "6102518",
//     birth_date: new Date("04/02/1962").toISOString(),
//     gender: "F",
//     phone: "4141218717",
//     email: "rosamariacarrasco@hotmail.com",
//     residence: "Caracas, Venezuela",
//     profession: "Ingeniero Civil",
//     created_at: new Date("2023").toISOString(),
//     status: "ASSIGNED",
//     newMentee: true,
//     company: "Freelancer",
//     position: "Consultora de Marketing y Planificacion",
//     other_lang: "N/A",
//     lang_level: "BASIC",
//     interests: "",
//     hobbies: "cine, Excursionismo, Caminatas",
//     instagram: "@peregrinante",
//     employed: true,
//     recruitment_status: "ACCEPTED",
//     chapter: "Rokk6_XCAJAg45heOEzYb",
//     work_experience: "12",
//     related_experience: "",
//     time_commitment: '',
//     skills_strengths: "",
//     speaks_other_lang: true,
//     photo: null,
//     cv: '',
//     mentor_reason: '',
//     prev_mentor_desc: '',
//     mentee_support: '',
//     referral_source: '',
//     prev_mentor_exp: true,
//     other_activities: '',
//     trust_techniques: "",
//     group_activities: true,
//     ideal_mentee: "",
//     last_name: 'Carrasco Cano',
//     linkedin: ""
//   },
//   {
//     first_name: "Juan Carlos ",
//     id_number: "13936219",
//     birth_date: new Date("01/04/1978").toISOString(),
//     gender: "M",
//     phone: "4248336566",
//     email: "Juancarlosrojasgomez@gmail.com",
//     residence: "Anzoategui, Venezuela",
//     profession: "Lic Filosofia",
//     created_at: new Date("2021").toISOString(),
//     status: "ASSIGNED",
//     newMentee: true,
//     company: "REAL SEGUROS SA",
//     position: "Gerente Regional Oriente",
//     other_lang: "N/A",
//     lang_level: "BASIC",
//     interests: "direccion, gerencia, direccion de proyectos, administracion y finanzas, marketing, artes plasticas",
//     hobbies: "",
//     instagram: "https://www.instagram.com/juancrojasgomez",
//     linkedin: "https://www.linkedin.com/in/juan-carlos-rojas-gomez-709445179",
//     employed: true,
//     recruitment_status: "ACCEPTED",
//     chapter: "Rokk6_XCAJAg45heOEzYb",
//     work_experience: "12",
//     related_experience: "",
//     time_commitment: '',
//     skills_strengths: "",
//     speaks_other_lang: true,
//     photo: null,
//     cv: '',
//     mentor_reason: '',
//     prev_mentor_desc: '',
//     mentee_support: '',
//     referral_source: '',
//     prev_mentor_exp: true,
//     other_activities: '',
//     trust_techniques: "",
//     group_activities: true,
//     ideal_mentee: "",
//     last_name: 'Rojas Gomez',
//   },
//   {
//     first_name: "Victoria",
//     id_number: "6812464",
//     birth_date: new Date("06/26/1965").toISOString(),
//     gender: "F",
//     phone: "41271235874",
//     email: "mujicavicky26@gmail.com",
//     residence: "Caracas, Venezuela",
//     profession: "Abogado",
//     created_at: new Date("2007").toISOString(),
//     status: "ASSIGNED",
//     newMentee: true,
//     company: "N/A",
//     position: "N/A",
//     other_lang: "N/A",
//     lang_level: "BASIC",
//     interests: "",
//     hobbies: "Tenis",
//     instagram: "@vmujicaseguros",
//     linkedin: "linkedin.com/in/victoria-mujica-4a537636",
//     employed: true,
//     recruitment_status: "ACCEPTED",
//     chapter: "Rokk6_XCAJAg45heOEzYb",
//     work_experience: "12",
//     related_experience: "",
//     time_commitment: '',
//     skills_strengths: "",
//     speaks_other_lang: true,
//     photo: null,
//     cv: '',
//     mentor_reason: '',
//     prev_mentor_desc: '',
//     mentee_support: '',
//     referral_source: '',
//     prev_mentor_exp: true,
//     other_activities: '',
//     trust_techniques: "",
//     group_activities: true,
//     ideal_mentee: "",
//     last_name: 'Mujica',
//   },
//   {
//     first_name: "Carmen Tanasi",
//     id_number: "7220207",
//     birth_date: new Date("06/21/1964").toISOString(),
//     gender: "F",
//     phone: "4127528798",
//     email: "ctanasidelgado@gmail.com",
//     residence: "Caracas, Venezuela",
//     profession: "Licenciada en Comunicación Social, Magister en Educación Abierta y a Distancia",
//     created_at: new Date("2023").toISOString(),
//     status: "AVAILABLE",
//     newMentee: true,
//     company: "N/A",
//     position: "N/A",
//     other_lang: "Italiano",
//     lang_level: "BASIC",
//     interests: "",
//     hobbies: "literatura, cine, arte, tejo crochet",
//     instagram: "@ctanasidelgado",
//     employed: true,
//     recruitment_status: "ACCEPTED",
//     chapter: "Rokk6_XCAJAg45heOEzYb",
//     work_experience: "12",
//     related_experience: "",
//     time_commitment: '',
//     skills_strengths: "",
//     speaks_other_lang: true,
//     photo: null,
//     cv: '',
//     mentor_reason: '',
//     prev_mentor_desc: '',
//     mentee_support: '',
//     referral_source: '',
//     prev_mentor_exp: true,
//     other_activities: '',
//     trust_techniques: "",
//     group_activities: true,
//     ideal_mentee: "",
//     last_name: 'Tanasi',
//     linkedin: ""
//   },
//   {
//     first_name: "Mariedelsy",
//     id_number: "14203387",
//     birth_date: new Date("04/21/1978").toISOString(),
//     gender: "F",
//     phone: "17867971804",
//     email: "marie.raydan@gmail.com",
//     residence: "Miami, FL. EUA",
//     profession: "Lic. Relaciones Industriales",
//     created_at: new Date("2015").toISOString(),
//     status: "ASSIGNED",
//     newMentee: true,
//     company: "Alfa Gamma Seafood Group",
//     position: "HR Manager",
//     other_lang: "Inglés",
//     lang_level: "BASIC",
//     interests: "",
//     hobbies: "Entrenar, correr, baile, desarrollo personal",
//     instagram: "@mariedelsy",
//     linkedin: "www.linkedin.com/in/mariedelsy-raydan-fernandez",
//     employed: true,
//     recruitment_status: "ACCEPTED",
//     chapter: "Rokk6_XCAJAg45heOEzYb",
//     work_experience: "12",
//     related_experience: "",
//     time_commitment: '',
//     skills_strengths: "",
//     speaks_other_lang: true,
//     photo: null,
//     cv: '',
//     mentor_reason: '',
//     prev_mentor_desc: '',
//     mentee_support: '',
//     referral_source: '',
//     prev_mentor_exp: true,
//     other_activities: '',
//     trust_techniques: "",
//     group_activities: true,
//     ideal_mentee: "",
//     last_name: 'Raydán',
//   },
//   {
//     first_name: "Yaclucymel ",
//     id_number: "11944212",
//     birth_date: new Date("01/23/1975").toISOString(),
//     gender: "F",
//     phone: "4241245778",
//     email: "construirfuturoconsultores@gmail.com",
//     residence: "Maracay, Venezuela",
//     profession: "Lic. Relaciones Industriales",
//     created_at: new Date("2023").toISOString(),
//     status: "ASSIGNED",
//     newMentee: true,
//     company: "Construir Futuro Consultores",
//     position: "Cofundador",
//     other_lang: "",
//     lang_level: "BASIC",
//     interests: "Mentoría personalizada y por grupos",
//     hobbies: "",
//     instagram: "@contruirfuturoc",
//     employed: true,
//     recruitment_status: "ACCEPTED",
//     chapter: "Rokk6_XCAJAg45heOEzYb",
//     work_experience: "12",
//     related_experience: "",
//     time_commitment: '',
//     skills_strengths: "",
//     speaks_other_lang: true,
//     photo: null,
//     cv: '',
//     mentor_reason: '',
//     prev_mentor_desc: '',
//     mentee_support: '',
//     referral_source: '',
//     prev_mentor_exp: true,
//     other_activities: '',
//     trust_techniques: "",
//     group_activities: true,
//     ideal_mentee: "",
//     last_name: 'Cedeño',
//     linkedin: ""
//   },
//   {
//     first_name: "Franklin Jose",
//     id_number: "14851448",
//     birth_date: new Date("05/20/1981").toISOString(),
//     gender: "M",
//     phone: "18132353503",
//     email: "coachfranklingonzalez@gmail.com",
//     residence: "Florida, Estados Unidos",
//     profession: "Lic. Recursos Humanos",
//     created_at: new Date("2023").toISOString(),
//     status: "ASSIGNED",
//     newMentee: true,
//     company: "Hispanic Services Council",
//     position: "Parenting Skills Coordinator",
//     other_lang: "N/A",
//     lang_level: "BASIC",
//     interests: "Crecimiento Personal, Propósito de Vida, Ikigai, Liderazgo, Autoliderazgo",
//     hobbies: "Pasear en familia, aprender sobre mis áreas de interés, facilitar talleres y programas",
//     instagram: "@franklingonzalezcoach",
//     employed: true,
//     recruitment_status: "ACCEPTED",
//     chapter: "Rokk6_XCAJAg45heOEzYb",
//     work_experience: "12",
//     related_experience: "",
//     time_commitment: '',
//     skills_strengths: "",
//     speaks_other_lang: true,
//     photo: null,
//     cv: '',
//     mentor_reason: '',
//     prev_mentor_desc: '',
//     mentee_support: '',
//     referral_source: '',
//     prev_mentor_exp: true,
//     other_activities: '',
//     trust_techniques: "",
//     group_activities: true,
//     ideal_mentee: "",
//     last_name: 'Gonzalez Ramos',
//     linkedin: ""
//   },
//   {
//     first_name: "Karem",
//     id_number: "18269535",
//     birth_date: new Date("11/07/1988").toISOString(),
//     gender: "F",
//     phone: "4123692276",
//     email: "karem.borjas@reconetvzla.com",
//     residence: "Caracas, Venezuela",
//     profession: "Empresaria",
//     created_at: new Date("2023").toISOString(),
//     status: "ASSIGNED",
//     newMentee: true,
//     company: "Reconet",
//     position: "Director fundador",
//     other_lang: "N/A",
//     lang_level: "BASIC",
//     interests: "",
//     hobbies: "sostenibilidad y naturaleza",
//     instagram: "@soykaremborjas",
//     employed: true,
//     recruitment_status: "ACCEPTED",
//     chapter: "Rokk6_XCAJAg45heOEzYb",
//     work_experience: "12",
//     related_experience: "",
//     time_commitment: '',
//     skills_strengths: "",
//     speaks_other_lang: true,
//     photo: null,
//     cv: '',
//     mentor_reason: '',
//     prev_mentor_desc: '',
//     mentee_support: '',
//     referral_source: '',
//     prev_mentor_exp: true,
//     other_activities: '',
//     trust_techniques: "",
//     group_activities: true,
//     ideal_mentee: "",
//     last_name: 'Borjas',
//     linkedin: ""
//   },
//   {
//     first_name: "Ramón Armando ",
//     id_number: "4274283",
//     birth_date: new Date("11/12/1953").toISOString(),
//     gender: "M",
//     phone: "4122087137",
//     email: "raescobarg@gmail.com",
//     residence: "Caracas, Venezuela",
//     profession: "Administrador Comercial. Consultor Empresarial",
//     created_at: new Date("2023").toISOString(),
//     status: "ASSIGNED",
//     newMentee: true,
//     company: "Ejercicio independiente de la profesion",
//     position: "Consultor de Empresas",
//     other_lang: "Inglés",
//     lang_level: "BASIC",
//     interests: "Finanzas, Gastronomía",
//     hobbies: "Lectura. Deportes",
//     instagram: "",
//     employed: true,
//     recruitment_status: "ACCEPTED",
//     chapter: "Rokk6_XCAJAg45heOEzYb",
//     work_experience: "12",
//     related_experience: "",
//     time_commitment: '',
//     skills_strengths: "",
//     speaks_other_lang: true,
//     photo: null,
//     cv: '',
//     mentor_reason: '',
//     prev_mentor_desc: '',
//     mentee_support: '',
//     referral_source: '',
//     prev_mentor_exp: true,
//     other_activities: '',
//     trust_techniques: "",
//     group_activities: true,
//     ideal_mentee: "",
//     last_name: 'Escobar García',
//     linkedin: ""
//   },
//   {
//     first_name: "José Manuel",
//     id_number: "8750642",
//     birth_date: new Date("12/27/1962").toISOString(),
//     gender: "M",
//     phone: "4142627554",
//     email: "jmgonzalez1227@gmail.com",
//     residence: "Caracas, Venezuela",
//     profession: "Licenciado en Administración de Recursos Humanos",
//     created_at: new Date("2022").toISOString(),
//     status: "AVAILABLE",
//     newMentee: true,
//     company: "Caracas en Edo Consultores",
//     position: "Director General",
//     other_lang: "",
//     lang_level: "BASIC",
//     interests: "",
//     hobbies: "Caminar, jugar Bowling, leer, cocinar.",
//     instagram: "@jmgconsultor",
//     employed: true,
//     recruitment_status: "ACCEPTED",
//     chapter: "Rokk6_XCAJAg45heOEzYb",
//     work_experience: "12",
//     related_experience: "",
//     time_commitment: '',
//     skills_strengths: "",
//     speaks_other_lang: true,
//     photo: null,
//     cv: '',
//     mentor_reason: '',
//     prev_mentor_desc: '',
//     mentee_support: '',
//     referral_source: '',
//     prev_mentor_exp: true,
//     other_activities: '',
//     trust_techniques: "",
//     group_activities: true,
//     ideal_mentee: "",
//     last_name: ' González',
//     linkedin: ""
//   },
//   {
//     first_name: "Keily",
//     id_number: "16028782",
//     birth_date: new Date("08/28/1981").toISOString(),
//     gender: "F",
//     phone: "4145569540",
//     email: "keily.colmenares.info@gmail.com",
//     residence: "Guatire, Venezuela",
//     profession: "Telecomunicaciones / Sistema",
//     created_at: new Date("2023").toISOString(),
//     status: "AVAILABLE",
//     newMentee: true,
//     company: "",
//     position: "Especialista en Windows",
//     other_lang: "No",
//     lang_level: "BASIC",
//     interests: "",
//     hobbies: "Senderismo, Ciclismo, Caminar, La Playa, Los Rios. Conocer muchas personas.",
//     instagram: "",
//     employed: true,
//     recruitment_status: "ACCEPTED",
//     chapter: "Rokk6_XCAJAg45heOEzYb",
//     work_experience: "12",
//     related_experience: "",
//     time_commitment: '',
//     skills_strengths: "",
//     speaks_other_lang: true,
//     photo: null,
//     cv: '',
//     mentor_reason: '',
//     prev_mentor_desc: '',
//     mentee_support: '',
//     referral_source: '',
//     prev_mentor_exp: true,
//     other_activities: '',
//     trust_techniques: "",
//     group_activities: true,
//     ideal_mentee: "",
//     last_name: 'Colmenares',
//     linkedin: ""
//   },
//   {
//     first_name: "Francys Andreína ",
//     id_number: "9542397",
//     birth_date: new Date("04/18/1966").toISOString(),
//     gender: "F",
//     phone: "4127405176",
//     email: "kachyviana@gmail.com",
//     residence: "Valencia, Venezuela",
//     profession: "Odontólogo",
//     created_at: new Date("2023").toISOString(),
//     status: "ASSIGNED",
//     newMentee: true,
//     company: "Universidad de Carabobo",
//     position: "Asesora académica",
//     other_lang: "",
//     lang_level: "BASIC",
//     interests: "Bienestar emocional/físico/espiritual, Bioneuroemoción, Coaching de vida, Neurociencia",
//     hobbies: "",
//     instagram: "@kachyviana",
//     employed: true,
//     recruitment_status: "ACCEPTED",
//     chapter: "Rokk6_XCAJAg45heOEzYb",
//     work_experience: "12",
//     related_experience: "",
//     time_commitment: '',
//     skills_strengths: "",
//     speaks_other_lang: true,
//     photo: null,
//     cv: '',
//     mentor_reason: '',
//     prev_mentor_desc: '',
//     mentee_support: '',
//     referral_source: '',
//     prev_mentor_exp: true,
//     other_activities: '',
//     trust_techniques: "",
//     group_activities: true,
//     ideal_mentee: "",
//     last_name: 'Viaña Pulido',
//     linkedin: ""
//   },
//   {
//     first_name: "Ritza Carolina ",
//     id_number: "16342933",
//     birth_date: new Date("11/22/1984").toISOString(),
//     gender: "F",
//     phone: "4241626844",
//     email: "rquintero@a2legalve.com",
//     residence: "Caracas, Venezuela",
//     profession: "Abogado",
//     created_at: new Date("2023").toISOString(),
//     status: "ASSIGNED",
//     newMentee: true,
//     company: "A2 Legal",
//     position: "Socia Fundadora",
//     other_lang: "No",
//     lang_level: "BASIC",
//     interests: "Actualización profesional",
//     hobbies: "",
//     instagram: "@soyritzaquintero",
//     employed: true,
//     recruitment_status: "ACCEPTED",
//     chapter: "Rokk6_XCAJAg45heOEzYb",
//     work_experience: "12",
//     related_experience: "",
//     time_commitment: '',
//     skills_strengths: "",
//     speaks_other_lang: true,
//     photo: null,
//     cv: '',
//     mentor_reason: '',
//     prev_mentor_desc: '',
//     mentee_support: '',
//     referral_source: '',
//     prev_mentor_exp: true,
//     other_activities: '',
//     trust_techniques: "",
//     group_activities: true,
//     ideal_mentee: "",
//     last_name: 'Quintero Mendoza',
//     linkedin: ""
//   },
//   {
//     first_name: "Humberto José ",
//     id_number: "8849284",
//     birth_date: new Date("05/29/1968").toISOString(),
//     gender: "M",
//     phone: "4149019551",
//     email: "humberto.jaimes@gmail.com",
//     residence: "Caracas, Venezuela",
//     profession: "Lic. Comunicación Social",
//     created_at: new Date("2023").toISOString(),
//     status: "AVAILABLE",
//     newMentee: true,
//     company: "Freelancer",
//     position: "",
//     other_lang: "Inglés",
//     lang_level: "INTERMEDIATE",
//     interests: "",
//     hobbies: "leer, escribir, bicicleta, caminar, deportes en general, cine, visitar galerías, etc.",
//     instagram: "@humbertojaimesq",
//     employed: true,
//     recruitment_status: "ACCEPTED",
//     chapter: "Rokk6_XCAJAg45heOEzYb",
//     work_experience: "12",
//     related_experience: "",
//     time_commitment: '',
//     skills_strengths: "",
//     speaks_other_lang: true,
//     photo: null,
//     cv: '',
//     mentor_reason: '',
//     prev_mentor_desc: '',
//     mentee_support: '',
//     referral_source: '',
//     prev_mentor_exp: true,
//     other_activities: '',
//     trust_techniques: "",
//     group_activities: true,
//     ideal_mentee: "",
//     last_name: 'Jaimes Quero',
//     linkedin: ""
//   },
//   {
//     first_name: "Orlando José ",
//     id_number: "",
//     birth_date: new Date("02/19/1951").toISOString(),
//     gender: "M",
//     phone: "4166058975",
//     email: "ososa.fundacionmmg@gmail.com",
//     residence: "Caracas, Venezuela",
//     profession: "Ingeniero Químico",
//     created_at: new Date("2023").toISOString(),
//     status: "AVAILABLE",
//     newMentee: true,
//     company: "Fundación MMG",
//     position: "Coordinación de Gestión",
//     other_lang: "Inglés",
//     lang_level: "BASIC",
//     interests: "",
//     hobbies: "Música Coral, Cine, Orientación",
//     instagram: "@ososa1vb",
//     employed: true,
//     recruitment_status: "ACCEPTED",
//     chapter: "Rokk6_XCAJAg45heOEzYb",
//     work_experience: "12",
//     related_experience: "",
//     time_commitment: '',
//     skills_strengths: "",
//     speaks_other_lang: true,
//     photo: null,
//     cv: '',
//     mentor_reason: '',
//     prev_mentor_desc: '',
//     mentee_support: '',
//     referral_source: '',
//     prev_mentor_exp: true,
//     other_activities: '',
//     trust_techniques: "",
//     group_activities: true,
//     ideal_mentee: "",
//     last_name: 'Sosa Padrón',
//     linkedin: ""
//   }
// ];

// export async function GET(req: NextApiRequest) {

//   await prisma.mentor.createMany({
//     data: mentorsData
//   })

// }