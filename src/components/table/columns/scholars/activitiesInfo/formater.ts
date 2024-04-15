import { getBlobImage } from "@/lib/azure/azure";
import { getApprovedAndAttendedVolunteers } from "@/lib/utils/getAttendedActivities";
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
            first_names,
            last_names,
            profilePhoto: photo ? await getBlobImage(photo) : null,
            whatsAppNumber: whatsapp_number,
            email,
            doneWorkshops: program_information?.attended_workshops.length,
            doneChats: program_information?.attended_chats.length,
            doneVolunteerHours: totalVolunteerHours,
        };
    });
    return Promise.all(data)
}
