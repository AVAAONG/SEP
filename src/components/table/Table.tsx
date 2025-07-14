'use client';
import useMobile from '@/hooks/use-mobile';
import exportDataToExcel from '@/lib/utils/exportFunctions/commonExport';
import processRow from '@/lib/utils/exportFunctions/tableExportUtils';
import {
  ArrowUpTrayIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/react';
import { useEffect, useMemo, useState } from 'react';
import {
  Column,
  FilterTypes,
  IdType,
  Row,
  SortingRule,
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';
import TableFooter from './TableFooter';
import ExpandTableButton from './headerComponents/ExpandTableButton';
import FilterByButton, { FilterDefinition } from './headerComponents/FilterByButton';
import HideColumnsButton from './headerComponents/HideColumnsButton';
import TableSearchButton from './headerComponents/TableSearhButton';

interface TableProps<T extends Record<string, unknown>> {
  tableData: T[];
  tableColumns: Column<T>[];
  tableHeadersForSearch: { option: string; label: string }[];
  children?: React.ReactNode;
  filters?: FilterDefinition[];
}

function Table<T extends Record<string, unknown>>({
  tableData,
  tableColumns,
  tableHeadersForSearch,
  children,
  filters,
}: TableProps<T>) {
  // Pagination state
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const data = useMemo(() => tableData, [tableData]);
  const columns = useMemo(() => tableColumns, [tableColumns]);
  const [isExpanded, toggleExpanded] = useState(false);
  const [sortingState, setSortingState] = useState<SortingRule<T>[]>([]);

  // helper to normalize string input: remove accents, punctuation, lowercase, trim
  const normalizeSearch = (value: string) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .toLowerCase()
      .trim();

  // custom filter types for accent-insensitive comparison
  const filterTypes: FilterTypes<T> = useMemo(
    () => ({
      accentInsensitive: (rows: Row<T>[], columnIds: IdType<T>[], filterValue: string) =>
        rows.filter((row) => {
          const id = columnIds[0] as IdType<T>;
          const rowValue = row.values[id];
          return normalizeSearch(String(rowValue ?? '')).includes(filterValue);
        }),
    }),
    []
  );

  // useTable with custom filterTypes and defaultColumn filter
  const table = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: sortingState,
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
      defaultColumn: { filter: 'accentInsensitive' },
      filterTypes,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // Extract table API and state (including allColumns for visibility toggles)
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setFilter,
    page,
    rows,
    state,
    allColumns,
  } = table;

  const { globalFilter, pageIndex, pageSize } = state;
  const { isMobile } = useMobile();

  // Keep internal pagination state in sync
  useEffect(() => {
    setPagination({ pageIndex, pageSize });
  }, [pageIndex, pageSize]);

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
    <>
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out"
          onClick={() => toggleExpanded(false)}
        />
      )}
      <div
        className={`${
          isExpanded
            ? 'fixed inset-8 z-50 bg-white shadow-2xl rounded-lg max-h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out transform border border-stone-200 dark:border-zinc-800 flex flex-col'
            : 'relative overflow-hidden shadow-lg dark:bg-zinc-900 rounded-md w-full border border-stone-200 dark:border-zinc-800 flex flex-col'
        } bg-white dark:bg-zinc-900 ${isExpanded ? 'min-h-[calc(100vh-4rem)]' : 'min-h-[600px]'}`}
      >
        {/* Fixed Header Section */}
        <div
          className={`${
            isExpanded ? 'sticky top-0 z-30' : ''
          } w-full flex p-2 md:p-4 gap-4 md:flex-row md:items-center justify-between md:space-y-0 bg-stone-50 dark:bg-zinc-800 border-b border-stone-200 dark:border-zinc-700 ${
            isExpanded ? 'rounded-t-lg' : ''
          } flex-shrink-0`}
        >
          <div className="w-1/2 flex items-center gap-2">
            <TableSearchButton
              columns={allColumns}
              optionsForFilter={tableHeadersForSearch}
              setFilter={setFilter}
              filterValue={globalFilter}
            />
            {filters && !isMobile && <FilterByButton filters={filters} setFilter={setFilter} />}
          </div>
          <div className="flex gap-3 w-1/2 justify-end">
            {children && children}
            <HideColumnsButton columns={allColumns} />
            <Button
              variant="flat"
              size="sm"
              isIconOnly={isMobile}
              onPress={async () => {
                const exportData = data.map((row) => processRow(row, preprocessedColumns));
                await exportDataToExcel(exportData, 'Reporte');
              }}
              startContent={<ArrowUpTrayIcon className="w-4 h-4" />}
            >
              <span className="hidden sm:inline">Exportar</span>
            </Button>
            <ExpandTableButton isExpanded={isExpanded} toggleExpanded={toggleExpanded} />
          </div>
        </div>

        {/* Scrollable Table Container */}
        <div className={`${isExpanded ? 'flex-1 overflow-auto' : 'flex-1 overflow-x-auto'}`}>
          <div className="min-h-full flex flex-col">
            <table {...getTableProps()} className="w-full text-sm text-left">
              <thead
                className={`${
                  isExpanded ? 'sticky top-0 z-20' : 'sticky top-0 z-10'
                } bg-stone-50 dark:bg-zinc-800 shadow-sm`}
              >
                {headerGroups.map((headerGroup) => {
                  const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
                  return (
                    <tr
                      key={key}
                      {...restHeaderGroupProps}
                      className="border-b border-stone-200 dark:border-zinc-700"
                    >
                      {headerGroup.headers.map((column, i) => {
                        const { getHeaderProps, getSortByToggleProps } = column;
                        const { key, ...restColumn } = getHeaderProps(getSortByToggleProps());
                        return (
                          <th
                            key={key}
                            {...restColumn}
                            scope="col"
                            className={`px-3 py-2 font-semibold text-xs text-stone-700 dark:text-zinc-300 uppercase tracking-wider select-none cursor-pointer transition-colors duration-200 hover:bg-stone-100 dark:hover:bg-zinc-700 ${
                              i === 0
                                ? ` bg-stone-50 dark:bg-zinc-800 ${isExpanded ? 'z-30' : 'z-20'} shadow-sm`
                                : ''
                            }`}
                          >
                            <div className="flex text-center justify-center items-center gap-1.5 min-h-[1.25rem]">
                              <span className="font-medium">{column.render('Header')}</span>
                              {column.disableSortBy ? null : (
                                <div className="flex items-center justify-center w-4 h-4 opacity-70 hover:opacity-100 transition-opacity">
                                  {column.isSorted ? (
                                    column.isSortedDesc ? (
                                      <ChevronUpIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                                    ) : (
                                      <ChevronDownIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                                    )
                                  ) : (
                                    <ChevronUpDownIcon className="w-4 h-4 text-stone-400 dark:text-zinc-500" />
                                  )}
                                </div>
                              )}
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="bg-white dark:bg-zinc-900 divide-y divide-stone-200 dark:divide-zinc-700"
              >
                {allowPagination(isExpanded).length > 0 ? (
                  allowPagination(isExpanded).map((row, rowIndex) => {
                    prepareRow(row);
                    const { key, ...restRowProps } = row.getRowProps();
                    return (
                      <tr
                        key={key}
                        {...restRowProps}
                        className={`text-sm text-center transition-all duration-200 ease-in-out hover:bg-stone-50 dark:hover:bg-zinc-800 ${
                          rowIndex % 2 === 0
                            ? 'bg-white dark:bg-zinc-900'
                            : 'bg-stone-50/50 dark:bg-zinc-800/50'
                        }`}
                      >
                        {row.cells.map((cell, i) => {
                          const { key, ...restCellProps } = cell.getCellProps();
                          return (
                            // this is for frozen the first column, but dont look well on mobile
                            <td
                              key={key}
                              {...restCellProps}
                              className={`px-3 py-1.5 whitespace-nowrap text-stone-900 dark:text-zinc-200  ${
                                i === 0 ? '' : ''
                              }`}
                            >
                              <div className="flex items-center justify-center min-h-[1rem] max-w-sm overflow-hidden text-ellipsis">
                                {cell.render('Cell')}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                ) : (
                  <tr className="text-sm text-center bg-white dark:bg-zinc-900">
                    <td
                      colSpan={columns.length}
                      className="px-3 py-8 text-stone-500 dark:text-zinc-400 italic"
                    >
                      No hay datos para mostrar
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* Spacer to fill remaining space */}
            <div className="flex-1 bg-white dark:bg-zinc-900"></div>
          </div>
        </div>

        {/* Footer - only show when not expanded */}
        {!isExpanded && (
          <div className="flex-shrink-0">
            <TableFooter table={table} />
          </div>
        )}
      </div>
    </>
  );
}

export default Table;
