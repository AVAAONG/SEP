'use client';
import { ChangeEvent, useState } from 'react';

interface TableSearhButtonProps {
  optionsForFilter: { option: string; label: string }[];
  filterValue: string;
  setFilter: (columnId: string, updater: any) => void;
  setGlobalFilter: (updater: any) => void;
}

const TableSearhButton = ({
  optionsForFilter,
  setFilter,
  setGlobalFilter,
  filterValue,
}: TableSearhButtonProps) => {
  const [isDropdownOpen, toggleDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const selectFilter = (filterSelected: string, e: ChangeEvent<HTMLInputElement>) => {
    if (filterSelected === 'all') {
      return setGlobalFilter(e.target.value);
    } else {
      return setFilter(filterSelected, e.target.value);
    }
  };
  const selectValue = () => {
    if (selectedFilter === 'all') {
      return filterValue || '';
    } else {
      return;
    }
  };
  return (
    <div className="flex w-96 sm:w-2/3 lg:w-1/3">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-slate-500 dark:text-slate-950"
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
          type="search"
          value={selectValue()}
          onChange={(e: ChangeEvent<HTMLInputElement>) => selectFilter(selectedFilter, e)}
          className="block w-full pl-10 rounded-r-none outline-transparent bg-white dark:bg-secondary-dark ring-1 ring-light dark:ring-black sm:text-sm placeholder:text-gray-400 text-gray-900  p-2 rounded-lg dark:placeholder-slate-500 dark:text-gray-300"
          placeholder="Buscar..."
        />
      </div>
      <form className="flex">
        <button
          // onClick={() => toggleDropdown(isDropdownOpen ? false : true)}
          className="flex-shrink-0 inline-flex  -ml-4 -mt-[1px] z-10 p-2 items-center text-sm font-medium text-center border border-gray-200 bg-white rounded-r-lg   hover:bg-light dark:bg-black dark:hover:bg-dark"
          type="button"
        >
          <div className="flex gap-2 items-center text-sm">
            Buscar
            <span className="hidden text-xs sm:inline text-green-600">
              {optionsForFilter.find(({ option }) => option === selectedFilter)?.label}
            </span>
          </div>
          <svg
            className="w-2.5 h-2.5 ml-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <div
          id="dropdown"
          className={`${
            isDropdownOpen ? 'absolute' : 'hidden'
          } translate-y-11 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdown-button"
          >
            {optionsForFilter.map(({ option, label }, index) => {
              return (
                <li key={index}>
                  <button
                    onClick={() => {
                      setSelectedFilter(option);
                      toggleDropdown(false);
                    }}
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default TableSearhButton;
