import Image from 'next/image'
import React from 'react'
import Apps from './NavigationBar/Apps'
import ProfileDropdown from './ProfileDropdown'




const NavigationBar = () => {
    return (
        <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
            <div className="flex flex-wrap justify-between items-center">
                <div className="flex justify-start items-center">
                    {/* sidebar button */}
                    <button
                        aria-controls="drawer-navigation"
                        className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
                            width={200}
                            height={50}
                        />
                    </a>

                    <form action="#" method="GET" className="hidden md:block md:pl-2">
                        <label htmlFor="topbar-search" className="sr-only">Buscar</label>
                        <div className="relative w-64 md:w-96">
                            <div
                                className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
                            >
                                <svg
                                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    ></path>
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="topbar-search"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Buscar"
                            />
                        </div>
                    </form>

                </div>

                <div className="flex items-center lg:order-2">

                    {/* search button on mobile */}
                    <button
                        type="button"
                        data-drawer-toggle="drawer-navigation"
                        aria-controls="drawer-navigation"
                        className="p-2 mr-1 text-gray-500 rounded-lg md:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    >
                        <span className="sr-only">Toggle search</span>
                        <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
                        </svg>
                    </button>

                    {/* notifications */}
                    {/* <div
                        className="hidden overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white  divide-y divide-gray-100 shadow-lg dark:divide-gray-600 dark:bg-gray-700 rounded-xl"
                        id="notification-dropdown"
                    >
                        <div
                            className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300"
                        >
                            Notifications
                        </div>
                        <div>
                            <a
                                href="#"
                                className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                            >
                                <div className="flex-shrink-0">
                                    <img
                                        className="w-11 h-11 rounded-full"
                                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                                        alt="Bonnie Green avatar"
                                    />
                                    <div
                                        className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-primary-700 dark:border-gray-700"
                                    >
                                        <svg
                                            aria-hidden="true"
                                            className="w-3 h-3 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"
                                            ></path>
                                            <path
                                                d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="pl-3 w-full">
                                    <div
                                        className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"
                                    >
                                        New message from
                                        <span className="font-semibold text-gray-900 dark:text-white"
                                        >Bonnie Green</span
                                        >: "Hey, what's up? All set for the presentation?"
                                    </div>
                                    <div
                                        className="text-xs font-medium text-primary-600 dark:text-primary-500"
                                    >
                                        a few moments ago
                                    </div>
                                </div>
                            </a>
                            <a
                                href="#"
                                className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                            >
                                <div className="flex-shrink-0">
                                    <img
                                        className="w-11 h-11 rounded-full"
                                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                                        alt="Jese Leos avatar"
                                    />
                                    <div
                                        className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-gray-900 rounded-full border border-white dark:border-gray-700"
                                    >
                                        <svg
                                            aria-hidden="true"
                                            className="w-3 h-3 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="pl-3 w-full">
                                    <div
                                        className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"
                                    >
                                        <span className="font-semibold text-gray-900 dark:text-white"
                                        >Jese leos</span
                                        >
                                        and
                                        <span className="font-medium text-gray-900 dark:text-white"
                                        >5 others</span
                                        >
                                        started following you.
                                    </div>
                                    <div
                                        className="text-xs font-medium text-primary-600 dark:text-primary-500"
                                    >
                                        10 minutes ago
                                    </div>
                                </div>
                            </a>
                            <a
                                href="#"
                                className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                            >
                                <div className="flex-shrink-0">
                                    <img
                                        className="w-11 h-11 rounded-full"
                                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
                                        alt="Joseph McFall avatar"
                                    />
                                    <div
                                        className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-red-600 rounded-full border border-white dark:border-gray-700"
                                    >
                                        <svg
                                            aria-hidden="true"
                                            className="w-3 h-3 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="pl-3 w-full">
                                    <div
                                        className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"
                                    >
                                        <span className="font-semibold text-gray-900 dark:text-white"
                                        >Joseph Mcfall</span
                                        >
                                        and
                                        <span className="font-medium text-gray-900 dark:text-white"
                                        >141 others</span
                                        >
                                        love your story. See it and view more stories.
                                    </div>
                                    <div
                                        className="text-xs font-medium text-primary-600 dark:text-primary-500"
                                    >
                                        44 minutes ago
                                    </div>
                                </div>
                            </a>
                            <a
                                href="#"
                                className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                            >
                                <div className="flex-shrink-0">
                                    <img
                                        className="w-11 h-11 rounded-full"
                                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
                                        alt="Roberta Casas image"
                                    />
                                    <div
                                        className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-green-400 rounded-full border border-white dark:border-gray-700"
                                    >
                                        <svg
                                            aria-hidden="true"
                                            className="w-3 h-3 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="pl-3 w-full">
                                    <div
                                        className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"
                                    >
                                        <span className="font-semibold text-gray-900 dark:text-white"
                                        >Leslie Livingston</span
                                        >
                                        mentioned you in a comment:
                                        <span
                                            className="font-medium text-primary-600 dark:text-primary-500"
                                        >@bonnie.green</span
                                        >
                                        what do you say?
                                    </div>
                                    <div
                                        className="text-xs font-medium text-primary-600 dark:text-primary-500"
                                    >
                                        1 hour ago
                                    </div>
                                </div>
                            </a>
                            <a
                                href="#"
                                className="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                                <div className="flex-shrink-0">
                                    <img
                                        className="w-11 h-11 rounded-full"
                                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/robert-brown.png"
                                        alt="Robert image"
                                    />
                                    <div
                                        className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-purple-500 rounded-full border border-white dark:border-gray-700"
                                    >
                                        <svg
                                            aria-hidden="true"
                                            className="w-3 h-3 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="pl-3 w-full">
                                    <div
                                        className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"
                                    >
                                        <span className="font-semibold text-gray-900 dark:text-white"
                                        >Robert Brown</span
                                        >
                                        posted a new video: Glassmorphism - learn how to implement
                                        the new design trend.
                                    </div>
                                    <div
                                        className="text-xs font-medium text-primary-600 dark:text-primary-500"
                                    >
                                        3 hours ago
                                    </div>
                                </div>
                            </a>
                        </div>
                        <a
                            href="#"
                            className="block py-2 text-md font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-600 dark:text-white dark:hover:underline"
                        >
                            <div className="inline-flex items-center">
                                <svg
                                    aria-hidden="true"
                                    className="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                    <path
                                        fill-rule="evenodd"
                                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                                View all
                            </div>
                        </a>
                    </div> */}

                    <button
                        type="button"
                        data-dropdown-toggle="apps-dropdown"
                        className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    >
                        <span className="sr-only">View notifications</span>

                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                            ></path>
                        </svg>
                    </button>
                    <button id="theme-toggle" data-tooltip-target="tooltip-toggle" type="button"
                        className="p-2 mr-1 text-gray-500 rounded-lg md:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"

                    >
                        <svg id="theme-toggle-dark-icon" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                        <svg id="theme-toggle-light-icon" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                    </button>

                    <div
                        className="hidden overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white  divide-y divide-gray-100 shadow-lg dark:bg-gray-700 dark:divide-gray-600 rounded-xl"
                        id="apps-dropdown"
                    >
                        <div
                            className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300"
                        >
                            Apps
                        </div>
                        <Apps />
                    </div>
                    <button
                        type="button"
                        className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        id="user-menu-button"
                        aria-expanded="false"
                        data-dropdown-toggle="dropdown"
                    >
                        <span className="sr-only">Open user menu</span>
                        <img
                            className="w-8 h-8 rounded-full"
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                            alt="user photo"
                        />
                    </button>
                    <ProfileDropdown  />
                </div>
            </div>
        </nav>
    )
}

export default NavigationBar