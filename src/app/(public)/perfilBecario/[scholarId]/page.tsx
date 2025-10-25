import PublicAccordion from '@/components/PublicAccordion';
import SharePubilcProfile from '@/components/ShareModal';
import Table from '@/components/table/Table';
import { ChatsWithAllData } from '@/components/table/columns/chatsColumns';
import scholarVolunteerAttendanceColumns from '@/components/table/columns/scholar/activityAttendance/volunteer/columns';
import createScholarVolunteerAttendanceForTable from '@/components/table/columns/scholar/activityAttendance/volunteer/formater';
import scholarVolunteerAttendanceSearchOptions from '@/components/table/columns/scholar/activityAttendance/volunteer/searchOptions';
import scholarPublicChatAttendanceColumns from '@/components/table/columns/scholarChatPublicAttendance';
import scholarPublicWorkshopAttendanceColumns from '@/components/table/columns/scholarWorkshopPublicAttendance';
import { WorkshopWithAllData } from '@/components/table/columns/workshopColumns';
import { getBlobImage } from '@/lib/azure/azure';
import { VolunteerWithAllData } from '@/lib/db/types';
import { getVolunteersByScholar } from '@/lib/db/utils/Workshops';
import { getChatsByScholar } from '@/lib/db/utils/chats';
import { getScholarWithAllData } from '@/lib/db/utils/users';
import generateQRCode from '@/lib/utils/createQrCode';
import { getCollageName } from '@/lib/utils/parseFromDatabase';
import { parseChatLevelFromDatabase } from '@/lib/utils2';
import { ChevronLeftIcon, HandRaisedIcon } from '@heroicons/react/24/outline';
import { Avatar } from '@nextui-org/react';
import moment from 'moment';
import { headers } from 'next/headers';
import Link from 'next/link';
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from 'public/svgs/SocialNetworks';

const formatThousands = (n: number | string) => {
  const num = Number(n) || 0;
  if (num >= 1000) {
    const v = num / 1000;
    return v % 1 === 0 ? `${v}k` : `${v.toFixed(1)}k`;
  }
  return String(num);
};

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
  const scholarProfilePhoto = scholar?.photo ? await getBlobImage(scholar?.photo) : undefined;

  const name = `${scholar?.first_names.split(' ')[0]} ${lastNames[0].length < 3 ? `${lastNames[0]} ${lastNames[1]}` : lastNames[0]
    } `;
  const { twitter_user, facebook_user, instagram_user, linkedin_user, program_information } =
    scholar || {};

  const allchatsByScholar = await getChatsByScholar(program_information!.id, scholarId);
  const chats = createChatObject(allchatsByScholar).filter((chat) => {
    return (
      (chat.attendance === 'ATTENDED' || chat.attendance === 'SPEAKER') &&
      chat.status === 'ATTENDANCE_CHECKED'
    );
  });

  const volunteerDbList = (await getVolunteersByScholar(scholarId)) as VolunteerWithAllData[];
  const attendedVolunteers = volunteerDbList.filter((volunteer) => {
    const attendanceRecord = volunteer.volunteer_attendance[0];
    return (
      volunteer.status === 'APPROVED' &&
      attendanceRecord !== undefined &&
      attendanceRecord.attendance === 'ATTENDED'
    );
  });

  const volunteerSummary = attendedVolunteers.reduce(
    (acc, volunteer) => {
      const attendanceRecord = volunteer.volunteer_attendance[0];
      if (!attendanceRecord) return acc;

      const hours = attendanceRecord.asigned_hours ?? 0;
      const kind = volunteer.kind_of_volunteer;

      acc.totalActivities += 1;
      acc.totalHours += hours;
      if (!acc.byKind[kind]) {
        acc.byKind[kind] = { count: 0, totalHours: 0 };
      }
      acc.byKind[kind].count += 1;
      acc.byKind[kind].totalHours += hours;

      return acc;
    },
    {
      totalActivities: 0,
      totalHours: 0,
      byKind: {} as Record<string, { count: number; totalHours: number }>,
    }
  );

  const volunteerInfo = {
    totalActivities: volunteerSummary.totalActivities,
    totalHours: Number(volunteerSummary.totalHours.toFixed(2)),
    breakdownByKind: Object.entries(volunteerSummary.byKind).map(([kind, stats]) => ({
      kind,
      count: stats.count,
      totalHours: Number(stats.totalHours.toFixed(2)),
    })),
  };

  const volunteerTableObject = createScholarVolunteerAttendanceForTable(attendedVolunteers);

  const workshops = program_information?.attended_workshops
    .filter((attendance) => {
      return (
        attendance.attendance === 'ATTENDED' &&
        attendance.workshop.activity_status === 'ATTENDANCE_CHECKED'
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
  const workshopObj = createWorkshopObject((workshops ?? []) as unknown as WorkshopWithAllData[]);
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
        category: parseChatLevelFromDatabase(chat.category),
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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Header Section */}
      <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 dark:from-emerald-900 dark:via-teal-900 dark:to-emerald-950 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative container mx-auto px-4 py-12 md:py-16">
          {/* Top Bar */}
          <div className="flex justify-end items-center">
            <SharePubilcProfile qrCode={qrcode!} profileLink={pageUrl} />
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16">
            {/* Profile Image */}
            <div className="relative group flex-shrink-0">
              <div className="absolute -inset-2 bg-gradient-to-r from-white/40 via-emerald-200/40 to-teal-200/40 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative">
                <div className="w-44 h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 rounded-full overflow-hidden border-4 border-white/90 dark:border-white/20 shadow-2xl backdrop-blur-sm">
                  <Avatar
                    src={scholarProfilePhoto || undefined}
                    alt="Foto del becario"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-pulse" style={{ animationDuration: '3s' }} />
              </div>

              {/* Credential Badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full max-w-[255px]">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full blur-md opacity-75"></div>
                  <div className="relative bg-gradient-to-br from-amber-50 via-white to-amber-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 rounded-full px-1 py-2 shadow-xl border-2 border-amber-400/50 dark:border-amber-500/30">
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs md:text-sm font-semibold text-amber-900 dark:text-amber-100 uppercase tracking-wider">
                        {(program_information?.scholar_condition === 'ACTIVE' || program_information?.scholar_condition === 'TO_BE_ALUMNI') && 'Becario ProExcelencia'}
                        {program_information?.scholar_condition === 'ALUMNI' && 'Egresado ProExcelencia'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center lg:text-left text-white space-y-3 mt-8 lg:mt-0">
              {/* Name & Career */}
              <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight drop-shadow-lg">
                  {name}
                </h1>
                <p className="text-xl md:text-2xl text-emerald-50 font-medium">
                  {scholar?.collage_information[0]?.career}
                </p>
              </div>

              {/* University Info */}
              <div className="flex items-center justify-center lg:justify-start gap-3 text-emerald-50/90">
                <div className="p-0.5 bg-white/10 rounded-sm backdrop-blur-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="text-base md:text-lg font-medium">
                  {getCollageName(scholar?.collage_information[0]?.collage!)}
                </span>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 justify-center lg:justify-start pt-2">
                {scholarSocialNetworks.map(
                  ({ url, icon, username }, index) =>
                    username && (
                      <Link
                        target="_blank"
                        href={url}
                        key={index}
                        className="group relative w-8  h-8 flex items-center justify-center"
                      >
                        <div className="absolute inset-0 bg-white dark:bg-slate-800 rounded-lg   opacity-90 group-hover:opacity-100 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:scale-110" />
                        <div className="relative text-emerald-600 dark:text-emerald-400 w-4 h-4">
                          {icon}
                        </div>
                      </Link>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        {searchParams?.actividad !== undefined && (
          <Link
            href={`/perfilBecario/${scholarId}`}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <ChevronLeftIcon className="w-5 h-5" />
            <span className="font-medium">Volver al perfil</span>
          </Link>
        )}

        {/* Achievement Stats Overview */}
        {searchParams?.actividad === undefined && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="group relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 dark:from-blue-600 dark:via-blue-700 dark:to-blue-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 text-white">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:bg-white/30 transition-colors duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-blue-100 mb-2 uppercase tracking-wide">Actividades Formativas</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <p className="text-5xl font-bold">{totalHours}</p>
                  <span className="text-blue-200  font-medium">horas académicas acumuladas</span>
                </div>

              </div>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-red-500 via-red-600 to-red-700 dark:from-red-600 dark:via-red-700 dark:to-red-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 text-white">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:bg-white/30 transition-colors duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-red-100 mb-2 uppercase tracking-wide">Chat Clubs - Inglés</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <p className="text-5xl font-bold">{chatTotalHours}</p>
                  <span className="text-red-200 font-medium">horas académicas acumuladas</span>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 dark:from-emerald-600 dark:via-emerald-700 dark:to-emerald-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 text-white">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:bg-white/30 transition-colors duration-300">
                    <HandRaisedIcon className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-emerald-100 mb-2 uppercase tracking-wide">Voluntariado</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <p className="text-5xl font-bold">{formatThousands(volunteerInfo.totalHours)}</p>
                  <span className="text-emerald-200  font-medium">horas de voluntariado acumuladas</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Achievements Section */}
        <div className={searchParams?.actividad === undefined ? 'space-y-8' : ''}>
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
            volunteerInfo={volunteerInfo}
            workshopActivityCount={workshopObj.length}
            chatActivityCount={chats.length}
          />
        </div>

        {/* Activity Tables */}
        {searchParams?.actividad === 'actividadesFormativas' && (
          <div className="mt-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
              <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-slate-700 dark:to-slate-600 border-b border-blue-200 dark:border-slate-600">
                <h2 className="text-xl font-bold text-blue-900 dark:text-white">
                  Detalle de Actividades Formativas
                </h2>
              </div>
              <div className="p-6">
                <Table
                  tableColumns={scholarPublicWorkshopAttendanceColumns as any}
                  tableData={workshopTableObject as any}
                  tableHeadersForSearch={[{ option: 'adsf', label: 'adsfadsf' }]}
                />
              </div>
            </div>
          </div>
        )}
        {searchParams?.actividad === 'chats' && (
          <div className="mt-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
              <div className="px-6 py-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-slate-700 dark:to-slate-600 border-b border-red-200 dark:border-slate-600">
                <h2 className="text-xl font-bold text-red-900 dark:text-white">
                  Detalle de Chat Clubs
                </h2>
              </div>
              <div className="p-6">
                <Table
                  tableColumns={scholarPublicChatAttendanceColumns as any}
                  tableData={chatTableObject as any}
                  tableHeadersForSearch={[{ option: 'adsf', label: 'adsfadsf' }]}
                />
              </div>
            </div>
          </div>
        )}
        {searchParams?.actividad === 'voluntariado' && (
          <div className="mt-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
              <div className="px-6 py-4 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-slate-700 dark:to-slate-600 border-b border-emerald-200 dark:border-slate-600">
                <h2 className="text-xl font-bold text-emerald-900 dark:text-white">
                  Detalle de Voluntariados
                </h2>
              </div>
              <div className="p-6">
                <Table
                  tableColumns={scholarVolunteerAttendanceColumns as any}
                  tableData={volunteerTableObject as any}
                  tableHeadersForSearch={scholarVolunteerAttendanceSearchOptions}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default page;
