'use client';
import React, { useMemo, useState } from 'react';
import {
  Workshop,
  WorkshopDates,
  WorkshopSpeaker,
  WorkshopTempData,
} from '@prisma/client';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useAsyncDebounce,
  usePagination,
} from 'react-table';
import { FilterIcon, SortIcon, SortIconReverse } from '@/assets/svgs';
import workshopHeaders from './workshopData';
interface WorkshopTableProps {
  workshopData: (Workshop & {
    speaker: WorkshopSpeaker[];
    dates: WorkshopDates[];
    tempData: WorkshopTempData | null;
  })[];
}

const WorkshopTable: React.FC<WorkshopTableProps> = (props) => {
  const { workshopData } = props;
  const data = useMemo(() => workshopData, []);
  const columns = useMemo(() => workshopHeaders, []);
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
  } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);

  const { globalFilter, pageIndex } = state;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div>
      <div className="pb-4">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            value={value || ''}
            onChange={(e) => {
              setValue(e.target.value);
              onChange(e.target.value);
            }}
            type="text"
            id="table-search"
            className="w-72 block p-2 pl-10 focus:outline-none  focus:outline-offset-0 py-1 px-3 rounded-md bg-emerald-950  ring-1 ring-emerald-900 active:border-zinc-950 focus:outline-emerald-600"
            placeholder="Buscar taller"
          />
        </div>
      </div>
      <div className="flow-root w-full overflow-x-scroll  rounded-lg  h-[600px]">
        <table
          {...getTableProps()}
          className="w-full text-sm text-left text-gray-300 "
        >
          <thead className="text-xs text-green-500 uppercase text-center border-b-2 border-green-600 text-ellipsis  bg-emerald-950">
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="text-xs font-medium text-green-500 uppercase tracking-wider"
              >
                {headerGroup.headers.map((column) => {
                  return (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      scope="col"
                      className="px-6 py-3"
                    >
                      <div className="flex text-center gap-2 justify-center items-center">
                        {column.render('Header')}
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <SortIconReverse />
                          ) : (
                            <SortIcon />
                          )
                        ) : (
                          <FilterIcon />
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="text-sm hover:bg-green-700 hover:text-white text-center"
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="px-6 py-4 whitespace-nowrap lowecase capitalize"
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <nav
        className="flex items-center justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Pagina{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {pageIndex + 1}{' '}
          </span>
          de{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {pageOptions.length}{' '}
          </span>
        </span>
        <ul className="inline-flex items-center -space-x-px">
          <li>
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Anterior</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
          {/* <li>
                        <input type='number' defaultValue={pageIndex + 1} onChange={e =>{
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(pageNumber)
                        }} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                    </li> */}
          <li>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Siguiente</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default WorkshopTable;
