import defailProfilePic from '@/../public/defaultProfilePic.png';
import Table from '@/components/table/Table';
import ScholarActivityAttendance from '@/components/table/columns/scholarActivityAttendace';
import { getWorkshop } from '@/lib/db/utils/Workshops';
import Image from 'next/image';
import shortUUID from 'short-uuid';
import { formatScholarDataForAttendanceTable } from '../../chats/[chatId]/page';

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
    platform,
    scholar_attendance,
  } = workshop || {};

  const scholarAttendanceDataForTable = formatScholarDataForAttendanceTable(
    scholar_attendance?.map((a) => a.scholar.scholar),
    scholar_attendance
  );

  return (
    <div className="space-y-6  min-h-screen">
      <section className="flex bg-white rounded-lg p-8">
        <div className="space-y-3 w-1/2">
          <div className="flex flex-col space-y-2 ">
            <span className="w-fit font-medium px-2">Actividad formativa</span>
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
              {speaker && speaker.length && speaker.length >= 2 ? 'Facilitadores' : 'Facilitador'}
            </h2>
            <div className="flex flex-col space-y-4">
              {speaker?.map((s) => (
                <div key={s.email} className="flex items-center space-x-2">
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
                        {s.first_names} {s.last_names}
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
        <div className="w-1/2"></div>
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
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
