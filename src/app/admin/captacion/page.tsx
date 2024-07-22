import AdminStats from "@/components/admin/AdminStats";
import admisionColumn from "@/components/admission/admin/columns";
import { DonutChartComponent } from "@/components/charts";
import Table from "@/components/table/Table";

const fakeScholarsData = [
    {
        id: "1",
        name: "Ana Martínez",
        profilePhoto: "https://example.com/foto-ana.jpg",
        dni: "V-23456789",
        years: 22,
        collage: "Universidad Central",
        carrer: "Ingeniería Química",
        gender: "Femenino",
        whatsapp_number: "+58 412-1234567",
        email: "ana.martinez@example.com",
        programStatus: "Activo",
        step: 3,
    },
    {
        id: "2",
        name: "Carlos Gómez",
        profilePhoto: null,
        dni: "V-34567890",
        years: 24,
        collage: "Universidad de Carabobo",
        carrer: "Derecho",
        gender: "Masculino",
        whatsapp_number: "+58 424-7654321",
        email: "carlos.gomez@example.com",
        programStatus: "En espera",
        step: 2,
    },
    {
        id: "3",
        name: "Luisa Fernanda",
        profilePhoto: "https://example.com/foto-luisa.jpg",
        dni: "V-45678901",
        years: 23,
        collage: "Universidad Simón Bolívar",
        carrer: "Arquitectura",
        gender: "Femenino",
        whatsapp_number: "+58 416-1231234",
        email: null,
        programStatus: "Activo",
        step: 4,
    },
    {
        id: "4",
        name: "Roberto Díaz",
        profilePhoto: null,
        dni: "V-56789012",
        years: 25,
        collage: "Universidad del Zulia",
        carrer: "Medicina",
        gender: "Masculino",
        whatsapp_number: "+58 412-3214321",
        email: "roberto.diaz@example.com",
        programStatus: "Suspendido",
        step: 1,
    },
    {
        id: "5",
        name: "Sofía Castillo",
        profilePhoto: "https://example.com/foto-sofia.jpg",
        dni: "V-67890123",
        years: 21,
        collage: "Universidad Metropolitana",
        carrer: "Administración de Empresas",
        gender: "Femenino",
        whatsapp_number: "+58 414-2312312",
        email: "sofia.castillo@example.com",
        programStatus: "Activo",
        step: 8,
    },
];

const stats = [
    {
        name: `Total de postulantes`,
        stat: 100,
        changeType: 'decrease',
        comparationText: null,
        tooltipText: null,
    },
    {
        name: `Postulantes en fase 1`,
        stat: 20,
        changeType: 'increase',
        comparationText: `De 100 Postulantes`,
        comparation: 20,
        tooltipText: `${20}% `,
    },
    {
        name: `Postulantes en fase 2`,
        stat: 20,
        changeType: 'increase',
        comparationText: `De 100 Postulantes`,
        comparation: 20,
        tooltipText: `${20}% `,
    },
    {
        name: `Postulantes en fase 3`,
        stat: 20,
        changeType: 'increase',
        comparationText: `De 100 Postulantes`,
        comparation: 20,
        tooltipText: `${20}% `,
    },
];

const page = () => {

    return (
        <div className="flex flex-col w-full min-h-screen justify-start  gap-8">
            <AdminStats stats={stats} />
            <div className="flex flex-col w-full h-full bg-white dark:bg-black rounded-lg py-4 justify-center shadow-md ">
                <div className="w-full grid md:grid-cols-5 justify-center items-center">
                    {/* Necesary div to center the charts */} <div></div>
                    <DonutChartComponent data={[
                        { label: 'Fase 1', value: 20 },
                        { label: 'En espera', value: 20 },
                        { label: 'Fase 2', value: 20 },
                        { label: 'Entrevista', value: 20 },
                    ]} chartTitle="Distribución por estatus" />
                    <DonutChartComponent data={[
                        { label: 'Masculino', value: 20 },
                        { label: 'Femenino', value: 80 }
                    ]} chartTitle="Distribución por género" />
                    <DonutChartComponent data={[
                        { label: 'Arquitectura y urbanismo', value: 20 },
                        { label: 'Ciencias de la salud', value: 20 },
                        { label: 'Humanidades y educación', value: 20 },
                        { label: 'Ciencias jurídicas y políticas', value: 20 },
                        { label: 'Ciencias sociales', value: 20 },
                        { label: 'Ciencias, tecnología, ingeniería y matemáticas', value: 20 }
                    ]} chartTitle="Distribución por area de estudio" />
                </div>

            </div>
            <div className="w-full h-full">
                <Table
                    tableColumns={admisionColumn}
                    tableData={fakeScholarsData}
                    tableHeadersForSearch={[]}
                />
            </div>
        </div>

    );
};

export default page;
