const WORKSHOP_INPUT_ELEMENTS = (speakers: string[]) => {
  return [
    {
      title: 'Nombre del taller',
      placeHolder: 'Liderazgo para el siglo 21',
      type: 'text',
      inputType: 'complete',
      inputId: 'title',
      autoFocus: true,
      required: true,
    },
    {
      title: 'Competencia asociada',
      placeHolder: 'Liderazgo',
      type: 'text',
      inputOptions: [
        'Liderazgo',
        'Ejercicio Ciudadano',
        'Gerencia de sí mismo',
        'TIC',
        'Emprendimiento',
      ],
      inputType: 'selection',
      inputId: 'pensum',
      required: true,
    },
    {
      title: 'Fecha ',
      placeHolder: '03/20/2023',
      type: 'date',
      inputType: 'date',
      inputId: 'date',
      required: true,
    },
    {
      title: 'Hora de inicio',
      placeHolder: '02:00PM',
      type: 'time',
      inputType: 'date',
      inputId: 'startHour',
      required: true,
    },
    {
      title: 'Hora de finalización',
      placeHolder: '04:00PM',
      type: 'time',
      inputType: 'normal',
      inputId: 'endHour',
      required: true,
    },
    {
      title: 'Nombre del Facilitador',
      placeHolder: 'Luis Lopéz',
      type: 'text',
      inputType: 'selection',
      inputOptions: speakers,
      inputId: 'speaker',
      required: true,
    },
    {
      title: 'Cupos disponibles',
      placeHolder: '20',
      type: 'number',
      inputType: 'normal',
      inputId: 'spots',
      required: true,
    },
    {
      title: 'Modalidad',
      placeHolder: 'Presencial',
      type: 'text',
      inputOptions: ['Presencial', 'Virtual', 'Asincrono', 'Hibrido'],
      inputType: 'selection',
      inputId: 'modality',
      required: true,
    },
    {
      title: 'Plataforma',
      placeHolder: 'Oficinas de AVAA',
      type: 'text',
      inputOptions: ['Zoom', 'Google Meet', 'Otra', 'Padlet'],
      inputType: 'allowedSelection',
      inputId: 'platform',
      required: true,
    },
    {
      title: 'Año del taller',
      placeHolder: 'II',
      type: 'text',
      inputOptions: ['I', 'II', 'III', 'IV', 'V', '+V', 'Todos'],
      inputType: 'checkbox',
      inputId: 'avaaYear',
      required: true,
    },
    {
      title: 'Descripcion',
      placeHolder: 'Este taller...',
      type: 'textarea',
      inputType: 'textArea',
      inputId: 'description',
      required: false,
    },
  ];
};

export default WORKSHOP_INPUT_ELEMENTS;

// const WORKSHOP_INPUT_ELEMENTS = (speakers: any) => {
//     let s
//     if (speakers === undefined) s = []
//     else s = speakers.length > 1 ? speakers : []
//     return [
//         {
//             title: "Nombre del taller",
//             placeHolder: "Liderazgo para el siglo 21",
//             type: "text",
//             inputType: "complete",
//             inputId: "name",
//             autoFocus: true,
//             required: true
//         },
//         {
//             title: "Competencia asociada",
//             placeHolder: "Liderazgo",
//             type: "text",
//             inputOptions: [
//                 {
//                     option: 'Liderazgo',
//                     value: 'Liderazgo',
//                 },
//                 {
//                     option: 'Ejercicio Ciudadano',
//                     value: 'Ejercicio Ciudadano',
//                 },
//                 {
//                     option: 'Ejercicio Ciudadano',
//                     value: 'Ejercicio Ciudadano',
//                 },
//                 {
//                     option: 'Gerencia de sí mismo',
//                     value: 'Gerencia de sí mismo',
//                 },
//                 {
//                     option: 'TIC',
//                     value: 'TIC',
//                 },
//                 {
//                     option: 'Emprendimiento',
//                     value: 'Emprendimiento'
//                 }
//             ],
//             inputType: 'selection',
//             inputId: "pensum",
//             required: true
//         },
//         {
//             title: "Fecha ",
//             placeHolder: "03/20/2023",
//             type: "date",
//             inputType: 'date',
//             inputId: "date",
//             required: true

//         },
//         {
//             title: "Hora de inicio",
//             placeHolder: "02:00PM",
//             type: "time",
//             inputType: 'date',
//             inputId: "startHour",
//             required: true
//         },
//         {
//             title: "Hora de finalización",
//             placeHolder: "04:00PM",
//             type: "time",
//             inputType: 'normal',
//             inputId: "endHour",
//             required: true
//         },
//         {
//             title: "Nombre del Facilitador",
//             placeHolder: "Luis Lopéz",
//             type: "text",
//             inputOptions: [{
//                 option: 'Presencial',
//                 value: 'Presencial',
//             }],
//             inputType: 'selection',
//             inputId: "speaker",
//             required: true
//         },
//         {
//             title: "Cupos disponibles",
//             placeHolder: "20",
//             type: "number",
//             inputType: 'normal',
//             inputId: "numberOfParticipants",
//             required: true
//         },
//         {
//             title: "Modalidad",
//             placeHolder: "Presencial",
//             type: "text",
//             inputOptions: [
//                 {
//                     option: 'Presencial',
//                     value: 'Presencial',
//                 },
//                 {
//                     option: 'Virtual',
//                     value: 'Virtual',
//                 },
//                 {
//                     option: 'Asincrono',
//                     value: 'Asincrono'
//                 },
//                 {
//                     option: 'Hibrido',
//                     value: 'Hibrido'
//                 }
//             ],
//             inputType: 'selection',
//             inputId: "kindOfWorkshop",
//             required: true
//         },
//         {
//             title: "Plataforma",
//             placeHolder: "Oficinas de AVAA",
//             type: "text",
//             inputOptions: [
//                 {
//                     option: 'Zoom',
//                     value: 'Zoom'
//                 },
//                 {
//                     option: 'Google Meet',
//                     value: 'Google Meet'
//                 },
//                 {
//                     option: 'Otra',
//                     value: 'Otra'
//                 },
//                 {
//                     option: 'Padlet',
//                     value: 'Padlet'
//                 }
//             ],
//             inputType: 'allowedSelection',
//             inputId: "platform",
//             required: true
//         },
//         {
//             title: "Año del taller",
//             placeHolder: "II",
//             type: "text",
//             inputOptions: [
//                 {
//                     option: 'I',
//                     value: 'I'
//                 },
//                 {
//                     option: 'II',
//                     value: 'II'
//                 },
//                 {
//                     option: 'III',
//                     value: 'III'
//                 },
//                 {
//                     option: 'IV',
//                     value: 'IV'
//                 },
//                 {
//                     option: 'V',
//                     value: 'V'
//                 },
//                 {
//                     option: '+V',
//                     value: '+V'
//                 },
//                 {
//                     option: 'Todos',
//                     value: 'Todos'
//                 }
//             ],
//             inputType: 'checkbox',
//             inputId: "avaaYear",
//             required: true
//         },
//         {
//             title: "Descripcion",
//             placeHolder: "Este taller...",
//             type: "textarea",
//             inputType: 'textArea',
//             inputId: "description",
//             required: false
//         },

//     ]
// }
// export default WORKSHOP_INPUT_ELEMENTS;
