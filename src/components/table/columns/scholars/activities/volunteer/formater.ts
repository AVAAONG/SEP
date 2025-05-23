import { VolunteerWithAllData } from "@/lib/db/types";
import { parseKindOfVolunteerFromDatabase, parseModalityFromDatabase, parseVolunteerProject } from "@/lib/utils2";
import { IAdminVolunteerActivityColumns } from "./columns";


const createAdminVolunteerActivitiesForTable = (volunteers: VolunteerWithAllData[]): IAdminVolunteerActivityColumns[] => {
    return volunteers.map((volunteer) => {
        const averageVolunteerHours = volunteer.volunteer_attendance.reduce((acc, attendance) => {
            return acc + attendance.asigned_hours;
        }, 0);
        const volunteerParticipants = volunteer.volunteer_attendance.filter((attendance) => {
            return attendance.attendance === 'ATTENDED';
        }).length;

        return {
            id: volunteer.id,
            title: volunteer.title,
            endDate: new Date(volunteer.end_dates[0]).toISOString(),
            startDate: new Date(volunteer.start_dates[0]).toISOString(),
            endHour: volunteer.end_dates,
            status: volunteer.status,
            modality: parseModalityFromDatabase(volunteer.modality),
            platform: volunteer.platform,
            kindOfVolunteer: parseKindOfVolunteerFromDatabase(volunteer.kind_of_volunteer),
            hours: Number(averageVolunteerHours.toFixed(2)),
            volunteerProject: parseVolunteerProject(volunteer.VolunteerProject),
            beneficiary: volunteer.beneficiary,
            volunteerParticipants,
        };
    });
}
export default createAdminVolunteerActivitiesForTable;