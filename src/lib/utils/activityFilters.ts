'use server';

import { WorkshopWithAllData } from "@/components/table/columns/workshopColumns";
import { Chat, Volunteer, Workshop } from "@prisma/client";
import { parseModalityFromDatabase, parseSkillFromDatabase, parseWorkshopKindFromDatabase } from "../utils2";

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

const getAttendedActivities = (activities: (Workshop | Chat | Volunteer)[]) => {
    return activities.filter((activity) => {
        return activity.scholar_attendance[0]?.attendance === 'ATTENDED';
    });
};

type Count = {
    label: string;
    value: number;
};

const countWorkshopProperties = (workshops: WorkshopWithAllData[]): {
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
        const workshopYear = workshop.year.toString();
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

export {
    countActivityByModality,
    getAttendedActivities,
    countWorkshopProperties

};

