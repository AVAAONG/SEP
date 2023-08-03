import { CalendarIcon, chatIcon, volunterIcon, workshopIcon, dashboardComponent } from '@/assets/svgs'
import React from 'react'
import DropdownButton from './DropdownButton'
import logo from '@/../public/proexcelencia-color.png'
import Link from 'next/link'
import Image from 'next/image'

const SCHOLAR_PREFIX = "becario"

export const SCHOLAR_SIDEBAR_ITEMS = [
    {
        Icon: dashboardComponent(),
        buttonName: "Panel general",
        itemList: [],
        link: `/${SCHOLAR_PREFIX}/dashboard`
    },
    {
        Icon: workshopIcon(),
        buttonName: "Actividades formativas",
        itemList: [
            { name: "Reporte de actividades", link: `/${SCHOLAR_PREFIX}/talleres/reporte` },
            { name: "Lista de talleres", link: `/${SCHOLAR_PREFIX}/talleres` },
        ],
        link: ""
    },
    {
        Icon: chatIcon(),
        buttonName: "Chats",
        itemList: [
            { name: "Lista de chats", link: `/${SCHOLAR_PREFIX}/chats` },
            { name: "Reporte de chats Clubs", link: `/${SCHOLAR_PREFIX}/chats/reporte` },
        ],
        link: ""
    },
    {
        Icon: volunterIcon(),
        buttonName: "Voluntariado",
        itemList: [
            { name: "Lista de voluntariado", link: `/${SCHOLAR_PREFIX}/voluntariado` },
            { name: "Reporte de horas de voluntariado", link: `/${SCHOLAR_PREFIX}/voluntariado/reporte` },
            { name: "Subir voluntariado externo", link: `/${SCHOLAR_PREFIX}/voluntariado/externo` },
        ],
        link: ""
    },
    {
        Icon: CalendarIcon(),
        buttonName: "Calendario de Actividades",
        itemList: [],
        link: `/${SCHOLAR_PREFIX}/calendario`
    }

]

const Sidebar = () => {
    return (
        <aside
            className="fixed top-0 left-0 z-40 w-64 h-screen pt-4 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-slate-900 dark:border-gray-700 "
            aria-label="Sidenav"
        >
            <div className='flex items-center mt-2 ml-6'>
                <Link href="/becario/dashboard" >
                    <Image src={logo} width={190} alt="Logo Proexcelencia" />
                </Link>
            </div>
            <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-slate-900 mt-4">
                <ul className="space-y-2">
                    {SCHOLAR_SIDEBAR_ITEMS.map((item, index) => (
                        <DropdownButton {...item} key={index} />
                    ))}
                </ul>
                <div className="p-4 mt-6 rounded-lg bg-emerald-100 dark:bg-emerald-900 dark:border-emerald-950 border-green-600" >
                    <div className="flex items-center mb-3">
                        <span className=" text-emerald-800 text-sm font-bold rounded  dark:text-emerald-200">¡Danos tu feedback!</span>
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