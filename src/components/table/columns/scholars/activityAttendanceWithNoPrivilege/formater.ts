import { getBlobImage } from '@/lib/azure/azure';
import { Prisma, Scholar, ScholarAttendance, } from '@prisma/client';
import { IScholarAttendanceInfoNoPriv } from './columns';

export type IChatAttendance = Prisma.ChatAttendanceGetPayload<{
    include: {
        ChatSafisfactionForm: true;
        scholar: {
            include: {
                scholar: true
            }
        }
    }
}>;

export type IWorkshopAttendance = Prisma.WorkshopAttendanceGetPayload<{
    include: {
        satisfaction_form: true;
        scholar: {
            include: {
                scholar: true
            }
        }
    }
}>;

const createAttendanceMap = (scholarAttendance: IChatAttendance[] | IWorkshopAttendance[]) => {
    const attendanceMap = new Map<string, ScholarAttendance>();
    scholarAttendance.forEach((a: IChatAttendance | IWorkshopAttendance) => {
        attendanceMap.set(a.scholar.scholar.id, a.attendance);
    });
    return attendanceMap;
};

const formatScholarData = async (scholar: Scholar, attendanceMap: Map<string, ScholarAttendance>) => {
    const attendance = attendanceMap.get(scholar.id);
    return {
        id: scholar.id,
        first_names: scholar.first_names,
        last_names: scholar.last_names,
        email: scholar.email,
        whatsAppNumber: scholar.whatsapp_number,
        attendance: attendance as ScholarAttendance,
        photo: scholar.photo ? await getBlobImage(scholar.photo) : '',
    };
};

export const formatScholarDataForScholarAttendanceInfoNoPrivTable = async (
    scholars: Scholar[],
    scholarAttendance: IChatAttendance[] | IWorkshopAttendance[]
): Promise<IScholarAttendanceInfoNoPriv[]> => {
    const attendanceMap = createAttendanceMap(scholarAttendance);
    const scholarDataPromises = scholars.map(scholar => formatScholarData(scholar, attendanceMap));
    const scholarData = await Promise.all(scholarDataPromises);
    return scholarData;
};