import { parseModalityFromDatabase, parseSkillFromDatabase } from '@/lib/utils2';
import { Platform } from '@/types/General';
import { Level, Modality, Skill, WorkshopYear } from '@prisma/client';

export const createWorkshopCalendarDescription = (
  asociatedSkill: Skill,
  speakerName: string,
  modality: Modality,
  platform: Platform,
  description: string,
  avaaYear: WorkshopYear[],
  meetingLink?: string,
  meetingId?: string,
  meetingPassword?: string
) => {
  const calendarDescription = `<b>Modalidad:</b> ${parseModalityFromDatabase(modality)}
<b>Año del taller:</b> ${avaaYear.join(', ')}
<b>Facilitador:</b> ${speakerName}
${modality === 'ONLINE' ? `<b>Plataforma:</b> ${platform}` : `<b>Lugar:</b> ${platform}`}
<b>Competencia Asociada:</b> ${parseSkillFromDatabase(asociatedSkill)}
${meetingLink ? `<b>Link de la reunion:</b> ${meetingLink}` : undefined}
${meetingId ? `<b>Id de la reunion:</b> ${meetingId}` : undefined}
${meetingPassword ? `<b>Contraseña de la reunion:</b> ${meetingPassword}` : undefined}}

${description}`;
  return calendarDescription;
}

export const createChatCalendarDescription = (
  level: Level,
  speakerName: string,
  modality: Modality,
  platform: Platform,
  description: string
) => {
  let calendarDescription = `<b>Nivel:</b> ${level} 
  <b>Facilitador:</b> ${speakerName} 
  <b>Modalidad:</b> ${parseModalityFromDatabase(modality)}
  ${modality === 'ONLINE'
      ? `<b>Plataforma:</b> ${platform}`
      : `<b>Lugar:</b> ${platform}`
    }
  
  ${description}`;

  return calendarDescription;
};
