import { Workshop, WorkshopSpeaker, WorkshopTempData } from '@prisma/client';
import { headers } from 'next/headers';

const page = async () => {
  const host = headers().get('host');
  const data = await fetch(`http://${host}/api/workshop`, {
    cache: 'no-cache',
  });

  const workshopsData: (Workshop & {
    speaker: WorkshopSpeaker[];
    tempData: WorkshopTempData | null;
  })[] = await data.json();

  return (
    <div>
      <div className="flex flex-col px-2 pt-6 xl:gap-4">
        <div className="mb-4 col-span-full xl:mb-2">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
            Lstado de chats
          </h1>
          <div className="h-full max-w-7xl flex flex-col gap-4 pt-4"></div>
        </div>
      </div>
    </div>
  );
};

export default page;
