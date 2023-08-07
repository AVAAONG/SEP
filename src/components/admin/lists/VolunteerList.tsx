import React from 'react'
import { XIcon, EditIcon } from '@/assets/svgs'
import shortUUID from 'short-uuid'
import { Volunteer } from '@/types/Volunteer'

interface VolunteerListProps {
    volunteerData: Volunteer[],
    deleteEntry: (id: shortUUID.SUUID) => void,
    editEntry: (id: shortUUID.SUUID) => void
}

const VolunteerList: React.FC<VolunteerListProps> = (props) => {
    const { volunteerData, deleteEntry, editEntry } = props
    return (
        <div className="flow-root w-full " >
            <ul role="list" className='flex flex-col gap-4'>
                {volunteerData.map(({ name,
                    asociatedProject,
                    startDate,
                    endDate,
                    startHour,
                    endHour,
                    inCharge,
                    numberOfParticipants,
                    kindOfVolunteer,
                    place,
                    description,
                    id }: Volunteer) => {
                    return (
                        <li key={name} className="py-2 focus:outline-none focus:outline-offset-0 px-3 rounded-md bg-emerald-950 flex items-center justify-center w-full gap-2">
                            <button onClick={() => { editEntry(id) }} type="button" className='w-4'>
                                <EditIcon />
                                <span className="sr-only">Editar volunteriado</span>
                            </button>

                            <div className="flex-1 min-w-fit">
                                <p className="text-sm font-medium text-gray-900 truncate text-white">
                                    {name}
                                </p>
                                <p className="text-xs text-gray-500 truncate text-gray-400">
                                    {asociatedProject}
                                </p>
                            </div>
                            <div className="flex-1 min-w-0 text-center">
                                <p className="text-sm font-medium text-gray-900 truncate text-white">
                                    {startDate === endDate ? `${new Date(startDate).getDate()}/${new Date(startDate).getMonth() + 1}` : `Del ${new Date(startDate).getDate()}/${new Date(startDate).getMonth() + 1} al ${new Date(endDate).getDate()}/${new Date(endDate).getMonth() + 1}`}
                                </p>
                                <p className="text-xs text-gray-500 truncate text-gray-400">
                                    De {startHour} a {endHour}
                                </p>
                            </div>
                            <div className="flex-1 min-w-0 text-center">
                                <p className="text-sm font-medium text-gray-900 truncate text-white">
                                    {place}
                                </p>
                                <p className="text-xs text-gray-500 truncate text-gray-400">
                                    {numberOfParticipants} cupos
                                </p>
                            </div>
                            <div className="flex-1 min-w-0 text-center">
                                <p className="text-sm font-medium text-gray-900 truncate text-white">
                                    {kindOfVolunteer}
                                </p>
                            </div>
                            <button onClick={() => { deleteEntry(id) }} type="button" className='w-4'>
                                <XIcon />
                                <span className="sr-only">Eliminar Voluntariado</span>
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div >
    )
}

export default VolunteerList;
