import { parseModalityFromDatabase } from "@/lib/utils2";
import { ActivityStatus, ScholarAttendance } from "@prisma/client";
import { ChatsWithAllData } from "../table/columns/chatsColumns";
import { WorkshopWithAllData } from "../table/columns/workshopColumns";

const isDisabled = (attendance: ScholarAttendance, startDate: string, activityStatus: ActivityStatus) => {
    if (attendance !== 'ENROLLED') return true; // only allows to cancel if the scholar is enrolled
    else if (new Date(startDate) <= new Date()) return true; // only allows to cancel if the activity has not started yet
    else if (activityStatus !== 'SENT') return true; // only allows to cancel if the activity have status 'SENT'
    else return false;
};

export default isDisabled;

export function generateWhatsAppMessage(activity: WorkshopWithAllData | ChatsWithAllData) {
    return `Cedo cupo: _${activity.title}_ 📚

📅 *Fechas de inicio*: ${activity.start_dates.map(startDate => new Date(startDate).toLocaleDateString('es-ES')).join(', ')} 
⏰ *Hora de inicio*: ${new Date(activity.start_dates[0]).toLocaleTimeString('es-VE')} 
💁‍♀️ *Modalidad*: ${parseModalityFromDatabase(activity.modality)}
${activity.modality === 'IN_PERSON' ?
            `📍 *Ubicación*: ${activity.platform} ` :
            `🖥️ *Plataforma*: ${activity.platform} `
        }
    `;
}