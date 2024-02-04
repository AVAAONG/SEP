'use client';
import defailProfilePic from '@/../public/defaultProfilePic.png';
import { IScholarForAttendanceTable } from '@/app/admin/chats/[chatId]/page';
import formatDni from '@/lib/db/utils/formatDni';
import { Chip } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { Cell, CellValue, Column } from 'react-table';

const ScholarActivityAttendanceForScholarTemp: Column<IScholarForAttendanceTable>[] = [
    {
        Header: '#',
        accessor: 'id',
        Cell: ({ cell }) => {
            return <span className="font-semibold">{cell.row.index + 1}</span>;
        },
    },
    {
        Header: 'Nombre',
        accessor: (row: IScholarForAttendanceTable) => `${row.first_names} ${row.last_names}`,
        Cell: ({ value, cell }: { value: CellValue; cell: Cell<IScholarForAttendanceTable> }) => {
            const id = cell.row.original.id;
            const career = '';
            return (
                <Link
                    href={cell.row.original.id ? `/admin/becarios/${id}` : ''}
                    className="flex items-center"
                >
                    <div className="flex-shrink-0 w-8 h-8">
                        <Image
                            className="w-full h-full rounded-full"
                            src={defailProfilePic}
                            alt="Foto de perfil"
                        />
                    </div>
                    <div className="ml-4 text-start">
                        <span className="text-sm font-medium text-gray-900 dark:text-slate-100">{value}</span>
                        <span className="block text-xs font-medium text-gray-400 dark:text-slate-400">
                            {career}
                        </span>
                        <div className="ml-4 text-start"></div>
                    </div>
                </Link>
            );
        },
    },
    {
        Header: 'Cédula',
        accessor: 'dni',
        Cell: ({ value }: { value: CellValue }) => {
            const dni = formatDni(value);
            return <span>V-{dni}</span>;
        },
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
    },
    {
        Header: 'Asistencia',
        accessor: 'attendance',
        Cell: ({ value }) => {
            if (value === 'CANCELLED') {
                return (
                    <Chip color='danger'>
                        Canceló
                    </Chip>
                )
            }
            else if (value === 'ENROLLED') {
                return (
                    <Chip >
                        Inscrito
                    </Chip>
                )
            }
        },
    },
    {
        Header: 'Telefono celular',
        accessor: 'phone_number',
    },
    {
        Header: 'Whatsapp',
        accessor: 'whatsAppNumber',
    },
    {
        Header: 'Correo',
        accessor: 'email',
    },
];

export default ScholarActivityAttendanceForScholarTemp;
