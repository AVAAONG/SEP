import ActivityPanelInfo from '@/components/ActivityPanelInfo';
import Table from '@/components/table/Table';
import ScholarActivityAttendance from '@/components/table/columns/scholarActivityAttendace';
import { WorkshopWithSpeaker } from '@/lib/db/types';
import { getWorkshop } from '@/lib/db/utils/Workshops';
import { prisma } from '@/lib/db/utils/prisma';
import { formatScholarDataForAttendanceTable } from '@/lib/tableUtils';
import ExportButton from '@/lib/temp';
import { parseModalityFromDatabase, parseSkillFromDatabase } from '@/lib/utils2';
import { Button } from '@nextui-org/react';
import { Modality } from '@prisma/client';
import shortUUID from 'short-uuid';

const page = async ({ params }: { params: { workshopId: shortUUID.SUUID } }) => {
  const workshopId = params.workshopId || ('null' as shortUUID.SUUID);
  const workshop = await getWorkshop(workshopId);
  const {
    title,
    start_dates,
    end_dates,
    description,
    speaker,
    modality,
    asociated_skill,
    platform,
    scholar_attendance,
  } = workshop || {};

  const scholarAttendanceDataForTable = formatScholarDataForAttendanceTable(
    scholar_attendance ? scholar_attendance.map((a) => a.scholar.scholar) : [],
    scholar_attendance ? scholar_attendance : []
  );
  const scholarDataToExport = scholarAttendanceDataForTable.map((scholar) => {
    return {
      names: scholar.first_names.split(' ')[0] + ' ' + scholar.last_names.split(' ')[0],
      dni: scholar.dni,
    };
  });

  let attendedScholarsCount = 0;
  let unAttendedScholarsCount = 0;
  let cancelledScholarsCount = 0;
  let enroledScholars = 0;

  scholar_attendance?.forEach((scholar_att) => {
    switch (scholar_att.attendance) {
      case 'ATTENDED':
        attendedScholarsCount++;
        break;
      case 'NOT_ATTENDED':
        unAttendedScholarsCount++;
        break;
      case 'CANCELLED':
        cancelledScholarsCount++;
        break;
      case 'ENROLLED':
        enroledScholars++;
        break;
      default:
        break;
    }
  });

  const g = [
    {
      title: 'Total de inscritos',
      value: enroledScholars,
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
      value: cancelledScholarsCount,
    },
  ];

  const allowSatisfactionSurvey = async () => {
    if (workshop?.activity_status === 'DONE') {
      await prisma.workshop.update({
        where: {
          id: workshopId,
        },
        data: {
          activity_status: 'ATTENDANCE_CHECKED',
        },
      });
      return 'Encuesta de satisfacción enviada';
    } else if (workshop?.activity_status === 'ATTENDANCE_CHECKED') {
      return 'La encuesta de satisfaccion ya ha sido enviada';
    }
  };

  return (
    <div className="space-y-6  min-h-screen">
      <ActivityPanelInfo activity={workshop as WorkshopWithSpeaker}>
        <div className="w-full grid grid-cols-2 gap-4">
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
          {workshop?.activity_status === 'SENT' && (
            <Button
              color="success"
              className="text-white"
              onPress={async () => allowSatisfactionSurvey()}
            >
              Habilitar encuesta de satisfacción
            </Button>
          )}
        </div>
      </ActivityPanelInfo>

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
                competenceOrLevel={parseSkillFromDatabase(asociated_skill!)}
                date={start_dates ? new Date(start_dates[0]).toLocaleDateString('ez-VE') : ''}
                hour={
                  start_dates
                    ? new Date(start_dates[0]).toLocaleTimeString('es-ES', {
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
