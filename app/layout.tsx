import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Impulsa tu Producción con Odoo ERP para Manufactura",
  description: "Optimiza cada aspecto de tu operación manufacturera con una solución ERP diseñada para integrar todas las áreas clave de producción. Desde la planificación y control de inventarios hasta la gestión de maquinaria y seguimiento de tiempos, Odoo ERP te ofrece una plataforma flexible y personalizable que te permite reducir costos, aumentar la eficiencia y adaptarte rápidamente a los cambios en la demanda del mercado. Mejora la visibilidad de tus procesos y toma decisiones más inteligentes en tiempo real.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
