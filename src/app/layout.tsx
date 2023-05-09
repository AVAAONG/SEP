import '@/app/globals.css'
import { NextAuthProvider } from "./providers";
import PublicFooter from '@/components/footer/Public';
import favicon from '@/../public/logo-proexcelencia-cap.png';
import { SessionProvider } from 'next-auth/react';

export const metadata = {
  title: 'Proexcelencia',
  description: 'Sistema de Evaluacion del Becario',
  icons: favicon.src,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
