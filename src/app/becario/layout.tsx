import MainLayout from '@/components/scholar/MainLayout';
import NavigationBar from '@/components/scholar/NavigationBar';
import Sidebar from '@/components/scholar/Sidebar';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import { getServerSession } from 'next-auth';

export default async function RootLayout({
  children,
}: {
  modals: React.ReactNode;
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="antialiased bg-white dark:bg-black">
        <NavigationBar
          image={session?.user?.image}
          name={session?.user?.name}
          email={session?.user?.email}
        />
        <Sidebar />
        <MainLayout>{children}</MainLayout>
      </div>
    </>
  );
}
