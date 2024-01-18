// import { Workshop } from '@/types/Workshop';
// <<<<<<< HEAD
// <<<<<<< Updated upstream
// import { Form } from '../auth/auth';
// import { addDays } from '../calendar/calendar';
// =======

// import { addDays, mapModality, mapWorkshopSkill } from './calendar/utils';
// >>>>>>> Stashed changes

// export const createGoogleForm = async (title: string, description: string) => {
//   const response = await Form.forms.create({
//     requestBody: {
//       info: {
//         title,
//         description,
//         documentTitle: title,
//       },
//       items: [
//         {
//           title: 'Nombre y Apellido',
//           textItem: {},
//         },
//         {
//           title: 'Cedula de identidad',
//           textItem: {},
//         },
//         {
//           title: 'Correo Electrónico',
//           textItem: {},
//         },
//         {
//           title: 'Teléfono',
//           textItem: {},
//         },
//       ],
//     },
//   });
//   return response.data.responderUri;
// };

// const getForm = async (formId: string) => {
//   const res = await Form.forms.get({ formId });
//   return res.data;
// };

// export const updateFormInfo = async (formId: string, title: string, description: string) => {
//   const res = await Form.forms.batchUpdate({
//     formId,
//     requestBody: {
//       requests: [
//         {
//           updateFormInfo: {
//             updateMask: '*',
//             info: {
//               title,
//               description,
//               documentTitle: title,
//             },
//           },
//         },
//       ],
//     },
//   });
//   return res.data.form?.formId;
// };
// =======
// import { addDays } from './calendar/calendar';
// >>>>>>> fcef2336378e1c4ee972daefd689a96eb8bd57ce

// export const createFormDescription = (workshop: Workshop) => {
//   const { title, pensum, date, startHour, endHour, speaker, modality, platform, description } =
//     workshop;
//   const formDescription = `Taller: ${title}
// Competencia Asociada: ${mapWorkshopSkill(pensum)}
// ${
//   platform === 'padlet'
//     ? `Fecha: De ${new Date(date).toLocaleDateString()} hasta ${new Date(
//         addDays(new Date(date), 3)
//       ).toLocaleDateString()}`
//     : `Fecha: ${date}`
// }
// ${platform === 'padlet' ? `` : `Horario: de ${startHour} hasta las ${endHour}`}
// Facilitador: ${splitSpeakerValues(speaker).speakerName}
// Modalidad: ${mapModality(modality)}
// ${modality === 'IN_PERSON' ? `Lugar: ${platform}` : `Plataforma: ${platform}`}
// ${description === ' ' ? '' : `\n ${description}`}`;
//   return formDescription;
// };

// const splitSpeakerValues = (value: string) => {
//   const speakerValues = value.split('+/+');
//   const speakerId = speakerValues[0];
//   const speakerName = speakerValues[1];
//   const speakerEmail = speakerValues[2];
//   return { speakerId, speakerName, speakerEmail };
// };
