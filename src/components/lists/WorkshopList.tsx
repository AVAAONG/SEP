import React from 'react'
import { XIcon, EditIcon } from '@/assets/svgs'
import { SUUID } from 'short-uuid'
import { Workshop, WorkshopDates, WorkshopSpeaker, WorkshopTempData } from '@prisma/client';

interface WorkshopsListProps {
    workshopData: (Workshop & {
        speaker: WorkshopSpeaker[];
        dates: WorkshopDates[];
        tempData: WorkshopTempData | null;
    })[],
    deleteEntry: (id: SUUID, calendarId: string) => void,
    editEntry: (id: SUUID) => void
}

const WorkshopsList: React.FC<WorkshopsListProps> = (props) => {
    const { workshopData, deleteEntry, editEntry } = props
    return (
        <div className="flow-root w-full">
            <ul role="list" className='flex flex-col gap-2'>
                {workshopData.map(
                    (workshop) => {
                        const { speaker, dates, title, id, pensum, spots, avaaYear, platform, modality, tempData } = workshop
                        return (
                            <li key={title} className="py-2 focus:outline-none focus:outline-offset-0 px-3 rounded-md w-full bg-emerald-950 flex items-center justify-center gap-2">
                                <div className='w-4'>
                                    <span className="sr-only">Enviar Taller</span>
                                    <input type="checkbox" className='w-3 h-3 bg-emerald-900 accent-green-500 text-emerald-600 border-gray-300 focus:ring-0 ' />
                                </div>
                                <button onClick={() => { editEntry(id as SUUID) }} type="button" className='w-4'>
                                    <EditIcon />
                                    <span className="sr-only">Editar taller</span>
                                </button>

                                <div className="flex-1 min-w-fit">
                                    <p className="text-sm font-medium  truncate text-white">
                                        {title}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate ">
                                        Por: {speaker[0].name}
                                    </p>
                                </div>
                                <div className="flex-1 min-w-0 text-center">
                                    <p className="text-sm font-medium truncate text-white">
                                        {new Date(dates[0].start_date).toLocaleString('es-ES', { month: 'long', day: 'numeric' })}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate ">
                                        De {new Date(dates[0].start_date).toLocaleString('es-ES', { hour:'2-digit', minute: '2-digit' })} a {new Date(dates[0].end_date).toLocaleString('es-ES', { hour:'2-digit', minute: '2-digit' })}

                                    </p>
                                </div>
                                <div className="flex-1 min-w-0 text-center">
                                    <p className="text-sm font-medium truncate text-white">
                                        {pensum}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate ">
                                        {spots} cupos
                                    </p>
                                    <p className="text-xs text-gray-500 truncate ">
                                        {avaaYear.toString().replaceAll(',', ' y ')} Año
                                    </p>
                                </div>
                                <div className="flex-1 min-w-0 text-center">
                                    <p className="text-sm font-medium truncate text-white">
                                        {modality}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate ">
                                        {platform}
                                    </p>
                                </div>
                                <button onClick={() => { deleteEntry(id as SUUID, tempData?.calendarID!) }} type="button" className='w-4'  >
                                    <XIcon />
                                    <span className="sr-only">Eliminar taller</span>
                                </button>
                            </li>
                        )
                    })}
            </ul>
        </div >
    )
}

export default WorkshopsList;