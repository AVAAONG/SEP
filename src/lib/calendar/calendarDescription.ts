import { Chat, ChatLevel, KindOfChat } from "@/types/Chat"
import { KindOfActivity, Platform, activityMode } from "@/types/General"
import { AsociatedProject } from "@/types/Volunteer"
import { Pensum } from "@/types/Workshop"

/**
 * Creates the description for a workshop event 
 * 
 * @param pensum 
 * @param activityMode 
 * @param platform 
 * @param description 
 * @param meetingLink 
 * @param meetingId 
 * @param meetingPassword 
 * @returns The desciption of the workshop event
 */
export const createWorkshopCalendarDescription = (
    pensum: Pensum,
    speaker: string,
    activityMode: activityMode,
    platform: Platform,
    description: string,
    avaaYear: string[],
    meetingLink?: string,
    meetingId?: string,
    meetingPassword?: string,

) => {
    let workshopCalendarDescription = ''

    const defaultCalendarDescription = `<b>Modalidad:</b> ${activityMode}
<b>Año del taller:</b> ${avaaYear.join(", ")}
<b>Facilitador:</b> ${speaker}
${activityMode.toLowerCase().trim() === "virtual" ? `<b>Plataforma:</b> ${platform}` : `<b>Lugar:</b> ${platform}`}
<b>Competencia Asociada:</b> ${pensum}
`
    switch (activityMode.toLowerCase().trim()) {
        case "presencial":
            workshopCalendarDescription = `${defaultCalendarDescription}

${description}`
            break

        case "virtual":
            workshopCalendarDescription = `${defaultCalendarDescription}
<b>Link de la reunion:</b> ${meetingLink}
<b>Id de la reunion:</b> ${meetingId}
${platform === 'zoom' ? `<b>Contraseña de la reunion:</b> ${meetingPassword}` : ''}

${description}`
            break
        case "asincrona":
            workshopCalendarDescription = `${defaultCalendarDescription}
<b>Link de Padlet:</b> ${meetingLink} 

Recuerda que: <b>a partir de la fecha del taller, solo tienes 3 dias para completar los contenidos del mismo.</b>

${description}`
            break;
    }
    return workshopCalendarDescription;
}


/**
 * Creates the description for the chat event
 *
 * @returns a string with all the information about the event
 */
export const createChatCalendarDescription = (level: ChatLevel, speaker: string, kindOfChat: KindOfChat, platform: Platform, description: string) => {
    let calendarDescription = `<b>Nivel:</b> ${level} 
  <b>Facilitador:</b> ${speaker} 
  <b>Modalidad:</b> ${kindOfChat}
  ${kindOfChat.toLowerCase().trim() === "virtual" ? `<b>Plataforma:</b> ${platform}` : `<b>Lugar:</b> ${platform}`}
  
  ${description}`

    return calendarDescription;
};