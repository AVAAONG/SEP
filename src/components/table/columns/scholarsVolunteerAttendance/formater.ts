import { getBlobImage } from '@/lib/azure/azure';
import { VolunteerAttendanceWithScholar } from '@/lib/db/types';
import { Scholar, ScholarAttendance } from '@prisma/client';
import { IScholarVolunteerAtendance } from './columns';


export const formatScholarDataForVolunteerAttendanceTable = async (
    scholars: Scholar[],
    scholarAttendance: VolunteerAttendanceWithScholar[]
): Promise<IScholarVolunteerAtendance[]> => {
    const scholarDataPromises = scholars.map(async (scholar) => {
        const attendance = scholarAttendance.find(
            (a) => a.scholar.scholar.id === scholar.id
        );
        return {
            id: scholar?.id,
            attendanceId: attendance!.id,
            names: scholar.first_names + ' ' + scholar.last_names,
            email: scholar.email,
            whatsAppNumber: scholar.whatsapp_number,
            attendance: attendance?.attendance as ScholarAttendance,
            asignedHours: attendance?.asigned_hours,
            photo: scholar.photo ? await getBlobImage(scholar.photo) : '',
        };
    });

    const scholarData = await Promise.all(scholarDataPromises);
    return scholarData;
};