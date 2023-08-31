import '@/app/globals.css';
//@ts-ignore
import favicon from '@/../public/logo-proexcelencia-cap.png';
import Navbar from '@/components/admin/navigation/navbar/Navbar';
import NextAuthProvider from '@/components/providers';

import Sidebar from '@/components/admin/navigation/sidebar/Sidebar';
export const metadata = {
  title: 'Proexcelencia',
  description: 'Sistema de Evaluacion del Becario',
  icons: favicon.src,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="antialiased flex bg-gradient-to-b from-[#238442] to-[#438f5c] dark:from-emerald-950 dark:to-slate-950 w-full">
      <Sidebar />
      <section className="flex flex-col z-10 md:rounded-2xl bg-gray-50 dark:bg-slate-950 p-4 md:m-3 min-h-screen w-full">
        <Navbar />
        <NextAuthProvider>{children}</NextAuthProvider>
      </section>
    </main>
  );
}
