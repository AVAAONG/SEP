import { getWorkshop } from '@/lib/database/Workshops';
import React from 'react';
import shortUUID from 'short-uuid';

const TEMPORAL_DATA = [
  {
    id: 1,
    chatName: 'Two experience at the US',
    kindOfChat: 'Virtual',
    chatDate: '14/04/2023',
    level: 'Basico',
    scholars: 10,
  },
  {
    id: 2,
    chatName: "Let's learn grammar thogether",
    kindOfChat: 'Presencial',
    chatDate: '14/04/2023',
    level: 'Intermedio',
    scholars: 15,
  },
  {
    id: 3,
    chatName: "Let's learn grammar thogether",
    kindOfChat: 'Presencial',
    chatDate: '14/04/2023',
    level: 'Intermedio',
    scholars: 8,
  },
  {
    id: 4,
    chatName: 'The ABC',
    kindOfChat: 'Presencial',
    chatDate: '14/04/2023',
    level: 'Intermedio',
    scholars: 9,
  },
  {
    id: 5,
    chatName: 'How to be a good leader',
    kindOfChat: 'Presencial',
    chatDate: '14/04/2023',
    level: 'Intermedio',
    scholars: 7,
  },
];

const page = async ({
  params,
  searchParams,
}: {
  params: { tallerId: shortUUID.SUUID };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const workshopId = params.tallerId || null;

  const workshop = await getWorkshop(workshopId!);

  const { title, description, dates, speaker, platform, modality } = workshop;
  console.log(description);

  return (
    <div className="space-y-6 text-primary p-8">
      <div className="flex flex-col space-y-3 items-center">
        <span className="pipe w-fit text-green-500 text-center font-semibold">
          Actividad formativa
        </span>
        <h1 className="text-2xl font-semibold leading-none tracking-tight text-center text-primary md:text-5xl">
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
                {new Date(dates[0].start_date).toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-sm">
              <h3 className="text-sm leading-6 text-secondary">Hora:</h3>
              <p className="text-base font-semibold">
                {new Date(dates[0].start_date).toLocaleTimeString()}
              </p>
            </div>
            <div className="space-y-sm">
              <h3 className="text-sm leading-6 text-secondary">
                {modality === 'VIRTUAL' ? 'Plataforma' : 'Lugar'}
              </h3>
              <p className="text-base font-semibold capitalize">
                {platform} ({modality})
              </p>
            </div>
          </div>
          {/* <p>The ability to easily access and analyze real-time product data can make a huge impact on your company and strategy. Product data, however, is often one of the most siloed from your data stack, making it difficult to access.</p>
                    <p>In this Tech Talk, we’ll cover how Hightouch and PlanetScale make it simple to access and utilize your product data — without heavy engineering work. Fill out the form on the right to register.</p> */}
          <p className="text-xl font-semibold text-green-500">Descripción:</p>
          <p className="ml-2 list-disc space-y-sm">{description}</p>
        </div>
        <div className="w-full space-y-3">
          <h2 className="text-2xl font-semibold text-green-500">Facilitador</h2>
          <div className="flex flex-row items-center space-x-2">
            <div className="h-9 w-9 shrink-0">
              <img
                alt="Gabriel Madureira"
                loading="lazy"
                src="https://planetscale-images.imgix.net/build/_assets/gabriel-madureira-JI6E4AAH.jpeg?auto=compress%2Cformat"
                className="max-h-[72px] overflow-hidden rounded-full"
                width="72"
                height="72"
              />
            </div>
            <div className="space-y-sm">
              <div>
                <h3 className="text-sm font-semibold">{speaker[0].name}</h3>
                <h4 className="text-sm text-secondary"></h4>
                <p className="text-sm">Description</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
