interface TableFooterProps {
    previousPage: () => void;
    canPreviousPage: boolean;
    nextPage: () => void;
    canNextPage: boolean;
    pageIndex: number;
    pageOptions: number[];
}
/**
 * Table footer component 
 * @remarks Its mean to be used with React Table V7
 * @param param0 {previousPage, canPreviousPage, nextPage, canNextPage, pageIndex, pageOptions}
 * @param param0.previousPage  React Table native function to go to the previous page
 * @param param0.canPreviousPage React Table native boolean to let the user know if they can go to previous page
 * @param param0.nextPage React Table native function to go to the next page
 * @param param0.canNextPage React Table native boolean to let the user know if they can go the the next page
 * @param param0.pageIndex  React Table native 
 * @param param0.pageOptions React Table native 
 * @returns 
 */
const TableFooter = ({ previousPage, canPreviousPage, nextPage, canNextPage, pageIndex, pageOptions }: TableFooterProps) => {
    return (
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
    )
}

export default TableFooter