'use client';
import { useMemo, useState } from 'react';
import {
  Column,
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';
import { SortIcon, SortIconDown, SortIconReverse } from '../../../public/svgs/svgs';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';
import ExpandTableButton from './headerComponents/ExpandTableButton';
import ExportButton from './headerComponents/ExportButton';

interface TableProps<T extends object> {
  tableData: readonly T[];
  tableColumns: Column<T>[];
  tableHeadersForSearch: { option: string; label: string }[];
}

function Table<T extends object>({
  tableData,
  tableColumns,
  tableHeadersForSearch,
}: TableProps<T>) {
  const data = useMemo(() => tableData, [tableData]);
  const columns = useMemo(() => tableColumns, [tableColumns]);
  const [isExpanded, toggleExpanded] = useState(false);

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
    const o = allowPagination ? rows : page;
    return o;
  };

  return (
    <div
      className={`${
        isExpanded ? 'absolute top-0 bottom-0 left-0 right-0 z-50' : 'relative overflow-hidden'
      }  bg-white shadow-md shadow-emerald-600 dark:bg-slate-900 sm:rounded-lg w-full min-h-max`}
    >
      <TableHeader
        optionsForFilter={tableHeadersForSearch}
        setFilter={setFilter}
        setGlobalFilter={setGlobalFilter}
        filterValue={globalFilter}
      >
        <ExpandTableButton isExpanded={isExpanded} toggleExpanded={toggleExpanded} />
        <ExportButton />
      </TableHeader>
      <div className="flow-root w-full overflow-x-scroll mt-2">
        <table {...getTableProps()} className="w-full  text-sm text-left text-gray-300 ">
          <thead className="text-xs text-primary-light  text-center border-b-[1px] border-primary-light text-ellipsis  dark:bg-slate-950">
            {headerGroups.map((headerGroup) => {
              const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
              return (
                <tr
                  key={key}
                  {...restHeaderGroupProps}
                  className=" text-xs  text-primary-light dark:text-primary-dark uppercase tracking-wide font-light"
                >
                  {headerGroup.headers.map((column) => {
                    const { getHeaderProps, getSortByToggleProps } = column;
                    const { key, ...restColumn } = getHeaderProps(getSortByToggleProps());
                    return (
                      <th key={key} {...restColumn} scope="col" className="px-2">
                        <div className="flex text-center py-1.5 gap-1.5 justify-center items-center">
                          {column.render('Header')}
                          {column.disableSortBy ? null : column.isSorted ? (
                            column.isSortedDesc ? (
                              <SortIconReverse />
                            ) : (
                              <SortIconDown />
                            )
                          ) : (
                            <SortIcon />
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()} className="divide-y divide-gray-300 dark:divide-gray-800">
            {allowPagination(isExpanded).map((row) => {
              prepareRow(row);
              const { key, ...restRowProps } = row.getRowProps();
              return (
                <tr
                  key={key}
                  {...restRowProps}
                  className="text-sm hover:bg-secondary-2 dark:hover:bg-secondary-dark dark:hover:text-white text-center text-gray-800 dark:text-gray-300"
                >
                  {row.cells.map((cell) => {
                    const { key, ...restCellProps } = cell.getCellProps();
                    return (
                      <td
                        key={key}
                        {...restCellProps}
                        className="px-4 py-1 whitespace-nowrap lowecase capitalize"
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
      {isExpanded ? null : (
        <TableFooter
          canNextPage={canNextPage}
          canPreviousPage={canPreviousPage}
          nextPage={nextPage}
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          previousPage={previousPage}
        />
      )}
    </div>
  );
}

export default Table;
