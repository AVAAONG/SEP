'use server';

import { COLOR_BASED_ON_PERCENTAGE, getColorBasedOnPercentage, parseSatisfactionFormResponsesFromDatabase } from "@/components/activityActions/satisfactionForm/utils";
import { ChatsWithAllData } from "@/components/table/columns/chatsColumns";
import { WorkshopWithAllData } from "@/components/table/columns/workshopColumns";
import { ActivityStatus, Chat, Volunteer, VolunteerStatus, Workshop, WorkshopSafisfactionForm } from "@prisma/client";
import { VolunteerWithAllData } from "../db/types";
import { parseChatLevelFromDatabase, parseKindOfVolunteerFromDatabase, parseModalityFromDatabase, parseSkillFromDatabase, parseVolunteerProject, parseWorkshopKindFromDatabase, parseWorkshopYearFromDatabase } from "../utils2";

const countActivityByModality = async (attendedActivities: (Workshop | Chat | Volunteer)[]) => {
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



type Count = {
    label: string;
    value: number;
};

const countWorkshopProperties = async (workshops: WorkshopWithAllData[]) => {
    const counts = {
        skills: {} as Record<"Ejercicio ciudadano" | "Emprendimiento" | "Gerencia de sí mismo" | "Liderazgo" | "TIC", number>,
        years: {} as Record<string, number>,
        kinds: {} as Record<"Taller" | "Cine foro" | "Foro" | "Webinar" | "Charla" | "Conversatorio" | "sin definir", number>,
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


const formatCountsForCharts = async  <T extends string>(counts: Record<T, Record<string, number>>): Promise<{ [K in T]: Count[] }> => {
    const result: { [K in T]: Count[] } = {} as any; // Temporary fix for typing
    for (const key in counts) {
        result[key] = Object.entries(counts[key]).map(([label, value]) => ({
            label,
            value: Number(value),
        }));
    }

    return result;
};

export const formatCountsForChartsActivityExpe = async <T extends string>(counts: Record<T, Record<string, number>>): Promise<{ [K in T]: Count[] }> => {
    const result: { [K in T]: Count[] } = {} as any; // Temporary fix for typing

    for (const key in counts) {
        result[key] = Object.entries(counts[key]).map(([label, value]) => ({
            label,
            value: Number(value),
            color: getColorBasedOnPercentage(label as keyof typeof COLOR_BASED_ON_PERCENTAGE),
        }));
    }

    return result;
};


const countChatProperties = async (chats: ChatsWithAllData[]) => {
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

    return counts;
};

const categorizeActivityByStatus = async (activities: WorkshopWithAllData[] | ChatsWithAllData[]) => {
    const categorizedActivities: Record<ActivityStatus, WorkshopWithAllData[] | ChatsWithAllData[]> = {
        SUSPENDED: [],
        ATTENDANCE_CHECKED: [],
        SCHEDULED: [],
        SENT: [],
    };

    activities.forEach(activity => {
        if (activity.activity_status in categorizedActivities) {
            categorizedActivities[activity.activity_status].push(activity);
        }
    });

    return categorizedActivities;
};

const createAdminStatsForActivities = async (activitiesByStatus: Record<ActivityStatus, WorkshopWithAllData[] | ChatsWithAllData[]>, totalAmountOfActivities: number, kindOfActivity: 'workshop' | 'chat') => {

    const mainText = kindOfActivity === 'workshop' ? 'Actividades formativas' : 'Chats clubs';
    const gender = kindOfActivity === 'workshop' ? 'a' : 'o';
    const doneWorkshopsPercentage = Number(
        ((activitiesByStatus.ATTENDANCE_CHECKED.length / totalAmountOfActivities) * 100).toFixed(0)
    );
    const suspendedWorkshopsPercentage = Number(
        ((activitiesByStatus.SUSPENDED.length / totalAmountOfActivities) * 100).toFixed(0)
    );

    const stats = [
        {
            name: `${mainText} ofertad${gender}s`,
            stat: totalAmountOfActivities || 0,
            changeType: 'decrease',
            comparationText: null,
            tooltipText: null,
        },
        {
            name: `${mainText} realizad${gender}s`,
            stat: activitiesByStatus.ATTENDANCE_CHECKED.length || 0,
            changeType: 'increase',
            comparationText: `De ${totalAmountOfActivities || 0} actividades ofertad${gender}s`,
            comparation: doneWorkshopsPercentage,
            tooltipText: `${doneWorkshopsPercentage}% de las actividades fueron realizad${gender}s`,
        },
        {
            name: `${mainText} suspendid${gender}s`,
            stat: activitiesByStatus.SUSPENDED.length || 0,
            changeType: 'increase',
            comparationText: `De ${totalAmountOfActivities || 0} actividades ofertad${gender}s`,
            comparation: suspendedWorkshopsPercentage,
            tooltipText: `${suspendedWorkshopsPercentage}% de las actividades fueron cancelad${gender}s`,
        },
        {
            name: `${mainText} agendadas`,
            stat: activitiesByStatus.SCHEDULED.length + activitiesByStatus.SENT.length || 0,
            changeType: 'increase',
            comparationText: null,
        },
    ];
    return stats
}

const countActivityAttendancePerMonth = async (workshops: WorkshopWithAllData[]) => {
    const stats: {
        activitiesByMonth: Record<number, number>;
        workshopsWithHighAttendancePerMonth: Record<string, number>;
    } = {
        activitiesByMonth: {},
        workshopsWithHighAttendancePerMonth: {},
    };

    workshops.forEach((workshop) => {
        if (workshop.activity_status === 'SUSPENDED' || workshop.activity_status === 'SCHEDULED' || workshop.activity_status === 'SENT') return;
        const date = new Date(workshop.start_dates[0]);
        const month = date.getMonth();
        // Calculate activitiesByMonth
        stats.activitiesByMonth[month] = (stats.activitiesByMonth[month] || 0) + 1;
        // Calculate workshopsWithHighAttendancePerMonth
        const totalScholars = workshop.scholar_attendance?.filter((a) => (a.attendance === 'ENROLLED' || 'ATTENDED' || 'NOT_ATTENDED' || 'JUSTIFY') || 0).length;
        const attendedScholars =
            workshop.scholar_attendance?.filter((a) => a.attendance === 'ATTENDED').length || 0;
        const attendancePercentage = (attendedScholars / totalScholars) * 100;
        if (attendancePercentage >= 60) {
            stats.workshopsWithHighAttendancePerMonth[month.toString()] =
                (stats.workshopsWithHighAttendancePerMonth[month.toString()] || 0) + 1;
        }

    });


    return stats;
};

const formatActivityAttendancePerMonthForChart = async (stats: {
    activitiesByMonth: Record<number, number>;
    workshopsWithHighAttendancePerMonth: Record<string, number>;
}) => {

    for (let month = 0; month < 12; month++) {
        if (!(month in stats.activitiesByMonth)) {
            stats.activitiesByMonth[month] = 0;
            stats.workshopsWithHighAttendancePerMonth[month.toString()] = 0;
        }
    }
    const lineSeries = {
        data: Object.entries(stats.workshopsWithHighAttendancePerMonth).map(([month, count]) => ({
            x: new Date(0, Number(month)).toLocaleString('es-ES', { month: 'long' }),
            y: count,
        })),
        name: 'Actividades  con alta asistencia',
        color: '#eab308',
        type: 'line',
    };
    const barSeries = {
        data: Object.entries(stats.activitiesByMonth).map(([month, count]) => ({
            x: new Date(0, Number(month)).toLocaleString('es-ES', { month: 'long' }),
            y: count,
        })),
        name: 'Actividades realizadas',
        color: '#23a217',
        type: 'bar',
    }
    return { lineSeries, barSeries };
}

const getActivityAttendancePerMonth = async (workshops: WorkshopWithAllData[]) => {
    const stats = await countActivityAttendancePerMonth(workshops);
    const chartSeries = await formatActivityAttendancePerMonthForChart(stats);
    return chartSeries;
}



const countActivitySatisfactionForm = async (form: WorkshopSafisfactionForm[]) => {
    const counts = {
        activity_organization: {},
        activity_number_of_participants: {},
        activity_lenght: {},
        activity_relevance_for_scholar: {},
        speaker_theory_practice_mix: {},
        speaker_knowledge_of_activity: {},
        speaker_foment_scholar_to_participate: {},
        speaker_knowledge_transmition: {},
        content_match_necesities: {},
        content_knowledge_adquisition: {},
        content_knowledge_expansion: {},
        content_personal_development: {},
        general_satisfaction: {}
    };

    form.forEach(workshop => {
        Object.keys(counts).forEach(key => {
            const value = parseSatisfactionFormResponsesFromDatabase(workshop[key]);
            counts[key][value] = (counts[key][value] || 0) + 1;
        });
    });

    return counts;
}


const countVolunteerProperties = async (volunteers: VolunteerWithAllData[]) => {
    const counts = {
        kindOfVolunteer: {} as Record<string, number>,
        modality: {} as Record<string, number>,
        asociatedProject: {} as Record<string, number>,
    };

    volunteers.forEach(volunteer => {
        const volunteerKind = parseKindOfVolunteerFromDatabase(volunteer.kind_of_volunteer);
        const volunteerModality = parseModalityFromDatabase(volunteer.modality)
        const volunteerAsociatedProject = parseVolunteerProject(volunteer.VolunteerProject)
        const volunteerHours = Number((volunteer.volunteer_attendance.reduce((acc, attendance) => {
            return acc + attendance.asigned_hours;
        }, 0) / volunteer.volunteer_attendance.length).toFixed(2));
        counts.kindOfVolunteer[volunteerKind] = (counts.kindOfVolunteer[volunteerKind] || 0) + volunteerHours;
        counts.modality[volunteerModality] = (counts.modality[volunteerModality] || 0) + volunteerHours;
        counts.asociatedProject[volunteerAsociatedProject] = (counts.asociatedProject[volunteerAsociatedProject] || 0) + volunteerHours;
    });

    return counts;
};


const createAdminStatsForVolunteers = async (activitiesByStatus: Record<VolunteerStatus, Volunteer[]>, totalAmountOfActivities: number,) => {

    const doneVolunteerPercentage = Number(
        ((activitiesByStatus.APPROVED.length / totalAmountOfActivities) * 100).toFixed(0)
    );
    const suspendedWorkshopsPercentage = Number(
        ((activitiesByStatus.REJECTED.length / totalAmountOfActivities) * 100).toFixed(0)
    );

    const stats = [
        {
            name: `Horas de voluntariado realizadas`,
            stat: activitiesByStatus.APPROVED.length || 0,
            changeType: 'increase',
            comparationText: null,
            comparation: doneVolunteerPercentage,
            tooltipText: `${doneVolunteerPercentage}% de las actividades fueron realizad${gender}s`,
        },
        {
            name: `${mainText} suspendid${gender}s`,
            stat: activitiesByStatus.SUSPENDED.length || 0,
            changeType: 'increase',
            comparationText: `De ${totalAmountOfActivities || 0} actividades ofertad${gender}s`,
            comparation: suspendedWorkshopsPercentage,
            tooltipText: `${suspendedWorkshopsPercentage}% de las actividades fueron cancelad${gender}s`,
        },
        {
            name: `${mainText} agendadas`,
            stat: activitiesByStatus.SCHEDULED.length + activitiesByStatus.SENT.length || 0,
            changeType: 'increase',
            comparationText: null,
        },
    ];
    return stats
}



export {
    categorizeActivityByStatus, countActivityByModality, countActivitySatisfactionForm, countChatProperties, countVolunteerProperties, countWorkshopProperties, createAdminStatsForActivities, formatCountsForCharts, getActivityAttendancePerMonth
};

