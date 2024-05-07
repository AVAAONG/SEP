import { getScholarsWithActivities } from '@/lib/db/utils/Workshops';
import { formatCountsForChartsActivityExpe } from '@/lib/utils/activityFilters';
import filterActivitiesBySearchParams from '@/lib/utils/datePickerFilters';
import { countScholarActivitiesProperties } from '@/lib/utils/scholarCounter';
import { DonutChartComponent } from '../charts';
import DateSelector from '../commons/datePicker';
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
      const f = await filterActivitiesBySearchParams(
        scholar.program_information.attended_chats.map((chat) => chat.chat),
        searchParams
      );
      const g = await filterActivitiesBySearchParams(
        scholar.program_information.attended_workshops?.map((workshop) => workshop.workshop),
        searchParams
      );
      const tt = await filterActivitiesBySearchParams(
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
  console.log(df[2].program_information);

  const data = await formatScholarsActivitiesForActivitiesTable(df);
  const scholarsPropertiesCount = countScholarActivitiesProperties(df);
  const dataForCharts = await formatCountsForChartsActivityExpe(scholarsPropertiesCount);

  return (
    <>
      <DateSelector />
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
        />
      </div>
    </>
  );
};

export default ActivitiesInfo;
