import MainLayout from "@/components/scholar/MainLayout"
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
    return (
        <>
            <div className="antialiased bg-gray-100 dark:bg-slate-800">
                <NavigationBar image={session?.user?.image} name={session?.user?.name} email={session?.user?.email} />
                <Sidebar />
                <MainLayout>
                    {children}
                </MainLayout>
            </div>
        </>
    )
}