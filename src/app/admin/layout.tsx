import '@/app/globals.css';
//@ts-ignore
import favicon from '@/../public/logo-proexcelencia-cap.png';
import Navbar from '@/components/admin/navigation/navbar/Navbar';
import Providers from '@/components/commons/Providerz';

import Sidebar from '@/components/admin/navigation/sidebar/Sidebar';
import ChapterSelector from '@/components/chapterSelection/ChapterSelector';
export const metadata = {
  title: 'Proexcelencia',
  description: 'Sistema de Evaluacion del Becario',
  icons: favicon.src,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-primary-light dark:bg-secondary-dark antialiased flex transition-all max-w-screen box-border md:pe-2 md:py-2">
      <Sidebar />
      <section className=" min-w-0 flex flex-col z-10 md:rounded-lg bg-light dark:bg-dark p-2 transition-all w-full">
        <Navbar >
          <ChapterSelector />
        </Navbar>
        <Providers>{children}</Providers>
      </section>
    </main>
  );
}
