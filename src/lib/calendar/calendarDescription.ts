import { parseModalityFromDatabase, parseSkillFromDatabase } from '@/lib/utils2';
import { IChatCalendar, IWorkshopCalendar } from './d';

export const createWorkshopCalendarDescription = (workshop: IWorkshopCalendar,
  meetingLink?: string,
  meetingId?: string,
  meetingPassword?: string
): string => {
  const {
    modality,
    year,
    platform,
    asociated_skill,
    description,
    speakersNames
  } = workshop
  const calendarDescription = `<b>Modalidad:</b> ${parseModalityFromDatabase(modality)}
<b>Año del taller:</b> ${year.join(', ')}
${speakersNames.length === 1 ? `<b>Facilitador:</b> ${speakersNames[0]}` : `<b>Facilitadores:</b> ${speakersNames.join(', ')}`}
${modality === 'ONLINE' ? `<b>Plataforma:</b> ${platform}` : `<b>Lugar:</b> ${platform}`}
<b>Competencia Asociada:</b> ${parseSkillFromDatabase(asociated_skill)}
${meetingLink ? `<b>Link de la reunion:</b> ${meetingLink}` : null}
${meetingId ? `<b>Id de la reunion:</b> ${meetingId}` : null}
${meetingPassword ? `<b>Contraseña de la reunion:</b> ${meetingPassword}` : null}}

${description ? description : null}
`
  return calendarDescription;
}

export const createChatCalendarDescription = (chat: IChatCalendar): string => {
  const {
    level,
    speakersNames,
    modality,
    platform,
    description } = chat
  let calendarDescription = `<b>Nivel:</b> ${level} 
${speakersNames.length === 1 ? `<b>Facilitador:</b> ${speakersNames[0]}` : `<b>Facilitadores:</b> ${speakersNames.join(', ')}`}
<b>Modalidad:</b> ${parseModalityFromDatabase(modality)}
${modality === 'ONLINE'
      ? `<b>Plataforma:</b> ${platform}`
      : `<b>Lugar:</b> ${platform}`
    }
  
${description ? description : null}
`
  return calendarDescription;
};
