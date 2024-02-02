import DateSelector from '@/components/commons/datePicker';
import Stats from '@/components/scholar/ScholarStats';
import Table from '@/components/table/Table';
import { ChatsWithAllData } from '@/components/table/columns/chatsColumns';
import scholarChatAttendaceColumns from '@/components/table/columns/scholarChatAttendance';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import {
  filterActivityByMonth,
  filterActivityByQuarter,
  filterActivityByYear,
} from '@/lib/datePickerFilters';
import { getChatsByScholar } from '@/lib/db/utils/Workshops';
import { createArrayFromObject } from '@/lib/utils';
import { parseChatLevelFromDatabase, parseModalityFromDatabase } from '@/lib/utils2';
import { ActivityStatus, Level, Modality } from '@prisma/client';
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
  level: Level;
  attendance: string;
  activity_status: ActivityStatus;
  speakerNames: string[];
  speakerImages: (string | null)[];
  speakerIds: (string | null)[];
  speakerCompany: (string | null)[];
}

const createChatObject = (chats: ChatsWithAllData[]): IScholarWorkshopColumns[] => {
  return chats.map((chat): IScholarWorkshopColumns => {
    return {
      id: chat.id,
      title: chat.title,
      platform: chat.platform,
      start_dates: chat.start_dates,
      end_dates: chat.end_dates,
      modality: chat.modality,
      level: chat.level,
      activity_status: chat.activity_status,
      attendance: chat.scholar_attendance[0] ? chat.scholar_attendance[0].attendance : 'SPEAKER',
      speakerNames: chat.speaker.map(
        (speaker) => `${speaker.first_names.split(' ')[0]} ${speaker.last_names.split(' ')[0]}`
      ),
      speakerImages: chat.speaker.map((speaker) => speaker.image),
      speakerIds: chat.speaker.map((speaker) => speaker.id),
      speakerCompany: chat.speaker.map((speaker) => speaker.job_company),
    };
  });
};

const page = async ({
  searchParams,
}: {
  searchParams?: { year: string; month: string; quarter: string };
}) => {
  const session = await getServerSession(authOptions);
  const chatDbList = await getChatsByScholar(session?.scholarId);
  let workshops = [];
  if (searchParams?.year) {
    const workshopsFilteredByYear = filterActivityByYear(chatDbList, Number(searchParams?.year));
    workshops = workshopsFilteredByYear;
    if (searchParams?.quarter) {
      workshops = filterActivityByQuarter(workshopsFilteredByYear, Number(searchParams?.quarter));
    }
    if (searchParams?.month) {
      workshops = filterActivityByMonth(workshopsFilteredByYear, Number(searchParams?.month));
    }
  } else {
    workshops = chatDbList;
  }

  const workshopsAttended = workshops.filter((workshop) => {
    const scholarAttendance = workshop.scholar_attendance[0];
    return scholarAttendance ? scholarAttendance.attendance === 'ATTENDED' : 'NOT_ATTENDED';
  });

  const onlineWorkhops = workshopsAttended.filter(
    (workshop) => workshop.modality === 'ONLINE'
  ).length;

  const in_personWorkshops = workshopsAttended.filter(
    (workshop) => workshop.modality === 'IN_PERSON'
  ).length;

  const w = createChatObject(workshops);
  const workshopsBySkillObj =
    workshopsAttended?.reduce(
      (acc, workshop) => {
        const skill = parseChatLevelFromDatabase(workshop.level);
        acc[skill] = (acc[skill] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ) || {};

  const workshopsBySkill = createArrayFromObject(workshopsBySkillObj);

  const workshopsByKindObj =
    workshopsAttended?.reduce(
      (acc, workshop) => {
        const skill = parseModalityFromDatabase(workshop.modality);
        acc[skill] = (acc[skill] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ) || {};

  const workshopsByKind = createArrayFromObject(workshopsByKindObj);

  return (
    <div className="flex flex-col md:p-4 gap-1">
      <DateSelector />
      <h1 className="text-xl font-medium sm:text-2xl mb-3 ">Registro de chat clubs de inglés</h1>
      <div className="h-full w-full flex flex-col gap-4">
        <Stats
          kindOfActivity="chat"
          activitiesDone={workshopsAttended?.length}
          first={in_personWorkshops}
          second={onlineWorkhops}
        />
        {workshops && workshops.length >= 1 && (
          <div className="w-full  grid grid-cols-4 justify-center items-center rounded-lg">
            <div></div>
            <div className="w-full">
              <h3 className="truncate font-semibold text-center text-sm">
                Distribucion de actividades según su nivel
              </h3>
              <PieChartComponent data={workshopsBySkill} />
            </div>
            <div className="w-full">
              <h3 className="truncate font-semibold text-center text-sm">
                Distribucion de actividades según su modalidad
              </h3>
              <PieChartComponent data={workshopsByKind} />
            </div>
          </div>
        )}
        <Table
          tableColumns={scholarChatAttendaceColumns}
          tableData={w || []}
          tableHeadersForSearch={[]}
        />
      </div>
    </div>
  );
};

export default page;
