import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import { Divider } from '@nextui-org/divider';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { useMemo, useState } from 'react';

export type FilterOption = { value: any; label: string };
export type FilterDefinition = {
  id: string;
  label: string;
  options: FilterOption[];
  placeholder?: string;
};

interface FilterByButtonProps {
  filters: FilterDefinition[];
  setFilter: (columnId: string, value: any) => void;
}

function FilterByButton({ filters, setFilter }: FilterByButtonProps) {
  // Track selected filters (empty string means no filter applied)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    return Object.values(selectedFilters).filter((value) => value && value !== '').length;
  }, [selectedFilters]);

  // Get active filter labels for display
  const activeFilterLabels = useMemo(() => {
    return Object.entries(selectedFilters)
      .filter(([_, value]) => value && value !== '')
      .map(([filterId, value]) => {
        const filter = filters.find((f) => f.id === filterId);
        const option = filter?.options.find((opt) => String(opt.value) === value);
        return {
          id: filterId,
          filterLabel: filter?.label || '',
          optionLabel: option?.label || '',
          value,
        };
      });
  }, [selectedFilters, filters]);

  // Apply filter
  const handleFilterChange = (filterId: string, value: string) => {
    const newValue = value === '' ? undefined : value;
    setSelectedFilters((prev) => ({ ...prev, [filterId]: value }));
    setFilter(filterId, newValue);
  };

  // Remove specific filter
  const removeFilter = (filterId: string) => {
    handleFilterChange(filterId, '');
  };

  // Clear all filters
  const clearAll = () => {
    setSelectedFilters({});
    filters.forEach((filter) => setFilter(filter.id, undefined));
  };

  return (
    <div className="flex items-center gap-2">
      <Popover placement="bottom-start" size="sm">
        <PopoverTrigger>
          <Button variant="flat" size="sm" startContent={<FunnelIcon className="w-4 h-4" />}>
            Filtros
          </Button>
        </PopoverTrigger>
        <PopoverContent className="!rounded-md">
          <div className="p-2">
            <div className="flex items-center justify-between gap-4 mb-3">
              <h4 className="text-sm font-medium">Filtros</h4>
              <Button
                size="sm"
                variant="light"
                onPress={clearAll}
                isDisabled={activeFiltersCount === 0}
              >
                Limpiar todo
              </Button>
            </div>

            <div className="space-y-2">
              {filters.map((filter) => (
                <div key={filter.id} className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-600">{filter.label}</label>
                  <Dropdown size="sm">
                    <DropdownTrigger>
                      <Button
                        variant="bordered"
                        size="sm"
                        className="justify-start"
                        endContent={
                          selectedFilters[filter.id] && selectedFilters[filter.id] !== '' ? (
                            <XMarkIcon
                              className="w-3 h-3 opacity-50 hover:opacity-100 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFilter(filter.id);
                              }}
                            />
                          ) : undefined
                        }
                      >
                        {selectedFilters[filter.id] && selectedFilters[filter.id] !== ''
                          ? filter.options.find(
                              (opt) => String(opt.value) === selectedFilters[filter.id]
                            )?.label
                          : filter.placeholder || `Seleccionar ${filter.label.toLowerCase()}`}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label={filter.label}
                      selectionMode="single"
                      selectedKeys={
                        selectedFilters[filter.id]
                          ? new Set([selectedFilters[filter.id]])
                          : new Set()
                      }
                      items={filter.options}
                      onSelectionChange={(keys) => {
                        const key = Array.from(keys as Set<string>)[0] || '';
                        console.log(filter.id, key);
                        handleFilterChange(filter.id, key);
                      }}
                    >
                      {(item) => <DropdownItem key={item.value}>{item.label}</DropdownItem>}
                    </DropdownMenu>
                  </Dropdown>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Active filters chips */}
      {activeFilterLabels.length > 0 && (
        <>
          <Divider orientation="vertical" className="h-6" />
          <div className="flex flex-wrap gap-1">
            {activeFilterLabels.map((filter) => (
              <Chip
                key={filter.id}
                size="sm"
                variant="flat"
                onClose={() => removeFilter(filter.id)}
              >
                {filter.filterLabel}: {filter.optionLabel}
              </Chip>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default FilterByButton;
