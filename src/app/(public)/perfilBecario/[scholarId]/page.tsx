import defailProfilePic from '@/../public/defaultProfilePic.png';
import PublicAccordion from '@/components/PublicAccordion';
import SharePubilcProfile from '@/components/ShareModal';
import Table from '@/components/table/Table';
import { ChatsWithAllData } from '@/components/table/columns/chatsColumns';
import scholarPublicChatAttendanceColumns from '@/components/table/columns/scholarChatPublicAttendance';
import scholarPublicWorkshopAttendanceColumns from '@/components/table/columns/scholarWorkshopPublicAttendance';
import { WorkshopWithAllData } from '@/components/table/columns/workshopColumns';
import { getChatsByScholar } from '@/lib/db/utils/chats';
import { getScholarWithAllData } from '@/lib/db/utils/users';
import { getCollageName } from '@/lib/parseFromDatabase';
import generateQRCode from '@/lib/utils/createQrCode';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from 'public/svgs/SocialNetworks';

const createWorkshopObject = (workshops: WorkshopWithAllData[]) => {
  return workshops.map((workshop) => {
    return {
      id: workshop.id,
      title: workshop.title,
      platform: workshop.platform,
      startDates: workshop.start_dates,
      endDates: workshop.end_dates,
      modality: workshop.modality,
      category: workshop.asociated_skill,
      status: workshop.activity_status,
      attendance: workshop.scholar_attendance,
      year: workshop.year,
      speaker: workshop.speaker,
    };
  });
};

const getActivityDurationInAcademicHours = (startDate: Date, endDate: Date) => {
  const duration = moment.duration(moment(endDate).diff(moment(startDate)));
  const durationInMinutes = duration.asMinutes();
  const academicHourInMinutes = 45;
  return Number((durationInMinutes / academicHourInMinutes).toFixed());
};

function getTotalHours(
  activities: { startDates: Date[]; endDates: Date[]; category: string }[]
): [number, { category: string; totalHours: number }[]] {
  const totalHoursBycategory: { [category: string]: number } = {};
  let totalHours = 0;
  activities.forEach((activity) => {
    activity.startDates.forEach((startDate, index) => {
      const endDate = activity.endDates[index];
      const durationInAcademicHours = getActivityDurationInAcademicHours(startDate, endDate);
      totalHours += durationInAcademicHours;

      if (totalHoursBycategory[activity.category]) {
        totalHoursBycategory[activity.category] += durationInAcademicHours;
      } else {
        totalHoursBycategory[activity.category] = durationInAcademicHours;
      }
    });
  });
  const totalHoursArray = Object.entries(totalHoursBycategory).map(([category, totalHours]) => ({
    category,
    totalHours,
  }));

  return [totalHours, totalHoursArray];
}
const createChatObject = (chat: ChatsWithAllData[]) => {
  return chat.map((chat) => {
    let att = '';
    if (chat.speaker.length > 0) {
      att = 'SPEAKER';
    } else {
      att = chat.scholar_attendance[0].attendance;
    }
    return {
      id: chat.id,
      title: chat.title,
      startDates: chat.start_dates,
      endDates: chat.end_dates,
      modality: chat.modality,
      category: chat.level,
      status: chat.activity_status,
      attendance: att,
      speaker: chat.speaker,
    };
  });
};

const page = async ({
  params,
  searchParams,
}: {
  params: { scholarId: string };
  searchParams: { actividad: 'actividadesFormativas' | 'chats' | 'voluntariado' | undefined };
}) => {
  const host = headers().get('host');
  const scholarId = params?.scholarId;
  const pageUrl = `https://${host}/perfilBecario/${scholarId}`;
  const scholar = await getScholarWithAllData(scholarId);
  const lastNames = scholar?.last_names?.split(' ')!;

  const name = `${scholar?.first_names.split(' ')[0]} ${
    lastNames[0].length < 3 ? `${lastNames[0]} ${lastNames[1]}` : lastNames[0]
  } `;
  const {
    twitter_user,
    facebook_user,
    instagram_user,
    linkedin_user,
    program_information,
    program_information_id,
  } = scholar || {};

  const allchatsByScholar = await getChatsByScholar(program_information_id!, scholarId);
  const chats = createChatObject(allchatsByScholar).filter((chat) => {
    return (
      (chat.attendance === 'ATTENDED' || chat.attendance === 'SPEAKER') &&
      (chat.status === 'DONE' || chat.status === 'ATTENDANCE_CHECKED')
    );
  });

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
        speaker,
      } = attendance.workshop;
      return {
        id,
        title,
        modality,
        platform,
        start_dates,
        end_dates,
        activity_status,
        asociated_skill,
        scholar_attendance: attendance.attendance,
        year,
        speaker,
      };
    });
  const workshopObj = createWorkshopObject(workshops);
  const [totalHours, totalHoursBySkill] = getTotalHours(workshopObj);
  const [chatTotalHours, chatTotalHoursByLevel] = getTotalHours(chats);

  const workshopTableObject = workshopObj.flatMap((workshop) => {
    return workshop.startDates.map((startDate, index) => {
      const endDate = workshop.endDates[index];
      return {
        id: workshop.id,
        title: workshop.title,
        duration: getActivityDurationInAcademicHours(startDate, endDate),
        modality: workshop.modality,
        category: workshop.category,
        speaker: workshop.speaker,
      };
    });
  });
  const chatTableObject = chats.flatMap((chat) => {
    return chat.startDates.map((startDate, index) => {
      const endDate = chat.endDates[index];
      return {
        id: chat.id,
        title: chat.title,
        duration: getActivityDurationInAcademicHours(startDate, endDate),
        modality: chat.modality,
        category: chat.category,
        condition: chat.attendance === 'SPEAKER' ? 'Facilitador' : 'Asistente',
      };
    });
  });

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
  const qrcode = await generateQRCode(pageUrl);
  return (
    <main className="min-h-screen">
      <section className="flex flex-col md:flex-row w-full ">
        <div className="p-4 lg:w-3/12 dark:bg-gradient-to-b min-h-screen dark:from-emerald-950 dark:to-slate-950 items-center flex flex-col">
          <div className="block md:hidden self-end">
            <SharePubilcProfile qrCode={qrcode!} profileLink={pageUrl} />
          </div>
          <div className="w-64 flex items-center justify-center rounded-full border-2 border-primary-1 p-1">
            <Image
              src={defailProfilePic}
              alt="Foto del becario"
              width={250}
              height={250}
              priority
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-3xl text-center text-primary-light font-semibold mt-4 ">{name}</h1>
            <p className="w-full text-center italic">
              Licenciatura en{' '}
              <span className="font-semibold">{scholar?.collage_information?.career}</span> en la{' '}
              <span className="font-semibold">
                {getCollageName(scholar?.collage_information?.collage!)}
              </span>
            </p>
            {/* <Button variant="ghost" color="success">
              Ver certificado
            </Button> */}
            <div className="flex w-full gap-2 justify-center">
              {scholarSocialNetworks.map(
                ({ url, icon, username }, index) =>
                  username && (
                    <Link
                      target="_blank"
                      href={url}
                      className="w-9 text-green-700 dark:text-green-400 rounded-full  bg-gray-100 dark:bg-slate-600 p-2"
                      key={index}
                    >
                      {icon}
                    </Link>
                  )
              )}
            </div>
          </div>
        </div>

        <div className={`w-full flex-1 bg-gray-100 dark:bg-dark min-h-screen flex flex-col p-4`}>
          <div className="hidden md:block self-end">
            <SharePubilcProfile qrCode={qrcode!} profileLink={pageUrl} />
          </div>
          <div
            className={`${
              searchParams?.actividad === undefined ? 'md:py-28' : ''
            } flex flex-col md:px-8 gap-8`}
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
              activity={searchParams.actividad}
              chatInfo={{
                chatTotalHours,
                chatTotalHoursByLevel: chatTotalHoursByLevel,
              }}
              workshopInfo={{
                workshopTotalHours: totalHours,
                totalHoursBySkill: totalHoursBySkill,
              }}
            />

            {searchParams?.actividad === 'actividadesFormativas' && (
              <div className="w-full">
                <Table
                  tableColumns={scholarPublicWorkshopAttendanceColumns}
                  tableData={workshopTableObject}
                  tableHeadersForSearch={[{ option: 'adsf', label: 'adsfadsf' }]}
                />
              </div>
            )}
            {searchParams?.actividad === 'chats' && (
              <div className="w-full">
                <Table
                  tableColumns={scholarPublicChatAttendanceColumns}
                  tableData={chatTableObject}
                  tableHeadersForSearch={[{ option: 'adsf', label: 'adsfadsf' }]}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
