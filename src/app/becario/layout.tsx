import MainLayout from '@/components/scholar/MainLayout';
import NavigationBar from '@/components/scholar/NavigationBar';
import Sidebar from '@/components/scholar/Sidebar';
import { SidebarProvider } from '@/hooks/sidebar-context';
import { getServerSession } from '@/lib/auth/authOptions';

export default async function RootLayout({
  children,
}: {
  modals: React.ReactNode;
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session) return null;
  const { email, scholarStatus, isSpeaker } = session;
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="antialiased bg-white dark:bg-black">
        <NavigationBar email={email} scholarStatus={scholarStatus} />
        <Sidebar isSpeaker={isSpeaker} />
        <MainLayout>{children}</MainLayout>
      </div>
    </SidebarProvider>
  );
}
