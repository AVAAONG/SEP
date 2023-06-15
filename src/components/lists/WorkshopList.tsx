import React from 'react'
import { Workshop } from '@/types/Workshop'
import { XIcon, EditIcon } from '@/assets/svgs'
import shortUUID from 'short-uuid'

interface WorkshopsListProps {
    workshopData: Workshop[],
    deleteEntry: (id: shortUUID.SUUID) => void,
    editEntry: (id: shortUUID.SUUID) => void
}

const WorkshopsList: React.FC<WorkshopsListProps> = (props) => {
    const { workshopData, deleteEntry, editEntry } = props
    console.log(workshopData)
    console.log("From compoent")
    return (
        <div className="flow-root w-full">
            <ul role="list" className='flex flex-col gap-2'>
                {workshopData.map(({ title, dates, pensum, modality, speaker, id, spots, avaaYear, platform }: Workshop) => {
                    return (
                        <li key={title} className="py-2 focus:outline-none focus:outline-offset-0 px-3 rounded-md w-full bg-emerald-950 flex items-center justify-center gap-2">
                            <button onClick={() => { editEntry(id) }} type="button" className='w-4'>
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
                                    {new Date(dates[0].start_date).getDate()}/{new Date(dates[0].end_date).getMonth()}                                </p>
                                <p className="text-xs text-gray-500 truncate ">
                                    De {new Date(dates[0].start_date).getUTCHours()} a {new Date(dates[0].end_date).getUTCHours()}

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
                            <button onClick={() => { deleteEntry(id) }} type="button" className='w-4'  >
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