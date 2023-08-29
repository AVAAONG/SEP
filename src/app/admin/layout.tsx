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
    <main className="flex bg-gradient-to-b from-green-600 to-gray-500 dark:from-emerald-950 dark:to-slate-950">
      <Sidebar />
      <section className="flex flex-col z-10 rounded-2xl bg-gray-100 dark:bg-slate-950 p-4 m-3 min-h-screen w-screen">
        <Navbar />
        <NextAuthProvider>{children}</NextAuthProvider>
      </section>
    </main>
  );
}
