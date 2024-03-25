import moment from "moment";
import { parseAvaaAdmisionYear, parseStudyAreaFromDatabase } from "./parseFromDatabase";

export const countScholarProperties = (scholars: any[]) => {
    const counts = {
        avaaYear: {} as Record<"I" | "II" | "III" | "IV" | "V" | "+V", number>,
        gender: {} as Record<'Masculino' | 'Femenino', number>,
        studyArea: {} as Record<"Arquitectura y urbanismo" | "Ciencias de la salud" | "Humanidades y educación" | "Ciencias jurídicas y políticas" | "Ciencias sociales" | "Ciencias, tecnología, ingeniería y matemáticas" | "ERROR", number>,
        status: {} as Record<string, number>,
    };
    scholars.forEach(scholar => {
        const scholarAvaaYear = parseAvaaAdmisionYear(
            moment().diff(moment(scholar.program_information?.program_admission_date), 'years')
        );
        const scholarGender = scholar.gender === 'M' ? 'Masculino' : 'Femenino';
        const scholarStudyArea = parseStudyAreaFromDatabase(scholar.collage_information[0]?.study_area)
        const scholarStatus = scholar.program_information?.scholar_status;

        counts.avaaYear[scholarAvaaYear] = (counts.avaaYear[scholarAvaaYear] || 0) + 1;
        counts.gender[scholarGender] = (counts.gender[scholarGender] || 0) + 1;
        counts.studyArea[scholarStudyArea] = (counts.studyArea[scholarStudyArea] || 0) + 1;
        counts.status[scholarStatus] = (counts.status[scholarStatus] || 0) + 1;
    });
    return counts;
}