import PublicAccordion from '@/components/PublicAccordion';
import Table from '@/components/table/Table';
import scholarPublicWorkshopAttendanceColumns from '@/components/table/columns/scholarWorkshopPublicAttendance';
import { WorkshopWithAllData } from '@/components/table/columns/workshopColumns';
import { getScholarWithAllData } from '@/lib/db/utils/users';
import { getCollageName } from '@/lib/parseFromDatabase';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from 'public/svgs/SocialNetworks';

const createWorkshopObject = (workshops: WorkshopWithAllData[]) => {
  return workshops.map((workshop) => {
    return {
      id: workshop.id,
      title: workshop.title,
      platform: workshop.platform,
      start_dates: workshop.startDates,
      end_dates: workshop.endDates,
      modality: workshop.modality,
      skill: workshop.skill,
      activity_status: workshop.status,
      attendance: workshop.scholar_attendance,
      year: workshop.year,
    };
  });
};
function getTotalHours(workshops: { startDates: Date[]; endDates: Date[]; skill: string }[]) {
  const totalHoursBySkill: { [skill: string]: number } = {};
  let totalHours = 0;

  workshops.forEach((workshop) => {
    workshop.startDates.forEach((startDate, index) => {
      const endDate = workshop.endDates[index];

      const duration = moment.duration(moment(endDate).diff(moment(startDate)));
      const durationInMinutes = duration.asMinutes();

      const academicHourInMinutes = 45;
      const durationInAcademicHours = durationInMinutes / academicHourInMinutes;
      totalHours += Number(durationInAcademicHours.toFixed());

      if (totalHoursBySkill[workshop.skill]) {
        totalHoursBySkill[workshop.skill] += Number(durationInAcademicHours.toFixed());
      } else {
        totalHoursBySkill[workshop.skill] = Number(durationInAcademicHours.toFixed());
      }
    });
  });

  return [totalHours, totalHoursBySkill];
}
const page = async ({
  params,
  searchParams,
}: {
  params: { scholarId: string };
  searchParams: { actividad: string };
}) => {
  const scholarId = params?.scholarId;
  const scholar = await getScholarWithAllData(scholarId);
  const name = `${scholar?.first_names.split(' ')[0]} ${scholar?.last_names.split(' ')[0]} `;
  const scholarGender = scholar?.gender === 'F' ? 'Becaria' : 'Becario';
  const { twitter_user, facebook_user, instagram_user, linkedin_user, program_information } =
    scholar || {};

  const workshops = program_information?.attended_workshops
    .filter((attendance) => {
      return (
        attendance.attendance === 'ATTENDED' &&
        (attendance.workshop.activity_status === 'DONE' ||
          attendance.workshop.activity_status === 'ATTENDANCE_CHECKED')
      );
    })
    .map((attendance) => {
      const {
        title,
        start_dates,
        end_dates,
        activity_status,
        asociated_skill,
        year,
        modality,
        platform,
        id,
      } = attendance.workshop;
      return {
        id,
        title,
        modality,
        platform,
        startDates: start_dates,
        endDates: end_dates,
        status: activity_status,
        skill: asociated_skill,
        scholar_attendance: attendance.attendance,
        year,
      };
    });
  const chats = program_information?.attended_chats
    .filter((attendance) => {
      return (
        attendance.attendance === 'ATTENDED' &&
        (attendance.chat.activity_status === 'DONE' ||
          attendance.chat.activity_status === 'ATTENDANCE_CHECKED')
      );
    })
    .map((attendance) => {
      const { title, start_dates, end_dates, activity_status, level, modality, platform, id } =
        attendance.chat;
      return {
        id,
        title,
        modality,
        platform,
        startDates: start_dates,
        endDates: end_dates,
        status: activity_status,
        skill: level,
        scholar_attendance: attendance.attendance,
      };
    });
  const workshopObj = createWorkshopObject(workshops);
  const [totalHours, totalHoursBySkill] = getTotalHours(workshops);
  const [chatTotalHours, chatTotalHoursByLevel] = getTotalHours(chats);
  console.log(chatTotalHoursByLevel, chatTotalHours);

  const workshopAccordionInfo = {
    workshopTotalHours: totalHours,
    totalHoursBySkill,
  };
  const chatAccordionInfo = {
    chatTotalHours,
    chatTotalHoursByLevel,
  };

  const scholarSocialNetworks = [
    {
      name: 'Twitter',
      url: `https://twitter.com/${twitter_user}`,
      icon: <TwitterIcon />,
      username: twitter_user,
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/${facebook_user}`,
      icon: <FacebookIcon />,
      username: facebook_user,
    },
    {
      name: 'Instagram',
      url: `https://www.instagram.com/${instagram_user}`,
      icon: <InstagramIcon />,
      username: instagram_user,
    },
    {
      name: 'Linkedin',
      url: `https://www.linkedin.com/in/${linkedin_user}`,
      icon: <LinkedinIcon />,
      username: linkedin_user,
    },
  ];
  return (
    <main className="min-h-screen">
      <section className="flex flex-col md:flex-row gap-4 w-full ">
        <div className="px-2 py-10 lg:w-3/12 dark:bg-gradient-to-b md:min-h-screen dark:from-emerald-950 dark:to-slate-950 items-center flex flex-col gap-4">
          <div className="w-64 flex items-center justify-center  rounded-full  border-2 border-primary-1 p-1">
            <Image
              src="https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"
              alt="Imagen del facilitador"
              width={250}
              height={250}
              priority
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-3xl text-center text-primary-light font-semibold ">{name}</h1>
            <p className="w-full text-center italic">
              Licenciatura en{' '}
              <span className="font-semibold">{scholar?.collage_information?.career}</span> en la{' '}
              <span className="font-semibold">
                {getCollageName(scholar?.collage_information?.collage)}
              </span>
            </p>

            <div className="flex w-full gap-2 justify-center">
              {scholarSocialNetworks.map(
                ({ url, icon, username }, index) => (
                  // username && (
                  <Link
                    target="_blank"
                    href={url}
                    className="w-9 text-green-700 dark:text-green-400 rounded-full  bg-gray-100 dark:bg-slate-600 p-2"
                    key={index}
                  >
                    {icon}
                  </Link>
                )
                // )
              )}
            </div>
          </div>
        </div>
        <div
          className={`w-full flex-1 bg-gray-100 flex flex-col gap-4 ${
            searchParams?.actividad === undefined ? ' py-4 md:py-36 ' : 'py-4'
          } px-10`}
        >
          {searchParams?.actividad !== undefined && (
            <Link
              href={`/perfilBecario/${scholarId}`}
              className="ml-4 border w-fit border-gray-300 rounded-lg p-1 hover:bg-gray-200 dark:hover:bg-slate-700 dark:border-slate-700"
            >
              <ChevronLeftIcon width={24} height={24} />
            </Link>
          )}
          <PublicAccordion
            workshopInfo={workshopAccordionInfo}
            kindOfActivity={searchParams?.actividad}
            chatInfo={chatAccordionInfo}
          />
          {searchParams?.actividad === 'talleres' && (
            <div className="11/12">
              <Table
                tableColumns={scholarPublicWorkshopAttendanceColumns}
                tableData={workshopObj}
                tableHeadersForSearch={[{ option: 'adsf', label: 'adsfadsf' }]}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default page;
