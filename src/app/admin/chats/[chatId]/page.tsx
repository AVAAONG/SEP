import defailProfilePic from '@/../public/defaultProfilePic.png';
import ActivityStatus from '@/components/table/ActivityStatus';
import Table from '@/components/table/Table';
import ScholarActivityAttendance from '@/components/table/columns/scholarActivityAttendace';
import { getChat } from '@/lib/db/utils/chats';
import { prisma } from '@/lib/db/utils/prisma';
import { formatScholarDataForAttendanceTable } from '@/lib/tableUtils';
import ExportButton from '@/lib/temp';
import { parseChatLevelFromDatabase, parseModalityFromDatabase } from '@/lib/utils2';
import { Button } from '@nextui-org/react';
import { Gender, Modality, ScholarAttendance } from '@prisma/client';
import Image from 'next/image';
import shortUUID from 'short-uuid';

export interface IScholarForAttendanceTable {
  id: string;
  first_names: string;
  last_names: string;
  email: string | null;
  phone_number: string | null;
  whatsAppNumber: string | null;
  dni: string;
  gender: Gender;
  attendance?: ScholarAttendance;
}

const page = async ({ params }: { params: { chatId: shortUUID.SUUID } }) => {
  const chatId = params.chatId || ('null' as shortUUID.SUUID);

  const chat = await getChat(chatId);
  const {
    title,
    level,
    start_dates,
    description,
    speaker,
    modality,
    platform,
    scholar_attendance,
  } = chat || {};

  const scholarAttendanceDataForTable = formatScholarDataForAttendanceTable(
    scholar_attendance ? scholar_attendance.map((a) => a.scholar.scholar) : [],
    scholar_attendance ? scholar_attendance : []
  );

  const scholarDataToExport = scholarAttendanceDataForTable.map((scholar) => {
    return {
      names: scholar.first_names.split(' ')[0] + ' ' + scholar.last_names.split(' ')[0],
      dni: scholar.dni,
      email: scholar.email,
      phone: scholar.phone_number,
    };
  });

  const attendedScholarsCount = scholar_attendance?.filter(
    (scholar_att) => scholar_att.attendance === 'ATTENDED'
  ).length;
  const unAttendedScholarsCount = scholar_attendance?.filter(
    (scholar_att) => scholar_att.attendance === 'NOT_ATTENDED'
  ).length;

  const g = [
    {
      title: 'Total de inscritos',
      value: scholar_attendance?.length,
    },
    {
      title: 'Total de asistentes',
      value: attendedScholarsCount,
    },
    {
      title: 'Total de inasistentes',
      value: unAttendedScholarsCount,
    },
    {
      title: 'Total de cancelaciones',
      value: 0,
    },
  ];

  const allowSatisfactionSurvey = async () => {
    if (chat?.activity_status === 'DONE') {
      await prisma.chat.update({
        where: {
          id: chatId,
        },
        data: {
          activity_status: 'ATTENDANCE_CHECKED',
        },
      });
      return 'Encuesta de satisfacción enviada';
    } else if (chat?.activity_status === 'ATTENDANCE_CHECKED') {
      return 'La encuesta de satisfaccion ya ha sido enviada';
    }
  };

  return (
    <div className="space-y-6  min-h-screen">
      <section className="flex bg-white rounded-lg p-8">
        <div className="space-y-3 w-1/2">
          <div className="flex flex-col space-y-2 ">
            <div className="flex gap-2 items-center">
              <div className="w-fit font-medium px-2">Chat club</div>
              <div>
                <ActivityStatus value={chat?.activity_status!} />
              </div>
            </div>
            <h1 className="italic text-xl font-bold leading-none tracking-tight text-primary-light md:text-3xl">
              {title}
            </h1>
          </div>

          <h2 className="text-xl  font-semibold text-primary-light">Fechas:</h2>
          <div className="space-y-4">
            <div className="flex space-x-4">
              {start_dates?.map((date, index) => {
                return (
                  <div className="flex flex-col space-y-2 border-l-2 border-primartext-primary-light pl-1.5 sm:pl-3">
                    <div className="space-y-sm">
                      <h3 className="text-sm leading-6 text-secondary">Fecha {index + 1}:</h3>
                      <p className="text-base font-semibold">
                        {new Date(date).toLocaleDateString('es-VE')}
                      </p>
                    </div>
                    <div className="space-y-sm">
                      <h3 className="text-sm leading-6 text-secondary">Hora de inicio:</h3>
                      <p className="text-base font-semibold">
                        {new Date(date)
                          .toLocaleTimeString('es-VE', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                          .toUpperCase()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-primary-light">
                {modality === 'ONLINE' ? 'Plataforma' : 'Lugar'}
              </h3>
              <p className="text-base font-semibold capitalize">{platform}</p>
            </div>
            <div className="space-y-1">
              {description && (
                <h2 className="text-xl  font-semibold text-primary-light">Descripción:</h2>
              )}{' '}
              <p className="text-sm list-disc space-y-sm w-full">{description}</p>
            </div>
          </div>
          <div className="w-full space-y-3">
            <h2 className="text-xl font-semibold text-primary-light">
              {speaker && speaker.length >= 2 ? 'Facilitadores' : 'Facilitador'}
            </h2>
            <div className="flex flex-col space-y-4">
              {speaker?.map((s) => (
                <div className="flex items-center space-x-2">
                  <div className="h-9 w-9 shrink-0">
                    <Image
                      alt={s.first_names}
                      loading="lazy"
                      src={s.image ?? defailProfilePic}
                      className="max-h-[72px] overflow-hidden rounded-full"
                      width="72"
                      height="72"
                    />
                  </div>
                  <div className="space-y-sm">
                    <div>
                      <h3 className="text-sm font-semibold">
                        {s.first_names.split(' ')[0]} {s.last_names.split(' ')[0]}
                      </h3>
                      <h4 className="text-xs uppercase">{s.job_company}</h4>
                      <p className="text-sm">{s.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/2 grid grid-cols-2 gap-4">
          {g.map(({ title, value }) => (
            <div className="rounded-lg border text-card-foreground shadow-sm w-full">
              <div className="flex flex-col space-y-1.5 p-6 ">
                <h3 className="text-lg font-semibold whitespace-nowrap leading-none tracking-tight">
                  {title}
                </h3>
              </div>
              <p className="text-4xl font-semibold whitespace-nowrap leading-none tracking-tight p-6">
                {value}
              </p>
            </div>
          ))}
          {chat?.activity_status === 'DONE' && (
            <Button
              color="success"
              className="text-white"
              onPress={async () => allowSatisfactionSurvey()}
            >
              Habilitar encuesta de satisfacción
            </Button>
          )}
        </div>
      </section>
      <section className="w-full space-y-3">
        <h2 className="px-8 text-2xl leading-none tracking-tight text-primary-light font-semibold">
          Becarios
        </h2>
        <div className="flex flex-row items-center space-x-2">
          <div className="overflow-x-scroll md:overflow-x-clip rounded-lg w-full">
            <Table
              tableColumns={ScholarActivityAttendance}
              tableData={scholarAttendanceDataForTable}
              tableHeadersForSearch={[]}
            >
              <ExportButton
                activityTitle={title!}
                competenceOrLevel={parseChatLevelFromDatabase(level!)}
                date={start_dates ? new Date(start_dates[0]).toLocaleDateString('ez-VE') : ''}
                hour={
                  start_dates
                    ? new Date(start_dates[0]).toLocaleTimeString('es-VE', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })
                    : ''
                }
                modality={parseModalityFromDatabase(modality as Modality)}
                platform={platform!}
                speakerName={
                  speaker![0].first_names.split(' ')[0] + ' ' + speaker![0].last_names.split(' ')[0]
                }
                attendeesData={scholarDataToExport}
              />
            </Table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
