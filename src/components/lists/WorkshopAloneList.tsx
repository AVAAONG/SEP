import React from 'react'
import { Workshop, WorkshopDates, WorkshopSpeaker, WorkshopTempData } from '@prisma/client'

interface WorkshopsListProps {
    workshopData: Workshop & {
        speaker: WorkshopSpeaker[];
        dates: WorkshopDates[];
        tempData: WorkshopTempData | null;
    }[],
}

const WorkshopsAloneList: React.FC<WorkshopsListProps> = (props) => {
    const { workshopData } = props
    return (
        <div className="flow-root w-full overflow-y-scroll h-full">
            <ul role="list" className='flex flex-col gap-2'>
                {workshopData.map(({ title, dates, pensum, modality, speaker, id, spots, avaaYear, platform }: Workshop) => {
                    return (
                        <li key={title} className="flex py-2 focus:outline-none focus:outline-offset-0 px-3 rounded-md w-full bg-emerald-950  items-center justify-center gap-4">
                            <div className="flex-1 w-1/4 ">
                                <p className="text-sm font-medium truncate text-white">
                                    {title}
                                </p>
                                <p className="text-xs text-gray-500 truncate ">
                                    Por: {speaker[0].name}
                                </p>
                            </div>
                            <div className="flex-1 text-center w-1/4">
                                <p className="text-sm font-medium truncate text-white">
                                    {new Date(dates[0].start_date).getDate()}/{new Date(dates[0].end_date).getMonth()}
                                </p>
                                <p className="text-xs text-gray-500 truncate ">
                                    De {new Date(dates[0].start_date).getUTCHours()} a {new Date(dates[0].end_date).getUTCHours()}
                                </p>
                            </div>
                            <div className="flex-1  text-center w-1/4">
                                <p className="text-sm font-medium truncate text-white capitalize">
                                    {pensum.toLocaleLowerCase().replaceAll("_", " ")}
                                </p>
                                <p className="text-xs text-gray-500 truncate ">
                                    {spots} cupos
                                </p>
                                <p className="text-xs text-gray-500 truncate ">
                                    {avaaYear.toString().replaceAll(',', ' y ')} Año
                                </p>
                            </div>
                            <div className="flex-1 min-w-0 text-center w-1/4">
                                <p className="text-sm font-medium truncate text-white capitalize">
                                    {modality.toLowerCase()}
                                </p>
                                <p className="text-xs text-gray-500 truncate ">
                                    {platform}
                                </p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div >
    )
}

export default WorkshopsAloneList;
