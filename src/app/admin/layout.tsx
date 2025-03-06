import '@/app/admin/admin.css';
import Navbar from '@/components/admin/navigation/navbar/Navbar';
import Providers from '@/components/commons/Providerz';

import Sidebar from '@/components/admin/navigation/sidebar/Sidebar';
export const metadata = {
  title: 'Administración | Panel general',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-[#137832] dark:bg-[#083A17] antialiased flex md:p-2 max-w-screen box-border ">
      <Sidebar />
      <section className="min-w-0 min-h-screen md:rounded-md bg-[#f4fbf7] dark:bg-[#040b07]  p-2">
        <Navbar />
        <Providers>{children}</Providers>
      </section>
    </main>
  );
}
