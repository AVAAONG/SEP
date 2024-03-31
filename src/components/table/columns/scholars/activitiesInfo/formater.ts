import { ScholarWithAllData } from "@/components/EditScholarForm";
import { getBlobImage } from "@/lib/azure/azure";
import { getApprovedAndAttendedVolunteers } from "@/lib/utils/activityFilters";
import { ScholarActivitiesInformationColumnsProps } from "./columns";

export const formatScholarsActivitiesForActivitiesTable = async (scholars: ScholarWithAllData[]): Promise<ScholarActivitiesInformationColumnsProps[]> => {
    const data = scholars.map(async (scholar) => {
        const {
            id,
            first_names,
            last_names,
            photo,
            dni,
            program_information,
        } = scholar;
        const done = program_information.attended_workshops.filter((attendance) => attendance.attendance === 'ATTENDED').length
        console.log(program_information.volunteerAttendance)
        return {
            id,
            first_names,
            last_names,
            profilePhoto: photo ? await getBlobImage(photo) : null,
            dni,
            doneWorkshops: done,
            doneChats: done,
            doneVolunteerHours: getApprovedAndAttendedVolunteers(program_information.volunteerAttendance.volunteer).totalVolunteerHours,
        };
    });
    return Promise.all(data)
}
