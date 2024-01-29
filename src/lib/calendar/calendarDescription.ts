import { parseChatLevelFromDatabase, parseModalityFromDatabase, parseSkillFromDatabase } from '@/lib/utils2';
import { IChatCalendar, IWorkshopCalendar } from './d';

const createCalendarDescription = (activity: IChatCalendar | IWorkshopCalendar, meetingLink?: string,
  meetingId?: string,
  meetingPassword?: string) => {
  const {
    modality,
    platform,
    description,
    speakersData
  } = activity
  const speakersNames = speakersData.map(speaker => speaker.speakerName)

  let calendarCommonDescription = `<b>Modalidad:</b> ${parseModalityFromDatabase(modality)}
${speakersData.length === 1 ? `<b>Facilitador:</b> ${speakersNames[0]}` : `<b>Facilitadores:</b> ${speakersNames.join(', ')}`}
${modality === 'ONLINE' ? `<b>Plataforma:</b> ${platform}` : `<b>Lugar:</b> ${platform}`}
`
  if ('asociated_skill' in activity) {
    const {
      year,
      asociated_skill,
    } = activity
    calendarCommonDescription += `<b>Año del taller:</b> ${year.join(', ')}
    <b>Competencia Asociada:</b> ${parseSkillFromDatabase(asociated_skill)}
`
  } else if ('level' in activity) {
    const { level } = activity
    calendarCommonDescription += `<b>Nivel:</b> ${parseChatLevelFromDatabase(level)} 
`
  }
  if (modality === 'ONLINE') {
    calendarCommonDescription += `<b>Link de la reunion:</b> ${meetingLink}
<b>Id de la reunion:</b> ${meetingId}
${platform === 'ZOOM' ? `<b>Contraseña de la reunion:</b> ${meetingPassword}` : ''}
`
  }


  return calendarCommonDescription += `
${description}`;
}

export default createCalendarDescription;
