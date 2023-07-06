import React from 'react'


const CVAInformation = () => {
    return (
        <form action="#">
            <div className="grid grid-cols-1 gap-6">
                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">¿Te encuentras actualmente estudiando en el CVA?</label>
                    <input type='text' name='address' id='career' placeholder='Ingenieria en sistemas' required />
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">¿En que modalidad te encuentras estudiando en el CVA?</label>
                    <input type='text' name='address' id='career' placeholder='Ingenieria en sistemas' required />
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Modulo en el que te encuentras</label>
                    <input type='text' name='address' id='career' placeholder='Ingenieria en sistemas' required />
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razon de no estar estudiando en el CVA</label>
                    <input type='text' name='state' id='career' placeholder='Ingenieria en sistemas' required />
                </div>

            </div>
        </form>
    )
}

export default CVAInformation