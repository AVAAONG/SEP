import defailProfilePic from '@/../public/defaultProfilePic.png';
import ScholarStatus from '@/components/ScholarStatus';
import AreaChart from '@/components/charts/AreaChart';
import IconWithInfo from '@/components/commons/IconInWithInformation';
import CardWithStat from '@/components/scholar/card/CardWithStats';
import Table from '@/components/table/Table';
import singleScholarWorkshopsColumns from '@/components/table/columns/singleScholarWorkshopColumns';
import formatDni from '@/lib/db/utils/formatDni';

import { getScholarWithAllData } from '@/lib/db/utils/users';
import { getCollageName, parseStudyAreaFromDatabase } from '@/lib/parseFromDatabase';
import { createDataCardsContent } from '@/lib/utils';
import Image from 'next/image';
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
    twitter_user,
    facebook_user,
    allowedEmail,
    instagram_user,
    linkedin_user,
    program_information,
    local_phone_number,
    whatsapp_number,
    cell_phone_Number,
    collage_information,
    address,
    cva_information,
    dni,
    birthdate,
  } = scholar || {};
  const { attended_workshops, attended_chats, scholar_status } = program_information || {};
  const { collage, career, study_area, study_regime } = collage_information || {};
  const { is_in_cva, not_started_cva_reason, cva_location, cva_modality, certificate } =
    cva_information || {};

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
      value: allowedEmail,
      icon: <EmailIcon />,
    },
  ];
  const atendedWorkshops = attended_workshops?.filter(
    (workshop) => workshop.attendance === 'ATTENDED'
  );
  const cardContent = createDataCardsContent([
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
      number: attended_chats?.length || 0,
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
  ]);

  const workshopsByMonth: Record<number, number> =
    atendedWorkshops?.reduce((acc, workshop) => {
      const month = new Date(workshop.workshop.start_dates[0]).getMonth();
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {}) || {};

  const workshops = atendedWorkshops?.map((workshop) => workshop.workshop) || [];

  // Add null values for months without workshops
  for (let month = 0; month < 12; month++) {
    if (!(month in workshopsByMonth)) {
      workshopsByMonth[month] = 0;
    }
  }

  const chartData = Object.entries(workshopsByMonth).map(([month, count]) => ({
    x: new Date(0, month),
    y: count,
  }));

  return (
    <section className="flex flex-col gap-4 p-6 pt-0">
      <div className="flex flex-col lg:flex-row justify-center lg:justify-start gap-4 w-full">
        <div className="w-52 h-fit flex items-center justify-center rounded-full shadow-lg border-4 border-green-500 p-1">
          <Image
            src={defailProfilePic}
            alt="Imagen del facilitador"
            width={200}
            height={200}
            priority
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col gap-2 items-start w-full">
          <div className="w-10/12 flex justify-between items-center">
            <h1 className="block text-4xl text-primary-light font-bold">
              {first_names} {last_names}{' '}
            </h1>{' '}
            <ScholarStatus status={scholar_status || 'NORMAL'} scholarId={scholarId} />
          </div>
          <div className="flex w-full justify-between mt-2">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 max-w-[200px]">
                {scholarContactData.map(({ value, icon }, index) => {
                  return <IconWithInfo key={index} value={value!} icon={icon} />;
                })}
              </div>
              <div className="mt-2 flex flex-col gap-2">
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

            <div className="flex gap-8">
              <div className="flex flex-col gap-2">
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-wider text-primary-light dark:text-primary-dark">
                    Universidad
                  </h3>
                  <p className="text-sm font-medium">{getCollageName(collage!)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-wider text-primary-light dark:text-primary-dark">
                    Area de estudio
                  </h3>
                  <p className="text-sm font-medium">{parseStudyAreaFromDatabase(study_area!)}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-wider text-primary-light dark:text-primary-dark">
                    Carrera
                  </h3>
                  <p className="text-sm font-medium">{career}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-wider text-primary-light dark:text-primary-dark">
                    Regimen de estudio
                  </h3>
                  <p className="text-sm font-medium">{study_regime}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider text-primary-light dark:text-primary-dark">
                  ¿Se encuentra en el CVA?
                </h3>
                <p className="text-sm font-medium">{is_in_cva}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider text-primary-light dark:text-primary-dark">
                  Razon por la cual no ha iniciado el CVA
                </h3>
                <p className="text-sm font-medium">{not_started_cva_reason}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider text-primary-light dark:text-primary-dark">
                  Cede del CVA
                </h3>
                <p className="text-sm font-medium">{cva_location}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium uppercase tracking-wider text-primary-light dark:text-primary-dark">
                  Modalidad
                </h3>
                <p className="text-sm font-medium">{cva_modality}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col  w-full">
        <div className="flex gap-2 justify-center items-center mt-4">
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
          <AreaChart chartData={chartData} title="Actividades realizadas" xAxysType="datetime" />
        </div>
        {/* <div className="w-1/3 mt-6 p-2 rounded-lg bg-white">
          <RadarChart dataSeries={dataSeries} />
        </div> */}
        {/* horarios en donde mas participa */}
        {/* tipos de chats que mas partici */}
      </div>
      {searchParams?.actividad === 'talleres' && (
        <div className="flex justify-center items-center ">
          <Table
            tableColumns={singleScholarWorkshopsColumns}
            tableData={workshops || []}
            tableHeadersForSearch={[{ option: 'adsf', label: 'adsfadsf' }]}
          />
        </div>
      )}
    </section>
  );
};

export default page;
