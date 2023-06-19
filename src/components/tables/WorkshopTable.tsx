'use client'
import React, { useMemo } from 'react'
import { Workshop, WorkshopDates, WorkshopSpeaker, WorkshopTempData } from '@prisma/client'
import { useTable, useSortBy } from 'react-table'
import { FilterIcon, SortIcon, SortIconReverse } from '@/assets/svgs';

interface WorkshopTableProps {
    workshopData: (Workshop & {
        speaker: WorkshopSpeaker[];
        dates: WorkshopDates[];
        tempData: WorkshopTempData | null;
    })[],
}

const WorkshopTable: React.FC<WorkshopTableProps> = (props) => {
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
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({ columns, data }, useSortBy)

    return (
        <div className="flow-root w-[1300px] overflow-y-scroll h-[600px]">
            <table {...getTableProps()} className="w-full text-sm text-center text-gray-300 bg-gradient-to-b from-emerald-950 to-slate-950">

                <thead className="text-xs text-green-500 uppercase bg-transparent text-center border-b-2 border-green-600 text-ellipsis">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} className="text-xs font-medium text-green-500 uppercase tracking-wider">
                            {headerGroup.headers.map((column) => {
                                return (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())} scope="col" className="px-6 py-3">
                                        <div className='flex text-center gap-2 justify-center items-center'>
                                            {column.render('Header')}
                                            {column.isSorted ? column.isSortedDesc ? <SortIconReverse /> : <SortIcon /> : <FilterIcon />}
                                        </div>

                                    </th>
                                )
                            })}
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

export default WorkshopTable;
