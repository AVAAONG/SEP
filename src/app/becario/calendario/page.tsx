import Calendar from '@/components/calendar/Calendar'
import { BigCalendarEventType } from '@/types/Calendar'
import React from 'react'


/**
 * The ExampleEvents constant is an array of BigCalendarEventType objects that represent the events to be displayed in the calendar.
 * @remarks The BigCalendarEventType type is defined in the src/types/Calendar.ts file.
 */
const ExampleEvents: BigCalendarEventType[] = [
    {
        title: 'All Day Event very long title',
        start: new Date(2023, 7, 13),
        end: new Date(2023, 7, 13),
        allDay: true,
    }
]

/**
 * Renders the page component with the calendar of activities
 * @remarks this page is willing to show the calendar of activities that proexcelencia will offer to the students. All of them, no matter if the scholar is registered or not in activities.
 * @returns The HTML document with the rendered page component.
 */
const page = () => {
    return (
        <div className="flex flex-col px-2 pt-6 justify-center items-center w-full text-center gap-2 sm:gap-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white mb-2">¡Calendario de Actividades{" "}
                <span className="highlight bg-gradient-to-r from-emerald-800 to-emerald-600 dark:from-green-100 dark:to-emerald-600 bg-clip-text text-transparent font-bold"
                >ProExcelencia
                </span>
                !</h1>
            <h2 className="text-xs font-semibold text-gray-900 sm:text-base dark:text-gray-400 italic">En esta pagina podras visualizar todas las actividades que proexcelencia oferto y estara ofertando</h2>
            <h3 className="text-xs font-semibold text-emerald-700 sm:text-sm dark:text-emerald-500"> Ten en consideracion que laas fechas y horarios de estas actividades estan sujeto a cambio.</h3>
            <div className='w-full mt-6'>
                <div className='h-full min-h-[600px] text-gray-800 capitalize dark:text-gray-300 shadow-sm overflow-x-clip w-full bg-white border border-gray-200  shadow-emerald-600 dark:border-emerald-800  dark:bg-slate-950 rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-40 p-2'>
                    <Calendar events={ExampleEvents} />
                </div>
            </div>
        </div>
    )
}

export default page