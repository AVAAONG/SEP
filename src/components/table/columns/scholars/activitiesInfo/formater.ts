import { getBlobImage } from "@/lib/azure/azure";
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
        return {
            id,
            first_names,
            last_names,
            profilePhoto: photo ? await getBlobImage(photo) : null,
            whatsAppNumber: whatsapp_number,
            email,
            doneWorkshops: program_information?.attended_workshops.length,
            doneChats: program_information?.attended_chats.length,
            doneVolunteerHours: program_information?.volunteerAttendance.reduce((total, volunteer) => total + volunteer.asigned_hours, 0)
        };
    });
    return Promise.all(data)
}
