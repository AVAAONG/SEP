


import { Avatar, Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
const FAMILY_INFORMATION = [
    { question: "¿Contribuye con el ingreso familiar?", answer: "Sí" },
    { question: "Promedio de ingreso familiar", answer: "$1000" },
    { question: "¿Con quién vives?", answer: "Con padres" },
    { question: "Tipo de vivienda", answer: "Apartamento" },
    { question: "Composición del núcleo familiar", answer: "Padre, Madre, Hermano" },
    { question: "Ocupación del padre", answer: "Ingeniero" },
    { question: "Nombre de la empresa u organización en donde trabaja el padre", answer: "Empresa ABC" },
    { question: "Ocupación de la madre", answer: "Doctora" },
    { question: "Nombre de la empresa u organización donde trabaja la madre", answer: "Hospital XYZ" },
];


const PERSONAL_INFORMATION = [
    { question: "Cédula:", answer: "12345678" },
    { question: "Género:", answer: "Masculino" },
    { question: "Fecha de Nacimiento:", answer: "01/01/1990" },
    { question: "Edad:", answer: "15" },
]

const CONTACT_INFORMATION = [
    { question: "Teléfono local:", answer: "0212-1234567" },
    { question: "WhatsApp:", answer: "0412-1234567" },
    { question: "Correo:", answer: "ejemplo@gmail.com" }
]

const workDetails = [
    { question: "¿Actualmente trabaja?", answer: "Sí" },
    { question: "Nombre de la organización/empresa donde trabaja", answer: "Empresa XYZ" },
    { question: "Cargo que desempeña", answer: "Gerente" },
    { question: "Modalidad de trabajo", answer: "Remoto" },
    { question: "Horario de trabajo", answer: "9:00 AM - 5:00 PM" },
];
const educationDetails = [
    { question: "Nombre de la institución", answer: "Instituto Nacional" },
    { question: "Dirección de la institución", answer: "Calle Falsa 123, Ciudad, País" },
    { question: "Título obtenido al egresar de la institución", answer: "Bachiller en Ciencias" },
    { question: "Mencion", answer: "N/A" },
    { question: "Promedio de notas de bachillerato", answer: "18.5/20" },
    { question: "Actividades extracurriculares", answer: "Fútbol, Club de Ciencias" },
];

const connectivityDetails = [
    { question: "¿Posee conexión a internet?", answer: "Sí" },
    { question: "¿Qué tan estable es tu conectividad?", answer: "Mayormente estable" },
    { question: "¿Cómo se enteró del Programa Excelencia?", answer: "A través de redes sociales" },
    { question: "¿Por qué solicita esta beca?", answer: "Para continuar mis estudios universitarios" },
    { question: "¿Eres referido por algún becario de AVAA?", answer: "No" },
    { question: "Nombre del Becario por quien vienes referido", answer: "N/A" },
];

const universityDetails = [
    { question: "Tipo de universidad", answer: "Pública" },
    { question: "Universidad", answer: "Universidad Nacional" },
    { question: "Área de estudio", answer: "STEM" },
    { question: "Carrera", answer: "Ingeniería de Software" },
    { question: "Fecha de inicio de estudios universitarios", answer: "2023-01-15" },
    { question: "Régimen de Estudio", answer: "Semestral" },
    { question: "Período académico (en curso)", answer: "2023-I" },
    { question: "Promedio del último período académico culminado", answer: "4.5/5.0" },
    { question: "Modalidad de clases", answer: "Presencial" },
    { question: "¿Posee beca?", answer: "Sí" },
    { question: "Porcentaje de la beca", answer: "50%" },
];

const CardTem = ({ title, items }: { title: string, items: { question: string, answer: string }[] }) => (
    <Card className="w-full" radius="sm">
        <CardHeader>
            <h1 className="text-primary-light text-xl font-semibold">{title}</h1>
        </CardHeader>
        <CardBody className="grid grid-cols-3 gap-4">
            {
                items.map((info, index) => (
                    <div key={index}>
                        <label className="block text-sm font-medium">{info.question}</label>
                        <p>{info.answer}</p>
                    </div>
                ))
            }
        </CardBody>
    </Card>
)


export default function Component() {
    return (
        <div className="grid grid-cols-4 min-h-screen ">
            <div className="col-span-1">
                <aside className="fixed p-6 bg-white rounded-lg" style={{ width: "calc(25% - 1.5rem)", overflowY: "auto" }}>
                    <div>
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex flex-col items-center">
                                <div className="w-64 h-64 rounded-full shadow-lg border-3 border-green-500 p-1 overflow-hidden">
                                    <Avatar
                                        src={undefined}
                                        alt="Becario's photo"
                                        className="w-full h-full rounded-full object-contain"
                                    />
                                </div>
                                <h2 className="text-xl font-bold text-green-600 mt-4">William Montero</h2>
                                <p className="text-center mt-2 font-semibold">
                                    Comunicación Social
                                </p>
                                <p className="font-semibold">Universidad Central de Venezuela (UCV)</p>
                            </div>

                            <Divider />
                            {/* <h3 className="text-lg font-semibold">Información Personal</h3> */}
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                {PERSONAL_INFORMATION.map((info, index) => (
                                    <>
                                        <div className="justify-self-start">
                                            <p className="text-start block font-medium">{info.question}</p>
                                        </div>
                                        <div className="justify-self-end">
                                            <p >{info.answer}</p>
                                        </div>
                                    </>
                                ))}
                            </div>
                            <Divider />
                            {/* <h3 className="text-lg font-semibold">Información de Contacto</h3> */}
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                {CONTACT_INFORMATION.map((info, index) => (
                                    <>
                                        <div className="justify-self-start">
                                            <p className="text-start block font-medium">{info.question}</p>
                                        </div>
                                        <div className="justify-self-end">
                                            <p >{info.answer}</p>
                                        </div>
                                    </>
                                ))}
                            </div>
                            <Divider />
                            <Button variant="ghost">Crear planilla</Button>
                        </div>
                    </div>
                </aside>
            </div>
            <main className="flex flex-col col-span-3 flex-1 px-12 gap-4">
                <Card className="w-full" radius="sm">
                    <CardBody>
                        <div className="flex justify-around">
                            <div>
                                Estatus
                            </div>
                            <div>
                                Seleccionado
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <Card className="w-full mt-6" radius="sm">
                    <CardHeader>
                        <h1 className="text-primary-light text-xl font-semibold">Informacion de contacto</h1>
                    </CardHeader>
                    <CardBody className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Teléfono de un familiar o pariente</label>
                            <p>0424-1234567</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Nombre del familiar o pariente</label>
                            <p>Jonathan</p>
                        </div>
                    </CardBody>
                </Card>
                <CardTem items={universityDetails} title="Educación universitaria" />
                <CardTem items={educationDetails} title="Educación secundaria" />
                <CardTem items={workDetails} title="Situación laboral" />
                <CardTem items={FAMILY_INFORMATION} title="Datos familiares" />
                <CardTem items={connectivityDetails} title="Información adicional" />
            </main>
        </div>
    )
}