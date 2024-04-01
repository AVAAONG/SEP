import { VolunteerWithAllData } from "@/lib/db/types";
import { parseKindOfVolunteerFromDatabase, parseModalityFromDatabase, parseVolunteerStatusFromDatabase } from "@/lib/utils2";
import { IscholarVolunteerAttendanceColumns } from "./columns";


const createScholarVolunteerAttendanceForTable = (volunteers: VolunteerWithAllData[]): IscholarVolunteerAttendanceColumns[] => {
    return volunteers.map((volunteer) => {
        const volunteerAttendance = volunteer.volunteer_attendance[0];
        return {
            id: volunteer.id,
            title: volunteer.title,
            endDate: new Date(volunteer.end_dates[0]).toISOString(),
            startDate: new Date(volunteer.start_dates[0]).toISOString(),
            endHour: volunteer.end_dates,
            status: parseVolunteerStatusFromDatabase(volunteer.status),
            modality: parseModalityFromDatabase(volunteer.modality),
            platform: volunteer.platform,
            attendance: volunteerAttendance.attendance,
            kindOfVolunteer: parseKindOfVolunteerFromDatabase(volunteer.kind_of_volunteer),
            asignedHours: volunteerAttendance.asigned_hours,
        };
    });
}
export default createScholarVolunteerAttendanceForTable;