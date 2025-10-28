import { AreaChartComponent } from '@/components/charts';
import DatePickerByEvaluationPeriod from '@/components/commons/datePicker/DatePickerByEvaluationBlock';
import Table from '@/components/table/Table';
import scholarWorkshopAttendanceColumns from '@/components/table/columns/scholar/activityAttendance/workshops/columns';
import createScholarWorkshopAttendanceForTable from '@/components/table/columns/scholar/activityAttendance/workshops/formater';
import scholarWorkshopAttendanceSearchOptions from '@/components/table/columns/scholar/activityAttendance/workshops/searchOptions';
import { WorkshopWithAllData } from '@/components/table/columns/workshopColumns';
import { getServerSession } from '@/lib/auth/authOptions';
import { getWorkhsopsByScholar } from '@/lib/db/utils/Workshops';
import { countActivityByModality } from '@/lib/utils/activityFilters';
import filterActivitiesBySearchParams from '@/lib/utils/datePickerFilters';
import { getAttendedWorkshops } from '@/lib/utils/getAttendedActivities';
import { parseSkillFromDatabase } from '@/lib/utils2';
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
  if (!session) return null;
  const workshopsDbList = (await getWorkhsopsByScholar(session.id)) as WorkshopWithAllData[];
  const workshops = (await filterActivitiesBySearchParams(
    workshopsDbList,
    searchParams
  )) as WorkshopWithAllData[];
  const workshopsAttended = getAttendedWorkshops(workshops);
  const { inPersonActivities, onlineActivities, hibridActivities } = await countActivityByModality(workshopsAttended);
  const workshopObjectForTable = createScholarWorkshopAttendanceForTable(workshops);

  // Calculate additional statistics
  const totalEnrolled = workshops.length;
  const attendanceRate = totalEnrolled > 0 ? ((workshopsAttended.length / totalEnrolled) * 100).toFixed(1) : '0';
  const remaining = Math.max(0, 10 - workshopsAttended.length);

  // Calculate skill distribution stats
  const skillCounts = workshopsAttended.reduce((acc, workshop) => {
    const skill = workshop.asociated_skill;
    acc[skill] = (acc[skill] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostCommonSkill = Object.entries(skillCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  // Calculate not attended workshops
  const notAttendedWorkshops = workshops.filter(workshop =>
    workshop.scholar_attendance.some(att => att.attendance === 'NOT_ATTENDED')
  ).length;

  // Calculate justified absences
  const justifiedAbsences = workshops.filter(workshop =>
    workshop.scholar_attendance.some(att => att.attendance === 'JUSTIFY')
  ).length;

  const canceledAbsences = workshops.filter(workshop =>
    workshop.scholar_attendance.some(att => att.attendance === 'CANCELLED')
  ).length;

  // Calculate unique speakers
  const uniqueSpeakers = new Set(
    workshopsAttended.flatMap(workshop => workshop.speaker.map(s => s.id))
  ).size;

  // Calculate monthly attendance trend
  const monthlyData = workshopsAttended.reduce((acc, workshop) => {
    const date = new Date(workshop.start_dates[0]);
    const month = date.getMonth();
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const monthlySeries = [{
    name: 'Talleres asistidos',
    data: Array.from({ length: 12 }, (_, i) => ({
      x: new Date(0, i).toLocaleString('es-ES', { month: 'short' }).toUpperCase(),
      y: monthlyData[i] || 0,
    })),
    color: '#3b82f6',
  }];

  // Prepare filter definitions using distinct property keys
  const filters = [
    {
      id: 'skill',
      label: 'Competencia',
      options: [
        { value: 'Liderazgo', label: 'Liderazgo' },
        { value: 'Ejercicio Ciudadano', label: 'Ejercicio Ciudadano' },
        { value: 'Gerencia de sí mismo', label: ' Gerencia de sí mismo' },
        { value: 'TIC', label: 'TIC' },
        { value: 'Emprendimiento', label: 'Emprendimiento' },
        { value: 'Trabajo en equipo', label: 'Trabajo en equipo' },
      ],
    },
    {
      id: 'modality',
      label: 'Modalidad',
      options: [
        { value: 'Presencial', label: 'Presencial' },
        { value: 'Virtual', label: 'Virtual' },
        { value: 'Híbrido', label: 'Híbrido' },
      ],
    },
    {
      id: 'activityStatus',
      label: 'Estado de la actividad',
      options: [
        { value: 'Programado', label: 'Programado' },
        { value: 'Realizado', label: 'Realizado' },
        { value: 'Suspendido', label: 'Suspendido' },
      ],
    },
    {
      id: 'attendance',
      label: 'Asistencia',
      options: [
        { value: 'Inscrito', label: 'Inscrito' },
        { value: 'Asistió', label: 'Asistió' },
        { value: 'No asistió', label: 'No asistió' },
        { value: 'Justificado', label: 'Justificado' },
        { value: 'Cancelado', label: 'Cancelado' },
        { value: 'Facilitador', label: 'Facilitador' },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Registro de actividades formativas
          </h1>
          <p className="mt-1 text-xs md:text-sm text-gray-600 dark:text-gray-400">
            Seguimiento detallado de tu participación y progreso en las actividades formativas
          </p>
        </div>
        <DatePickerByEvaluationPeriod />
      </div>

      <div className="h-full w-full flex flex-col gap-6">
        {/* Main Stats Grid - improved mobile responsiveness */}
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-3">
          {/* Total Attended Card */}
          <div className="col-span-3 lg:col-span-1 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-xl shadow-lg p-4 md:p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-blue-100 uppercase tracking-wide">Talleres Completados</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <p className="text-3xl md:text-5xl font-bold">{workshopsAttended?.length}</p>
                  <p className="text-lg md:text-2xl font-semibold text-blue-100">/ 10</p>
                </div>
              </div>
              <div className="w-10 h-10 md:w-14 md:h-14 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-white/20 rounded-full h-2.5">
                <div
                  className="bg-white h-2.5 rounded-full transition-all duration-700"
                  style={{ width: `${Math.min((workshopsAttended?.length / 10) * 100, 100)}%` }}
                />
              </div>
              <span className="text-xs md:text-sm font-semibold">{((workshopsAttended?.length / 10) * 100).toFixed(0)}%</span>
            </div>
          </div>

          {/* In-Person Card */}
          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-4 md:p-6 border-2 border-green-200 dark:border-green-900">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Presenciales</p>
            <p className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white">{inPersonActivities}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {workshopsAttended.length > 0 ? `${((inPersonActivities / workshopsAttended.length) * 100).toFixed(0)}%` : '0%'} del total
            </p>
          </div>

          {/* Online Card */}
          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-4 md:p-6 border-2 border-blue-200 dark:border-blue-900">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Virtuales</p>
            <p className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white">{onlineActivities}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {workshopsAttended.length > 0 ? `${((onlineActivities / workshopsAttended.length) * 100).toFixed(0)}%` : '0%'} del total
            </p>
          </div>

          {/* Hybrid Card */}
          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-4 md:p-6 border-2 border-purple-200 dark:border-purple-900">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                </svg>
              </div>
            </div>
            <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Híbridas</p>
            <p className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white">{hibridActivities}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {workshopsAttended.length > 0 ? `${((hibridActivities / workshopsAttended.length) * 100).toFixed(0)}%` : '0%'} del total
            </p>
          </div>

          {/* Remaining Card */}
          <div className="col-span-3 lg:col-span-1 bg-gradient-to-br from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 rounded-xl shadow-lg p-4 md:p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs md:text-sm font-medium text-amber-100 uppercase tracking-wide">Por Completar</p>
                <p className="text-3xl md:text-5xl font-bold mt-2">{remaining}</p>
              </div>
              <div className="w-10 h-10 md:w-14 md:h-14 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-amber-100">
              {remaining > 0 ? `¡Te quedan ${remaining} taller${remaining !== 1 ? 'es' : ''} para alcanzar tu meta!` : '¡Meta alcanzada! 🎉'}
            </p>
          </div>
        </div>

        {/* Secondary Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Total Enrolled Card */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-4 md:p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Total Inscritos</p>
                <p className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                  {totalEnrolled}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              Talleres a los que te has inscrito
            </p>
          </div>

          {/* Attendance Rate Card */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-4 md:p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Tasa de asistencia</p>
                <p className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">
                  {attendanceRate}%
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              {workshopsAttended?.length} de los talleres inscritos
            </p>
          </div>

          {/* Not Attended Card */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-4 md:p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Inasistencias</p>
                <p className="text-2xl md:text-3xl font-bold text-red-600 dark:text-red-400 mt-2">
                  {notAttendedWorkshops + justifiedAbsences + canceledAbsences}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              {justifiedAbsences > 0 ? `${justifiedAbsences} justificadas` : 'Sin justificaciones'}
              {canceledAbsences > 0 ? `, ${canceledAbsences} canceladas` : ''}
            </p>
          </div>

          {/* Most Common Skill Card */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-4 md:p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Competencia frecuente</p>
                <p className="text-xl md:text-2xl font-bold text-purple-600 dark:text-purple-400 mt-2">
                  {parseSkillFromDatabase(mostCommonSkill)}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              Competencia más trabajada
            </p>
          </div>
        </div>

        {/* Charts Section */}
        {workshops && workshops.length >= 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Monthly Trend Chart */}
            <div className="lg:col-span-2 bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
                Tendencia mensual de asistencia
              </h3>
              <AreaChartComponent
                series={monthlySeries}
                title="Número de Talleres"
                xAxysType="category"
              />
            </div>


            {/* Skill Breakdown Summary */}
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Desglose por Competencia
              </h3>
              <div className="space-y-3">
                {Object.entries(skillCounts)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 6)
                  .map(([skill, count], index) => {
                    const colors = ['bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-rose-500', 'bg-red-500'];
                    const percentage = ((count / workshopsAttended.length) * 100).toFixed(0);
                    return (
                      <div key={skill}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 ${colors[index % colors.length]} rounded-full`}></div>
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{parseSkillFromDatabase(skill)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-900 dark:text-white">{count}</span>
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
                {Object.keys(skillCounts).length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                    No hay datos disponibles
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Detailed Table Section */}
        <div className='space-y-4'>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Registro histórico de talleres
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Listado completo de todas tus actividades formativas
            </p>
          </div>
        </div>
        <div className="">
          <Table
            filters={filters}
            tableColumns={scholarWorkshopAttendanceColumns}
            tableData={workshopObjectForTable}
            tableHeadersForSearch={scholarWorkshopAttendanceSearchOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
