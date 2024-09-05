import { Prisma } from "@prisma/client";

type IWorkshop = Prisma.WorkshopGetPayload<{
    include: { scholar_attendance: true, speaker: true }
}>;
export const getAttendedWorkshops = (activities: IWorkshop[]) => {
    return activities.filter(
        (activity) => activity.scholar_attendance[0]?.attendance === 'ATTENDED' && activity.activity_status === 'ATTENDANCE_CHECKED'
    );
};



type IChat = Prisma.ChatGetPayload<{
    include: { scholar_attendance: true, speaker: true }
}>;
export const getAttendedChats = (chats: IChat[], scholarId: string) => {
    return chats.filter((chat) =>
        (chat.scholar_attendance[0]?.attendance === 'ATTENDED' && chat.activity_status === 'ATTENDANCE_CHECKED') || (chat.speaker.some((speaker) => speaker.id === scholarId) && chat.activity_status === 'ATTENDANCE_CHECKED')
    );
}


type IVolunteer = Prisma.VolunteerGetPayload<{
    include: { volunteer_attendance: true }
}>;
export const getApprovedAndAttendedVolunteers = (volunteers: IVolunteer[]) => {
    let externalVolunteerHours: number = 0,
        internalVolunteerHours: number = 0,
        internalInPerson: number = 0,
        internalOnline: number = 0,
        internalHynrid: number = 0,
        totalVolunteerHours: number = 0;
    volunteers.forEach(volunteer => {
        const volunteerAttendance = volunteer.volunteer_attendance[0];
        if (volunteer.status === 'APPROVED' && volunteerAttendance?.attendance === 'ATTENDED') {
            if (volunteer.kind_of_volunteer === 'INTERNAL') {
                internalVolunteerHours += volunteerAttendance.asigned_hours;
                if (volunteer.modality === 'IN_PERSON') internalInPerson += volunteerAttendance.asigned_hours;
                if (volunteer.modality === 'HYBRID') internalHynrid += volunteerAttendance.asigned_hours;
                if (volunteer.modality === 'ONLINE') internalOnline += volunteerAttendance.asigned_hours;

            }
            else {
                if (externalVolunteerHours < 40) {
                    const remainingHours = 40 - externalVolunteerHours;
                    externalVolunteerHours += Math.min(volunteerAttendance.asigned_hours, remainingHours);
                }
            };
        }
    })
    totalVolunteerHours += externalVolunteerHours + internalVolunteerHours;
    return { externalVolunteerHours, internalVolunteerHours, totalVolunteerHours, internalInPerson, internalOnline, internalHynrid };
}


export const getApprovedAndAttendedVolunteerActivities = (volunteers: IVolunteer[]) => {
    return volunteers.filter(volunteer => volunteer.status === 'APPROVED' && volunteer.volunteer_attendance[0].attendance === 'ATTENDED');

}