/**
 * @file This file renders the root layout of the entire application.
 * @remarks All pages in the application are rendered within this layout. So any change in the style of this layout will affect all pages in the application.
 * @author Kevin Bravo (kevinbravo.me)
 * @see {@link https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#layouts} for more information about Next.js layouts.
 */

import '@/app/globals.css'
import favicon from '@/../public/logo-proexcelencia-cap.png';
import NextAuthProvider from '../components/providers';
import { ThemeProviderC } from '@/components/ThemeProvider';

export const metadata = {
  title: 'Proexcelencia',
  description: 'Sistema de Evaluacion del Becario',
  icons: favicon.src,
}

/**
 * Renders the root layout of the application.
 * @param children - The children components to render.
 * @see {@link https://react.dev/reference/react/Children} for more information about the React.Children utility.
 * @returns The HTML document with the rendered children components.
 */

export default async function RootLayout({
  children
}: {
  children: React.ReactNode,
}) {

  return (
    <html lang="es" className='h-full'>
      <body className='h-full'>
        <NextAuthProvider>
          <ThemeProviderC >
            {children}
          </ThemeProviderC >
        </NextAuthProvider>
      </body>
    </html>
  )
}