import { Workshop } from '@/types/Workshop';
import { addDays } from './calendar/calendar';


export const createFormDescription = (workshop: Workshop) => {
  const { title, pensum, date, startHour, endHour, speaker, modality, platform, description } =
    workshop;
  const formDescription = `Taller: ${title}
Competencia Asociada: ${pensum}
${
  platform === 'padlet'
    ? `Fecha: De ${new Date(date).toLocaleDateString()} hasta ${new Date(
        addDays(new Date(date), 3)
      ).toLocaleDateString()}`
    : `Fecha: ${date}`
}
${platform === 'padlet' ? `` : `Horario: de ${startHour} hasta las ${endHour}`}
Facilitador: ${splitSpeakerValues(speaker).speakerName}
Modalidad: ${modality}
${modality === 'presencial' ? `Lugar: ${platform}` : `Plataforma: ${platform}`}
${description === ' ' ? '' : `\n ${description}`}`;
  return formDescription;
};

const splitSpeakerValues = (value: string) => {
  const speakerValues = value.split('+/+');
  const speakerId = speakerValues[0];
  const speakerName = speakerValues[1];
  const speakerEmail = speakerValues[2];
  return { speakerId, speakerName, speakerEmail };
};
