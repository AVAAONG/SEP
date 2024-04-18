import AddScholarToActivity from '@/components/AddScholarToActivity';
import DisplayDate from '@/components/DisplayDate';
import DisplayTime from '@/components/DisplayTime';
import QuitScholarFromActivity from '@/components/QuitScholarFromActivity';
import VolunteerStatusWidget from '@/components/VolunteerStatus';
import Table from '@/components/table/Table';
import ScholarVolunteerAttendance from '@/components/table/columns/scholarsVolunteerAttendance/columns';
import { formatScholarDataForVolunteerAttendanceTable } from '@/components/table/columns/scholarsVolunteerAttendance/formater';
import { getBlobFile } from '@/lib/azure/azure';
import { getVolunteer } from '@/lib/db/utils/Workshops';
import { getNotEnrolledScholarsInVolunteer } from '@/lib/db/utils/users';
import { parsePlatformFromDatabase } from '@/lib/utils2';
import { DocumentIcon } from '@heroicons/react/24/outline';
import { Avatar } from '@nextui-org/react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import shortUUID from 'short-uuid';

const page = async ({ params }: { params: { volunteerId: shortUUID.SUUID } }) => {
  const volunteerId = params.volunteerId || null;

  if (!volunteerId) return null;
  const volunteer = await getVolunteer(volunteerId);
  if (!volunteer) return notFound();

  const {
    start_dates,
    end_dates,
    modality,
    platform,
    proof,
    description,
    title,
    supervisor,
    supervisor_email,
    volunteer_attendance,
  } = volunteer;
  const proofLink = proof ? await getBlobFile(proof) : '#';
  const scholars = volunteer_attendance.map((a) => a.scholar.scholar);
  const scholarAttendanceDataForTable = await formatScholarDataForVolunteerAttendanceTable(
    scholars,
    volunteer_attendance
  );
  const notEnrolledScholars = await getNotEnrolledScholarsInVolunteer(volunteerId);

  return (
    <div className="min-h-screen flex flex-col gap-4">
      <section className="flex flex-col md:flex-row gap-4 md:gap-0 rounded-lg bg-white dark:bg-gray-900 p-8 ">
        <div className="space-y-3 w-full lg:w-1/2 ">
          <div className="flex flex-col space-y-2 ">
            <div className="flex gap-2 items-center">
              <div className="w-fit font-medium px-2">Acvtividad de Voluntariado</div>
              <div>
                <VolunteerStatusWidget value={volunteer.status} />
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
                  <div
                    key={index}
                    className="flex flex-col space-y-2 border-l-2 border-primartext-primary-light pl-1.5 sm:pl-3"
                  >
                    <div className="space-y-sm">
                      <h3 className="text-sm leading-6 text-secondary">Fecha {index + 1}:</h3>
                      <p className="text-base font-semibold">
                        <DisplayDate date={date.toISOString()} />
                      </p>
                    </div>
                    <div className="space-y-sm">
                      <h3 className="text-sm leading-6 text-secondary">
                        Hora de inicio {index + 1}:
                      </h3>
                      <p className="text-base font-semibold">
                        <DisplayTime time={date.toISOString()} />
                      </p>
                    </div>
                    <div className="space-y-sm">
                      <h3 className="text-sm leading-6 text-secondary">
                        Fecha de cierre {index + 1}:
                      </h3>
                      <p className="text-base font-semibold">
                        <DisplayDate date={end_dates[index].toISOString()} />
                      </p>
                    </div>
                    <div className="space-y-sm">
                      <h3 className="text-sm leading-6 text-secondary">
                        Hora de cierre {index + 1}:
                      </h3>
                      <p className="text-base font-semibold">
                        <DisplayTime time={end_dates[index].toISOString()} />
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
              <p className="text-base font-semibold capitalize">
                {parsePlatformFromDatabase(platform)}
              </p>
              {proof && (
                <div className="flex gap-3">
                  <p className="font-bold">Carta de voluntariado</p>
                  <Link href={proofLink || ''}>
                    <DocumentIcon className="h-5 w-5 text-primary-light cursor-pointer" />
                  </Link>
                </div>
              )}
            </div>
            <div className="space-y-1">
              {description && (
                <h2 className="text-xl  font-semibold text-primary-light">Descripción:</h2>
              )}{' '}
              <p className="text-sm list-disc space-y-sm w-full">{description}</p>
            </div>
          </div>
          <div className="w-full space-y-3">
            <h2 className="text-xl font-semibold text-primary-light">Encargado</h2>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-9 w-9 shrink-0">
                  <Avatar
                    alt={supervisor || undefined}
                    src={undefined}
                    className="max-h-[35px] w-[35px] h-[35px] overflow-hidden rounded-full"
                  />
                </div>
                <div className="space-y-sm">
                  <div>
                    <h3 className="text-sm font-semibold">{supervisor}</h3>
                    <h4 className="text-xs uppercase">{supervisor_email}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full space-y-3">
        <h2 className="px-8 text-2xl leading-none tracking-tight text-primary-light font-semibold">
          Becarios inscritos
        </h2>
        <div className="flex flex-row items-center space-x-2">
          <div className="overflow-x-scroll md:overflow-x-clip rounded-lg w-full">
            <Table
              tableColumns={ScholarVolunteerAttendance}
              tableData={scholarAttendanceDataForTable}
              tableHeadersForSearch={[]}
            >
              <AddScholarToActivity
                scholars={notEnrolledScholars}
                activityId={volunteerId}
                kindOfActivity="volunteer"
              />

              <QuitScholarFromActivity
                scholars={notEnrolledScholars}
                activityId={volunteerId}
                kindOfActivity="volunteer"
              />
            </Table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
