'use client'
import React, { useState } from 'react'
import SolicitudeModal from './SolicitudeModal';

const SolicitudeDropdown = () => {
    const [isDropdownOpen, setDrowpdown] = useState(false);
    const toggleDropdown = () => setDrowpdown(!isDropdownOpen);

    return (
        <>
        <div className=''>
            <button
                onClick={toggleDropdown}
                className="flex items-center justify-between w-full py-2 pl-3 pr-4  text-emerald-700 rounded hover:bg-green-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 md:w-auto dark:text-emerald-700 dark:hover:text-emerald-500 dark:focus:text-green-500 dark:border-green-700 dark:hover:bg-green-700 md:dark:hover:bg-transparent ">
                Solicitudes
                <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>
            <div className={`${isDropdownOpen ? "absolute translate-y-5 -translate-x-9" : "hidden"} z-auto font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-slate-900 dark:divide-gray-600`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-emerald-100 dark:hover:bg-emerald-700 dark:hover:text-white">Carta de ingreso CVA</a>
                    </li>
                    <li>
                        {/* <a href="#" className="block px-4 py-2 hover:bg-emerald-100 dark:hover:bg-emerald-700 dark:hover:text-white">Constancia de becario</a> */}
                    </li>
                </ul>
            </div>
        </div>
        {/* <SolicitudeModal></SolicitudeModal> */}
        </>

    )
}

export default SolicitudeDropdown