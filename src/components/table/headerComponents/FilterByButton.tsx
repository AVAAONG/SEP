import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { useMemo, useState } from 'react';

// Define filter option and filter definition types
export type FilterOption = { value: any; label: string };
export type FilterDefinition = { id: string; label: string; options: FilterOption[] };

interface FilterByButtonProps {
  filters: FilterDefinition[];
  setFilter: (columnId: string, value: any) => void;
}

function FilterByButton({ filters, setFilter }: FilterByButtonProps) {
  // Initialize selected option per filter (default first option)
  const initialSelected = useMemo(() => {
    const rec: Record<string, string> = {};
    filters.forEach((f) => {
      rec[f.id] = String(f.options[0]?.value ?? '');
    });
    return rec;
  }, [filters]);
  const [selected, setSelected] = useState<Record<string, string>>(initialSelected);

  // Clear all filters to show all rows
  const clearAll = () => {
    // reset selected state and clear filters
    setSelected(filters.reduce((acc, f) => ({ ...acc, [f.id]: '' }), {} as Record<string, string>));
    filters.forEach((f) => setFilter(f.id, undefined));
  };
  return (
    <Popover placement="right-end" size="sm">
      <PopoverTrigger>
        <Button variant="flat" size="sm">
          Filtrar por
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex justify-end pb-2">
          <Button size="sm" variant="flat" isIconOnly onPress={clearAll}>
            <XMarkIcon className="w-4 h-4" />
          </Button>
        </div>
        {filters.map((filter) => (
          <Dropdown key={filter.id} placement="right-end" size="sm">
            <DropdownTrigger>
              <Button fullWidth variant="light" size="sm">
                {filter.label}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label={filter.label}
              closeOnSelect={false}
              selectionMode="single"
              selectedKeys={new Set([selected[filter.id]])}
              onSelectionChange={(keys) => {
                // pick the first key
                const key =
                  typeof keys === 'string'
                    ? keys
                    : Array.isArray(keys)
                      ? String(keys[0])
                      : String(Array.from(keys as Set<unknown>)[0]);
                // update state and filter
                setSelected((prev) => ({ ...prev, [filter.id]: key }));
                setFilter(filter.id, key);
              }}
              items={filter.options.map((o) => ({ key: String(o.value), name: o.label }))}
            >
              {(item) => (
                <DropdownItem key={item.key} value={item.key}>
                  {item.name}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export default FilterByButton;
