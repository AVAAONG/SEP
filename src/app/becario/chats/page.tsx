import { AreaChartComponent, DonutChartComponent } from '@/components/charts';
import DatePickerByEvaluationPeriod from '@/components/commons/datePicker/DatePickerByEvaluationBlock';
import Table from '@/components/table/Table';
import scholarChatAttendaceColumns from '@/components/table/columns/scholar/activityAttendance/chats/columns';
import createScholarChatAttendanceForTable from '@/components/table/columns/scholar/activityAttendance/chats/formater';
import scholarChatAttendanceSearchOptions from '@/components/table/columns/scholar/activityAttendance/chats/searchOptions';
import { getServerSession } from '@/lib/auth/authOptions';
import {
  countActivityByModality,
  countChatProperties,
  formatCountsForCharts,
} from '@/lib/utils/activityFilters';
import { getAttendedChats } from '@/lib/utils/getAttendedActivities';
import { parseChatLevelFromDatabase } from '@/lib/utils2';
import { getChatsByScholar } from '@/lib2/chats';

const page = async ({
  searchParams,
}: {
  searchParams?: {
    startDate?: string;
    endDate?: string;
    preset?: string;
  };
}) => {
  const session = await getServerSession();
  if (!session) return null;
  const chats = await getChatsByScholar(session.id, searchParams);
  const attendedChat = getAttendedChats(chats, session.id);
  const { inPersonActivities, onlineActivities, hibridActivities } = await countActivityByModality(attendedChat);
  const { level, modality } = await countChatProperties(attendedChat);
  const objectsFormatedForCharts = await formatCountsForCharts({ level, modality });
  const chatObjectForTable = createScholarChatAttendanceForTable(chats, session.id);

  // Calculate additional statistics
  const totalEnrolled = chats.length;
  const attendanceRate = totalEnrolled > 0 ? ((attendedChat.length / totalEnrolled) * 100).toFixed(1) : '0';
  const remaining = Math.max(0, 10 - attendedChat.length);

  // Calculate level distribution stats
  const levelCounts = attendedChat.reduce((acc, chat) => {
    const level = chat.level;
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostCommonLevel = Object.entries(levelCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  // Calculate not attended chats
  const notAttendedChats = chats.filter(chat =>
    chat.scholar_attendance.some(att => att.attendance === 'NOT_ATTENDED')
  ).length;

  // Calculate justified absences
  const justifiedAbsences = chats.filter(chat =>
    chat.scholar_attendance.some(att => att.attendance === 'JUSTIFY')
  ).length;
  const canceledAbsences = chats.filter(chat =>
    chat.scholar_attendance.some(att => att.attendance === 'CANCELLED')
  ).length;

  // Calculate monthly attendance trend
  const monthlyData = attendedChat.reduce((acc, chat) => {
    const date = new Date(chat.start_dates[0]);
    const month = date.getMonth();
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const monthlySeries = [{
    name: 'Chats asistidos',
    data: Array.from({ length: 12 }, (_, i) => ({
      x: new Date(0, i).toLocaleString('es-ES', { month: 'short' }).toUpperCase(),
      y: monthlyData[i] || 0,
    })),
    color: '#10b981',
  }];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Registro de chat clubs de inglés
          </h1>
          <p className="mt-1 text-xs md:text-sm text-gray-600 dark:text-gray-400">
            Seguimiento detallado de tu participación y progreso en los chat clubs
          </p>
        </div>
        <DatePickerByEvaluationPeriod />
      </div>
      <div className="h-full w-full flex flex-col gap-6">
        {/* Main Stats Grid - improved mobile responsiveness */}
        <div className="grid grid-cols-3  lg:grid-cols-5 gap-3">
          {/* Total Attended Card */}
          <div className="col-span-3 lg:col-span-1 bg-gradient-to-br from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 rounded-xl shadow-lg p-4 md:p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-red-100 uppercase tracking-wide">Chats Completados</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <p className="text-3xl md:text-5xl font-bold">{attendedChat?.length}</p>
                  <p className="text-lg md:text-2xl font-semibold text-red-100">/ 10</p>
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
                  style={{ width: `${Math.min((attendedChat?.length / 10) * 100, 100)}%` }}
                />
              </div>
              <span className="text-xs md:text-sm font-semibold">{((attendedChat?.length / 10) * 100).toFixed(0)}%</span>
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
              {totalEnrolled > 0 ? `${((inPersonActivities / attendedChat.length) * 100).toFixed(0)}%` : '0%'} del total
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
              {totalEnrolled > 0 ? `${((onlineActivities / attendedChat.length) * 100).toFixed(0)}%` : '0%'} del total
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
              {totalEnrolled > 0 ? `${((hibridActivities / attendedChat.length) * 100).toFixed(0)}%` : '0%'} del total
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
              {remaining > 0 ? `¡Te quedan ${remaining} chat${remaining !== 1 ? 's' : ''} para alcanzar tu meta!` : '¡Meta alcanzada! 🎉'}
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
                <p className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{totalEnrolled}</p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              Chats a los que te has inscrito
            </p>
          </div>

          {/* Attendance Rate Card */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-4 md:p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Tasa de asistencia</p>
                <p className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">{attendanceRate}%</p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              {attendedChat?.length} De los chats inscritos
            </p>
          </div>

          {/* Not Attended Card */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-4 md:p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Inasistencias</p>
                <p className="text-2xl md:text-3xl font-bold text-red-600 dark:text-red-400 mt-2">{notAttendedChats + justifiedAbsences + canceledAbsences}</p>
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

          {/* Most Common Level Card */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-4 md:p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Nivel frecuente</p>
                <p className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">{parseChatLevelFromDatabase(mostCommonLevel)}</p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              Nivel más asistido
            </p>
          </div>
        </div>


        {/* Charts Section */}
        {chats && chats.length >= 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Monthly Trend Chart */}
            <div className="lg:col-span-2 bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
                Tendencia mensual de asistencia
              </h3>
              <AreaChartComponent
                series={monthlySeries}
                title="Número de Chats"
                xAxysType="category"
              />
            </div>

            {/* Level Distribution Chart */}
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <DonutChartComponent
                data={objectsFormatedForCharts.level}
                chartTitle="Distribución por Nivel"
              />
            </div>

          </div>
        )}

        {/* Detailed Table Section */}
        <div className='space-y-4'>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Registro histórico de chats
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Listado completo de todos tus chat clubs de inglés
            </p>
          </div>
        </div>
        <div className="">
          <Table
            tableColumns={scholarChatAttendaceColumns}
            tableData={chatObjectForTable}
            tableHeadersForSearch={scholarChatAttendanceSearchOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
