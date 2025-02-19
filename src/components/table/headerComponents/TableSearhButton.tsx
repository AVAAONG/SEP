'use client';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Button } from "@heroui/react";
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
  // add all option to filter, this is for the global filter
  optionsForFilter = [{ option: 'all', label: 'Todo' }, ...optionsForFilter];

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
          <MagnifyingGlassIcon className="w-5 h-5 text-slate-500 dark:text-slate-950" />
        </div>
        <input
          type="text"
          value={selectValue()}
          onChange={(e: ChangeEvent<HTMLInputElement>) => selectFilter(selectedFilter, e)}
          className="block w-full pl-10 rounded-r-none outline-transparent bg-white dark:bg-secondary-dark ring-1 ring-light dark:ring-black sm:text-sm placeholder:text-gray-400 text-gray-900  p-2 rounded-lg dark:placeholder-slate-500 dark:text-gray-300"
          placeholder="Buscar..."
        />
      </div>
      <form className="flex">
        <Button
          endContent={
            optionsForFilter.length > 1 && <ChevronDownIcon className="w-2.5 h-2.5 ml-2.5" />
          }
          isDisabled={optionsForFilter.length === 1}
          onClick={() => toggleDropdown(isDropdownOpen ? false : true)}
          className="flex-shrink-0 inline-flex  -ml-4 -mt-[1px] z-10 p-2 items-center text-sm font-medium text-center border border-gray-200 bg-white rounded-r-lg   hover:bg-light dark:bg-black dark:hover:bg-dark"
          type="button"
        >
          <div className="flex gap-2 items-center text-sm">
            Buscar
            {selectedFilter === 'all' ? '' : (
              <span className="hidden text-xs sm:inline text-green-600">
                {optionsForFilter.find(({ option }) => option === selectedFilter)?.label}
              </span>
            )}
          </div>
        </Button>
        <div
          id="dropdown"
          className={`${isDropdownOpen ? 'absolute' : 'hidden'
            } translate-y-11 z-10 bg-gray-100 divide-y divide-gray-200 rounded-lg shadow w-44 dark:bg-gray-700`}
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
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
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
