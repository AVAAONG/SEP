'use client';

import AddCvaModule from '@/components/AddCvaModule';
import Table from '@/components/table/Table';
import { deleteBlob } from '@/lib/azure/azure';
import { deleteCvaModule } from '@/lib/db/utils/cva';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { DocumentTextIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from "@heroui/react";
import { ScholarCvaModule } from '@prisma/client';
import Link from 'next/link';
import { Column } from 'react-table';
import { toast } from 'react-toastify';

interface CVAModulesTableProps {
  cvaInformationId: string | null;
  cvaModulesForTable: {
    modality: string;
    schedule: string;
    record: string | null;
    id: string;
    module: number;
    qualification: number;
  }[];
  cvaModuleForUpdate: ScholarCvaModule[] | undefined;
}

const CvaModulesTable: React.FC<CVAModulesTableProps> = ({
  cvaInformationId,
  cvaModulesForTable,
  cvaModuleForUpdate
}) => {

  const CvaModulesColumns: Column<{
    modality: string;
    schedule: string;
    record: string | null;
    id: string;
    module: number;
    qualification: number;
  }>[] = [
      {
        Header: 'n°',
        accessor: 'id',
        Cell: ({ cell }) => {
          return <span className="font-semibold">{cell.row.index + 1}</span>;
        },
      },
      {
        Header: 'Modulo',
        accessor: 'module',
      },
      {
        Header: 'Modalidad',
        accessor: 'modality',
        disableSortBy: true,
      },
      {
        Header: 'Nota obtenida',
        accessor: 'qualification',
      },
      {
        Header: 'Horario',
        accessor: 'schedule',
        disableSortBy: true,
      },
      {
        Header: 'Comprobante',
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
        Header: 'Editar',
        disableSortBy: true,
        id: 'update',
        Cell: ({ cell }) => {
          return (
            <>
              <AddCvaModule
                cvaInformationId={cvaInformationId || null}
                cvaModule={
                  cvaModuleForUpdate?.filter((module) => module.id === cell.row.original.id)[0] || null
                }
                edit={true}

              />
            </>
          );
        },
      },
      {
        Header: 'Eliminar',
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
                      if (cell.row.original.record) await deleteBlob(cell.row.original.record);
                      await deleteCvaModule(cell.row.original.id);
                      return revalidateSpecificPath(`/becario/cva`);
                    },
                    {
                      pending: 'Borrando modulo...',
                      success: 'modulo eliminado exitosamente',
                      error: 'Error al eliminar modulo',
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
        tableData={cvaModulesForTable || []}
        tableColumns={CvaModulesColumns}
        tableHeadersForSearch={[]}
      >
        <AddCvaModule
          cvaInformationId={cvaInformationId || null}
          cvaModule={null}
          edit={false}
        />
      </Table>
    </>
  )

}

export default CvaModulesTable;