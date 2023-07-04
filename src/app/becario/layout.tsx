import PublicFooter from "@/components/footer/Public"
import Footer from "@/components/scholar/Footer"
import Navigation from "@/components/scholar/Navigation"
import NavigationBar from "@/components/scholar/NavigationBar"
import Sidebar from "@/components/scholar/Sidebar"
import TransitionC from "@/components/scholar/Transition"
import { Children } from "react"

export const metadata = {
    title: 'Proexcelencia',
    description: 'Sistema de Evaluacion del Becario',
    // icons: favicon.src,
}

export default async function RootLayout({
    children
}: {
    children: React.ReactNode,
}) {

    return (
        <div className="antialiased bg-gray-50 dark:bg-slate-950">
            <NavigationBar />
            <Sidebar/>
            <main className="p-4 md:ml-64 h-auto pt-16">
               {children}
            </main>
        </div>

    )
}