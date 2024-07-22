'use client';
import formatDni from '@/lib/db/utils/formatDni';
import { Avatar } from '@nextui-org/avatar';
import { Gender } from '@prisma/client';
import Link from 'next/link';
import { Cell, CellValue, Column } from 'react-table';

export interface ScholarGeneralInformationColumnProps {
    id: string;
    name: string;
    profilePhoto: string | null;
    dni: string;
    years: number;
    collage: string;
    carrer: string;
    gender: Gender;
    whatsapp_number: string;
    email: string | null;
    programStatus: string;
    step: number;
}

interface ScholarColumnWidgetProps {
    scholarId: string;
    scholarName: string;
    scholarPhoto: string | null;
}

const ApplicantColumnWidget: React.FC<ScholarColumnWidgetProps> = ({
    scholarId,
    scholarName,
    scholarPhoto,
}) => {
    return (
        <Link href={scholarId ? `/admin/captacion/${scholarId}` : ''} className="w-67">
            <div className="flex items-center  w-full">
                <div className="flex-shrink-0 w-8 h-8">
                    <Avatar
                        className="w-full h-full rounded-full"
                        src={scholarPhoto ? scholarPhoto : undefined}
                        alt="Foto de perfil"
                    />
                </div>
                <div className="ml-4 text-start w-full">
                    <span className="text-sm font-medium text-gray-900 dark:text-slate-100">
                        {scholarName}
                    </span>
                </div>
            </div>
        </Link>
    );
};


const admisionColumn: Column<ScholarGeneralInformationColumnProps>[] = [
    {
        Header: 'Nombre',
        accessor: 'name',
        Cell: ({
            value,
            cell,
        }: {
            value: CellValue;
            cell: Cell<ScholarGeneralInformationColumnProps>;
        }) => (
            <ApplicantColumnWidget
                scholarId={cell.row.original.id}
                scholarName={value}
                scholarPhoto={cell.row.original.profilePhoto}
            />
        ),
    },
    {
        Header: 'Cédula',
        accessor: 'dni',
        disableSortBy: true,
        Cell: ({ value }: { value: CellValue }) => {
            const dni = formatDni(value);
            return <span>V-{dni}</span>;
        },
    },
    {
        Header: 'Edad',
        accessor: 'years',
    },
    {
        Header: 'Género',
        accessor: 'gender',
        Cell: ({ value }: { value: CellValue }) => {
            if (value === 'M') {
                return (
                    <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                        Masculino
                    </span>
                );
            } else {
                return (
                    <span className="inline-flex items-center bg-rose-100 text-rose-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-rose-900 dark:text-rose-300">
                        Femenino
                    </span>
                );
            }
        },
        disableSortBy: true,
    },
    {
        Header: 'Whatsapp',
        accessor: 'whatsapp_number',
        disableSortBy: true,
    },
    {
        Header: 'Universidad',
        accessor: 'collage',
        disableSortBy: true,
    },
    {
        Header: 'Carrera',
        accessor: 'carrer',
        disableSortBy: true,
    },
    {
        Header: 'Correo electrónico',
        accessor: 'email',
        disableSortBy: true,
    },
    {
        Header: 'Status',
        accessor: 'programStatus',
        Cell: ({ value }: { value: CellValue }) => {
            return (
                <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                    {value}
                </span>
            )
        },
        disableSortBy: true,
    },
    {
        Header: 'Completado',
        accessor: 'step',
        disableSortBy: true,
        Cell: ({ value }: { value: CellValue }) => {
            return (
                <span> {((value * 100) / 8)} %</span>
            )
        },
    },
];

export default admisionColumn;
