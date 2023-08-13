'use client';
import { FilterIcon, SortIcon, SortIconReverse } from '@/assets/svgs';
import React, { useMemo } from 'react';
import { Column, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import TableHeader from './TableHeader';

interface TableProps {
  tableData: readonly object[];
  tableColumns: Column<object>[];
}

const Table: React.FC<TableProps> = ({ tableData, tableColumns }) => {
  const data = useMemo(() => tableData, [tableData]);
  const columns = useMemo(() => tableColumns, [tableColumns]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state: { globalFilter, pageIndex },
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);

  return (
    <div className="relative overflow-hidden bg-white shadow-md shadow-emerald-600 dark:bg-slate-900 sm:rounded-lg w-full h-full">
      <TableHeader globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      <div className="flow-root w-full overflow-x-scroll ">
        <table {...getTableProps()} className="w-full text-sm text-left text-gray-300 ">
          <thead className="text-xs text-green-500 uppercase text-center border-b-[1px] border-green-700 text-ellipsis bg-gray-100 dark:bg-slate-950">
            {headerGroups.map((headerGroup) => {
              const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps()
              return (
                <tr
                  key={key}
                  {...restHeaderGroupProps}
                  className="text-xs font-medium text-green-700 dark:text-green-500 uppercase tracking-wider"
                >
                  {headerGroup.headers.map((column) => {
                    const { getHeaderProps, getSortByToggleProps } = column
                    const { key, ...restColumn } = getHeaderProps(getSortByToggleProps())
                    return (
                      <th
                        key={key}
                        {...restColumn}
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
              )

            })}
          </thead>

          <tbody {...getTableBodyProps()} className="divide-y divide-gray-500 dark:divide-gray-700">
            {page.map((row) => {
              prepareRow(row);
              const { key, ...restRowProps } = row.getRowProps();
              return (
                <tr
                  key={key}
                  {...restRowProps}
                  className="text-sm hover:bg-green-500 dark:hover:bg-green-700 dark:hover:text-white text-center text-gray-800 dark:text-gray-300"
                >
                  {row.cells.map((cell) => {
                    const { key, ...restCellProps } = cell.getCellProps();
                    return (
                      <td
                        key={key}
                        {...restCellProps}
                        className="px-4 py-2 whitespace-nowrap lowecase capitalize"
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
        className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Pagina{' '}
          <span className="font-semibold text-gray-900 dark:text-white">{pageIndex + 1} </span>
          de{' '}
          <span className="font-semibold text-gray-900 dark:text-white">{pageOptions.length} </span>
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

export default Table;
