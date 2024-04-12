import { WorkshopAttendance } from "@prisma/client";

export const countScholarStatusesInActivity = (scholarActivityAtendance: WorkshopAttendance[]) => {
    const attendanceCounts = scholarActivityAtendance?.reduce(
        (counts, scholar_att) => {
            switch (scholar_att.attendance) {
                case 'ATTENDED':
                    counts.attendedScholarsCount++;
                    break;
                case 'NOT_ATTENDED':
                    counts.unAttendedScholarsCount++;
                    break;
                case 'CANCELLED':
                    counts.cancelledScholarsCount++;
                    break;
                case 'ENROLLED':
                    counts.enroledScholars++;
                    break;
                default:
                    break;
            }
            return counts;
        },
        {
            attendedScholarsCount: 0,
            unAttendedScholarsCount: 0,
            cancelledScholarsCount: 0,
            enroledScholars: 0,
        }
    );
    return attendanceCounts;
}
