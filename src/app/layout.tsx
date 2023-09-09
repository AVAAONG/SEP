/**
 * @file This file renders the root layout of the entire application.
 * @remarks All pages in the application are rendered within this layout. So any change in the style of this layout will affect all pages in the application.
 * @author Kevin Bravo (kevinbravo.me)
 * @see {@link https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#layouts} for more information about Next.js layouts.
 */

import favicon from '@/../public/logo-proexcelencia-cap.png';
import '@/app/globals.css';
import { ThemeProviderC } from '@/components/commons/ThemeProvider';
import NextAuthProvider from '../components/commons/providers';

/**
 * The base metadata of the application.
 * @property title - The title of the application.
 * @property description - The description of the application.
 * @property icons - The icons of the application.
 * @see {@link https://nextjs.org/docs/app/building-your-application/optimizing/metadata#static-metadata} for more information about Next.js metadata.
 */
export const metadata = {
  title: 'Proexcelencia',
  description: 'Sistema de Evaluacion del Participante',
  icons: favicon.src,
};

/**
 * Renders the root layout of the application.
 * @param children - The children components to render.
 * @see {@link https://react.dev/reference/react/Children} for more information about the React.Children utility.
 * @returns The HTML document with the rendered children components.
 */

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className="h-full">
        <NextAuthProvider>
          <ThemeProviderC>{children}</ThemeProviderC>
        </NextAuthProvider>
      </body>
    </html>
  );
}
