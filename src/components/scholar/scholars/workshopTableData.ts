import { TableOptions } from 'react-table'
import { Workshop, WorkshopSpeaker, WorkshopTempData } from '@prisma/client'

interface WorkshopTableProps {
    workshopData: (Workshop & {
        speaker: WorkshopSpeaker[];
        tempData: WorkshopTempData | null;
    })[],
}
const workshopScholarFormat: TableOptions<WorkshopTableProps> = [
    {
        Header: 'Taller',
        accessor: 'title'
    },
    {
        Header: 'Facilitador',
        accessor: 'speaker[0].name'
    },
    {
        id: 'date',
        Header: 'Fecha',
        accessor: 'dates[0].start_date',
        Cell: ({ value }: { value: string }) => { return new Date(value).toLocaleString('es-ES', { month: 'numeric', day: 'numeric', year: 'numeric' }) }
    },
    {
        id: 'startHour',
        Header: 'Inicio',
        accessor: 'dates[0].start_date',
        Cell: ({ value }: { value: string }) => { return new Date(value).toLocaleString('es-ES', { hour: 'numeric', minute: 'numeric', hourCycle: 'h12' }) }

    },

    {
        Header: 'Componente',
        accessor: 'pensum',
        Cell: ({ value }: { value: string }) => { return value.toLowerCase().replaceAll("_", " ") }

    },
    {
        Header: 'Modalidad',
        accessor: 'modality',
        Cell: ({ value }: { value: string }) => { return value.toLowerCase() }

    },
    {
        Header: 'Plataforma/Lugar',
        accessor: 'platform'
    },
    {
        Header: 'Año',
        accessor: 'year'
    },
    {
        Header: 'Asistencia',
        accessor: 'scholarAttendance[0].attendance',
        Cell: ({ value }: { value: string }) => { return value === "ATTENDED" ? "Asistió" : "No asistió" }


    },
]

export default workshopScholarFormat;