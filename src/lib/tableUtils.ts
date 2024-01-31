import { ChatAttendance, Scholar } from "@prisma/client";

export const formatScholarDataForAttendanceTable = (
    scholars: Scholar[],
    scholarAttendance: ChatAttendance[]
) => {
    return scholars.map((scholar) => {
        const attendance = scholarAttendance.find((a) => a.scholar.scholar.id === scholar.id);
        return {
            id: scholar.id,
            first_names: scholar.first_names,
            last_names: scholar.last_names,
            email: scholar.email,
            phone_number: scholar.cell_phone_Number,
            whatsAppNumber: scholar.whatsapp_number,
            collage: 'Ejemplo',
            dni: scholar.dni,
            gender: scholar.gender,
            attendance: attendance?.attendance,
        };
    });
};