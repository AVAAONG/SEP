'use server';

import { ChatsWithAllData } from "@/components/table/columns/chatsColumns";
import { WorkshopWithAllData } from "@/components/table/columns/workshopColumns";
import { Chat, Volunteer, Workshop } from "@prisma/client";
import { VolunteerWithAllData } from "../db/types";
import { parseChatLevelFromDatabase, parseModalityFromDatabase, parseSkillFromDatabase, parseWorkshopKindFromDatabase, parseWorkshopYearFromDatabase } from "../utils2";

const countActivityByModality = (attendedActivities: (Workshop | Chat | Volunteer)[]) => {
    return attendedActivities.reduce(
        (acc: { inPersonActivities: number; onlineActivities: number, hibridActivities: number }, activity: Workshop | Chat | Volunteer) => {
            if (activity.modality === 'IN_PERSON') acc.inPersonActivities++;
            else if (activity.modality === 'ONLINE') acc.onlineActivities++;
            else if (activity.modality === 'HYBRID') acc.hibridActivities++;
            else null;

            return acc;
        },
        { inPersonActivities: 0, onlineActivities: 0, hibridActivities: 0 }
    );
};

const getAttendedActivities = (activities: WorkshopWithAllData[]) => {
    return activities.filter((activity) => {
        return activity.scholar_attendance[0]?.attendance === 'ATTENDED';
    });
};

const getAttendedChats = (chats: ChatsWithAllData[], scholarId: string) => {
    return chats.filter((chat) => {
        return chat.scholar_attendance[0]?.attendance === 'ATTENDED' || chat.speaker.some((speaker) => speaker.id === scholarId);
    });
}

const getApprovedAndAttendedVolunteers = (volunteers: VolunteerWithAllData[]) => {
    let externalVolunteerHours: number = 0,
        internalVolunteerHours: number = 0,
        totalVolunteerHours: number = 0;
    volunteers.forEach(volunteer => {
        const volunteerAttendance = volunteer.volunteer_attendance;
        if (volunteer.status === 'APPROVED' && volunteerAttendance[0].attendance === 'ATTENDED') {
            if (volunteer.kind_of_volunteer === 'INTERNAL') internalVolunteerHours += volunteerAttendance[0].asigned_hours;
            else externalVolunteerHours += volunteerAttendance[0].asigned_hours;
            totalVolunteerHours += volunteerAttendance[0].asigned_hours;
        }
    })
    return { externalVolunteerHours, internalVolunteerHours, totalVolunteerHours };
}


type Count = {
    label: string;
    value: number;
};

const countWorkshopProperties2 = (workshops: WorkshopWithAllData[]): {
    skills: Count[];
    years: Count[];
    kinds: Count[];
    modality: Count[];
} => {
    const counts: Record<string, Record<string, number>> = {
        skills: {},
        years: {},
        kinds: {},
        modality: {},
    };

    workshops.forEach(workshop => {
        const workshopSkill = parseSkillFromDatabase(workshop.asociated_skill);
        const workshopYear = workshop.year.length > 4 ? 'Todos' : workshop.year.toString()
        const workshopKind = parseWorkshopKindFromDatabase(workshop.kindOfWorkshop)
        const workshopModality = parseModalityFromDatabase(workshop.modality)

        counts.skills[workshopSkill] = (counts.skills[workshopSkill] || 0) + 1;
        counts.years[workshopYear] = (counts.years[workshopYear] || 0) + 1;
        counts.kinds[workshopKind] = (counts.kinds[workshopKind] || 0) + 1;
        counts.modality[workshopModality] = (counts.modality[workshopModality] || 0) + 1;
    });

    const result: { skills: Count[]; years: Count[]; kinds: Count[], modality: Count[] } = {
        skills: [],
        years: [],
        kinds: [],
        modality: [],
    };

    for (const key in counts) {
        result[key as 'skills' | 'years' | 'kinds' | 'modality'] = Object.entries(counts[key]).map(([label, value]) => ({
            label,
            value: Number(value),
        }));
    }

    return result;
};

const countWorkshopProperties = (workshops: WorkshopWithAllData[]) => {
    const counts = {
        skills: {} as Record<string, number>,
        years: {} as Record<string, number>,
        kinds: {} as Record<string, number>,
        modality: {} as Record<"Presencial" | "Virtual" | "Hibrida", number>,
    };

    workshops.forEach(workshop => {
        const workshopSkill = parseSkillFromDatabase(workshop.asociated_skill);
        const workshopYear = parseWorkshopYearFromDatabase(workshop.year);
        const workshopKind = parseWorkshopKindFromDatabase(workshop.kindOfWorkshop)
        const workshopModality = parseModalityFromDatabase(workshop.modality)

        counts.skills[workshopSkill] = (counts.skills[workshopSkill] || 0) + 1;
        counts.years[workshopYear] = (counts.years[workshopYear] || 0) + 1;
        counts.kinds[workshopKind] = (counts.kinds[workshopKind] || 0) + 1;
        counts.modality[workshopModality] = (counts.modality[workshopModality] || 0) + 1;
    });
    return counts;
}

const formatCountsForCharts = (counts: Record<string, Record<string, number>>): { skills: Count[]; years: Count[]; kinds: Count[]; modality: Count[] } => {
    const result: { skills: Count[]; years: Count[]; kinds: Count[]; modality: Count[] } = {
        skills: [],
        years: [],
        kinds: [],
        modality: [],
    };

    for (const key in counts) {
        result[key as 'skills' | 'years' | 'kinds' | 'modality'] = Object.entries(counts[key]).map(([label, value]) => ({
            label,
            value: Number(value),
        }));
    }

    return result;
};

const countChatProperties = (chats: ChatsWithAllData[]): {
    level: Count[];
    modality: Count[];

} => {
    const counts: Record<string, Record<string, number>> = {
        level: {},
        modality: {},
    };

    chats.forEach(chat => {
        const chatLevel = parseChatLevelFromDatabase(chat.level);
        const chatModality = parseModalityFromDatabase(chat.modality)
        counts.level[chatLevel] = (counts.level[chatLevel] || 0) + 1;
        counts.modality[chatModality] = (counts.modality[chatModality] || 0) + 1;
    });

    const result: { level: Count[]; modality: Count[] } = {
        level: [],
        modality: [],
    };

    for (const key in counts) {
        result[key as 'level' | 'modality'] = Object.entries(counts[key]).map(([label, value]) => ({
            label,
            value: Number(value),
        }));
    }

    return result;
};

const categorizeActivityByStatus = (activities: WorkshopWithAllData[] | ChatsWithAllData[]) => {
    const categorizedActivities: Record<string, WorkshopWithAllData[] | ChatsWithAllData[]> = {
        suspended: [],
        done: [],
        schedule: [],
        sent: [],
    };

    activities.forEach(activity => {
        if (activity.activity_status in categorizedActivities) {
            categorizedActivities[activity.activity_status].push(activity);
        }
    });

    return categorizedActivities;
};

export {
    countActivityByModality,
    getAttendedActivities,
    getApprovedAndAttendedVolunteers,
    getAttendedChats,
    categorizeActivityByStatus,
    formatCountsForCharts,
    countWorkshopProperties,
    countChatProperties
};

