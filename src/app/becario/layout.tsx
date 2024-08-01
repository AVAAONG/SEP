import MainLayout from '@/components/scholar/MainLayout';
import NavigationBar from '@/components/scholar/NavigationBar';
import Sidebar from '@/components/scholar/Sidebar';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import { getBlobImage } from '@/lib/azure/azure';
import { prisma } from '@/lib/db/utils/prisma';
import { getServerSession } from 'next-auth';

export default async function RootLayout({
  children,
}: {
  modals: React.ReactNode;
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const image = await prisma.scholar.findUnique({
    where: {
      id: session?.scholarId,
    },
    select: {
      photo: true,
      program_information: {
        select: {
          is_chat_speaker: true,
          scholar_status: true,
        },


      },
    },
  });
  return (
    <>
      <div className="antialiased bg-white dark:bg-black">
        <NavigationBar
          image={await getBlobImage(image?.photo)}
          name={session?.user?.name}
          email={session?.user?.email}
          scholarStatus={image?.program_information?.scholar_status}
          scholarId={session?.scholarId}
        />
        <Sidebar isSpeaker={image?.program_information?.is_chat_speaker} />
        <MainLayout>{children}</MainLayout>
      </div>
    </>
  );
}
