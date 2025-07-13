import {
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid';
import { Button } from '@nextui-org/button';
import { TableInstance } from 'react-table';

interface TableFooterProps<T extends object> {
  table: TableInstance<T>;
}

function TableFooter<T extends object>({ table }: TableFooterProps<T>) {
  const { previousPage, canPreviousPage, nextPage, canNextPage, pageOptions, gotoPage, state } =
    table;
  const pageIndex = state.pageIndex;
  return (
    <nav
      className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 p-4"
      aria-label="Table navigation"
    >
      {/* Page summary */}
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Página <span className="font-semibold text-gray-900 dark:text-white">{pageIndex + 1}</span>{' '}
        de <span className="font-semibold text-gray-900 dark:text-white">{pageOptions.length}</span>
      </span>

      {/* Controls: First, Prev, Page Numbers, Next, Last */}
      <div className="flex items-center space-x-1">
        {/* Page number buttons */}
        {pageOptions.length <= 7 ? (
          pageOptions.map((page) => (
            <Button
              key={page}
              size="sm"
              isIconOnly
              onPress={() => gotoPage(page)}
              variant={page === pageIndex ? 'ghost' : 'flat'}
            >
              {page + 1}
            </Button>
          ))
        ) : (
          <>
            <Button
              size="sm"
              onPress={() => gotoPage(0)}
              isIconOnly
              variant={pageIndex === 0 ? 'ghost' : 'flat'}
            >
              1
            </Button>
            {pageIndex > 3 && <span className="px-1">...</span>}
            {pageOptions
              .slice(Math.max(1, pageIndex - 2), Math.min(pageIndex + 3, pageOptions.length - 1))
              .map((page) => (
                <Button
                  isIconOnly
                  key={page}
                  size="sm"
                  onPress={() => gotoPage(page)}
                  variant={page === pageIndex ? 'ghost' : 'flat'}
                >
                  {page + 1}
                </Button>
              ))}
            {pageIndex < pageOptions.length - 4 && <span className="px-1">...</span>}
            <Button
              isIconOnly
              size="sm"
              onPress={() => gotoPage(pageOptions.length - 1)}
              variant={pageIndex === pageOptions.length - 1 ? 'ghost' : 'flat'}
            >
              {pageOptions.length}
            </Button>
          </>
        )}
      </div>

      {/* Go to page input and page size selector */}
      <div className="flex items-center space-x-2">
        <Button
          size="sm"
          isIconOnly
          variant="flat"
          startContent={<ChevronDoubleLeftIcon className="w-4 h-4" />}
          onPress={() => gotoPage(0)}
          isDisabled={!canPreviousPage}
        />
        <Button
          size="sm"
          variant="flat"
          startContent={<ChevronLeftIcon className="h-4 w-4" />}
          onPress={() => previousPage()}
          isIconOnly
          isDisabled={!canPreviousPage}
        />
        <Button
          size="sm"
          variant="flat"
          isIconOnly
          startContent={<ChevronRightIcon className="h-4 w-4" />}
          onPress={() => nextPage()}
          isDisabled={!canNextPage}
        />
        <Button
          size="sm"
          variant="flat"
          onPress={() => gotoPage(pageOptions.length - 1)}
          isDisabled={!canNextPage}
          isIconOnly
          startContent={<ChevronDoubleRightIcon className="w-4 h-4" />}
        />
      </div>
    </nav>
  );
}

export default TableFooter;
