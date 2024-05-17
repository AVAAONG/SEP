import { ChatsWithAllData } from "@/components/table/columns/chatsColumns";
import { WorkshopWithAllData } from "@/components/table/columns/workshopColumns";
import { ActivityKind } from "@/lib/activities/utils";
import { countScholarStatusesInActivity } from "@/lib/countScholarStatusInActivity";
import { VolunteerWithAllData } from "@/lib/db/types";
import { getSpeakersObjectForWidget } from "@/lib/utils";
import { parseChatLevelFromDatabase, parseModalityFromDatabase, parsePlatformFromDatabase, parseSkillFromDatabase, parseVolunteerProject, parseWorkshopYearFromDatabase } from "@/lib/utils2";
import { $Enums } from "@prisma/client";


export interface WorkshopEnrollePage {
  id: string;
  title: string;
  modality: string;
  platform: string;
  start_dates: Date[];
  end_dates: Date[];
  description: string | null;
  kindOfActivity: ActivityKind;
  eventId: string;
  availableSpots: number;
  enroledScholars: number;
  activityStatus: string;
  speakerNames: string[];
  speakerImages: (string | undefined)[];
  speakerIds: string[];
  speakerCompany: (string | null)[];
  speakerKind: ($Enums.KindOfSpeaker | null)[];
  year: string;
  skill: string;
}
export const formatWorkshopActivityForEnrollPage = (activity: WorkshopWithAllData): WorkshopEnrollePage => {
  const { id, title, start_dates, end_dates, description,
    modality, activity_status, platform, avalible_spots, calendar_ids, asociated_skill, year, scholar_attendance, kindOfWorkshop, speaker } = activity;
  const {
    enroledScholars,
  } = countScholarStatusesInActivity(scholar_attendance);

  const availableSpots = Math.max(avalible_spots - enroledScholars, 0);
  return {
    id,
    title,
    modality: parseModalityFromDatabase(modality),
    platform: parsePlatformFromDatabase(platform),
    start_dates,
    end_dates,
    description,
    kindOfActivity: 'workshop',
    eventId: calendar_ids[0],
    availableSpots,
    enroledScholars,
    activityStatus: activity_status,
    ...getSpeakersObjectForWidget(speaker),
    year: parseWorkshopYearFromDatabase(year),
    skill: parseSkillFromDatabase(asociated_skill)
  }

}

export interface ChatEnrollePage {
  id: string;
  title: string;
  modality: string;
  platform: string;
  start_dates: Date[];
  end_dates: Date[];
  description: string | null;
  kindOfActivity: ActivityKind;
  eventId: string;
  availableSpots: number;
  enroledScholars: number;
  activityStatus: string;
  speakerNames: string[];
  speakerImages: (string | undefined)[];
  speakerIds: string[];
  speakerCompany: (string | null)[];
  speakerKind: ($Enums.KindOfSpeaker | null)[];
  level: string;
}
export const formatChatActivityForEnrollPage = (activity: ChatsWithAllData): ChatEnrollePage => {
  const { id, title, start_dates, end_dates, description,
    modality, activity_status, platform, avalible_spots, calendar_ids, level, scholar_attendance, speaker } = activity;
  const {
    enroledScholars,
  } = countScholarStatusesInActivity(scholar_attendance);

  const availableSpots = Math.max(avalible_spots - enroledScholars, 0);
  return {
    id,
    title,
    modality: parseModalityFromDatabase(modality),
    platform: parsePlatformFromDatabase(platform),
    start_dates,
    end_dates,
    description,
    kindOfActivity: 'chat',
    level: parseChatLevelFromDatabase(level),
    eventId: calendar_ids[0],
    availableSpots,
    enroledScholars,
    activityStatus: activity_status,
    ...getSpeakersObjectForWidget(speaker),
  }

}
export interface VolunteerEnrollePage {
  id: string;
  title: string;
  modality: string;
  platform: string;
  start_dates: Date[];
  end_dates: Date[];
  description: string | null;
  kindOfActivity: ActivityKind;
  eventId: string;
  availableSpots: number;
  enroledScholars: number;
  activityStatus: string;
  project: "UMAA" | "OAL" | "ALV" | "UVPL" | "GA" | "Oficina" | "Chat clubs" | "Externo" | "Comité de becarios" | "Otro" | null | undefined;
  beneficiary: string;
  kind_of_volunteer: string;
  supervisor: string | null;

}
export const formatVolunteerActivityForEnrollPage = (activity: VolunteerWithAllData): VolunteerEnrollePage => {
  const { id, title, start_dates, end_dates, description,
    modality, platform, avalible_spots, calendar_ids, VolunteerProject, beneficiary, status, kind_of_volunteer, supervisor, volunteer_attendance } = activity;
  const {
    enroledScholars,
  } = countScholarStatusesInActivity(volunteer_attendance);

  const availableSpots = Math.max(avalible_spots - enroledScholars, 0);
  return {
    id,
    title,
    modality: parseModalityFromDatabase(modality),
    platform: parsePlatformFromDatabase(platform),
    start_dates,
    end_dates,
    description,
    activityStatus: status,
    kindOfActivity: 'volunteer',
    eventId: calendar_ids[0],
    availableSpots,
    enroledScholars,
    project: parseVolunteerProject(VolunteerProject),
    beneficiary,
    kind_of_volunteer,
    supervisor
  }

}