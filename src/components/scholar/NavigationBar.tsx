'use client'
import React, { useState } from 'react'
import ProfileDropdown from './ProfileDropdown'
import Image from 'next/image'
import ThemeToggleButton from './NavigationBar/ThemeToggleButton'
import SolicitudeDropdown from './SolicitudeDropdown'

const NavigationBar = () => {
    const [isDropdownOpen, setDropdown] = useState(false);
    const toggleDropdown = () => setDropdown(!isDropdownOpen);



    return (
        <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-slate-900 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
            <div className="flex items-center justify-between md:ml-64 gap-4">
                <div className="flex justify-start items-center">
                    <button
                        onClick={toggleDropdown}
                        className="p-2 mr-2 text-green-600 rounded-lg cursor-pointer  hover:text-green-900 hover:bg-green-100 focus:bg-green-100 dark:focus:bg-green-700 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-700 dark:text-green-700 dark:hover:bg-green-700 dark:hover:text-emerald-950"
                    >
                        <svg
                            aria-hidden="true"
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                        <svg
                            aria-hidden="true"
                            className="hidden w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                        <span className="sr-only">Toggle sidebar</span>
                    </button>
                </div>
                <div className="flex gap-8 items-center justify-start">
                    <SolicitudeDropdown />
                    <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs md:text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                        <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Registra tus higlights
                        </span>
                    </button>
                    <ThemeToggleButton />
                    <ProfileDropdown name='Kevin Bravo' email='bravokevinto@gmail.com' scholarId='adfadskfma;lds' image='' />
                </div>
            </div>
        </nav>
    )
}

export default NavigationBar