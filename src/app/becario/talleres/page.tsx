import Stats from '@/components/scholar/ScholarStats';
import Table from '@/components/table/Table';
import WorkshopColumns from '@/components/table/columns/workshopColumns';
import { workshopDataPlaceholder } from '@/lib/fakeWorkshopData';
import { ScholarAttendance, Workshop, WorkshopSpeaker } from '@prisma/client';

/**
 * Renders the page component with a list of workshops for a specific scholar.
 * @returns The HTML document with the rendered page component.
 */
const page = async () => {
  // const scholarId = 'cljwyi8hl0008uwmkjo6dktty';
  // const workshops = await getWorkshopsByScholar2(scholarId);
  let activitiesDone = 0
  const workshop: (Workshop & {
    speaker: WorkshopSpeaker[];
    scholarAttendance: {
      attendance: ScholarAttendance;
    }[];
  })[] = [
      {
        id: "1",
        title: 'Introduction to React',
        description: 'Learn the basics of React and how to build web applications with it.',
        activity_status: 'DONE',
        speaker: [
          // @ts-ignore
          {
            id: "1",
            first_names: 'John Doe',
            last_names: 'Smith',
          },
        ],
        scholarAttendance: [
          {
            attendance: 'ATTENDED',
          },
        ],
      },
      {
        id: "2",
        title: 'Advanced TypeScript',
        description: 'Take your TypeScript skills to the next level with advanced topics and techniques.',
        activity_status: 'IN_PROGRESS',
        speaker: [
          // @ts-ignore
          {
            id: "2",
            first_names: 'Jane Smith',
            last_names: 'Doe',

          },
        ],
        scholarAttendance: [
          {
            attendance: 'NOT_ATTENDED',
          },
        ],
      },
    ];

  const in_personWorkshops = 0
  const onlineWorkhops = 1

  if (workshop) {
    activitiesDone = workshop.filter(
      (workshop: { scholarAttendance: { attendance: string }[] }) =>
        workshop.scholarAttendance[0].attendance === 'ATTENDED'
    ).length;
  }
  return (
    <div>
      <div className="flex flex-col px-2 xl:gap-4">
        <div className="mb-4 col-span-full xl:mb-2">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
            Listado de talleres
          </h1>
          <div className="h-full  w-full flex flex-col gap-4 pt-4">
            <Stats kindOfActivity="workshop" activitiesDone={activitiesDone} first={in_personWorkshops} second={onlineWorkhops} />
            <Table tableColumns={WorkshopColumns} tableData={workshopDataPlaceholder} />
          </div>
        </div>
      </div>
    </div >
  );
};

export default page;

