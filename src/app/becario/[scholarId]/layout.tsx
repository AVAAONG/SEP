import ScholarFooter from "@/components/footer/ScholarFooter"
import NavigationBar from "@/components/scholar/NavigationBar"
import Sidebar from "@/components/scholar/Sidebar"
import authOptions from "@/lib/auth/nextAuthOptions/authOptions"
import { getServerSession } from "next-auth"

export default async function RootLayout({
    children
}: {
    children: React.ReactNode,
}) {
    const session = await getServerSession(authOptions)
    console.log(session)
    return (
        <>
            <div className="antialiased bg-gray-100 dark:bg-slate-800">
                <NavigationBar image={session?.user?.image} name={session?.user?.name}  email={session?.user?.email} />
                <Sidebar />
                <main className="p-4 md:ml-64 h-auto pt-16">
                    {children}
                    <ScholarFooter />
                </main>
            </div>
        </>
    )
}