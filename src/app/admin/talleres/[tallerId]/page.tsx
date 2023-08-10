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

  return (
    <div className="space-y-6 text-primary p-8">
      <div className="flex flex-col space-y-3">
        <span className="pipe w-fit text-green-500">Taller ProExcelencia</span>
        <h1 className="text-2xl font-semibold leading-none tracking-tight text-primary md:text-5xl">
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

      <section className="w-full space-y-3">
        <h2 className="text-2xl font-semibold text-green-500">Becarios:</h2>
        <div className="flex flex-row items-center space-x-2">
          <div className="overflow-x-scroll md:overflow-x-clip rounded-lg w-[95%] mb-8 mt-16 scroll ">
            <table className="w-full text-sm text-left text-gray-300 bg-gradient-to-b from-emerald-950 to-slate-950">
              <thead className="text-xs text-green-500 uppercase bg-transparent text-center border-b-2 border-green-600">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                  <th scope="col" className="px-6 py-3">
                    Nivel de chat
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                  <th scope="col" className="px-6 py-3">
                    Calificacion obtenida
                  </th>
                </tr>
              </thead>
              <tbody>
                {TEMPORAL_DATA.map(({ chatDate, id, level, scholars, kindOfChat }) => {
                  return (
                    <tr
                      className="border-b bg-transparent border-gray-700 hover:bg-green-700 hover:text-white text-center"
                      key={id}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium  whitespace-nowrap text-white"
                      >
                        {chatDate}
                      </th>
                      <td className="px-6 py-4">{modality}</td>
                      <td className="px-6 py-4">{scholars}</td>
                      <td className="px-6 py-4">{level}</td>
                      <td className="px-6 py-4">{kindOfChat}</td>
                      <td className="px-6 py-4 w-1">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-yellow-400 inline"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>First star</title>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-yellow-400 inline"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Second star</title>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-yellow-400 inline"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Third star</title>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-yellow-400 inline"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Fourth star</title>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        {/* <svg aria-hidden="true" className="w-5 h-5 text-gray-500 inline" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg> */}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
              {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span></span> */}
              <ul className="inline-flex items-center -space-x-px">
                <li>
                  <a
                    href="#"
                    className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-current="page"
                    className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    ...
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    100
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
