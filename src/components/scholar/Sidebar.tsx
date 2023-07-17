import { CalendarIcon, chatIcon, volunterIcon, workshopIcon } from '@/assets/svgs'
import React from 'react'
import DropdownButton from './DropdownButton'
import logo from '@/../public/proexcelencia.png'
import Link from 'next/link'
import Image from 'next/image'

export const SCHOLAR_SIDEBAR_ITEMS = [
    {
        Icon: workshopIcon(),
        buttonName: "Actividades formativas",
        itemList: [
            { name: "Reporte de actividades", link: "/" },
            { name: "Lista de talleres", link: "/talleres" },
        ],
        link: ""
    },
    {
        Icon: chatIcon(),
        buttonName: "Chats",
        itemList: [
            { name: "Lista de chats", link: "" },
            { name: "Reporte de chats Clubs", link: "" },
        ],
        link: ""
    },
    {
        Icon: volunterIcon(),
        buttonName: "Voluntariado",
        itemList: [
            { name: "Lista de voluntariado", link: "" },
            { name: "Reporte de horas de voluntariado", link: "" },
            { name: "Subir voluntariado externo", link: "" },
        ],
        link: ""
    },
    {
        Icon: CalendarIcon(),
        buttonName: "Calendario de Actividades",
        itemList: [],
        link: "/becario/cljwyi8hl0008uwmkjo6dktty/calendar"
    }

]

const Sidebar = () => {
    return (
        <aside
            className="fixed top-0 left-0 z-50 w-64 h-screen pt-4 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-slate-900 dark:border-gray-700 "
            aria-label="Sidenav"
        >
            <div className='flex items-center mt-2 ml-6'>
                <Link href="/becario/dashboard" >
                    <Image src={logo} width={180} alt="Logo Proexcelencia" />
                </Link>
            </div>
            <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-slate-900">
                <ul className="space-y-2">
                    {SCHOLAR_SIDEBAR_ITEMS.map((item, index) => (
                        <DropdownButton {...item} key={index} />
                    ))}
                </ul>
                <div className="p-4 mt-6 rounded-lg bg-emerald-100 dark:bg-emerald-900 dark:border-emerald-950 border-green-600" >
                    <div className="flex items-center mb-3">
                        <span className=" text-emerald-800 text-sm font-bold rounded  dark:text-emerald-200">¡Danos tu feedback!</span>
                        {/* <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-green-50 inline-flex justify-center items-center w-6 h-6 text-green-900 rounded-lg focus:ring-2 focus:ring-green-400 p-1 hover:bg-green-200  dark:bg-green-900 dark:text-green-400 dark:hover:bg-green-800" data-dismiss-target="#dropdown-cta" aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button> */}
                    </div>
                    <p className="mb-3 text-xs text-green-800 dark:text-green-400">
                        El SEP actualmente sigue en proceso de desarrolo, seria genial para nosotros escuchar tus comentarios con respecto a mejoras, cambios o nuevas funcionalidades que te gustaria ver en el sistema.
                    </p>
                    <a className="bg-orange-100 text-red-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-90" href="#">Dejar feedback</a>
                </div>
            </div>


        </aside >
    )
}

export default Sidebar