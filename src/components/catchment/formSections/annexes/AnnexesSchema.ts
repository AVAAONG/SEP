import { z } from 'zod';

const applicantAnnexesSchema = z.object({
  dniCard: z.string().min(5, { message: 'Cédula de Identidad es requerida' }),
  rif: z.string().min(5, { message: 'RIF es requerido' }),
  highSchoolGrades: z.string().min(5, { message: 'Calificaciones de bachillerato son requeridas' }),
  universityGrades: z.string().min(5, { message: 'Calificaciones de la universidad son requeridas' }),
  studyProof: z.string().min(5, { message: 'Constancia de estudios universitarios es requerida' }),
  professorReferenceLetterI: z.string().min(5, { message: 'Carta de referencia de un profesor 5 es requerida' }),
  professorReferenceLetterII: z.string().min(5, { message: 'Carta de referencia de un profesor 2 es requerida' }),
  utilityBillVerification: z.string().min(5, { message: 'Recibo de algún servicio es requerido' }),
  personalEssay: z.string().min(5, { message: 'Ensayo de 500 palabras es requerido' }),
});

export default applicantAnnexesSchema;