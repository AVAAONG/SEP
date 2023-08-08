/**
 * @file This file renders the layout for the public pages of the application.
 * @remarks Public pages in the application are rendered within this layout. So any change in the style of this layout will affect all the pages that are in the (public) folder.
 * @author Kevin Bravo (kevinbravo.me)
 * @see {@link https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#nesting-layouts} for more information about Next.js nested layouts.
 */

import '@/app/globals.css';
import PublicFooter from '@/components/public/PublicFooter';
import favicon from '@/../public/logo-proexcelencia-cap.png';

/**
 * The metadata of the application for public pages.
 * @property title - The title of the application.
 * @property description - The description of the application.
 * @property icons - The icons of the application.
 * @see {@link https://nextjs.org/docs/app/building-your-application/optimizing/metadata#static-metadata} for more information about Next.js metadata.
 */
export const metadata = {
  title: 'ProExcelencia',
  description: 'Sistema de Evaluación del Participante',
  icons: favicon.src,
};

/**
 * Renders the root layout of the application.
 * @param children - The children components to render.
 * @see {@link https://react.dev/reference/react/Children} for more information about the React.Children utility.
 * @returns The HTML document with the rendered children components.
 */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <PublicFooter />
    </>
  );
}
