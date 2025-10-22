import { DonutChartComponent } from '@/components/charts';
import DatePickerByEvaluationPeriod from '@/components/commons/datePicker/DatePickerByEvaluationBlock';
import Stats from '@/components/scholar/ScholarStats';
import Table from '@/components/table/Table';
import scholarWorkshopAttendanceColumns from '@/components/table/columns/scholar/activityAttendance/workshops/columns';
import createScholarWorkshopAttendanceForTable from '@/components/table/columns/scholar/activityAttendance/workshops/formater';
import scholarWorkshopAttendanceSearchOptions from '@/components/table/columns/scholar/activityAttendance/workshops/searchOptions';
import { WorkshopWithAllData } from '@/components/table/columns/workshopColumns';
import { getServerSession } from '@/lib/auth/authOptions';
import { getWorkhsopsByScholar } from '@/lib/db/utils/Workshops';
import { countWorkshopProperties, formatCountsForCharts } from '@/lib/utils/activityFilters';
import filterActivitiesBySearchParams from '@/lib/utils/datePickerFilters';
import { getAttendedWorkshops } from '@/lib/utils/getAttendedActivities';
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
  const workshopsDbList = (await getWorkhsopsByScholar(session?.id)) as WorkshopWithAllData[];
  const workshops = (await filterActivitiesBySearchParams(
    workshopsDbList,
    searchParams
  )) as WorkshopWithAllData[];
  const workshopsAttended = getAttendedWorkshops(workshops);
  const { skills, years, kinds, modality } = await countWorkshopProperties(workshopsAttended);
  const objectsFormatedForCharts = await formatCountsForCharts({ skills, years, kinds });
  const workshopObjectForTable = createScholarWorkshopAttendanceForTable(workshops);

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
    <div className="flex flex-col gap-1">
      <DatePickerByEvaluationPeriod />
      <h1 className="text-xl ml-4 font-medium sm:text-2xl mb-3 ">
        Registro de actividades formativas
      </h1>
      <div className="h-full w-full flex flex-col gap-4">
        <Stats
          kindOfActivity="workshop"
          activitiesDone={workshopsAttended?.length}
          first={modality.Presencial}
          second={modality.Virtual}
        />
        {workshops && workshops.length >= 1 && (
          <div className="w-full grid md:grid-cols-5  justify-center items-center">
            <div></div>
            <DonutChartComponent
              data={objectsFormatedForCharts.skills}
              chartTitle="Distribución por competencia"
            />

            <DonutChartComponent
              data={objectsFormatedForCharts.kinds}
              chartTitle="Distribución por tipo"
            />
            <DonutChartComponent
              data={objectsFormatedForCharts.years}
              chartTitle="Distribución por año"
            />
          </div>
        )}
        <Table
          filters={filters}
          tableColumns={scholarWorkshopAttendanceColumns}
          tableData={workshopObjectForTable}
          tableHeadersForSearch={scholarWorkshopAttendanceSearchOptions}
        />
      </div>
    </div>
  );
};

export default page;
