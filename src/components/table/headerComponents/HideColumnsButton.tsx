'use client';
import useMobile from '@/hooks/use-mobile';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import React from 'react';
import { ColumnInstance } from 'react-table';

interface HideColumnsButtonProps<T extends object> {
  columns: ColumnInstance<T>[];
}

function HideColumnsButton<T extends object>({ columns }: HideColumnsButtonProps<T>) {
  const { isMobile } = useMobile();
  const initialVisibleIds = React.useMemo(
    () => new Set<string>(columns.filter((col) => col.isVisible).map((col) => String(col.id))),
    [columns]
  );
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(initialVisibleIds);
  React.useEffect(() => {
    setSelectedKeys(initialVisibleIds);
  }, [initialVisibleIds]);
  return (
    <Dropdown size="sm" placement="bottom-end">
      <DropdownTrigger>
        <Button
          isIconOnly={isMobile}
          size="sm"
          startContent={<Bars3Icon className="w-4 h-4" />}
          variant="flat"
        >
          <span className="hidden md:inline">Columnas</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        items={columns}
        closeOnSelect={false}
        className="h-[225px] overflow-y-scroll"
        selectionMode="multiple"
        variant="flat"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => {
          // Normalize keys into Set<string>
          const keyArray: string[] =
            typeof keys === 'string'
              ? [keys]
              : Array.isArray(keys)
                ? keys
                : Array.from(keys as Set<string>);
          const newSet = new Set<string>(keyArray);
          setSelectedKeys(newSet);
          // Toggle column visibility
          columns.forEach((col) => {
            const id = String(col.id);
            col.toggleHidden(!newSet.has(id));
          });
        }}
      >
        {(item) => (
          <DropdownItem key={item.id} value={item.id.toString()}>
            {item.render('Header')}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}

export default HideColumnsButton;
