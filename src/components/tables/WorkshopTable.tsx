'use client'
import React, { useMemo, useState } from 'react'
import { Workshop, WorkshopDates, WorkshopSpeaker, WorkshopTempData } from '@prisma/client'
import { useTable, useSortBy, useGlobalFilter, useAsyncDebounce } from 'react-table'
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
            id: 'date',
            Header: 'Fecha',
            accessor: 'dates[0].start_date',
            Cell: ({ value }: { value: string }) => { return new Date(value).toLocaleString('es-ES', { month: 'numeric', day: 'numeric', year: 'numeric' }) }
        },
        {
            id: 'startHour',
            Header: 'Hora de inicio',
            accessor: 'dates[0].start_date',
            Cell: ({ value }: { value: string }) => { return new Date(value).toLocaleString('es-ES', { hour: 'numeric', minute: 'numeric', hourCycle: 'h12' }) }

        },
        {
            id: 'endHour',
            Header: 'Hora de cierre',
            accessor: 'dates[0].end_date',
            Cell: ({ value }: { value: string }) => { return new Date(value).toLocaleString('es-ES', { hour: 'numeric', minute: 'numeric', hourCycle: 'h12' }) }

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
        prepareRow,
        state,
        setGlobalFilter
    } = useTable({ columns, data }, useGlobalFilter, useSortBy)

    const { globalFilter } = state
    const [value, setValue] = useState(globalFilter)
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined)
    }, 200)


    return (
        <div>
            <div className="pb-4">
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input value={value || ''} 
                    onChange={(e) => {
                        setValue(e.target.value)
                        onChange(e.target.value)
                    }} 
                    type="text" id="table-search" className="w-72 block p-2 pl-10 focus:outline-none  focus:outline-offset-0 py-1 px-3 rounded-md bg-emerald-950  ring-1 ring-emerald-900 active:border-zinc-950 focus:outline-emerald-600" placeholder="Buscar taller" />
                </div>
            </div>
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
        </div>

    )
}

export default WorkshopTable;
