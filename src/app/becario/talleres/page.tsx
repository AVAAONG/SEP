import Stats from '@/components/scholar/ScholarStats';
import Table from '@/components/table/Table';
import WorkshopColumns from '@/components/table/columns/workshopColumns';

/**
 * Renders the page component with a list of workshops for a specific scholar.
 * @returns The HTML document with the rendered page component.
 */
const page = async () => {
  // const scholarId = 'cljwyi8hl0008uwmkjo6dktty';
  // const workshops = await getWorkshopsByScholar2(scholarId);

  const workshopDataPlaceholder = [
    {
      title: "Derechos Humanos",
      first_names: "Sherman",
      last_names: "Commendador",
      start_date: "01/08/2023",
      end_date: "01/08/2023",
      pensum: "Ciudadania",
      modality: "Presencial",
      platform: "Oficinas de AVAA",
      year: "I",
      scholarAttendance: "No asistio",
    },
    {
      title: "Liderazgo",
      first_names: "Luis",
      last_names: "Lopez",
      start_date: "12/08/2023",
      end_date: "01/08/2023",
      pensum: "Ciudadania",
      modality: "Presencial",
      platform: "Oficinas de AVAA",
      year: "I",
      scholarAttendance: "Asistio",
    },
    {
      title: "Presentaciones efectivas",
      first_names: "Sandy",
      last_names: "Medrano",
      start_date: "2/08/2023",
      end_date: "01/08/2023",
      pensum: "Ciudadania",
      modality: "Presencial",
      platform: "Oficinas de AVAA",
      year: "I",
      scholarAttendance: "Asistio",
    },
    {
      title: "Bioetica",
      first_names: "Sherman",
      last_names: "Commendador",
      start_date: "10/08/2023",
      end_date: "01/08/2023",
      pensum: "Ciudadania",
      modality: "Presencial",
      platform: "Oficinas de AVAA",
      year: "I",
      scholarAttendance: "No asistio",
    }
  ]


  return (
    <div>
      <div className="flex flex-col px-2 pt-6 xl:gap-4">
        <div className="mb-4 col-span-full xl:mb-2">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
            Listado de talleres
          </h1>
          <div className="h-full  w-full flex flex-col gap-4 pt-4">
            <Stats kindOfActivity="workshop" />
            <Table tableColumns={WorkshopColumns} tableData={workshopDataPlaceholder} />
          </div>
        </div>
      </div>
    </div >
  );
};

export default page;

