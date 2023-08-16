import TableSearhButton from './headerComponents/TableSearhButton';

interface TableHeaderProps {
  setFilter: (columnId: string, updater: any) => void;
  setGlobalFilter: (updater: any) => void;
  filterValue: string;
  optionsForFilter: { option: string, label: string }[];
  children?: React.ReactNode
}

const TableHeader = ({ setFilter, optionsForFilter, setGlobalFilter, filterValue, children }: TableHeaderProps) => {
  return (
    <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 ">
      <TableSearhButton optionsForFilter={optionsForFilter} setFilter={setFilter} setGlobalFilter={setGlobalFilter} filterValue={filterValue} />
      <div className='flex gap-4'>
        {children}

      </div>
    </div>
  );
};

export default TableHeader;
