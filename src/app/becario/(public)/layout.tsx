import "@/app/globals.css";
import PublicFooter from "@/components/footer/Public";
import favicon from "@/../public/logo-proexcelencia-cap.png";

export const metadata = {
  title: "Proexcelencia",
  description: "Sistema de Evaluacion del Becario",
  icons: favicon.src,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es " className="h-full">
      <body className="h-full">
        {children}
        <PublicFooter />
      </body>
    </html>
  );
}
