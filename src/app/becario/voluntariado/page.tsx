import { AreaChartComponent, DonutChartComponent } from '@/components/charts';
import DatePickerByEvaluationPeriod from '@/components/commons/datePicker/DatePickerByEvaluationBlock';
import Table from '@/components/table/Table';
import scholarVolunteerAttendanceColumns from '@/components/table/columns/scholar/activityAttendance/volunteer/columns';
import createScholarVolunteerAttendanceForTable from '@/components/table/columns/scholar/activityAttendance/volunteer/formater';
import scholarVolunteerAttendanceSearchOptions from '@/components/table/columns/scholar/activityAttendance/volunteer/searchOptions';
import { getServerSession } from '@/lib/auth/authOptions';
import { VolunteerWithAllData } from '@/lib/db/types';
import { getVolunteersByScholar } from '@/lib/db/utils/Workshops';
import { countVolunteerProperties, formatCountsForCharts } from '@/lib/utils/activityFilters';
import filterActivitiesBySearchParams from '@/lib/utils/datePickerFilters';
import { getApprovedAndAttendedVolunteerActivities, getApprovedAndAttendedVolunteers } from '@/lib/utils/getAttendedActivities';
import { parseVolunteerProject } from '@/lib/utils2';
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
  const volunteerDbList = (await getVolunteersByScholar('cls7iaimi00006xqr3qjxw9gt')) as VolunteerWithAllData[];
  const volunteers = (await filterActivitiesBySearchParams(
    volunteerDbList,
    searchParams
  )) as VolunteerWithAllData[];
  const { externalVolunteerHours, internalVolunteerHours, totalVolunteerHours, internalInPerson, internalOnline, internalHybrid } =
    getApprovedAndAttendedVolunteers(volunteers);
  const approvedVolunteers = getApprovedAndAttendedVolunteerActivities(volunteers);
  const volunteerPropertiesCount = await countVolunteerProperties(approvedVolunteers);
  const volunteerDataForCharts = await formatCountsForCharts(volunteerPropertiesCount);
  const volunteerDataForTable = createScholarVolunteerAttendanceForTable(volunteers);

  // Calculate additional statistics
  const totalRegistered = volunteers.length;
  const pendingVolunteers = volunteers.filter(v => v.status === 'PENDING').length;
  const rejectedVolunteers = volunteers.filter(v => v.status === 'REJECTED').length;
  const remaining = Math.max(0, 100 - totalVolunteerHours);
  const completionRate = Math.min((totalVolunteerHours / 100) * 100, 100).toFixed(1);

  // Calculate project distribution
  const projectCounts = approvedVolunteers.reduce((acc, volunteer) => {
    const project = volunteer.VolunteerProject || 'OTHER';
    const hours = volunteer.volunteer_attendance[0]?.asigned_hours || 0;
    acc[project] = (acc[project] || 0) + hours;
    return acc;
  }, {} as Record<string, number>);

  const mostCommonProject = Object.entries(projectCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';


  // Calculate monthly volunteer hours trend
  const monthlyData = approvedVolunteers.reduce((acc, volunteer) => {
    const date = new Date(volunteer.start_dates[0]);
    const month = date.getMonth();
    const hours = volunteer.volunteer_attendance[0]?.asigned_hours || 0;
    acc[month] = (acc[month] || 0) + hours;
    return acc;
  }, {} as Record<number, number>);

  const monthlySeries = [{
    name: 'Horas de voluntariado',
    data: Array.from({ length: 12 }, (_, i) => ({
      x: new Date(0, i).toLocaleString('es-ES', { month: 'short' }).toUpperCase(),
      y: monthlyData[i] || 0,
    })),
    color: '#10b981',
  }];
  const averageHoursPerActivity = approvedVolunteers.length > 0 ? totalVolunteerHours / approvedVolunteers.length : 0;
  const mostActiveMonthEntry = Object.entries(monthlyData).sort((a, b) => (b[1] || 0) - (a[1] || 0))[0];
  const mostActiveMonth =
    mostActiveMonthEntry && (mostActiveMonthEntry[1] || 0) > 0
      ? new Date(0, Number(mostActiveMonthEntry[0])).toLocaleString('es-ES', { month: 'long' })
      : 'N/A';
  const mostActiveMonthHours = mostActiveMonthEntry?.[1] || 0;
  const formattedMostActiveMonth =
    mostActiveMonth !== 'N/A'
      ? mostActiveMonth.charAt(0).toUpperCase() + mostActiveMonth.slice(1)
      : 'N/A';
  const last30DaysThreshold = new Date();
  last30DaysThreshold.setDate(last30DaysThreshold.getDate() - 30);
  const last30DaysHours = approvedVolunteers.reduce((acc, volunteer) => {
    const startDate = volunteer.start_dates[0] ? new Date(volunteer.start_dates[0]) : null;
    if (startDate && startDate >= last30DaysThreshold) {
      return acc + (volunteer.volunteer_attendance[0]?.asigned_hours || 0);
    }
    return acc;
  }, 0);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Registro de actividades de voluntariado
          </h1>
          <p className="mt-1 text-xs md:text-sm text-gray-600 dark:text-gray-400">
            Seguimiento detallado de tu participación y horas de voluntariado
          </p>
        </div>
        <DatePickerByEvaluationPeriod />
      </div>

      <div className="h-full w-full flex flex-col gap-6">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Total Hours Card */}
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-emerald-100 uppercase tracking-wide">Horas Completadas</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <p className="text-5xl font-bold">{totalVolunteerHours}</p>
                  <p className="text-2xl font-semibold text-emerald-100">/ 100</p>
                </div>
              </div>
              <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-white/20 rounded-full h-2.5">
                <div
                  className="bg-white h-2.5 rounded-full transition-all duration-700"
                  style={{ width: `${Math.min((totalVolunteerHours / 100) * 100, 100)}%` }}
                />
              </div>
              <span className="text-sm font-semibold">{completionRate}%</span>
            </div>
          </div>

          {/* Internal Hours Card */}
          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 border-2 border-green-200 dark:border-green-900">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Internas</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">{internalVolunteerHours}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {totalVolunteerHours > 0 ? `${((internalVolunteerHours / totalVolunteerHours) * 100).toFixed(0)}%` : '0%'} del total
            </p>
          </div>

          {/* External Hours Card */}
          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 border-2 border-blue-200 dark:border-blue-900">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Externas</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">{externalVolunteerHours}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Máximo 40 horas
            </p>
          </div>

          {/* Activities Count Card */}
          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 border-2 border-indigo-200 dark:border-indigo-900">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Actividades</p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">{approvedVolunteers.length}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Completadas y aprobadas
            </p>
          </div>

          {/* Remaining Hours Card */}
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-amber-100 uppercase tracking-wide">Por Completar</p>
                <p className="text-5xl font-bold mt-2">{remaining}h</p>
              </div>
              <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-amber-100">
              {remaining > 0 ? `¡Te quedan ${remaining} horas para alcanzar tu meta!` : '¡Meta alcanzada! 🎉'}
            </p>
          </div>
        </div>

        {/* Secondary Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Registered Card */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total registradas</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                  {totalRegistered}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              Actividades totales registradas
            </p>
          </div>

          {/* Pending Activities Card */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">En revisión</p>
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">
                  {pendingVolunteers}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              Pendientes de aprobación
            </p>
          </div>

          {/* Rejected Activities Card */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Rechazadas</p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">
                  {rejectedVolunteers}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              Actividades no aprobadas
            </p>
          </div>

          {/* Most Common Project Card */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Proyecto frecuente</p>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">
                  {mostCommonProject !== 'N/A' ? parseVolunteerProject(mostCommonProject as any) : 'N/A'}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              Proyecto con más horas
            </p>
          </div>
        </div>


        {/* Charts Section */}
        {volunteerDbList && volunteerDbList.length >= 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Monthly Trend Chart */}
            <div className="lg:col-span-2 bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
                Tendencia mensual de horas
              </h3>
              <AreaChartComponent
                series={monthlySeries}
                title="Horas de Voluntariado"
                xAxysType="category"
              />
            </div>

            {/* Project Breakdown Summary */}
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Desglose por proyecto
              </h3>
              <div className="space-y-3">
                {Object.entries(projectCounts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([project, hours], index) => {
                    const colors = ['bg-emerald-500', 'bg-green-500', 'bg-teal-500', 'bg-cyan-500', 'bg-sky-500', 'bg-blue-500'];
                    const percentage = ((hours / totalVolunteerHours) * 100).toFixed(0);
                    return (
                      <div key={project}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 ${colors[index % colors.length]} rounded-full`}></div>
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{parseVolunteerProject(project as any)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-900 dark:text-white">{hours}h</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">({percentage}%)</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                          <div
                            className={`${colors[index % colors.length]} h-1.5 rounded-full transition-all duration-500`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                {Object.keys(projectCounts).length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                    No hay datos disponibles
                  </p>
                )}
              </div>
            </div>

            {/* Type Distribution Chart */}
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <DonutChartComponent
                data={volunteerDataForCharts.kindOfVolunteer}
                chartTitle="Distribución por Tipo"
              />
            </div>
            <div className='space-y-4'>
              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">
                        Promedio por actividad
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {averageHoursPerActivity.toFixed(1)}h
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {approvedVolunteers.length} completadas
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                  Refuerza si las actividades son profundas o breves.
                </p>
              </div>

              {/* Most Active Month Card */}
              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">
                      Mes más activo
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formattedMostActiveMonth}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Horas registradas
                  </span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {mostActiveMonthHours > 0 ? `${mostActiveMonthHours}h` : 'Sin registros'}
                  </span>
                </div>
              </div>

              {/* Recent Activity Card */}
              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m-4 0h8" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">
                      Horas últimos 30 días
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {last30DaysHours}h
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Mide tu ritmo de voluntariado más reciente.
                </p>
              </div>
            </div>

            {/* Modality Distribution Chart */}
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <DonutChartComponent
                data={volunteerDataForCharts.modality}
                chartTitle="Distribución por Modalidad"
              />
            </div>


          </div>
        )}

        {/* Detailed Table Section */}
        <div className='space-y-4'>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Registro histórico de voluntariado
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Listado completo de todas tus actividades de voluntariado
            </p>
          </div>
        </div>
        <div className="">
          <Table
            tableData={volunteerDataForTable}
            tableColumns={scholarVolunteerAttendanceColumns}
            tableHeadersForSearch={scholarVolunteerAttendanceSearchOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
