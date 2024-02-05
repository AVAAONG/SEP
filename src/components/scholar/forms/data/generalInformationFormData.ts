import scholarInfoSchema from "@/lib/schemas/scholar/GeneralInformation";

type GeneralInformationInputData = {
  label: string;
  id: keyof typeof scholarInfoSchema.shape
  placeholder: string;
  required?: boolean;
  type: string;
  autoComplete: string;
  spellCheck?: boolean;
  tabIndex?: number;
};

const GENERAL_INFORMATION_INPUT_DATA: GeneralInformationInputData[] = [
  {
    label: 'Nombres',
    id: 'first_names',
    placeholder: 'Kevin José',
    required: true,
    type: 'text',
    autoComplete: 'given-name',
    spellCheck: false,
    tabIndex: 0,
  },
  {
    label: 'Apellidos',
    id: 'last_names',
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
    label: 'Fecha de nacimiento',
    id: 'birthdate',
    placeholder: '2222-444-44',
    required: true,
    type: 'date',
    autoComplete: 'birthDate',
  },
  {
    label: 'Número de telefono local',
    id: 'local_phone_number',
    placeholder: '0212-1234567',
    required: true,
    type: 'text',
    autoComplete: 'localPhone',
  },
  {
    label: 'Número de telefono celular',
    id: 'cell_phone_Number',
    placeholder: '0412-1234567',
    required: true,
    type: 'text',
    autoComplete: 'cellPhone',
  },
  {
    label: 'Número de telefono whatsapp',
    id: 'whatsapp_phone_number',
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
];

export default GENERAL_INFORMATION_INPUT_DATA;
