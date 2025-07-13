'use client';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Input } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { Column } from 'react-table';

interface TableSearchButtonProps {
  optionsForFilter: { option: string; label: string }[];
  filterValue: string;
  setFilter: (columnId: string, updater: any) => void;
  columns: Column<any>[];
}

const TableSearchButton = ({
  optionsForFilter,
  setFilter,
  filterValue,
  columns = [],
}: TableSearchButtonProps) => {
  // Derive IDs from columns or fallback to filter options
  {
    /*  TODO: The reason for this search is because there are some columns that have a `#` number  as their first column, we should remove that*/
  }
  const ids =
    columns.length > 0
      ? columns.map((col) => String(col.id))
      : optionsForFilter.map((opt) => opt.option);

  const defaultFilter = ids.length >= 2 ? (ids[0].length > 3 ? ids[0] : ids[1]) : ids[0] || '';

  const [selectedFilter, setSelectedFilter] = useState<string>(defaultFilter);
  // Local input value for debounce
  const [inputValue, setInputValue] = useState(filterValue);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Sync local input when filterValue prop changes
  useEffect(() => {
    setInputValue(filterValue);
  }, [filterValue]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);
  return (
    <div className="flex w-1/2">
      <Input
        size="sm"
        variant="bordered"
        value={inputValue}
        startContent={<MagnifyingGlassIcon className="w-5 h-5 " />}
        onChange={(e) => {
          const val = e.target.value;
          setInputValue(val);
          if (debounceRef.current) clearTimeout(debounceRef.current);
          debounceRef.current = setTimeout(() => {
            setFilter(selectedFilter, val.toLowerCase().trim());
          }, 300);
        }}
        placeholder="Buscar..."
      />
      {optionsForFilter.length > 1 && (
        <Dropdown>
          <DropdownTrigger>
            <Button
              isDisabled={optionsForFilter.length < 2}
              className="rounded-l-none -ml-2"
              variant="solid"
              size="sm"
              endContent={<ChevronDownIcon className="w-full h-full" />}
            >
              <div className="flex flex-col  items-start text-xs">
                Buscar
                {selectedFilter === 'all' ? (
                  ''
                ) : (
                  <span className="hidden text-xs sm:inline text-green-500">
                    {optionsForFilter.find(({ option }) => option === selectedFilter)?.label}
                  </span>
                )}
              </div>
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Dynamic Actions" items={optionsForFilter}>
            {(item) => (
              <DropdownItem key={item.option} onPress={() => setSelectedFilter(item.option)}>
                {item.label}
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  );
};

export default TableSearchButton;
