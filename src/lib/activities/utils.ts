'use server';
import { Chat, ChatAttendance, ScholarAttendance, Speaker, Volunteer, Workshop, WorkshopAttendance } from "@prisma/client";
import { headers } from 'next/headers';

export type ActivityKind = 'workshop' | 'chat' | 'volunteer' | null
export const determineActivityKindByTipe = (activity: Partial<Workshop> | Partial<Chat> | Partial<Volunteer>): ActivityKind => {
    if ('asociated_skill' in activity) return 'workshop'
    else if ('level' in activity) return 'chat'
    else if ('kind_of_volunteer' in activity) return 'volunteer'
    else return null
}

export type ActivityPath = 'actividadesFormativas' | 'chats' | 'voluntariado' | null
export const getActivitySpanishPathByType = (activity: Partial<Workshop> | Partial<Chat> | Partial<Volunteer>): ActivityPath => {
    if ('asociated_skill' in activity) return 'actividadesFormativas'
    else if ('level' in activity) return 'chats'
    else if ('kind_of_volunteer' in activity) return 'voluntariado'
    else return null
}

export const getActivityUrl = (id: string, route: 'actividadesFormativas' | 'chats' | 'voluntariado' | null, kindOfUser: 'becario' | 'admin') => {
    const host = headers().get('host');
    const pageUrl = `https://${host}/${kindOfUser}/${route}/${id}`;

    return pageUrl;
};

export const getActivityStatusBasedOnItsType = (activity: Workshop | Chat | Volunteer) => {
    const kindOfActivity = determineActivityKindByTipe(activity);

    switch (kindOfActivity) {
        case 'volunteer':
            return (activity as Volunteer).status;
        case 'workshop':
            return (activity as Workshop).activity_status;
        case 'chat':
            return (activity as Chat).activity_status;
        default:
            throw new Error(`Unknown activity type: ${kindOfActivity}`);
    }
}


export const getEnrolledScholarsCount = (
    activity: (Workshop & {
        scholar_attendance: WorkshopAttendance[],
        speaker?: Speaker[]
    } |
        Chat & {
            scholar_attendance: ChatAttendance[],
            speaker?: Speaker[]
        })
) => {
    return activity.scholar_attendance.filter(
        (a) =>
            a.attendance === ScholarAttendance.ENROLLED ||
            a.attendance === ScholarAttendance.ATTENDED ||
            a.attendance === ScholarAttendance.NOT_ATTENDED ||
            a.attendance === ScholarAttendance.JUSTIFY
    ).length

}
export const getScholarEmailsByAttendanceStatus = (scholarAttendance: ChatAttendance[] | WorkshopAttendance[]) => {

    const attendedScholarEmails: string[] = []
    const notAttendedScholarEmails: string[] = []
    const enrolledScholarEmails: string[] = []
    const cancelledScholarEmais: string[] = [];
    const justifiedScholarEmails: string[] = [];
    const allEmails: string[] = []

    scholarAttendance.forEach((attendance) => {
        if (attendance.attendance === 'ATTENDED') attendedScholarEmails.push(attendance.scholar.scholar.email)
        else if (attendance.attendance === 'NOT_ATTENDED') notAttendedScholarEmails.push(attendance.scholar.scholar.email)
        else if (attendance.attendance === 'ENROLLED') enrolledScholarEmails.push(attendance.scholar.scholar.email)
        else if (attendance.attendance === 'CANCELLED') cancelledScholarEmais.push(attendance.scholar.scholar.email)
        else if (attendance.attendance === 'JUSTIFY') justifiedScholarEmails.push(attendance.scholar.scholar.email)
        allEmails.push(attendance.scholar.scholar.email)
    })

    return {
        attendedScholarEmails,
        notAttendedScholarEmails,
        enrolledScholarEmails,
        cancelledScholarEmais,
        justifiedScholarEmails
    }
}
