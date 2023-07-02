import GeneralInformation from '@/components/forms/userSetings/GeneralInformation'
import Mentoring from '@/components/forms/userSetings/Mentoring'
import ProfilePic from '@/components/forms/userSetings/ProfilePic'
import SocialMedia from '@/components/forms/userSetings/SocialMedia'
import UniversityInformation from '@/components/forms/userSetings/UniversityInformation'
import React from 'react'

const page = () => {
    return (
        <div>
            <div className="bg-white grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-black">
                <div className="mb-4 col-span-full xl:mb-2">
                    <nav className="flex mb-5" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
                            <li className="inline-flex items-center">
                                <a href="#" className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white">
                                    <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                    Home
                                </a>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    <a href="#" className="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white">Users</a>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    <span className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500" aria-current="page">Settings</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Configuracion de usuario</h1>
                </div>

                <div className="col-span-full xl:col-auto">
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-green-950 sm:p-6 dark:bg-slate-900">
                        <ProfilePic image={null} />
                    </div>
                    {/* <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                        <h3 className="mb-4 text-xl font-semibold dark:text-white">Language & Time</h3>
                        <div className="mb-4">
                            <label htmlFor="settings-language" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select language</label>
                            <select id="settings-language" name="countries" className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option>English (US)</option>
                                <option>Italiano</option>
                                <option>Français (France)</option>
                                <option>正體字</option>
                                <option>Español (España)</option>
                                <option>Deutsch</option>
                                <option>Português (Brasil)</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="settings-timezone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time Zone</label>
                            <select id="settings-timezone" name="countries" className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option>GMT+0 Greenwich Mean Time (GMT)</option>
                                <option>GMT+1 Central European Time (CET)</option>
                                <option>GMT+2 Eastern European Time (EET)</option>
                                <option>GMT+3 Moscow Time (MSK)</option>
                                <option>GMT+5 Pakistan Standard Time (PKT)</option>
                                <option>GMT+8 China Standard Time (CST)</option>
                                <option>GMT+10 Eastern Australia Standard Time (AEST)</option>
                            </select>
                        </div>
                        <div>
                            <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save all</button>
                        </div>
                    </div> */}
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                        <SocialMedia />
                    </div>
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                        <div className="flow-root">
                            <h3 className="text-xl font-semibold dark:text-white">Other accounts</h3>
                            <ul className="mb-6 divide-y divide-gray-200 dark:divide-gray-700">
                                <li className="py-4">
                                    <div className="flex justify-between xl:block 2xl:flex align-center 2xl:space-x-4">
                                        <div className="flex space-x-4 xl:mb-4 2xl:mb-0">
                                            <div>
                                                <img className="w-6 h-6 rounded-full" src="/images/users/bonnie-green.png" alt="Bonnie image" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-base font-semibold text-gray-900 leading-none truncate mb-0.5 dark:text-white">
                                                    Bonnie Green
                                                </p>
                                                <p className="mb-1 text-sm font-normal truncate text-primary-700 dark:text-primary-500">
                                                    New York, USA
                                                </p>
                                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                                    Last seen: 1 min ago
                                                </p>
                                            </div>
                                        </div>
                                        <div className="inline-flex items-center w-auto xl:w-full 2xl:w-auto">
                                            <a href="#" className="w-full px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Disconnect</a>
                                        </div>
                                    </div>
                                </li>
                                <li className="py-4">
                                    <div className="flex justify-between xl:block 2xl:flex align-center 2xl:space-x-4">
                                        <div className="flex space-x-4 xl:mb-4 2xl:mb-0">
                                            <div>
                                                <img className="w-6 h-6 rounded-full" src="/images/users/jese-leos.png" alt="Jese image" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-base font-semibold text-gray-900 leading-none truncate mb-0.5 dark:text-white">
                                                    Jese Leos
                                                </p>
                                                <p className="mb-1 text-sm font-normal truncate text-primary-700 dark:text-primary-500">
                                                    California, USA
                                                </p>
                                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                                    Last seen: 2 min ago
                                                </p>
                                            </div>
                                        </div>
                                        <div className="inline-flex items-center w-auto xl:w-full 2xl:w-auto">
                                            <a href="#" className="w-full px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Disconnect</a>
                                        </div>
                                    </div>
                                </li>
                                <li className="py-4">
                                    <div className="flex justify-between xl:block 2xl:flex align-center 2xl:space-x-4">
                                        <div className="flex space-x-4 xl:mb-4 2xl:mb-0">
                                            <div>
                                                <img className="w-6 h-6 rounded-full" src="/images/users/thomas-lean.png" alt="Thomas image" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-base font-semibold text-gray-900 leading-none truncate mb-0.5 dark:text-white">
                                                    Thomas Lean
                                                </p>
                                                <p className="mb-1 text-sm font-normal truncate text-primary-700 dark:text-primary-500">
                                                    Texas, USA
                                                </p>
                                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                                    Last seen: 1 hour ago
                                                </p>
                                            </div>
                                        </div>
                                        <div className="inline-flex items-center w-auto xl:w-full 2xl:w-auto">
                                            <a href="#" className="w-full px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Disconnect</a>
                                        </div>
                                    </div>
                                </li>
                                <li className="pt-4">
                                    <div className="flex justify-between xl:block 2xl:flex align-center 2xl:space-x-4">
                                        <div className="flex space-x-4 xl:mb-4 2xl:mb-0">
                                            <div>
                                                <img className="w-6 h-6 rounded-full" src="/images/users/lana-byrd.png" alt="Lana image" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-base font-semibold text-gray-900 leading-none truncate mb-0.5 dark:text-white">
                                                    Lana Byrd
                                                </p>
                                                <p className="mb-1 text-sm font-normal truncate text-primary-700 dark:text-primary-500">
                                                    Texas, USA
                                                </p>
                                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                                    Last seen: 1 hour ago
                                                </p>
                                            </div>
                                        </div>
                                        <div className="inline-flex items-center w-auto xl:w-full 2xl:w-auto">
                                            <a href="#" className="w-full px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Disconnect</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div>
                                <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save all</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-green-950 sm:p-6 dark:bg-slate-900">
                        <h3 className="mb-4 text-xl font-semibold dark:text-white">Información General</h3>
                        <GeneralInformation />
                    </div>
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-green-950 sm:p-6 dark:bg-slate-900">
                        <h3 className="mb-4 text-xl font-semibold dark:text-white">Informacion de universidad</h3>
                        <UniversityInformation />
                    </div>
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                        <h3 className="mb-4 text-xl font-semibold dark:text-white">Cambio de contraseña</h3>
                    </div>
                    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                        <Mentoring avaaYear={2} image={'adsfa'} />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default page