'use client';

import DisplayDate from '@/components/DisplayDate';
import AddDOSApplication from '@/components/forms/dosExchangePrograms/form';
import Table from '@/components/table/Table';
import { deleteDOSExchangeProgramApplication } from '@/lib/db/utils/users';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/tooltip';
import { DOSExchangeProgram } from '@prisma/client';
import { Column } from 'react-table';
import { toast } from 'react-toastify';

interface CollagePeriodsIntermediateComponentProps {
  scholarId: string | undefined;
  dosProgramApplication: DOSExchangeProgram[] | null;
}

const DOSExchangeProgramApplicationTable: React.FC<CollagePeriodsIntermediateComponentProps> = ({
  scholarId,
  dosProgramApplication,
}) => {
  const DOSExchangeProgramApplicationColumns: Column<DOSExchangeProgram>[] = [
    {
      Header: 'n°',
      Cell: ({ cell }) => {
        return <span className="font-semibold">{cell.row.index + 1}</span>;
      },
    },
    {
      Header: 'Nombre del programa',
      accessor: 'name',
    },
    {
      Header: 'Fecha de aplicación',
      accessor: 'aplication_date',
      Cell: ({ value }) => {
        return <DisplayDate date={value.toISOString()} kind="short" />;
      },
    },
    {
      Header: 'Etapa alcanzada',
      accessor: 'reached_stage',
    },
    {
      Header: 'Seleccionado',
      accessor: 'selected',
      Cell: ({ value }) => {
        return value ? 'Sí' : 'No';
      },
    },
    {
      Header: 'Estado en USA',
      accessor: 'usa_state',
    },
    {
      Header: 'Universidad en USA',
      accessor: 'usa_university',
    },
    {
      Header: 'Duración del programa',
      accessor: 'program_duration',
    },
    {
      Header: 'Contacto en USA',
      accessor: 'usa_contact',
    },
    {
      Header: 'Organización actual',
      accessor: 'currently_working_org',
    },
    {
      Header: 'Conexión en USA',
      accessor: 'usa_connection',
      disableSortBy: true,
      Cell: ({ value }) => (
        <Tooltip
          content={value}
          classNames={{
            content: 'bg-light dark:bg-dark text-dark dark:text-light',
          }}
        >
          <div className="block w-72 overflow-x-scroll">{value}</div>
        </Tooltip>
      ),
    },
    {
      Header: 'Editar registro',
      disableSortBy: true,
      id: 'update',
      Cell: ({ cell }) => {
        return (
          <>
            <AddDOSApplication
              scholarId={scholarId}
              dosProgramApplication={
                dosProgramApplication?.filter(
                  (dosProgram) => dosProgram.id === cell.row.original.id
                )[0] || null
              }
              edit={true}
            />
          </>
        );
      },
    },
    {
      Header: 'Eliminar eliminar',
      disableSortBy: true,
      id: 'delete',
      Cell: ({ cell }) => {
        return (
          <>
            <Button
              isIconOnly
              color="danger"
              variant="light"
              onPress={() =>
                toast.promise(
                  async () => {
                    await deleteDOSExchangeProgramApplication(cell.row.original.id);
                    return revalidateSpecificPath(`/becario/dos`);
                  },
                  {
                    pending: 'Borrando aplicación...',
                    success: 'aplicación eliminado exitosamente',
                    error: 'Error al eliminar aplicación',
                  }
                )
              }
            >
              <XMarkIcon className="w-4 h-4" />
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Table
        tableData={dosProgramApplication || []}
        tableColumns={DOSExchangeProgramApplicationColumns}
        tableHeadersForSearch={[]}
      >
        <AddDOSApplication scholarId={scholarId} dosProgramApplication={null} edit={false} />
      </Table>
    </>
  );
};

export default DOSExchangeProgramApplicationTable;
