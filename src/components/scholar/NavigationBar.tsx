'use client'
import React, { useState } from 'react'
import Apps from './NavigationBar/Apps'
import ProfileDropdown from './ProfileDropdown'
import Image from 'next/image'
import ThemeToggleButton from './NavigationBar/ThemeToggleButton'

const NavigationBar = () => {
    const [isDropdownOpen, setDropdown] = useState(false);
    const toggleDropdown = () => setDropdown(!isDropdownOpen);


    return (
        <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-slate-900 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
            <div className="flex flex-wrap justify-between items-center">
                <div className="flex justify-start items-center">
                    {/* sidebar button */}
                    <button
                        onClick={toggleDropdown}
                        className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer  hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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

                    <a href="https://flowbite.com" className="flex items-center justify-between mr-4">
                        <Image
                            src="/proexcelencia.png"
                            alt="Logo Proexcelencia"
                            width={180}
                            height={50}
                        />
                    </a>

                </div>

                <div className="flex items-center lg:order-2">

                <ThemeToggleButton/>
                    <ProfileDropdown name='Kevin Bravo' email='bravokevinto@gmail.com' scholarId='adfadskfma;lds' image=''/>
                </div>
            </div>
        </nav>
    )
}

export default NavigationBar