import React from 'react'

// label: 'Nombre Completo',
// id: 'first-name',
// placeholder: 'Javier Jose',
// required: true,
// type: 'text',
// value: '',
// name: 'first-name',
// autoComplete: 'given-name',
// className: 'col-span-6 sm:col-span-3',
// onChange: () => { },
// onBlur: () => { },
// onFocus: () => { },
// error: '',
// helpText: '',
// disabled: false,
// readOnly: false,
// autoFocus: false,
// maxLength: 50,
// minLength: 2,
// pattern: '',
// spellCheck: false,
// tabIndex: 0,
// inputMode: 'text',
// list: '',
// size: 0,

const USER_INPUT_VALUES = [
    {
        label: 'Nombres',
        id: 'first-name',
        placeholder: 'Kevin José',
        required: true,
        type: 'text',
        name: 'first-name',
        autoComplete: 'given-name',
        spellCheck: false,
        tabIndex: 0,
    },
    {
        label: 'Apellidos',
        id: 'last-name',
        placeholder: 'Bravo Mota',
        required: true,
        type: 'text',
        name: 'last-name',
        autoComplete: 'family-name',
    },
    {
        label: 'Cédula de identidad',
        id: 'cedula',
        placeholder: 'V-12345678',
        required: true,
        type: 'text',
        name: 'cedula',
        autoComplete: 'cedula',
    },
    {
        label: 'Sexo',
        id: 'genre',
        placeholder: 'dd/mm/aaaa',
        required: true,
        type: 'select',
        name: 'genre',
        autoComplete: 'genre',
    },
    {
        label: 'Fecha de nacimiento',
        id: 'birthDate',
        placeholder: 'dd/mm/aaaa',
        required: true,
        type: 'date',
        name: 'birthDate',
        autoComplete: 'birthDate',
    },
    {
        label: 'Número de telefono local',
        id: 'localPhone',
        placeholder: '0212-1234567',
        required: true,
        type: 'text',
        name: 'localPhone',
        autoComplete: 'localPhone',
    },
    {
        label: 'Número de telefono celular',
        id: 'cellPhone',
        placeholder: '0412-1234567',
        required: true,
        type: 'text',
        name: 'cellPhone',
        autoComplete: 'cellPhone',
    },
    {
        label: 'Correo electronico',
        id: 'email',
        placeholder: '',
        required: true,
        type: 'email',
        name: 'email',
        autoComplete: 'email',
    },
    {
        label: 'Año de ingreso en AVAA',
        id: 'avaaStartedDate',
        placeholder: '',
        required: true,
        type: 'avaaStartedDate',
        name: 'avaaStartedDate',
        autoComplete: 'avaaStartedDate',
    }
]

const GeneralInformation = () => {
    return (
        <form action="#">
            <div className="grid grid-cols-6 gap-6">
                {USER_INPUT_VALUES.map((input, index) => (
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{input.label}</label>
                        <input type="text" name="first-name" id="first-name" placeholder="Bonnie" required />
                    </div>
                ))}
            </div>
        </form>
    )
}

export default GeneralInformation