'use client';
import { Cell, CellValue, Column } from 'react-table';
import ScholarColumnWidget from '../commons/ScholarWidget';

export interface ScholarActivitiesInformationColumnsProps {
  id: string;
  name: string;
  profilePhoto: string | null;
  whatsAppNumber: string | null;
  dni: string;
  email: string | null;
  doneWorkshops: number | undefined;
  doneChats: number | undefined;
  doneVolunteerHours: number | undefined;
  scholarGrade: number | undefined;
}
const scholarActivitiesInformationColumns: Column<ScholarActivitiesInformationColumnsProps>[] = [
  {
    Header: 'Nombre',
    accessor: 'name',
    Cell: ({
      value,
      cell,
    }: {
      value: CellValue;
      cell: Cell<ScholarActivitiesInformationColumnsProps>;
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
  },
  {
    Header: 'Numero WhatsApp',
    accessor: 'whatsAppNumber',
  },
  {
    Header: 'Correo electronico',
    accessor: 'email',
  },
  {
    Header: 'Actividades formativas',
    accessor: 'doneWorkshops',
  },
  {
    Header: 'Chats Clubs de ingles',
    accessor: 'doneChats',
  },
  {
    Header: 'Horas de voluntariado',
    accessor: 'doneVolunteerHours',
  },
  {
    Header: 'Nota académica',
    accessor: 'scholarGrade',
  },
];

export default scholarActivitiesInformationColumns;
