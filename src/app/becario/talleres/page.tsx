import Stats from '@/components/ScholarStats';
import ChatTable from '@/components/table/Table2';
import { getWorkshopsByScholar2 } from '@/lib/database/Workshops';
import React from 'react'

/**
 * Renders the page component with a list of workshops for a specific scholar.
 * @returns The HTML document with the rendered page component.
 */
const page = async () => {
  const scholarId = "cljwyi8hl0008uwmkjo6dktty";
  const workshops = await getWorkshopsByScholar2(scholarId);

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