import { Chat, ChatSpeaker, ChatsTempData } from '@prisma/client';
import { TableOptions } from 'react-table';

interface ChatTableProps {
  workshopData: (Chat & {
    speaker: ChatSpeaker[];
    tempData: ChatsTempData | null;
  })[];
}
const chatHeaders: TableOptions<ChatTable> = [
  {
    Header: 'Taller',
    accessor: 'title',
  },
  {
    Header: 'Facilitador',
    accessor: 'speaker[0].name',
  },
  // {
  //     id: 'date',
  //     Header: 'Fecha',
  //     accessor: 'dates[0].start_date',
  //     Cell: ({ value }: { value: string }) => { return new Date(value).toLocaleString('es-ES', { month: 'numeric', day: 'numeric', year: 'numeric' }) }
  // },
  // {
  //     id: 'startHour',
  //     Header: 'Inicio',
  //     accessor: 'dates[0].start_date',
  //     Cell: ({ value }: { value: string }) => { return new Date(value).toLocaleString('es-ES', { hour: 'numeric', minute: 'numeric', hourCycle: 'h12' }) }

  // },
  // {
  //     id: 'endHour',
  //     Header: 'Cierre',
  //     accessor: 'dates[0].end_date',
  //     Cell: ({ value }: { value: string }) => { return new Date(value).toLocaleString('es-ES', { hour: 'numeric', minute: 'numeric', hourCycle: 'h12' }) }

  // },
  {
    Header: 'Nivel',
    accessor: 'level',
  },
  {
    Header: 'Modalidad',
    accessor: 'modality',
  },
  {
    Header: 'Plataforma/Lugar',
    accessor: 'platform',
  },
];

export default chatHeaders;
