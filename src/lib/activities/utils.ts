import { Chat, ChatAttendance, Volunteer, Workshop, WorkshopAttendance } from "@prisma/client";

export const determineActivityKindByTipe = (activity: Partial<Workshop> | Partial<Chat> | Partial<Volunteer>) => {
    if ('asociated_skill' in activity) return 'workshop'
    else if ('level' in activity) return 'chat'
    else if ('kind_of_volunteer' in activity) return 'volunteer'
    else return 'unknown'
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
