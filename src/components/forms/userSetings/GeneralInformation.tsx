"use client";
import { BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";

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

interface GeneralInformationProps {
    scholarGeneralInfo: {
        firstNames: string,
        lastNames: string,
        dni: string,
        gender: string,
        birthDate: string,
        cellPhoneNumber: string,
        avaaAdmissionYear: string,
        localPhoneNumber: string,
        email: string,
    },
    id: string;
}



const GeneralInformation = ({ scholarGeneralInfo, id }: GeneralInformationProps) => {
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            ...scholarGeneralInfo
        }
    });

    const saveData = async (data: any, event: BaseSyntheticEvent) => {
        // event.preventDefault();
        // data.birthDate = new Date(data.birthDate)
        // data.avaaAdmissionYear = new Date(data.avaaAdmissionYear)
        // await fetch(`/becario/api/scholar`, {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({data, id})
        // })
        console.log(data)

    }

    return (
        <form action="#">
            <div className="grid grid-cols-6 gap-6">
                {USER_INPUT_VALUES.map((input, index) => {
                    const { label, id, placeholder, required, type, } = input
                    return (
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
                            <input type={type} placeholder={placeholder} required={required} {...register(id)} />
                        </div>
                    )
                })}
                <div className="col-span-6 sm:col-full">
                    <button
                        onClick={handleSubmit((data, event) => saveData(data, event))}
                        className="text-white bg-[#008000] hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="submit">Guardar</button>
                </div>
            </div>
        </form>
    )
}

export default GeneralInformation