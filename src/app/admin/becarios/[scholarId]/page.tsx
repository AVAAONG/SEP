import ScholarDropdown from '@/components/ScholarDropdown';
import ScholarStatus from '@/components/ScholarStatus';
import AdminScholarDialogsButtons from '@/components/adminScholarDialogInformation/adminScholarDialogsButtons';
import { AreaChartComponent } from '@/components/charts';
import PanelCard, { PanelCardProps } from '@/components/commons/PanelCard';
import DatePickerByEvaluationPeriod from '@/components/commons/datePicker/DatePickerByEvaluationBlock';
import Table from '@/components/table/Table';
import { ChatsWithAllData } from '@/components/table/columns/chatsColumns';
import scholarChatAttendaceColumns from '@/components/table/columns/scholar/activityAttendance/chats/columns';
import createScholarChatAttendanceForTable from '@/components/table/columns/scholar/activityAttendance/chats/formater';
import scholarChatAttendanceSearchOptions from '@/components/table/columns/scholar/activityAttendance/chats/searchOptions';
import scholarVolunteerAttendanceColumns from '@/components/table/columns/scholar/activityAttendance/volunteer/columns';
import createScholarVolunteerAttendanceForTable from '@/components/table/columns/scholar/activityAttendance/volunteer/formater';
import scholarWorkshopAttendanceColumns from '@/components/table/columns/scholar/activityAttendance/workshops/columns';
import createScholarWorkshopAttendanceForTable from '@/components/table/columns/scholar/activityAttendance/workshops/formater';
import scholarWorkshopAttendanceSearchOptions from '@/components/table/columns/scholar/activityAttendance/workshops/searchOptions';
import { WorkshopWithAllData } from '@/components/table/columns/workshopColumns';
import { getBlobImage } from '@/lib/azure/azure';
import { VolunteerWithAllData } from '@/lib/db/types';
import {
  getChatsByScholar,
  getVolunteersByScholar,
  getWorkhsopsByScholar,
} from '@/lib/db/utils/Workshops';
import { getScholarWithAllData } from '@/lib/db/utils/users';
import { filterActivitiesBySearchParamsPeriod } from '@/lib/utils/datePickerFilters';
import {
  getApprovedAndAttendedVolunteerActivities,
  getApprovedAndAttendedVolunteers,
  getAttendedChats,
  getAttendedWorkshops,
} from '@/lib/utils/getAttendedActivities';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { Avatar, Tooltip } from '@nextui-org/react';
import Link from 'next/link';
import { chatIcon, volunterIcon, workshopIcon } from 'public/svgs/svgs';
import React from 'react';

const page = async ({
  params,
  searchParams,
}: {
  params: { scholarId: string };
  searchParams?: {
    year: string;
    month: string;
    quarter: string;
    actividad: 'voluntariado' | 'actividadesFormativas' | 'chats';
  };
}) => {
  // Extract scholarId from params and get scholar data
  const { scholarId } = params;
  const scholar = await getScholarWithAllData(scholarId);
  const { first_names, last_names, photo } = scholar || {};

  // Get raw data from the database
  const chatsDb = await getChatsByScholar(scholarId);
  const workshopsDb = await getWorkhsopsByScholar(scholarId);
  const volunteersDb = await getVolunteersByScholar(scholarId);

  // Filter raw data based on search parameters
  const chats = (await filterActivitiesBySearchParamsPeriod(
    chatsDb,
    searchParams
  )) as ChatsWithAllData[];
  const workshops = (await filterActivitiesBySearchParamsPeriod(
    workshopsDb,
    searchParams
  )) as WorkshopWithAllData[];
  const volunteers = (await filterActivitiesBySearchParamsPeriod(
    volunteersDb,
    searchParams
  )) as VolunteerWithAllData[];

  // Create data for the table
  const workshopObj = createScholarWorkshopAttendanceForTable(workshops);
  const chatObject = createScholarChatAttendanceForTable(chats, scholarId);
  const volunteerDataForTable = createScholarVolunteerAttendanceForTable(volunteers);

  // Get additional data
  const scholarPhoto = photo ? await getBlobImage(photo) : undefined;
  const atendedWorkshops = getAttendedWorkshops(workshops);
  const atendedChats = getAttendedChats(chats, scholarId);
  const atendedVolunteers = getApprovedAndAttendedVolunteerActivities(volunteers);
  const { totalVolunteerHours } = getApprovedAndAttendedVolunteers(volunteers);

  const cardContent: PanelCardProps[] = [
    {
      title: 'Actividades formativas realizadas',
      subtitle: 'Ver todas las actividades',
      data: atendedWorkshops.length,
      link: '?actividad=actividadesFormativas',
      icon: workshopIcon(),
      kind: 'workshop',
      replace: false,
    },
    {
      title: 'Chat clubs de inglés realizados',
      subtitle: 'Ver todos los chats',
      data: atendedChats.length,
      link: '?actividad=chats',
      icon: chatIcon(),
      kind: 'chat',
      replace: false,
    },
    {
      title: 'Horas de voluntariado realizadas',
      subtitle: 'Ver todas las actividades',
      data: totalVolunteerHours,
      link: '?actividad=voluntariado',
      icon: volunterIcon(),
      kind: 'volunteer',
      replace: false,
    },
  ];

  const countByMonth = (items) => {
    return (
      items?.reduce((acc, item) => {
        const month = new Date(item.start_dates[0] || item.start_dates).getMonth();
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, Array(12).fill(0)) || Array(12).fill(0)
    );
  };

  const workshopsByMonth = countByMonth(atendedWorkshops);
  const chatsByMonth = countByMonth(atendedChats);
  const volunteersByMonth = countByMonth(atendedVolunteers);

  const createAreaChartSeries = (name: string, data, color: string) => ({
    name,
    data: data.map((count, month) => ({
      x: new Date(0, month),
      y: count,
    })),
    color,
  });

  let areaChartSeries = [
    createAreaChartSeries('Actividades formativas', workshopsByMonth, '#1d4ed8'),
    createAreaChartSeries('Chats', chatsByMonth, '#ef4444'),
    createAreaChartSeries('Actividades de voluntariado', volunteersByMonth, '#22c55e'),
  ];

  return (
    <section className="flex flex-col gap-4 lg:p-6 pt-0">
      <div className="flex flex-col items-center lg:items-start lg:flex-row justify-center lg:justify-start gap-2 lg:gap-6 w-full">
        <div className="flex lg:hidden items-center justify-between w-full gap-4 px-6 lg:p-0">
          <ScholarStatus scholar={scholar} isAdmin={true} />
          <ScholarDropdown scholar={scholar} />
        </div>
        <div className="flex-shrink-0 w-56 h-56 object-contain m-auto rounded-full shadow-lg border-3 border-green-500 p-1 overflow-hidden">
          <Avatar
            src={scholarPhoto || undefined}
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
              <ScholarStatus scholar={scholar} isAdmin={true} />
              <ScholarDropdown scholar={scholar} />
            </div>
          </div>
          <div className="w-full flex gap-3 justify-center md:justify-start">
            <AdminScholarDialogsButtons scholarId={scholarId} />
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <DatePickerByEvaluationPeriod />
        <div className="flex gap-2 justify-center h-full items-center mt-4">
          {cardContent.map((card, index) => (
            <React.Fragment key={index}>{PanelCard(card)}</React.Fragment>
          ))}
        </div>
        <div className="mt-6 p-2 rounded-lg bg-white dark:bg-zinc-700">
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
