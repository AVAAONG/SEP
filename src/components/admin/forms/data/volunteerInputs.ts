const VOLUNTEER_INPUT_ELEMENTS = [
    {
        title: "Nombre del Voluntariado",
        placeHolder: "UMAAZO en el avila",
        type: "text",
        inputType: "complete",
        inputId: "name",
        autoFocus: true,
        required: true
    },
    {
        title: "Proyecto asociado",
        placeHolder: "Liderazgo",
        type: "text",
        inputOptions: ['UMAA', 'OAL', 'UVPLV', 'ALV', 'GA', 'Oficina', 'Externo'],
        inputType: 'selection',
        inputId: "asociatedProject",
        required: true
    },
    {
        title: "Fecha de incio",
        placeHolder: "31/01/2023",
        type: "date",
        inputType: 'date',
        inputId: "startDate",
        required: true
    },
    {
        title: "Fecha de finalizacion",
        placeHolder: "31/01/2023",
        type: "date",
        inputType: 'date',
        inputId: "endDate",
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
        title: "Encargado",
        placeHolder: "",
        type: "text",
        inputType: 'normal',
        inputId: "inCharge",
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
        inputId: "kindOfVolunteer",
        required: true
    },
    {
        title: "Lugar",
        placeHolder: "El lagunzo - El Avila",
        type: "text",
        inputType: 'normal',
        inputId: "place"
    },
    {
        title: "Descripcion",
        placeHolder: "En este voluntariado...",
        type: "text",
        inputType: 'textArea',
        inputId: "description"

    },
]
export default VOLUNTEER_INPUT_ELEMENTS;