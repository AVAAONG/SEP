import { AreaChartComponent, DonutChartComponent } from '@/components/charts';
import DatePickerByEvaluationPeriod from '@/components/commons/DatePickerByEvaluationBlock';
import { ChatsWithAllData } from '@/components/table/columns/chatsColumns';
import { WorkshopWithAllData } from '@/components/table/columns/workshopColumns';
import { getServerSession } from '@/lib/auth/authOptions';
import { VolunteerWithAllData } from '@/lib/db/types';
import { getChatsByScholar, getVolunteersByScholar, getWorkhsopsByScholar } from '@/lib/db/utils/Workshops';
import { countChatProperties, countVolunteerProperties, countWorkshopProperties, formatCountsForCharts } from '@/lib/utils/activityFilters';
import filterActivitiesBySearchParams from '@/lib/utils/datePickerFilters';
import { getApprovedAndAttendedVolunteerActivities, getApprovedAndAttendedVolunteers, getAttendedChats, getAttendedWorkshops } from '@/lib/utils/getAttendedActivities';
import { parseSkillFromDatabase, parseVolunteerProject } from '@/lib/utils2';

const page = async ({
    searchParams,
}: {
    searchParams?: {
        year?: string;
        month?: string;
        quarter?: string;
        startDate?: string;
        endDate?: string;
        preset?: string;
    };
}) => {
    const session = await getServerSession();
    const scholarId = session?.id!;

    // Fetch all activity data in parallel
    const [chatsDbList, workshopsDbList, volunteersDbList] = await Promise.all([
        getChatsByScholar(scholarId) as Promise<ChatsWithAllData[]>,
        getWorkhsopsByScholar(scholarId) as Promise<WorkshopWithAllData[]>,
        getVolunteersByScholar(scholarId) as Promise<VolunteerWithAllData[]>,
    ]);

    // Apply date filters
    const chatsFiltered = (await filterActivitiesBySearchParams(chatsDbList, searchParams)) as ChatsWithAllData[];
    const workshopsFiltered = (await filterActivitiesBySearchParams(workshopsDbList, searchParams)) as WorkshopWithAllData[];
    const volunteersFiltered = (await filterActivitiesBySearchParams(volunteersDbList, searchParams)) as VolunteerWithAllData[];

    // Get attended activities
    const chatsAttended = getAttendedChats(chatsFiltered, scholarId);
    const workshopsAttended = getAttendedWorkshops(workshopsFiltered);
    const volunteersApproved = getApprovedAndAttendedVolunteerActivities(volunteersFiltered);
    const { totalVolunteerHours, internalVolunteerHours, externalVolunteerHours } = getApprovedAndAttendedVolunteers(volunteersFiltered);

    const chatsAttendedAllTime = getAttendedChats(chatsDbList, scholarId);
    const workshopsAttendedAllTime = getAttendedWorkshops(workshopsDbList);
    const volunteersApprovedAllTime = getApprovedAndAttendedVolunteerActivities(volunteersDbList);

    // Calculate comprehensive statistics
    const totalActivitiesAttended = chatsAttended.length + workshopsAttended.length + volunteersApproved.length;
    const totalActivitiesRegistered = chatsFiltered.length + workshopsFiltered.length + volunteersFiltered.length;

    // Goals progress
    const chatGoalProgress = (chatsAttended.length / 10) * 100;
    const workshopGoalProgress = (workshopsAttended.length / 10) * 100;
    const volunteerGoalProgress = (totalVolunteerHours / 100) * 100;
    const overallProgress = ((Math.min(chatsAttended.length, 10) + Math.min(workshopsAttended.length, 10) + Math.min(totalVolunteerHours, 100)) / 120) * 100;
    // Activity breakdown by year
    const currentYear = new Date().getFullYear();
    const activityByYear = {} as Record<number, { chats: number; workshops: number; volunteer: number }>;
    const activityByYearAllTime = {} as Record<number, { chats: number; workshops: number; volunteer: number }>;

    chatsAttended.forEach(chat => {
        const year = new Date(chat.start_dates[0]).getFullYear();
        if (!activityByYear[year]) activityByYear[year] = { chats: 0, workshops: 0, volunteer: 0 };
        activityByYear[year].chats++;
    });

    workshopsAttended.forEach(workshop => {
        const year = new Date(workshop.start_dates[0]).getFullYear();
        if (!activityByYear[year]) activityByYear[year] = { chats: 0, workshops: 0, volunteer: 0 };
        activityByYear[year].workshops++;
    });

    volunteersApproved.forEach(volunteer => {
        const year = new Date(volunteer.start_dates[0]).getFullYear();
        const hours = volunteer.volunteer_attendance[0]?.asigned_hours || 0;
        if (!activityByYear[year]) activityByYear[year] = { chats: 0, workshops: 0, volunteer: 0 };
        activityByYear[year].volunteer += hours;
    });

    chatsAttendedAllTime.forEach(chat => {
        const year = new Date(chat.start_dates[0]).getFullYear();
        if (!activityByYearAllTime[year]) activityByYearAllTime[year] = { chats: 0, workshops: 0, volunteer: 0 };
        activityByYearAllTime[year].chats++;
    });

    workshopsAttendedAllTime.forEach(workshop => {
        const year = new Date(workshop.start_dates[0]).getFullYear();
        if (!activityByYearAllTime[year]) activityByYearAllTime[year] = { chats: 0, workshops: 0, volunteer: 0 };
        activityByYearAllTime[year].workshops++;
    });

    volunteersApprovedAllTime.forEach(volunteer => {
        const year = new Date(volunteer.start_dates[0]).getFullYear();
        const hours = volunteer.volunteer_attendance[0]?.asigned_hours || 0;
        if (!activityByYearAllTime[year]) activityByYearAllTime[year] = { chats: 0, workshops: 0, volunteer: 0 };
        activityByYearAllTime[year].volunteer += hours;
    });

    const baselineYears = [currentYear, currentYear - 1];
    baselineYears.forEach(year => {
        if (!activityByYearAllTime[year]) {
            activityByYearAllTime[year] = { chats: 0, workshops: 0, volunteer: 0 };
        }
    });

    // Current year stats
    const currentYearStats = activityByYear[currentYear] || { chats: 0, workshops: 0, volunteer: 0 };

    // Monthly activity trend (separate by type)
    const monthlyChats = Array(12).fill(0);
    const monthlyWorkshops = Array(12).fill(0);
    const monthlyVolunteer = Array(12).fill(0);

    chatsAttended.forEach(chat => {
        const month = new Date(chat.start_dates[0]).getMonth();
        monthlyChats[month]++;
    });

    workshopsAttended.forEach(workshop => {
        const month = new Date(workshop.start_dates[0]).getMonth();
        monthlyWorkshops[month]++;
    });

    volunteersApproved.forEach(volunteer => {
        const month = new Date(volunteer.start_dates[0]).getMonth();
        monthlyVolunteer[month]++;
    });

    const monthlySeries = [
        {
            name: 'Chats',
            data: Array.from({ length: 12 }, (_, i) => ({
                x: new Date(0, i).toLocaleString('es-ES', { month: 'short' }).toUpperCase(),
                y: monthlyChats[i],
            })),
            color: '#ef4444', // red
        },
        {
            name: 'Talleres',
            data: Array.from({ length: 12 }, (_, i) => ({
                x: new Date(0, i).toLocaleString('es-ES', { month: 'short' }).toUpperCase(),
                y: monthlyWorkshops[i],
            })),
            color: '#3b82f6', // blue
        },
        {
            name: 'Voluntariado',
            data: Array.from({ length: 12 }, (_, i) => ({
                x: new Date(0, i).toLocaleString('es-ES', { month: 'short' }).toUpperCase(),
                y: monthlyVolunteer[i],
            })),
            color: '#10b981', // green
        },
    ];

    const chatLevelLabels: Record<string, string> = {
        BASIC: 'Nivel Básico',
        INTERMEDIATE: 'Nivel Intermedio',
        ADVANCED: 'Nivel Avanzado',
    };

    const chatLevelCounts = chatsAttended.reduce((acc, chat) => {
        const levelKey = chat.level ?? 'SIN_DEFINIR';
        acc[levelKey] = (acc[levelKey] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const chatLevelData = Object.entries(chatLevelCounts).map(([level, count]) => ({
        label: chatLevelLabels[level as keyof typeof chatLevelLabels] ?? 'Nivel sin definir',
        value: count,
    }));

    const chatsFacilitated = chatsFiltered.filter(chat => chat.speaker.some(speaker => speaker.id === scholarId)).length;

    const volunteerHoursBreakdown = volunteersApprovedAllTime.reduce(
        (acc, volunteer) => {
            const attendance = volunteer.volunteer_attendance[0];
            if (!attendance) return acc;

            const hours = attendance.asigned_hours || 0;
            const year = new Date(volunteer.start_dates[0]).getFullYear();

            if (volunteer.kind_of_volunteer === 'INTERNAL') {
                acc.internal += hours;
                if (year === currentYear) acc.internalThisYear += hours;
            } else {
                acc.external += hours;
                if (year === currentYear) acc.externalThisYear += hours;
            }

            if (year === currentYear) acc.totalThisYear += hours;

            return acc;
        },
        { internal: 0, external: 0, internalThisYear: 0, externalThisYear: 0, totalThisYear: 0 },
    );

    const chatsAttendedThisYear = chatsAttendedAllTime.filter(chat => new Date(chat.start_dates[0]).getFullYear() === currentYear).length;
    const workshopsAttendedThisYear = workshopsAttendedAllTime.filter(workshop => new Date(workshop.start_dates[0]).getFullYear() === currentYear).length;

    const volunteerHoursThisYear = volunteerHoursBreakdown.totalThisYear;
    const internalVolunteerHoursThisYear = volunteerHoursBreakdown.internalThisYear;
    const externalVolunteerHoursThisYear = volunteerHoursBreakdown.externalThisYear;

    const currentMonthIndex = new Date().getMonth();
    const monthsElapsed = currentMonthIndex + 1;
    const monthsRemaining = Math.max(0, 12 - monthsElapsed);

    const chatsRemaining = Math.max(0, 10 - chatsAttendedThisYear);
    const workshopsRemaining = Math.max(0, 10 - workshopsAttendedThisYear);
    const volunteerHoursRemaining = Math.max(0, 100 - Math.min(volunteerHoursThisYear, 100));
    const internalHoursRemaining = Math.max(0, 60 - Math.min(internalVolunteerHoursThisYear, 60));
    const externalHoursRemaining = Math.max(0, 40 - Math.min(externalVolunteerHoursThisYear, 40));

    const chatMonthlyPace = monthsElapsed > 0 ? chatsAttendedThisYear / monthsElapsed : 0;
    const workshopMonthlyPace = monthsElapsed > 0 ? workshopsAttendedThisYear / monthsElapsed : 0;
    const volunteerMonthlyPace = monthsElapsed > 0 ? volunteerHoursThisYear / monthsElapsed : 0;

    const chatPaceNeeded = monthsRemaining > 0 ? chatsRemaining / monthsRemaining : chatsRemaining;
    const workshopPaceNeeded = monthsRemaining > 0 ? workshopsRemaining / monthsRemaining : workshopsRemaining;
    const volunteerPaceNeeded = monthsRemaining > 0 ? volunteerHoursRemaining / monthsRemaining : volunteerHoursRemaining;

    const monthKeySet = new Set<string>();

    const registerMonth = (dateValue: string | Date) => {
        const date = new Date(dateValue);
        const key = `${date.getFullYear()}-${date.getMonth()}`;
        monthKeySet.add(key);
    };

    chatsAttended.forEach(chat => registerMonth(chat.start_dates[0]));
    workshopsAttended.forEach(workshop => registerMonth(workshop.start_dates[0]));
    volunteersApproved.forEach(volunteer => registerMonth(volunteer.start_dates[0]));

    const sortedMonthKeys = Array.from(monthKeySet)
        .map(entry => {
            const [year, month] = entry.split('-').map(Number);
            return { year, month };
        })
        .sort((a, b) => (a.year - b.year) || (a.month - b.month));

    let longestParticipationStreak = 0;
    let rollingStreak = 0;
    let previousMonth: { year: number; month: number } | null = null;

    sortedMonthKeys.forEach(({ year, month }) => {
        if (!previousMonth) {
            rollingStreak = 1;
        } else {
            const expectedYear = previousMonth.month === 11 ? previousMonth.year + 1 : previousMonth.year;
            const expectedMonth = previousMonth.month === 11 ? 0 : previousMonth.month + 1;

            if (year === expectedYear && month === expectedMonth) {
                rollingStreak += 1;
            } else {
                rollingStreak = 1;
            }
        }

        longestParticipationStreak = Math.max(longestParticipationStreak, rollingStreak);
        previousMonth = { year, month };
    });

    let currentParticipationStreak = 0;
    if (sortedMonthKeys.length > 0) {
        let expectedYear = currentYear;
        let expectedMonth = currentMonthIndex;

        for (let i = sortedMonthKeys.length - 1; i >= 0; i--) {
            const { year, month } = sortedMonthKeys[i];
            if (year === expectedYear && month === expectedMonth) {
                currentParticipationStreak += 1;
                if (expectedMonth === 0) {
                    expectedMonth = 11;
                    expectedYear -= 1;
                } else {
                    expectedMonth -= 1;
                }
            } else if (year > expectedYear || (year === expectedYear && month > expectedMonth)) {
                continue;
            } else {
                break;
            }
        }
    }

    const previousYearStats = activityByYearAllTime[currentYear - 1] || { chats: 0, workshops: 0, volunteer: 0 };

    const volunteerHoursAveragePerMonth = monthsElapsed > 0 ? volunteerHoursThisYear / monthsElapsed : 0;

    const dayOfWeekLabels = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const dayOfWeekCount = Array(7).fill(0);

    const registerDayOfWeek = (dateValue: string | Date) => {
        const date = new Date(dateValue);
        dayOfWeekCount[date.getDay()] += 1;
    };

    chatsAttended.forEach(chat => registerDayOfWeek(chat.start_dates[0]));
    workshopsAttended.forEach(workshop => registerDayOfWeek(workshop.start_dates[0]));
    volunteersApproved.forEach(volunteer => registerDayOfWeek(volunteer.start_dates[0]));

    const favoriteDayIndex = dayOfWeekCount.findIndex(count => count === Math.max(...dayOfWeekCount));
    const favoriteDayLabel = dayOfWeekCount[favoriteDayIndex] > 0 ? dayOfWeekLabels[favoriteDayIndex] : 'Sin datos';

    const monthsActiveThisYear = new Set(
        Array.from(monthKeySet).filter(entry => entry.startsWith(`${currentYear}-`)),
    ).size;

    // Skills breakdown from workshops
    const skillCounts = {} as Record<string, number>;
    workshopsAttended.forEach(workshop => {
        const skill = workshop.asociated_skill;
        skillCounts[skill] = (skillCounts[skill] || 0) + 1;
    });

    // Top 3 skills
    const topSkills = Object.entries(skillCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([skill, count]) => ({ skill: skill as any, count }));

    // Project distribution
    const projectCounts = {} as Record<string, number>;
    volunteersApproved.forEach(volunteer => {
        const project = volunteer.VolunteerProject || 'OTHER';
        const hours = volunteer.volunteer_attendance[0]?.asigned_hours || 0;
        projectCounts[project] = (projectCounts[project] || 0) + hours;
    });

    const topProject = Object.entries(projectCounts).sort((a, b) => b[1] - a[1])[0];

    // Modality preference
    const modalityCount = { inPerson: 0, online: 0, hybrid: 0 };
    [...chatsAttended, ...workshopsAttended].forEach(activity => {
        const modality = activity.modality;
        if (modality === 'IN_PERSON') modalityCount.inPerson++;
        else if (modality === 'ONLINE') modalityCount.online++;
        else if (modality === 'HYBRID') modalityCount.hybrid++;
    });

    const totalModalityActivities = modalityCount.inPerson + modalityCount.online + modalityCount.hybrid;
    const preferredModality = modalityCount.inPerson >= modalityCount.online && modalityCount.inPerson >= modalityCount.hybrid ? 'Presencial' :
        modalityCount.online >= modalityCount.hybrid ? 'Virtual' : 'Híbrida';

    // Consistency metrics
    const uniqueMonthsActive = new Set(
        [...chatsAttended, ...workshopsAttended, ...volunteersApproved].map(
            activity => `${new Date(activity.start_dates[0]).getFullYear()}-${new Date(activity.start_dates[0]).getMonth()}`
        )
    ).size;

    // Activity diversity score (0-100)
    const diversityScore = Math.min(100,
        (chatsAttended.length > 0 ? 33 : 0) +
        (workshopsAttended.length > 0 ? 33 : 0) +
        (volunteersApproved.length > 0 ? 34 : 0)
    );

    // Average hours per volunteer activity
    const avgVolunteerHours = volunteersApproved.length > 0 ? totalVolunteerHours / volunteersApproved.length : 0;

    // Prepare data for charts
    const chatPropertiesCount = chatsAttended.length > 0 ? await countChatProperties(chatsAttended) : null;
    const workshopPropertiesCount = workshopsAttended.length > 0 ? await countWorkshopProperties(workshopsAttended) : null;
    const volunteerPropertiesCount = volunteersApproved.length > 0 ? await countVolunteerProperties(volunteersApproved) : null;

    const chatDataForCharts = chatPropertiesCount ? await formatCountsForCharts(chatPropertiesCount) : null;
    const workshopDataForCharts = workshopPropertiesCount ? await formatCountsForCharts(workshopPropertiesCount) : null;
    const volunteerDataForCharts = volunteerPropertiesCount ? await formatCountsForCharts(volunteerPropertiesCount) : null;

    // Activity type distribution
    const activityTypeData = [
        { label: 'Chats', value: chatsAttended.length },
        { label: 'Talleres', value: workshopsAttended.length },
        { label: 'Voluntariado', value: volunteersApproved.length },
    ];

    return (
        <div className="flex flex-col gap-6 pb-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        Panel de Estadísticas
                    </h1>
                    <p className="mt-1 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                        Análisis completo de tu participación en el programa ProExcelencia
                    </p>
                </div>
                <DatePickerByEvaluationPeriod />
            </div>
            <div className="mt-2 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-2 rounded-md text-sm">
                <p><strong>Página experimental:</strong> la información y el diseño de esta página pueden cambiar en los próximos meses.</p>
            </div>

            {/* =========================== GENERAL OVERVIEW =========================== */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Resumen General</h2>
                </div>

                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Total Activities */}
                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-700 rounded-xl shadow-lg p-6 text-white">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <p className="text-sm font-medium text-indigo-100 uppercase tracking-wide">Total Actividades</p>
                                <p className="text-5xl font-bold mt-2">{totalActivitiesAttended}</p>
                            </div>
                            <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-sm text-indigo-100">
                            De {totalActivitiesRegistered} registradas
                        </p>
                    </div>

                    {/* Overall Progress */}
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 rounded-xl shadow-lg p-6 text-white">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <p className="text-sm font-medium text-purple-100 uppercase tracking-wide">Progreso General</p>
                                <p className="text-5xl font-bold mt-2">{Math.min(100, overallProgress).toFixed(0)}%</p>
                            </div>
                            <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                            <div
                                className="bg-white h-2 rounded-full transition-all duration-700"
                                style={{ width: `${Math.min(100, overallProgress)}%` }}
                            />
                        </div>
                    </div>

                    {/* Consistency Score */}
                    <div className="bg-gradient-to-br from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 rounded-xl shadow-lg p-6 text-white">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <p className="text-sm font-medium text-amber-100 uppercase tracking-wide">Meses Activos</p>
                                <p className="text-5xl font-bold mt-2">{uniqueMonthsActive}</p>
                            </div>
                            <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-sm text-amber-100">
                            Constancia en tu participación
                        </p>
                    </div>

                    {/* Preferred Modality */}
                    <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 dark:from-cyan-600 dark:to-cyan-700 rounded-xl shadow-lg p-6 text-white">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <p className="text-sm font-medium text-cyan-100 uppercase tracking-wide">Modalidad Preferida</p>
                                <p className="text-3xl font-bold mt-2">{preferredModality}</p>
                            </div>
                            <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-sm text-cyan-100">
                            {totalModalityActivities} actividades analizadas
                        </p>
                    </div>
                </div>

                {/* Monthly Trend Chart */}
                <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
                        Tendencia Mensual de Actividades
                    </h3>
                    <AreaChartComponent
                        series={monthlySeries}
                        title="Actividades por Mes"
                        xAxysType="category"
                    />
                </div>
            </div>

            {/* Goal Progress Section */}
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Progreso por Meta
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Chats Goal */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Chats</span>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">{chatsAttended.length} / 10</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div
                                className="bg-red-500 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(100, chatGoalProgress)}%` }}
                            />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            {Math.min(100, chatGoalProgress).toFixed(0)}% completado
                        </p>
                    </div>

                    {/* Workshops Goal */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Talleres</span>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">{workshopsAttended.length} / 10</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div
                                className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(100, workshopGoalProgress)}%` }}
                            />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            {Math.min(100, workshopGoalProgress).toFixed(0)}% completado
                        </p>
                    </div>

                    {/* Volunteer Goal */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Voluntariado</span>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">{totalVolunteerHours}h / 100h</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div
                                className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(100, volunteerGoalProgress)}%` }}
                            />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            {Math.min(100, volunteerGoalProgress).toFixed(0)}% completado
                        </p>
                    </div>
                </div>
            </div>

            {/* Activity Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Current Year Activity */}
                <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Actividad {currentYear}</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {currentYearStats.chats + currentYearStats.workshops}
                            </p>
                        </div>
                    </div>
                    <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                        <div className="flex justify-between">
                            <span>Chats:</span>
                            <span className="font-semibold">{currentYearStats.chats}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Talleres:</span>
                            <span className="font-semibold">{currentYearStats.workshops}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Voluntariado:</span>
                            <span className="font-semibold">{currentYearStats.volunteer}h</span>
                        </div>
                    </div>
                </div>

                {/* Preferred Modality */}
                <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Modalidad Preferida</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{preferredModality}</p>
                        </div>
                    </div>
                    <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                        <div className="flex justify-between">
                            <span>Presencial:</span>
                            <span className="font-semibold">{modalityCount.inPerson} ({totalModalityActivities > 0 ? ((modalityCount.inPerson / totalModalityActivities) * 100).toFixed(0) : 0}%)</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Virtual:</span>
                            <span className="font-semibold">{modalityCount.online} ({totalModalityActivities > 0 ? ((modalityCount.online / totalModalityActivities) * 100).toFixed(0) : 0}%)</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Híbrida:</span>
                            <span className="font-semibold">{modalityCount.hybrid} ({totalModalityActivities > 0 ? ((modalityCount.hybrid / totalModalityActivities) * 100).toFixed(0) : 0}%)</span>
                        </div>
                    </div>
                </div>

                {/* Top Skill */}
                <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Competencias Top</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                                {topSkills.length > 0 ? parseSkillFromDatabase(topSkills[0].skill) : 'N/A'}
                            </p>
                        </div>
                    </div>
                    <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                        {topSkills.slice(0, 3).map((skill, idx) => (
                            <div key={idx} className="flex justify-between">
                                <span className="truncate">{parseSkillFromDatabase(skill.skill)}:</span>
                                <span className="font-semibold">{skill.count}</span>
                            </div>
                        ))}
                        {topSkills.length === 0 && (
                            <p className="text-center py-2">Sin datos</p>
                        )}
                    </div>
                </div>

                {/* Top Volunteer Project */}
                <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Proyecto Principal</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                                {topProject ? parseVolunteerProject(topProject[0] as any) : 'N/A'}
                            </p>
                        </div>
                    </div>
                    <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                        <div className="flex justify-between">
                            <span>Horas totales:</span>
                            <span className="font-semibold">{topProject ? topProject[1] : 0}h</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Promedio/actividad:</span>
                            <span className="font-semibold">{avgVolunteerHours.toFixed(1)}h</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Internas:</span>
                            <span className="font-semibold">{internalVolunteerHours}h</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Externas:</span>
                            <span className="font-semibold">{externalVolunteerHours}h</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Activity Type Distribution */}
                <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                    <DonutChartComponent
                        data={activityTypeData}
                        chartTitle="Distribución por Tipo de Actividad"
                    />
                </div>

                {/* Chat Level Distribution */}
                {chatLevelData.length > 0 && (
                    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                        <DonutChartComponent data={chatLevelData} chartTitle="Participación por nivel de chat" />
                    </div>
                )}

                {/* Skills Distribution */}
                {workshopsAttended.length > 0 && workshopDataForCharts?.skills && (
                    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                        <DonutChartComponent
                            data={workshopDataForCharts.skills}
                            chartTitle="Distribución de Competencias"
                        />
                    </div>
                )}

                {/* Modality Distribution */}
                {chatDataForCharts?.modality && (
                    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                        <DonutChartComponent
                            data={chatDataForCharts.modality}
                            chartTitle="Distribución por Modalidad"
                        />
                    </div>
                )}
            </div>

            {/* Yearly Breakdown */}
            {Object.keys(activityByYearAllTime).length > 0 && (
                <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Resumen por Año
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className="px-6 py-3">Año</th>
                                    <th className="px-6 py-3">Chats</th>
                                    <th className="px-6 py-3">Talleres</th>
                                    <th className="px-6 py-3">Voluntariado (h)</th>
                                    <th className="px-6 py-3">Total Actividades</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(activityByYearAllTime)
                                    .sort((a, b) => Number(b[0]) - Number(a[0]))
                                    .map(([year, stats]) => (
                                        <tr key={year} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{year}</td>
                                            <td className="px-6 py-4 text-center">{stats.chats}</td>
                                            <td className="px-6 py-4 text-center">{stats.workshops}</td>
                                            <td className="px-6 py-4 text-center">{stats.volunteer}</td>
                                            <td className="px-6 py-4 text-center font-semibold">{stats.chats + stats.workshops}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Additional Insights Section */}
            <div className="space-y-6">
                {/* Pace & Projection - Full Width Modern Card */}
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl shadow-lg p-8 border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 dark:from-purple-300 dark:to-indigo-300 bg-clip-text text-transparent">
                                Ritmo y Proyección {currentYear}
                            </h3>
                            <p className="text-sm text-purple-700 dark:text-purple-300 font-medium mt-1">
                                {monthsElapsed} {monthsElapsed === 1 ? 'mes' : 'meses'} transcurridos · {monthsRemaining} {monthsRemaining === 1 ? 'mes' : 'meses'} por delante
                            </p>
                        </div>
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm">
                            <div className={`w-3 h-3 rounded-full ${volunteerPaceNeeded <= volunteerMonthlyPace && chatPaceNeeded <= chatMonthlyPace && workshopPaceNeeded <= workshopMonthlyPace ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`}></div>
                            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                                {volunteerPaceNeeded <= volunteerMonthlyPace && chatPaceNeeded <= chatMonthlyPace && workshopPaceNeeded <= workshopMonthlyPace ? 'En buen ritmo' : 'Requiere ajuste'}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Current Pace */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-purple-100 dark:border-purple-900">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-400"></div>
                                <p className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">Ritmo actual</p>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between group">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Chats/mes</span>
                                    <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                        {chatMonthlyPace.toFixed(1)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between group">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Talleres/mes</span>
                                    <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                        {workshopMonthlyPace.toFixed(1)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between group">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Horas/mes</span>
                                    <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                        {volunteerMonthlyPace.toFixed(1)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Required Pace */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-purple-100 dark:border-purple-900">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400"></div>
                                <p className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">Ritmo necesario</p>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between group">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Chats/mes</span>
                                    <span className={`text-lg font-bold transition-colors ${chatPaceNeeded > chatMonthlyPace ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`}>
                                        {chatPaceNeeded > 0 ? chatPaceNeeded.toFixed(1) : '0.0'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between group">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Talleres/mes</span>
                                    <span className={`text-lg font-bold transition-colors ${workshopPaceNeeded > workshopMonthlyPace ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`}>
                                        {workshopPaceNeeded > 0 ? workshopPaceNeeded.toFixed(1) : '0.0'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between group">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Horas/mes</span>
                                    <span className={`text-lg font-bold transition-colors ${volunteerPaceNeeded > volunteerMonthlyPace ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`}>
                                        {volunteerPaceNeeded > 0 ? volunteerPaceNeeded.toFixed(1) : '0.0'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Pending */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-purple-100 dark:border-purple-900">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-red-400"></div>
                                <p className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">Pendientes</p>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Chats</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">{chatsRemaining}</span>
                                        {chatsRemaining === 0 && <span className="text-green-500">✓</span>}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Talleres</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">{workshopsRemaining}</span>
                                        {workshopsRemaining === 0 && <span className="text-green-500">✓</span>}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Horas</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">{volunteerHoursRemaining}h</span>
                                        {volunteerHoursRemaining === 0 && <span className="text-green-500">✓</span>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Volunteer Balance */}
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-xl p-5 shadow-md border border-emerald-200 dark:border-emerald-800">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"></div>
                                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">Balance voluntariado</p>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs text-emerald-700 dark:text-emerald-300">Internas</span>
                                        <span className="text-sm font-bold text-emerald-900 dark:text-emerald-100">{internalHoursRemaining}h</span>
                                    </div>
                                    <div className="w-full bg-emerald-200 dark:bg-emerald-900/50 rounded-full h-1.5">
                                        <div
                                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-1.5 rounded-full transition-all duration-700"
                                            style={{ width: `${Math.min(100, ((60 - internalHoursRemaining) / 60) * 100)}%` }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs text-emerald-700 dark:text-emerald-300">Externas</span>
                                        <span className="text-sm font-bold text-emerald-900 dark:text-emerald-100">{externalHoursRemaining}h</span>
                                    </div>
                                    <div className="w-full bg-purple-200 dark:bg-purple-900/50 rounded-full h-1.5">
                                        <div
                                            className="bg-gradient-to-r from-purple-500 to-purple-600 h-1.5 rounded-full transition-all duration-700"
                                            style={{ width: `${Math.min(100, ((40 - externalHoursRemaining) / 40) * 100)}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="pt-2 border-t border-emerald-200 dark:border-emerald-700">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-emerald-700 dark:text-emerald-300">Promedio</span>
                                        <span className="text-sm font-bold text-emerald-900 dark:text-emerald-100">{volunteerHoursAveragePerMonth.toFixed(1)}h/mes</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm border border-purple-200 dark:border-purple-700">
                        <div className="flex items-start gap-3">
                            <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center ${volunteerPaceNeeded <= volunteerMonthlyPace && chatPaceNeeded <= chatMonthlyPace && workshopPaceNeeded <= workshopMonthlyPace ? 'bg-green-100 dark:bg-green-900/30' : 'bg-amber-100 dark:bg-amber-900/30'}`}>
                                {volunteerPaceNeeded <= volunteerMonthlyPace && chatPaceNeeded <= chatMonthlyPace && workshopPaceNeeded <= workshopMonthlyPace ? (
                                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                )}
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                {volunteerPaceNeeded <= volunteerMonthlyPace && chatPaceNeeded <= chatMonthlyPace && workshopPaceNeeded <= workshopMonthlyPace
                                    ? '🎯 ¡Excelente! Tu ritmo actual es suficiente para alcanzar todas las metas del año. Mantén este nivel de participación.'
                                    : '⚡ Ajusta tu participación mensual para mantenerte encaminado hacia las metas anuales. Revisa las actividades pendientes y planifica tu tiempo.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Insights Section Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Análisis Detallado por Actividad</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Patrones de participación organizados por tipo de actividad</p>
                </div>

                {/* Chat Clubs Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Chat Clubs</h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Espacios de conversación y aprendizaje</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Chat Levels Distribution */}
                        <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-2xl shadow-lg p-6 border border-red-200 dark:border-red-800">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-md">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Niveles de Chat</h4>
                                    <p className="text-xs text-red-700 dark:text-red-300">Distribución por nivel de complejidad</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {chatLevelData.map((level) => (
                                    <div key={level.label} className="bg-white/60 dark:bg-gray-900/40 rounded-xl p-3">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{level.label}</span>
                                            <span className="text-lg font-bold text-red-600 dark:text-red-400">{level.value}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-red-500 to-rose-500 h-2 rounded-full transition-all duration-700"
                                                style={{ width: `${(level.value / Math.max(...chatLevelData.map(l => l.value), 1)) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Chat Facilitator Stats */}
                        <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-2xl shadow-lg p-6 border border-red-200 dark:border-red-800">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-md">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Como Facilitador</h4>
                                    <p className="text-xs text-red-700 dark:text-red-300">Tu rol de liderazgo en chats</p>
                                </div>
                            </div>

                            <div className="bg-white/60 dark:bg-gray-900/40 rounded-xl p-6 text-center">
                                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-md">
                                    <span className="text-4xl font-bold text-white">{chatsFacilitated}</span>
                                </div>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Chats facilitados</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    {chatsFacilitated > 0
                                        ? `Has liderado ${chatsFacilitated} ${chatsFacilitated === 1 ? 'chat' : 'chats'} como facilitador`
                                        : 'Aún no has facilitado chats'}
                                </p>
                            </div>

                            {chatsFacilitated > 0 && (
                                <div className="mt-4 flex items-center gap-2 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                    <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm font-medium text-red-700 dark:text-red-300">¡Excelente liderazgo!</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Actividades Formativas Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Actividades Formativas</h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Talleres y desarrollo de competencias</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                        {/* Skills Development */}
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl shadow-lg p-6 border border-blue-200 dark:border-blue-800">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Desarrollo de Competencias</h4>
                                    <p className="text-xs text-blue-700 dark:text-blue-300">Crecimiento y diversidad de habilidades</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="bg-white/60 dark:bg-gray-900/40 rounded-xl p-4 text-center">
                                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-md">
                                        <span className="text-3xl font-bold text-white">{Object.keys(skillCounts).length}</span>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Competencias</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">únicas desarrolladas</p>
                                </div>

                                <div className="bg-white/60 dark:bg-gray-900/40 rounded-xl p-4 text-center">
                                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-md">
                                        <span className="text-3xl font-bold text-white">{workshopsAttended.length}</span>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Talleres</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">completados</p>
                                </div>
                            </div>

                            <div className="p-4 bg-white/60 dark:bg-gray-900/40 rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    {Object.keys(skillCounts).length >= 4 ? (
                                        <>
                                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Excelente diversidad</span>
                                        </>
                                    ) : Object.keys(skillCounts).length >= 2 ? (
                                        <>
                                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Buen balance</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">Amplía tu horizonte</span>
                                        </>
                                    )}
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    {Object.keys(skillCounts).length >= 4
                                        ? 'Estás desarrollando una amplia gama de competencias. ¡Continúa así!'
                                        : Object.keys(skillCounts).length >= 2
                                            ? 'Considera explorar más áreas para ampliar tu perfil profesional.'
                                            : 'Participa en talleres variados para desarrollar competencias diversas.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actividades de Voluntariado Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Actividades de Voluntariado</h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Tu impacto social y compromiso comunitario</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {/* Volunteer Hours - Internal & External */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl shadow-lg p-6 border border-green-200 dark:border-green-800">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Horas de Voluntariado</h4>
                                    <p className="text-xs text-green-700 dark:text-green-300">Internas y externas</p>
                                </div>
                            </div>

                            <div className="bg-white/60 dark:bg-gray-900/40 rounded-xl p-4 mb-4">
                                <div className="text-center mb-4">
                                    <p className="text-5xl font-bold text-green-600 dark:text-green-400">{totalVolunteerHours}</p>
                                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Horas totales de voluntariado</p>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Internas</span>
                                            <span className="text-lg font-bold text-green-600 dark:text-green-400">{internalVolunteerHours}h</span>
                                        </div>
                                        <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                                            <div
                                                className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 h-2.5 rounded-full transition-all duration-700"
                                                style={{ width: `${(Math.min(internalVolunteerHours, 60) / 60) * 100}%` }}
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Meta: 60h</p>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Externas</span>
                                            <span className="text-lg font-bold text-green-600 dark:text-green-400">{externalVolunteerHours}h</span>
                                        </div>
                                        <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                                            <div
                                                className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 h-2.5 rounded-full transition-all duration-700"
                                                style={{ width: `${(Math.min(externalVolunteerHours, 40) / 40) * 100}%` }}
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Meta: 40h</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="bg-white/60 dark:bg-gray-900/40 rounded-lg p-3 text-center">
                                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{Object.keys(projectCounts).length}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Proyectos únicos</p>
                                </div>
                                <div className="bg-white/60 dark:bg-gray-900/40 rounded-lg p-3 text-center">
                                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{volunteersApproved.length}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Actividades realizadas</p>
                                </div>
                            </div>

                            {totalVolunteerHours >= 60 ? (
                                <div className="flex items-center gap-2 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                    <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-sm font-medium text-green-700 dark:text-green-300">¡Impacto social sobresaliente! Continúa con tu compromiso.</span>
                                </div>
                            ) : totalVolunteerHours >= 30 ? (
                                <div className="flex items-center gap-2 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                    <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm font-medium text-green-700 dark:text-green-300">Buen avance en tu compromiso social. Continúa sumando horas.</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                                    <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Aumenta tu participación en actividades de voluntariado.</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* General Insights Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gray-500 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Métricas Generales</h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Análisis transversal de tu participación</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Completion Rate Insight */}
                        <div className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-slate-600 rounded-xl flex items-center justify-center shadow-md">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Tasa de Finalización</h4>
                                    <p className="text-xs text-gray-700 dark:text-gray-300">Compromiso con actividades registradas</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-white/60 dark:bg-gray-900/40 rounded-xl p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tasa de completación</span>
                                        <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                                            {totalActivitiesRegistered > 0 ? ((totalActivitiesAttended / totalActivitiesRegistered) * 100).toFixed(1) : 0}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-700 ease-out shadow-sm"
                                            style={{ width: `${totalActivitiesRegistered > 0 ? (totalActivitiesAttended / totalActivitiesRegistered) * 100 : 0}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-sm">
                                    <div className="flex items-center gap-2 px-3 py-2 bg-white/60 dark:bg-gray-900/40 rounded-lg">
                                        <span className="text-gray-600 dark:text-gray-400">Completadas:</span>
                                        <span className="font-bold text-gray-900 dark:text-white">{totalActivitiesAttended}</span>
                                    </div>
                                    <span className="text-gray-400">/</span>
                                    <div className="flex items-center gap-2 px-3 py-2 bg-white/60 dark:bg-gray-900/40 rounded-lg">
                                        <span className="text-gray-600 dark:text-gray-400">Registradas:</span>
                                        <span className="font-bold text-gray-900 dark:text-white">{totalActivitiesRegistered}</span>
                                    </div>
                                </div>

                                {totalActivitiesRegistered > 0 && (totalActivitiesAttended / totalActivitiesRegistered) >= 0.8 && (
                                    <div className="flex items-center gap-2 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                        <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm font-medium text-green-700 dark:text-green-300">¡Excelente compromiso!</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Activity Frequency Insight */}
                        <div className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-slate-600 rounded-xl flex items-center justify-center shadow-md">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Frecuencia de Participación</h4>
                                    <p className="text-xs text-gray-700 dark:text-gray-300">Patrones de actividad y consistencia</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="bg-white/60 dark:bg-gray-900/40 rounded-xl p-3">
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Promedio mensual</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {uniqueMonthsActive > 0 ? (totalActivitiesAttended / uniqueMonthsActive).toFixed(1) : 0}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500">actividades/mes</p>
                                </div>

                                <div className="bg-white/60 dark:bg-gray-900/40 rounded-xl p-3">
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Meses activos {currentYear}</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {monthsActiveThisYear} / {monthsElapsed}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500">
                                        {monthsElapsed > 0 ? ((monthsActiveThisYear / monthsElapsed) * 100).toFixed(0) : 0}% del tiempo
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-white/60 dark:bg-gray-900/40 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">Racha actual</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{currentParticipationStreak} meses consecutivos</p>
                                        </div>
                                    </div>
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{currentParticipationStreak}</span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-white/60 dark:bg-gray-900/40 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">Mejor racha</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">Récord personal</p>
                                        </div>
                                    </div>
                                    <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">{longestParticipationStreak}</span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-white/60 dark:bg-gray-900/40 rounded-lg">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Día preferido</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Día con más actividad</p>
                                    </div>
                                    <span className="text-lg font-bold text-gray-900 dark:text-white">{favoriteDayLabel}</span>
                                </div>
                            </div>

                            {currentParticipationStreak >= 3 && (
                                <div className="mt-4 flex items-center gap-2 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                    <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm font-medium text-green-700 dark:text-green-300">¡Excelente! Continúas acumulando meses consecutivos con actividad.</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* End of General Insights Grid */}

                {/* Balance & Recommendations */}
                <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 md:col-span-2">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Recomendaciones Personalizadas</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Chat Recommendation */}
                                {chatsAttended.length < 10 && (
                                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                            </svg>
                                            <h4 className="font-semibold text-green-900 dark:text-green-100 text-sm">Chats</h4>
                                        </div>
                                        <p className="text-xs text-green-700 dark:text-green-300">
                                            Te faltan {10 - chatsAttended.length} chats para completar tu meta. ¡Inscríbete en los próximos!
                                        </p>
                                    </div>
                                )}

                                {/* Workshop Recommendation */}
                                {workshopsAttended.length < 10 && (
                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                            <h4 className="font-semibold text-blue-900 dark:text-blue-100 text-sm">Talleres</h4>
                                        </div>
                                        <p className="text-xs text-blue-700 dark:text-blue-300">
                                            Te faltan {10 - workshopsAttended.length} talleres. Explora competencias que aún no has desarrollado.
                                        </p>
                                    </div>
                                )}

                                {/* Volunteer Recommendation */}
                                {totalVolunteerHours < 100 && (
                                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                            <h4 className="font-semibold text-purple-900 dark:text-purple-100 text-sm">Voluntariado</h4>
                                        </div>
                                        <p className="text-xs text-purple-700 dark:text-purple-300">
                                            Te faltan {100 - totalVolunteerHours} horas. {externalHoursRemaining > 0 ? `Puedes sumar hasta ${externalHoursRemaining}h externas adicionales.` : 'Prioriza ahora voluntariados internos para que todas tus horas cuenten.'}
                                        </p>
                                    </div>
                                )}

                                {/* All goals achieved */}
                                {chatsAttended.length >= 10 && workshopsAttended.length >= 10 && totalVolunteerHours >= 100 && (
                                    <div className="md:col-span-3 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-lg p-4 border border-emerald-200 dark:border-emerald-800">
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                            </svg>
                                            <h4 className="font-semibold text-emerald-900 dark:text-emerald-100">¡Felicitaciones!</h4>
                                        </div>
                                        <p className="text-sm text-emerald-700 dark:text-emerald-300">
                                            Has completado todas las metas del programa. Continúa participando para seguir desarrollándote y generando impacto.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
