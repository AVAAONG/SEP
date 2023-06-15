import '@/app/globals.css'
//@ts-ignore
import favicon from '@/../public/logo-proexcelencia-cap.png';
import Sidebar from '@/components/navigation/sideBar/Sidebar';
import Navbar from '@/components/navigation/navbar/Navbar';
import NextAuthProvider from '@/components/providers';

export const metadata = {
  title: 'Proexcelencia',
  description: 'Sistema de Evaluacion del Becario',
  icons: favicon.src,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <main className='flex bg-gradient-to-b from-emerald-950 to-slate-950'>
          <Sidebar />
          <section className='flex flex-col z-10 rounded-2xl  bg-slate-950 p-4 m-3 min-h-screen w-screen'>
            <Navbar />
            <NextAuthProvider>{children}</NextAuthProvider>
          </section>
        </main>
      </body>
    </html>
  )
}
