import React from 'react'


const VolunteeringInformation = () => {
    return (
        <form action="#">
            <div className="grid grid-cols-1 gap-6">
                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">¿Realizas Voluntariado en otra organizacion aparte de AVAA?</label>
                    <select id="collage" name="collages" className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required>
                        <option value="VIRTUAL">Si</option>
                        <option value="HIBRIDA">No</option>
                    </select>
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de la organizacion</label>
                    <input type='text' name='state' id='career' placeholder='Ingenieria en sistemas' required />
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Actividades que has realizado</label>
                    <input type='text' name='state' id='career' placeholder='Ingenieria en sistemas' required />
                </div>

            </div>
        </form>
    )
}

export default VolunteeringInformation