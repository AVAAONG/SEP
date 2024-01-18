import { parseModalityFromDatabase, parseSkillFromDatabase } from '@/lib/utils2';
import { IChatCalendar, IWorkshopCalendar } from './d';

const createWorkshopCalendarDescription = (workshop: IWorkshopCalendar,
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
    speakersData
  } = workshop
  const speakersNames = speakersData.map(speaker => speaker.speakerName)
  const calendarDescription = `<b>Modalidad:</b> ${parseModalityFromDatabase(modality)}
<b>Año del taller:</b> ${year.join(', ')}
${speakersData.length === 1 ? `<b>Facilitador:</b> ${speakersNames[0]}` : `<b>Facilitadores:</b> ${speakersNames.join(', ')}`}
${modality === 'ONLINE' ? `<b>Plataforma:</b> ${platform}` : `<b>Lugar:</b> ${platform}`}
<b>Competencia Asociada:</b> ${parseSkillFromDatabase(asociated_skill)}
${meetingLink ? `<b>Link de la reunion:</b> ${meetingLink}` : null}
${meetingId ? `<b>Id de la reunion:</b> ${meetingId}` : null}
${meetingPassword ? `<b>Contraseña de la reunion:</b> ${meetingPassword}` : null}}

${description ? description : null}
`
  return calendarDescription;
}

const createChatCalendarDescription = (chat: IChatCalendar,
  meetingLink?: string,
  meetingId?: string,
  meetingPassword?: string): string => {
  const {
    level,
    speakersData,
    modality,
    platform,
    description } = chat
  const speakersNames = speakersData.map(speaker => speaker.speakerName)

  let calendarDescription = `<b>Nivel:</b> ${level} 
${speakersData.length === 1 ? `<b>Facilitador:</b> ${speakersNames[0]}` : `<b>Facilitadores:</b> ${speakersNames.join(', ')}`}
<b>Modalidad:</b> ${parseModalityFromDatabase(modality)}
${modality === 'ONLINE'
      ? `<b>Plataforma:</b> ${platform}`
      : `<b>Lugar:</b> ${platform}`
    }
    ${meetingLink ? `<b>Link de la reunion:</b> ${meetingLink}` : null}
    ${meetingId ? `<b>Id de la reunion:</b> ${meetingId}` : null}
    ${meetingPassword ? `<b>Contraseña de la reunion:</b> ${meetingPassword}` : null}}
    
    ${description ? description : null}
    `
  return calendarDescription;
};

const createCalendarDescription = (activity: IChatCalendar | IWorkshopCalendar, meetingLink?: string,
  meetingId?: string,
  meetingPassword?: string) => {
  if ('asociated_skill' in activity) return createWorkshopCalendarDescription(activity, meetingLink, meetingId, meetingPassword)
  else if ('level' in activity) return createChatCalendarDescription(activity, meetingLink, meetingId, meetingPassword)
  else return ''
}

export default createCalendarDescription;