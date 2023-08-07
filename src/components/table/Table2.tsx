'use client'
import React, { useMemo, useState } from 'react'
import { ScholarAttendance, Workshop, WorkshopSpeaker, WorkshopTempData } from '@prisma/client'
import { useTable, useSortBy, useGlobalFilter, useAsyncDebounce, usePagination } from 'react-table'
import { FilterIcon, SortIcon, SortIconReverse } from '@/assets/svgs';
import workshopScholarFormat from '../scholar/scholars/workshopTableData';

interface WorkshopTableProps {
    workshopData: (Workshop & {
        speaker: WorkshopSpeaker[];
        scholarAttendance: {
            attendance: ScholarAttendance;
        }[];
    })[] | undefined
}

const ChatTable: React.FC<WorkshopTableProps> = (props) => {

    const { workshopData } = props
    const data = useMemo(() => workshopData, [])
    const columns = useMemo(() => workshopScholarFormat, [])
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        state,
        setGlobalFilter,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,

    } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination)

    const { globalFilter, pageIndex } = state
    const [value, setValue] = useState(globalFilter)
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <div className='relative overflow-hidden bg-white shadow-md shadow-emerald-600 dark:bg-slate-900 sm:rounded-lg'>

            <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 ">
                <div className="relative mt-1 w-60 ">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-slate-500 dark:text-slate-950" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                    <input value={value || ''}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        onChange={(e) => {
                            setValue(e.target.value)
                            onChange(e.target.value)
                        }}
                        type="text" id="table-search" placeholder="Buscar taller" />
                </div>
                <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10  dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                    </svg>
                    Filtrar por componente
                    <svg className="-mr-1 ml-1.5 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                </button>
            </div>
            <div className="flow-root w-full overflow-x-scroll  h-[600px]">
                <table {...getTableProps()} className="w-full text-sm text-left text-gray-300 ">
                    <thead className="text-xs text-green-500 uppercase text-center border-b-[1px] border-green-700 text-ellipsis bg-gray-100 dark:bg-slate-950">
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()} className="text-xs font-medium text-green-700 dark:text-green-500 uppercase tracking-wider">
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

                    <tbody {...getTableBodyProps()} className="divide-y divide-gray-500 dark:divide-gray-700">
                        {page.map((row) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()} className="text-sm hover:bg-green-500 dark:hover:bg-green-700 dark:hover:text-white text-center text-gray-800 dark:text-gray-300">
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
            <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Pagina {' '}
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {pageIndex + 1} {' '}
                    </span>
                    de {' '}
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {pageOptions.length} {' '}
                    </span>
                </span>
                <ul className="inline-flex items-center -space-x-px">
                    <li>
                        <button onClick={() => previousPage()} disabled={!canPreviousPage} className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Anterior</span>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        </button>
                    </li>
                    {/* <li>
                        <input type='number' defaultValue={pageIndex + 1} onChange={e =>{
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(pageNumber)
                        }} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                    </li> */}
                    <li>
                        <button onClick={() => nextPage()} disabled={!canNextPage} className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Siguiente</span>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>

    )
}

export default ChatTable;
