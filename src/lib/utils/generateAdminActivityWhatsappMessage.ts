import { ChatsWithAllData } from "@/components/table/columns/chatsColumns";
import { WorkshopWithAllData } from "@/components/table/columns/workshopColumns";
import { VolunteerWithAllData } from "../db/types";
import { parseModalityFromDatabase } from "../utils2";

const generateAdminActivityWhatsappMessage = (activity: WorkshopWithAllData | ChatsWithAllData | VolunteerWithAllData) => {
    return `*${activity.title}* 📚
    
📅 *Fechas de inicio*: ${activity.start_dates.map(startDate => new Date(startDate).toLocaleDateString('es-VE')).join(', ')} 
⏰ *Horas de inicio*: ${activity.start_dates.map(startDate => new Date(startDate).toLocaleTimeString('es-VE')).join(', ')} 
⏰ *Horas de cierre*: ${activity.end_dates.map(endDate => new Date(endDate).toLocaleTimeString('es-VE')).join(', ')} 
💁‍♀️ *Modalidad*: ${parseModalityFromDatabase(activity.modality)}
${activity.modality === 'IN_PERSON' ?
            `📍 *Ubicación*: ${activity.platform} ` :
            `🖥️ *Plataforma*: ${activity.platform} `
        }

*Cupos disponibles*`;
}

export default generateAdminActivityWhatsappMessage
