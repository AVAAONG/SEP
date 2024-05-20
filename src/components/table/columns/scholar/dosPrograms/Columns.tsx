'use client';

import AddCollageAcademicPeriod from '@/components/AddCollageAcademicPeriod';
import DisplayDate from '@/components/DisplayDate';
import { deleteBlob } from '@/lib/azure/azure';
import { deleteAcademicPeriod } from '@/lib/db/utils/collage';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { DocumentTextIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';
import { ScholarCollagePeriod } from '@prisma/client';
import Link from 'next/link';
import { Column } from 'react-table';
import { toast } from 'react-toastify';

interface CollagePeriodsIntermediateComponentProps {
  collageInformationId: string | undefined;
  collagePeriodsForTable: {
    id: string;
    current_academic_period: number;
    startDate: string;
    endDate: string;
    grade: number;
    modality: string;
    record: string | null;
  }[];
  collagePeriodForUpdate: ScholarCollagePeriod[] | undefined;
}

const CollagePeriodsIntermediateComponent: React.FC<CollagePeriodsIntermediateComponentProps> = ({
  collageInformationId,
  collagePeriodsForTable,
  collagePeriodForUpdate,
}) => {
  const CollageAcademicPeriodsColumns: Column<{
    id: string;
    current_academic_period: number;
    startDate: string;
    endDate: string;
    grade: number;
    modality: string;
    record: string | null;
  }>[] = [
    {
      Header: 'n°',
      accessor: 'id',
      Cell: ({ cell }) => {
        return <span className="font-semibold">{cell.row.index + 1}</span>;
      },
    },
    {
      Header: 'Nombre del programa',
      accessor: 'current_academic_period',
    },
    {
      Header: 'Fecha de aplicacion',
      accessor: 'grade',
    },
    {
      Header: 'Fue seleccionado',
      accessor: 'modality',
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
            <AddCollageAcademicPeriod
              collageInformationId={collageInformationId || null}
              edit={true}
              collagePeriod={
                collagePeriodForUpdate?.filter(
                  (collagePeriod) => collagePeriod.id === cell.row.original.id
                )[0] || null
              }
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
                    if (cell.row.original.record) await deleteBlob(cell.row.original.record);
                    await deleteAcademicPeriod(cell.row.original.id);
                    return revalidateSpecificPath(`/becario/universidad`);
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




