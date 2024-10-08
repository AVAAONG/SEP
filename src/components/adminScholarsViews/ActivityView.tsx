import { getScholarsWithActivities } from '@/lib/db/utils/Workshops';
import { formatCountsForChartsActivityExpe } from '@/lib/utils/activityFilters';
import { filterActivitiesBySearchParamsPeriod } from '@/lib/utils/datePickerFilters';
import { countScholarActivitiesProperties } from '@/lib/utils/scholarCounter';
import { DonutChartComponent } from '../charts';
import DatePickerByEvaluationPeriod from '../commons/datePicker/DatePickerByEvaluationBlock';
import FollowUpExportButton from '../exportButtons/FollowUpExportButton';
import Table from '../table/Table';
import scholarActivitiesInformationColumns from '../table/columns/scholars/activitiesInfo/columns';
import { formatScholarsActivitiesForActivitiesTable } from '../table/columns/scholars/activitiesInfo/formater';

const ActivitiesInfo = async ({
  searchParams,
}: {
  searchParams?: { year: string; month: string; quarter: string };
}) => {
  const scholars = await getScholarsWithActivities();
  const df = await Promise.all(
    scholars.map(async (scholar) => {
      const f = await filterActivitiesBySearchParamsPeriod(
        scholar.program_information.attended_chats.map((chat) => chat.chat),
        searchParams
      );
      const g = await filterActivitiesBySearchParamsPeriod(
        scholar.program_information.attended_workshops?.map((workshop) => workshop.workshop),
        searchParams
      );
      const tt = await filterActivitiesBySearchParamsPeriod(
        scholar.program_information.volunteerAttendance?.map((volunteer) => volunteer.volunteer),
        searchParams
      );
      return {
        ...scholar,
        program_information: {
          ...scholar.program_information,
          attended_chats: f,
          attended_workshops: g,
          volunteerAttendance: tt,
        },
      };
    })
  );

  const data = await formatScholarsActivitiesForActivitiesTable(df);
  const scholarsPropertiesCount = countScholarActivitiesProperties(df);
  const dataForCharts = await formatCountsForChartsActivityExpe(scholarsPropertiesCount);
  const datatoExport = data.map((d) => {
    return {
      name: d.name,
      dni: d.dni,
      whatsAppNumber: d.whatsAppNumber,
      email: d.email,
      doneWorkshops: d.doneWorkshops,
      doneChats: d.doneChats,
      doneVolunteerHours: d.doneVolunteerHours,
      scholarGrade: d.scholarGrade ? d.scholarGrade : 0,
    };
  });

  return (
    <>
      <DatePickerByEvaluationPeriod />
      <div className="flex flex-col w-full h-full bg-white dark:bg-black rounded-lg py-4 justify-center shadow-md ">
        <div className="w-full grid md:grid-cols-5 justify-center items-center">
          {/* Necesary div to center the charts */} <div></div>
          <DonutChartComponent
            data={dataForCharts.workshopsPercentage}
            chartTitle="% de actividades formativas completadas"
          />
          <DonutChartComponent
            data={dataForCharts.chatPercentage}
            chartTitle="% de chat clubs completados"
          />
          <DonutChartComponent
            data={dataForCharts.volunteerPercentage}
            chartTitle="% de horas de voluntariado completado"
          />
        </div>
      </div>
      <h2 className="font-bold  uppercase text-base tracking-wide px-4 mt-4">Base de datos</h2>
      <div className="w-full h-full">
        <Table
          tableColumns={scholarActivitiesInformationColumns}
          tableData={data}
          tableHeadersForSearch={[]}
        >
          {/* <FollowUpExportButton datatoExport={datatoExport} /> */}
        </Table>
      </div>
    </>
  );
};

export default ActivitiesInfo;
