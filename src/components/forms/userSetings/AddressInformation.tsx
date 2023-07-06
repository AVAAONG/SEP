import React from 'react'


const AddressInformation = () => {
    return (
        <form action="#">
            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Direccion de Residencia Actual</label>
                    <input type='text' name='address' id='career' placeholder='Ingenieria en sistemas' required />
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado de Orgigen</label>
                    <input type='text' name='state' id='career' placeholder='Ingenieria en sistemas' required />
                </div>

            </div>
        </form>
    )
}

export default AddressInformation