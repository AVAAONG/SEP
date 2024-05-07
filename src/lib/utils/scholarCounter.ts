import { ScholarStatus } from "@prisma/client";
import moment from "moment";
import { parseModalityFromDatabase } from "../utils2";
import { getApprovedAndAttendedVolunteers } from "./getAttendedActivities";
import { parseAvaaAdmisionYear, parseCvaLocationFromDatabase, parseKindOfCollageFromDatabase, parseStudiRegimeFromDatabase, parseStudyAreaFromDatabase } from "./parseFromDatabase";

export const countScholarGeneralProperties = (scholars: any[]) => {
    const counts = {
        avaaYear: {} as Record<"I" | "II" | "III" | "IV" | "V" | "+V", number>,
        gender: {} as Record<'Masculino' | 'Femenino', number>,
        status: {} as Record<ScholarStatus, number>,
    };
    scholars.forEach(scholar => {
        const scholarAvaaYear = parseAvaaAdmisionYear(
            moment().diff(moment(scholar.program_information?.program_admission_date), 'years')
        );
        const scholarGender = scholar.gender === 'M' ? 'Masculino' : 'Femenino';
        const scholarStatus = scholar.program_information?.scholar_status as ScholarStatus;
        const scholarCondition = scholar.program_information?.scholar_condition;

        counts.avaaYear[scholarAvaaYear] = (counts.avaaYear[scholarAvaaYear] || 0) + 1;
        counts.gender[scholarGender] = (counts.gender[scholarGender] || 0) + 1;
        counts.status[scholarStatus] = (counts.status[scholarStatus] || 0) + 1;
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

export const countScholarCvaProperties = (scholars: any[]) => {
    const counts = {
        cvaLocation: {} as Record<"Las mercedes" | "El centro" | "Sin datos", number>,
        cvaModality: {} as Record<"Presencial" | "Virtual" | "Hibrida" | 'Sin datos', number>,
        cvaLastModule: {} as Record<string, number>,
        hasFinishedCva: {} as Record<string, number>,
        isCurrentlyInCva: {} as Record<string, number>,
    };

    scholars.forEach(scholar => {
        const cvaLocation = parseCvaLocationFromDatabase(scholar.cva_information?.cva_location);
        const cvaModality = parseModalityFromDatabase(scholar.cva_information?.modules?.[0]?.modality);
        const cvaLastModule = scholar.cva_information?.modules?.[0]?.module;
        const hasFinishedCva = scholar.cva_information?.already_finished_cva ? 'Sí' : 'No';
        const isCurrentlyInCva = scholar.cva_information?.is_in_cva ? 'Sí' : 'No';

        counts.cvaLocation[cvaLocation] = (counts.cvaLocation[cvaLocation] || 0) + 1;
        counts.cvaModality[cvaModality] = (counts.cvaModality[cvaModality] || 0) + 1;
        if (cvaLastModule === undefined) { }
        else counts.cvaLastModule[cvaLastModule] = (counts.cvaLastModule[cvaLastModule] || 0) + 1;
        counts.hasFinishedCva[hasFinishedCva] = (counts.hasFinishedCva[hasFinishedCva] || 0) + 1;
        counts.isCurrentlyInCva[isCurrentlyInCva] = (counts.isCurrentlyInCva[isCurrentlyInCva] || 0) + 1;
    });
    return counts;
}

type ActivitiesStats = 'Menos de 30%' | '30%' | '70%' | '100%' | 'Mas de 100%'

export const countScholarActivitiesProperties = (scholars: any[]) => {
    const counts = {
        workshopsPercentage: {} as Record<ActivitiesStats, number>,
        chatPercentage: {} as Record<ActivitiesStats, number>,
        volunteerPercentage: {} as Record<ActivitiesStats, number>,
    };

    const updateCounts = (percentage: number, count: Record<string, number>) => {
        if (percentage < 30) {
            count['Menos de 30%'] = (count['Menos de 30%'] || 0) + 1;
        } else if (percentage < 70) {
            count['30%'] = (count['30%'] || 0) + 1;
        } else if (percentage < 100) {
            count['70%'] = (count['70%'] || 0) + 1;
        } else if (percentage === 100) {
            count['100%'] = (count['100%'] || 0) + 1;
        } else {
            count['Mas de 100%'] = (count['Mas de 100%'] || 0) + 1;
        }
    };

    scholars.forEach(scholar => {
        const TOTAL_WORKSHOPS_AND_CHATS = 10;
        const TOTAL_VOLUNTEER_HOURS = 100;
        const doneChats = scholar.program_information?.attended_chats.length;
        const doneWorkshops = scholar.program_information?.attended_workshops.length;

        const { totalVolunteerHours } = getApprovedAndAttendedVolunteers(scholar.program_information?.volunteerAttendance)

        const workshopPercentage = (doneWorkshops / TOTAL_WORKSHOPS_AND_CHATS) * 100;
        const chatPercentage = (doneChats / TOTAL_WORKSHOPS_AND_CHATS) * 100;

        const volunteerPercentage = (totalVolunteerHours / TOTAL_VOLUNTEER_HOURS) * 100;

        updateCounts(workshopPercentage, counts.workshopsPercentage);
        updateCounts(chatPercentage, counts.chatPercentage);
        updateCounts(volunteerPercentage, counts.volunteerPercentage);
    });

    return counts;
};