import PublicFooter from "@/components/footer/Public"

export const metadata = {
    title: 'Proexcelencia',
    description: 'Sistema de Evaluacion del Becario',
    // icons: favicon.src,
}

export default async function RootLayout({
    children
}: {
    children: React.ReactNode,
}) {

    return (
        <html lang="es">
            <body>
                {children}
            </body>
    </html>
    )
}