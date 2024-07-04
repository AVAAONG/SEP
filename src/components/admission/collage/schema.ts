import { z } from "zod";

const studyAreaSchema = z.string(); // Assuming STUDY_AREAS is an array of strings

const collageSchema = z.object({
    kind_of_collage: z.literal("PUBLIC").or(z.literal("PRIVATE")),
    universidad: z.string(), // Assuming university values are strings
    carrera: z.string().min(1, { message: "Carrera is required" }),
    areaEstudio: studyAreaSchema,
    fechaInicioEstudiosUniversitarios: z.date(),
    regimenEstudio: z.literal("SEMESTRAL").or(
        z.literal("TRIMESTRAL").or(z.literal("CUATRIMESTRAL")).or(z.literal("ANUAL"))
    ),
    periodoAcademicoEnCurso: z.literal("SEMESTRAL").optional(), // Assuming only "SEMESTRAL" for now
    promedioUltimoPeriodo: z.number().positive(),
    modalidadClases: z.literal("IN_PERSON").or(z.literal("ONLINE")).or(z.literal("Hibrida")),
    poseeBeca: z.literal("YES").or(z.literal("NO")),
    porcentajeBeca: z.number().positive().optional(), // Beca percentage might be optional
});

export default collageSchema;