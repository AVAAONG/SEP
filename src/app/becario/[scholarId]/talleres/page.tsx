import Stats from '@/components/ScholarStats';
import ChatTable from '@/components/table/Table2';
import { getWorkshopsByScholar, getWorkshopsByScholar2 } from '@/lib/database/Workshops';
import {  Workshop, WorkshopSpeaker, WorkshopTempData } from '@prisma/client';
import { headers } from 'next/headers';
import React from 'react'

const page = async ({
  params,
}: {
  params: { scholarId: string };
}) => {
  const scholarId = params.scholarId;

  const workshops = await getWorkshopsByScholar2(scholarId)
  return (
    <div>
      <div className="flex flex-col px-2 pt-6 xl:gap-4">
        <div className="mb-4 col-span-full xl:mb-2">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Listado de talleres</h1>
          <div className="h-full max-w-7xl flex flex-col gap-4 pt-4">
            <Stats workshops={workshops} kindOfActivity="workshop" />
            <ChatTable workshopData={workshops} />
          </div>
        </div>
      </div>
    </div>

  )
}

export default page