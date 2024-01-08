import Link from "next/link"
import React, { ReactNode } from "react"

interface StatsCardsProps {
    icon: ReactNode
    title: string
    stat: string
    subtitle: string
}

const StatsCards: React.FC<StatsCardsProps> = ({ icon, title, stat, subtitle }) => {
    return (
        <div className="w-full relative bg-white dark:bg-black pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
            <dt>
                <div className="absolute bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-md p-3">
                    <div className="w-6 h-6 text-white">{icon}</div>
                </div>
                <p className="ml-16 font-medium text-yellow-500 truncate">{title}</p>
            </dt>
            <dd className="ml-16 pb-3  flex items-baseline  ">
                <p className="text-3xl font-semibold ">{stat}</p>
                <div className="absolute bottom-0 inset-x-0 bg-yellow-50 dark:bg-black px-4 py-3">
                    <Link
                        href="becarios"
                        className="font-medium text-sm text-yellow-600 hover:text-yellow-500"
                    >
                        {subtitle}
                    </Link>
                </div>
            </dd>
        </div>
    )
}

export default StatsCards