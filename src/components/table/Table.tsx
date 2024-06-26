'use client';
import exportDataToExcel from '@/lib/utils/exportFunctions/commonExport';
import processRow from '@/lib/utils/exportFunctions/tableExportUtils';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';
import { useEffect, useMemo, useState } from 'react';
import {
  Column,
  SortingRule,
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';
import { SortIcon, SortIconDown, SortIconReverse } from '../../../public/svgs/svgs';
import TableFooter from './TableFooter';
import ExpandTableButton from './headerComponents/ExpandTableButton';
import TableSearhButton from './headerComponents/TableSearhButton';

interface TableProps<T extends object> {
  tableData: T[];
  tableColumns: Column<T>[];
  tableHeadersForSearch: { option: string; label: string }[];
  children?: React.ReactNode;
}

function Table<T extends object>({
  tableData,
  tableColumns,
  tableHeadersForSearch,
  children,
}: TableProps<T>) {
  const data = useMemo(() => tableData, [tableData]);
  const columns = useMemo(() => tableColumns, [tableColumns]);
  const [isExpanded, toggleExpanded] = useState(false);
  const [sortingState, setSortingState] = useState<SortingRule<T>[]>([]);

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
    state,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        // Add initialState
        sortBy: sortingState, // Load the initial sort state
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const allowPagination = (allowPagination: boolean) => {
    const o = allowPagination ? rows : page;
    return o;
  };

  // determine if the value of the column is a date
  const preprocessedColumns = columns.map((column: Column<T>) => ({
    ...column,
    isDate: column.Header?.toString().toLocaleLowerCase().startsWith('fecha'),
  }));

  useEffect(() => {
    setSortingState(state.sortBy);
  }, [state.sortBy]);

  return (
    <div
      className={`${
        isExpanded
          ? 'absolute top-0 left-0 right-0 z-50 min-h-screen '
          : 'relative overflow-hidden min-h-max shadow-emerald-600 dark:bg-slate-900 sm:rounded-lg w-full'
      }  bg-white shadow-md `}
    >
      <div className="flex flex-col px-4 py-3 gap-3 md:flex-row md:items-center md:justify-between md:space-y-0 ">
        <TableSearhButton
          optionsForFilter={tableHeadersForSearch}
          setFilter={setFilter}
          setGlobalFilter={setGlobalFilter}
          filterValue={globalFilter}
        />
        <div className="flex gap-3">
          {children && children}
          <Button
            onPress={async () => {
              const exportData = data.map((row) => processRow(row, preprocessedColumns));
              await exportDataToExcel(exportData, 'Reporte');
            }}
            startContent={<ArrowUpTrayIcon className="w-5 h-5 text-primary-1" />}
            className="w-auto flex gap-2 items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10  dark:focus:ring-gray-700 dark:bg-slate-950 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <span className="hidden sm:inline">Exportar</span>
          </Button>
          <ExpandTableButton isExpanded={isExpanded} toggleExpanded={toggleExpanded} />
        </div>
      </div>

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
                        className="px-4 py-1 whitespace-nowrap lowecase"
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
