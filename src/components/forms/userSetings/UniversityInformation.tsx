import React from 'react'

const UNIVERSITY_OPTIONS = [
    {
        value: "UCV",
        name: "Universidad Central de Venezuela"
    },
    {
        value: "USB",
        name: "Universidad Simon Bolivar"
    },
    {
        value: "UCAB",
        name: "Universidad Catolica Andres Bello"
    },
    {
        value: "ENAHP",
        name: "Escuela Nacional de Administracion y Hacienda Publica"
    },
    {
        value: "UNIMET",
        name: "Universidad Metropolitana"
    },
    {
        value: "UCSAR",
        name: "Universidad Catolica Santa Rosa"
    },
    {
        value: "UNE",
        name: "Universidad Nueva Esparta"
    },
    {
        value: "IUTFRP",
        name: "Instituto Universitario de Tecnología \"Dr. Federico Rivero Palacio"
    },
    {
        value: "UNEXPO",
        name: "Universidad Nacional Experimental Politecnica"
    },
    {
        value: "USM",
        name: "Universidad Santa Maria"
    },
    {
        value: "UNEARTE",
        name: "Universidad Nacional Experimental de las Artes"
    },
    {
        value: "UNESR",
        name: "Universidad Nacional Experimental Simón Rodríguez"
    },
    {
        value: "UNEFA",
        name: "Universidad Experimental Félix Adán"
    }
]


const UniversityInformation = () => {
    return (
        <form action="#">
            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="collage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Universidad</label>
                    <select id="collage" name="collages" className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required>
                        {UNIVERSITY_OPTIONS.map(({ name, value }) => (
                            <option value={value}>{name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="collage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Carrera</label>
                    <input type='text' name='career' id='career' placeholder='Ingenieria en sistemas' required />
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="collage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Modalidad de clases</label>
                    <select id="collage" name="collages" className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required>
                        <option value="PRESENCIAL">Presencial</option>
                        <option value="VIRTUAL">Virtual</option>
                        <option value="HIBRIDA">Hibrida</option>
                    </select>
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="collage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Promedio universitario</label>
                    <input type='number' name='career' id='career' placeholder='' required />
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="collage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de periodo academico academico</label>
                    <select id="academicPeriodType" name="academicPeriodType" className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required>
                        <option value="SEMESTRE">Semestral</option>
                        <option value="TRIMESTRE">Trimestral</option>
                        <option value="AÑO">Anual</option>
                    </select>
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="collage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Periodo academico actual</label>
                    <input type='text' name='career' id='career' placeholder='' required />
                </div>
                <div className="col-span-6 sm:col-full">
                    <button className="text-white bg-[#008000] hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="submit">Save all</button>
                </div>
            </div>
        </form>
    )
}

export default UniversityInformation