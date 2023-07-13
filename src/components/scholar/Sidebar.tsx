import { CalendarIcon, chatIcon, volunterIcon, workshopIcon } from '@/assets/svgs'
import React from 'react'
import DropdownButton from './DropdownButton'


export const SCHOLAR_SIDEBAR_ITEMS = [
    {
        Icon: workshopIcon(),
        buttonName: "Talleres",
        itemList: [
            { name: "Talleres segun el año", link: "" },
            { name: "Talleres por competencia", link: "" },
            { name: "Lista de talleres", link: "" },
        ],
        link: ""
    },
    {
        Icon: chatIcon(),
        buttonName: "Chats",
        itemList: [],
        link: ""
    },
    {
        Icon: volunterIcon(),
        buttonName: "Voluntariado",
        itemList: [],
        link: ""
    },
    {
        Icon: CalendarIcon(),
        buttonName: "Calendario de Actividades",
        itemList: [],
        link: ""
    }

]

const Sidebar = () => {
    return (
        <aside
            className="fixed top-0 left-0 z-50 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-slate-900 dark:border-gray-700 "
            aria-label="Sidenav"
            id="drawer-navigation"
        >
            <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-slate-900">
                <ul className="space-y-2">
                    {SCHOLAR_SIDEBAR_ITEMS.map((item, index) => (
                        <DropdownButton {...item} key={index} />
                    ))}
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar