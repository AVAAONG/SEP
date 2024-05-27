import { Chat, KindOfSpeaker, Speaker, Volunteer, Workshop } from '@prisma/client';
import { determineActivityKindByTipe } from './activities/utils';

export const createArrayFromObject = (object: Record<string, number>) => {
  const array = Object.entries(object)
    .map(([label, value]) => ({
      label,
      value,
    }))
    .sort((a, b) => b.value - a.value);
  return array;
};

const getStatus = (activity: Workshop | Chat | Volunteer) => {
  const kindOfActivity = determineActivityKindByTipe(activity);

  switch (kindOfActivity) {
    case 'volunteer':
      return (activity as Volunteer).status;
    case 'workshop':
      return (activity as Workshop).activity_status;
    case 'chat':
      return (activity as Chat).activity_status;
    default:
      throw new Error(`Unknown activity type: ${kindOfActivity}`);
  }
}


export const reduceByProperty = <T extends Record<string, any>, D extends Record<string, any>>(
  valuesToReduce: T[],
  property1: keyof T,
  property2: keyof D
) => {
  const reducedValues = valuesToReduce.reduce(
    (acc, value) => {
      const filter = value[property1]?.[property2] ?? 'Unknown';
      acc[filter] = (acc[filter] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  return reducedValues;
};

export const getSpeakersObjectForWidget = (speakers: Speaker[]) => {
  const speakerNames: string[] = [];
  const speakerImages: (string | undefined)[] = [];
  const speakerIds: string[] = [];
  const speakerCompany: (string | null)[] = [];
  const speakerKind: (KindOfSpeaker | null)[] = [];
  speakers.forEach((speaker) => {
    speakerNames.push(`${speaker.first_names.split(' ')[0]} ${speaker.last_names.split(' ')[0]}`);
    speakerImages.push(speaker.image || undefined);
    speakerIds.push(speaker.id);
    speakerCompany.push(speaker.job_company);
    speakerKind.push(speaker.speaker_kind);
  });
  return {
    speakerNames,
    speakerImages,
    speakerIds,
    speakerCompany,
    speakerKind,
  };
}

