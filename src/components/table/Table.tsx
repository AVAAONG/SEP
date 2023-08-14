'use client';
import { FilterIcon, SortIcon, SortIconReverse } from '@/assets/svgs';
import React, { useMemo, useState } from 'react';
import { Column, useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';

interface TableProps {
  tableData: readonly object[];
  tableColumns: Column<object>[];
}

const Table: React.FC<TableProps> = ({ tableData, tableColumns }) => {
  const data = useMemo(() => tableData, [tableData]);
  const columns = useMemo(() => tableColumns, [tableColumns]);
  const [isExpanded, toggleExpanded] = useState(false)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state: { globalFilter, pageIndex },
    setGlobalFilter,
    setFilter,
    page,
    rows,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
  } = useTable({ columns, data }, useFilters, useGlobalFilter, useSortBy, usePagination);

  const allowPagination = (allowPagination: boolean) => {
    const o = allowPagination ? rows : page
    return o
  }


  return (

    <div className={`${isExpanded ? "absolute top-0 bottom-0 left-0 right-0 z-50" : "relative overflow-hidden"}  bg-white shadow-md shadow-emerald-600 dark:bg-slate-900 sm:rounded-lg w-full h-max min-h-full`}>
      <TableHeader
        isExpanded={isExpanded}
        toggleExpanded={toggleExpanded}
        optionsForFilter={[{ option: "title", label: "Titulo" }, { option: "first_names", label: "Facilitador" }]}
        setFilter={setFilter}
        setGlobalFilter={setGlobalFilter}
        filterValue={globalFilter}
      />
      <div className="flow-root w-full overflow-x-scroll">
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
            {allowPagination(isExpanded).map((row) => {
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
      {
        isExpanded ? null : (
          <TableFooter
            canNextPage={canNextPage}
            canPreviousPage={canPreviousPage}
            nextPage={nextPage}
            pageIndex={pageIndex}
            pageOptions={pageOptions}
            previousPage={previousPage}
          />
        )
      }

    </div>
  );
};

export default Table;
