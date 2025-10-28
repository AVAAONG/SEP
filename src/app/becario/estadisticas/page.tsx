import { AreaChartComponent, DonutChartComponent } from '@/components/charts';
import DatePickerByEvaluationPeriod from '@/components/commons/datePicker/DatePickerByEvaluationBlock';
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

    // Fetch all activity data
    const chatsDbList = (await getChatsByScholar("cls7iaimi00006xqr3qjxw9gt")) as ChatsWithAllData[];
    const workshopsDbList = (await getWorkhsopsByScholar("cls7iaimi00006xqr3qjxw9gt")) as WorkshopWithAllData[];
    const volunteersDbList = (await getVolunteersByScholar("cls7iaimi00006xqr3qjxw9gt")) as VolunteerWithAllData[];

    // Apply date filters
    const chatsFiltered = (await filterActivitiesBySearchParams(chatsDbList, searchParams)) as ChatsWithAllData[];
    const workshopsFiltered = (await filterActivitiesBySearchParams(workshopsDbList, searchParams)) as WorkshopWithAllData[];
    const volunteersFiltered = (await filterActivitiesBySearchParams(volunteersDbList, searchParams)) as VolunteerWithAllData[];

    // Get attended activities
    const chatsAttended = getAttendedChats(chatsFiltered, scholarId);
    const workshopsAttended = getAttendedWorkshops(workshopsFiltered);
    const volunteersApproved = getApprovedAndAttendedVolunteerActivities(volunteersFiltered);
    const { totalVolunteerHours, internalVolunteerHours, externalVolunteerHours } = getApprovedAndAttendedVolunteers(volunteersFiltered);

    // Calculate comprehensive statistics
    const totalActivitiesAttended = chatsAttended.length + workshopsAttended.length + volunteersApproved.length;
    const totalActivitiesRegistered = chatsFiltered.length + workshopsFiltered.length + volunteersFiltered.length;

    // Goals progress
    const chatGoalProgress = (chatsAttended.length / 10) * 100;
    const workshopGoalProgress = (workshopsAttended.length / 10) * 100;
    const volunteerGoalProgress = (totalVolunteerHours / 100) * 100;
    // Cap each metric at its goal before calculating overall progress
    const overallProgress = ((Math.min(chatsAttended.length, 10) + Math.min(workshopsAttended.length, 10) + Math.min(totalVolunteerHours, 100)) / 120) * 100;

    console.log('Chats Attended:', chatsAttended.length);
    console.log('Workshops Attended:', workshopsAttended.length);
    console.log('Volunteers Approved:', totalVolunteerHours);

    // Activity breakdown by year
    const currentYear = new Date().getFullYear();
    const activityByYear = {} as Record<number, { chats: number; workshops: number; volunteer: number }>;

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
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Monthly Activity Trend */}
                <div className="col-span-3 bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
                        Tendencia Mensual de Actividades
                    </h3>
                    <AreaChartComponent
                        series={monthlySeries}
                        title="Actividades por Mes"
                        xAxysType="category"
                    />
                </div>

                {/* Activity Type Distribution */}
                <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                    <DonutChartComponent
                        data={activityTypeData}
                        chartTitle="Distribución por Tipo de Actividad"
                    />
                </div>

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
            {Object.keys(activityByYear).length > 0 && (
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
                                {Object.entries(activityByYear)
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Completion Rate Insight */}
                <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Tasa de Finalización</h3>
                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600 dark:text-gray-400">Actividades completadas vs registradas</span>
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            {totalActivitiesRegistered > 0 ? ((totalActivitiesAttended / totalActivitiesRegistered) * 100).toFixed(1) : 0}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <div
                                            className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${totalActivitiesRegistered > 0 ? (totalActivitiesAttended / totalActivitiesRegistered) * 100 : 0}%` }}
                                        />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Has completado {totalActivitiesAttended} de {totalActivitiesRegistered} actividades en las que te inscribiste.
                                    {totalActivitiesRegistered > 0 && (totalActivitiesAttended / totalActivitiesRegistered) >= 0.8 && ' ¡Excelente compromiso!'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Activity Frequency Insight */}
                <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Frecuencia de Participación</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Promedio mensual</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {uniqueMonthsActive > 0 ? (totalActivitiesAttended / uniqueMonthsActive).toFixed(1) : 0} actividades/mes
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Actividades este año</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {currentYearStats.chats + currentYearStats.workshops + (currentYearStats.volunteer > 0 ? 1 : 0)}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                                    {uniqueMonthsActive >= 6
                                        ? 'Mantienes una participación consistente a lo largo del año.'
                                        : 'Considera aumentar tu frecuencia de participación mensual.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Skills Development Insight */}
                <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Desarrollo de Competencias</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Competencias únicas</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {Object.keys(skillCounts).length}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Talleres completados</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {workshopsAttended.length}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                                    {Object.keys(skillCounts).length >= 4
                                        ? 'Excelente diversidad en el desarrollo de competencias.'
                                        : Object.keys(skillCounts).length >= 2
                                            ? 'Buen balance, considera explorar más áreas de desarrollo.'
                                            : 'Participa en talleres variados para desarrollar competencias diversas.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Impact Insight */}
                <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Impacto Social</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Horas de voluntariado</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {totalVolunteerHours}h
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Proyectos únicos</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {Object.keys(projectCounts).length}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Actividades de voluntariado</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {volunteersApproved.length}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                                    {totalVolunteerHours >= 60
                                        ? '¡Impacto social sobresaliente! Continúa con tu compromiso.'
                                        : totalVolunteerHours >= 30
                                            ? 'Buen avance en tu compromiso social. Continúa sumando horas.'
                                            : 'Aumenta tu participación en actividades de voluntariado.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

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
                                            Te faltan {100 - totalVolunteerHours} horas. {externalVolunteerHours < 40 ? 'Considera voluntariados externos.' : 'Enfócate en proyectos internos.'}
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
