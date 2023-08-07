const CHAT_INPUT_ELEMENTS = [
    {
        title: "Nombre del chat",
        placeHolder: "Modern Social Movements",
        type: "text",
        inputType: "complete",
        inputId: "name",
        autoFocus: true,
        required: true
    },
    {
        title: "Nivel de chat",
        placeHolder: "Liderazgo",
        type: "text",
        inputOptions: ["Basico", "Intermedio", "Avanzado"],
        inputType: 'selection',
        inputId: "level",
        required: true
    },
    {
        title: "Fecha ",
        placeHolder: "31/01/2023",
        type: "date",
        inputType: 'date',
        inputId: "date",
        required: true
    },
    {
        title: "Hora de inicio",
        placeHolder: "02:00PM",
        type: "time",
        inputType: 'date',
        inputId: "startHour",
        required: true
    },
    {
        title: "Hora de finalizacion",
        placeHolder: "04:00PM",
        type: "time",
        inputType: 'normal',
        inputId: "endHour",
        required: true
    },
    {
        title: "Nombre del Facilitador",
        placeHolder: "Jennipher Dolinski",
        type: "text",
        inputType: 'normal',
        inputId: "speaker",
        required: true
    },
    {
        title: "Cupos disponibles",
        placeHolder: "20",
        type: "number",
        inputType: 'normal',
        inputId: "numberOfParticipants",
        required: true
    },
    {
        title: "Modalidad",
        placeHolder: "Presencial",
        type: "text",
        inputOptions: ['Presencial', 'Virtual'],
        inputType: 'selection',
        inputId: "kindOfChat",
        required: true
    },
    {
        title: "Plataforma",
        placeHolder: "Zoom",
        type: "text",
        inputOptions: ['Zoom', 'Google Meet', 'Otra',],
        inputType: 'allowedSelection',
        inputId: "platform",
        required: true
    },
    {
        title: "Turno",
        placeHolder: "A",
        type: "text",
        inputOptions: ["A", "B", "C"],
        inputType: 'selection',
        inputId: "turn",
        required: true
    },
    {
        title: "Descripción",
        placeHolder: "Este chat...",
        type: "textarea",
        inputType: 'textArea',
        inputId: "description",
        required: false
    },
]

export default CHAT_INPUT_ELEMENTS;