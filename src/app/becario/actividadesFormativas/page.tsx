import DateSelector from '@/components/commons/datePicker';
import Stats from '@/components/scholar/ScholarStats';
import Table from '@/components/table/Table';
import scholarWorkshopAttendanceColumns from '@/components/table/columns/scholarWorkshopAttendance';
import { WorkshopWithAllData } from '@/components/table/columns/workshopColumns';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import { getWorkhsopsByScholar } from '@/lib/db/utils/Workshops';
import { createArrayFromObject } from '@/lib/utils';
import { parseSkillFromDatabase } from '@/lib/utils2';
import { ActivityStatus, Modality, Skill, WorkshopYear } from '@prisma/client';
import { getServerSession } from 'next-auth';
import dynamic from 'next/dynamic';

/**
 * Renders the page component with a list of workshops for a specific scholar.
 * @returns The HTML document with the rendered page component.
 */
const PieChartComponent = dynamic(() => import('@/components/charts/Pie'), { ssr: false });

export interface IScholarWorkshopColumns {
  id: string;
  title: string;
  platform: string;
  start_dates: Date[];
  end_dates: Date[];
  modality: Modality;
  skill: Skill;
  activity_status: ActivityStatus;
  attendance: string;
  year: WorkshopYear[];
  speakerNames: string[];
  speakerImages: (string | null)[];
  speakerIds: (string | null)[];
  speakerCompany: (string | null)[];
}

const createWorkshopObject = (workshops: WorkshopWithAllData[]): IScholarWorkshopColumns[] => {
  return workshops.map((workshop): IScholarWorkshopColumns => {
    return {
      id: workshop.id,
      title: workshop.title,
      platform: workshop.platform,
      start_dates: workshop.start_dates,
      end_dates: workshop.end_dates,
      modality: workshop.modality,
      skill: workshop.asociated_skill,
      activity_status: workshop.activity_status,
      attendance: workshop.scholar_attendance[0].attendance,
      year: workshop.year,
      speakerNames: workshop.speaker.map(
        (speaker) => `${speaker.first_names.split(' ')[0]} ${speaker.last_names.split(' ')[0]}`
      ),
      speakerImages: workshop.speaker.map((speaker) => speaker.image),
      speakerIds: workshop.speaker.map((speaker) => speaker.id),
      speakerCompany: workshop.speaker.map((speaker) => speaker.job_company),
    };
  });
};

const page = async ({
  searchParams,
}: {
  searchParams?: { year: string; month: string; quarter: string };
}) => {
  const session = await getServerSession(authOptions);
  const workshops = await getWorkhsopsByScholar(session?.scholarId);
  const workshopsAttended = workshops.filter(
    (workshop) => workshop.scholar_attendance[0].attendance === 'ATTENDED'
  );
  const in_personWorkshops = workshopsAttended.filter(
    (workshop) => workshop.modality === 'IN_PERSON'
  ).length;
  const onlineWorkhops = workshopsAttended.filter(
    (workshop) => workshop.modality === 'ONLINE'
  ).length;

  const w = createWorkshopObject(workshops);
  const workshopsBySkillObj =
    workshopsAttended?.reduce(
      (acc, workshop) => {
        const skill = parseSkillFromDatabase(workshop.asociated_skill);
        acc[skill] = (acc[skill] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ) || {};

  const workshopsBySkill = createArrayFromObject(workshopsBySkillObj);

  const workshopsByKindObj =
    workshopsAttended?.reduce(
      (acc, workshop) => {
        const skill = workshop.kindOfWorkshop;
        acc[skill] = (acc[skill] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ) || {};

  const workshopsByKind = createArrayFromObject(workshopsByKindObj);
  const workshopsByYearObj =
    workshopsAttended?.reduce(
      (acc, workshop) => {
        const skill = workshop.year.toString();
        acc[skill] = (acc[skill] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ) || {};

  const workshopsByYear = createArrayFromObject(workshopsByYearObj);

  return (
    <div className="flex flex-col md:p-4 gap-1">
      <DateSelector />
      <h1 className="text-xl font-medium sm:text-2xl ">Listado de actividades formativas</h1>
      <div className="h-full w-full flex flex-col gap-4">
        <Stats
          kindOfActivity="workshop"
          activitiesDone={workshopsAttended?.length}
          first={in_personWorkshops}
          second={onlineWorkhops}
        />
        <div className="w-full grid grid-cols-3 justify-center items-center rounded-lg">
          <div className="w-full">
            <PieChartComponent data={workshopsBySkill} />
          </div>
          <div className="w-full">
            <PieChartComponent data={workshopsByKind} />
          </div>
          <div className="w-full">
            <PieChartComponent data={workshopsByYear} />
          </div>
        </div>
        <Table
          tableColumns={scholarWorkshopAttendanceColumns}
          tableData={w || []}
          tableHeadersForSearch={[]}
        />
      </div>
    </div>
  );
};

export default page;
