import defailProfilePic from '@/../public/defaultProfilePic.png';
import ScholarDropdown from '@/components/ScholarDropdown';
import ScholarStatus from '@/components/ScholarStatus';
import AreaChart from '@/components/charts/AreaChart';
import IconWithInfo from '@/components/commons/IconInWithInformation';
import CardWithStat from '@/components/scholar/card/CardWithStats';
import Table from '@/components/table/Table';
import { ChatsWithAllData } from '@/components/table/columns/chatsColumns';
import scholarChatAttendaceColumns from '@/components/table/columns/scholarChatAttendance';
import scholarWorkshopAttendanceColumns from '@/components/table/columns/scholarWorkshopAttendance';
import { WorkshopWithAllData } from '@/components/table/columns/workshopColumns';
import { getWorkhsopsByScholar } from '@/lib/db/utils/Workshops';
import { getChatsByScholar } from '@/lib/db/utils/chats';
import formatDni from '@/lib/db/utils/formatDni';
import { Tooltip } from '@nextui-org/react';

import { getScholarWithAllData } from '@/lib/db/utils/users';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import {
  ActivityStatus,
  Level,
  Modality,
  ScholarAttendance,
  Skill,
  WorkshopYear,
} from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { CellPhoneIcon, WhatsAppIcon } from 'public/svgs/SocialNetworks';
import {
  AddressIcon,
  CalendarIcon,
  DniIcon,
  EmailIcon,
  PhoneIcon,
  chatIcon,
  volunterIcon,
  workshopIcon,
} from 'public/svgs/svgs';

type scholarChatAttendaceColumns = 'ATTENDED' | 'SPEAKER' | 'NOT_ATTENDED' | 'SPEAKER';

export interface ScholarChatColumnT {
  id: string;
  title: string;
  platform: string;
  start_dates: Date[];
  end_dates: Date[];
  rating: number | null;
  modality: Modality;
  level: Level;
  activity_status: ActivityStatus;
  attendance: scholarChatAttendaceColumns;
}
[];

export interface IScholarWorkshopColumn {
  id: string;
  title: string;
  platform: string;
  start_dates: Date[];
  end_dates: Date[];
  modality: Modality;
  skill: Skill;
  activity_status: ActivityStatus;
  attendance: ScholarAttendance;
  year: WorkshopYear[];
}
[];
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
      platform: chat.platform,
      start_dates: chat.start_dates,
      end_dates: chat.end_dates,
      modality: chat.modality,
      level: chat.level,
      activity_status: chat.activity_status,
      attendance: att,
    };
  });
};

const createWorkshopObject = (workshops: WorkshopWithAllData[]) => {
  return workshops.map((workshop) => {
    return {
      id: workshop.id,
      title: workshop.title,
      platform: workshop.platform,
      start_dates: workshop.start_dates,
      end_dates: workshop.end_dates,
      modality: workshop.modality,
      skill: workshop.asociated_skill,
      speakerNames: workshop.speaker.map(
        (speaker) => speaker.first_names.split(' ')[0] + speaker.last_names.split(' ')[0]
      ),
      speakerIds: workshop.speaker.map((speaker) => speaker.id),
      speakerCompany: workshop.speaker.map((speaker) => speaker.job_company),
      speakerImages: workshop.speaker.map((speaker) => speaker.image),
      activity_status: workshop.activity_status,
      attendance: workshop.scholar_attendance[0].attendance,
      year: workshop.year,
    };
  });
};

const page = async ({
  params,
  searchParams,
}: {
  params: { scholarId: string };
  searchParams?: { actividad: string };
}) => {
  const { scholarId } = params;
  const scholar = await getScholarWithAllData(scholarId);
  const {
    first_names,
    last_names,
    email,
    program_information,
    local_phone_number,
    whatsapp_number,
    cell_phone_Number,
    dni,
    birthdate,
    address,
  } = scholar || {};
  const { attended_workshops, scholar_status, program_admission_date } = program_information || {};
  const chats = await getChatsByScholar(program_information?.id!, scholarId);
  const workshops = await getWorkhsopsByScholar(scholarId);
  const workshopObj = createWorkshopObject(workshops);
  const chatObject = createChatObject(chats);
  const scholarContactData = [
    {
      name: 'Celular',
      value: cell_phone_Number,
      icon: <CellPhoneIcon />,
    },
    {
      name: 'Teléfono local',
      value: local_phone_number,
      icon: <PhoneIcon />,
    },
    {
      name: 'Whatsapp',
      value: whatsapp_number,
      icon: <WhatsAppIcon />,
    },
    {
      name: 'Correo',
      value: email,
      icon: <EmailIcon />,
    },
  ];
  const atendedWorkshops = attended_workshops?.filter(
    (workshop) => workshop.attendance === 'ATTENDED'
  );
  const atendedChats = chatObject?.filter(
    (chat) =>
      chat.attendance === 'ATTENDED' ||
      (chat.attendance === 'SPEAKER' && chat.activity_status !== 'SUSPENDED')
  );
  const cardContent = [
    {
      icon: workshopIcon,
      text: 'Actividades formativas',
      number: atendedWorkshops?.length || 0,
      bg: 'bg-gradient-to-r from-blue-700  to-indigo-900',
      cardButtonBg: 'bg-indigo-950 active:bg-blue-700 hover:bg-blue-700',
      activity: 'talleres',
    },
    {
      icon: chatIcon,
      text: 'Chats clubs',
      number: atendedChats?.length || 0,
      bg: 'bg-gradient-to-r from-red-500  to-red-900',
      cardButtonBg: 'bg-indigo-950 active:bg-blue-700',
      activity: 'chats',
    },
    {
      icon: volunterIcon,
      text: 'Horas de voluntariado',
      number: 0,
      bg: 'from-green-500  to-green-700',
      cardButtonBg: 'bg-indigo-950 active:bg-blue-700 hover:bg-blue-700',
      activity: 'voluntariado',
    },
  ];

  const workshopsByMonth: Record<number, number> =
    atendedWorkshops?.reduce((acc, workshop) => {
      const month = new Date(workshop.workshop.start_dates[0]).getMonth();
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {}) || {};

  const chatsByMonth: Record<number, number> =
    atendedChats?.reduce((acc, chat) => {
      const month = new Date(chat.start_dates).getMonth();
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {}) || {};
  // Add null values for months without workshops
  for (let month = 0; month < 12; month++) {
    if (!(month in workshopsByMonth)) {
      workshopsByMonth[month] = 0;
    }
  }

  // Add null values for months without chats
  for (let month = 0; month < 12; month++) {
    if (!(month in chatsByMonth)) {
      chatsByMonth[month] = 0;
    }
  }

  let areaChartSeries = [];

  if (searchParams !== undefined || searchParams.actividad === 'talleres') {
    areaChartSeries.push({
      name: 'Actividades formativas',
      data: Object.entries(workshopsByMonth).map(([month, count]) => ({
        x: new Date(0, month),
        y: count,
      })),
    });
  }

  if (searchParams !== undefined || searchParams.actividad === 'chats') {
    areaChartSeries.push({
      name: 'Chats',
      data: Object.entries(chatsByMonth).map(([month, count]) => ({
        x: new Date(0, month),
        y: count,
      })),
    });
  }

  return (
    <section className="flex flex-col gap-4 lg:p-6 pt-0">
      <div className="flex flex-col items-center lg:items-start lg:flex-row justify-center lg:justify-start gap-2 lg:gap-6 w-full">
        <div className="flex lg:hidden items-center justify-between w-full gap-4 px-6 lg:p-0">
          <ScholarStatus scholar={scholar} />
          <ScholarDropdown scholar={scholar} />
        </div>
        <div className="w-52 h-fit flex items-center justify-center rounded-full shadow-lg border-3 border-green-500 p-1">
          <Image
            src={defailProfilePic}
            alt="Imagen del facilitador"
            width={200}
            height={200}
            priority
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col gap-4 items-start w-full">
          <div className="w-full flex  lg:flex-row justify-between items-center">
            <div className="flex gap-4 items-center text-primary-light">
              <h1 className="block text-center text-3xl lg:text-4xl  font-bold">
                {first_names} {last_names}{' '}
              </h1>
              <Tooltip content="Ver perfil publico">
                <Link href={`/perfilBecario/${scholarId}`}>
                  <ArrowTopRightOnSquareIcon width={20} height={20} />
                </Link>
              </Tooltip>
            </div>
            <div className="hidden lg:flex items-center gap-4">
              <ScholarStatus scholar={scholar} />
              <ScholarDropdown scholar={scholar} />
            </div>
          </div>
          <div className="flex w-full justify-between ">
            <div className="flex items-center lg:items-start flex-col gap-2 w-full">
              <div className="flex gap-2">
                {scholarContactData.map(({ value, icon }, index) => {
                  return <IconWithInfo key={index} value={value!} icon={icon} />;
                })}
              </div>
              <div className="mt-2 items-center lg:items-start flex flex-col gap-2">
                <div className="text-sm flex gap-1 items-center">
                  <div className="w-5 h-5 text-primary-dark">
                    <DniIcon />
                  </div>
                  V-{formatDni(dni || '')}
                </div>
                <div className="text-sm flex gap-1 items-center ">
                  <div className="w-5 h-5  text-primary-dark">
                    <CalendarIcon />
                  </div>
                  {birthdate?.toLocaleString('es-ES', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                  <span className="text-primary-light font-medium">
                    ({new Date().getFullYear() - birthdate?.getFullYear()!} años)
                  </span>
                </div>
                <div className="text-sm flex gap-1 items-center  text-primary-dark">
                  <div className="w-5 h-5">
                    <AddressIcon />
                  </div>
                  {address}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <div className="flex gap-2 justify-center h-full items-center mt-4">
          {cardContent.map(({ icon, text, number, bg, activity }) => {
            return (
              <CardWithStat
                key={text}
                stat={number}
                Icon={icon}
                text={text}
                bg={bg}
                data={[]}
                activity={activity}
              />
            );
          })}
        </div>
        <div className="mt-6 p-2 rounded-lg bg-white">
          <AreaChart series={areaChartSeries} title="Actividades realizadas" xAxysType="datetime" />
        </div>
      </div>
      {searchParams?.actividad === 'talleres' && (
        <div className="flex justify-center items-center ">
          <Table
            tableColumns={scholarWorkshopAttendanceColumns}
            tableData={workshopObj || []}
            tableHeadersForSearch={[]}
          />
        </div>
      )}
      {searchParams?.actividad === 'chats' && (
        <div className="flex justify-center items-center ">
          <Table
            tableColumns={scholarChatAttendaceColumns}
            tableData={chatObject || []}
            tableHeadersForSearch={[]}
          />
        </div>
      )}
    </section>
  );
};

export default page;
