'use client';
import formatDni from '@/lib/db/utils/formatDni';
import { Gender } from '@prisma/client';
import { Cell, CellValue, Column } from 'react-table';
import ScholarColumnWidget from '../commons/ScholarWidget';

export interface WithdrawAndResignationGeneralInformationColumnProps {
  id: string;
  name: string;
  profilePhoto: string | null;
  dni: string;
  birthdate: string;
  years: number;
  gender: Gender;
  whatsapp_number: string;
  email: string | null;
  avaaStarteYear: string;
  avaaEndDate: string;
  scholarCondition: string;
}

const scholarToWithdrawAndResignationGeneralInformationColumns: Column<WithdrawAndResignationGeneralInformationColumnProps>[] =
  [
    {
      Header: 'Nombre',
      accessor: 'name',
      Cell: ({
        value,
        cell,
      }: {
        value: CellValue;
        cell: Cell<WithdrawAndResignationGeneralInformationColumnProps>;
      }) => (
        <ScholarColumnWidget
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
      Header: 'Fecha de nacimiento',
      accessor: 'birthdate',
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
      Header: 'Celular whatsapp',
      accessor: 'whatsapp_number',
      disableSortBy: true,
    },
    {
      Header: 'Correo electrónico',
      accessor: 'email',
      disableSortBy: true,
    },
    {
      Header: 'Fecha de ingreso a AVAA',
      accessor: 'avaaStarteYear',
    },
    {
      Header: 'Fecha de salida de AVAA',
      accessor: 'avaaEndDate',
    },
    {
      Header: 'Condición',
      accessor: 'scholarCondition',
    },
  ];

export default scholarToWithdrawAndResignationGeneralInformationColumns;
