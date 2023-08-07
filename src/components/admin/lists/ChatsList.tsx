import React from 'react'
import { Chat } from '@/types/Chat'
import { XIcon, EditIcon } from '@/assets/svgs'
import shortUUID from 'short-uuid'

interface ChatsListProps {
    chatsData: Chat[],
    deleteEntry: (id: shortUUID.SUUID) => void,
    editEntry: (id: shortUUID.SUUID) => void
}

const ChatsList: React.FC<ChatsListProps> = (props) => {
    const { chatsData, deleteEntry, editEntry } = props
    return (
        <div className="flow-root w-full " >
            <ul role="list" className='flex flex-col gap-4'>
                {chatsData.map(({ name, date, kindOfChat, turn, speaker, id, startHour, endHour, numberOfParticipants, level, platform }: Chat) => {
                    return (
                        <li key={name} className="py-2 focus:outline-none focus:outline-offset-0 px-3 rounded-md w-full bg-emerald-950 flex items-center justify-center  gap-2">
                            <button onClick={() => { editEntry(id) }} type="button" className='w-4'>
                                <EditIcon />
                                <span className="sr-only">Editar chat</span>
                            </button>

                            <div className="flex-1 min-w-fit">
                                <p className="text-sm font-medium text-gray-900 truncate text-white">
                                    {name}
                                </p>
                                <p className="text-xs text-gray-500 truncate text-gray-400">
                                    Por: {speaker}
                                </p>
                            </div>
                            <div className="flex-1 min-w-0 text-center">
                                <p className="text-sm font-medium text-gray-900 truncate text-white">
                                    {new Date(date).getDate()}/{new Date(date).getMonth() + 1}
                                </p>
                                <p className="text-xs text-gray-500 truncate text-gray-400">
                                    De {startHour} a {endHour}
                                </p>
                            </div>
                            <div className="flex-1 min-w-0 text-center">
                                <p className="text-sm font-medium text-gray-900 truncate text-white">
                                    {level}
                                </p>
                                <p className="text-xs text-gray-500 truncate text-gray-400">
                                    {numberOfParticipants} cupos
                                </p>
                                <p className="text-xs text-gray-500 truncate text-gray-400 font-semibold">
                                    Turno: {turn}
                                </p>
                            </div>
                            <div className="flex-1 min-w-0 text-center">
                                <p className="text-sm font-medium text-gray-900 truncate text-white">
                                    {kindOfChat}
                                </p>
                                <p className="text-xs text-gray-500 truncate text-gray-400">
                                    {platform}
                                </p>
                            </div>
                            <button onClick={() => { deleteEntry(id) }} type="button" className='w-4'>
                                <XIcon />
                                <span className="sr-only">Eliminar chat</span>
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div >
    )
}

export default ChatsList;
