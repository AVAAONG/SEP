'use client';
import { SidebarProvider } from '@/hooks/sidebar-context';
import { NextUIProvider } from '@nextui-org/react';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

type ProvidersProps = {
  children?: React.ReactNode;
  session?: Session | null;
};

const Providers = ({ children, session }: ProvidersProps) => {
  return (
    <SidebarProvider>
      <SessionProvider session={session}>
        <NextUIProvider>{children}</NextUIProvider>
      </SessionProvider>
    </SidebarProvider>
  );
};

export default Providers;
