import defailProfilePic from '@/../public/defaultProfilePic.png';
import { getWorkshop } from '@/lib/db/utils/Workshops';
import Image from 'next/image';
import shortUUID from 'short-uuid';

const page = async ({
  params,
  searchParams,
}: {
  params: { workshopId: shortUUID.SUUID };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const workshopId = params.workshopId || ('null' as shortUUID.SUUID);

  const workshop = await getWorkshop(workshopId);
  const { title, start_dates, end_dates, description, speaker, modality, platform } =
    workshop || {};

  return (
    <div className="space-y-6 p-8 min-h-screen">
      <div className="flex flex-col space-y-2">
        <span className="w-fit font-medium">Actividad formativa</span>
        <h1 className="text-xl font-bold leading-none tracking-tight text-primary-light md:text-4xl">
          {title}
        </h1>
        {/* <p className="space-y-2 text-[16px] leading-[1.5] text-secondary">Join us for an upcoming Tech Talk where PlanetScale and Hightouch cover how you can make use of one of your most valuable company assets: product data.</p> */}
      </div>
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-green-500">Detalles:</h2>
        <div className="space-y-2">
          <div className="-ml-1.5 space-y-2 border-l-2 border-green-500 pl-1.5 sm:-ml-3 sm:pl-3">
            <div className="space-y-sm">
              <h3 className="text-sm leading-6 text-secondary">Fecha:</h3>
              <p className="text-base font-semibold">
                {new Date(start_dates[0]).toLocaleDateString('es-ES')}
              </p>
            </div>
            <div className="space-y-sm">
              <h3 className="text-sm leading-6 text-secondary">Hora:</h3>
              <p className="text-base font-semibold">
                {new Date(start_dates[0]).toLocaleTimeString('es-ES')}
              </p>
            </div>
            <div className="space-y-sm">
              <h3 className="text-sm leading-6 text-secondary">
                {modality === 'ONLINE' ? 'Plataforma' : 'Lugar'}
              </h3>
              <p className="text-base font-semibold capitalize">{platform}</p>
            </div>
          </div>
          {/* <p>The ability to easily access and analyze real-time product data can make a huge impact on your company and strategy. Product data, however, is often one of the most siloed from your data stack, making it difficult to access.</p>
                    <p>In this Tech Talk, we’ll cover how Hightouch and PlanetScale make it simple to access and utilize your product data — without heavy engineering work. Fill out the form on the right to register.</p> */}
          <p className="text-xl font-semibold text-green-500">Descripción:</p>
          <p className="ml-2 list-disc space-y-sm w-2/3">{description}</p>
        </div>
        <div className="w-full space-y-3">
          <h2 className="text-2xl font-semibold text-green-500">
            {speaker?.length >= 2 ? 'Facilitadores' : 'Facilitador'}
          </h2>
          <div className="flex flex-row items-center space-x-2">
            <div className="h-9 w-9 shrink-0">
              <Image
                alt={speaker[0].first_names}
                loading="lazy"
                src={speaker[0].image ?? defailProfilePic}
                className="max-h-[72px] overflow-hidden rounded-full"
                width="72"
                height="72"
              />
            </div>
            <div className="space-y-sm">
              <div>
                <h3 className="text-sm font-semibold">
                  {speaker[0].first_names} {speaker[0].last_names}
                </h3>
                <h4 className="text-xs uppercase">{speaker[0].job_company}</h4>
                <p className="text-sm">{speaker[0].description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full space-y-3">
        <h2 className="text-2xl font-semibold text-green-500">Becarios:</h2>
        <div className="flex flex-row items-center space-x-2">
          <div className="overflow-x-scroll md:overflow-x-clip rounded-lg w-[95%] mb-8 mt-16 scroll "></div>
        </div>
      </section>
    </div>
  );
};

export default page;
