'use server';

import { ChatsWithAllData } from "@/components/table/columns/chatsColumns";
import { WorkshopWithAllData } from "@/components/table/columns/workshopColumns";
import { ActivityStatus, Chat, Volunteer, Workshop } from "@prisma/client";
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

const countWorkshopProperties = (workshops: WorkshopWithAllData[]) => {
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

const createAdminStatsForWorkshops = (activitiesByStatus: Record<ActivityStatus, WorkshopWithAllData[]>, totalAmountOfActivities: number) => {
    const doneWorkshopsPercentage = Number(
        ((activitiesByStatus.ATTENDANCE_CHECKED.length / totalAmountOfActivities) * 100).toFixed(0)
    );
    const suspendedWorkshopsPercentage = Number(
        ((activitiesByStatus.SUSPENDED.length / totalAmountOfActivities) * 100).toFixed(0)
    );

    const stats = [
        {
            name: 'Actividades formativas ofertadas',
            stat: totalAmountOfActivities || 0,
            previousStat: 250,
            changeType: 'decrease',
            comparationText: null,
            tooltipText: null,
        },
        {
            name: 'Actividades formativas realizadas',
            stat: activitiesByStatus.ATTENDANCE_CHECKED.length || 0,
            changeType: 'increase',
            comparationText: `De ${totalAmountOfActivities || 0} actividades ofertadas`,
            comparation: doneWorkshopsPercentage,
            tooltipText: `${doneWorkshopsPercentage}% de las actividades fueron realizadas`,
        },
        {
            name: 'Actividades formativas canceladas',
            stat: activitiesByStatus.SUSPENDED.length || 0,
            changeType: 'increase',
            comparationText: `De ${totalAmountOfActivities || 0} actividades ofertadas`,
            comparation: suspendedWorkshopsPercentage,
            tooltipText: `${suspendedWorkshopsPercentage}% de las actividades fueron canceladas`,
        },
        {
            name: 'Actividades formativas agendadas',
            stat: activitiesByStatus.SCHEDULED.length + activitiesByStatus.SENT.length || 0,
            changeType: 'increase',
            comparationText: null,
        },
    ];
    return stats
}

const countActivityAttendancePerMonth = (workshops: WorkshopWithAllData[]) => {
    const stats: {
        activitiesByMonth: Record<number, number>;
        workshopsWithHighAttendancePerMonth: Record<string, number>;
    } = {
        activitiesByMonth: {},
        workshopsWithHighAttendancePerMonth: {},
    };

    workshops.forEach((workshop) => {
        const date = new Date(workshop.start_dates[0]);
        const month = date.getMonth();

        // Calculate activitiesByMonth
        stats.activitiesByMonth[month] = (stats.activitiesByMonth[month] || 0) + 1;
        // Calculate workshopsWithHighAttendancePerMonth
        const totalScholars = workshop.scholar_attendance?.filter((a) => a.attendance !== 'ATTENDED').length || 0;
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

const formatActivityAttendancePerMonthForChart = (stats: {
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
        name: 'Actividades formativas con alta asistencia',
        color: '#eab308',
        type: 'line',
    };
    const barSeries = {
        data: Object.entries(stats.activitiesByMonth).map(([month, count]) => ({
            x: new Date(0, Number(month)).toLocaleString('es-ES', { month: 'long' }),
            y: count,
        })),
        name: 'Actividades formativas realizadas',
        color: '#23a217',
        type: 'bar',
    }
    return { lineSeries, barSeries };
}

const getActivityAttendancePerMonth = (workshops: WorkshopWithAllData[]) => {
    const stats = countActivityAttendancePerMonth(workshops);
    const chartSeries = formatActivityAttendancePerMonthForChart(stats);
    return chartSeries;
}




export {
    countActivityByModality,
    getAttendedActivities,
    getApprovedAndAttendedVolunteers,
    getAttendedChats,
    categorizeActivityByStatus,
    formatCountsForCharts,
    countWorkshopProperties,
    createAdminStatsForWorkshops,
    countChatProperties,
    getActivityAttendancePerMonth
};

