type GeneralInformationInputData = {
    label: string;
    id: "firstNames" | "lastNames" | "dni" | "gender" | "birthDate" | "cellPhoneNumber" | "avaaAdmissionYear" | "localPhoneNumber" | "email";
    placeholder: string;
    required?: boolean;
    type: string;
    autoComplete: string;
    spellCheck?: boolean;
    tabIndex?: number;
}


const GENERAL_INFORMATION_INPUT_DATA: GeneralInformationInputData[] = [
    {
        label: 'Nombres',
        id: 'firstNames',
        placeholder: 'Kevin José',
        required: true,
        type: 'text',
        autoComplete: 'given-name',
        spellCheck: false,
        tabIndex: 0,
    },
    {
        label: 'Apellidos',
        id: 'lastNames',
        placeholder: 'Bravo Mota',
        required: true,
        type: 'text',
        autoComplete: 'family-name',
    },
    {
        label: 'Cédula de identidad',
        id: 'dni',
        placeholder: 'V-12345678',
        required: true,
        type: 'text',
        autoComplete: 'cedula',
    },
    {
        label: 'Género',
        id: 'gender',
        placeholder: 'Masculino',
        required: true,
        type: 'select',
        autoComplete: 'genre',

    },
    {
        label: 'Fecha de nacimiento',
        id: 'birthDate',
        placeholder: 'Femenino',
        required: true,
        type: 'date',
        autoComplete: 'birthDate',
    },
    {
        label: 'Número de telefono local',
        id: 'localPhoneNumber',
        placeholder: '0212-1234567',
        required: true,
        type: 'text',
        autoComplete: 'localPhone',
    },
    {
        label: 'Número de telefono celular',
        id: 'cellPhoneNumber',
        placeholder: '0412-1234567',
        required: true,
        type: 'text',
        autoComplete: 'cellPhone',
    },
    {
        label: 'Correo electronico',
        id: 'email',
        placeholder: '',
        required: true,
        type: 'email',
        autoComplete: 'email',
    },
    {
        label: 'Año de ingreso en AVAA',
        id: 'avaaAdmissionYear',
        placeholder: '',
        required: true,
        type: 'date',
        autoComplete: 'avaaAdmissionYear',
    }
]

export default GENERAL_INFORMATION_INPUT_DATA;