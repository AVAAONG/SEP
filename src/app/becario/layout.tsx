import MainLayout from '@/components/scholar/MainLayout';
import NavigationBar from '@/components/scholar/NavigationBar';
import Sidebar from '@/components/scholar/Sidebar';
import { getServerSession } from '@/lib/auth/authOptions';

export default async function RootLayout({
  children,
}: {
  modals: React.ReactNode;
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session) return null;
  const { image, name, email, scholarStatus, id, isSpeaker } = session;
  return (
    <>
      <div className="antialiased bg-white dark:bg-black">
        <NavigationBar
          image={image}
          name={name}
          email={email}
          scholarStatus={scholarStatus}
          scholarId={id}
        />
        <Sidebar isSpeaker={isSpeaker} />
        <MainLayout>{children}</MainLayout>
      </div>
    </>
  );
}
