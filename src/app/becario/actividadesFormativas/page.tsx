import Stats from '@/components/scholar/ScholarStats';
import { getWorkshopsByScholar2 } from '@/lib/db/utils/Workshops';

/**
 * Renders the page component with a list of workshops for a specific scholar.
 * @returns The HTML document with the rendered page component.
 */
const page = async () => {
  const scholarId = 'JU-OTULESWjDHcEKTMlb-';
  const workshops = await getWorkshopsByScholar2(scholarId);
  const workshopsAttended = workshops.filter((workshop) => workshop.attendance === 'ATTENDED');
  const in_personWorkshops = 0;
  const onlineWorkhops = 1;

  return (
    <div className="flex flex-col md:p-4 gap-1">
      <h1 className="text-xl font-medium sm:text-2xl ">Listado de actividades formativas</h1>
      <div className="h-full w-full flex flex-col gap-4">
        <Stats
          kindOfActivity="workshop"
          activitiesDone={workshopsAttended?.length}
          first={in_personWorkshops}
          second={onlineWorkhops}
        />
        agregar: conteo por ano del taller, conteo por componente, conteo por tipo de actividad
        formativa (taller, curso, conferencia, etc)
        {/* <Table tableColumns={WorkshopColumns} tableData={workshopDataPlaceholder} /> */}
      </div>
    </div>
  );
};

export default page;
