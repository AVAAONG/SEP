import moment from "moment";
import { parseAvaaAdmisionYear, parseKindOfCollageFromDatabase, parseStudiRegimeFromDatabase, parseStudyAreaFromDatabase } from "./parseFromDatabase";

export const countScholarGeneralProperties = (scholars: any[]) => {
    const counts = {
        avaaYear: {} as Record<"I" | "II" | "III" | "IV" | "V" | "+V", number>,
        gender: {} as Record<'Masculino' | 'Femenino', number>,
        status: {} as Record<string, number>,
    };
    scholars.forEach(scholar => {
        const scholarAvaaYear = parseAvaaAdmisionYear(
            moment().diff(moment(scholar.program_information?.program_admission_date), 'years')
        );
        const scholarGender = scholar.gender === 'M' ? 'Masculino' : 'Femenino';
        const scholarStatus = scholar.program_information?.scholar_status;
        const scholarCondition = scholar.program_information?.scholar_condition;

        counts.avaaYear[scholarAvaaYear] = (counts.avaaYear[scholarAvaaYear] || 0) + 1;
        counts.gender[scholarGender] = (counts.gender[scholarGender] || 0) + 1;
        counts.status[scholarStatus] = (counts.status[scholarStatus] || 0) + 1;
        counts.status[scholarCondition] = (counts.status[scholarCondition] || 0) + 1;
    });
    return counts;
}

export const countScholarCollageProperties = (scholars: any[]) => {
    const counts = {
        studyArea: {} as Record<"Arquitectura y urbanismo" | "Ciencias de la salud" | "Humanidades y educación" | "Ciencias jurídicas y políticas" | "Ciencias sociales" | "Ciencias, tecnología, ingeniería y matemáticas" | "ERROR", number>,
        kindOfCollage: {} as Record<"Pública" | "Privada" | "ERROR", number>,
        studyRegimen: {} as Record<"Anual" | "Semestral" | "Trimestral" | "Cuatrimestral" | "ERROR", number>,
    };

    scholars.forEach(scholar => {
        const scholarStudyArea = parseStudyAreaFromDatabase(scholar.collage_information[0]?.study_area);
        const scholarKindOfCollage = parseKindOfCollageFromDatabase(scholar.collage_information[0]?.kind_of_collage!);
        const scholarStudyRegimen = parseStudiRegimeFromDatabase(scholar.collage_information[0]?.study_regime!);
        console.log(scholar.collage_information[0]?.kind_of_collage!)
        counts.studyArea[scholarStudyArea] = (counts.studyArea[scholarStudyArea] || 0) + 1;
        counts.kindOfCollage[scholarKindOfCollage] = (counts.kindOfCollage[scholarKindOfCollage] || 0) + 1;
        counts.studyRegimen[scholarStudyRegimen] = (counts.studyRegimen[scholarStudyRegimen] || 0) + 1;
    });
    return counts;
}