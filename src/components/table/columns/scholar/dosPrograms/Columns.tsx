'use client';

import DisplayDate from '@/components/DisplayDate';
import AddDOSApplication from '@/components/forms/dosExchangePrograms/form';
import Table from '@/components/table/Table';
import { deleteDOSExchangeProgramApplication } from '@/lib/db/utils/users';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { DocumentTextIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';
import { DOSExchangeProgram } from '@prisma/client';
import Link from 'next/link';
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
      Header: 'Fecha de aplicacion',
      accessor: 'aplication_date',
    },
    {
      Header: 'Fue seleccionado',
      accessor: '',
      disableSortBy: true,
    },
    {
      Header: 'Etapa alcanzada',
      accessor: 'startDate',
      Cell: ({ value }) => {
        return <DisplayDate date={value} kind="short" />;
      },
    },
    {
      Header: 'Fecha de finalización',
      accessor: 'endDate',
      Cell: ({ value }) => {
        return <DisplayDate date={value} kind="short" />;
      },
    },
    {
      Header: 'Record academico',
      disableSortBy: true,
      accessor: 'record',
      Cell: ({ value }) => {
        return (
          <div className="m-auto w-6 ">
            <Link
              target="_blank"
              href={value ? value : ''}
              className="w-6 text-primary-light dark:text-primary-light"
            >
              <DocumentTextIcon className="w-6 h-6" />
            </Link>
          </div>
        );
      },
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
                    pending: 'Borrando periodo academico...',
                    success: 'periodo academico eliminado exitosamente',
                    error: 'Error al eliminar periodo academico',
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
