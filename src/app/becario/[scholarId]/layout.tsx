import ScholarFooter from "@/components/footer/ScholarFooter"
import NavigationBar from "@/components/scholar/NavigationBar"
import Sidebar from "@/components/scholar/Sidebar"
import SolicitudeModal from "@/components/scholar/SolicitudeModal"

export default async function RootLayout({
    children
}: {
    children: React.ReactNode,
}) {

    return (
        <>
            <div className="antialiased bg-gray-100 dark:bg-slate-800">
                <NavigationBar />
                <Sidebar />
                <main className="p-4 md:ml-64 h-auto pt-16">
                    {children}
                    <ScholarFooter />
                </main>
            </div>
        </>
    )
}