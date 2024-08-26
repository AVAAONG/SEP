// import { prisma } from '@/lib/db/utils/prisma';
// import { Collages, Gender, ScholarCondition, StudyArea, StudyRegime } from '@prisma/client';
// import { NextApiRequest } from 'next';
// import { NextResponse } from 'next/server';

// export async function GET(req: NextApiRequest) {

//   await createScholarsInBulkFromSheet();

//   return NextResponse.json({ message: 'ok' });
// }

// const values = [
//   // {
//   //   "last_names": "Cardozo Trincado",
//   //   "first_names": "Nesly Onelia",
//   //   "dni": 26634279,
//   //   "gender": "F",
//   //   "birthdate": "9/4/1999",
//   //   "email": "neslyoneliacardozo@gmail.com",
//   //   "local_phone_number": "0241 8914542",
//   //   "whatsapp_number": 4244372833,
//   //   "address": "Av. La Cumaca. Conjunto Residencial Villas de Alcalá. 5ta etapa Casa 25-A San Diego, Carabobo",
//   //   "collage": "UCV",
//   //   "career": "Medicina",
//   //   "study_area": "HEALTH_SCIENCES",
//   //   "study_regime": "ANNUAL",
//   //   "program_admission_date": "22/10/2021",
//   //   "scholar_condition": "ACTIVE"
//   // },
//   // {
//   //   "last_names": "Campo González",
//   //   "first_names": "César Augusto",
//   //   "dni": 28022781,
//   //   "gender": "M",
//   //   "birthdate": "6/4/2001",
//   //   "email": "cesarcampo2001@gmail.com",
//   //   "local_phone_number": "0241-8673084",
//   //   "whatsapp_number": 4144729707,
//   //   "address": "Urb. Las Quintas Calle 181 Res. Coyoacán, Naguanagua Carabobo",
//   //   "collage": "UCV",
//   //   "career": "Lic. Computación",
//   //   "study_area": "STEM",
//   //   "study_regime": "ANNUAL",
//   //   "program_admission_date": "22/10/2021",
//   //   "scholar_condition": "ACTIVE"
//   // },
//   // {
//   //   "last_names": "Morles Vargas",
//   //   "first_names": "Deiner David",
//   //   "dni": 27493572,
//   //   "gender": "M",
//   //   "birthdate": "6/2/1999",
//   //   "email": "deinermorles@gmail.com",
//   //   "local_phone_number": "0241 8962018",
//   //   "whatsapp_number": 4124863388,
//   //   "address": "Barrio Bello Monte II, Calle Santa Lucía Casa 147-A 72, Parroquia Rafael Urdaneta, Valencia Carabobo",
//   //   "collage": "UCV",
//   //   "career": "Medicina",
//   //   "study_area": "HEALTH_SCIENCES",
//   //   "study_regime": "ANNUAL",
//   //   "program_admission_date": "22/10/2021",
//   //   "scholar_condition": "ACTIVE"
//   // },
//   // {
//   //   "last_names": "Márquez Escalante",
//   //   "first_names": "María Milagros",
//   //   "dni": 28331273,
//   //   "gender": "F",
//   //   "birthdate": "15/12/2001",
//   //   "email": "milagros.escalante15@gmail.com",
//   //   "local_phone_number": "0241 8432548",
//   //   "whatsapp_number": 4263383605,
//   //   "address": "La Trigaleña, Edo. Carabobo",
//   //   "collage": "UCV",
//   //   "career": "Derecho - Com. Social",
//   //   "study_area": "JURIDICAL_POLITICAL_SCIENCES",
//   //   "study_regime": "SEMESTER",
//   //   "program_admission_date": "22/10/2021",
//   //   "scholar_condition": "ACTIVE"
//   // },
//   // {
//   //   "last_names": "Reyes Rodríguez",
//   //   "first_names": "Alfredo Jose",
//   //   "dni": 28063416,
//   //   "gender": "M",
//   //   "birthdate": "20/02/2001",
//   //   "email": "ajrr119@gmail.com",
//   //   "local_phone_number": "0241 8343217",
//   //   "whatsapp_number": 4121379137,
//   //   "address": "Bloque 26, Apto 08, La Isabelica - Valencia Carabobo",
//   //   "collage": "UCV",
//   //   "career": "Medicina",
//   //   "study_area": "HEALTH_SCIENCES",
//   //   "study_regime": "ANNUAL",
//   //   "program_admission_date": "22/10/2021",
//   //   "scholar_condition": "ACTIVE"
//   // },
//   // {
//   //   "last_names": "Lizardi Sánchez",
//   //   "first_names": "Maryelys Alexandra",
//   //   "dni": 27856043,
//   //   "gender": "F",
//   //   "birthdate": "17/07/2001",
//   //   "email": "maryelizardi19@gmail.com",
//   //   "local_phone_number": "NO POSEE",
//   //   "whatsapp_number": 4244493153,
//   //   "address": "Residencias AraUCVa, Avenida Universidad, Naguanagua, Carabobo",
//   //   "collage": "UCV",
//   //   "career": "Medicina",
//   //   "study_area": "HEALTH_SCIENCES",
//   //   "study_regime": "ANNUAL",
//   //   "program_admission_date": "22/10/2021",
//   //   "scholar_condition": "ACTIVE"
//   // },
//   // {
//   //   "last_names": "Fernández Perez",
//   //   "first_names": "Rafael Alejandro",
//   //   "dni": 27117025,
//   //   "gender": "M",
//   //   "birthdate": "19/09/2001",
//   //   "email": "saulBenedicto@gmail.com",
//   //   "local_phone_number": "NO POSEE",
//   //   "whatsapp_number": 4127601446,
//   //   "address": "Mariara Carabobo",
//   //   "collage": "UCV",
//   //   "career": "Medicina",
//   //   "study_area": "HEALTH_SCIENCES",
//   //   "study_regime": "ANNUAL",
//   //   "program_admission_date": "22/10/2021",
//   //   "scholar_condition": "ACTIVE"
//   // },
//   // {
//   //   "last_names": "Camargo Navas",
//   //   "first_names": "Isabela Valentina",
//   //   "dni": 28480787,
//   //   "gender": "F",
//   //   "birthdate": "15/03/2001",
//   //   "email": "isav15camargo@gmail.com",
//   //   "local_phone_number": "NO POSEE",
//   //   "whatsapp_number": 4244111657,
//   //   "address": "Naguanagua Carabobo",
//   //   "collage": "UCV",
//   //   "career": "Medicina",
//   //   "study_area": "HEALTH_SCIENCES",
//   //   "study_regime": "ANNUAL",
//   //   "program_admission_date": "22/10/2021",
//   //   "scholar_condition": "ACTIVE"
//   // },
//   // {
//   //   "last_names": "Rivas Gadea",
//   //   "first_names": "Amalid Virginia",
//   //   "dni": 25335152,
//   //   "gender": "F",
//   //   "birthdate": "27/12/1996",
//   //   "email": "amalidvrg@gmail.com",
//   //   "local_phone_number": "NO POSEE",
//   //   "whatsapp_number": 4261422626,
//   //   "address": "Urb. La Esmeralda San Diego, Carabobo",
//   //   "collage": "UCV",
//   //   "career": "Administración Comercial",
//   //   "study_area": "SOCIAL_SCIENCES",
//   //   "study_regime": "SEMESTER",
//   //   "program_admission_date": "25/01/2018",
//   //   "scholar_condition": "ALUMNI"
//   // },
//   // {
//   //   "last_names": "Rivas Geoudet",
//   //   "first_names": "Natasha Valentina",
//   //   "dni": 27764788,
//   //   "gender": "F",
//   //   "birthdate": "31/10/1998",
//   //   "email": "natasharivas31@gmail.com",
//   //   "local_phone_number": "2418718626",
//   //   "whatsapp_number": 4144274290,
//   //   "address": "Urb. La Esmeralda sector c-10-2, San Diego, Carabobo",
//   //   "collage": "UCV",
//   //   "career": "Administración Comercial",
//   //   "study_area": "SOCIAL_SCIENCES",
//   //   "study_regime": "SEMESTER",
//   //   "program_admission_date": "25/01/2018",
//   //   "scholar_condition": "ALUMNI"
//   // },
//   // {
//   //   "last_names": "Hernández Rodriguez",
//   //   "first_names": "Ana Gabriela",
//   //   "dni": 27063161,
//   //   "gender": "F",
//   //   "birthdate": "25/07/1998",
//   //   "email": "anaghr25@gmail.com",
//   //   "local_phone_number": "NO POSEE",
//   //   "whatsapp_number": 4244491693,
//   //   "address": "Barrera Norte, Calle Unión, Casa 30, Valencia Carabobo",
//   //   "collage": "UCV",
//   //   "career": "Bioanálisis",
//   //   "study_area": "HEALTH_SCIENCES",
//   //   "study_regime": "ANNUAL",
//   //   "program_admission_date": "04/10/2019",
//   //   "scholar_condition": "ALUMNI"
//   // },
//   // {
//   //   "last_names": "Hernández Escobar",
//   //   "first_names": "Soraya Elena",
//   //   "dni": 26781323,
//   //   "gender": "F",
//   //   "birthdate": "17/04/1999",
//   //   "email": "soriescobar99@gmail.com",
//   //   "local_phone_number": "NO POSEE",
//   //   "whatsapp_number": 4128875301,
//   //   "address": "Urb. Ciudad Plaza. Av. Principal. Edif 28 Apto 2-A Valencia Carabobo",
//   //   "collage": "UCV",
//   //   "career": "Bioanálisis",
//   //   "study_area": "HEALTH_SCIENCES",
//   //   "study_regime": "ANNUAL",
//   //   "program_admission_date": "04/10/2019",
//   //   "scholar_condition": "ALUMNI"
//   // },
//   // {
//   //   "last_names": "Reyes Sousa",
//   //   "first_names": "Gerling Del Carmen",
//   //   "dni": 26817486,
//   //   "gender": "F",
//   //   "birthdate": "19/02/1998",
//   //   "email": "gercreyes1902@gmail.com",
//   //   "local_phone_number": "NO POSEE",
//   //   "whatsapp_number": 4244648565,
//   //   "address": "Avenida Universidad, Residencias AraUCVa, Naguanagua, Valencia Carabobo",
//   //   "collage": "UCV",
//   //   "career": "Ciencias Fiscales",
//   //   "study_area": "SOCIAL_SCIENCES",
//   //   "study_regime": "SEMESTER",
//   //   "program_admission_date": "25/01/2018",
//   //   "scholar_condition": "ALUMNI"
//   // },
//   // {
//   //   "last_names": "Torrealba Salazar",
//   //   "first_names": "Ángela Valentina",
//   //   "dni": 26580196,
//   //   "gender": "F",
//   //   "birthdate": "14/02/1997",
//   //   "email": "angvts12@gmail.com\nangelat_valen12@hotmail.com",
//   //   "local_phone_number": "NO POSEE",
//   //   "whatsapp_number": "4124372599 /4128880121",
//   //   "address": "Barrio Jose Regino Peña, calle Vargas Casa 110-91 Valencia Carabobo",
//   //   "collage": "UCV",
//   //   "career": "Cs de la Computación",
//   //   "study_area": "STEM",
//   //   "study_regime": "ANNUAL",
//   //   "program_admission_date": "25/01/2018",
//   //   "scholar_condition": "ALUMNI"
//   // },
//   // {
//   //   "last_names": "Peraza Salcedo",
//   //   "first_names": "Gabriel Alejandro",
//   //   "dni": 26929687,
//   //   "gender": "M",
//   //   "birthdate": "25/03/2000",
//   //   "email": "sgaps01@gmail.com",
//   //   "local_phone_number": "NO POSEE",
//   //   "whatsapp_number": 4128917683,
//   //   "address": "Avenida 112E, Casa 284, Valencia, Carabobo",
//   //   "collage": "UCV",
//   //   "career": "Cs de la Computación",
//   //   "study_area": "STEM",
//   //   "study_regime": "ANNUAL",
//   //   "program_admission_date": "04/10/2019",
//   //   "scholar_condition": "ALUMNI"
//   // },
//   // {
//   //   "last_names": "Pelay Rodríguez",
//   //   "first_names": "Jesús Antonio",
//   //   "dni": 26804859,
//   //   "gender": "M",
//   //   "birthdate": "8/4/1999",
//   //   "email": "pelayjesus@gmail.com",
//   //   "local_phone_number": "NO POSEE",
//   //   "whatsapp_number": 4244622817,
//   //   "address": "Casa nro 37 manzana 7, Lago Jardín, Guacara, Carabobo",
//   //   "collage": "UCV",
//   //   "career": "Cs de la Computación",
//   //   "study_area": "STEM",
//   //   "study_regime": "ANNUAL",
//   //   "program_admission_date": "04/10/2019",
//   //   "scholar_condition": "ALUMNI"
//   // },
//   // {
//   //   "last_names": "Valenzuela HuanUCVo",
//   //   "first_names": "Margareth del Rosario",
//   //   "dni": 84584284,
//   //   "gender": "F",
//   //   "birthdate": "5/7/1997",
//   //   "email": "margarethvale28@gmail.com",
//   //   "local_phone_number": "NO POSEE",
//   //   "whatsapp_number": 4261322007,
//   //   "address": "Urbanizacion Villanueva San Diego, Carabobo",
//   //   "collage": "UCV",
//   //   "career": "Contaduría Pública",
//   //   "study_area": "SOCIAL_SCIENCES",
//   //   "study_regime": "SEMESTER",
//   //   "program_admission_date": "25/01/2018",
//   //   "scholar_condition": "ALUMNI"
//   // },
//   // {
//   //   "last_names": "Alvarado Alvarez",
//   //   "first_names": "Rommel Andrés",
//   //   "dni": 26547038,
//   //   "gender": "M",
//   //   "birthdate": "2/3/1998",
//   //   "email": "raaa1998@gmail.com",
//   //   "local_phone_number": "241 8675142",
//   //   "whatsapp_number": 4244082843,
//   //   "address": "Urbanización La Granja, Naguanagua, Valencia Carabobo",
//   //   "collage": "UCV",
//   //   "career": "Contaduría Pública",
//   //   "study_area": "SOCIAL_SCIENCES",
//   //   "study_regime": "SEMESTER",
//   //   "program_admission_date": "25/01/2018",
//   //   "scholar_condition": "ALUMNI"
//   // },
//   // {
//   //   "last_names": "Zambrano Michelena",
//   //   "first_names": "Camila Emiliana",
//   //   "dni": 27605592,
//   //   "gender": "F",
//   //   "birthdate": "29/05/2000",
//   //   "email": "camilaezmichelena22@gmail.com",
//   //   "local_phone_number": "241 8669281",
//   //   "whatsapp_number": 4124308631,
//   //   "address": "Urbanización La Granja, Naguanagua, Valencia Carabobo",
//   //   "collage": "UCV",
//   //   "career": "Derecho",
//   //   "study_area": "JURIDICAL_POLITICAL_SCIENCES",
//   //   "study_regime": "ANNUAL",
//   //   "program_admission_date": "04/10/2019",
//   //   "scholar_condition": "ALUMNI"
//   // },
//   {
//     "last_names": "Rodríguez Magdaleno",
//     "first_names": "Eleana Yrali",
//     "dni": 28098282,
//     "gender": "F",
//     "birthdate": "8/9/2000",
//     "email": "eleana.yrm18@gmail.com",
//     "local_phone_number": "NO POSEE",
//     "whatsapp_number": 4244445795,
//     "address": "Los guayos, Paraparal. Carabobo",
//     "collage": "UCV",
//     "career": "EdUCVación: Mención Inglés",
//     "study_area": "HUMANITIES_EDUCATION",
//     "study_regime": "SEMESTER",
//     "program_admission_date": "25/01/2018",
//     "scholar_condition": "ALUMNI"
//   },
//   {
//     "last_names": "Villegas Seijas",
//     "first_names": "Ángela Ludin",
//     "dni": 25903563,
//     "gender": "F",
//     "birthdate": "16/07/1997",
//     "email": "angelavillegas16@hotmail.com",
//     "local_phone_number": "NO POSEE",
//     "whatsapp_number": 4264314928,
//     "address": "La Honda, Tocuyito, Municipio Libertador, Carabobo",
//     "collage": "UCV",
//     "career": "EdUCVación: Mención Música",
//     "study_area": "HUMANITIES_EDUCATION",
//     "study_regime": "SEMESTER",
//     "program_admission_date": "25/01/2018",
//     "scholar_condition": "ALUMNI"
//   },
//   {
//     "last_names": "Corona Villegas",
//     "first_names": "María de los Ángeles",
//     "dni": 26379857,
//     "gender": "F",
//     "birthdate": "18/03/1998",
//     "email": "mariangelacorona29@hotmail.com",
//     "local_phone_number": "NO POSEE",
//     "whatsapp_number": 4245150089,
//     "address": "Naguanagua. Carabobo",
//     "collage": "UCV",
//     "career": "EdUCVación: Mención Oientación",
//     "study_area": "HUMANITIES_EDUCATION",
//     "study_regime": "SEMESTER",
//     "program_admission_date": "25/01/2018",
//     "scholar_condition": "ALUMNI"
//   },
//   // {
//   //   "last_names": "Herrera Zerpa",
//   //   "first_names": "Carmen Laura",
//   //   "dni": 26920283,
//   //   "gender": "F",
//   //   "birthdate": "1/9/1998",
//   //   "email": "carmenh12.ch98@gmail.com",
//   //   "local_phone_number": "NO POSEE",
//   //   "whatsapp_number": 4143927008,
//   //   "address": "Barrio La Luz, Naguanagua, Carabobo",
//   //   "collage": "UCV",
//   //   "career": "Estudios Políticos",
//   //   "study_area": "JURIDICAL_POLITICAL_SCIENCES",
//   //   "study_regime": "ANNUAL",
//   //   "program_admission_date": "25/01/2018",
//   //   "scholar_condition": "ALUMNI"
//   // },
//   // {
//   //   "last_names": "Isaacs Arocha",
//   //   "first_names": "María Clementina",
//   //   "dni": 26337650,
//   //   "gender": "F",
//   //   "birthdate": "1/9/1998",
//   //   "email": null,
//   //   "local_phone_number": null,
//   //   "whatsapp_number": null,
//   //   "address": null,
//   //   "collage": "UCV",
//   //   "career": "Estudios Políticos",
//   //   "study_area": "JURIDICAL_POLITICAL_SCIENCES",
//   //   "study_regime": "ANNUAL",
//   //   "program_admission_date": "04/10/2019",
//   //   "scholar_condition": "WITHDRAWAL"
//   // },
//   // {
//   //   "last_names": "Castañeda Estevez",
//   //   "first_names": "Daniela",
//   //   "dni": 27453577,
//   //   "gender": "F",
//   //   "birthdate": "2/12/1998",
//   //   "email": "danivi0298@gmail.com",
//   //   "local_phone_number": "NO POSEE",
//   //   "whatsapp_number": 4128303846,
//   //   "address": "Urbanización Los Mangos, Valencia, Carabobo",
//   //   "collage": "UCV",
//   //   "career": "Ingeniería Civil",
//   //   "study_area": "STEM",
//   //   "study_regime": "SEMESTER",
//   //   "program_admission_date": "04/10/2019",
//   //   "scholar_condition": "ALUMNI"
//   // },
//   // {
//   //   "last_names": "Garzon García",
//   //   "first_names": "Margy Yuliana",
//   //   "dni": 27550125,
//   //   "gender": "F",
//   //   "birthdate": "23/04/1999",
//   //   "email": "garzonmargy@gmail.com",
//   //   "local_phone_number": "241 8689222",
//   //   "whatsapp_number": 4124383933,
//   //   "address": "Residencias Las Mercedes, Naguanagua, Carabobo",
//   //   "collage": "UCV",
//   //   "career": "Cs Matematicas",
//   //   "study_area": "STEM",
//   //   "study_regime": "ANNUAL",
//   //   "program_admission_date": "04/10/2019",
//   //   "scholar_condition": "ALUMNI"
//   // },
//   // {
//   //   "last_names": "Reyes Sousa",
//   //   "first_names": "Darling Del Carmen",
//   //   "dni": 26817882,
//   //   "gender": "F",
//   //   "birthdate": "4/3/2000",
//   //   "email": "darcreyes04@gmail.com",
//   //   "local_phone_number": "NO POSEE",
//   //   "whatsapp_number": 4244648565,
//   //   "address": "Residencias AraUCVa, Avenida Universidad, Naguanagua, Carabobo",
//   //   "collage": "UCV",
//   //   "career": "Medicina",
//   //   "study_area": "HEALTH_SCIENCES",
//   //   "study_regime": "ANNUAL",
//   //   "program_admission_date": "04/10/2019",
//   //   "scholar_condition": "ALUMNI"
//   // },
//   // {
//   //   "last_names": "Echeniquez Vento",
//   //   "first_names": "Juana Cointa",
//   //   "dni": 26879454,
//   //   "gender": "F",
//   //   "birthdate": "12/3/1999",
//   //   "email": "juanitaecheniquez@gmail.com",
//   //   "local_phone_number": "241 8360993",
//   //   "whatsapp_number": 4244635276,
//   //   "address": "Avenida Andrés Bello, entre Rangel y Michelena, Valencia, Carabobo",
//   //   "collage": "UCV",
//   //   "career": "Medicina",
//   //   "study_area": "HEALTH_SCIENCES",
//   //   "study_regime": "ANNUAL",
//   //   "program_admission_date": "04/10/2019",
//   //   "scholar_condition": "ALUMNI"
//   // },
//   // {
//   //   "last_names": "Castillo Guerra",
//   //   "first_names": "Oriana Raymar",
//   //   "dni": 26929398,
//   //   "gender": "F",
//   //   "birthdate": "18/05/1999",
//   //   "email": "orianacastilloUCV@gmail.com",
//   //   "local_phone_number": "NO POSEE",
//   //   "whatsapp_number": 4244153189,
//   //   "address": "La Trigaleña Valencia Carabobo",
//   //   "collage": "UCV",
//   //   "career": "Medicina",
//   //   "study_area": "HEALTH_SCIENCES",
//   //   "study_regime": "ANNUAL",
//   //   "program_admission_date": "04/10/2019",
//   //   "scholar_condition": "ALUMNI"
//   // },
//   // {
//   //   "last_names": "Carpio Matz",
//   //   "first_names": "Sherilyn Eiline",
//   //   "dni": 23637354,
//   //   "gender": "F",
//   //   "birthdate": "3/2/1995",
//   //   "email": "sherylcrp@gmail.com",
//   //   "local_phone_number": "NO POSEE",
//   //   "whatsapp_number": 4242578158,
//   //   "address": "Urbanización Chaguaramal, Naguanagua, Carabobo",
//   //   "collage": "UCV",
//   //   "career": "Medicina",
//   //   "study_area": "HEALTH_SCIENCES",
//   //   "study_regime": "ANNUAL",
//   //   "program_admission_date": "04/10/2019",
//   //   "scholar_condition": "ALUMNI"
//   // },
//   // {
//   //   "last_names": "Colmenares Maita",
//   //   "first_names": "William Andrés",
//   //   "dni": 26186413,
//   //   "gender": "M",
//   //   "birthdate": "3/5/1998",
//   //   "email": "wcolme98@gmail.com",
//   //   "local_phone_number": "NO POSEE",
//   //   "whatsapp_number": 4144317533,
//   //   "address": "Urb Prebo calle137C Res. Altair. Piso 7 Apto. 73 Valencia Carabobo",
//   //   "collage": "UCV",
//   //   "career": "Medicina",
//   //   "study_area": "HEALTH_SCIENCES",
//   //   "study_regime": "ANNUAL",
//   //   "program_admission_date": "04/10/2019",
//   //   "scholar_condition": "ALUMNI"
//   // },
//   // {
//   //   "last_names": "Ruíz Ceballos",
//   //   "first_names": "Paolo Jesús",
//   //   "dni": 26855906,
//   //   "gender": "M",
//   //   "birthdate": "13/11/1998",
//   //   "email": "paoloruiz1998@gmail.com",
//   //   "local_phone_number": "NO POSEE",
//   //   "whatsapp_number": 4244545651,
//   //   "address": "La Victoria Aragua",
//   //   "collage": "UCV",
//   //   "career": "Ciencias Administrativas y Gerenciales",
//   //   "study_area": "SOCIAL_SCIENCES",
//   //   "study_regime": "SEMESTER",
//   //   "program_admission_date": "25/01/2018",
//   //   "scholar_condition": "ALUMNI"
//   // },
//   // {
//   //   "last_names": "Miranda Rodríguez",
//   //   "first_names": "Andrea Valentina",
//   //   "dni": 20500302,
//   //   "gender": "F",
//   //   "birthdate": "18/03/1998",
//   //   "email": "abdrea.m2000@gmail.com",
//   //   "local_phone_number": "NO POSEE",
//   //   "whatsapp_number": null,
//   //   "address": "Urbanización Las Quintas , Naguanagua, Carabobo",
//   //   "collage": "UCV",
//   //   "career": "Ciencias Administrativas y Gerenciales: Mencion Logistica",
//   //   "study_area": "SOCIAL_SCIENCES",
//   //   "study_regime": "SEMESTER",
//   //   "program_admission_date": "04/10/2019",
//   //   "scholar_condition": "ALUMNI"
//   // },
//   // {
//   //   "last_names": "Rodriíguez Hernandez",
//   //   "first_names": "Miguel Ángel",
//   //   "dni": 27381764,
//   //   "gender": "M",
//   //   "birthdate": "14/09/1999",
//   //   "email": "miguelangelr149@gmail.com",
//   //   "local_phone_number": "NO POSEE",
//   //   "whatsapp_number": 4243725436,
//   //   "address": "La Victoria Aragua",
//   //   "collage": "UCV",
//   //   "career": "Ciencias Administrativas y Gerenciales: Mención Mercadeo",
//   //   "study_area": "SOCIAL_SCIENCES",
//   //   "study_regime": "SEMESTER",
//   //   "program_admission_date": "04/10/2019",
//   //   "scholar_condition": "ALUMNI"
//   // },
//   // {
//   //   "last_names": "Álvarez Viera",
//   //   "first_names": "Wilmerys Yolimar",
//   //   "dni": 26186413,
//   //   "gender": "F",
//   //   "birthdate": "1/9/1998",
//   //   "email": null,
//   //   "local_phone_number": "NO POSEE",
//   //   "whatsapp_number": null,
//   //   "address": null,
//   //   "collage": "UCV",
//   //   "career": "Ingeniería en Información",
//   //   "study_area": "STEM",
//   //   "study_regime": "SEMESTER",
//   //   "program_admission_date": "25/01/2018",
//   //   "scholar_condition": "WITHDRAWAL"
//   // },
//   // {
//   //   "last_names": "Ruíz Ceballos",
//   //   "first_names": "Jesús Armando",
//   //   "dni": 26804859,
//   //   "gender": "M",
//   //   "birthdate": "19/12/2000",
//   //   "email": "jruiz.mech@gmail.com",
//   //   "local_phone_number": "NO POSEE",
//   //   "whatsapp_number": 4244945861,
//   //   "address": "La Victoria Aragua",
//   //   "collage": "UCV",
//   //   "career": "Ingeniería en ProdUCVción Industrial",
//   //   "study_area": "STEM",
//   //   "study_regime": "SEMESTER",
//   //   "program_admission_date": "04/10/2019",
//   //   "scholar_condition": "ALUMNI"
//   // },
//   // {
//   //   "last_names": "Perozo Garcia",
//   //   "first_names": "Jesús Manuel",
//   //   "dni": 27242297,
//   //   "gender": "M",
//   //   "birthdate": "19/02/1999",
//   //   "email": "jesusmanuelperozo@gmail.com",
//   //   "local_phone_number": "NO POSEE",
//   //   "whatsapp_number": 4244338325,
//   //   "address": "Urbanización, La Trigaleña,, Residencias Cumbre Azul, Valencia, Carabobo",
//   //   "collage": "UCV",
//   //   "career": "Ingeniería en Redes y comunicaciones",
//   //   "study_area": "STEM",
//   //   "study_regime": "SEMESTER",
//   //   "program_admission_date": "25/01/2018",
//   //   "scholar_condition": "ALUMNI"
//   // },
//   // {
//   //   "last_names": "Abboud Abboud",
//   //   "first_names": "Pierre Milton",
//   //   "dni": 27493589,
//   //   "gender": "M",
//   //   "birthdate": "1/9/1998",
//   //   "email": null,
//   //   "local_phone_number": null,
//   //   "whatsapp_number": null,
//   //   "address": null,
//   //   "collage": "UCV",
//   //   "career": "Ingenieria en Redes y Telecomunicación / Ingeniería Información",
//   //   "study_area": "STEM",
//   //   "study_regime": "SEMESTER",
//   //   "program_admission_date": "04/10/2019",
//   //   "scholar_condition": "WITHDRAWAL"
//   // }
// ]


// const createScholarsInBulkFromSheet = async (chapterID: string = 'VYmgeeUPWwh_P_myJ1PCJ') => {


//   const scholars = values.map(async (scholar) => {

//     try {
//       await prisma.scholar.create({
//         data: {
//           first_names: scholar.first_names,
//           last_names: scholar.last_names,
//           dni: scholar.dni.toString(),
//           birthdate: new Date().toISOString(),
//           email: scholar.email,
//           local_phone_number: scholar.local_phone_number ? scholar.local_phone_number : '',
//           cell_phone_Number: scholar.whatsapp_number?.toString() || '',
//           whatsapp_number: scholar.whatsapp_number?.toString() || '',
//           address: scholar.address,
//           gender: scholar.gender as Gender,
//           program_information: {
//             create: {
//               program_admission_date: new Date().toISOString(),
//               scholar_condition: scholar.scholar_condition as ScholarCondition,
//               chapter: {
//                 connect: {
//                   id: chapterID,
//                 },
//               },
//               is_chat_speaker: false,
//             },
//           },
//           collage_information: {
//             create: {
//               collage: scholar.collage as Collages,
//               career: scholar.career,
//               study_area: scholar.study_area as StudyArea,
//               study_regime: scholar.study_regime as StudyRegime,
//               evaluation_scale: 'CERO_TO_TWENTY',
//               kind_of_collage: 'PUBLIC',
//             },
//           },

//         },
//       });
//       console.log('✅ El becario', scholar.first_names, scholar.last_names, 'se ha creado correctamente');
//     } catch (error) {
//       console.error('El becario', scholar.first_names, scholar.last_names, 'no se ha podido crear');
//       console.error(error);
//     }
//   });

//   return scholars;
// };