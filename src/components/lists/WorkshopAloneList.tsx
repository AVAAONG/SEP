'use client'
import React, { useMemo } from 'react'
import { Workshop, WorkshopDates, WorkshopSpeaker, WorkshopTempData } from '@prisma/client'
import { useTable } from 'react-table'

interface WorkshopsListProps {
    workshopData: (Workshop & {
        speaker: WorkshopSpeaker[];
        dates: WorkshopDates[];
        tempData: WorkshopTempData | null;
    })[],
}

const WorkshopsAloneList: React.FC<WorkshopsListProps> = (props) => {
    const { workshopData } = props
    const data = useMemo(() => workshopData, [])
    const columns = useMemo(() => [
        {
            Header: 'Taller',
            accessor: 'title'
        },
        {
            Header: 'Facilitador',
            accessor: 'speaker[0].name'
        },
        {
            Header: 'Fecha de inicio',
            accessor: 'dates[0].start_date'
        },
        {
            Header: 'Fecha de finalización',
            accessor: 'dates[0].end_date'
        },
        {
            Header: 'Pensum',
            accessor: 'pensum'
        },
        {
            Header: 'Modalidad',
            accessor: 'modality'
        },
        {
            Header: 'Plataforma/Lugar',
            accessor: 'platform'
        },
        {
            Header: 'Cupos',
            accessor: 'spots'
        },
        {
            Header: 'Año',
            accessor: 'avaaYear'
        },

    ], [])
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data })

    return (
        <div className="flow-root w-[1300px] overflow-y-scroll h-[600px]">
            {/* <ul role="list" className='flex flex-col gap-2'>
                {workshopData.map((workshop) => {
                    const { speaker, dates, title, id, pensum, spots, avaaYear, platform, modality, tempData } = workshop
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
            </ul> */}

            <table {...getTableProps()} className="w-full text-sm text-left text-gray-300 bg-gradient-to-b from-emerald-950 to-slate-950">

                <thead className="text-xs text-green-500 uppercase bg-transparent text-center border-b-2 border-green-600 text-ellipsis">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} className="text-xs font-medium text-green-500 uppercase tracking-wider">
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()} scope="col" className="px-6 py-3 text-center">
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
                    {rows.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} className="text-sm hover:bg-green-700 hover:text-white text-center">
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap lowecase capitalize">
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>

            </table>

        </div >
    )
}

export default WorkshopsAloneList;
