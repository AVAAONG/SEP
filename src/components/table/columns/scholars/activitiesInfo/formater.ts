import { getBlobImage } from "@/lib/azure/azure";
import formatDni from "@/lib/db/utils/formatDni";
import { getApprovedAndAttendedVolunteers } from "@/lib/utils/getAttendedActivities";
import { EvaluationScale } from "@prisma/client";
import { ScholarActivitiesInformationColumnsProps } from "./columns";

export const formatScholarsActivitiesForActivitiesTable = async (scholars: any[]): Promise<ScholarActivitiesInformationColumnsProps[]> => {
    const data = scholars.map(async (scholar) => {
        const {
            id,
            first_names,
            last_names,
            photo,
            email,
            whatsapp_number,
            program_information,
        } = scholar;
        const { totalVolunteerHours } = getApprovedAndAttendedVolunteers(program_information?.volunteerAttendance)

        return {
            id,
            name: first_names + ' ' + last_names,
            profilePhoto: photo ? await getBlobImage(photo) : null,
            dni: formatDni(scholar.dni),
            whatsAppNumber: whatsapp_number,
            email,
            doneWorkshops: program_information?.attended_workshops.length,
            doneChats: program_information?.attended_chats.length,
            doneVolunteerHours: totalVolunteerHours,
            scholarGrade: getCollageGradeBase20(scholar.collage_information?.[0]?.collage_period?.[0]?.grade, scholar.collage_information?.[0]?.evaluation_scale)
        };
    });
    return Promise.all(data)
}

const getCollageGradeBase20 = (grade: number | undefined, evaluationScale: EvaluationScale) => {
    let finalGrade: number = 0
    if (!grade) return
    switch (evaluationScale) {
        case "CERO_TO_FIVE":
            finalGrade = Number((grade * 4).toFixed(2))
            break;
        case "CERO_TO_TEN":
            finalGrade = Number((grade * 2).toFixed(2))
            break;
        case "CERO_TO_TWENTY":
            finalGrade = Number(grade.toFixed(2))
            break;
        default:
            break;
    }
    return finalGrade;
}