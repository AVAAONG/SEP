'use client';
import { SidebarProvider } from '@/hooks/sidebar-context';
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
type Props = {
  children?: React.ReactNode;
};
const Providers = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <SessionProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </SessionProvider>
    </SidebarProvider>
  );
};

export default Providers;
