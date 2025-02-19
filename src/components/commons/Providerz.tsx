'use client';
import { SidebarProvider } from '@/hooks/use-sidebar';
import { HeroUIProvider } from '@heroui/react';
import { SessionProvider } from 'next-auth/react';
type Props = {
  children?: React.ReactNode;
};
const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <SidebarProvider>
        <HeroUIProvider>{children}</HeroUIProvider>
      </SidebarProvider>
    </SessionProvider>
  );
};

export default Providers;
