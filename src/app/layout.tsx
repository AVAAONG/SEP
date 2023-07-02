import '@/app/globals.css'
import PublicFooter from '@/components/footer/Public';
import favicon from '@/../public/logo-proexcelencia-cap.png';
import NextAuthProvider from '../components/providers';

export const metadata = {
  title: 'Proexcelencia',
  description: 'Sistema de Evaluacion del Becario',
  icons: favicon.src,
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode,
}) {

  return (
    <html lang="es">
      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
        < PublicFooter />
      </body>
    </html>

  )
}