import { type } from 'os'
import React from 'react'

// label: 'Nombre Completo',
// id: 'first-name',
// placeholder: 'Javier Jose',
// required: true,
// type: 'text',
// value: '',
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
// user input types

type UserInputType = {
    label: string,
    id: string,
    placeholder: string,
    required: boolean,
    type: string,
    autoComplete: string,
    spellCheck?: boolean,
    tabIndex?: number,
}


const USER_INPUT_VALUES = [
    {
        label: 'Nombres',
        id: 'first-name',
        placeholder: 'Kevin José',
        required: true,
        type: 'text',
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
        autoComplete: 'family-name',
    },
    {
        label: 'Cédula de identidad',
        id: 'cedula',
        placeholder: 'V-12345678',
        required: true,
        type: 'text',
        autoComplete: 'cedula',
    },
    {
        label: 'Género',
        id: 'genre',
        placeholder: 'dd/mm/aaaa',
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
        id: 'localPhone',
        placeholder: '0212-1234567',
        required: true,
        type: 'text',
        autoComplete: 'localPhone',
    },
    {
        label: 'Número de telefono celular',
        id: 'cellPhone',
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
        id: 'avaaStartedDate',
        placeholder: '',
        required: true,
        type: 'date',
        autoComplete: 'avaaStartedDate',
    }
]

const GeneralInformation = () => {
    return (
        <form action="#">
            <div className="grid grid-cols-6 gap-6">
                {USER_INPUT_VALUES.map((input, index) => {
                    const { label, id, placeholder, required, type, } = input
                    return (
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
                            <input type={type} name={id} id={id} placeholder={placeholder} required={required} />
                        </div>
                    )
                })}
                <div className="col-span-6 sm:col-full">
                    <button className="text-white bg-[#008000] hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="submit">Guardar</button>
                </div>
            </div>
        </form>
    )
}

export default GeneralInformation