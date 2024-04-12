import ScholarDropdown from '@/components/ScholarDropdown';
import ScholarStatus from '@/components/ScholarStatus';
import { AreaChartComponent } from '@/components/charts';
import CardWithStat from '@/components/scholar/card/CardWithStats';
import Table from '@/components/table/Table';
import scholarChatAttendaceColumns from '@/components/table/columns/scholar/activityAttendance/chats/columns';
import createScholarChatAttendanceForTable from '@/components/table/columns/scholar/activityAttendance/chats/formater';
import scholarChatAttendanceSearchOptions from '@/components/table/columns/scholar/activityAttendance/chats/searchOptions';
import scholarVolunteerAttendanceColumns from '@/components/table/columns/scholar/activityAttendance/volunteer/columns';
import createScholarVolunteerAttendanceForTable from '@/components/table/columns/scholar/activityAttendance/volunteer/formater';
import scholarWorkshopAttendanceColumns from '@/components/table/columns/scholar/activityAttendance/workshops/columns';
import createScholarWorkshopAttendanceForTable from '@/components/table/columns/scholar/activityAttendance/workshops/formater';
import scholarWorkshopAttendanceSearchOptions from '@/components/table/columns/scholar/activityAttendance/workshops/searchOptions';
import { getBlobImage } from '@/lib/azure/azure';
import {
  getChatsByScholar,
  getVolunteersByScholar,
  getWorkhsopsByScholar,
} from '@/lib/db/utils/Workshops';
import { getScholarWithAllData } from '@/lib/db/utils/users';
import { getAttendedChats, getAttendedWorkshops } from '@/lib/utils/getAttendedActivities';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { Avatar, Button, Tooltip } from '@nextui-org/react';
import Link from 'next/link';
import { chatIcon, volunterIcon, workshopIcon } from 'public/svgs/svgs';

const page = async ({
  params,
  searchParams,
}: {
  params: { scholarId: string };
  searchParams?: { actividad: string };
}) => {
  const { scholarId } = params;
  const scholar = await getScholarWithAllData(scholarId);
  const { first_names, last_names, program_information, photo } = scholar || {};
  const { attended_workshops } = program_information || {};
  const chats = await getChatsByScholar(scholarId);
  const workshops = await getWorkhsopsByScholar(scholarId);
  const volunteers = await getVolunteersByScholar(scholarId);
  const workshopObj = createScholarWorkshopAttendanceForTable(workshops);
  const chatObject = createScholarChatAttendanceForTable(chats, scholarId);
  const volunteerDataForTable = createScholarVolunteerAttendanceForTable(volunteers);
  const scholarPhoto = photo ? await getBlobImage(photo) : undefined;
  const atendedWorkshops = getAttendedWorkshops(workshops);
  const atendedChats = getAttendedChats(chatObject, scholarId);
  const cardContent = [
    {
      icon: workshopIcon,
      text: 'Actividades formativas',
      number: atendedWorkshops?.length || 0,
      bg: 'bg-gradient-to-r from-blue-700  to-indigo-900',
      cardButtonBg: 'bg-indigo-950 active:bg-blue-700 hover:bg-blue-700',
      activity: 'actividadesFormativas',
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

  // Add null values for months without chats
  for (let month = 0; month < 12; month++) {
    if (!(month in workshopsByMonth)) {
      chatsByMonth[month] = 0;
      workshopsByMonth[month] = 0;
    }
  }

  let areaChartSeries = [];

  areaChartSeries.push({
    name: 'Actividades formativas',
    data: Object.entries(workshopsByMonth).map(([month, count]) => ({
      x: new Date(0, month),
      y: count,
    })),
  });

  // if (searchParams !== undefined || searchParams.actividad === 'chats') {
  //   areaChartSeries.push({
  //     name: 'Chats',
  //     data: Object.entries(chatsByMonth).map(([month, count]) => ({
  //       x: new Date(0, month),
  //       y: count,
  //     })),
  //   });
  // }

  return (
    <section className="flex flex-col gap-4 lg:p-6 pt-0">
      <div className="flex flex-col items-center lg:items-start lg:flex-row justify-center lg:justify-start gap-2 lg:gap-6 w-full">
        <div className="flex lg:hidden items-center justify-between w-full gap-4 px-6 lg:p-0">
          <ScholarStatus scholar={scholar} />
          <ScholarDropdown scholar={scholar} />
        </div>
        <div className="flex-shrink-0 w-56 h-56 object-contain m-auto rounded-full shadow-lg border-3 border-green-500 p-1 overflow-hidden">
          <Avatar
            src={scholarPhoto}
            alt="Imagen del becario"
            className="w-full h-full  rounded-full"
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
          <div className="flex gap-3">
            <Button radius="sm">Informacion universitaria</Button>
            <Button radius="sm">CVA</Button>
            <Button radius="sm">Datos de contacto</Button>
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
          <AreaChartComponent
            series={areaChartSeries}
            title="Actividades realizadas"
            xAxysType="datetime"
          />
        </div>
      </div>
      {searchParams?.actividad === 'actividadesFormativas' && (
        <div className="flex justify-center items-center ">
          <Table
            tableColumns={scholarWorkshopAttendanceColumns}
            tableData={workshopObj}
            tableHeadersForSearch={scholarWorkshopAttendanceSearchOptions}
          />
        </div>
      )}
      {searchParams?.actividad === 'chats' && (
        <div className="flex justify-center items-center ">
          <Table
            tableColumns={scholarChatAttendaceColumns}
            tableData={chatObject}
            tableHeadersForSearch={scholarChatAttendanceSearchOptions}
          />
        </div>
      )}
      {searchParams?.actividad === 'voluntariado' && (
        <div className="flex justify-center items-center ">
          <Table
            tableColumns={scholarVolunteerAttendanceColumns}
            tableData={volunteerDataForTable}
            tableHeadersForSearch={[]}
          />
        </div>
      )}
    </section>
  );
};

export default page;
