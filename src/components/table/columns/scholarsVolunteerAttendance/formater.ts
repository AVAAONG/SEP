import { getBlobImage } from '@/lib/azure/azure';
import { Scholar, ScholarAttendance, VolunteerAttendance } from '@prisma/client';
import { IScholarVolunteerAtendance } from './columns';


export const formatScholarDataForVolunteerAttendanceTable = async (
    scholars: Scholar[],
    scholarAttendance: VolunteerAttendance[]
): Promise<IScholarVolunteerAtendance[]> => {
    const scholarDataPromises = scholars.map(async (scholar) => {
        const attendance = scholarAttendance.find(
            (a) => a.scholar.scholar.id === scholar.id
        );
        return {
            id: attendance.id,
            first_names: scholar.first_names,
            last_names: scholar.last_names,
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