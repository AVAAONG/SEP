'use client';
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
type Props = {
  children?: React.ReactNode;
};
const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  );
};

export default Providers;
