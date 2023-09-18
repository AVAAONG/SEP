import Stats from '@/components/scholar/ScholarStats';
import TempChatTable from '@/components/table/tempChatTable';

/**
 * Renders the page component with a list of workshops for a specific scholar.
 * @returns The HTML document with the rendered page component.
 */
const page = async () => {
  // const scholarId = 'cljwyi8hl0008uwmkjo6dktty';
  // const workshops = await getWorkshopsByScholar2(scholarId);

  const workshopDataPlaceholder = [
    {
      title: "Let's learn grammar",
      first_names: 'Atenea',
      last_names: 'Gimenez',
      start_date: '01/08/2023',
      end_date: '01/08/2023',
      level: 'Basico',
      modality: 'Presencial',
      platform: 'Oficinas de AVAA',
      scholarAttendance: 'Asistio',
    },
    {
      title: 'Love Languages',
      first_names: 'Asxel',
      last_names: 'Ramirez',
      start_date: '12/08/2023',
      end_date: '01/08/2023',
      level: 'Basico',
      modality: 'Presencial',
      platform: 'Oficinas de AVAA',
      scholarAttendance: 'Asistio',
    },
    {
      title: 'SUSI experience',
      first_names: 'Noris',
      last_names: 'Moreno',
      start_date: '2/08/2023',
      end_date: '01/08/2023',
      level: 'Intermedio',
      modality: 'Presencial',
      platform: 'Oficinas de AVAA',
      scholarAttendance: 'No asistio',
    },
    {
      title: "Let's learn grammar",
      first_names: 'Atenea',
      last_names: 'Gimenez',
      start_date: '10/08/2023',
      end_date: '01/08/2023',
      level: 'Avanzado',
      modality: 'Presencial',
      platform: 'Oficinas de AVAA',
      scholarAttendance: 'Asistio',
    },
  ];

  return (
    <div>
      <div className="flex flex-col px-2 pt-6 xl:gap-4">
        <div className="mb-4 col-span-full xl:mb-2">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
            Listado de talleres
          </h1>
          <div className="h-full w-full flex flex-col gap-4 pt-4">
            <Stats kindOfActivity="workshop" />
            <TempChatTable tableData={workshopDataPlaceholder} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
