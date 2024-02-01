import { ChatAttendance, Scholar, ScholarAttendance, WorkshopAttendance } from "@prisma/client";

export const formatScholarDataForAttendanceTable = (
    scholars: Scholar[],
    scholarAttendance: ChatAttendance[] | WorkshopAttendance[]
) => {
    return scholars.map((scholar) => {
        const attendance = scholarAttendance.find((a: ChatAttendance | WorkshopAttendance) => a.scholar.scholar.id === scholar.id);
        return {
            id: scholar.id,
            first_names: scholar.first_names,
            last_names: scholar.last_names,
            email: scholar.email,
            phone_number: scholar.cell_phone_Number,
            whatsAppNumber: scholar.whatsapp_number,
            dni: scholar.dni,
            gender: scholar.gender,
            attendance: attendance.attendance as ScholarAttendance,
        };
    });
};