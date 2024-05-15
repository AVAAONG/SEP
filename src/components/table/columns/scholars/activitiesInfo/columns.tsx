'use client';
import { Cell, CellValue, Column } from 'react-table';
import ScholarColumnWidget from '../commons/ScholarWidget';

export interface ScholarActivitiesInformationColumnsProps {
  id: string;
  names: string;
  profilePhoto: string | null;
  whatsAppNumber: string | null;
  email: string | null;
  doneWorkshops: number | undefined;
  doneChats: number | undefined;
  doneVolunteerHours: number | undefined;
}
const scholarActivitiesInformationColumns: Column<ScholarActivitiesInformationColumnsProps>[] = [
  {
    Header: 'Nombre',
    accessor: 'names',
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
];

export default scholarActivitiesInformationColumns;
